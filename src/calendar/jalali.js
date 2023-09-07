/**
 * Implementation of JavaScript Date class for Jalali calendar
 *
 * @package     JalaliDate
 * @author      Ali Fazelzadeh <afzcode@gmail.com>
 * @copyright   2023 Ali Fazelzadeh
 * @license     http://www.gnu.org/copyleft/lesser.html
 * @see         http://www.fourmilab.ch/documents/calendar/ by John Walker
 * @see         https://github.com/tahajahangir/jdate
 */
export default class JalaliDate extends Date {
    // Proxy get/set time-related methods to internal date object
    #proxyProps = [
        'getHours', 'getMilliseconds', 'getMinutes', 'getSeconds', 'getTime', 'getUTCDay', 'getUTCHours', 'getTimezoneOffset',
        'getUTCMilliseconds', 'getUTCMinutes', 'getUTCSeconds', 'setHours', 'setMilliseconds', 'setMinutes', 'setSeconds',
        'setTime', 'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes', 'setUTCSeconds', 'valueOf', 'getDay'
    ];
    // Proxy to{...} time-related methods
    #proxyToProps = [
        'toLocaleTimeString', 'toLocaleDateString', 'toLocaleString',
        'toJSON', 'toString', 'toUTCString', 'toISOString', 'toTimeString', 'toDateString'
    ];

    #date;
    #jalaliEpoch = 1948320.5;
    #gregorianEpoch = 1721425.5;
    #gMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    #jMonthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    #cached_date_ts = null;
    #cached_date = {
        'year'      : 0,
        'month'     : 0,
        'day'       : 0,
        'weekDay'   : 0,
        'monthDays' : 0,
        'yearDay'   : 0
    };
    #cached_utc_date_ts = null;
    #cached_utc_date = {
        'year'      : 0,
        'month'     : 0,
        'day'       : 0,
        'weekDay'   : 0,
        'monthDays' : 0,
        'yearDay'   : 0
    };

    #leap_persian(year) {
        return ((((((year - ((year > 0) ? 474 : 473)) % 2820) + 474) + 38) * 682) % 2816) < 682;
    }

    #leap_gregorian(year) {
        return ((year % 4) == 0) && (((year % 100) != 0) || ((year % 400) == 0));
    }

    #persian_to_jd(year, month, day) {
        let epbase, epyear, exyear;

        exyear = Math.floor((month - 1) / 12);
        year   = year + exyear;
        month  = month - exyear * 12;

        epbase = year - ((year >= 0)? 474 : 473);
        epyear = 474 + (epbase % 2820);

        return day +
            ((month <= 7)? ((month - 1) * 31) : (((month - 1) * 30) + 6)) +
            Math.floor(((epyear * 682) - 110) / 2816) +
            (epyear - 1) * 365 +
            Math.floor(epbase / 2820) * 1029983 +
            (this.#jalaliEpoch - 1);
    }

    #jd_to_persian(jd) {
        let year, month, day, wday, depoch, cycle, cyear, ycycle, aux1, aux2, yday;

        jd = Math.floor(jd) + 0.5;
        wday = Math.floor(jd + 1.5) % 7;

        depoch = jd - this.#persian_to_jd(475, 1, 1);
        cycle = Math.floor(depoch / 1029983);
        cyear = depoch % 1029983;
        if (cyear == 1029982) {
            ycycle = 2820;
        } else {
            aux1 = Math.floor(cyear / 366);
            aux2 = cyear % 366;
            ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) +
            aux1 + 1;
        }

        year = ycycle + (2820 * cycle) + 474;
        if (year <= 0) {
            year--;
        }
        yday = (jd - this.#persian_to_jd(year, 1, 1)) + 1;
        month = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
        day = (jd - this.#persian_to_jd(year, month, 1)) + 1;

        return {
            'year'      : year,
            'month'     : month,
            'day'       : day,
            'weekDay'   : wday,
            'monthDays' : this.#jMonthDays[month - 1] + (month == 12? Number(this.#leap_persian(year)) : 0),
            'yearDay'   : yday
        };
    }

    #gregorian_to_jd(year, month, day) {
        return (this.#gregorianEpoch - 1) +
            (365 * (year - 1)) +
            Math.floor((year - 1) / 4) +
            (-Math.floor((year - 1) / 100)) +
            Math.floor((year - 1) / 400) +
            Math.floor(
                (((367 * month) - 362) / 12) +
                ((month <= 2)? 0 : (this.#leap_gregorian(year)? -1 : -2)) +
                day
            );
    }

    #jd_to_gregorian(jd) {
        let depoch, quadricent, dqc, cent, dcent, quad, dquad, yindex, month, day, year, yday, wday, leapadj;

        jd = Math.floor(jd - 0.5) + 0.5;
        wday = Math.floor(jd + 1.5) % 7;

        depoch = jd - this.#gregorianEpoch;
        quadricent = Math.floor(depoch / 146097);

        dqc = depoch % 146097;
        cent = Math.floor(dqc / 36524);
        dcent = dqc % 36524;
        quad = Math.floor(dcent / 1461);
        dquad = dcent % 1461;
        yindex = Math.floor(dquad / 365);
        year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
        if (!((cent == 4) || (yindex == 4))) {
            year++;
        }

        yday = jd - this.#gregorian_to_jd(year, 1, 1);
        leapadj = (jd < this.#gregorian_to_jd(year, 3, 1)) ? 0 : (this.#leap_gregorian(year) ? 1 : 2);
        month = Math.floor((((yday + leapadj) * 12) + 373) / 367);
        day = (jd - this.#gregorian_to_jd(year, month, 1)) + 1;

        return {
            'year'      : year,
            'month'     : month,
            'day'       : day,
            'weekDay'   : wday,
            'monthDays' : this.#gMonthDays[month - 1] + (month == 2? Number(this.#leap_gregorian(year)) : 0),
            'yearDay'   : yday
        };
    }

    #parseDate(string, convertToPersian) {
        /*
         http://en.wikipedia.org/wiki/ISO_8601
         http://dygraphs.com/date-formats.html
         https://github.com/arshaw/xdate/blob/master/src/xdate.js#L414
         https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
         tests:
         +parseDate('2014') == +new Date('2014')
         +parseDate('2014-2') == +new Date('2014-02')
         +parseDate('2014-2-3') == +new Date('2014-02-03')
         +parseDate('2014-02-03 12:11') == +new Date('2014/02/03 12:11')
         +parseDate('2014-02-03T12:11') == +new Date('2014/02/03 12:11')
         parseDate('2014/02/03T12:11') == undefined
         +parseDate('2014/02/03 12:11:10.2') == +new Date('2014/02/03 12:11:10') + 200
         +parseDate('2014/02/03 12:11:10.02') == +new Date('2014/02/03 12:11:10') + 20
         parseDate('2014/02/03 12:11:10Z') == undefined
         +parseDate('2014-02-03T12:11:10Z') == +new Date('2014-02-03T12:11:10Z')
         +parseDate('2014-02-03T12:11:10+0000') == +new Date('2014-02-03T12:11:10Z')
         +parseDate('2014-02-03T10:41:10+0130') == +new Date('2014-02-03T12:11:10Z')
         */
        let re = /^(\d|\d\d|\d\d\d\d)(?:([-\/])(\d{1,2})(?:\2(\d|\d\d|\d\d\d\d))?)?(([ T])(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?(Z|([+-])(\d{2})(?::?(\d{2}))?)?)?$/,
            match = re.exec(string);
        // re.exec('2012-4-5 01:23:10.1111+0130')
        //  0                              1       2    3    4    5                      6    7     8     9     10      11       12   13    14
        // ["2012-4-5 01:23:10.1111+0330", "2012", "-", "4", "5", " 01:23:10.1111+0130", " ", "01", "23", "10", "1111", "+0330", "+", "03", "30"]
        if (!match) return;

        let separator = match[2],
            timeSeparator = match[6],
            year = +match[1],
            month = +match[3] || 1,
            day = +match[4] || 1,
            isISO = (separator != '/') && (match[6] != ' '),
            hour = +match[7] || 0,
            minute = +match[8] || 0,
            seconds = +match[9] || 0,
            millis = +('0.' + (match[10] || '0')) * 1000,
            tz = match[11],
            isNonLocal = isISO && (tz || !match[5]),
            tzOffset = (match[12] == '-' ? -1 : 1) * ((+match[13] || 0) * 60 + (+match[14] || 0));

        // timezone should be empty if dates are with / (2012/1/10)
        if ((tz || timeSeparator == 'T') && !isISO) return;
        // one and only-one of year/day should be 4-chars (2012/1/10 vs 10/1/2012)
        if ((day >= 1000) == (year >= 1000)) return;

        if (day >= 1000) {
            // year and day only can be swapped if using '/' as separator
            if (separator == '-') return;
            day = +match[1];
            year = day;
        }
        if (convertToPersian) {
            let persian = this.#jd_to_gregorian(this.#persian_to_jd(year, month, day));
            year = persian.year;
            month = persian.month;
            day = persian.day;
        }
        let date = new Date(year, month - 1, day, hour, minute, seconds, millis);
        if (isNonLocal) {
            date.setUTCMinutes(date.getUTCMinutes() - date.getTimezoneOffset() + tzOffset);
        }

        return date;
    }

    /**
     * returns current Jalali date representation of internal date object, eg. [1394, 12, 5]
     * Caches the converted Jalali date for improving performance
     * @returns {Array}
     */
    #persianDate = function () {
        if (this.#cached_date_ts != +this.#date) {
            this.#cached_date_ts = +this.#date;
            this.#cached_date = this.#jd_to_persian(
                this.#gregorian_to_jd(this.#date.getFullYear(), this.#date.getMonth() + 1, this.#date.getDate())
            );
        }

        return this.#cached_date
    }

    /**
     * Exactly like `persianDate` but for UTC value of date
     */
    #persianUTCDate() {
        if (this.#cached_utc_date_ts != +this.#date) {
            this.#cached_utc_date_ts = +this.#date;
            this.#cached_utc_date = this.#jd_to_persian(
                this.#gregorian_to_jd(
                    this.#date.getUTCFullYear(), this.#date.getUTCMonth() + 1, this.#date.getUTCDate()
                )
            );
        }

        return this.#cached_utc_date
    }

    /**
     *
     * @param which , which component of date to change? 0 for year, 1 for month, 2 for day
     * @param value , value of specified component
     * @param {Number=} dayValue , change the day along-side specified component, used for setMonth(month[, dayValue])
     */
    #setPersianDate(which, value, dayValue) {
        let persian = this.#persianDate();
        persian[which] = value;
        if (dayValue !== undefined) {
            persian['day'] = dayValue;
        }
        let new_date = this.#jd_to_gregorian(
            this.#persian_to_jd(persian['year'], persian['month'], persian['day'])
        );
        this.#date.setFullYear(new_date.year);
        this.#date.setMonth(new_date.month - 1, new_date.day);
    }

    /**
     * Exactly like `setPersianDate`, but operates UTC value
     */
    #setUTCPersianDate(which, value, dayValue) {
        let persian = this.#persianUTCDate();
        if (dayValue !== undefined) {
            persian['day'] = dayValue;
        }
        persian[which] = value;
        let new_date = this.#jd_to_gregorian(
            this.#persian_to_jd(persian['year'], persian['month'], persian['day'])
        );
        this.#date.setUTCFullYear(new_date.year);
        this.#date.setUTCMonth(new_date.month - 1, new_date.day);
    }

    /**
     * All date getter methods
     */
    getDate() {
        return this.#persianDate()['day'];
    }

    getMonth() {
        return this.#persianDate()['month'] - 1;
    }

    getFullYear() {
        return this.#persianDate()['year'];
    }

    getUTCDate() {
        return this.#persianUTCDate()['day'];
    }

    getUTCMonth() {
        return this.#persianUTCDate()['month'] - 1;
    }

    getUTCFullYear() {
        return this.#persianUTCDate()['year'];
    }

    getMonthDays(monthValue) {
        return (this.#leap_persian(this.#persianDate()['year']) && monthValue == 11)? 30 : this.#jMonthDays[monthValue];
    }

    /**
     * All date setter methods
     */
    setDate(dayValue) {
        this.#setPersianDate('day', dayValue);
    }

    setFullYear(yearValue) {
        this.#setPersianDate('year', yearValue);
    }

    setMonth(monthValue, dayValue) {
        this.#setPersianDate('month', monthValue + 1, dayValue);
    }

    setUTCDate(dayValue) {
        this.#setUTCPersianDate('day', dayValue);
    }

    setUTCFullYear(yearValue) {
        this.#setUTCPersianDate('year', yearValue);
    }

    setUTCMonth(monthValue, dayValue) {
        this.#setUTCPersianDate('month', monthValue + 1, dayValue);
    }

    /**
     * The Date.now() method returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
     */
    static now() {
        return Date.now();
    }

    /**
     * The Date.UTC() method accepts the same parameters as the longest form of the constructor, and returns the number of
     * milliseconds in a Date object since January 1, 1970, 00:00:00, universal time.
     */
    static UTC(year, month, date, hours, minutes, seconds, milliseconds) {
        let d = this.#jd_to_gregorian(this.#persian_to_jd(year, month + 1, date || 1));
        return Date.UTC(d.year, d.month - 1, d.day, hours || 0, minutes || 0, seconds || 0, milliseconds || 0);
    }

    /**
     * parses a string representation of a date, and returns the number of milliseconds since January 1, 1970, 00:00:00 UTC.
     */
    static parse(string) {
        return new JalaliDate(string).getTime();
    }

    /**
     * The Date.to{...} methods can return a string with a language sensitive representation of this date,
     * so we change it to return date in Jalali calendar
     */
    #format(method, ...parameters) {
        //FIXME: it's better use Intl.DateTimeFormat to format result
        return this.getFullYear() + '/' + (this.getMonth() + 1).toString().padStart(2, '0') + '/' +
            this.getDate().toString().padStart(2, '0') + ' ' +  this.getHours().toString().padStart(2, '0') + ':' +
            this.getMinutes().toString().padStart(2, '0') + ':' + this.getSeconds().toString().padStart(2, '0');
    }

    /**
     * @param {Object=} a ,may have different types for different semantics: 1) string: parse a date
     *         2) Date object: clone a date object  3) number: value for year
     * @param {Number=} month
     * @param {Number=} day
     * @param {Number=} hour
     * @param {Number=} minute
     * @param {Number=} second
     * @param {Number=} millisecond
     * @constructor
     * @extends {Date}
     */
    constructor(a, month, day, hour, minute, second, millisecond) {
        super();
        if (typeof a == 'string') {
            this.#date = this.#parseDate(a, true);
            if (!this.#date) throw 'Cannot parse date string'
        } else if (arguments.length == 0) {
            this.#date = new Date();
        } else if (arguments.length == 1) {
            this.#date = new Date((a instanceof JalaliDate)?a._d:a);
        } else {
            let persian = this.#jd_to_gregorian(
                this.#persian_to_jd(a, (month || 0) + 1, day === undefined? 1 : (day || 0))
            );
            this.#date = new Date(
                persian.year, persian.month - 1, persian.day, hour || 0, minute || 0, second || 0, millisecond || 0
            );
        }

        // proxy to internal Date methods
        this.#proxyProps.forEach((prop) => {
            this[prop] = function() {
                return this.#date[prop].apply(this.#date, arguments);
            }
        });
        // proxy to format method
        this.#proxyToProps.forEach((prop) => {
            this[prop] = function() {
                return this.#format(prop, ...Array.from(arguments));
            }
        });
    }

}
