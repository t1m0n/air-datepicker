/* eslint-disable */

import Datepicker from 'datepicker';
import en from 'locale/en';
let $input = document.querySelector('#dp');

window.dp = new Datepicker($input, {
    inline: true,
    // selectedDates: ['2021-06-01', new Date('2021-06-05')],
    // multipleDates: true,
    // range: true,
    // timepicker: true,
    // toggleSelected: false,
    onSelect(){
        console.log('on select');
    },
    // view: 'months',
    // startDate: new Date('2023-07-27'),
    // minDate: new Date('2020-12-31'),
    // maxDate: new Date('2031-06-27T20:59'),
    // onRenderCell({date}) {
    //     return {
    //         disabled: date.getDate() === 27
    //     }
    // }
});

// dp.selectDate(new Date('2021-06-01'))
// dp.selectDate(new Date('2021-06-05'))


document.querySelector('#destr').addEventListener('click', () => {
    dp.destroy();
})

let dates = [new Date(), new Date('2021-06-10'), new Date('2021-06-15')];
let toggle = true;
document.querySelector('#update').addEventListener('click', () => {
    console.time('update');
    dp.update({
        // view: 'years',
        // prevHtml: 'prev',
        // range: !dp.opts.range,
        minDate: new Date('2021-06-17'),
        // maxDate: new Date('2021-06-27'),
        // locale: en,
        // buttons: toggle ? ['clear'] : false,
        // selectedDates: dates[Math.floor(Math.random() * dates.length -1)],
        // timepicker: !dp.opts.timepicker,
    })
    console.timeEnd('update');
    toggle = !toggle;
})


if (module.hot) {
    module.hot.accept();
}
