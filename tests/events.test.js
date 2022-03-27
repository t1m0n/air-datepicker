import {beforeAll, afterEach, describe, test, it, expect} from '@jest/globals';
import Datepicker from 'datepicker';
import {DAY} from './helpers';

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


describe('EVENTS TEST', () => {
    describe('onSelect', () => {
        it('should be called when date is selected', (done) => {
            let selectedDate = new Date();

            init();

            dp.selectDate(selectedDate).then(() => {
                expect(dp.selectedDates).toHaveLength(1);

                done();
            });
        });

        it('should be called with fields {date, formattedDate, datepicker}', (done) => {
            let selectedDate = new Date(),
                format = 'dd.MM.yyyy',
                date,
                formattedDate,
                datepicker;

            selectedDate.setHours(0, 0, 0, 0);

            init({
                dateFormat: format,
                onSelect(data) {
                    date = data.date;
                    formattedDate = data.formattedDate;
                    datepicker = data.datepicker;
                }
            });

            dp.selectDate(selectedDate).then(() => {
                expect(date.getTime()).toBe(selectedDate.getTime());
                expect(formattedDate).toBe(dp.formatDate(selectedDate, format));
                expect(datepicker).toBeInstanceOf(Datepicker);

                done();
            });
        });

        it('should be called with array of dates if range is true', (done) => {
            let date1 = new Date(),
                date2 = new Date(date1.getTime() + DAY),
                date,
                formattedDate;

            init({
                range: true,
                onSelect(data) {
                    date = data.date;
                    formattedDate = data.formattedDate;
                }
            });

            dp.selectDate([date1, date2]).then(() => {
                expect(date).toHaveLength(2);
                expect(formattedDate).toHaveLength(2);

                done();
            });
        });

        it('should be called with array of dates if multipleDates is true', (done) => {
            let date1 = new Date(),
                date2 = new Date(date1.getTime() + DAY),
                date,
                formattedDate;

            init({
                visible: true,
                multipleDates: true,
                onSelect(data) {
                    date = data.date;
                    formattedDate = data.formattedDate;
                }
            });

            dp.selectDate([date1, date2]).then(() => {
                expect(date).toHaveLength(2);
                expect(formattedDate).toHaveLength(2);

                done();
            });
        });

        it('should be called with single date if multipleDates and range are false', (done) => {
            let date1 = new Date(),
                date,
                formattedDate;

            init({
                onSelect(data) {
                    date = data.date;
                    formattedDate = data.formattedDate;
                }
            });

            dp.selectDate(date1).then(() => {
                expect(date).toBeInstanceOf(Date);
                expect(typeof formattedDate).toBe('string');

                done();
            });
        });
    });

    describe('onRenderCell', () => {
        it('should called with fields {date, cellType, datepicker}', () => {
            let date,
                cellType,
                datepicker;

            init({
                visible: true,
                onRenderCell(data) {
                    date = data.date;
                    cellType = data.cellType;
                    datepicker = data.datepicker;
                }
            });

            expect(date).toBeInstanceOf(Date);
            expect(cellType).toBe('day');
            expect(datepicker).toBeInstanceOf(Datepicker);
        });
    });

    describe('onClickDayName', () => {
        it('should add click event on day name element', () => {
            let clicked = false;

            init({
                visible: true,
                onClickDayName({dayIndex, datepicker}) {
                    clicked = true;
                }
            });

            let $dayName = $datepicker.querySelector('.air-datepicker-body--day-name');

            $dayName.click();

            expect(clicked).toBe(true);
            expect($dayName).toHaveClass('-clickable-');
        });
        it('should be called with correct arguments', (done) => {
            init({
                visible: true,
                onClickDayName(args) {
                    expect('dayIndex' in args).toBe(true);
                    expect('datepicker' in args).toBe(true);

                    done();
                }
            });

            let $dayName = $datepicker.querySelector('.air-datepicker-body--day-name');

            $dayName.click();
        });
    });
});
