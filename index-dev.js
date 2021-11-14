/* eslint-disable */

import Datepicker from 'datepicker';
import {closest} from './src/utils';
import en from 'locale/en';
import {createPopper} from '@popperjs/core';
let $input1 = document.querySelector('#dp1');
let $input2 = document.querySelector('#dp2');
let $bntDestroy = document.querySelector('#destroy');
let $btnUpdate = document.querySelector('#update');
import anime from 'animejs';

let mDate = new Date();

let opts = {
    // minDate: Date.now(),
    inline: false,
    visible: false,
    // container: '.input-wrap',
    // timepicker: true,
    // maxDate: mDate,
    // container: '.container',
    isMobile: false,
    timepicker: false,
    position: customPosition,
    // position: 'bottom     left',
    // position: manualPosition,
    // classes: '-anime-',
    selectedDates: [new Date()],
    onChangeView(view) {
        // console.log(dp1.getCell('2021-01-01', 'month'))
    },
    onSelect({date}) {
        console.log(date);
    },
    // dateFormat(d) {
    //     return d.toLocaleString();
    // },
    // onRenderCell({type}) {
    //     console.log('render', type);
    // },
    // visible: true
}

function manualPosition({$datepicker, $target, $pointer, done}) {
    let coords = $target.getBoundingClientRect(),
        dpHeight = $datepicker.clientHeight,
        dpWidth = $datepicker.clientWidth;

    let top = coords.y + coords.height / 2 + window.scrollY - dpHeight / 2;
    let left = coords.x + coords.width / 2 - dpWidth / 2;

    $datepicker.style.left = `${left}px`;
    $datepicker.style.top = `${top}px`;

    $pointer.style.display = 'none';

}

function customPosition({$datepicker, $target, $pointer, done}){
    let popper = createPopper($target, $datepicker, {
        placement: 'top',
        // onFirstUpdate: state => {
        //     anime.remove($datepicker);
        //
        //     anime({
        //         targets: $datepicker,
        //         opacity: [0, 1],
        //         scale: [.1, 1],
        //         translateY: [-20, 0]
        //     })
        // },
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 20]
                }
            },
            {
                name: 'arrow',
                options: {
                    element: $pointer,
                }
            },
            {
                name: 'computeStyles',
                options: {
                    gpuAcceleration: false,
                },
            },
        ]
    });

    return () => {
        // anime({
        //     targets: $datepicker,
        //     // opacity: .5,
        //     scale: .5,
        //     translateY: -20,
        // }).finished.then(() => {
            popper.destroy();
            done();
        // })

    }
}

// console.time('init');
window.dp1 = new Datepicker($input1, opts);
// console.timeEnd('init');
//
// window.dp2 = new Datepicker($input2, {
//     inline: false,
//     autoClose: true,
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
$btnUpdate.addEventListener('click', () => {
    dp1.update({
        // view: 'years',
        // prevHtml: 'prev',
        // range: !dp.opts.range,
        // minDate: new Date(),
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


