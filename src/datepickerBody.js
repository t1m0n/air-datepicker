/* eslint-disable */
import consts from './consts';
import {getEl, createElement, getDaysCount, getParsedDate, subDays, addDays, insertAfter, deepCopy} from './utils';
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

        this.init();
    }

    init(){
        this._buildBaseHtml();
        if (this.type === consts.days) {
            this._renderDayNames();
        }
        this.render();
        this._bindDatepickerEvents();
    }

    _bindDatepickerEvents(){
        this.dp.on(consts.eventChangeViewDate, this.render);
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

    _renderDays(){
        this._getDaysCells();
    }

    _renderMonths(){

    }

    _renderYears(){

    }

    _renderDayNames(){
        this.$names.innerHTML =  this._getDayNamesHtml();
    }

    _generateCells(){
        switch (this.type) {
            case consts.days:
                this._renderDays();
                break;
            case consts.months:
                this._renderMonths();
                break;
            case consts.years:
                this._renderYears();
                break;
        }
    }

    render = () => {
console.time('render');
        this.cells = [];
        this.$cells.innerHTML = '';

        this._generateCells();
        this.cells.forEach(c=>{
            this.$cells.appendChild(c.render());
        });
console.timeEnd('render')
    }
}
