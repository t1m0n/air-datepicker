import consts from './consts';
import {
    addEventListener,
    classNames,
    closest,
    createElement,
    getDaysCount,
    getDecade,
    getEl,
    getParsedDate,
    isDateBigger,
    isDateSmaller,
    isSameDate,
    subDays,
} from './utils';
import DatepickerCell from './datepickerCell';

import './datepickerBody.scss';

let templates = {
    [consts.days]:'' +
        '<div class="air-datepicker-body--day-names"></div>' +
        `<div class="air-datepicker-body--cells -${consts.days}-"></div>`,
    [consts.months]: `<div class="air-datepicker-body--cells -${consts.months}-"></div>`,
    [consts.years]: `<div class="air-datepicker-body--cells -${consts.years}-"></div>`
};

const cellClassName = '.air-datepicker-cell';

export default class DatepickerBody {
    constructor({dp, type, opts}) {
        this.dp = dp;
        this.type = type;
        this.opts = opts;
        this.cells = [];
        this.$el = '';
        this.pressed = false;
        this.isVisible = true;

        this.init();
    }

    init() {
        this._buildBaseHtml();
        if (this.type === consts.days) {
            this.renderDayNames();
        }
        this.render();
        this._bindEvents();
        this._bindDatepickerEvents();
    }

    _bindEvents() {
        let {range, dynamicRange} = this.opts;

        addEventListener(this.$el, 'mouseover', this.onMouseOverCell);
        addEventListener(this.$el, 'mouseout', this.onMouseOutCell);
        addEventListener(this.$el, 'click', this.onClickBody);


        if (range && dynamicRange) {
            addEventListener(this.$el, 'mousedown', this.onMouseDown);
            addEventListener(this.$el, 'mousemove', this.onMouseMove);
            addEventListener(window.document, 'mouseup', this.onMouseUp);
        }

    }

    _bindDatepickerEvents() {
        this.dp.on(consts.eventChangeViewDate, this.onChangeViewDate);
        this.dp.on(consts.eventChangeCurrentView, this.onChangeCurrentView);
    }

    _buildBaseHtml() {
        this.$el = createElement({
            className: `air-datepicker-body -${this.type}-`,
            innerHtml: templates[this.type]
        });

        this.$names = getEl('.air-datepicker-body--day-names', this.$el);
        this.$cells = getEl('.air-datepicker-body--cells', this.$el);
    }

    _getDayNamesHtml(firstDay = this.dp.locale.firstDay) {
        let html = '',
            isWeekend = this.dp.isWeekend,
            {onClickDayName} = this.opts,
            curDay = firstDay,
            totalDays = 7,
            i = 0;

        while (i < totalDays) {
            let day = curDay % totalDays;
            let className = classNames('air-datepicker-body--day-name', {
                [consts.cssClassWeekend]: isWeekend(day),
                '-clickable-': !!onClickDayName
            });
            let dayName = this.dp.locale.daysMin[day];

            html += `<div class="${className}" data-day-index='${day}'>${dayName}</div>`;

            i++;
            curDay++;
        }
        return html;
    }

    renderDayNames() {
        this.$names.innerHTML =  this._getDayNamesHtml();
    }

    _generateCell(date) {
        let {type, dp, opts} = this;
        return new DatepickerCell({
            type,
            dp,
            opts,
            date,
            body: this
        });
    }

    _generateCells() {
        const getDates = DatepickerBody.getDatesFunction(this.type);

        getDates(this.dp, (date) => {
            this.cells.push(this._generateCell(date));
        });
    }

    show() {
        this.isVisible = true;
        this.$el.classList.remove('-hidden-');
    }

    hide() {
        this.isVisible = false;
        this.$el.classList.add('-hidden-');
    }

    destroyCells() {
        this.cells.forEach(c => c.destroy());
        this.cells = [];
        this.$cells.innerHTML = '';
    }

    destroy() {
        this.destroyCells();
        this.dp.off(consts.eventChangeViewDate, this.onChangeViewDate);
        this.dp.off(consts.eventChangeCurrentView, this.onChangeCurrentView);
    }

    handleClick = (e) => {
        let $cell = e.target.closest(cellClassName);
        let cell = $cell.adpCell;
        if (cell.isDisabled) return;

        if (!this.dp.isMinViewReached) {
            this.dp.down();
            return;
        }

        let alreadySelectedDate = this.dp._checkIfDateIsSelected(cell.date, cell.type);

        if (alreadySelectedDate) {
            this.dp._handleAlreadySelectedDates(alreadySelectedDate, cell.date);
        } else {
            this.dp.selectDate(cell.date);
        }
    }

    handleDayNameClick = (e) => {
        let index = e.target.getAttribute('data-day-index');

        this.opts.onClickDayName({
            dayIndex: Number(index),
            datepicker: this.dp
        });
    }

    onChangeCurrentView = (view) => {
        if (view !== this.type) {
            this.hide();
        } else {
            this.show();
            this.render();
        }
    }

    onMouseOverCell = (e) => {
        let $cell = closest(e.target, cellClassName);
        this.dp.setFocusDate($cell ? $cell.adpCell.date : false);
    }

    onMouseOutCell = () => {
        this.dp.setFocusDate(false);
    }

    onClickBody = (e) => {
        let {onClickDayName} = this.opts;
        let target = e.target;

        if (target.closest(cellClassName)) {
            this.handleClick(e);
        }

        if (onClickDayName && target.closest('.air-datepicker-body--day-name')) {
            this.handleDayNameClick(e);
        }
    }

    onMouseDown = (e) => {
        this.pressed = true;

        let $cell = closest(e.target, cellClassName),
            cell = $cell && $cell.adpCell;

        if (isSameDate(cell.date, this.dp.rangeDateFrom)) {
            this.rangeFromFocused = true;
        }
        if (isSameDate(cell.date, this.dp.rangeDateTo)) {
            this.rangeToFocused = true;
        }
    }

    onMouseMove = (e) => {
        if (!this.pressed || !this.dp.isMinViewReached) return;
        e.preventDefault();

        let $cell = closest(e.target, cellClassName),
            cell = $cell && $cell.adpCell,
            {selectedDates, rangeDateTo, rangeDateFrom} = this.dp;

        if (!cell || cell.isDisabled) return;

        let {date} = cell;

        // Allow user to change selected range
        if (selectedDates.length === 2) {
            // Add hours and minute to new selected date, to update time sliders properly
            if (this.rangeFromFocused && !isDateBigger(date, rangeDateTo)) {
                let {hours, minutes} = getParsedDate(rangeDateFrom);
                date.setHours(hours);
                date.setMinutes(minutes);

                this.dp.rangeDateFrom = date;
                this.dp.replaceDate(rangeDateFrom, date);
            }
            if (this.rangeToFocused && !isDateSmaller(date, rangeDateFrom)) {
                let {hours, minutes} = getParsedDate(rangeDateTo);
                date.setHours(hours);
                date.setMinutes(minutes);

                this.dp.rangeDateTo = date;
                this.dp.replaceDate(rangeDateTo, date);
            }
        }
    }

    onMouseUp = () => {
        this.pressed = false;
        this.rangeFromFocused = false;
        this.rangeToFocused = false;
    }

    onChangeViewDate = (date, oldViewDate) => {
        // Handle only visible views
        if (!this.isVisible) return;

        let decade1 = getDecade(date),
            decade2 = getDecade(oldViewDate);

        // Prevent unnecessary cell rendering when going up or down to next view
        switch (this.dp.currentView) {
            case (consts.days):
                if (isSameDate(date, oldViewDate, consts.months)) {
                    return;
                }
                break;
            case (consts.months):
                if (isSameDate(date, oldViewDate, consts.years)) {
                    return;
                }
                break;
            case (consts.years):
                if (decade1[0] === decade2[0] && decade1[1] === decade2[1]) {
                    return;
                }
                break;
        }

        this.render();
    }

    render = () => {
        this.destroyCells();

        this._generateCells();
        this.cells.forEach((c) => {
            this.$cells.appendChild(c.render());
        });
    }


    static getDaysDates(dp, cb) {
        let {viewDate, opts: {fixedHeight}, locale: {firstDay}} = dp,
            totalMonthDays = getDaysCount(viewDate),
            {year, month} = getParsedDate(viewDate),
            firstMonthDay = new Date(year, month, 1),
            lastMonthDay = new Date(year, month, totalMonthDays),
            daysFromPrevMonth = firstMonthDay.getDay() - firstDay,
            daysFromNextMonth = 6 - lastMonthDay.getDay() + firstDay;

        daysFromPrevMonth = daysFromPrevMonth < 0 ? daysFromPrevMonth + 7 : daysFromPrevMonth;
        daysFromNextMonth = daysFromNextMonth > 6 ? daysFromNextMonth - 7 : daysFromNextMonth;

        let firstRenderDate = subDays(firstMonthDay, daysFromPrevMonth),
            totalRenderDays = totalMonthDays + daysFromPrevMonth + daysFromNextMonth,
            firstRenderDayDate = firstRenderDate.getDate(),
            {year:renderYear, month: renderMonth} = getParsedDate(firstRenderDate),
            i = 0;

        if (fixedHeight) {
            totalRenderDays = 6 * 7; // Render 6 weeks in every month
        }

        const dates = [];

        while (i < totalRenderDays) {
            let date = new Date(renderYear, renderMonth, firstRenderDayDate + i);
            if (cb) {
                cb(date);
            }
            dates.push(date);
            i++;
        }

        return dates;
    }

    static getMonthsDates(dp, cb) {
        let totalMonths = 12,
            {year} = dp.parsedViewDate,
            currentMonth = 0,
            dates = [];

        while (currentMonth < totalMonths) {
            const date = new Date(year, currentMonth);
            dates.push(date);
            if (cb) {
                cb(date);
            }
            currentMonth++;
        }

        return dates;
    }

    static getYearsDates(dp, cb) {
        let decade = getDecade(dp.viewDate),
            firstYear = decade[0] - 1,
            lastYear = decade[1] + 1,
            year = firstYear,
            dates = [];

        while (year <= lastYear) {
            const date = new Date(year, 0);
            dates.push(date);
            if (cb) {
                cb(date);
            }
            year++;
        }

        return dates;
    }

    static getDatesFunction(viewType = consts.days) {
        return {
            [consts.days]: DatepickerBody.getDaysDates,
            [consts.months]: DatepickerBody.getMonthsDates,
            [consts.years]: DatepickerBody.getYearsDates,
        }[viewType];
    }
}
