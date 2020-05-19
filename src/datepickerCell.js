/* eslint-disable */
import consts from './consts';
import {getEl, createElement, getDaysCount, getParsedDate, subDays, addDays, insertAfter, deepCopy} from './utils';

export default class DatepickerCell {
    constructor({type, date, dp, opts, body} = {}) {
        this.type = type;
        this.date = date;
        this.dp = dp;
        this.opts = opts;
        this.body = body;

        this._init();
    }

    _init(){
        this._buildBaseHtml();
    }

    _buildBaseHtml() {
        let {year, month, date} = getParsedDate(this.date);

        this.$cell = createElement({
            className: `datepicker-cell -${this.type.slice(0, -1)}-`, // Remove 's' from cell type days -> day
            attrs: {
                'data-year': year,
                'data-month': month,
                'date-date': date
            },
            innerHtml: this._getHtml()
        })
    }

    _getHtml(){
        let {year, month, date} = getParsedDate(this.date);

        switch (this.type) {
            case consts.days:
                return date;
            case consts.months:
                return month;
            case consts.years:
                return year;
        }
    }

    render(){
        this.body.$cells.appendChild(this.$cell);
    }
}
