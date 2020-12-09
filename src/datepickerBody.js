/* eslint-disable */
import consts from './consts';
import {
    getEl,
    createElement,
    getDaysCount,
    getParsedDate,
    subDays,
    addDays,
    getDecade,
    isSameDate,
    addEventListener,
    insertAfter,
    deepCopy,
    closest, isDateBigger, isDateSmaller
} from './utils';
import DatepickerCell from './datepickerCell';

import './datepickerBody.scss';

let templates = {
    [consts.days]:`` +
        `<div class="datepicker-body--day-names"></div>` +
        `<div class="datepicker-body--cells -${consts.days}-"></div>`,
    [consts.months]: `<div class="datepicker-body--cells -${consts.months}-"></div>`,
    [consts.years]: `<div class="datepicker-body--cells -${consts.years}-"></div>`
};

export default class DatepickerBody {
    constructor({dp, type, opts}) {
        this.dp = dp;
        this.type = type;
        this.opts = opts;
        this.cells = [];
        this.$el = '';
        this.pressed = false;

        this.init();
    }

    init(){
        this._buildBaseHtml();
        if (this.type === consts.days) {
            this._renderDayNames();
        }
        this.render();
        this._bindEvents();
        this._bindDatepickerEvents();
    }

    _bindEvents(){
        let {range, dynamicRange} = this.opts;

        addEventListener(this.$el, 'mouseover', this.onMouseOverCell)
        addEventListener(this.$el, 'mouseout', this.onMouseOutCell)
        addEventListener(this.$el, 'click', this.onClickCell)

        if (range && dynamicRange) {
            addEventListener(this.$el, 'mousedown', this.onMouseDown)
            addEventListener(this.$el, 'mousemove', this.onMouseMove)
            addEventListener(window.document, 'mouseup', this.onMouseUp)
        }

    }

    _bindDatepickerEvents(){
        this.dp.on(consts.eventChangeViewDate, this.render);
        this.dp.on(consts.eventChangeCurrentView, this.onChangeCurrentView);
    }

    _buildBaseHtml() {
        this.$el = createElement({
            className: `datepicker-body -${this.type}-`,
            innerHtml: templates[this.type]
        });

        this.$names = getEl('.datepicker-body--day-names', this.$el);
        this.$cells = getEl('.datepicker-body--cells', this.$el);
    }

    _getDayNamesHtml(firstDay = this.dp.locale.firstDay) {
        let html = '',
            isWeekend = this.dp.isWeekend,
            curDay = firstDay,
            i = 0;

        while (i < 7) {
            let day = curDay % 7;
            html += `<div class="datepicker-body--day-name ${isWeekend(day) ? consts.cssClassWeekend : ''}">
                        ${this.dp.locale.daysMin[day]}
                    </div>`;
            i++;
            curDay++;
        }

        return html;
    }

    _getDaysCells(){
        let {viewDate, locale: {firstDay}} = this.dp,
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

        while(i < totalRenderDays) {
            let date = new Date(renderYear, renderMonth, firstRenderDayDate + i);
            this._generateCell(date);
            i++;
        }
    }

    _generateCell(date) {
        let {type, dp, opts} = this;
        let cell = new DatepickerCell({
            type,
            dp,
            opts,
            date,
            body: this
        });

        this.cells.push(cell);

        return cell;
    }

    _generateDayCells(){
        this._getDaysCells();
    }

    _generateMonthCells(){
        let totalMonths = 12,
            {year} = this.dp.parsedViewDate,
            currentMonth = 0;

        while(currentMonth < totalMonths) {
            this.cells.push(this._generateCell(new Date(year, currentMonth)));
            currentMonth++;
        }
    }

    _generateYearCells(){
        let decade = getDecade(this.dp.viewDate),
            firstYear = decade[0] - 1,
            lastYear = decade[1] + 1,
            year = firstYear;

        while(year <= lastYear) {
            this.cells.push(this._generateCell(new Date(year, 0)))
            year++;
        }
    }

    _renderDayNames(){
        this.$names.innerHTML =  this._getDayNamesHtml();
    }

    _generateCells(){
        switch (this.type) {
            case consts.days:
                this._generateDayCells();
                break;
            case consts.months:
                this._generateMonthCells();
                break;
            case consts.years:
                this._generateYearCells();
                break;
        }
    }

    show() {
        this.$el.classList.remove('-hidden-')
    }

    hide() {
        this.$el.classList.add('-hidden-')
    }

    destroyCells(){
        this.cells.forEach(c=>c.destroy())
    }

    handleClick = e =>{
        let $cell = closest(e.target, '.datepicker-cell');
        if (!$cell) return;
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

    onChangeCurrentView = view =>{
        if (view !== this.type) {
            this.hide();
        } else {
            this.show();
        }
    }

    onMouseOverCell = e => {
        let $cell = closest(e.target, '.datepicker-cell');
        this.dp.setFocusDate($cell ? $cell.adpCell.date : false);
    }

    onMouseOutCell = e => {
        this.dp.setFocusDate(false);
    }

    onClickCell = e => {
        this.handleClick(e);
    }

    onMouseDown = e =>{
        this.pressed = true;

        let $cell = closest(e.target, '.datepicker-cell'),
            cell = $cell && $cell.adpCell;

        if (isSameDate(cell.date, this.dp.rangeDateFrom)) {
            this.rangeFromFocused = true;
        }
        if (isSameDate(cell.date, this.dp.rangeDateTo)) {
            this.rangeToFocused = true;
        }
    }

    onMouseMove = e => {
        if (!this.pressed || !this.dp.isMinViewReached) return;
        e.preventDefault();

        let $cell = closest(e.target, '.datepicker-cell'),
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

    onMouseUp = e => {
        this.pressed = false;
        this.rangeFromFocused = false;
        this.rangeToFocused = false;
    }

    render = () => {
        this.destroyCells();
        this.cells = [];
        this.$cells.innerHTML = '';

        this._generateCells();
        this.cells.forEach(c=>{
            this.$cells.appendChild(c.render());
        });
    }
}
