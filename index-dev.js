/* eslint-disable */

import Datepicker from 'datepicker';
import en from 'locale/en';
let $input1 = document.querySelector('#dp1');
let $input2 = document.querySelector('#dp2');

window.dp1 = new Datepicker($input1, {
    inline: true,
    onSelect({date}) {
        dp2.update({
            minDate: date
        })
    }
});
window.dp2 = new Datepicker($input2, {
    inline: true,
    minDate: new Date(),
    onSelect({date}) {

    }
});

// dp.selectDate(new Date('2021-06-01'))
// dp.selectDate(new Date('2021-06-05'))


// document.querySelector('#destr').addEventListener('click', () => {
//     dp.destroy();
// })
//
// let dates = [new Date(), new Date('2021-06-10'), new Date('2021-06-15')];
// let toggle = true;
// document.querySelector('#update').addEventListener('click', () => {
//     console.time('update');
//     dp.update({
//         // view: 'years',
//         // prevHtml: 'prev',
//         // range: !dp.opts.range,
//         minDate: new Date('2021-06-17'),
//         // maxDate: new Date('2021-06-27'),
//         // locale: en,
//         // buttons: toggle ? ['clear'] : false,
//         // selectedDates: dates[Math.floor(Math.random() * dates.length -1)],
//         // timepicker: !dp.opts.timepicker,
//     })
//     console.timeEnd('update');
//     toggle = !toggle;
// })


if (module.hot) {
    module.hot.accept();
}
