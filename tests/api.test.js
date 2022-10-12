import {beforeAll, afterEach, describe, test, it, expect} from '@jest/globals';
import Datepicker from 'datepicker';

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
    dp = new Datepicker($input, {visible: true, ...opts});
    $datepicker = dp.$datepicker;
}

describe('API TESTS', () => {
    describe('selectDate', () => {
        it('should select one passed date', (done) => {
            let selectedDate = new Date();
            init();

            dp.selectDate(selectedDate).then(() => {
                expect(dp.selectedDates).toContain(selectedDate);
                done();
            });
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

        test('update existing buttons with new one', () => {
            expect(() => {
                init({
                    visible: false,
                    buttons: ['clear']
                });

                dp.update({
                    buttons: ['today']
                });
            }).not.toThrow();
        });

        test('update `view` when calendar is hidden', () => {
            init({
                visible: false
            });
            expect(() => {
                dp.update({
                    view: 'months'
                });
            }
            ).not.toThrow();
        });
    });

    describe('clear', () => {
        it('should clear all selected dates', (done) => {

            init();

            dp.selectDate(new Date());

            dp.clear().then(() => {
                expect(dp.selectedDates).toHaveLength(0);
                expect(dp.$el.value).toBe('');
                done();
            });
        });
        it('should not trigger onSelect callback when silent is true', (done) => {
            let selected = false;

            init({
                selectedDates: [new Date()],
                onSelect() {
                    selected = true;
                }
            });

            dp.clear({silent: true}).then(() => {
                expect(selected).toBe(false);
                done();
            });
        });
    });
});
