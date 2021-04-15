/* eslint-disable */

import Datepicker from 'datepicker';

let $input = document.querySelector('#dp');

window.dp = new Datepicker($input, {
    inline: true
});

document.querySelector('#destr').addEventListener('click', () => {
    dp.destroy();
})


if (module.hot) {
    module.hot.accept();
}
