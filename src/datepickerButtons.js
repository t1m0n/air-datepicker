import {classNames, createElement} from './utils';
import buttonPresets from './buttonPresets';

import './datepickerButtons.scss';

export default class DatepickerButtons {
    constructor({dp, opts}) {
        this.dp = dp;
        this.opts = opts;

        this.init();
    }

    init() {
        this.createElement();
        this.render();
    }

    createElement() {
        this.$el = createElement({className: 'air-datepicker-buttons'});
    }

    destroy() {
        this.$el.parentNode.removeChild(this.$el);
    }

    clearHtml() {
        this.$el.innerHTML = '';
        return this;
    }

    generateButtons() {
        let {buttons} = this.opts;

        if (!Array.isArray(buttons)) {
            buttons = [buttons];
        }

        buttons.forEach((b) => {
            let data = b;

            if (typeof b === 'string' && buttonPresets[b]) {
                data = buttonPresets[b];
            }

            let button = this.createButton(data);
            if (data.onClick) {
                this.attachEventToButton(button, data.onClick);
            }

            this.$el.appendChild(button);
        });

    }

    attachEventToButton(button, onClick) {
        button.addEventListener('click', () => {
            onClick(this.dp);
        });
    }

    /**
     * Creates datepicker button HTML element
     * @param {String|Function} content - button content
     * @param {String} [className]
     * @param {String} [tagName=button]
     * @param {Object} [attrs]
     * @return HTMLElement
     */
    createButton({content, className, tagName = 'button', attrs = {}}) {
        let _content = typeof content === 'function' ? content(this.dp) : content;

        return createElement({
            tagName,
            innerHtml: `<span tabindex='-1'>${_content}</span>`,
            className: classNames('air-datepicker-button', className),
            attrs
        });
    }

    render() {
        this.generateButtons();
    }
}
