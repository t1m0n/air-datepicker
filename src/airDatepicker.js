import defaults from './defaults';
import {createDate, createElement, deepMerge, getDecade, getEl, getParsedDate, isSameDate} from 'utils';
import Datepicker from 'datepicker';

import './airDatepicker.scss';
import consts, {EVENTS} from 'consts';
import withEvents from 'withEvents';

let $datepickersContainer = '',
    $datepickerOverlay = '',
    containerBuilt = false,
    baseTemplate = '' +
        '<i class="air-datepicker--pointer"></i>' +
        '<div class="air-datepicker--calendars"></div>';

export class AirDatepicker {
    static defaultGlobalContainerId = 'air-datepicker-global-container'
    static buildGlobalContainer(id) {
        containerBuilt = true;

        $datepickersContainer = createElement({className: id, id});
        getEl('body').appendChild($datepickersContainer);
    }
    visible = false;
    hideAnimation = false;
    calendars = [];
    inFocus = false;
    constructor(el, opts = {}) {
        this.$el = getEl(el);

        if (!this.$el) {
            console.warn('Element not found: ', el);
            return;
        }

        this.opts = deepMerge({}, defaults, opts);

        let {view, startDate} = this.opts;

        this.viewDate = createDate(startDate);
        this.currentView = view;
        this.$datepicker = createElement({className: 'air-datepicker'});
        this.$customContainer = this.opts.container ? getEl(this.opts.container) : false;

        if (this.$el.nodeName === 'INPUT') {
            this.elIsInput = true;
        }

        this.init();
    }

    init() {
        let $body = getEl('body');
        let {
            treatAsInline,
            opts: {
                inline,
                isMobile,
            }
        } = this;

        let shouldBuildGlobalContainer =
            // Check if global container still exist in DOM
            (!containerBuilt || containerBuilt && $datepickersContainer && !$body.contains($datepickersContainer))
            && !inline
            && this.elIsInput
            && !this.$customContainer;

        if (shouldBuildGlobalContainer) {
            AirDatepicker.buildGlobalContainer(AirDatepicker.defaultGlobalContainerId);
        }

        if (isMobile && !$datepickerOverlay && !treatAsInline) {
            this._createMobileOverlay();
        }

        this._buildBaseHtml();
        this._createCalendars();
        this._bindEvents();
    }

    _bindEvents() {
        this.$el.addEventListener(this.opts.showEvent, this._onFocus);
        this.$el.addEventListener('blur', this._onBlur);
    }

    _buildBaseHtml() {
        this.$datepicker.innerHTML = baseTemplate;
        this.$datepicker.style.setProperty('--calendars', this.opts.calendars || 1);

        this.$calendars = getEl('.air-datepicker--calendars', this.$datepicker);
    }

    _createCalendars() {
        let count = 0;

        while (count < (this.opts.calendars || 1)) {
            this.calendars.push(new Datepicker(this.$calendars, this.opts, {adp: this, index: count}));
            count++;
        }
    }

    _createMobileOverlay() {
        $datepickerOverlay = createElement({className: 'air-datepicker-overlay'});
        $datepickersContainer.appendChild($datepickerOverlay);
    }

    _onFocus = (e) => {
        if (!this.visible) {
            this.show();
        }
    }
    _onBlur = (e) => {
        if (!this.inFocus && this.visible && !this.opts.isMobile) {
            // this.hide();
        }
    }

    _scheduleCallAfterTransition = (cb) => {
        this._cancelScheduledCall();

        cb && cb(false);

        this._onTransitionEnd = () => {
            cb && cb(true);
        };

        this.$datepicker.addEventListener('transitionend', this._onTransitionEnd, {once: true});
    }

    _cancelScheduledCall = () => {
        this.$datepicker.removeEventListener('transitionend', this._onTransitionEnd);
    }

    setPosition = (position, isViewChange = false) => {
        position = position || this.opts.position;

        if (typeof position === 'function') {
            this.customHide = position({
                $datepicker: this.$datepicker,
                $target: this.$el,
                $pointer: this.$pointer,
                isViewChange,
                done: this._finishHide
            });
            return;
        }

        let  {isMobile} = this.opts;

        let vpDims = this.$el.getBoundingClientRect(),
            dims = this.$el.getBoundingClientRect(),
            $dpOffset = this.$datepicker.offsetParent,
            $elOffset = this.$el.offsetParent,
            selfDims = this.$datepicker.getBoundingClientRect(),
            pos = position.split(' '),
            top, left,
            scrollTop = window.scrollY,
            scrollLeft = window.scrollX,
            offset = this.opts.offset,
            main = pos[0],
            secondary = pos[1];

        if (isMobile) {
            this.$datepicker.style.cssText = 'left: 50%; top: 50%';
            return;
        }

        // If datepicker's container is the same with target element
        if ($dpOffset === $elOffset && $dpOffset !== document.body) {
            dims = {
                top: this.$el.offsetTop,
                left: this.$el.offsetLeft,
                width: vpDims.width,
                height: this.$el.offsetHeight
            };

            scrollTop = 0;
            scrollLeft = 0;
        }

        // If dp container is different from target offset parent
        // and dp offset parent has position not static (default case)
        if ($dpOffset !== $elOffset && $dpOffset !== document.body) {
            let dpOffsetDims = $dpOffset.getBoundingClientRect();

            dims = {
                top: vpDims.top - dpOffsetDims.top,
                left: vpDims.left - dpOffsetDims.left,
                width: vpDims.width,
                height: vpDims.height
            };

            scrollTop = 0;
            scrollLeft = 0;
        }

        switch (main) {
            case 'top':
                top = dims.top - selfDims.height - offset;
                break;
            case 'right':
                left = dims.left + dims.width + offset;
                break;
            case 'bottom':
                top = dims.top + dims.height + offset;
                break;
            case 'left':
                left = dims.left - selfDims.width - offset;
                break;
        }

        switch (secondary) {
            case 'top':
                top = dims.top;
                break;
            case 'right':
                left = dims.left + dims.width - selfDims.width;
                break;
            case 'bottom':
                top = dims.top + dims.height - selfDims.height;
                break;
            case 'left':
                left = dims.left;
                break;
            case 'center':
                if (/left|right/.test(main)) {
                    top = dims.top + dims.height / 2 - selfDims.height / 2;
                } else {
                    left = dims.left + dims.width / 2 - selfDims.width / 2;
                }
        }

        this.$datepicker.style.cssText = `left: ${left + scrollLeft}px; top: ${top + scrollTop}px`;
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

    _setPositionClasses(pos) {
        if (typeof pos === 'function') {
            this.$datepicker.classList.add('-custom-position-');

            return;
        }

        pos = pos.split(' ');
        let main = pos[0],
            sec = pos[1],
            classes = `air-datepicker -${main}-${sec}- -from-${main}-`;

        this.$datepicker.classList.add(...classes.split(' '));
    }

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
        let dp = this;

        // this._buildBaseHtml();

        this.$container.appendChild(this.$datepicker);

        if (this.elIsInput) {
            if (!inline) {
                this._setPositionClasses(position);
            }
        }

        if (inline || !this.elIsInput) {
            this.$datepicker.classList.add('-inline-');
        }

        if (classes) {
            this.$datepicker.classList.add(...classes.split(' '));
        }

        if (onlyTimepicker) {
            this.$datepicker.classList.add('-only-timepicker-');
        }

        if (isMobile && !treatAsInline) {
            this._addMobileAttributes();
        }

        this.calendars.forEach(cal => cal._createComponents());
    }

    _destroyComponents() {
        this.calendars.forEach(cal => cal._destroyComponents());
    }

    show() {
        let {onShow, isMobile} = this.opts;
        this._cancelScheduledCall();

        if (!this.visible && !this.hideAnimation) {
            this._createComponents();
        }

        this.setPosition(this.opts.position);

        this.$datepicker.classList.add('-active-');
        this.visible = true;

        if (onShow) {
            this._scheduleCallAfterTransition(onShow);
        }

        if (isMobile) {
            this._showMobileOverlay();
        }
    }

    hide() {
        let {onHide, isMobile} = this.opts;
        let hasTransition = this._hasTransition();

        this.visible = false;
        this.hideAnimation = true;

        this.$datepicker.classList.remove('-active-');

        if (this.customHide) {
            this.customHide();
        }

        if (this.elIsInput) {
            this.$el.blur();
        }

        this._scheduleCallAfterTransition((isAnimationCompleted) => {
            if (
                !this.customHide &&
                ((isAnimationCompleted && hasTransition) ||
                    (!isAnimationCompleted && !hasTransition))
            ) {
                this._finishHide();
            }
            onHide && onHide(isAnimationCompleted);
        });

        if (isMobile) {
            $datepickerOverlay.classList.remove('-active-');
        }
    }

    _finishHide = () => {
        this.hideAnimation = false;
        this._destroyComponents();
        this.$container.removeChild(this.$datepicker);
    }

    _addMobileAttributes() {
        $datepickerOverlay.addEventListener('click', this._onClickOverlay);

        this.$datepicker.classList.add('-is-mobile-');
        this.$el.setAttribute('readonly', true);
    }

    _removeMobileAttributes() {
        $datepickerOverlay.removeEventListener('click', this._onClickOverlay);

        this.$datepicker.classList.remove('-is-mobile-');

        if (!this.initialReadonly && this.initialReadonly !== '') {
            this.$el.removeAttribute('readonly');
        }
    }

    /**
     * Sets new view date of the AirDatepicker
     * @param {DateLike} date
     */
    setViewDate = (date) => {
        date = createDate(date);

        if (!(date instanceof Date)) return;

        if (isSameDate(date, this.viewDate)) return;
        this.viewDate = date;
        let {onChangeViewDate} = this.opts;

        if (onChangeViewDate) {
            let {month, year} = this.parsedViewDate;
            onChangeViewDate({
                month,
                year,
                decade: this.curDecade
            });
        }

        this.trigger(EVENTS.changeViewDate, date);
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

    get $container() {
        return this.$customContainer || $datepickersContainer;
    }
    get parsedViewDate() {
        return getParsedDate(this.viewDate);
    }
    get curDecade() {
        return getDecade(this.viewDate);
    }
}

withEvents(AirDatepicker.prototype);
