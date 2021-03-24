/* eslint-disable */

import Datepicker from 'datepicker';

let $input = document.querySelector('#dp');

window.dp = new Datepicker($input);

document.querySelector('#destr').addEventListener('click', () => {
    dp.destroy();
})


if (module.hot) {
    module.hot.accept();
}
