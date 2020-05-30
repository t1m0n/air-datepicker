/* eslint-disable */
import consts from './consts';
import {getEl, createElement, classNames, getParsedDate, isSameDate} from './utils';

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
            className: this._getClassName(),
            attrs: {
                'data-year': year,
                'data-month': month,
                'date-date': date
            }
        })
    }

    _getClassName(){
        let {parsedViewDate} = this.dp;
        let currentDate = new Date();
        let {selectOtherMonths, showOtherMonths} = this.opts;
        let {day, month} = getParsedDate(this.date);

        let classNameCommon = classNames(
            'datepicker-cell',
            `-${this.type.slice(0, -1)}-`, // days -> day etc.'`
            {
                '-current-': isSameDate(currentDate, this.date, this.type)
            }
        )
        let classNameType = '';

        switch (this.type) {
            case consts.days:
                let isOtherMonth = month !== parsedViewDate.month;
                classNameType = classNames({
                    '-weekend-': this.dp.isWeekend(day),
                    '-other-month-': isOtherMonth,
                    '-disabled-': isOtherMonth && !selectOtherMonths
                });
                break
            case consts.months:
                break
            case consts.years:
                break
        }

        //TODO дописать с диапазоном и onRenderCell

        return classNames(classNameCommon, classNameType);
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
