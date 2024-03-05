import {beforeAll, afterEach, describe, test, it, expect} from '@jest/globals';
import Datepicker from 'datepicker';
import {sleep} from './helpers';

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

        test('update selected dates', (done) => {
            init({
                visible: false,
                multipleDates: true,
                selectedDates: ['2024-03-05', '2024-03-06', '2024-03-07']
            });

            expect(dp.selectedDates).toHaveLength(3);

            dp.update({
                selectedDates: ['2024-02-01'],
            });
            sleep().then(() => {
                expect(dp.selectedDates).toHaveLength(1);
                expect(dp.selectedDates[0].toLocaleDateString('ru')).toEqual('01.02.2024');
                done();
            });
        });

        test('update should not trigger callback with silent == true', (done) => {
            let selected = false;
            let changedView = false;
            init({
                onSelect() {
                    selected = true;
                },
                onChangeView() {
                    changedView = true;
                }
            });

            dp.update({
                selectedDates: ['2024-02-01'],
                view: 'months'
            }, {silent: true});

            sleep().then(() => {
                expect(selected).toEqual(false);
                expect(changedView).toEqual(false);
                done();
            });

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

        it('should reset other date related properties to falsy values', (done) => {
            init();

            dp.selectDate(new Date());

            dp.clear().then(() => {
                expect(dp.selectedDates).toHaveLength(0);
                expect(dp.rangeDateFrom).toBeFalsy();
                expect(dp.rangeDateTo).toBeFalsy();
                expect(dp.lastSelectedDate).toBeFalsy();
                done();
            });
        });
    });

    describe('getViewDates', () => {
        it('should return array of all dates that should be visible in days view', () => {
            init({
                startDate: '2023-06-18'
            });

            const dates = dp.getViewDates('days');

            expect(dates).toHaveLength(35);
            expect(dates[0].toLocaleDateString('ru')).toBe('29.05.2023');
            expect(dates.at(-1).toLocaleDateString('ru')).toBe('02.07.2023');
        });

        it('should return array of all dates that should be visible in months view', () => {
            init({
                startDate: '2023-06-18'
            });

            const dates = dp.getViewDates('months');

            expect(dates).toHaveLength(12);
            expect(dates[0].toLocaleDateString('ru')).toBe('01.01.2023');
            expect(dates.at(-1).toLocaleDateString('ru')).toBe('01.12.2023');
        });

        it('should return array of all dates that should be visible in years view', () => {
            init({
                startDate: '2023-06-18'
            });

            const dates = dp.getViewDates('years');

            expect(dates).toHaveLength(12);
            expect(dates[0].toLocaleDateString('ru')).toBe('01.01.2019');
            expect(dates.at(-1).toLocaleDateString('ru')).toBe('01.01.2030');
        });
    });

    describe('disableDate', () => {
        it('should disable single date', () => {
            init({
                startDate: '2024-01-13'
            });

            dp.disableDate('2024-01-14');

            const cell = dp.getCell('2024-01-14');

            expect(cell.classList).toContain('-disabled-');
            expect(dp.disabledDates.size).toBe(1);
        });

        it('should disable multiple dates', () => {
            init({
                startDate: '2024-01-13'
            });

            dp.disableDate(['2024-01-14', '2024-01-15']);

            const cell1 = dp.getCell('2024-01-14');
            const cell2 = dp.getCell('2024-01-15');

            expect(cell1.classList).toContain('-disabled-');
            expect(cell2.classList).toContain('-disabled-');
            expect(dp.disabledDates.size).toBe(2);
        });
    });

    describe('enableDate', () => {
        it('should enable single date', () => {
            init({
                startDate: '2024-01-13'
            });

            dp.disableDate('2024-01-14');

            dp.enableDate('2024-01-14');

            const cell = dp.getCell('2024-01-14');

            expect(cell.classList).not.toContain('-disabled-');
            expect(dp.disabledDates.size).toBe(0);
        });

        it('should enable multiple dates', () => {
            init({
                startDate: '2024-01-13'
            });

            dp.disableDate(['2024-01-14', '2024-01-15']);
            dp.enableDate(['2024-01-14', '2024-01-15']);

            const cell1 = dp.getCell('2024-01-14');
            const cell2 = dp.getCell('2024-01-15');

            expect(cell1.classList).not.toContain('-disabled-');
            expect(cell2.classList).not.toContain('-disabled-');
            expect(dp.disabledDates.size).toBe(0);
        });
    });
});
