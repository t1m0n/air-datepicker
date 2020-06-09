/* eslint-disable */
import {closest, createElement, getEl, isDateBigger, toggleClass, removeClass, isDateSmaller, getDecade} from './utils';

import './datepickerNav.scss';
import consts from './consts';

export default class DatepickerNav {
    constructor({dp, opts}) {
        this.dp = dp;
        this.opts = opts;

        this.init();
    }

    init(){
        this._createElement();
        this._buildBaseHtml();
        this._defineDOM();

        this.render();

        this._handleNavStatus();
        this._bindEvents();
        this._bindDatepickerEvents();
    }

    _defineDOM(){
        this.$title = getEl('.datepicker-nav--title', this.$el);
        this.$prev = getEl('[data-action="prev"]', this.$el);
        this.$next = getEl('[data-action="next"]', this.$el);
    }

    _bindEvents(){
        this.$el.addEventListener('click', this.onClickNav);
        this.$title.addEventListener('click', this.onClickNavTitle)
    }

    _bindDatepickerEvents(){
        this.dp.on(consts.eventChangeViewDate, this.onChangeViewDate);
        this.dp.on(consts.eventChangeCurrentView, this.onChangeCurrentView);
    }

    _createElement(){
        this.$el = createElement({
            tagName: 'nav',
            className: 'datepicker-nav'
        })
    }

    _getTitle() {
        return this.dp.formatDate(this.opts.navTitles[this.dp.currentView], this.dp.viewDate)
    }

    _handleNavStatus() {
        let {minDate, maxDate, disableNavWhenOutOfRange} = this.opts;
        if (!(minDate || maxDate) || !disableNavWhenOutOfRange) return;

        let {year, month, date} = this.dp.parsedViewDate;

        switch (this.dp.currentView) {
            case consts.days:
                if (minDate && isDateSmaller(new Date(year, month - 1, 1), minDate)) {
                    this._disableNav('prev')
                }
                if (maxDate && isDateBigger(new Date(year, month + 1, 1), maxDate)) {
                    this._disableNav('next')
                }
                break;
            case consts.months:
                if (minDate && isDateSmaller(new Date(year - 1, month, date), minDate)) {
                    this._disableNav('prev')
                }
                if (maxDate && isDateBigger(new Date(year + 1, month, date), maxDate)) {
                    this._disableNav('next')
                }
                break;
            case consts.years:
                let decade = getDecade(this.dp.viewDate);
                if (minDate && isDateSmaller(new Date(decade[0] - 1, 0, 1), minDate)) {
                    this._disableNav('prev')
                }
                if (maxDate && isDateBigger(new Date(decade[1] + 1, 0, 1), maxDate)) {
                    this._disableNav('next')
                }
                break;
        }
    }

    _disableNav(actionName) {
        getEl('[data-action="' + actionName + '"]', this.$el).classList.add('-disabled-');
    }

    _resetNavStatus(){
        removeClass(document.querySelectorAll('.datepicker-nav--action'), '-disabled-');
    }

    onClickNav = (e) =>{
        let $item = closest(e.target, '.datepicker-nav--action');
        if (!$item) return;

        let actionName = $item.dataset.action;

        this.dp[actionName]();
    }

    onChangeViewDate = () =>{
        this.render();
        this._resetNavStatus();
        this._handleNavStatus();
    }

    onChangeCurrentView = view =>{
        this.render();
        this._resetNavStatus();
        this._handleNavStatus();
    }

    onClickNavTitle = e =>{
        if (this.dp.isFinalView) return;
        this.dp.up();
    }

    _buildBaseHtml(){
        let {prevHtml, nextHtml} = this.opts;

        this.$el.innerHTML = `` +
            `<div class="datepicker-nav--action" data-action="prev">${prevHtml}</div>` +
            `<div class="datepicker-nav--title"></div>` +
            `<div class="datepicker-nav--action" data-action="next">${nextHtml}</div>`;
    }

    render = () => {
        this.$title.innerHTML = this._getTitle();

        toggleClass(this.$title, {
            '-disabled-': this.dp.isFinalView
        })
    }
}
