import {beforeAll, afterEach, describe, test, it, expect} from '@jest/globals';
import Datepicker from 'datepicker';
import {isSameDate} from 'utils';
import en from 'locale/en';
import de from 'locale/de';
import consts from 'consts';

let $input, $altInput, dp, $datepicker;

beforeAll(() => {
    $input = document.createElement('input');
    $altInput = document.createElement('input');
    document.body.appendChild($input);
    document.body.appendChild($altInput);
});

afterEach(() => {
    dp.destroy();
    dp = false;
    $datepicker = false;
});

function init(opts) {
    dp = new Datepicker($input, opts);
    $datepicker = dp.$datepicker;
}


describe('API TESTS', () => {
    describe('selectDate', () => {
        it('should select one passed date', () => {
            let selectedDate = new Date();
            init();

            dp.selectDate(selectedDate);

            expect(dp.selectedDates).toContain(selectedDate);
        });
    });

    describe('update', () => {
        test('minDate should be applied after init', () => {
            let minDate = new Date('2021-10-06');

            init({
                startDate: minDate
            });

            dp.update({
                minDate
            });

            expect(dp.getCell(minDate)).toHaveClass('-min-date-');
        });
    });
});
