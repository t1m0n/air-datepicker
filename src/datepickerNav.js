/* eslint-disable */
import {createElement, addEventListener, closest} from './utils';

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
        this.render();
        this._bindEvents();
        this._bindDatepickerEvents();
    }

    _bindEvents(){
        this.$el.addEventListener('click', this.onClickNav);
    }

    _bindDatepickerEvents(){
        this.dp.on(consts.eventChangeViewDate, this.render);
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

    onClickNav = (e) =>{
        let $item = closest(e.target, '.datepicker-nav--action');
        if (!$item) return;

        let actionName = $item.dataset.action;

        this.dp[actionName]();
    }

    render = () => {
        let title = this._getTitle();
        let {prevHtml, nextHtml} = this.opts;
        this.$el.innerHTML = `` +
            `<div class="datepicker-nav--action" data-action="prev">${prevHtml}</div>` +
            `<div class="datepicker-nav--title">${title}</div>` +
            `<div class="datepicker-nav--action" data-action="next">${nextHtml}</div>`;
    }
}
