declare type AirDatepickerSelector = string | HTMLElement;

export declare type AirDatepickerLocale = {
    days: string[],
    daysShort: string[],
    daysMin: string[],
    months: string[],
    monthsShort: string[],
    today: string,
    clear: string,
    dateFormat: string,
    timeFormat: string,
    firstDay: 0 | 1 | 2 | 3 | 4 | 5 | 6,
}

export declare type AirDatepickerPosition = 'left' | 'left top' | 'left bottom' | 'top' | 'top left' | 'top right' | 'right' | 'right top' | 'right bottom' | 'bottom' | 'bottom left' | 'bottom right';
export declare type AirDatepickerViews = 'days' | 'months' | 'years';
export declare type AirDatepickerViewsSingle = 'day' | 'month' | 'year';
export declare type AirDatepickerDate = string | number | Date;
export declare type AirDatepickerNavEntry = string | ((dp: AirDatepicker) => string);
export declare type AirDatepickerDecade = [number, number];

export declare type AirDatepickerOptions = {
    classes: string
    inline: boolean,
    locale: Partial<AirDatepickerLocale>,
    startDate: AirDatepickerDate,
    firstDay: number,
    weekends: [number, number],
    dateFormat: string | ((d: Date) => string),
    altField: AirDatepickerSelector,
    altFieldDateFormat: string,
    toggleSelected: boolean,
    keyboardNav: boolean,
    selectedDates: AirDatepickerDate[] | false,
    container: AirDatepickerSelector,
    position: AirDatepickerPosition,
    offset: number,
    view: AirDatepickerViews,
    minView: AirDatepickerViews,
    showOtherMonths: boolean,
    selectOtherMonths: boolean,
    moveToOtherMonthsOnSelect: boolean,
    showOtherYears: boolean,
    selectOtherYears: boolean,
    moveToOtherYearsOnSelect: boolean,
    minDate: AirDatepickerDate | false,
    maxDate: AirDatepickerDate | false,
    disableNavWhenOutOfRange: true,
    multipleDates: number | true | false,
    multipleDatesSeparator: string,
    range: boolean,
    dynamicRange: boolean,
    buttons: boolean,
    monthsField: keyof AirDatepickerLocale,
    showEvent: string,
    autoClose: boolean,
    prevHtml: string,
    nextHtml: string,
    navTitles: {
        days?: AirDatepickerNavEntry,
        months?: AirDatepickerNavEntry,
        years?: AirDatepickerNavEntry
    },
    timepicker: boolean,
    onlyTimepicker: boolean,
    dateTimeSeparator: string,
    timeFormat: string,
    minHours: number,
    maxHours: number,
    minMinutes: number,
    maxMinutes: number,
    hoursStep: number,
    minutesStep: number,

    onSelect: ({date, formattedDate, dp}: {date: Date | Date[], formattedDate: string | string[], dp: AirDatepicker}) => void,
    onChangeViewDate: ({month, year, decade}: {month: number, year: number, decade: AirDatepickerDecade}) => void,
    onChangeView: (view: AirDatepickerViews) => void,
    onRenderCell: ({date, type, dp}: {date: Date, type: AirDatepickerViewsSingle, dp: AirDatepicker}) => ({
        disabled?: boolean,
        classes?: string,
        html?: string
    } | void),
    onShow: (isAnimationComplete: boolean) => void,
    onHide: (isAnimationComplete: boolean) => void,
}


declare class AirDatepicker {
    constructor(el: string | HTMLElement, opts? : Partial<AirDatepickerOptions>)
    static version: string
    show: () => void
    hide: () => void
    next: () => void
    prev: () => void
    selectDate: (date: AirDatepickerDate | AirDatepickerDate[], opts?: {updateTime: boolean, silent: boolean}) => void
    unselectDate: (date: AirDatepickerDate) => void
    clear: () => void
    formatDate: (date: AirDatepickerDate, format: string) => void
    destroy: () => void
    update: (newOpts: Partial<AirDatepickerOptions>) => void
    setCurrentView: (newView: AirDatepickerViews) => void
    setViewDate: (newViewDate: AirDatepickerDate) => void
    setFocusDate: (date: AirDatepickerDate | false, opts?: {viewDateTransition: boolean}) => void
    up: (date?: AirDatepickerDate) => void
    down: (date?: AirDatepickerDate) => void

    $datepicker: HTMLDivElement
    viewDate: Date
    currentView: AirDatepickerViews
    selectedDates: Date[]
    focusDate: Date | false
}


export default AirDatepicker;
