import {afterEach, describe, expect, it, jest} from '@jest/globals';
import Datepicker from 'datepicker';
import {sleep} from './helpers';

let dp, input, altInput;

function init(opts = {}) {
    input = document.createElement('input');
    altInput = document.createElement('input');
    document.body.append(input, altInput);
    const change = jest.fn();
    input.addEventListener('change', change);
    dp = new Datepicker(input, {
        visible: true,
        dateFormat: 'yyyy-MM-dd',
        altField: altInput,
        altFieldDateFormat: 'yyyy-MM-dd',
        ...opts
    });
    return change;
}

afterEach(() => {
    dp.destroy();
    input.remove();
    altInput.remove();
});

describe('silent input changes', () => {
    it('initializes selected dates without notifying input listeners', async () => {
        const change = init({selectedDates: ['2024-02-01']});
        await sleep();
        expect(input.value).toBe('2024-02-01');
        expect(altInput.value).toBe(input.value);
        expect(change).not.toHaveBeenCalled();
    });

    it.each([true, false, undefined])('selectDate respects silent=%s', async (silent) => {
        const change = init();
        await dp.selectDate('2024-02-01', {silent});
        expect(input.value).toBe('2024-02-01');
        expect(altInput.value).toBe(input.value);
        expect(change).toHaveBeenCalledTimes(silent ? 0 : 1);
    });

    it('keeps silent and non-silent selections independent before callbacks run', async () => {
        const change = init({multipleDates: true});
        dp.selectDate('2024-02-01', {silent: true});
        await dp.selectDate('2024-02-02');
        expect(dp.selectedDates).toHaveLength(2);
        expect(change).toHaveBeenCalledTimes(1);
    });

    it.each([true, false])('clear respects silent=%s', async (silent) => {
        const change = init();
        await dp.selectDate('2024-02-01');
        change.mockClear();
        await dp.clear({silent});
        expect(input.value).toBe('');
        expect(altInput.value).toBe('');
        expect(change).toHaveBeenCalledTimes(silent ? 0 : 1);
    });

    it.each([true, false])('update selected dates respects silent=%s', async (silent) => {
        const change = init();
        dp.update({selectedDates: ['2024-02-01', '2024-02-02'], range: true}, {silent});
        await sleep();
        expect(dp.selectedDates).toHaveLength(2);
        expect(input.value).toContain('2024-02-02');
        expect(altInput.value).toBe(input.value);
        expect(change.mock.calls.length > 0).toBe(!silent);
    });

    it('silently reformats existing input values', async () => {
        const change = init();
        await dp.selectDate('2024-02-01');
        change.mockClear();
        dp.update({dateFormat: 'dd/MM/yyyy'}, {silent: true});
        await sleep();
        expect(input.value).toBe('01/02/2024');
        expect(altInput.value).toBe('2024-02-01');
        expect(change).not.toHaveBeenCalled();
    });

    it('still notifies input listeners on a calendar click', async () => {
        const change = init({startDate: '2024-02-01'});
        dp.getCell('2024-02-02').click();
        await sleep();
        expect(input.value).toBe('2024-02-02');
        expect(change).toHaveBeenCalledTimes(1);
    });

    it('still notifies input listeners when changing time after a silent selection', async () => {
        const change = init({timepicker: true});
        await dp.selectDate('2024-02-01', {silent: true});
        const hours = dp.$datepicker.querySelector('input[name="hours"]');
        hours.value = '15';
        hours.dispatchEvent(new Event('input'));
        expect(dp.selectedDates[0].getHours()).toBe(15);
        expect(change).toHaveBeenCalledTimes(1);
    });

});
