import defaults from './defaults';
import {getEl} from './utils';

import './datepicker.scss';

let $body = '';

export default class AirDatepicker {
    constructor(el, opts) {
        this.$el = getEl(el);
        this.opts = {...defaults, ...opts};

        if (!$body) {
            $body = getEl('body');
        }

        if (!this.opts.startDate) {
            this.opts.startDate = new Date();
        }

        if (this.$el.nodeName === 'INPUT') {
            this.elIsInput = true;
        }

    }
    static defaults = defaults
}
