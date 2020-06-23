/* eslint-disable */
import consts from './consts';
import {
    getEl,
    createElement,
    classNames,
    getParsedDate,
    isSameDate,
    isDateSmaller,
    isDateBigger,
    getDecade
} from './utils';

import './datepickerCell.scss';

export default class DatepickerCell {
    constructor({type, date, dp, opts, body} = {}) {
        this.type = type;
        this.date = date;
        this.dp = dp;
        this.opts = opts;
        this.body = body;

        this.init();
    }

    init(){
        this._createElement();
        this._bindDatepickerEvents();
        if (this.dp.hasSelectedDates) {
            this._handleSelectedStatus();
        }
    }

    _bindDatepickerEvents(){
        this.dp.on(consts.eventSelectDate, this.onSelectDate);
    }

    unbindDatepickerEvents(){
        this.dp.off(consts.eventSelectDate, this.onSelectDate);
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
        let {selectOtherMonths, showOtherMonths, selectOtherYears} = this.opts;
        let {day, month, year} = getParsedDate(this.date);
        let isOutOfMinMaxRange = this._isOutOfMinMaxRange();

        let classNameCommon = classNames(
            'datepicker-cell',
            `-${this.type.slice(0, -1)}-`, // days -> day etc.'`
            {
                '-current-': isSameDate(currentDate, this.date, this.type),
            }
        )
        let classNameType = '';

        switch (this.type) {
            case consts.days:
                let isOtherMonth = month !== parsedViewDate.month;
                classNameType = classNames({
                    '-weekend-': this.dp.isWeekend(day),
                    '-other-month-': isOtherMonth,
                    '-disabled-': isOtherMonth && !selectOtherMonths || isOutOfMinMaxRange
                });
                break
            case consts.months:
                classNameType = classNames({
                    '-disabled-': isOutOfMinMaxRange
                });
                break
            case consts.years:
                let [firstDecadeYear, lastDecadeYear] = getDecade(this.dp.viewDate),
                    isOtherDecade = year < firstDecadeYear || year > lastDecadeYear;

                classNameType = classNames({
                    '-other-decade-': isOtherDecade,
                    '-disabled-': isOutOfMinMaxRange || (isOtherDecade && !selectOtherYears)
                });
                break
        }

        //TODO дописать с диапазоном и onRenderCell

        return classNames(classNameCommon, classNameType);
    }

    _getHtml(){
        let {year, month, date} = getParsedDate(this.date);

        //TODO обработку showOtherMonths, showOtherYears

        switch (this.type) {
            case consts.days:
                return date;
            case consts.months:
                return this.dp.locale[this.opts.monthsField][month];
            case consts.years:
                return year;
        }
    }

    _isOutOfMinMaxRange() {
        let {minDate, maxDate} = this.opts;
        let {date} = this;

        if (minDate && maxDate) {
            return isDateSmaller(date, minDate) || isDateBigger(date, maxDate)
        }

        if (minDate) {
            return isDateSmaller(date, minDate)
        }

        if (maxDate) {
            return  isDateBigger(date, maxDate)
        }
    }

    destroy(){
        this.unbindDatepickerEvents();
    }

    focus = e =>{
        this.$cell.classList.add('-focus-');
    }

    removeFocus = e =>{
        this.$cell.classList.remove('-focus-');
    }

    select = () =>{
        this.$cell.classList.add('-selected-');
        this.selected = true;
    }

    removeSelect = () =>{
        this.$cell.classList.remove('-selected-');
        this.selected = false;
    }

    _handleSelectedStatus(){
        let selected = this.dp._checkIfDateIsSelected(this.date, this.type);
        if (selected) {
            this.select();
        } else if (!selected && this.selected) {
            this.removeSelect();
        }
    }

    onSelectDate = date =>{
        this._handleSelectedStatus();
    }

    render = () =>{
        this.$cell.innerHTML = this._getHtml();
        this.$cell.adpCell = this;

        return this.$cell;
    }
}
