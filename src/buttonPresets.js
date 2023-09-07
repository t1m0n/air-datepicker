import DateCalendar from "./calendar";
export default {
    today: {
        content: dp => dp.locale.today,
        onClick: dp => dp.setViewDate(new DateCalendar().Date()),
    },
    clear: {
        content: dp => dp.locale.clear,
        onClick: dp => dp.clear()
    }
};
