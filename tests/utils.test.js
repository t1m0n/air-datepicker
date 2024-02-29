import {createDate, getParsedDate} from '../src/utils';
import {describe, it, expect} from '@jest/globals';


describe('createDate', () => {
    it('should return date object if it receives one', () => {
        const date = new Date();
        const createdDate = createDate(date);

        expect(date).toEqual(createdDate);
    });
    it('should create date from string', () => {
        const dateString = '2024-03-01';
        const createdDate = createDate(dateString);

        expect(createdDate).toBeInstanceOf(Date);

        const {fullDate, fullMonth, year} = getParsedDate(createdDate);
        const allEqual = year === 2024 && fullMonth === '03' && fullDate === '01';

        expect(allEqual).toBeTruthy();
    });
    it('should create date from number', () => {
        const time = 1709241680707;
        const createdDate = createDate(time);

        expect(createdDate).toBeInstanceOf(Date);

        const {fullDate, fullMonth, year} = getParsedDate(createdDate);
        const allEqual = year === 2024 && fullMonth === '03' && fullDate === '01';

        expect(allEqual).toBeTruthy();
    });
});
