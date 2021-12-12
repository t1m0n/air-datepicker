import {
    closest,
    createElement,
    getEl,
    toggleClass,
    getDecade, getParsedDate,
    removeClass
} from './utils';

import './datepickerNav.scss';
import consts from './consts';

export default class DatepickerNav {
    constructor({dp, opts}) {
        this.dp = dp;
        this.opts = opts;

        this.init();
    }

    init() {
        this._createElement();
        this._buildBaseHtml();
        this._defineDOM();

        this.render();

        this.handleNavStatus();
        this._bindEvents();
        this._bindDatepickerEvents();
    }

    _defineDOM() {
        this.$title = getEl('.air-datepicker-nav--title', this.$el);
        this.$prev = getEl('[data-action="prev"]', this.$el);
        this.$next = getEl('[data-action="next"]', this.$el);
    }

    _bindEvents() {
        this.$el.addEventListener('click', this.onClickNav);
        this.$title.addEventListener('click', this.onClickNavTitle);
    }

    _bindDatepickerEvents() {
        this.dp.on(consts.eventChangeViewDate, this.onChangeViewDate);
        this.dp.on(consts.eventChangeCurrentView, this.onChangeCurrentView);

        if (this.isNavIsFunction) {
            // Wait till time is added to date
            this.dp.on(consts.eventChangeSelectedDate, this.renderDelay);

            if (this.dp.opts.timepicker) {
                this.dp.on(consts.eventChangeTime, this.render);
            }
        }
    }

    destroy() {
        this.dp.off(consts.eventChangeViewDate, this.onChangeViewDate);
        this.dp.off(consts.eventChangeCurrentView, this.onChangeCurrentView);
        if (this.isNavIsFunction) {
            this.dp.off(consts.eventChangeSelectedDate, this.renderDelay);
            if (this.dp.opts.timepicker) {
                this.dp.off(consts.eventChangeTime, this.render);
            }
        }
    }

    _createElement() {
        this.$el = createElement({
            tagName: 'nav',
            className: 'air-datepicker-nav'
        });
    }

    _getTitle() {
        let {dp, opts} = this;
        let template = opts.navTitles[dp.currentView];

        if (typeof template === 'function') {
            return template(dp);
        }

        return dp.formatDate(dp.viewDate, template);
    }

    handleNavStatus() {
        let {disableNavWhenOutOfRange} = this.opts;
        let {minDate, maxDate} = this.dp;
        if (!(minDate || maxDate) || !disableNavWhenOutOfRange) return;

        let {year, month} = this.dp.parsedViewDate;
        let minDateParsed = minDate ? getParsedDate(minDate) : false;
        let maxDateParsed = maxDate ? getParsedDate(maxDate) : false;

        switch (this.dp.currentView) {
            case consts.days:
                if (minDate && (minDateParsed.month >= month && minDateParsed.year >= year)) {
                    this._disableNav('prev');
                }
                if (maxDate && maxDateParsed.month <= month && maxDateParsed.year <= year) {
                    this._disableNav('next');
                }
                break;
            case consts.months:
                if (minDate && minDateParsed.year >= year) {
                    this._disableNav('prev');
                }
                if (maxDate && maxDateParsed.year <= year) {
                    this._disableNav('next');
                }
                break;
            case consts.years: {
                let decade = getDecade(this.dp.viewDate);
                if (minDate && minDateParsed.year >= decade[0]) {
                    this._disableNav('prev');
                }
                if (maxDate && maxDateParsed.year <= decade[1]) {
                    this._disableNav('next');
                }
                break;
            }
        }
    }

    _disableNav(actionName) {
        getEl('[data-action="' + actionName + '"]', this.$el).classList.add('-disabled-');
    }

    _resetNavStatus() {
        removeClass(this.$el.querySelectorAll('.air-datepicker-nav--action'), '-disabled-');
    }

    onClickNav = (e) => {
        let $item = closest(e.target, '.air-datepicker-nav--action');
        if (!$item) return;

        let actionName = $item.dataset.action;

        this.dp[actionName]();
    }

    onChangeViewDate = () => {
        this.render();
        this._resetNavStatus();
        this.handleNavStatus();
    }

    onChangeCurrentView = () => {
        this.render();
        this._resetNavStatus();
        this.handleNavStatus();
    }

    onClickNavTitle = () => {
        if (this.dp.isFinalView) return;
        this.dp.up();
    }

    _buildBaseHtml() {
        let {prevHtml, nextHtml} = this.opts;

        this.$el.innerHTML = '' +
            `<div class="air-datepicker-nav--action" data-action="prev">${prevHtml}</div>` +
            '<div class="air-datepicker-nav--title"></div>' +
            `<div class="air-datepicker-nav--action" data-action="next">${nextHtml}</div>`;
    }

    get isNavIsFunction() {
        let {navTitles} = this.opts;

        return Object.keys(navTitles).find((view) => {
            return typeof navTitles[view] === 'function';
        });
    }

    update = () => {
        let {prevHtml, nextHtml} = this.opts;

        this.$prev.innerHTML = prevHtml;
        this.$next.innerHTML = nextHtml;

        this._resetNavStatus();
        this.render();
        this.handleNavStatus();
    }

    renderDelay = () => {
        setTimeout(this.render);
    }

    render = () => {
        this.$title.innerHTML = this._getTitle();

        toggleClass(this.$title, {
            '-disabled-': this.dp.isFinalView
        });
    }
}
