import {beforeAll, afterEach, describe, test, it, expect} from '@jest/globals';
import Datepicker from 'datepicker';
import en from 'locale/en';
import de from 'locale/de';
import consts from 'consts';
import {DAY, sleep} from './helpers';

let $input, $altInput, dp, $datepicker;
const timeFormat = new Intl.DateTimeFormat('ru', {hour: 'numeric', minute: 'numeric'});


beforeAll(() => {
    $input = document.createElement('input');
    $altInput = document.createElement('input');
    document.body.appendChild($input);
    document.body.appendChild($altInput);
});


function init(opts) {
    dp = new Datepicker($input, {visible: true, ...opts});
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

            expect($input.nextSibling).toBe($datepicker);
            expect($datepicker).toHaveClass('-inline-');
        });
    });

    describe('locale', () => {
        it('should change locale to "en"', () => {
            init({locale: en});
            let currentMonthName = en.months[new Date().getMonth()];
            let $navMonth = $datepicker.querySelector('.air-datepicker-nav--title');

            expect($navMonth).toHaveTextContent(currentMonthName);
        });

        it('should modify inner locale object to the passed one', () => {
            init({locale: en});

            expect(dp.locale.days).toEqual(en.days);
        });

        it('should change locale string partially', () => {
            let daysMin = ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'];

            init({
                locale: {
                    firstDay: 0,
                    daysMin
                }
            });

            let arrayFromHtml = [...$datepicker.querySelectorAll('.air-datepicker-body--day-name')].map(el => el.innerHTML);

            expect(arrayFromHtml).toEqual(daysMin);
        });
    });

    describe('startDate', () => {
        it('should change start date', () => {
            let startDate = new Date('2021-02-04');
            init({startDate});

            let $navMonth = $datepicker.querySelector('.air-datepicker-nav--title');

            expect($navMonth).toHaveTextContent('Февраль');
            expect(dp.viewDate).toEqual(startDate);
        });
    });

    describe('firstDay', () => {
        it('should change first day', () => {
            init({
                firstDay: 2
            });

            let $day = $datepicker.querySelectorAll('.air-datepicker-body--day-name')[0];

            expect($day).toHaveTextContent('Вт');
        });
    });


    describe('weekends', () => {
        it('should change days, which should considered to be weekends', () => {
            init({
                weekends: [0, 2],
                firstDay: 0
            });

            let $dayNames = $datepicker.querySelectorAll('.air-datepicker-body--day-name');

            expect($dayNames[0]).toHaveClass(consts.cssClassWeekend);
            expect($dayNames[2]).toHaveClass(consts.cssClassWeekend);
        });
    });


    describe('dateFormat', () => {
        let date = new Date('2021-04-28T23:05'),
            values = {
                'T': date.getTime().toString(),
                'aa': 'pm',
                'AA': 'PM',
                'H': '23',
                'HH': '23',
                'm': '5',
                'mm': '05',
                'dd': '28',
                'd': '28',
                'EEEE': 'Среда',
                'E': 'Сре',
                'M': '4',
                'MM': '04',
                'MMM': 'Апр',
                'MMMM': 'Апрель',
                'yy': '21',
                'yyyy' : '2021',
                'yyyy1': '2020',
                'yyyy2': '2029'
            };

        for (let [dateFormat, value] of Object.entries(values)) {
            test(`should convert ${dateFormat} to ${value}`, (done) => {
                init({
                    dateFormat
                });

                dp.selectDate(date).then(() => {
                    expect(dp.$el.value).toEqual(value);
                    done();
                });
            });
        }

        it('should work with common text characters', (done) => {
            init({
                locale: de,
                dateFormat: 'Month is MMMM'
            });

            dp.selectDate(new Date(2016, 2, 1)).then(() => {
                expect(dp.$el.value).toEqual('Month is März');
                done();
            });
        });

        it('should work correctly with function as format value', (done) => {
            init({
                dateFormat: () => {
                    return 'custom format';
                }
            });

            dp.selectDate(new Date()).then(() => {
                expect(dp.$el.value).toEqual('custom format');
                done();
            });
        });
    });


    describe('altField', () => {
        it('should change value of "altField" when selecting date', (done) => {
            init({
                altField: $altInput,
            });

            let date = new Date();
            dp.selectDate(date).then(() => {
                expect($altInput.value).toEqual(date.getTime().toString());
                done();
            });
        });
    });

    describe('altFieldDateFormat', () => {
        it('should change date format of "altField"', (done) => {
            init({
                altField: $altInput,
                altFieldDateFormat: 'MMMM'
            });

            let date = new Date();
            dp.selectDate(date).then(() => {
                expect($altInput.value).toEqual(dp.locale.months[date.getMonth()]);
                done();
            });
        });
    });

    describe('toggleSelected', () => {
        it('should remove selection from active date when clicked', function () {
            let date = new Date();

            init({
                toggleSelected: true
            });

            dp.selectDate(date);
            dp.getCell(date).click();

            expect(dp.selectedDates).toHaveLength(0);
        });

        it('should not remove selection from active date when clicked', function () {
            let date = new Date();

            init({
                toggleSelected: false
            });

            dp.selectDate(date);
            dp.getCell(date).click();

            expect(dp.selectedDates).toHaveLength(1);
        });

        it('should receive correct arguments if it is a function', function (done) {
            let date = new Date();

            init({
                toggleSelected: ({datepicker, date}) => {
                    expect(datepicker).toBeInstanceOf(Datepicker);
                    expect(date).toBeInstanceOf(Date);

                    done();
                }
            });

            dp.selectDate(date);
            dp.getCell(date).click();
        });

        it('should handle option as function correctly', function () {
            let date = new Date();

            init({
                toggleSelected: () => {
                    return false;
                }
            });

            dp.selectDate(date);
            dp.getCell(date).click();

            expect(dp.selectedDates).toHaveLength(1);
        });
    });

    describe('keyboardNav', () => {
        var year = 2015,
            month = 10,
            day = 18,
            date = new Date(year, month, day),
            cases = [
                {
                    description: '→: should focus next cell',
                    which: 39,
                    keys: 'ArrowRight',
                    validDate: new Date(year, month, day + 1)
                },
                {
                    description: '←: should focus previous cell',
                    which: 37,
                    keys: 'ArrowLeft',
                    validDate: new Date(year, month, day - 1)
                },
                {
                    description: '↑: should focus -7 day cell',
                    which: 38,
                    keys: 'ArrowUp',
                    validDate: new Date(year, month, day - 7)
                },
                {
                    description: '↓: should focus +7 day cell',
                    which: 40,
                    keys: 'ArrowDown',
                    validDate: new Date(year, month, day + 7)
                },
                {
                    description: 'Ctrl + →: should focus next month',
                    keys: ['Control', 'ArrowRight'],
                    validDate: new Date(year, month + 1, day)
                },
                {
                    description: 'Ctrl + ←: should focus previous month',
                    keys: ['Control', 'ArrowLeft'],
                    validDate: new Date(year, month - 1, day)
                },
                {
                    description: 'Shift + →: should focus next year',
                    keys: ['Shift', 'ArrowRight'],
                    validDate: new Date(year + 1, month, day)
                },
                {
                    description: 'Shift + ←: should focus previous year',
                    keys: ['Shift', 'ArrowLeft'],
                    validDate: new Date(year - 1, month, day)
                },
                {
                    description: 'Alt + →: should focus on +10 year cell',
                    keys: ['Alt', 'ArrowRight'],
                    validDate: new Date(year + 10, month, day)
                },
                {
                    description: 'Alt + ←: should focus on -10 year cell',
                    keys: ['Alt', 'ArrowLeft'],
                    validDate: new Date(year - 10, month, day)
                },
                {
                    description: 'Ctrl + Shift + ↑: should change view to months',
                    keys: ['Control', 'Shift', 'ArrowUp'],
                    view: 'months'
                }
            ];

        cases.forEach(({description, which, keys, validDate, view}) => {
            test(description, () => {
                init();
                dp.selectDate(date);

                // IF arrow key
                if (which && !Array.isArray(which)) {
                    let event = new KeyboardEvent('keydown', {which, key: keys});
                    dp.$el.dispatchEvent(event);
                } else {
                    if (which) {
                        which.forEach((keyCode) => {
                            let event = new KeyboardEvent('keydown', {which: keyCode});
                            dp.$el.dispatchEvent(event);
                        });
                    }
                    if (keys) {
                        keys.forEach((key) => {
                            let event = new KeyboardEvent('keydown', {key});
                            dp.$el.dispatchEvent(event);
                        });
                    }
                }


                let {focusDate} = dp;

                if (validDate) {
                    expect(validDate.getFullYear()).toEqual(focusDate.getFullYear());
                    expect(validDate.getMonth()).toEqual(focusDate.getMonth());
                    expect(validDate.getDate()).toEqual(focusDate.getDate());
                }

                if (view) {
                    expect(view).toEqual(dp.currentView);
                }

            });
        });
    });

    describe('minDate', () => {
        test('"prev" button should be available', () => {
            init({
                startDate: new Date('2021-07-27'),
                minDate: new Date('2021-06-27'),
            });

            expect($datepicker.querySelector('[data-action="prev"]')).not.toHaveClass('-disabled-');
        });
        test('"prev" buttons should be availabel if minDate is in past year', () => {
            init({
                minDate: new Date('2020-12-31'),
            });

            expect($datepicker.querySelector('[data-action="prev"]')).not.toHaveClass('-disabled-');
        });
        test('"prev" button should be disabled in months view', () => {
            let minDate = new Date('2021-06-27');

            init({
                startDate: minDate,
                view: 'months',
                minDate,
            });

            expect($datepicker.querySelector('[data-action="prev"]')).toHaveClass('-disabled-');
        });

        it('should not disable month which contains minDate', () => {
            let year = 2021;
            let minDate = new Date(`${year}-06-30`);

            init({
                startDate: minDate,
                view: 'months',
                minDate
            });

            let $cell = dp.getCell(minDate, 'month');

            expect($cell).not.toHaveClass('-disabled-');
        });

        it('should not disable day which is equal to minDate', () => {
            let year = 2021;
            let minDate = new Date(`${year}-06-30`);

            init({
                startDate: minDate,
                minDate
            });

            let $cell = dp.getCell(minDate);

            expect($cell).not.toHaveClass('-disabled-');
        });

        it('should not disable months before min date in next year', () => {
            let year = 2021;
            let minDate = new Date(`${year}-06-30`);
            let startDate = new Date(minDate.getTime());

            startDate.setFullYear(2022);
            startDate.setMonth(0);

            init({
                view: consts.months,
                startDate,
                minDate
            });

            let $cell = dp.getCell(startDate, 'month');

            expect($cell).not.toHaveClass('-disabled-');
        });
    });

    describe('isMobile', () => {
        it('should add mobile class name', () => {
            init({
                isMobile: true
            });

            expect($datepicker).toHaveClass('-is-mobile-');
        });

        it('should add readonly attribute', () => {
            init({
                isMobile: true
            });

            expect($input).toHaveAttribute('readonly');
        });

        it('should add mobile overlay', () => {
            init({
                isMobile: true
            });

            let $overlay = document.querySelector('.air-datepicker-overlay');

            expect($overlay).toBeInTheDocument();
        });
    });

    describe('autoClose', () => {
        it('should be inited without errors with selected date', () => {
            expect(() => {
                init({
                    selectedDates: [new Date()],
                    visible: false,
                    autoClose: true
                });
            }).not.toThrow();
        });

        it('should hide datepicker after date select', () => {
            init({
                autoClose: true
            });

            dp.selectDate(new Date());

            expect(dp.visible).toBe(false);
        });

        it('should hide datepicker when range mode is true', () => {
            init({
                autoClose: true,
                range: true,
            });

            let date1 = new Date();
            let date2 = new Date(date1.getTime() + DAY);

            dp.selectDate(date1);
            dp.selectDate(date2);

            expect(dp.visible).toBe(false);
        });
    });

    describe('onRenderCell', () => {
        it('should change cell class names', () => {
            init({
                inline: true,
                onRenderCell() {
                    return {
                        classes: 'custom-cell-class'
                    };
                }
            });

            let cell = $datepicker.querySelector('.air-datepicker-cell');

            expect(cell.classList.contains('custom-cell-class')).toBe(true);
        });

        it('should be able to disable cell', () => {
            init({
                startDate: '2022.09.01',
                inline: true,
                onRenderCell({date}) {
                    if (date.getDate() === 8) {
                        return {
                            disabled: true
                        };
                    }
                }
            });

            let cell = dp.getCell('2022.09.08');

            expect(cell.classList.contains('-disabled-')).toBe(true);
        });

        it('should be able to change cell html', () => {
            init({
                inline: true,
                onRenderCell() {
                    return {
                        html: '<div>Custom content</div>'
                    };
                }
            });

            let cell = $datepicker.querySelector('.air-datepicker-cell');
            expect(cell.textContent).toBe('Custom content');
        });

        it('should be able to change cell html and not affect selecting dates', () => {
            init({
                inline: true,
                onRenderCell() {
                    return {
                        html: '<div class="custom-cell">Custom content</div>'
                    };
                }
            });

            let cell = $datepicker.querySelector('.custom-cell');
            expect(() => {
                cell.click();
            }).not.toThrow();
        });

        it('should be able to add custom attributes to cells', () => {
            init({
                inline: true,
                onRenderCell() {
                    return {
                        attrs: {
                            'data-custom-attr': 'ok'
                        }
                    };
                }
            });

            let cell = $datepicker.querySelector('[data-custom-attr="ok"]');

            expect(cell).toBeTruthy();
        });
    });

    describe('selectedDates', () => {
        it('should select dates on init', async () => {
            const date = new Date('2022-12-08');
            init({
                visible: false,
                startDate: date,
                selectedDates: [date]
            });


            // As selecting date is a little bit async, we'll wait here until
            // values will be changed
            await sleep();
            expect(dp.$el).toHaveValue('08.12.2022');
            expect(dp.selectedDates).toHaveLength(1);
        });

        it('should hilite selected cell on init', async () => {
            const date = new Date('2024-03-01');
            init({
                visible: true,
                startDate: date,
                selectedDates: [date]
            });

            // As selecting date is a little bit async, we'll wait here until
            // values will be changed
            await sleep();
            const cell = dp.getCell(date);
            expect(cell).toHaveClass('-selected-');
        });

        it('should select dates with time on init with correct day period', async () => {
            const date = new Date('2022-12-08 23:21');
            init({
                visible: false,
                timepicker: true,
                locale: en,
                selectedDates: [date]
            });

            await sleep();
            expect(dp.$el).toHaveValue('12/08/2022 11:21 pm');
        });
    });

    describe('onBeforeSelect', () => {
        it('should receive correct arguments', (done) => {
            const selectedDate = new Date('2023-07-18');
            init({
                visible: true,
                onBeforeSelect({date, datepicker}) {
                    const assertion = date instanceof Date && datepicker instanceof Datepicker;
                    expect(assertion).toBeTruthy();
                    done();
                }
            });

            dp.selectDate(selectedDate);
        });
        it('should disable date selection if returns false', (done) => {
            const selectedDate = new Date('2023-07-18');
            init({
                visible: true,
                onBeforeSelect({date}) {
                    return date.toLocaleDateString('ru') !== selectedDate.toLocaleDateString('ru');
                }
            });

            dp.selectDate(selectedDate).then(() => {
                expect(dp.selectedDates).toHaveLength(0);
                done();
            });
        });

        it('should enable date selection if returns true', (done) => {
            const selectedDate = new Date('2023-07-18');
            init({
                visible: true,
                onBeforeSelect({date}) {
                    return date.toLocaleDateString('ru') === selectedDate.toLocaleDateString('ru');
                }
            });

            dp.selectDate(selectedDate).then(() => {
                expect(dp.selectedDates).toHaveLength(1);
                done();
            });
        });
    });


    describe('onFocus', () => {
        it('should receive correct arguments', (done) => {
            const selectedDate = new Date('2023-07-18');
            init({
                visible: true,
                onFocus({date, datepicker}) {
                    const assertion = date instanceof Date && datepicker instanceof Datepicker;
                    expect(assertion).toBeTruthy();
                    done();
                }
            });

            dp.setFocusDate(selectedDate);
        });
        it('should be triggered when focusing cell', (done) => {
            const selectedDate = new Date('2023-07-18');
            init({
                visible: true,
                onFocus({date}) {
                    expect(date.toLocaleDateString('ru')).toEqual('18.07.2023');
                    done();
                }
            });

            dp.setFocusDate(selectedDate);
        });
    });

    describe('fixedHeight', () => {
        it('should render 6 weeks in every month, when true', () => {
            init({
                fixedHeight: true,
                visible: true,
                startDate: '2021-02-01'
            });

            const $dayCells = $datepicker.querySelectorAll('.air-datepicker-cell');

            expect($dayCells).toHaveLength(42);
        });
        it('should render weeks according to dates length, when false', () => {
            init({
                visible: true,
                startDate: '2021-02-01'
            });

            const $dayCells = $datepicker.querySelectorAll('.air-datepicker-cell');

            expect($dayCells).toHaveLength(28);
        });
    });

    describe('range', () => {
        it('should enable range mode', () => {
            init({
                range: true
            });

            dp.selectDate(['2023-10-10', '2023-10-22']);

            expect(Boolean(dp.rangeDateFrom && dp.rangeDateTo)).toBeTruthy();
        });

        it('should select dates in proper', () => {
            init({
                range: true
            });

            // Select larger date first
            dp.selectDate(['2023-10-22', '2023-10-10']);

            expect(dp.rangeDateFrom.toLocaleDateString('ru')).toEqual('10.10.2023');
        });

        it('should change lastSelectedDate if toggleSelected=false', () => {
            init({
                range: true,
                toggleSelected: false,
            });
            const from = '2023-10-10';
            const to = '2023-10-22';

            dp.selectDate([from, to]);
            dp.getCell(from).click();

            expect(dp.lastSelectedDate.toLocaleDateString('ru')).toEqual('10.10.2023');
        });

        it('should be able to change time by clicking on selected range dates', () => {
            init({
                range: true,
                toggleSelected: false,
                timepicker: true
            });
            const from = '2023-10-10';
            const to = '2023-10-22';

            dp.selectDate([from, to]);
            // Change time in `to` date
            dp.trigger(consts.eventChangeTime, {
                hours: 20,
                minutes: 20,
            });

            // Update lastSelectedDate and update time in `from` date
            dp.getCell(from).click();
            dp.trigger(consts.eventChangeTime, {
                hours: 10,
                minutes: 10,
            });

            expect(timeFormat.format(dp.selectedDates[0])).toEqual('10:10');
            expect(timeFormat.format(dp.selectedDates[1])).toEqual('20:20');
        });

        it('should handle time correctly when range dates are the same', () => {
            init({
                range: true,
                toggleSelected: false,
                timepicker: true,
                startDate: '2023-10-10',
            });
            const date = '2023-10-10';

            dp.getCell(date).click();
            dp.trigger(consts.eventChangeTime, {
                hours: 10,
                minutes: 10,
            });

            dp.getCell(date).click();
            dp.trigger(consts.eventChangeTime, {
                hours: 20,
                minutes: 20,
            });

            expect(timeFormat.format(dp.selectedDates[0])).toEqual('10:10');
            expect(timeFormat.format(dp.selectedDates[1])).toEqual('20:20');
        });
    });
});
