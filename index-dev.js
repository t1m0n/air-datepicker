/* eslint-disable */

import Datepicker from 'datepicker';
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
    minDate: new Date('2020-12-31'),
    maxDate: new Date('2031-06-27T20:59'),
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
document.querySelector('#update').addEventListener('click', () => {
    dp.update({
        // range: !dp.opts.range,
        // minDate: new Date(),
        maxDate: new Date('2021-07-27'),
        // timepicker: !dp.opts.timepicker,
    })
})


if (module.hot) {
    module.hot.accept();
}
