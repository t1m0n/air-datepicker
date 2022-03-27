import localeRu from './locale/ru';
import consts from './consts';

export default {
    classes: '',
    inline: false,
    locale: localeRu,
    startDate: new Date(),
    firstDay: '',
    weekends: [6, 0],
    dateFormat: '',
    altField: '',
    altFieldDateFormat: 'T',
    toggleSelected: true,
    keyboardNav: true,
    selectedDates: false,
    container: '',
    isMobile: false,
    visible: false,

    position: 'bottom left',
    offset: 12,

    view: consts.days,
    minView: consts.days,

    showOtherMonths: true,
    selectOtherMonths: true,
    moveToOtherMonthsOnSelect: true,

    showOtherYears: true,
    selectOtherYears: true,
    moveToOtherYearsOnSelect: true,

    minDate: '',
    maxDate: '',
    disableNavWhenOutOfRange: true,

    multipleDates: false, // Boolean or Number
    multipleDatesSeparator: ', ',
    range: false,
    dynamicRange: true,
    buttons: false,
    monthsField: 'monthsShort',

    showEvent: 'focus',
    autoClose: false,

    // navigation
    prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
    nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',
    navTitles: {
        days: 'MMMM, <i>yyyy</i>',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2'
    },

    timepicker: false,
    onlyTimepicker: false,
    dateTimeSeparator: ' ',
    timeFormat: '',
    minHours: 0,
    maxHours: 24,
    minMinutes: 0,
    maxMinutes: 59,
    hoursStep: 1,
    minutesStep: 1,

    onSelect: false,
    onChangeViewDate: false,
    onChangeView: false,
    onRenderCell: false,
    onShow: false,
    onHide: false,
    onClickDayName: false,
};
