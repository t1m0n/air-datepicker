import {beforeAll, afterEach, describe, test, expect} from '@jest/globals';
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
})

function init(opts) {
    dp = new Datepicker($input, opts);
    $datepicker = dp.$datepicker;
}


describe('OPTIONS TESTS', () => {
    describe('classes', () => {
        it('should append custom classes to datepicker', () => {
            init({classes: 'custom-class'})
            expect($datepicker).toHaveClass('custom-class');
        });
    })

    describe('inline', () => {
        test('if datepicker has proper class', () => {
            init({inline: true})
            expect($datepicker).toHaveClass('-inline-')
        });
    })
});
