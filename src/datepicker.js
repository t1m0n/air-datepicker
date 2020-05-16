/* eslint-disable */
import defaults from './defaults';
import {getEl, createElement, insertAfter, deepCopy} from './utils';
import DatepickerBody from './datepickerBody';
import ru from './locale/ru';

import './datepicker.scss';

let $body = '',
    $datepickersContainer = '',
    containerBuilt = false,
    baseTemplate = '' +
        '<div class="datepicker">' +
            '<i class="datepicker--pointer"></i>' +
            '<nav class="datepicker--nav"></nav>' +
            '<div class="datepicker--content"></div>' +
        '</div>';

function buildDatepickersContainer () {
    containerBuilt = true;
    let id = 'datepickers-container';

    $datepickersContainer = createElement({className: id, id});
    $body.appendChild($datepickersContainer);

    return $datepickersContainer;
}

export default class AirDatepicker {
    constructor(el, opts) {
        this.$el = getEl(el);
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
        let {opts: {inline, position, classes, onlyTimepicker, keyboardNav}} = this;

        if (!containerBuilt && !this.opts.inline && this.elIsInput) {
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
            opts: this.opts
        });
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
        this.$nav = getEl('.datepicker--nav', this.$datepicker);
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

        if (firstDay !== undefined) {
            this.locale.firstDay = firstDay
        }

        if (timepicker) {
            this.locale.dateFormat = [this.locale.dateFormat, this.locale.timeFormat].join(dateTimeSeparator);
        }

        if (onlyTimepicker) {
            this.locale.dateFormat = this.locale.timeFormat;
        }

        let boundary = AirDatepicker.getWordBoundaryRegExp;
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

    static defaults = defaults
    //TODO надо вспомнить че к чему, возможно стоит упростить
    static getWordBoundaryRegExp(sign){
        let symbols = '\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;';

        return new RegExp('(^|>|' + symbols + ')(' + sign + ')($|<|' + symbols + ')', 'g');
    }
}
