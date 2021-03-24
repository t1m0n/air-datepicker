/* eslint-disable */

import Datepicker from 'datepicker';

let $input = document.querySelector('#dp');

window.dp = new Datepicker($input, {
    inline: true,
    range: false ,
    toggleSelected: false,
    timepicker: true,
    timeFormat: 'mm : hh aa',
    // buttons: ['today', 'clear'],
    multipleDatesSeparator: ',        ',
    onSelect({dates, formattedDates, datepicker}){
    },
    onChangeViewDate({month, year, decade}){
    },
    onChangeView(view) {
        console.log(view);
    },
    onRenderCell({date, type}) {

    },

    dateFormat: date => {
        return date.toLocaleString('EN')
    },

    onShow(visible) {
        console.log('onShow', visible);
    },

    onHide(visible) {
        console.log('onHide', visible);
    },

    // maxDate: new Date(2020, 9, 20, 10, 30),
    // minDate: new Date(2020, 9, 5, 15, 45),
});

document.querySelector('#destr').addEventListener('click', () => {
    dp.destroy();
})


if (module.hot) {
    module.hot.accept();
}
