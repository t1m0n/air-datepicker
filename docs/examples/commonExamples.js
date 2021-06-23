let install = `npm i air-datepicker -S`;

let basicUsage =
`import AirDatepicker from 'air-datepicker';

new AirDatepicker(el, {...options})
`;

let basicInit = `new AirDatepicker('#input');`

export let basicInitInline =
`new AirDatepicker('#div');

// Or init with {inline: true} on <input> or <div> elements

new AirDatepicker('#input', {
    inline: true
})
`;

let rangeOption =
`new AirDatepicker('#input', {
    range: true,
    multipleDatesSeparator: ' - '
});`

let timeOption =
`new AirDatepicker('#input', {
    timepicker: true,
});
`
export let timeFormatOption =
`new AirDatepicker('#input', {
    timepicker: true,
    timeFormat: 'hh:mm AA'
});
`

let customCellExample =
`let today = new Date();

new AirDatepicker('#inline-div', {
    // Handle render process
    onRenderCell({date, cellType}) {
        let dates = [1, 5, 7, 10, 15, 20, 25],
            emoji = ['💕', '😃', '🍙', '🍣', '🍻', '🎉', '🥁'],
            isDay = cellType === 'day',
            _date = date.getDate(),
            shouldChangeContent = isDay && dates.includes(_date),
            randomEmoji = emoji[Math.floor(Math.random() * emoji.length)];
    
        return {
            html: shouldChangeContent ? randomEmoji : false,
            classes: shouldChangeContent ? '-emoji-cell-' : false
        }
    },
    
    // Select 10th day of the month
    selectedDates: new Date(today.getFullYear(), today.getMonth(), 10)
});
`
let customCellExampleCss =
`.-emoji-cell- {
    --adp-cell-background-color-selected: #ffb8ff;
    --adp-cell-background-color-selected-hover: #fda5fd;
}
`

export let timeRangeExample =
`
new AirDatepicker({
    inline: true,
    timepicker: true,
    minHours: 9,
    maxHours: 18,
    minutesStep: 5
})
`

export let optsLocaleBasic =
`import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';

new AirDatepicker('#el', {
    locale: localeEn
})
`


export {
    install,
    basicUsage,
    basicInit,
    rangeOption,
    timeOption,
    customCellExample,
    customCellExampleCss
}
