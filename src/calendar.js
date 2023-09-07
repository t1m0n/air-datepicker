import JalaliDate from './calendar/jalali';
export default class DateCalendar {
    #calendar;
    constructor(calendar) {
        this.#calendar = calendar || 'gregorian';
    }

    Date(...parameters) {
        let date;
        switch(this.#calendar) {
            case 'jalali':
                date = new JalaliDate(...parameters);
                break;
            default:
                date = new Date(...parameters);
        }

        date.calendar = this.#calendar;
        return date;
    }
}
