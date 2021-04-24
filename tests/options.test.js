import {beforeAll, afterEach, describe, test, it, expect} from '@jest/globals';
import Datepicker from 'datepicker';
import {isSameDate} from 'utils';
import en from 'locale/en';

let $input, dp, $datepicker;

beforeAll(() => {
    $input = document.createElement('input');
    document.body.appendChild($input);
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


describe('OPTIONS TESTS', () => {
    describe('classes', () => {
        it('should append custom classes to datepicker', () => {
            init({classes: 'custom-class'});
            expect($datepicker).toHaveClass('custom-class');
        });
    });

    describe('inline', () => {
        test('if datepicker has proper class', () => {
            init({inline: true});
            expect($datepicker).toHaveClass('-inline-');
        });
    });

    describe('locale', () => {
        it('should change locale to "en"', () => {
            init({locale: en});
            let currentMonthName = en.months[new Date().getMonth()];
            let $navMonth = $datepicker.querySelector('.datepicker-nav--title');

            expect($navMonth).toHaveTextContent(currentMonthName);
        });

        it('should modify inner locale object to the passed one', () => {
            init({locale: en});

            expect(dp.locale.days).toEqual(en.days);
        });

        it('should change locale string partially', () => {
            let daysMin = ['В','П','В','С','Ч','П','С'];

            init({
                locale: {
                    firstDay: 0,
                    daysMin
                }
            });

            let arrayFromHtml = [...$datepicker.querySelectorAll('.datepicker-body--day-name')].map(el => el.innerHTML);

            expect(arrayFromHtml).toEqual(daysMin);
        });
    });

    describe('startDate', () => {
        it('should change start date', () => {
            let startDate = new Date('2021-02-04');
            init({startDate});

            let $navMonth = $datepicker.querySelector('.datepicker-nav--title');

            expect($navMonth).toHaveTextContent('Февраль');
            expect(dp.viewDate).toEqual(startDate);
        });
    });
});
