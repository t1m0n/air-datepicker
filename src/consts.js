export default {
    days: 'days',
    months: 'months',
    years: 'years',

    eventChangeViewDate: 'changeViewDate',
    eventChangeCurrentView: 'changeCurrentView',

    /**
     * @param {Boolean} [viewDateTransition] - should perform transition to new viewDate
     * if passed date is out current month/year/decade range
     */
    eventChangeFocusDate: 'changeFocusDate',

    /**
     * @param {String} action
     * @param {Date} date
     * @param {Boolean} [updateTime] - if true, then timepicker will take time from passed date and save it to instance
     */
    eventChangeSelectedDate: 'changeSelectedDate',

    eventChangeTime: 'changeTime',
    eventChangeLastSelectedDate: 'changeLastSelectedDate',

    actionSelectDate: 'selectDate',
    actionUnselectDate: 'unselectDate',

    cssClassWeekend: '-weekend-'
};
