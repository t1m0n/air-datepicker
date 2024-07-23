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

export declare type AirDatepickerButton = {
    content: string | ((dp: AirDatepicker) => string),
    tagName?: keyof HTMLElementTagNameMap,
    className?: string,
    attrs?: Record<string, string>,
    onClick?: (dp: AirDatepicker) => void
}

export declare type AirDatepickerButtonPresets = 'clear' | 'today';

export declare type AirDatepickerPosition = 'left' | 'left top' | 'left bottom' | 'top' | 'top left' | 'top right' | 'right' | 'right top' | 'right bottom' | 'bottom' | 'bottom left' | 'bottom right';
export declare type AirDatepickerViews = 'days' | 'months' | 'years';
export declare type AirDatepickerViewsSingle = 'day' | 'month' | 'year';
export declare type AirDatepickerDate = string | number | Date;
export declare type AirDatepickerNavEntry = string | ((dp: AirDatepicker) => string);
export declare type AirDatepickerDecade = [number, number];
export declare type AirDatepickerPositionCallback = (
    {
        $datepicker,
        $target,
        $pointer,
        isViewChange,
        done
    }: {
        $datepicker: HTMLDivElement,
        $target: HTMLInputElement,
        $pointer: HTMLElement,
        isViewChange: boolean,
        done: () => void
    }) => void | (() => void)

export declare type AirDatepickerOptions<E extends HTMLElement = HTMLInputElement> = {
    classes?: string
    inline?: boolean,
    locale?: Partial<AirDatepickerLocale>,
    startDate?: AirDatepickerDate,
    firstDay?: number,
    isMobile?: boolean,
    visible?: boolean,
    weekends?: [number, number],
    dateFormat?: string | ((d: Date) => string),
    altField?: AirDatepickerSelector,
    altFieldDateFormat?: string,
    toggleSelected?: boolean | (({datepicker, date}:{datepicker: AirDatepicker<E>, date: Date}) => boolean),
    keyboardNav?: boolean,
    selectedDates?: AirDatepickerDate[] | false,
    container?: AirDatepickerSelector,
    position?: AirDatepickerPosition | AirDatepickerPositionCallback,
    offset?: number,
    view?: AirDatepickerViews,
    minView?: AirDatepickerViews,
    showOtherMonths?: boolean,
    selectOtherMonths?: boolean,
    moveToOtherMonthsOnSelect?: boolean,
    showOtherYears?: boolean,
    selectOtherYears?: boolean,
    moveToOtherYearsOnSelect?: boolean,
    minDate?: AirDatepickerDate | false,
    maxDate?: AirDatepickerDate | false,
    disableNavWhenOutOfRange?: true,
    multipleDates?: number | true | false,
    multipleDatesSeparator?: string,
    range?: boolean,
    dynamicRange?: boolean,
    buttons?: AirDatepickerButtonPresets | AirDatepickerButton | (AirDatepickerButtonPresets| AirDatepickerButton)[] | false,
    monthsField?: keyof AirDatepickerLocale,
    showEvent?: string,
    autoClose?: boolean,
    prevHtml?: string,
    nextHtml?: string,
    navTitles?: {
        days?: AirDatepickerNavEntry,
        months?: AirDatepickerNavEntry,
        years?: AirDatepickerNavEntry
    },
    timepicker?: boolean,
    onlyTimepicker?: boolean,
    dateTimeSeparator?: string,
    timeFormat?: string,
    minHours?: number,
    maxHours?: number,
    minMinutes?: number,
    maxMinutes?: number,
    hoursStep?: number,
    minutesStep?: number,
    fixedHeight?: boolean,

    onSelect?: ({date, formattedDate, datepicker}: {date: Date | Date[], formattedDate: string | string[], datepicker: AirDatepicker<E>}) => void,
    onChangeViewDate?: ({month, year, decade}: {month: number, year: number, decade: AirDatepickerDecade}) => void,
    onChangeView?: (view: AirDatepickerViews) => void,
    onRenderCell?: (params: {date: Date, cellType: AirDatepickerViewsSingle, datepicker: AirDatepicker<E>}) => ({
        disabled?: boolean,
        classes?: string,
        html?: string
        attrs?: Record<string, string | number | undefined>
    } | void),
    onShow?: (isAnimationComplete: boolean) => void,
    onHide?: (isAnimationComplete: boolean) => void,
    onClickDayName?: ({dayIndex, datepicker}: {dayIndex: number, datepicker: AirDatepicker<E>}) => void
    onBeforeSelect?: ({date, datepicker}: {date: Date, datepicker: AirDatepicker}) => boolean;
    onFocus?: ({date, datepicker}: {date: Date, datepicker: AirDatepicker}) => void;
}


declare class AirDatepicker<E extends HTMLElement = HTMLInputElement> {
    constructor(el: string | E, opts? : AirDatepickerOptions<E>)
    static defaults: AirDatepickerOptions
    static version: string
    static defaultGlobalContainerId: string
    static buildGlobalContainer: (id?: string) => void;
    show: () => void
    hide: () => void
    next: () => void
    prev: () => void
    selectDate: (date: AirDatepickerDate | AirDatepickerDate[], opts?: {updateTime?: boolean, silent?: boolean}) => void
    unselectDate: (date: AirDatepickerDate) => void
    clear: (opts?: {silent?: boolean}) => void
    formatDate: (date: AirDatepickerDate, format: string) => string
    destroy: () => void
    update: (newOpts?: AirDatepickerOptions, params?: {silent?: boolean}) => void
    setCurrentView: (newView: AirDatepickerViews, params?: {silent?: boolean}) => void
    setViewDate: (newViewDate: AirDatepickerDate) => void
    setFocusDate: (date: AirDatepickerDate | false, opts?: {viewDateTransition?: boolean}) => void
    up: (date?: AirDatepickerDate) => void
    down: (date?: AirDatepickerDate) => void
    disableDate: (date: AirDatepickerDate | AirDatepickerDate[]) => void
    enableDate: (date: AirDatepickerDate | AirDatepickerDate[]) => void

    $el: E
    $datepicker: HTMLDivElement
    viewDate: Date
    currentView: AirDatepickerViews
    selectedDates: Date[]
    focusDate: Date | false
    visible: boolean
    disabledDates: Set<string>
    isDestroyed: boolean;
}


export default AirDatepicker;
