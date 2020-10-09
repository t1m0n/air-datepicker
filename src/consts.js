export default {
    days: 'days',
    months: 'months',
    years: 'years',

    eventChangeViewDate: 'changeViewDate',
    eventChangeFocusDate: 'changeFocusDate',
    eventChangeCurrentView: 'changeCurrentView',
    // Params:
    // action(select, unselect);
    // date;
    // addTime(should timepicker add its time to selected date) //TODO удалить если не используется
    // updateTime(if true, then timepicker will take time from passed date and save it to instance)
    eventChangeSelectedDate: 'changeSelectedDate',
    eventChangeTime: 'changeTime',
    eventChangeLastSelectedDate: 'changeLastSelectedDate',

    actionSelectDate: 'selectDate',
    actionUnselectDate: 'unselectDate',

    cssClassWeekend: '-weekend-'
};
