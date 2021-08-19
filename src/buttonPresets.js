export default {
    today: {
        content: dp => dp.locale.today,
        onClick: dp => dp.setViewDate(new Date()),
    },
    clear: {
        content: dp => dp.locale.clear,
        onClick: dp => dp.clear()
    }
};
