/* eslint-disable */
import consts from './consts';
import {getEl, createElement, getDaysCount, getParsedDate, subDays, addDays, insertAfter, deepCopy} from './utils';

import './datepickerCell.scss';

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
        this._createElement();
    }

    _createElement() {
        let {year, month, date} = getParsedDate(this.date);

        this.$cell = createElement({
            className: `datepicker-cell -${this.type.slice(0, -1)}-`, // Remove 's' from cell type days -> day
            attrs: {
                'data-year': year,
                'data-month': month,
                'date-date': date
            }
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

    render = () =>{
        this.$cell.innerHTML = this._getHtml();
        return this.$cell;
    }
}
