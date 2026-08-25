import {beforeAll, afterEach, describe, it, expect} from '@jest/globals';
import Datepicker from 'datepicker';
import en from 'locale/en';
import consts from 'consts';

let $input, dp, $datepicker;

beforeAll(() => {
    $input = document.createElement('input');
    document.body.appendChild($input);
});

afterEach(() => {
    if (dp) {
        dp.destroy();
    }
    $input.removeAttribute('aria-owns');
    $input.removeAttribute('aria-activedescendant');
    dp = false;
    $datepicker = false;
});

function init(opts) {
    dp = new Datepicker($input, {visible: true, locale: en, ...opts});
    $datepicker = dp.$datepicker;
}

describe('ACCESSIBILITY', () => {
    describe('datepicker container', () => {
        it('should have role=application and generated id', () => {
            init();
            expect($datepicker).toHaveAttribute('role', 'application');
            expect($datepicker.id).toMatch(/^[A-Za-z0-9]{20}$/);
        });
    });

    describe('input aria-owns', () => {
        it('should point to datepicker id when attached to input', () => {
            init();
            expect($input).toHaveAttribute('aria-owns', $datepicker.id);
        });

        it('should not set aria-owns when attached to non-input element', () => {
            const $div = document.createElement('div');
            document.body.appendChild($div);
            const inlineDp = new Datepicker($div, {inline: true, locale: en});
            expect($div.hasAttribute('aria-owns')).toBe(false);
            inlineDp.destroy();
            $div.remove();
        });
    });

    describe('day cell', () => {
        const startDate = '2025-05-05';

        it('should set static aria attributes and formatted label', () => {
            init({startDate});
            const $cell = dp.getCell(startDate);
            const expectedLabel = dp.formatDate(startDate, 'EEEE, MMMM d, yyyy');

            expect($cell).toHaveAttribute('role', 'button');
            expect($cell).toHaveAttribute('aria-label', expectedLabel);
            expect($cell).toHaveAttribute('data-aria-label', expectedLabel);
            expect($cell).toHaveAttribute('id', String(new Date(`${startDate}T00:00:00`).getTime()));
            expect($cell).toHaveAttribute('aria-disabled', 'false');
        });

        it('should mark unavailable day as aria-disabled=true', () => {
            init({
                startDate,
                availableDates: ['2025-05-06'],
            });

            expect(dp.getCell('2025-05-05')).toHaveAttribute('aria-disabled', 'true');
            expect(dp.getCell('2025-05-06')).toHaveAttribute('aria-disabled', 'false');
        });
    });

    describe('month and year cells', () => {
        it('should use month name as aria-label in months view', () => {
            init({startDate: '2025-05-05', view: consts.months});
            const $cell = dp.getCell('2025-05-05', consts.month);
            expect($cell).toHaveAttribute('aria-label', 'May');
            expect($cell).toHaveAttribute('data-aria-label', 'May');
        });

        it('should use year as aria-label in years view', () => {
            init({startDate: '2025-05-05', view: consts.years});
            const $cell = dp.getCell('2025-05-05', consts.year);
            expect($cell).toHaveAttribute('aria-label', '2025');
            expect($cell).toHaveAttribute('data-aria-label', '2025');
        });
    });

    describe('selected and range labels', () => {
        it('should append locale.selected to aria-label when date is selected', async () => {
            init({startDate: '2025-05-05'});
            const $cell = dp.getCell('2025-05-05');
            const base = $cell.getAttribute('data-aria-label');

            await dp.selectDate('2025-05-05');
            expect($cell).toHaveAttribute('aria-label', `${base}, selected`);
        });

        it('should restore aria-label when date is unselected', async () => {
            init({startDate: '2025-05-05'});
            const $cell = dp.getCell('2025-05-05');
            const base = $cell.getAttribute('data-aria-label');

            await dp.selectDate('2025-05-05');
            dp.unselectDate('2025-05-05');
            expect($cell).toHaveAttribute('aria-label', base);
        });

        it('should append locale.selected to in-range cells', async () => {
            init({range: true, startDate: '2025-05-05'});
            await dp.selectDate(['2025-05-05', '2025-05-08']);

            const $inRange = dp.getCell('2025-05-06');
            expect($inRange).toHaveClass('-in-range-');
            expect($inRange.getAttribute('aria-label')).toBe(
                `${$inRange.getAttribute('data-aria-label')}, selected`
            );
        });

        it('should use locale.selected from current locale', async () => {
            init({startDate: '2025-05-05'}); // locale: en in init
            await dp.selectDate('2025-05-05');
            expect(dp.getCell('2025-05-05').getAttribute('aria-label')).toMatch(/, selected$/);
        });
    });

    describe('aria-activedescendant', () => {
        it('should set aria-activedescendant to focused cell id', () => {
            init({startDate: '2025-05-05'});
            const $cell = dp.getCell('2025-05-05');
            dp.setFocusDate('2025-05-05');
            expect($input).toHaveAttribute('aria-activedescendant', $cell.id);
        });

        it('should remove aria-activedescendant when datepicker hides', () => {
            init({startDate: '2025-05-05'});
            dp.setFocusDate('2025-05-05');
            dp.hide();
            expect($input.hasAttribute('aria-activedescendant')).toBe(false);
        });
    });
});
