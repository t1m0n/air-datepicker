/**
 * Finds DOM element
 * @param {HTMLElement, String} el
 */
export function getEl (el) {
    return typeof el === 'string'
        ? document.querySelector(el)
        : el;
}
