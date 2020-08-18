/* eslint-disable */
import {createElement, isSameDate, getParsedDate, clamp} from './utils';
import consts from './consts';

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
        this.render();
    }

    createElement(){
        this.$el = createElement({className: 'datepicker-time'});
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

        this.minHours = minHours < 0 || minHours > maxHoursPossible ? 0 : minHours;
        this.minMinutes = minMinutes < 0 || minMinutes > maxMinutesPossible ? 0 : minMinutes;
        this.maxHours = maxHours < 0 || maxHours > maxHours ? maxHours : maxHoursPossible;
        this.maxMinutes = maxMinutes < 0 || maxMinutes > maxMinutes ? maxMinutesPossible : maxMinutes;
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

    render(){

    }
}
