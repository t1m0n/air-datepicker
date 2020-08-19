/* eslint-disable */
import {clamp, classNames, createElement, getLeadingZeroNum, getEl, getParsedDate, isSameDate} from './utils';

import './datepickerTime.scss';

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
    }

    createElement(){
        this.$el = createElement({className: 'datepicker-time'});
    }

    buildHtml(data){
        let {
            hours, displayHours, minutes, minHours, minMinutes, maxHours, maxMinutes, dp, dayPeriod,
            opts: {hoursStep, minutesStep}
        } = this;

        this.$el.innerHTML = `` +
            `<div class="${classNames('datepicker-time', {'-am-pm-': dp.ampm,})}">` +
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
            `</div>` +
            `</div>`;
    }

    defineDOM(){
        let getElWithContext = selector=>getEl(selector, this.$el);
        
        this.$ranges = getElWithContext('[type="range"]');
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
        let {hours, minutes} = getParsedDate(date);

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

    }
}
