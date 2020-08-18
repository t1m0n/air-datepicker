/* eslint-disable */

import Datepicker from 'datepicker';

let $input = document.querySelector('#dp');

window.dp = new Datepicker($input, {
    inline: true,
    range: false,
    toggleSelected: false,
    timepicker: true,
    buttons: ['today', 'clear'],
    // maxDate: new Date(2020, 5, 15),
    // minDate: new Date(2021, 5, 15),
});

if (module.hot) {
    module.hot.accept();
}
