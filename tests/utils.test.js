import {createDate, getIsoWeekNumber, getParsedDate} from '../src/utils';
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

describe('getIsoWeekNumber', () => {
    it('should return ISO 8601 week number', () => {
        expect(getIsoWeekNumber(new Date(2021, 0, 4))).toBe(1);
        expect(getIsoWeekNumber(new Date(2026, 10, 4))).toBe(45);
        expect(getIsoWeekNumber(new Date(2026, 11, 31))).toBe(53);
    });
    it('should assign days to the previous year week if needed', () => {
        expect(getIsoWeekNumber(new Date(2021, 0, 1))).toBe(53);
        expect(getIsoWeekNumber(new Date(2023, 0, 1))).toBe(52);
    });
    it('should assign days to the next year week if needed', () => {
        expect(getIsoWeekNumber(new Date(2024, 11, 30))).toBe(1);
    });
});
