/* eslint-disable */
import {createElement} from './utils';

import './datepickerNav.scss';

export default class DatepickerNav {
    constructor({dp, opts}) {
        this.dp = dp;
        this.opts = opts;

        this.init();
    }

    init(){
        this._createElement();
        this.render();
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

    render = () => {
        let title = this._getTitle();
        let {prevHtml, nextHtml} = this.opts;
        this.$el.innerHTML = `` +
            `<div class="datepicker-nav--action" data-action="prev">${prevHtml}</div>` +
            `<div class="datepicker-nav--title">${title}</div>` +
            `<div class="datepicker-nav--action" data-action="next">${nextHtml}</div>`;
    }
}
