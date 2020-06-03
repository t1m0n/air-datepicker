/* eslint-disable */

import Datepicker from 'datepicker';

let $input = document.querySelector('#dp');

new Datepicker($input, {
    inline: true,
    maxDate: new Date(2020, 5, 30),
});

if (module.hot) {
    module.hot.accept();
}
