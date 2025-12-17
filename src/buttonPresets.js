export default {
    today: {
        content: dp => dp.locale.today,
        onClick: dp => dp.setViewDate(new Date()),
        attrs: {
            type: 'button'
        }
    },
    clear: {
        content: dp => dp.locale.clear,
        onClick: dp => dp.clear(),
        attrs: {
            type: 'button'
        }
    }
};
