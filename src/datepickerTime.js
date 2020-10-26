/* eslint-disable */
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
} from './utils';

import './datepickerTime.scss';
import consts from './consts';

/**
 * Timepicker
 *
 * How does it work:
 * Timepicker has its own hour and minute values. At the start they will be equal to current time, or to min/max date values.
 * When user selects date, timepicker add its values to the date (when consts.eventChangeSelectedDate is triggered).
 * We could prevent adding time to date by passing addTime=false parameter to event.
 * When lastSelectedDate is changed (e.g. when user clicks on already selected date in multiple dates mode or in range mode)
 * then hour and minute values are taken from this date and stored in a timepicker instance.
 *
 */
export default class DatepickerTime {
    constructor({opts, dp} = {}) {
        this.opts = opts;
        this.dp = dp;
        this.init();
    }

    init() {
        this.setTime(this.dp.viewDate);
        this.createElement();
        this.buildHtml();
        this.defineDOM();
        this.render();

        this.bindDatepickerEvents();
        this.bindDOMEvents();
    }

    bindDatepickerEvents(){
        this.dp.on(consts.eventChangeSelectedDate, this.onChangeSelectedDate);
        this.dp.on(consts.eventChangeLastSelectedDate, this.onChangeLastSelectedDate);
    }

    bindDOMEvents(){
        let changeEvent = 'input';
        if (navigator.userAgent.match(/trident/gi)) {
            changeEvent = 'change';
        }

        addEventListener(this.$ranges, changeEvent, this.onChangeInputRange);
        addEventListener(this.$ranges, 'mouseenter', this.onMouseEnterLeave);
        addEventListener(this.$ranges, 'mouseleave', this.onMouseEnterLeave);
    }

    createElement(){
        this.$el = createElement({className: classNames('datepicker-time', {'-am-pm-': dp.ampm,})});
    }

    buildHtml(data){
        let {
            hours, displayHours, minutes, minHours, minMinutes, maxHours, maxMinutes, dp, dayPeriod,
            opts: {hoursStep, minutesStep}
        } = this;

        this.$el.innerHTML = `` +
            `<div class="datepicker-time--current">` +
            `   <span class="datepicker-time--current-hours">${getLeadingZeroNum(displayHours)}</span>` +
            `   <span class="datepicker-time--current-colon">:</span>` +
            `   <span class="datepicker-time--current-minutes">${getLeadingZeroNum(minutes)}</span>` +
            `   ${dp.ampm ? `<span class='datepicker-time--current-ampm'>${dayPeriod}</span>` : ''}` +
            `</div>` +
            `<div class="datepicker-time--sliders">` +
            `   <div class="datepicker-time--row">` +
            `      <input type="range" name="hours" value="${hours}" min="${minHours}" max="${maxHours}" step="${hoursStep}"/>` +
            `   </div>` +
            `   <div class="datepicker-time--row">` +
            `      <input type="range" name="minutes" value="${minutes}" min="${minMinutes}" max="${maxMinutes}" step="${minutesStep}"/>` +
            `   </div>` +
            `</div>`;
    }

    defineDOM(){
        let getElWithContext = selector=>getEl(selector, this.$el);
        
        this.$ranges = this.$el.querySelectorAll('[type="range"]');
        this.$hours = getElWithContext('[name="hours"]');
        this.$timeWrap = getElWithContext('[name="hours"]');
        this.$minutes = getElWithContext('[name="minutes"]');
        this.$hoursText = getElWithContext('.datepicker-time--current-hours');
        this.$minutesText = getElWithContext('.datepicker-time--current-minutes');
        this.$ampm = getElWithContext('.datepicker-time--current-ampm')
    }


    setTime(date){
        this.setMinMaxTime(date);
        this.setCurrentTime(date);
    }

    addTimeToDate(date) {
        if (!date) return;
        date.setHours(this.hours);
        date.setMinutes(this.minutes);
    }

    // old handleDate
    setMinMaxTime(date) {
        this.setMinMaxTimeFromOptions();

        if (date) {
            let {minDate, maxDate} = this.opts;
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

    setMinMaxTimeFromOptions(){
        let maxHoursPossible = 23,
            maxMinutesPossible = 59,
            {minHours, minMinutes, maxHours, maxMinutes} = this.opts;

        this.minHours = clamp(minHours, 0, maxHoursPossible);
        this.minMinutes = clamp(minMinutes, 0 ,maxMinutesPossible);
        this.maxHours = clamp(maxHours, 0, maxHoursPossible);
        this.maxMinutes = clamp(maxMinutes, 0, maxMinutesPossible);
    }

    setMinTimeFromMinDate(date){
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

    /**
     * Calculates valid hour value to display in text input and datepicker's body.
     * @param date {Date|Number} - date or hours
     * @param [ampm] {Boolean} - 12 hours mode
     * @returns {{hours: number, dayPeriod: string}}
     * @private
     */
    getValidHoursFromDate(date, ampm){
        let _date = date,
            hours = date;

        if (date instanceof Date) {
            _date = getParsedDate(date);
            hours = _date.hours;
        }

        let _ampm = ampm || this.dp.ampm,
            dayPeriod = 'am';

        if (_ampm) {
            switch(true) {
                case hours === 0:
                    hours = 12;
                    break;
                case hours === 12:
                    dayPeriod = 'pm';
                    break;
                case hours > 11:
                    hours = hours - 12;
                    dayPeriod = 'pm';
                    break;
                default:
                    break;
            }
        }

        return {
            hours: hours,
            dayPeriod: dayPeriod
        }
    }

    updateSliders(){
        setAttribute(this.$hours, {
            min: this.minHours,
            max: this.maxHours
        }).value = this.hours;

        setAttribute(this.$minutes, {
            min: this.minMinutes,
            max: this.maxMinutes
        }).value = this.minutes;
    }

    updateText(){
        this.$hoursText.innerHTML = getLeadingZeroNum(this.displayHours);
        this.$minutesText.innerHTML =  getLeadingZeroNum(this.minutes)

        if (this.dp.ampm) {
            this.$ampm.innerHTML(this.dayPeriod);
        }
    }



    onChangeSelectedDate = ({action, date, addTime=true, updateTime=false}) => {
        if (!date) return;

        // Check if date is minDate or maxDate and set timepickers time to corresponding values
        this.setMinMaxTime(date);
        this.setCurrentTime(updateTime ? date : false);

        this.addTimeToDate(date);
    }

    onChangeLastSelectedDate = (date) => {
        if (!date) return;

        this.setTime(date);
        this.render();
    }

    onChangeInputRange = (e) =>{
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
            $el = this.$minutesText

        if (name === 'hours') {
            $el = this.$hoursText;
        }

        $el.classList.toggle('-focus-');
    }

    set hours (val) {
        this._hours = val;

        let {hours, dayPeriod} = this.getValidHoursFromDate(val);

        this.displayHours = hours;
        this.dayPeriod = dayPeriod;
    }

    get hours() {
        return this._hours;
    }

    render(){
        this.updateSliders();
        this.updateText();
    }
}
