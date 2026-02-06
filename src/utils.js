/**
 * Finds DOM element
 * @param {HTMLElement, String} el
 * @param {Document|HTMLElement} [context=document]
 */
import consts from './consts';

export function getEl(el, context = document) {
    return typeof el === 'string'
        ? context['querySelector'](el)
        : el;
}

/**
 * Creates HTML DOM element
 * @param {String} [tagName] - element's tag name
 * @param {String} [className]
 * @param {String} [innerHtml]
 * @param {String} [id]
 * @param {Object} [attrs]
 * @returns {HTMLElement}
 */
export function createElement({tagName = 'div', className = '', innerHtml = '', id = '', attrs = {}} = {}) {
    let $element = document.createElement(tagName);
    if (className) $element.classList.add(...className.split(' '));
    if (id) $element.id = id;

    if (innerHtml) {
        $element.innerHTML = innerHtml;
    }

    if (attrs) {
        setAttribute($element, attrs);
    }

    return $element;
}

/**
 * Sets multiple attributes of element
 * @param {HTMLElement} el
 * @param {Object} attrs - attributes object
 * @returns {HTMLElement}
 */
export function setAttribute(el, attrs) {
    for (let [name, value] of Object.entries(attrs)) {
        if (value === undefined) continue;

        el.setAttribute(name, value);
    }
    return el;
}

/**
 * Inserts newElement after targetElement
 * @param {HTMLElement} newElement - element to be inserted
 * @param {HTMLElement} targetElement - after which must be inserted
 * @return {HTMLElement} newElement
 */
export function insertAfter(newElement, targetElement) {
    targetElement.parentNode
        .insertBefore(newElement, targetElement.nextSibling);
    return newElement;
}

/**
 * Makes object deep copy
 * @param {Object} obj
 * @return {Object}
 */
export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Calculates amount of days in passed date
 * @param {Date} date
 * @return {number}
 */
export function getDaysCount(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Get detailed date parts for formatting
 *
 * @param {Date} date
 * @returns {{
 *   year: number,
 *   month: number,              // 0–11
 *   date: number,               // 1–31
 *   day: number,                // 0–6 (Sun–Sat)
 *
 *   hours: number,              // 0–23
 *   hours12: number,            // 1–12
 *   minutes: number,            // 0–59
 *   seconds: number,            // 0–59
 *   milliseconds: number,       // 0–999
 *
 *   fullMonth: string,          // 01–12
 *   fullDate: string,           // 01–31
 *   fullHours: string,          // 00–23
 *   fullHours12: string,        // 01–12
 *   fullMinutes: string,        // 00–59
 *   fullSeconds: string,        // 00–59
 *
 *   dayPeriod: 'am' | 'pm'
 * }}
 */
export function getParsedDate(date) {

    let hours = date.getHours(),
        {hours: hours12, dayPeriod} = getDayPeriodFromHours24(hours);

    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        day: date.getDay(),
        hours,
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        milliseconds: date.getMilliseconds(),

        fullMonth: String(date.getMonth() + 1).padStart(2, '0'),
        fullDate: String(date.getDate()).padStart(2, '0'),
        fullHours: String(hours).padStart(2, '0'),
        fullHours12: String(hours12).padStart(2, '0'),
        fullMinutes: String(date.getMinutes()).padStart(2, '0'),
        fullSeconds: String(date.getSeconds()).padStart(2, '0'),

        hours12,
        dayPeriod
    };
}

export function getDayPeriodFromHours24(hours) {
    let hours12 = hours % 12 === 0 ? 12 : hours % 12;
    let dayPeriod = hours > 11 ? 'pm' : 'am';

    return {
        dayPeriod,
        hours: hours12
    };
}

/**
 * Converts 1 -> 01
 * @param {Number} num
 * @return {String|Number}
 */
export function getLeadingZeroNum(num) {
    return num < 10 ? '0' + num : num;
}

/**
 * Calculates current decade
 * @param {Date} date
 * @return {number[]} - array of two years, decade start - decade end
 */
export function getDecade(date) {
    let firstYear = Math.floor(date.getFullYear() / 10) * 10;
    return [firstYear, firstYear + 9];
}

/**
 * Subtract days from date
 * @param {Date} date
 * @param {Number} days
 * @return {Date}
 */
export function subDays(date, days) {
    let {year, month, date: _date} = getParsedDate(date);
    return new Date(year, month, _date - days);
}

/**
 * Class names' handler, inspired by https://github.com/JedWatson/classnames but very simplified
 * @param {String|Object} classes - class names, could contain strings or object
 */
export function classNames(...classes) {
    let classNames = [];

    classes.forEach((c) => {
        if (typeof c === 'object') {
            for (let cName in c) {
                if (c[cName]) {
                    classNames.push(cName);
                }
            }
        } else if (c) {
            classNames.push(c);
        }
    });
    return classNames.join(' ');
}

export function toggleClass(el, classes) {
    for (let className in classes) {
        if (classes[className]) {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
    }
}

export function addClass(el, ...classes) {
    if (el.length) {
        el.forEach((node) => {
            node.classList.add(...classes);
        });
    } else {
        el.classList.add(...classes);
    }
}

export function removeClass(el, ...classes) {
    if (el.length) {
        el.forEach((node) => {
            node.classList.remove(...classes);
        });
    } else {
        el.classList.remove(...classes);
    }
}

/**
 * Checks if passed dates are the same
 * @param {Date} date1
 * @param {Date} date2
 * @param {String} cellType - one of days|months|years
 * @return {boolean}
 */
export function isSameDate(date1, date2, cellType = consts.days) {
    if (!date1 || !date2) return false;
    let d1 = getParsedDate(date1),
        d2 = getParsedDate(date2),

        conditions = {
            [consts.days]: d1.date === d2.date && d1.month === d2.month && d1.year === d2.year,
            [consts.months]: d1.month === d2.month && d1.year === d2.year,
            [consts.years]: d1.year === d2.year
        };

    return conditions[cellType];
}

export function isDateBigger(date, comparedDate, loose) {
    let d1 = copyDate(date, false).getTime(),
        d2 = copyDate(comparedDate, false).getTime();

    return loose
        ? d1 >= d2
        : d1 > d2;
}

export function isDateSmaller(date, comparedDate) {
    return !isDateBigger(date, comparedDate, true);
}

/**
 * Copies date
 * @param {Date} date
 * @param {Boolean} [keepTime] - should keep the time in a new date or not
 * @return {Date}
 */
export function copyDate(date, keepTime = true) {
    let newDate = new Date(date.getTime());

    if (typeof keepTime === 'boolean' && !keepTime) {
        resetTime(newDate);
    }

    return newDate;
}

export function resetTime(date) {
    date.setHours(0, 0, 0, 0);
    return date;
}

export function isDateBetween(date, dateFrom, dateTo) {
    return isDateBigger(date, dateFrom) && isDateSmaller(date, dateTo);
}

/**
 * Adds event listener to DOM element
 * @param {HTMLElement|HTMLCollection} el
 * @param {String} type
 * @param {Function} listener
 */
export function addEventListener(el, type, listener) {
    if (el.length) {
        el.forEach((e) => {
            e.addEventListener(type, listener);
        });
    } else {
        el.addEventListener(type, listener);
    }
}

/**
 * Finds closest DOM element to passed target. Similar to jQuery.closest()
 * @param {HTMLElement} target
 * @param {String} selector
 * @return {HTMLElement|Boolean}
 */
export function closest(target, selector) {
    if (!target || target === document ||  target instanceof DocumentFragment) return false;

    if (target.matches(selector)) {
        return target;
    }

    return closest(target.parentNode, selector);
}

/**
 * Clamps number between min and max
 * @param {Number} val
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
export function clamp(val, min, max,) {
    return val > max
        ? max
        : val < min
            ? min
            : val;
}

/**
 * Deep merge of objects or arrays, used to merge options
 * @param {object|array} target - target object or array
 * @param {object|array} objects - source objects
 * @return {object|array}
 */
export function deepMerge(target, ...objects) {
    objects.filter(o => o).forEach((obj) => {
        for (let [key, value] of Object.entries(obj)) {
            let arrayOrObject = value !== undefined ? value?.toString() === ('[object Object]' || '[object Array]') : false;

            if (arrayOrObject) {
                let targetType = target[key] !== undefined ? target[key].toString() : undefined,
                    sourceType = value.toString(),
                    initialValue = Array.isArray(value) ? [] : {};

                // If target and source types are different, e.g. we try to merge number with object,
                // then take source type
                target[key] = target[key]
                    ? targetType !== sourceType
                        ? initialValue
                        : target[key]
                    : initialValue;

                deepMerge(target[key], value);
            } else {
                target[key] = value;
            }
        }
    });

    return target;
}

/**
 * Checks if ISO date string consists only of numbers
 * @param {string} dateString
 * @returns {boolean}
 */
function dateStringIsDateOnly(dateString) {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

/**
 * Creates Date object from string or number. If passed param is instance of Date, then just returns it.
 * @param {number|string|Date} date
 * @return {Date | boolean}
 */
export function createDate(date) {
    let resultDate = date;

    if (!(date instanceof Date)) {
        // If string is date-only string, we should add time to it
        // so created date will be in a local time
        // https://github.com/t1m0n/air-datepicker/issues/589
        if (typeof date === 'string' && dateStringIsDateOnly(date)) {
            date += 'T00:00:00';
        }
        resultDate = new Date(date);
    }

    if (isNaN(resultDate.getTime())) {
        console.log(`Unable to convert value "${date}" to Date object`);
        resultDate = false;
    }

    return resultDate;
}

export function getWordBoundaryRegExp(sign) {
    let symbols = '\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;';

    return new RegExp('(^|>|' + symbols + ')(' + sign + ')($|<|' + symbols + ')', 'g');
}


export function ordinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    return Math.floor(diff / 86400000);
}

export function getWeek(date) {
    const d = new Date(date);
    d.setHours(0,0,0,0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(),0,1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

export function getWeekYear(date) {
    const d = new Date(date);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return d.getFullYear();
}

export function getTimezoneOffset(date, colon = true) {
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const abs = Math.abs(offset);
    const h = String(Math.floor(abs / 60)).padStart(2, '0');
    const m = String(abs % 60).padStart(2, '0');
    return colon ? `${sign}${h}:${m}` : `${sign}${h}${m}`;
}

export function formatExpandedYear(year, len = 6) {
    const sign = year >= 0 ? '+' : '-';
    return sign + String(Math.abs(year)).padStart(len - 1, '0');
}

export function addDays(date, days = 0) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

export function dateDifference(date1, date2) {
        return Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));
};

