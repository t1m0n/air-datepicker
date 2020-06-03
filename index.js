/* eslint-disable */

import Datepicker from 'datepicker';

let $input = document.querySelector('#dp');

new Datepicker($input, {
    inline: true,
});

if (module.hot) {
    module.hot.accept();
}
