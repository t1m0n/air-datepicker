import {
    addEventListener,
    clamp,
    classNames,
    createElement,
    getEl,
    getLeadingZeroNum,
    getParsedDate,
    isSameDate,
    setAttribute,
    getWordBoundaryRegExp, getDayPeriodFromHours24,
} from './utils';

import './datepickerTime.scss';
import consts from './consts';

/**
 * Timepicker
 *
 * How does it work:
 * Timepicker has its own hour and minute values. At the start they will be equal to current time, or to min/max date values.
 * When user selects date, timepicker add its values to the date (when consts.eventChangeSelectedDate is triggered).
 * When lastSelectedDate is changed (e.g. when user clicks on already selected date in multiple dates mode or in range mode)
 * then hour and minute values are taken from this date and stored in a timepicker instance.
 *
 */
export default class DatepickerTime {
    constructor({opts, dp} = {}) {
        this.opts = opts;
        this.dp = dp;
        let {timeFormat} = this.dp.locale;

        if (timeFormat && (timeFormat.match(getWordBoundaryRegExp('h')) || timeFormat.match(getWordBoundaryRegExp('hh')))) {
            this.ampm = true;
        }

        this.init();
    }

    init() {
        this.setTime(this.dp.lastSelectedDate || this.dp.viewDate);
        this.createElement();
        this.buildHtml();
        this.defineDOM();
        this.render();

        this.bindDatepickerEvents();
        this.bindDOMEvents();
    }

    bindDatepickerEvents() {
        this.dp.on(consts.eventChangeSelectedDate, this.onChangeSelectedDate);
        this.dp.on(consts.eventChangeLastSelectedDate, this.onChangeLastSelectedDate);
    }

    bindDOMEvents() {
        let changeEvent = 'input';
        if (navigator.userAgent.match(/trident/gi)) {
            changeEvent = 'change';
        }

        addEventListener(this.$ranges, changeEvent, this.onChangeInputRange);
        addEventListener(this.$ranges, 'mouseenter', this.onMouseEnterLeave);
        addEventListener(this.$ranges, 'mouseleave', this.onMouseEnterLeave);
        addEventListener(this.$ranges, 'focus', this.onFocus);
        addEventListener(this.$ranges, 'mousedown', this.onFocus);
        addEventListener(this.$ranges, 'blur', this.onBlur);
    }

    createElement() {
        this.$el = createElement({className: classNames('air-datepicker-time', {'-am-pm-': this.dp.ampm})});
    }

    destroy() {
        this.dp.off(consts.eventChangeSelectedDate, this.onChangeSelectedDate);
        this.dp.off(consts.eventChangeLastSelectedDate, this.onChangeLastSelectedDate);
        this.$el.parentNode.removeChild(this.$el);
    }

    buildHtml() {
        let {
            ampm, hours, displayHours, minutes, minHours, minMinutes, maxHours, maxMinutes, dayPeriod,
            opts: {hoursStep, minutesStep}
        } = this;

        this.$el.innerHTML = '' +
            '<div class="air-datepicker-time--current">' +
            `   <span class="air-datepicker-time--current-hours">${getLeadingZeroNum(displayHours)}</span>` +
            '   <span class="air-datepicker-time--current-colon">:</span>' +
            `   <span class="air-datepicker-time--current-minutes">${getLeadingZeroNum(minutes)}</span>` +
            `   ${ampm ? `<span class='air-datepicker-time--current-ampm'>${dayPeriod}</span>` : ''}` +
            '</div>' +
            '<div class="air-datepicker-time--sliders">' +
            '   <div class="air-datepicker-time--row">' +
            // eslint-disable-next-line max-len
            `      <input type="range" name="hours" value="${hours}" min="${minHours}" max="${maxHours}" step="${hoursStep}"/>` +
            '   </div>' +
            '   <div class="air-datepicker-time--row">' +
            // eslint-disable-next-line max-len
            `      <input type="range" name="minutes" value="${minutes}" min="${minMinutes}" max="${maxMinutes}" step="${minutesStep}"/>` +
            '   </div>' +
            '</div>';
    }

    defineDOM() {
        let getElWithContext = selector => getEl(selector, this.$el);

        this.$ranges = this.$el.querySelectorAll('[type="range"]');
        this.$hours = getElWithContext('[name="hours"]');
        this.$minutes = getElWithContext('[name="minutes"]');
        this.$hoursText = getElWithContext('.air-datepicker-time--current-hours');
        this.$minutesText = getElWithContext('.air-datepicker-time--current-minutes');
        this.$ampm = getElWithContext('.air-datepicker-time--current-ampm');
    }


    setTime(date) {
        this.setMinMaxTime(date);
        this.setCurrentTime(date);
    }

    addTimeToDate(date) {
        if (!date) return;
        date.setHours(this.hours);
        date.setMinutes(this.minutes);
    }

    setMinMaxTime(date) {
        this.setMinMaxTimeFromOptions();

        if (date) {
            let {minDate, maxDate} = this.dp;
            if (minDate && isSameDate(date, minDate)) {
                this.setMinTimeFromMinDate(minDate);
            }
            if (maxDate && isSameDate(date, maxDate)) {
                this.setMaxTimeFromMaxDate(maxDate);
            }
        }
    }

    setCurrentTime(date) {
        let {hours, minutes} = date ? getParsedDate(date) : this;

        this.hours = clamp(hours, this.minHours, this.maxHours);
        this.minutes = clamp(minutes, this.minMinutes, this.maxMinutes);
    }

    setMinMaxTimeFromOptions() {
        let maxHoursPossible = 23,
            maxMinutesPossible = 59,
            {minHours, minMinutes, maxHours, maxMinutes} = this.opts;

        this.minHours = clamp(minHours, 0, maxHoursPossible);
        this.minMinutes = clamp(minMinutes, 0, maxMinutesPossible);
        this.maxHours = clamp(maxHours, 0, maxHoursPossible);
        this.maxMinutes = clamp(maxMinutes, 0, maxMinutesPossible);
    }

    setMinTimeFromMinDate(date) {
        let {lastSelectedDate} = this.dp;

        this.minHours = date.getHours();

        if (lastSelectedDate && lastSelectedDate.getHours() > date.getHours()) {
            this.minMinutes = this.opts.minMinutes;
        } else {
            this.minMinutes = date.getMinutes();
        }
    }

    setMaxTimeFromMaxDate(date) {
        let {lastSelectedDate} = this.dp;

        this.maxHours = date.getHours();

        if (lastSelectedDate && lastSelectedDate.getHours() < date.getHours()) {
            this.maxMinutes = this.opts.maxMinutes;
        } else {
            this.maxMinutes = date.getMinutes();
        }
    }

    updateSliders() {
        setAttribute(this.$hours, {
            min: this.minHours,
            max: this.maxHours
        }).value = this.hours;

        setAttribute(this.$minutes, {
            min: this.minMinutes,
            max: this.maxMinutes
        }).value = this.minutes;
    }

    updateText() {
        this.$hoursText.innerHTML = getLeadingZeroNum(this.displayHours);
        this.$minutesText.innerHTML =  getLeadingZeroNum(this.minutes);

        if (this.ampm) {
            this.$ampm.innerHTML = this.dayPeriod;
        }
    }

    toggleTimepickerIsActive = (value) => {
        this.dp.timepickerIsActive = value;
    }

    onChangeSelectedDate = ({date, updateTime = false}) => {
        if (!date) return;

        // Check if date is minDate or maxDate and set timepicker's time to corresponding values
        this.setMinMaxTime(date);
        this.setCurrentTime(updateTime ? date : false);

        this.addTimeToDate(date);
    }

    onChangeLastSelectedDate = (date) => {
        if (!date) return;

        this.setTime(date);
        this.render();
    }

    onChangeInputRange = (e) => {
        let $target = e.target,
            name = $target.getAttribute('name');

        this[name] = $target.value;
        this.updateText();

        this.dp.trigger(consts.eventChangeTime, {
            hours: this.hours,
            minutes: this.minutes
        });
    }

    onMouseEnterLeave = (e) => {
        let name = e.target.getAttribute('name'),
            $el = this.$minutesText;

        if (name === 'hours') {
            $el = this.$hoursText;
        }

        $el.classList.toggle('-focus-');
    }

    onFocus = () => {
        this.toggleTimepickerIsActive(true);
    }

    onBlur = () => {
        this.toggleTimepickerIsActive(false);
    }

    set hours(val) {
        this._hours = val;

        let {hours, dayPeriod} = getDayPeriodFromHours24(val);

        this.displayHours = this.ampm ? hours : val;
        this.dayPeriod = dayPeriod;
    }

    get hours() {
        return this._hours;
    }

    render() {
        this.updateSliders();
        this.updateText();
    }
}
