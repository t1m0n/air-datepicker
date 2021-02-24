/* eslint-disable */

import Datepicker from 'datepicker';

let $input = document.querySelector('#dp');

window.dp = new Datepicker($input, {
    inline: false,
    range: false ,
    toggleSelected: false,
    timepicker: true,
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
    }

    // maxDate: new Date(2020, 9, 20, 10, 30),
    // minDate: new Date(2020, 9, 5, 15, 45),
});

if (module.hot) {
    module.hot.accept();
}
