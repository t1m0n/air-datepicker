/* eslint-disable */
import defaults from './defaults';
import {
    createElement,
    deepCopy,
    getDecade,
    getEl,
    getParsedDate,
    insertAfter,
    isDateBigger,
    isDateSmaller,
    isSameDate
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

let $body = '',
    $datepickersContainer = '',
    containerBuilt = false,
    baseTemplate = '' +
        '<div class="datepicker">' +
            '<i class="datepicker--pointer"></i>' +
            '<div class="datepicker--navigation"></div>' +
            '<div class="datepicker--content"></div>' +
        '</div>';

function buildDatepickersContainer () {
    containerBuilt = true;
    let id = 'datepickers-container';

    $datepickersContainer = createElement({className: id, id});
    $body.appendChild($datepickersContainer);

    return $datepickersContainer;
}

export default class Datepicker {
    constructor(el, opts) {
        this.$el = getEl(el);
        //TODO сделать deepMerge
        this.opts = {...defaults, ...opts};

        if (!$body) {
            $body = getEl('body');
        }

        let {view, startDate} = this.opts;

        if (!startDate) {
            this.opts.startDate = new Date();
        }

        if (this.$el.nodeName === 'INPUT') {
            this.elIsInput = true;
        }

        this.inited = false;
        this.visible = false;
        this.silent = false; // Need to prevent unnecessary rendering

        this.viewDate = this.opts.startDate;
        this.focusDate = false;
        this.currentView = view;
        this.selectedDates = [];
        this.views = {};
        this.keys = [];
        this.rangeDateFrom = '';
        this.rangeDateTo = '';
        this._prevOnSelectValue = '';

        this.init();
    }

    viewIndexes = [consts.days, consts.months, consts.years];

    init(){
        let {opts, opts: {inline, timepicker, position, classes, altField, onlyTimepicker, keyboardNav}} = this;
        let dp = this;

        if (!containerBuilt && !inline && this.elIsInput) {
            buildDatepickersContainer();
        }
        this._buildBaseHtml();
        this._handleLocale();
        this._bindSubEvents();

        if (altField) {
            this.$altField = getEl(altField);
        }

        this._limitViewDateByMaxMinDates();

        if (this.elIsInput) {
            if (!inline) {
                // Set extra classes for proper transitions
                this._setPositionClasses(position);
                //TODO дописать добавление событий
                this._bindEvents()
            }

            if (keyboardNav && !onlyTimepicker) {
               new DatepickerKeyboard({dp: this, opts})
            }
        }

        if (classes) {
            this.$datepicker.classList.add(...classes.split(' '))
        }

        if (onlyTimepicker) {
            this.$datepicker.classList.add('-only-timepicker-');
        }

        this.views[this.currentView] = new DatepickerBody({
            dp,
            type: this.currentView,
            opts
        });

        this.nav = new DatepickerNav({dp,opts,})

        if (timepicker) {
            this.timepicker = new DatepickerTime({dp,opts,})
            this.$timepicker.appendChild(this.timepicker.$el);
        }


        if (this.$buttons) {
            this.buttons = new DatepickerButtons({dp,opts})

            this.$buttons.appendChild(this.buttons.$el);
        }

        this.$content.appendChild(this.views[this.currentView].$el);
        this.$nav.appendChild(this.nav.$el);
    }

    _bindSubEvents(){
        this.on(consts.eventChangeSelectedDate, this._onChangeSelectedDate);
        this.on(consts.eventChangeFocusDate, this._onChangeFocusedDate);
        this.on(consts.eventChangeTime, this._onChangeTime);
    }

    _buildBaseHtml() {
        let $appendTarget,
            $inline = createElement({className: 'datepicker-inline'}),
            {buttons, timepicker} = this.opts;

        if  (this.elIsInput) {
            if (!this.opts.inline) {
                $appendTarget = $datepickersContainer;
            } else {
                $appendTarget = insertAfter($inline, this.$el);
            }
        } else {
            $appendTarget = this.$el.appendChild($inline);
        }

        $appendTarget.innerHTML = baseTemplate;

        this.$datepicker = getEl('.datepicker', $appendTarget);
        this.$content = getEl('.datepicker--content',  this.$datepicker);
        this.$nav = getEl('.datepicker--navigation', this.$datepicker);

        if (timepicker) {
            this.$timepicker = createElement({className: 'datepicker--time'});
            this.$datepicker.appendChild(this.$timepicker);
        }

        if (buttons && Array.isArray(buttons)) {
            this.$buttons = createElement({className: 'datepicker--buttons'});
            this.$datepicker.appendChild(this.$buttons);
        }
    }

    _handleLocale(){
        let {locale, dateFormat, firstDay, timepicker, onlyTimepicker, timeFormat, dateTimeSeparator} = this.opts;
        this.locale = deepCopy(locale);

        if (dateFormat) {
            this.locale.dateFormat = dateFormat
        }

        if (timeFormat) {
            this.locale.timeFormat = timeFormat
        }

        if (firstDay !== '') {
            this.locale.firstDay = firstDay
        }

        if (timepicker) {
            this.locale.dateFormat = [this.locale.dateFormat, this.locale.timeFormat].join(dateTimeSeparator);
        }

        if (onlyTimepicker) {
            this.locale.dateFormat = this.locale.timeFormat;
        }

        let boundary = Datepicker.getWordBoundaryRegExp;
        //TODO заменить на новый формат
        if (this.locale.timeFormat.match(boundary('aa')) ||
            this.locale.timeFormat.match(boundary('AA'))
        ) {
            this.ampm = true;
        }

    }

    _setPositionClasses(pos){
        pos = pos.split(' ');
        let main = pos[0],
            sec = pos[1],
            classes = `datepicker -${main}-${sec}- -from-${main}-`;

        if (this.visible) classes += ' active';

        this.$datepicker.removeAttribute('class')
        this.$datepicker.classList.add(...classes.split(' '))
    }

    _bindEvents(){
    }



    _limitViewDateByMaxMinDates(){
        let {viewDate, opts: {minDate, maxDate}} = this;

        if (maxDate && isDateBigger(viewDate, maxDate)) {
            this.setViewDate(maxDate);
        }
        if (minDate && isDateSmaller(viewDate, minDate)) {
            this.setViewDate(minDate);
        }
    }

    formatDate(string, date=this.viewDate) {
        var result = string,
            boundary = Datepicker.getWordBoundaryRegExp,
            locale = this.locale,
            parsedDate = getParsedDate(date),
            decade = getDecade(date),
            fullHours = parsedDate.fullHours,
            hours = parsedDate.hours,
            replacer = Datepicker.replacer,
            ampm = string.match(boundary('aa')) || string.match(boundary('AA')),
            dayPeriod = 'am',
            validHours;

        //TODO обработка выбора времени
        // if (this.opts.timepicker && this.timepicker && ampm) {
        //     validHours = this.timepicker._getValidHoursFromDate(date, ampm);
        //     fullHours = getLeadingZeroNum(validHours.hours);
        //     hours = validHours.hours;
        //     dayPeriod = validHours.dayPeriod;
        // }


        //TODO перейти на UTC формат
        switch (true) {
            case /@/.test(result):
                result = result.replace(/@/, date.getTime());
            case /aa/.test(result):
                result = replacer(result, boundary('aa'), dayPeriod);
            case /AA/.test(result):
                result = replacer(result, boundary('AA'), dayPeriod.toUpperCase());
            case /dd/.test(result):
                result = replacer(result, boundary('dd'), parsedDate.fullDate);
            case /d/.test(result):
                result = replacer(result, boundary('d'), parsedDate.date);
            case /DD/.test(result):
                result = replacer(result, boundary('DD'), locale.days[parsedDate.day]);
            case /D/.test(result):
                result = replacer(result, boundary('D'), locale.daysShort[parsedDate.day]);
            case /mm/.test(result):
                result = replacer(result, boundary('mm'), parsedDate.fullMonth);
            case /m/.test(result):
                result = replacer(result, boundary('m'), parsedDate.month + 1);
            case /MM/.test(result):
                result = replacer(result, boundary('MM'), this.locale.months[parsedDate.month]);
            case /M/.test(result):
                result = replacer(result, boundary('M'), locale.monthsShort[parsedDate.month]);
            case /ii/.test(result):
                result = replacer(result, boundary('ii'), parsedDate.fullMinutes);
            case /i/.test(result):
                result = replacer(result, boundary('i'), parsedDate.minutes);
            case /hh/.test(result):
                result = replacer(result, boundary('hh'), fullHours);
            case /h/.test(result):
                result = replacer(result, boundary('h'), hours);
            case /yyyy/.test(result):
                result = replacer(result, boundary('yyyy'), parsedDate.year);
            case /yyyy1/.test(result):
                result = replacer(result, boundary('yyyy1'), decade[0]);
            case /yyyy2/.test(result):
                result = replacer(result, boundary('yyyy2'), decade[1]);
            case /yy/.test(result):
                result = replacer(result, boundary('yy'), parsedDate.year.toString().slice(-2));
        }

        return result;
    }

    /**
     * Changes month, year, decade to next period
     */
    next = () => {
        let {year, month} = this.parsedViewDate,
            {onChangeMonth, onChangeYear, onChangeDecade} = this.opts;

        switch (this.currentView) {
            case consts.days:
                this.setViewDate(new Date(year, month + 1, 1));
                if (onChangeMonth) onChangeMonth(month, year);
                break;
            case consts.months:
                this.setViewDate(new Date(year + 1, month, 1));
                if (onChangeYear) onChangeYear(year);
                break;
            case consts.years:
                this.setViewDate(new Date(year + 10, 0, 1));
                if (onChangeDecade) onChangeDecade(this.curDecade);
                break;
        }
    }

    /**
     * Changes month, year, decade to prev period
     */
    prev = () => {
        let {year, month} = this.parsedViewDate,
            {onChangeMonth, onChangeYear, onChangeDecade} = this.opts;

        switch (this.currentView) {
            case consts.days:
                this.setViewDate(new Date(year, month - 1, 1));
                if (onChangeMonth) onChangeMonth(month, year);
                break;
            case consts.months:
                this.setViewDate(new Date(year - 1, month, 1));
                if (onChangeYear) onChangeYear(year);
                break;
            case consts.years:
                this.setViewDate(new Date(year - 10, 0, 1));
                if (onChangeDecade) onChangeDecade(this.curDecade);
                break;
        }
    }

    down(date) {
        this._handleUpDownActions(date, 'down');
    }

    up(date) {
        this._handleUpDownActions(date, 'up');
    }

    selectDate(date) {
        let {currentView, parsedViewDate, selectedDates} = this;
        let {
            moveToOtherMonthsOnSelect,
            moveToOtherYearsOnSelect,
            multipleDates,
            range,
            onSelect,
            autoClose
        } = this.opts;
        let selectedDaysLen = selectedDates.length;
        let newViewDate;

        if (Array.isArray(date)) {
            date.forEach(d => {
                this.selectDate(d)
            });
            return;
        }

        if (!(date instanceof Date)) return;

        // Checks if selected date is out of current month or decade
        // If so, change `viewDate`
        if (currentView === consts.days) {
            if (date.getMonth() !== parsedViewDate.month && moveToOtherMonthsOnSelect) {
                newViewDate = new Date(date.getFullYear(), date.getMonth(), 1);
            }
        }

        if (currentView === consts.years) {
            if (date.getFullYear() !== parsedViewDate.year && moveToOtherYearsOnSelect) {
                newViewDate = new Date(date.getFullYear(), 0, 1);
            }
        }

        if (newViewDate) {
            this.setViewDate(newViewDate);
        }

        if (multipleDates && !range) {
            if (selectedDaysLen === multipleDates) return;
            if (!this._checkIfDateIsSelected(date)) {
                selectedDates.push(date);
            }
        } else if (range) {
            switch (selectedDaysLen) {
                case 1:
                    selectedDates.push(date);
                    // Need to define this manually if call selectDate programmatically
                    if (!this.rangeDateTo){
                        this.rangeDateTo = date;
                    }
                    // Swap dates if they were selected via dp.selectDate() and second date was smaller then first
                    if (isDateBigger(this.rangeDateFrom, this.rangeDateTo)) {
                        this.rangeDateTo = this.rangeDateFrom;
                        this.rangeDateFrom = date;
                    }
                    this.selectedDates = [this.rangeDateFrom, this.rangeDateTo];
                    break;
                case 2:
                    this.selectedDates = [date];
                    this.rangeDateFrom = date;
                    this.rangeDateTo = '';
                    break;
                default:
                    this.selectedDates = [date];
                    this.rangeDateFrom = date;
            }
        } else {
            this.selectedDates = [date];
        }

        this.trigger(consts.eventChangeSelectedDate, {action: consts.actionSelectDate, date});
        this._updateLastSelectedDate(date);

        if (onSelect) {
            this._triggerOnChange();
        }

        if (autoClose && !this.timepickerIsActive) {
            if (!multipleDates && !range) {
                this.hide();
            } else if (range && selectedDaysLen === 2) {
                this.hide();
            }
        }

    }

    unselect(date){
        let selected = this.selectedDates,
            _this = this;

        if (!(date instanceof Date)) return;

        return selected.some((curDate, i) => {
            if (isSameDate(curDate, date)) {
                selected.splice(i, 1);

                if (!_this.selectedDates.length) {
                    _this.rangeDateFrom = '';
                    _this.rangeDateTo = '';
                    _this._updateLastSelectedDate(false);
                } else {
                    _this._updateLastSelectedDate(_this.selectedDates[_this.selectedDates.length - 1]);
                }

                this.trigger(consts.eventChangeSelectedDate, {action: consts.actionUnselectDate,  date});

                if (_this.opts.onSelect) {
                    _this._triggerOnChange();
                }

                return true
            }
        })
    }

    replaceDate(selectedDate, newDate) {
        let index = this.selectedDates.indexOf(selectedDate);
        if (index < 0) return;
        this.selectedDates[index] = newDate;

        this.trigger(consts.eventChangeSelectedDate, {
            action: consts.actionSelectDate,
            date: newDate,
            updateTime: true
        });
        this._updateLastSelectedDate(newDate);
    }

    clear(){
        this.selectedDates = []
        this.rangeDateFrom = false;
        this.rangeDateTo = false;

        this.trigger(consts.eventChangeSelectedDate, {action: consts.actionUnselectDate});
    }

    show(){

    }

    hide(){

    }

    setInputValue = () => {
        let {opts: {altFieldDateFormat, altField, multipleDatesSeparator}, selectedDates, $altField, locale} = this,
            value = selectedDates.map(date => this.formatDate(locale.dateFormat, date)),
            altValues;

        if (altField && $altField) {
            altValues = selectedDates.map(date=> this.formatDate(altFieldDateFormat, date));
            altValues = altValues.join(multipleDatesSeparator);
            $altField.value = altValues;
        }

        value = value.join(this.opts.multipleDatesSeparator);

        this.$el.value = value;
    }

    //TODO дописать пользовательский onSelect
    _triggerOnChange(){

    }

    /**
     * Checks if date is already selected, returns selected date if finds one
     * Returns selected date, need for timepicker
     * @param {Date} date
     * @param {String} cellType - days, months, years
     * @return {boolean|Date}
     * @private
     */
    _checkIfDateIsSelected = (date, cellType=consts.days) =>{
        let alreadySelectedDate = false;

        this.selectedDates.some(selectedDate=>{
            let same = isSameDate(date, selectedDate, cellType);
            alreadySelectedDate = same && selectedDate;
            return same;
        })

        return alreadySelectedDate
    }

    _handleAlreadySelectedDates(alreadySelectedDate, newSelectedDate){
        let {range, toggleSelected, timepicker} = this.opts;
        if (range) {
            if (!toggleSelected) {
                // Add possibility to select same date when range is true
                if (this.selectedDates.length !== 2) {
                    this.selectDate(newSelectedDate);
                }
            } else {
                this.unselect(newSelectedDate);
            }
        } else if (toggleSelected){
            this.unselect(newSelectedDate);
        }

        // Change last selected date to be able to change time when clicking on this cell
        if (!toggleSelected) {
            this._updateLastSelectedDate(alreadySelectedDate)
        }
    }

    _handleUpDownActions(date, dir) {
        date = date || this.focusDate || this.viewDate;

        let nextView = dir === 'up' ? this.viewIndex + 1 : this.viewIndex - 1;
        if (nextView > 2) nextView = 2;
        if (nextView < 0) nextView = 0;

        this.setViewDate(new Date(date.getFullYear(), date.getMonth(), 1));
        this.setCurrentView(this.viewIndexes[nextView])
    }

    _handleRangeOnFocus(){
        if (this.selectedDates.length === 1) {
            let selectedDate = this.selectedDates[0];
            if (isDateBigger(selectedDate, this.focusDate)) {
                this.rangeDateTo =  this.selectedDates[0];
                this.rangeDateFrom = this.focusDate;
            } else {
                this.rangeDateTo = this.focusDate;
                this.rangeDateFrom = this.selectedDates[0];
            }
        }
    }

    setPosition(){

    }

    /**
     * Sets new view date of datepicker
     * @param {Date} date
     */
    setViewDate = date => {
        if (isSameDate(date, this.viewDate)) return;
        this.viewDate = date;
        this.trigger(consts.eventChangeViewDate, date);
    }

    setFocusDate = (date, params) => {
        this.focusDate = date;

        if (this.opts.range && date) {
            this._handleRangeOnFocus();
        }

        this.trigger(consts.eventChangeFocusDate, date, params);
    }

    setCurrentView = view => {
        if (!this.viewIndexes.includes(view)) return;

        if (!this.views[view]) {
            let newView = this.views[view] = new DatepickerBody({
                dp: this,
                opts: this.opts,
                type: view
            });

            this.$content.appendChild(newView.$el);
        }

        this.currentView = view;

        if (this.elIsInput && this.visible) this.setPosition();

        if (this.opts.onChangeView) {
            this.opts.onChangeView(view)
        }

        this.trigger(consts.eventChangeCurrentView, view);
    }

    /**
     * Updates lastSelectedDate param and triggers corresponding event
     * @param {Date|Boolean} date - date or empty
     */
    _updateLastSelectedDate = date =>{
        this.lastSelectedDate = date;
        this.trigger(consts.eventChangeLastSelectedDate, date);
    }

    getCell(jsDate) {
        let {year, month, date} = getParsedDate(jsDate);

        return this.$content.querySelector(`[data-year="${year}"][data-month="${month}"][data-date="${date}"]`);
    }

    // TODO дописать destroy
    destroy = () =>{
        let parent = this.$datepicker.parentNode;
        if (parent) {
            parent.removeChild(this.$datepicker);
        }
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

    _onChangeSelectedDate = () =>{
        // Use timeout here for wait for all changes that could be made to selected date (e.g. timepicker adds time)
        setTimeout(this.setInputValue)
    }

    _onChangeFocusedDate = (date, {byKeyboard} = {}) =>{
        if (!date) return;
        let shouldPerformTransition = false;

        if (byKeyboard) {
            switch (this.currentView) {
                case consts.days:
                    shouldPerformTransition = this.isOtherMonth(date);
                    break;
                case consts.months:
                    shouldPerformTransition = this.isOtherYear(date);
                    break;
                case consts.years:
                    shouldPerformTransition = this.isOtherDecade(date);
                    break;
            }
        }

        if (shouldPerformTransition) {
            this.setViewDate(date);
        }

    }

    _onChangeTime = ({hours, minutes}) =>{
        let today = new Date();
        let {lastSelectedDate} = this;
        let targetDate = lastSelectedDate;

        if (!lastSelectedDate) {
            targetDate = today;
        }

        let $cell = this.getCell(targetDate);
        let cell = $cell && $cell.adpCell;

        if (cell && cell.isDisabled) return;

        targetDate.setHours(hours);
        targetDate.setMinutes(minutes);

        if (!lastSelectedDate) {
            this.selectDate(targetDate);
        } else {
            this.setInputValue();
            //TODO добавить onSelect
        }
    }

    //  Helpers
    // -------------------------------------------------

    get parsedViewDate(){
        return getParsedDate(this.viewDate);
    }

    get curDecade() {
        return getDecade(this.viewDate)
    }

    get viewIndex(){
        return this.viewIndexes.indexOf(this.currentView);
    }

    get isFinalView(){
        return this.currentView === consts.years;
    }

    get hasSelectedDates(){
        return this.selectedDates.length > 0;
    }

    get isMinViewReached(){
        return this.currentView === this.opts.minView || this.currentView === consts.days;
    }

    isWeekend = (day) => {
        return this.opts.weekends.includes(day);
    }

    static replacer(str, reg, data) {
        return str.replace(reg, function (match, p1,p2,p3) {
            return p1 + data + p3;
        })
    }

    static defaults = defaults
    //TODO надо вспомнить че к чему, возможно стоит упростить
    static getWordBoundaryRegExp(sign){
        let symbols = '\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;';

        return new RegExp('(^|>|' + symbols + ')(' + sign + ')($|<|' + symbols + ')', 'g');
    }
}

withEvents(Datepicker.prototype);
