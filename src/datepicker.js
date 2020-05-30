/* eslint-disable */
import defaults from './defaults';
import {getEl, createElement, insertAfter, deepCopy, getLeadingZeroNum, getParsedDate, getDecade} from './utils';
import DatepickerBody from './datepickerBody';
import DatepickerNav from './datepickerNav';
import ru from './locale/ru';

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
        this.currentView = view;
        this.selectedDates = [];
        this.views = {};
        this.keys = [];
        this.minRange = '';
        this.maxRange = '';
        this._prevOnSelectValue = '';

        this.init();
    }

    init(){
        let {opts, opts: {inline, position, classes, onlyTimepicker, keyboardNav}} = this;

        if (!containerBuilt && !inline && this.elIsInput) {
            buildDatepickersContainer();
        }
        this._buildBaseHtml();
        this._handleLocale();
        //TODO дописать обработку мин макс
        // this._handleMinMaxDates();

        if (this.elIsInput) {
            if (!inline) {
                // Set extra classes for proper transitions
                this._setPositionClasses(position);
                //TODO дописать добавление событий
                this._bindEvents()
            }
            if (keyboardNav && !onlyTimepicker) {
                //TODO дописать обработку клавиатуры
                this._bindKeyboardEvents();
            }
        }

        if (classes) {
            this.$datepicker.classList.add(...classes.split(' '))
        }

        if (onlyTimepicker) {
            this.$datepicker.classList.add('-only-timepicker-');
        }

        this.views[this.currentView] = new DatepickerBody({
            dp: this,
            type: this.currentView,
            opts
        });

        this.nav = new DatepickerNav({
            dp: this,
            opts,
        })

        this.$content.appendChild(this.views[this.currentView].$el);
        this.$nav.appendChild(this.nav.$el);
    }

    _buildBaseHtml() {
        let $appendTarget,
            $inline = createElement({className: 'datepicker-inline'});
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
    _bindKeyboardEvents(){

    }
    _handleMinMaxDates(){

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

    get parsedViewDate(){
        return getParsedDate(this.viewDate);
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
