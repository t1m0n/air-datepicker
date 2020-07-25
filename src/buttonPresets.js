export default {
    today: {
        content: ({locale}) => locale.today,
        onClick: dp => dp.setViewDate(new Date()),
    },
    clear: {
        content: ({locale}) => locale.clear,
        onClick: dp => dp.clear()
    }
};
