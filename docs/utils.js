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
