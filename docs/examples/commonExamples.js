let install = `npm i air-datepicker -S`;

let basicUsage =
`import AirDatepicker from 'air-datepicker';

new AirDatepicker(el, {...options})
`;

let basicInit = `new AirDatepicker('#input');`

let rangeOption = `
new AirDatepicker('#input', {
    range: true,
    multipleDatesSeparator: ' - '
});`

let timeOption = `
new AirDatepicker('#input', {
    timepicker: true,
});
`

let customCellExample = `
new AirDatepicker('#input', {
    onRenderCell() {
    
    },
});
`


export {
    install,
    basicUsage,
    basicInit,
    rangeOption,
    timeOption,
    customCellExample
}
