/* eslint-disable */

import Datepicker from 'datepicker';
import {closest} from './src/utils';
import en from 'locale/en';
import {createPopper} from '@popperjs/core';
let $input1 = document.querySelector('#dp1');
let $input2 = document.querySelector('#dp2');
let $bntDestroy = document.querySelector('#destroy');
let $btnAction = document.querySelector('#action');
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
    // timepicker: true,
    autoClose: false,
    // position: customPosition,
    // position: 'right center',
    // position: manualPosition,
    // classes: '-anime-',
    // selectedDates: [new Date()],
    onChangeView(view) {
        // console.log(dp1.getCell('2021-01-01', 'month'))
    },
    onSelect({date, formattedDate, datepicker}) {

    },
    multipleDates: false,
    dateFormat(d) {
        // console.log(d);
        return d.toLocaleString();
        // if (d.length > 3) {
        //     return  'выбрано '
        // }
        // console.log('date format', d);
        // return d.map(d => {
        //     return d.toLocaleDateString();
        // })
    },
    onRenderCell(cell) {
    },
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

function customPosition({$datepicker, $target, $pointer, isViewChange, done}){
    let popper = createPopper($target, $datepicker, {
        placement: 'bottom',
        onFirstUpdate: state => {
            anime.remove($datepicker);

            $datepicker.style.transformOrigin = 'center top';

            if (!isViewChange) {

            anime({
                targets: $datepicker,
                opacity: [0, 1],
                rotateX: [-90, 0],
                easing: 'spring(1.3, 80, 5, 0)',
            })
            }
        },
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
        anime({
            targets: $datepicker,
            opacity: 0,
            rotateX: -90,
        }).finished.then(() => {
            popper.destroy();
            done();
        })
    }
}

window.dp1 = new Datepicker($input1, opts);

$bntDestroy.addEventListener('click', dp1.destroy)


let dates = [new Date(), new Date('2021-06-10'), new Date('2021-06-15')];
let toggle = true;
$btnUpdate.addEventListener('click', () => {
    dp1.update({
        // isMobile: toggle,
        // view: 'years',
        // prevHtml: 'prev',
        // range: !dp.opts.range,
        // minDate: new Date(),
        // maxDate: new Date('2021-06-27'),
        locale: en,
        buttons: ['today'],
        selectedDates: dates[Math.floor(Math.random() * dates.length -1)],
        timepicker: !dp1.opts.timepicker,
    })
    toggle = !toggle;
})

$btnAction.addEventListener('click', () => {
    dp1.selectDate(new Date(), {silent: true});
});

if (module.hot) {
    module.hot.accept();
}


