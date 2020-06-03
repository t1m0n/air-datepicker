/* eslint-disable */
import {closest, createElement, getEl, isDateBigger, removeClass, isDateSmaller} from './utils';

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
    }

    _bindDatepickerEvents(){
        this.dp.on(consts.eventChangeViewDate, this.onChangeViewDate);
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
                //TODO обработать когда другие виды будут готовы
                // if (!this.d._isInRange(new Date(y-1, m, d), 'year')) {
                //     this._disableNav('prev')
                // }
                // if (!this.d._isInRange(new Date(y+1, m, d), 'year')) {
                //     this._disableNav('next')
                // }
                break;
            case consts.years:
                // var decade = dp.getDecade(this.d.date);
                // if (!this.d._isInRange(new Date(decade[0] - 1, 0, 1), 'year')) {
                //     this._disableNav('prev')
                // }
                // if (!this.d._isInRange(new Date(decade[1] + 1, 0, 1), 'year')) {
                //     this._disableNav('next')
                // }
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

    _buildBaseHtml(){
        let {prevHtml, nextHtml} = this.opts;

        this.$el.innerHTML = `` +
            `<div class="datepicker-nav--action" data-action="prev">${prevHtml}</div>` +
            `<div class="datepicker-nav--title"></div>` +
            `<div class="datepicker-nav--action" data-action="next">${nextHtml}</div>`;
    }

    render = () => {
        this.$title.innerHTML = this._getTitle();
    }
}
