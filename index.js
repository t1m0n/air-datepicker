/* eslint-disable */

import Datepicker from 'datepicker';

let $input = document.querySelector('#dp');

new Datepicker($input, {
    inline: true,
    // maxDate: new Date(2020, 5, 15),
    // minDate: new Date(2020, 5, 15),
});

if (module.hot) {
    module.hot.accept();
}
