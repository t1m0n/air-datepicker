let install = `npm i air-datepicker -S`;

let basicUsage =
`import AirDatepicker from 'air-datepicker';

new AirDatepicker(el, {...options})
`;

let basicInit = `new AirDatepicker('#input');`

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

let customCellExample =
`new AirDatepicker('#inline-div', {
    let dates = [1, 5, 7, 10, 15, 20, 25],
        emoji = ['💕', '😃', '🍙', '🍣', '🍻', '🎉', '🥁'],
        isDay = type === 'day',
        _date = date.getDate(),
        shouldChangeContent = isDay && dates.includes(_date),
        randomEmoji = emoji[Math.floor(Math.random() * emoji.length)];

    return {
        html: shouldChangeContent ? randomEmoji : false,
        classes: shouldChangeContent ? '-emoji-cell-' : false
    }
});
`
let customCellExampleCss =
`.-emoji-cell- {
    --adp-cell-background-color-selected: #ffb8ff;
    --adp-cell-background-color-selected-hover: #ffb0ff;
}
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
