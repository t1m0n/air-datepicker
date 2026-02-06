import consts from './consts';
import {
    createElement,
    classNames,
    getParsedDate,
    isSameDate,
    isDateSmaller,
    isDateBigger,
    isDateBetween,
    dateDifference,
    addDays
} from './utils';

import './datepickerCell.scss';

export default class DatepickerCell {
    constructor({ type, date, dp, opts, body } = {}) {
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
        let { onRenderCell } = this.opts;

        if (onRenderCell) {
            this.customData = onRenderCell({
                date: this.date,
                cellType: this.singleType,
                datepicker: this.dp,
            });
        }

        this._createElement();
        this._bindDatepickerEvents();

        if (this.customData?.disabled) {
            this.dp.disableDate(this.date);
        } else if (this.customData?.disabled === false) {
            this.dp.enableDate(this.date);
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
        let { year, month, fullMonth, date, fullDate } = getParsedDate(this.date);
        let extraAttrs = this.customData?.attrs || {};

        this.$cell = createElement({
            attrs: {
                'data-year': year,
                'data-month': month,
                'data-date': date,
                'data-iso-date': `${year}-${fullMonth}-${fullDate}`,
                ...extraAttrs,
            }
        });
        this.$cell.adpCell = this;
    }

    _getClassName() {
        let currentDate = new Date();
        let { selectOtherMonths, selectOtherYears } = this.opts;
        let { minDate, maxDate, isDateDisabled } = this.dp;
        let { day } = getParsedDate(this.date);
        let isOutOfMinMaxRange = this._isOutOfMinMaxRange();
        let isDisabled = isDateDisabled(this.date);

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
                const isTemporary = this.selected && this.dp._isDateTemporary(this.date);
                classNameType = classNames({
                    '-weekend-': this.dp.isWeekend(day),
                    '-other-month-': this.isOtherMonth,
                    '-disabled-': this.isOtherMonth && !selectOtherMonths || isOutOfMinMaxRange || isDisabled,
                    '-temporary-': isTemporary
                });
                break;
            case consts.months:
                classNameType = classNames({
                    '-disabled-': isOutOfMinMaxRange
                });
                break;
            case consts.years:
                classNameType = classNames({
                    '-other-decade-': this.isOtherDecade,
                    '-disabled-': isOutOfMinMaxRange || (this.isOtherDecade && !selectOtherYears)
                });
                break;
        }

        return classNames(classNameCommon, classNameType, this.customData?.classes).split(' ');
    }

    _getHtml() {
        let { year, month, date } = getParsedDate(this.date);
        let { showOtherMonths, showOtherYears } = this.opts;

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
        let { minDate, maxDate } = this.dp;
        let { type, date: cellDate } = this;
        let { month, year, date } = getParsedDate(cellDate);
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

        // Adding the temporary class ONLY if the date is in temporaryDates
        // and not in selectedDates (when includeTemporaryInSelected = false)
        const isInTemporary = this.dp.temporaryDates.some(d =>
            isSameDate(d, this.date)
        );
        const isInSelected = this.dp.selectedDates.some(d =>
            isSameDate(d, this.date)
        );

        if (isInTemporary) {
            this.$cell.classList.add('-temporary-');
        } else {
            // If the date is only in selectedDates, we remove the temporary class.-
            this.$cell.classList.remove('-temporary-');
        }

        this.selected = true;
    }

    removeSelect = () => {
        this.$cell.classList.remove('-selected-', '-range-from-', '-range-to-', '-temporary-');
        this.selected = false;
    }

    _handleRangeStatus() {
        const { maxDays, minDays } = this.opts;
        const { selectedDates, focusDate, rangeDateFrom, rangeDateTo } = this.dp;
        const selectedDatesLen = selectedDates.length;
        this.$cell.classList.remove('-range-from-', '-range-to-', '-in-range-');
        if (!selectedDatesLen) return;

        let from = rangeDateFrom;
        let to = rangeDateTo;
        let date = this.date;
        let type = this.type;
        const diff = dateDifference;
        const add = addDays;
        const bigger = isDateBigger;
        const less = isDateSmaller;
        const same = isSameDate;

        // build virtual interval when only one selected and focus (hover) exists
        let selectedDateIsBeforeFocus = null;
        if (selectedDatesLen === 1 && focusDate) {
            const selectedDate = selectedDates[0];
            const focusedDate = focusDate;
            selectedDateIsBeforeFocus = bigger(focusedDate, selectedDate); // true if selected < focus

            from = selectedDateIsBeforeFocus ? selectedDate : focusedDate;
            to = selectedDateIsBeforeFocus ? focusedDate : selectedDate;

            const desiredRangeLength = diff(to, from) + 1;
            if (maxDays && desiredRangeLength > maxDays) {
                if (selectedDateIsBeforeFocus) {
                    to = add(from, maxDays - 1);
                } else {
                    from = add(to, -(maxDays - 1));
                }
            } else if (minDays && desiredRangeLength < minDays) {
                if (selectedDateIsBeforeFocus) {
                    to = add(from, minDays - 1);
                } else {
                    from = add(to, -(minDays - 1));
                }
            }

            const finalRangeLength = diff(to, from) + 1;
            if (minDays && finalRangeLength < minDays) {
                from = null;
                to = null;
            } else if (maxDays && finalRangeLength > maxDays) {
                from = null;
                to = null;
            }
        }

        let displayedFrom = from;
        let displayedTo = to;

        // If strict ranges required, compute blocked segments and clamp so that the final highlighted
        // segment: a) doesn't contain disabled dates; b) still contains the originally selected date.
        if (this.type === consts.days && this.dp.opts.nonStrictRanges === false && displayedFrom && displayedTo) {
            // normalize interval
            const start = new Date(Math.min(displayedFrom.getTime(), displayedTo.getTime()));
            const end = new Date(Math.max(displayedFrom.getTime(), displayedTo.getTime()));

            // collect disabled dates within [start, end] (as timestamps)
            const disabledTimestamps = [];
            for (let d = new Date(start); d.getTime() <= end.getTime(); d.setDate(d.getDate() + 1)) {
                if (this.dp.isDateDisabled(new Date(d))) {
                    disabledTimestamps.push(new Date(d).setHours(0, 0, 0, 0));
                }
            }

            const sel = selectedDates[0];

            // if selected itself is disabled -> no highlight
            if (this.dp.isDateDisabled(sel)) {
                displayedFrom = null;
                displayedTo = null;
            } else {
                // direction-aware clamping to produce continuous block that contains sel
                if (selectedDateIsBeforeFocus === true) {
                    // selected is left, focus is right: interval [selected .. focus]
                    // we need first disabled >= selected (within interval) that sits to the right of selected
                    const firstDisabled = disabledTimestamps.length ? Math.min(...disabledTimestamps) : null;
                    if (firstDisabled !== null) {
                        // if the first disabled is exactly at selected -> no highlight
                        if (firstDisabled === new Date(sel).setHours(0, 0, 0, 0)) {
                            displayedFrom = null;
                            displayedTo = null;
                        } else {
                            const beforeDisabled = new Date(firstDisabled);
                            beforeDisabled.setDate(beforeDisabled.getDate() - 1);
                            // displayedFrom stays = selected, displayedTo becomes min(beforeDisabled, end)
                            const newTo = beforeDisabled.getTime() < end.getTime() ? beforeDisabled : end;
                            // ensure newTo >= selected
                            if (newTo.getTime() < sel.getTime()) {
                                displayedFrom = null;
                                displayedTo = null;
                            } else {
                                displayedFrom = sel;
                                displayedTo = newTo;
                            }
                        }
                    } else {
                        // no disabled inside interval -> keep as is
                        displayedFrom = displayedFrom;
                        displayedTo = displayedTo;
                    }
                } else if (selectedDateIsBeforeFocus === false) {
                    // selected is right, focus is left: interval [focus .. selected]
                    // we need last disabled <= selected (but >= start). Equivalent: find max disabled timestamp < = selected
                    if (disabledTimestamps.length) {
                        const selTs = new Date(sel).setHours(0, 0, 0, 0);
                        // gather disabled <= selTs
                        const leftDisabled = disabledTimestamps.filter(ts => ts <= selTs);
                        const lastDisabled = leftDisabled.length ? Math.max(...leftDisabled) : null;
                        if (lastDisabled !== null) {
                            // if disabled equals selected -> no highlight
                            if (lastDisabled === selTs) {
                                displayedFrom = null;
                                displayedTo = null;
                            } else {
                                const afterDisabled = new Date(lastDisabled);
                                afterDisabled.setDate(afterDisabled.getDate() + 1);
                                // displayedTo stays = selected, displayedFrom becomes max(afterDisabled, start)
                                const newFrom = afterDisabled.getTime() > start.getTime() ? afterDisabled : start;
                                if (newFrom.getTime() > sel.getTime()) {
                                    displayedFrom = null;
                                    displayedTo = null;
                                } else {
                                    displayedFrom = newFrom;
                                    displayedTo = sel;
                                }
                            }
                        } else {
                            // no disabled on the left side within interval -> keep as is
                            displayedFrom = displayedFrom;
                            displayedTo = displayedTo;
                        }
                    } else {
                        // no disabled -> keep as is
                        displayedFrom = displayedFrom;
                        displayedTo = displayedTo;
                    }
                } else {
                    // no focus-direction info (shouldn't happen), leave as is
                }
            }
        }

        // after clamping, ensure the resulting block still satisfies minDays constraint
        if (selectedDatesLen === 1 && displayedFrom && displayedTo) {
            const dFrom = Math.min(displayedFrom.getTime(), displayedTo.getTime());
            const dTo = Math.max(displayedFrom.getTime(), displayedTo.getTime());
            const sel = selectedDates[0].getTime();
            if (sel < dFrom || sel > dTo) {
                displayedFrom = null;
                displayedTo = null;
            } else {
                const finalLen = Math.floor((dTo - dFrom) / (24 * 3600 * 1000)) + 1;
                if (minDays && finalLen < minDays) {
                    displayedFrom = null;
                    displayedTo = null;
                }
            }
        }

        let classes = {
            '-in-range-': false,
            '-range-from-': false,
            '-range-to-': false
        };

        if (displayedFrom && displayedTo) {
            const isInRange = bigger(date, displayedFrom) && less(date, displayedTo);
            const isRangeFrom = same(date, displayedFrom, type);
            const isRangeTo = same(date, displayedTo, type);
            classes['-in-range-'] = isInRange;
            classes['-range-from-'] = isRangeFrom;
            classes['-range-to-'] = isRangeTo;
        } else if (displayedFrom && !displayedTo) {
            classes['-range-from-'] = same(date, displayedFrom, type);
        } else if (!displayedFrom && displayedTo) {
            classes['-range-to-'] = same(date, displayedTo, type);
        }

        Object.keys(classes).forEach(className => {
            if (classes[className]) {
                this.$cell.classList.add(className);
            }
        });
    }


    _handleSelectedStatus() {
        const isInSelected = this.dp.selectedDates.some(d =>
            isSameDate(d, this.date, this.type)
        );
        const isInTemporary = this.dp.temporaryDates.some(d =>
            isSameDate(d, this.date, this.type)
        );

        // The date is selected if it is in selectedDates OR in temporaryDates.
        const isSelected = isInSelected || isInTemporary;

        if (isSelected) {
            this.select();
        } else if (!isSelected && this.selected) {
            this.removeSelect();
        }
    }

    _handleInitialFocusStatus() {
        let datesAreSame = isSameDate(this.dp.focusDate, this.date, this.type);

        if (datesAreSame) {
            this.focus();
            if (this.dp.lastDateInRange) {
                delete this.dp.lastDateInRange;
            }
        }
    }

    _handleClasses() {
        this.$cell.setAttribute('class', '');
        this._handleInitialFocusStatus();

        if (this.dp.hasSelectedDates || this.dp.temporaryDates.length > 0) {
            this._handleSelectedStatus();
            if (this.dp.opts.range && this.type === consts.days) {
                this._handleRangeStatus();
            }
        }

        this.$cell.classList.add(...this._getClassName());
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
        if (this.dp.opts.range && this.type === consts.days) {
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

        if (this.dp.opts.range && this.type === consts.days) {
            this._handleRangeStatus();
        }
    }

    render = () => {
        this.$cell.innerHTML = this._getHtml();

        this._handleClasses();

        return this.$cell;
    }
}
