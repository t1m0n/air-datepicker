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


describe('EVENTS TEST', () => {
    describe('onRenderCell', () => {
        it('should called with fields {date, cellType, datepicker}', () => {
            let date,
                cellType,
                datepicker;

            init({
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
});
