import {beforeAll, describe, test, expect} from '@jest/globals';
import Datepicker from 'datepicker';

let $input, dp, opts;

beforeAll(() => {
    $input = document.createElement('input');
    document.body.appendChild($input);
    dp = new Datepicker($input, opts);
});

describe('COMMON TESTS', () => {
    test('should initialized fine with default options', () => {
        expect(dp).toBeInstanceOf(Datepicker);
    });

    test('datepickers container should be created', () => {
        expect(document.querySelector(`#${Datepicker.defaultContainerId}`)).not.toBeNull();
    });

    test('datepicker should be added to the container', () => {
        let $container = document.querySelector(`#${Datepicker.defaultContainerId}`);

        expect(dp.$datepicker.parentNode).toEqual($container);
    });
});
