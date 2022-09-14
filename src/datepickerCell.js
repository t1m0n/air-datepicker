import consts from './consts';
import {
    createElement,
    classNames,
    getParsedDate,
    isSameDate,
    isDateSmaller,
    isDateBigger,
    isDateBetween,
} from './utils';

import './datepickerCell.scss';

export default class DatepickerCell {
    constructor({type, date, dp, opts, body} = {}) {
        this.type = type;
        this.singleType = this.type.slice(0, -1); // days -> day etc.'`
        this.date = date;
        this.dp = dp;
        this.opts = opts;
        this.body = body;
        this.customData = false;

        this.init();
    }

    init() {
        let {range, onRenderCell} = this.opts;

        if (onRenderCell) {
            this.customData = onRenderCell({
                date: this.date,
                cellType: this.singleType,
                datepicker: this.dp,
            });
        }

        this._createElement();
        this._bindDatepickerEvents();
        this._handleInitialFocusStatus();
        if (this.dp.hasSelectedDates) {
            this._handleSelectedStatus();
            if (range) {
                this._handleRangeStatus();
            }
        }
    }

    _bindDatepickerEvents() {
        this.dp.on(consts.eventChangeSelectedDate, this.onChangeSelectedDate);
        this.dp.on(consts.eventChangeFocusDate, this.onChangeFocusDate);
    }

    unbindDatepickerEvents() {
        this.dp.off(consts.eventChangeSelectedDate, this.onChangeSelectedDate);
        this.dp.off(consts.eventChangeFocusDate, this.onChangeFocusDate);
    }

    _createElement() {
        let {year, month, date} = getParsedDate(this.date);
        let extraAttrs = this.customData?.attrs || {};

        this.$cell = createElement({
            className: this._getClassName(),
            attrs: {
                'data-year': year,
                'data-month': month,
                'data-date': date,
                ...extraAttrs,
            }
        });
    }

    _getClassName() {
        let currentDate = new Date();
        let {selectOtherMonths, selectOtherYears} = this.opts;
        let {minDate, maxDate} = this.dp;
        let {day} = getParsedDate(this.date);
        let isOutOfMinMaxRange = this._isOutOfMinMaxRange();
        let disabled = this.customData?.disabled;

        let classNameCommon = classNames(
            'air-datepicker-cell',
            `-${this.singleType}-`, // days -> day etc.'`
            {
                '-current-': isSameDate(currentDate, this.date, this.type),
                '-min-date-': minDate && isSameDate(minDate, this.date, this.type),
                '-max-date-': maxDate && isSameDate(maxDate, this.date, this.type),
            }
        );
        let classNameType = '';

        switch (this.type) {
            case consts.days:
                classNameType = classNames({
                    '-weekend-': this.dp.isWeekend(day),
                    '-other-month-': this.isOtherMonth,
                    '-disabled-': this.isOtherMonth && !selectOtherMonths || isOutOfMinMaxRange || disabled
                });
                break;
            case consts.months:
                classNameType = classNames({
                    '-disabled-': isOutOfMinMaxRange || disabled
                });
                break;
            case consts.years:
                classNameType = classNames({
                    '-other-decade-': this.isOtherDecade,
                    '-disabled-': isOutOfMinMaxRange || (this.isOtherDecade && !selectOtherYears) || disabled
                });
                break;
        }

        return classNames(classNameCommon, classNameType, this.customData?.classes);
    }

    _getHtml() {
        let {year, month, date} = getParsedDate(this.date);
        let {showOtherMonths, showOtherYears} = this.opts;

        if (this.customData?.html) {
            return this.customData.html;
        }

        switch (this.type) {
            case consts.days:
                return !showOtherMonths && this.isOtherMonth ? '' : date;
            case consts.months:
                return this.dp.locale[this.opts.monthsField][month];
            case consts.years:
                return !showOtherYears && this.isOtherDecade ? '' : year;
        }
    }

    _isOutOfMinMaxRange() {
        let {minDate, maxDate} = this.dp;
        let {type, date: cellDate} = this;
        let {month, year, date} = getParsedDate(cellDate);
        let isDay = type === consts.days;
        let isYear = type === consts.years;

        //Since in months cells date is set to the first day of month we should change it value to from min or max dates
        //to be able to mark cell as disabled correctly
        //Same goes to year cells
        let cellMinDate = minDate
            ? new Date(year, isYear ? minDate.getMonth() : month, isDay ? date : minDate.getDate())
            : false;
        let cellMaxDate = maxDate
            ? new Date(year, isYear ? maxDate.getMonth() : month, isDay ? date : maxDate.getDate())
            : false;

        if (minDate && maxDate) {
            return isDateSmaller(cellMinDate, minDate) || isDateBigger(cellMaxDate, maxDate);
        }

        if (minDate) {
            return isDateSmaller(cellMinDate, minDate);
        }

        if (maxDate) {
            return isDateBigger(cellMaxDate, maxDate);
        }
    }

    destroy() {
        this.unbindDatepickerEvents();
    }

    focus = () => {
        this.$cell.classList.add('-focus-');
        this.focused = true;
    }

    removeFocus = () => {
        this.$cell.classList.remove('-focus-');
        this.focused = false;
    }

    select = () => {
        this.$cell.classList.add('-selected-');
        this.selected = true;
    }

    removeSelect = () => {
        this.$cell.classList.remove('-selected-', '-range-from-', '-range-to-');
        this.selected = false;
    }

    _handleRangeStatus() {
        let {rangeDateFrom, rangeDateTo} = this.dp;
        let classes = classNames({
            '-in-range-': rangeDateFrom && rangeDateTo && isDateBetween(this.date, rangeDateFrom, rangeDateTo),
            '-range-from-': rangeDateFrom && isSameDate(this.date, rangeDateFrom, this.type),
            '-range-to-': rangeDateTo && isSameDate(this.date, rangeDateTo, this.type)
        });

        this.$cell.classList.remove('-range-from-', '-range-to-', '-in-range-');

        if (classes) {
            this.$cell.classList.add(...classes.split(' '));
        }
    }

    _handleSelectedStatus() {
        let selected = this.dp._checkIfDateIsSelected(this.date, this.type);
        if (selected) {
            this.select();
        } else if (!selected && this.selected) {
            this.removeSelect();
        }
    }

    _handleInitialFocusStatus() {
        let datesAreSame = isSameDate(this.dp.focusDate, this.date, this.type);

        if (datesAreSame) {
            this.focus();
        }
    }

    get isDisabled() {
        return this.$cell.matches('.-disabled-');
    }

    get isOtherMonth() {
        return this.dp.isOtherMonth(this.date);
    }

    get isOtherDecade() {
        return this.dp.isOtherDecade(this.date);
    }

    onChangeSelectedDate = () => {
        if (this.isDisabled) return;

        this._handleSelectedStatus();
        if (this.opts.range) {
            this._handleRangeStatus();
        }
    }

    onChangeFocusDate = (date) => {
        if (!date) {
            if (this.focused) {
                this.removeFocus();
            }
            return;
        }

        let datesAreSame = isSameDate(date, this.date, this.type);

        if (datesAreSame) {
            this.focus();
        } else if (!datesAreSame && this.focused) {
            this.removeFocus();
        }

        if (this.opts.range) {
            this._handleRangeStatus();
        }
    }

    render = () => {
        this.$cell.innerHTML = this._getHtml();
        this.$cell.adpCell = this;

        return this.$cell;
    }
}
