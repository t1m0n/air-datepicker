import defaults from './defaults';
import {
    copyDate,
    createDate,
    createElement,
    deepCopy,
    deepMerge,
    getDecade,
    getEl,
    getParsedDate,
    getWordBoundaryRegExp,
    insertAfter,
    isDateBigger,
    isDateSmaller,
    isSameDate,
} from './utils';
import DatepickerBody from './datepickerBody';
import DatepickerNav from './datepickerNav';
import DatepickerButtons from './datepickerButtons';
import DatepickerTime from './datepickerTime';
import DatepickerKeyboard from './datepickerKeyboard';
import withEvents from './withEvents';
import consts from './consts';

import './datepickerVars.scss';
import './datepicker.scss';

export class DatepickerCalendar {
    constructor(dp, opts) {
        let {view} = this.opts;
        this.dp = dp;

        this.$calendar = document.createElement('div');

        this.views = {};
        this.rangeDateFrom = '';
        this.rangeDateTo = '';
        this.timepickerIsActive = false; // Need when autoClose and timepicker are both true

        this.init();
    }

    viewIndexes = [consts.days, consts.months, consts.years];

    _createComponents() {
        let {
            opts,
            treatAsInline,
            opts: {
                inline,
                buttons,
                timepicker,
                position,
                classes,
                onlyTimepicker,
                isMobile,
            }
        } = this;
        let dp = this.dp;
        let {currentView} = dp;

        this._buildBaseHtml();

        this.views[currentView] = new DatepickerBody({
            dp,
            type: currentView,
            opts
        });

        this.nav = new DatepickerNav({dp, opts});

        this.$content.appendChild(this.views[this.currentView].$el);
        this.$nav.appendChild(this.nav.$el);
    }

    _destroyComponents() {
        for (let view in this.views) {
            this.views[view].destroy();
        }
        this.views = {};
        this.nav.destroy();
    }

    _bindSubEvents() {
        this.on(consts.eventChangeSelectedDate, this._onChangeSelectedDate);
        this.on(consts.eventChangeFocusDate, this._onChangeFocusedDate);
        this.on(consts.eventChangeTime, this._onChangeTime);
    }

    _buildBaseHtml() {
        this.$content = createElement({className: 'air-datepicker--content'});
        this.$nav = createElement({className: 'air-datepicker--navigation'});

        this.$calendar.appendChild(this.$nav);
        this.$calendar.appendChild(this.$content);
    }

    /**
     * Changes month, year, decade to next period
     */
    next = () => {
        let {year, month} = this.parsedViewDate;

        switch (this.currentView) {
            case consts.days:
                this.setViewDate(new Date(year, month + 1, 1));
                break;
            case consts.months:
                this.setViewDate(new Date(year + 1, month, 1));
                break;
            case consts.years:
                this.setViewDate(new Date(year + 10, 0, 1));
                break;
        }
    }

    /**
     * Changes month, year, decade to prev period
     */
    prev = () => {
        let {year, month} = this.parsedViewDate;

        switch (this.currentView) {
            case consts.days:
                this.setViewDate(new Date(year, month - 1, 1));
                break;
            case consts.months:
                this.setViewDate(new Date(year - 1, month, 1));
                break;
            case consts.years:
                this.setViewDate(new Date(year - 10, 0, 1));
                break;
        }
    }

    down(date) {
        this._handleUpDownActions(date, 'down');
    }

    up(date) {
        this._handleUpDownActions(date, 'up');
    }
    // TODO нужно порефакторить
    /**
     * Sets new datepicker view
     * @param {ViewType} view
     * @param [params]
     * @param [params.silent] {boolean}
     */
    setCurrentView = (view, params = {}) => {
        if (!this.viewIndexes.includes(view)) return;

        this.currentView = view;

        if (this.elIsInput && this.visible) {
            this.setPosition(undefined, true);
        }

        // Trigger inner event before new view is inited, to avoid multiple render calls in datepicker body
        this.trigger(consts.eventChangeCurrentView, view);

        if (!this.views[view]) {
            let newView = this.views[view] = new DatepickerBody({
                dp: this,
                opts: this.opts,
                type: view
            });

            if (this.shouldUpdateDOM) {
                this.$content.appendChild(newView.$el);
            }
        }

        // Trigger user event after, to be able to use datepicker api on rendered view
        if (this.opts.onChangeView && !params.silent) {
            this.opts.onChangeView(view);
        }
    }
    //TODO дописать свой для календаря
    destroy = () => {
        if (this.isDestroyed) return;

        let {showEvent, isMobile} = this.opts;

        let parent = this.$datepicker.parentNode;
        if (parent) {
            parent.removeChild(this.$datepicker);
        }

        this.$el.removeEventListener(showEvent, this._onFocus);
        this.$el.removeEventListener('blur', this._onBlur);
        window.removeEventListener('resize', this._onResize);
        if (isMobile) {
            this._removeMobileAttributes();
        }

        if (this.keyboardNav) {
            this.keyboardNav.destroy();
        }

        this.views = null;
        this.nav = null;

        this.$datepicker = null;
        this.opts = {};
        this.$customContainer = null;

        this.viewDate = null;
        this.focusDate = null;
        this.selectedDates = [];
        this.rangeDateFrom = null;
        this.rangeDateTo = null;

        this.isDestroyed = true;
    }

    /**
     * Updates datepicker state
     * @param newOpts
     * @param [params]
     * @param [params.silent] {boolean} - if true then callbacks won't be triggered
     */
    update = (newOpts = {}, params = {}) => {
        let prevOpts = deepMerge({}, this.opts);
        let {silent} = params;

        deepMerge(this.opts, newOpts);

        let {timepicker, buttons, range, selectedDates, isMobile} = this.opts;
        let shouldUpdateDOM = this.visible || this.treatAsInline;

        this._createMinMaxDates();
        this._limitViewDateByMaxMinDates();
        this._handleLocale();

        if (selectedDates) {
            this.selectedDates = [];
            this.selectDate(selectedDates, {silent});
        }

        if (newOpts.view) {
            this.setCurrentView(newOpts.view, {silent});
        }

        this._setInputValue();

        if (prevOpts.range && !range) {
            this.rangeDateTo = false;
            this.rangeDateFrom = false;
        } else if (!prevOpts.range && range) {
            if (this.selectedDates.length) {
                this.rangeDateFrom = this.selectedDates[0];
                this.rangeDateTo = this.selectedDates[1];
            }
        }

        if (prevOpts.timepicker && !timepicker) {
            shouldUpdateDOM && this.timepicker.destroy();
            this.timepicker = false;
            this.$timepicker.parentNode.removeChild(this.$timepicker);
        } else if (!prevOpts.timepicker && timepicker) {
            this._addTimepicker();
        }

        if (!prevOpts.buttons && buttons) {
            this._addButtons();
        } else if (prevOpts.buttons && !buttons) {
            this.buttons.destroy();
            this.$buttons.parentNode.removeChild(this.$buttons);
        } else {
            if (shouldUpdateDOM && prevOpts.buttons && buttons) {
                this.buttons.clearHtml().render();
            }
        }

        if (!prevOpts.isMobile && isMobile) {
            if (!this.treatAsInline && !$datepickerOverlay) {
                this._createMobileOverlay();
            }
            this._addMobileAttributes();
            if (this.visible) {
                this._showMobileOverlay();
            }
        } else if (prevOpts.isMobile && !isMobile) {
            this._removeMobileAttributes();

            if (this.visible) {
                $datepickerOverlay.classList.remove('-active-');
                if (typeof this.opts.position !== 'function') {
                    this.setPosition();
                }
            }
        }

        if (!shouldUpdateDOM) return;

        this.nav.update();
        this.views[this.currentView].render();
        if (this.currentView === consts.days) {
            this.views[this.currentView].renderDayNames();
        }
    }

    /**
     * Disables dates
     * @param dates {DateLike | Array<DateLike>} - dates to disable
     * @param [_enable] {Boolean} - for internal use, if true, then instead of disabling date its enabling it
     */
    disableDate = (dates, _enable) => {
        let datesToHandle = Array.isArray(dates) ? dates : [dates];

        datesToHandle.forEach((date) => {
            let trueDate = createDate(date);
            if (!trueDate) return;
            let method = _enable ? 'delete' : 'add';

            this.disabledDates[method](this.formatDate(trueDate, 'yyyy-MM-dd'));
            let cell = this.getCell(trueDate, this.currentViewSingular);

            if (!cell) return;
            cell.adpCell.render();
        }, []);
    }

    /**
     * Enable disabled dates
     * @param dates {DateLike | Array<DateLike>} - dates to enable
     */
    enableDate = (dates) => {
        this.disableDate(dates, true);
    }

    /**
     * Checks if date is disabled
     * @param date {DateLike}
     */
    isDateDisabled = (date) => {
        let trueDate = createDate(date);

        return this.disabledDates.has(this.formatDate(trueDate, 'yyyy-MM-dd'));
    }

    _showMobileOverlay() {
        $datepickerOverlay.classList.add('-active-');
    }

    _hasTransition() {
        let transition = window.getComputedStyle(this.$datepicker).getPropertyValue('transition-duration');
        let props = transition.split(', ');

        return props.reduce((sum, item) => {
            return parseFloat(item) + sum;
        }, 0) > 0;
    }

    //  Utils
    // -------------------------------------------------

    isOtherMonth = (date) => {
        let {month} = getParsedDate(date);

        return month !== this.parsedViewDate.month;
    }

    isOtherYear = (date) => {
        let {year} = getParsedDate(date);

        return year !== this.parsedViewDate.year;
    }

    isOtherDecade = (date) => {
        let {year} = getParsedDate(date);
        let [firstDecadeYear, lastDecadeYear] = getDecade(this.viewDate);

        return year < firstDecadeYear || year > lastDecadeYear;
    }

    //  Subscription events
    // -------------------------------------------------

    _onChangeSelectedDate = ({silent}) => {
        // Use timeout here for wait for all changes that could be made to selected date (e.g. timepicker adds time)
        setTimeout(() => {
            this._setInputValue();
            if (this.opts.onSelect && !silent) {
                this._triggerOnSelect();
            }
        });
    }

    _onChangeFocusedDate = (date, {viewDateTransition} = {}) => {
        if (!date) return;
        let shouldPerformTransition = false;

        if (viewDateTransition) {
            shouldPerformTransition = this.isOtherMonth(date) || this.isOtherYear(date) || this.isOtherDecade(date);
        }

        if (shouldPerformTransition) {
            this.setViewDate(date);
        }

        if (this.opts.onFocus) {
            this.opts.onFocus({datepicker: this, date});
        }

    }

    _onChangeTime = ({hours, minutes}) => {
        let today = new Date();
        let {lastSelectedDate, opts: {onSelect}} = this;
        let targetDate = lastSelectedDate;

        if (!lastSelectedDate) {
            targetDate = today;
        }

        let $cell = this.getCell(targetDate, this.currentViewSingular);
        let cell = $cell && $cell.adpCell;

        if (cell && cell.isDisabled) return;

        targetDate.setHours(hours);
        targetDate.setMinutes(minutes);

        if (!lastSelectedDate) {
            this.selectDate(targetDate);
        } else {
            this._setInputValue();
            if (onSelect) {
                this._triggerOnSelect();
            }
        }
    }

    _onFocus = (e) => {
        if (!this.visible) {
            this.show();
        }
    }

    _onBlur = (e) => {
        if (!this.inFocus && this.visible && !this.opts.isMobile) {
            this.hide();
        }
    }

    _onMouseDown = (e) => {
        this.inFocus = true;
    }

    _onMouseUp = (e) => {
        this.inFocus = false;
        this.$el.focus();
    }

    _onResize = () => {
        if (this.visible && typeof this.opts.position !== 'function') {
            this.setPosition();
        }
    }

    _onClickOverlay = () => {
        if (this.visible) {
            this.hide();
        }
    }

    /**
     * Returns all dates that are currently should be shown in calendar
     * @param {ViewType} viewType
     * @returns {*}
     */
    getViewDates = (viewType = consts.days) => {
        const dates = DatepickerBody.getDatesFunction(viewType);
        return dates(this);
    }

    //  Helpers
    // -------------------------------------------------

    get shouldUpdateDOM() {
        return this.visible || this.treatAsInline;
    }

    get parsedViewDate() {
        return getParsedDate(this.viewDate);
    }

    get currentViewSingular() {
        return this.currentView.slice(0, -1);
    }

    get curDecade() {
        return getDecade(this.viewDate);
    }

    get viewIndex() {
        return this.viewIndexes.indexOf(this.currentView);
    }

    get isFinalView() {
        return this.currentView === consts.years;
    }

    get hasSelectedDates() {
        return this.selectedDates.length > 0;
    }

    get isMinViewReached() {
        return this.currentView === this.opts.minView || this.currentView === consts.days;
    }

    get $container() {
        return this.$customContainer || $datepickersContainer;
    }

    isWeekend = (day) => {
        return this.opts.weekends.includes(day);
    }

    /**
     * Clamps passed date between min and max date
     * @param {Date} date
     */
    getClampedDate = (date) => {
        let {minDate, maxDate} = this,
            newDate = date;

        if (maxDate && isDateBigger(date, maxDate)) {
            newDate = maxDate;
        } else if (minDate && isDateSmaller(date, minDate)) {
            newDate = minDate;
        }

        return newDate;
    }

    static replacer(str, reg, data) {
        return str.replace(reg, function (match, p1, p2, p3) {
            return p1 + data + p3;
        });
    }
}

withEvents(DatepickerCalendar.prototype);
