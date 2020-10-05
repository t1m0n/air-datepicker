/* eslint-disable */

import Datepicker from 'datepicker';

let $input = document.querySelector('#dp');

window.dp = new Datepicker($input, {
    inline: true,
    range: true,
    toggleSelected: false,
    timepicker: true,
    multipleDates: true,
    buttons: ['today', 'clear'],
    multipleDatesSeparator: ',        ',
    maxDate: new Date(2020, 9, 2, 10, 0), //TODO NEXT обработка мин макс значений для таймпикера
    // minDate: new Date(2021, 5, 15),
});

if (module.hot) {
    module.hot.accept();
}
