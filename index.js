/* eslint-disable */

import Datepicker from 'datepicker';

let $input = document.querySelector('#dp');

new Datepicker($input, {
    inline: true,
    navTitles: {
        days: 'asdfasdf'
    }
});

if (module.hot) {
    module.hot.accept();
}
