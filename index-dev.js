/* eslint-disable */

import Datepicker from 'datepicker';
let $input = document.querySelector('#dp');

window.dp = new Datepicker($input, {
    inline: true,
    // selectedDates: [new Date('2021-06-01'), new Date('2021-06-05')],
    // multipleDates: true,
    range: true,
    minView: 'months',
    // toggleSelected: false,
    onSelect(){
        console.log('on select');
    },
    onRenderCell({date}) {
        return {
            disabled: date.getDate() === 27
        }
    }
});

dp.selectDate(new Date('2021-06-01'))
dp.selectDate(new Date('2021-06-05'))


document.querySelector('#destr').addEventListener('click', () => {
    dp.destroy();
})


if (module.hot) {
    module.hot.accept();
}
