import {beforeAll, afterEach, describe, test, it, expect} from '@jest/globals';
import Datepicker from 'datepicker';

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
    dp = new Datepicker($input, {visible: true, ...opts});
    $datepicker = dp.$datepicker;
}


describe('COMMON TESTS', () => {
    test('should initialized fine with default options', () => {
        init();
        expect(dp).toBeInstanceOf(Datepicker);
    });

    test('datepickers container should be created', () => {
        init();
        expect(document.querySelector(`#${Datepicker.defaultGlobalContainerId}`)).not.toBeNull();
    });

    test('datepicker should be added to the container if visible', () => {
        init();
        let $container = document.querySelector(`#${Datepicker.defaultGlobalContainerId}`);

        expect($datepicker.parentNode).toEqual($container);
    });

    test('datepicker should be initialized and not rendered to container', () => {
        init({visible: false});
        let $container = document.querySelector(`#${Datepicker.defaultGlobalContainerId}`);

        expect($container).not.toContainElement(dp.$datepicker);
    });

    test('datepicker should be removed from container after hide', () => {
        init();
        let $container = document.querySelector(`#${Datepicker.defaultGlobalContainerId}`);

        dp.hide();

        expect($container).not.toContainElement(dp.$datepicker);
    });

    test('time format should be in 24 hours mode by default', (done) => {
        const date = '2022-12-10T22:13';

        init({
            timepicker: true,
            selectedDates: [date]
        });
        setTimeout(() => {
            expect(dp.$datepicker.querySelector('.air-datepicker-time--current-hours')).toHaveTextContent('22');
            expect(dp.$el).toHaveValue('10.12.2022 22:13');
            done();
        });
    });

    test('every cell should have data attributes', () => {
        const startDate = '2025-05-05';

        init({
            startDate
        });

        const $cell = dp.getCell('2025-05-05');

        expect($cell.dataset.isoDate).toEqual('2025-05-05');
        expect($cell.dataset.date).toEqual('5');
        expect($cell.dataset.month).toEqual('4');
        expect($cell.dataset.year).toEqual('2025');
    });
});
