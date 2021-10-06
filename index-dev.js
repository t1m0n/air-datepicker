/* eslint-disable */

import Datepicker from 'datepicker';
import en from 'locale/en';
let $input1 = document.querySelector('#dp1');
let $input2 = document.querySelector('#dp2');
let $bntDestroy = document.querySelector('#destroy')

let mDate = new Date();

let opts = {
    // minDate: Date.now(),
    inline: true,
    // timepicker: true,
    maxDate: mDate,
    onChangeView(view) {
        console.log(dp1.getCell('2021-01-01', 'month'))
    },
    onRenderCell({type}) {
        // console.log(type);
    }
}

window.dp1 = new Datepicker($input1, opts);


// window.dp2 = new Datepicker($input2, {
//     inline: true,
//     onSelect({date}) {
//         dp1.update({
//             maxDate: date
//         })
//     }
// });

$bntDestroy.addEventListener('click', dp1.destroy)

// dp.selectDate(new Date('2021-06-01'))
// dp.selectDate(new Date('2021-06-05'))


// document.querySelector('#destr').addEventListener('click', () => {
//     dp.destroy();
// })
//
// let dates = [new Date(), new Date('2021-06-10'), new Date('2021-06-15')];
// let toggle = true;
document.querySelector('#update').addEventListener('click', () => {
    dp1.update({
        // view: 'years',
        // prevHtml: 'prev',
        // range: !dp.opts.range,
        minDate: false,
        // maxDate: new Date('2021-06-27'),
        // locale: en,
        // buttons: toggle ? ['clear'] : false,
        // selectedDates: dates[Math.floor(Math.random() * dates.length -1)],
        // timepicker: !dp.opts.timepicker,
    })
})


if (module.hot) {
    module.hot.accept();
}


