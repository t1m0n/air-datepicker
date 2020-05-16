/* eslint-disable */
import consts from './consts';
import {getEl, createElement, insertAfter, deepCopy} from './utils';

let templates = {
    [consts.days]:`` +
        `<div class="datepicker-body--day-names"></div>` +
        `<div class="datepicker-body--cells -${consts.days}-"></div>`,
    [consts.months]: `<div class="datepicker-body--cells -${consts.months}-"></div>`,
    [consts.years]: `<div class="datepicker-body--cells -${consts.years}-"></div>`
};

export default class AirDatepickerBody {
    constructor({dp, type, opts}) {
        this.dp = dp;
        this.type = type;
        this.opts = opts;
        this.$el = '';

        this.init();
    }

    init(){
        this._buildBaseHtml();
        this._render();
    }

    _buildBaseHtml() {
        this.$el = createElement({
            className: `datepicker-body -${this.type}-`,
            innerHtml: templates[this.type]
        });

        this.dp.$content.appendChild(this.$el);

        this.$names = getEl('.datepicker-body--day-names', this.$el);
        this.$cells = getEl('.datepicker-body--cells', this.$el);
    }

    _renderDays(){

    }

    _renderMonths(){

    }

    _renderYears(){

    }

    _render(){
        switch (this.type) {
            case consts.days:
                this._renderDays();
                break;
            case consts.months:
                this._renderMonths();
                break;
            case consts.years:
                this._renderYears();
                break;
        }
    }
}
