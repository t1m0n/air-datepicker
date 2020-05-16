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
    altFieldDateFormat: '@',
    toggleSelected: true,
    keyboardNav: true,

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
    multipleDatesSeparator: ',',
    range: false,
    dragRange: true,

    todayButton: false,
    clearButton: false,

    showEvent: 'focus',
    autoClose: false,

    // navigation
    monthsField: 'monthsShort',
    prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
    nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',
    navTitles: {
        days: 'MM, <i>yyyy</i>',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2'
    },

    // timepicker
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

    // events
    onSelect: '',
    onShow: '',
    onHide: '',
    onChangeMonth: '',
    onChangeYear: '',
    onChangeDecade: '',
    onChangeView: '',
    onRenderCell: ''
};
