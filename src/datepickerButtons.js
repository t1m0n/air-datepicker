/* eslint-disable */
import {classNames, createElement} from './utils';
import buttonPresets from './buttonPresets';

export default class DatepickerButtons {
    constructor({dp, opts}) {
        this.dp = dp;
        this.opts= opts;

        this.init();
    }

    init(){
        this.createElement();
        this.render();
    }

    createElement(){
        this.$el = createElement({className: 'datepicker-buttons'});
    }

    generateButtons(){
        let {buttons} = this.opts;

        buttons.forEach(b=>{
            let data = b;

            if (typeof b === 'string' && buttonPresets[b]) {
                data = buttonPresets[b];
            }

            let button = this.createButton(data);
            if (data.onClick) {
                this.attachEventToButton(button, data.onClick);
            }

            this.$el.appendChild(button)
        })

    }

    attachEventToButton(button, onClick) {
        button.addEventListener('click', ()=>{
            onClick(this.dp);
        })
    }

    /**
     * Creates datepicker button HTML element
     * @param {String|Function} content - button content
     * @param {String} [className]
     * @param {String} [tagName=button]
     * @return HTMLElement
     */
    createButton({content, className, tagName='button'}){
        return createElement({
            tagName,
            innerHtml: typeof content === 'function' ? content({dp: this.dp, locale: this.dp.locale}) : content,
            className: classNames('datepicker-button', className)
        });
    }

    render(){
        this.generateButtons();
    }
}
