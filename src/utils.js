/**
 * Finds DOM element
 * @param {HTMLElement, String} el
 * @param {Document|HTMLElement} [context=document]
 */
import consts from './consts';

export function getEl (el, context=document) {
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
export function createElement({tagName='div', className='', innerHtml='', id='', attrs={}} = {}) {
    let $element = document.createElement(tagName);
    if (className) $element.classList.add(...className.split(' '));
    if (id) $element.id = id;

    if (innerHtml) {
        $element.innerHTML = innerHtml;
    }

    if (attrs) {
        for (let attr in attrs) {
            $element.setAttribute(attr, attrs[attr]);
        }
    }

    return $element;
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
 * Get detailed date object
 * @param {Date} date
 * @return {{
 *  date: number,
 *  hours: number,
 *  fullDate: (string|*),
 *  month: number,
 *  fullHours: (string|*),
 *  year: number,
 *  minutes: number,
 *  fullMonth: string,
 *  day: number,
 *  fullMinutes: (string|*)
 * }}
 */
export function getParsedDate(date) {
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        fullMonth: (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1, // One based
        date: date.getDate(),
        fullDate: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        day: date.getDay(),
        hours: date.getHours(),
        fullHours:  date.getHours() < 10 ? '0' + date.getHours() :  date.getHours() ,
        minutes: date.getMinutes(),
        fullMinutes:  date.getMinutes() < 10 ? '0' + date.getMinutes() :  date.getMinutes()
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
 * Add days to date
 * @param {Date} date
 * @param {Number} days
 * @return {Date}
 */
export function addDays(date, days) {
    let {year, month, date: _date} = getParsedDate(date);
    return new Date(year, month, _date + days);
}

/**
 * Class names handler, inspired by https://github.com/JedWatson/classnames but very simplified
 * @param {String|Object} classes - class names, could contain strings or object
 */
export function classNames(...classes) {
    let classNames = [];

    classes.forEach(c => {
        if (typeof c === 'object') {
            for(let cName in c) {
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
        el.forEach(node=>{
            node.classList.add(...classes);
        });
    } else {
        el.classList.add(...classes);
    }
}

export function removeClass(el, ...classes) {
    if (el.length) {
        el.forEach(node=>{
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
export function isSameDate(date1, date2, cellType=consts.days) {
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

export function isDateBigger(date, comparedDate) {
    return date.getTime() > comparedDate.getTime();
}

export function isDateSmaller(date, comparedDate) {
    return date.getTime() < comparedDate.getTime();
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
        el.forEach(e=>{
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
    if (!target || target === document) return false;

    if (target.matches(selector)) {
        return target;
    }

    return closest(target.parentNode, selector);
}
