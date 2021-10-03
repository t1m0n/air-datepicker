let install = `npm i air-datepicker -S`;

let basicUsage =
`import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

new AirDatepicker('#my-element'[, options])
`;

let basicInit = `new AirDatepicker('#input');`

export let basicInitInline =
`new AirDatepicker('#div');

// Or init with {inline: true} on <input> or <div> elements

new AirDatepicker('#input', {
    inline: true
})
`;

export let basicSelectedDate =
`new AirDatepicker('#el', {
    selectedDates: [new Date()]
})`;

export let basicMinView =
`new AirDatepicker('#el', {
    view: 'months',
    minView: 'months',
    dateFormat: 'MMMM yyyy'
})`;


let rangeOption =
`new AirDatepicker('#input', {
    range: true,
    multipleDatesSeparator: ' - '
});`

export let rangeMinMax =
`let dpMin, dpMax;

dpMin = new AirDatepicker('#el1', {
    onSelect({date}) {
        dpMax.update({
            minDate: date
        })
    }
})

dpMax = new AirDatepicker('#el2', {
    onSelect({date}) {
        dpMin.update({
            maxDate: date
        })
    }
})
`

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

export let customTitleBasicExample =
`new AirDatepicker('#el', {
    navTitles: {
        days: '<strong>yyyy</strong> <i>MMMM</i>',
        months: 'Select month of <strong>yyyy</strong>'    
    }
})
`

export let customTitleExample = (messages) =>
`new AirDatepicker('#el', {
    navTitles: {
        days(dp) {
            if (dp.selectedDates.length) {
                let date = dp.selectedDates[0];
                return \`<small>
                   ${messages.chosenDate.replace('{date}', '')} \${dp.formatDate(date, 'dd MMMM yyyy')}
                </small>\`;
            }
            
            return '${messages.chooseDate}';
        }
    }
})`

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

export let optsSelectedDatesExample =
`import AirDatepicker from 'air-datepicker';

let startDate = new Date('2021-07-20');

new AirDatepicker('#el', {
    startDate,
    multipleDates: true,
    selectedDates: [startDate, '2021-07-25', 1626307200000]
})
`

export let optsDateFormatFunc =
`new AirDatepicker('#el', {
    dateFormat(date) {
        return date.toLocaleString('ja', {
            year: 'numeric',
            day: '2-digit',
            month: 'long'
        });
    }
})`

export let optsButtonsShape =
`type ButtonShape = {
    content: string | (dpInstance) => string
    tagName?: string
    className?: string
    onClick?: (dpInstance) => void
}
`

export let exampleButtonsBasic =
`new AirDatepicker('#el', {
    buttons: ['today', 'clear']
})`

export let exampleButtonsAdvance = (messages) =>
`new AirDatepicker('#el', {
    buttons: [
        {
            content(dp) {
                return dp.opts.timepicker 
                    ? '${messages.exampleButtonsAdvanceTurnOff}'
                    : '${messages.exampleButtonsAdvanceTurnOn}'
            },
            onClick(dp) {
                let viewDate = dp.viewDate;
                let today = new Date();
                
                // Since timepicker takes initial time from 'viewDate', set up time here, 
                // otherwise time will be equal to 00:00 if user navigated through datepicker
                viewDate.setHours(today.getHours());
                viewDate.setMinutes(today.getMinutes());

                dp.update({
                    timepicker: !dp.opts.timepicker,
                    viewDate
                })
            }
        }
    ]
})`

export let optsButtonsExample =
`import AirDatepicker from 'air-datepicker';

let button = {
    content: 'Select 2021-07-26',
    className: 'custom-button-classname',
    onClick: (dp) => {
        let date = new Date('2021-07-26');
        dp.selectDate(date);
        dp.setViewDate(date);
    }
}

new AirDatepicker('#el', {
    buttons: [button, 'clear'] // Custom button, and pre-installed 'clear' button
})
`

export let optsNavTitlesDefaults =
`let navTitlesDefaults = {
    days: 'MMMM, <i>yyyy</i>',
    months: 'yyyy',
    years: 'yyyy1 - yyyy2'
}`

export let optsNavTitlesUsage =
`new AirDatepicker('#el', {
    navTitles: {
        days: '<strong>Choose date</strong> MM, yyyy'
    }
})`

export let eventsOnRenderCell =
`new AirDatepicker('#el', {
    onRenderCell({date, cellType}) {
        // Disable all 12th dates in month
        if (cellType === 'day') {
            if (date.getDate() === 12) {
                return {
                    disabled: true
                }
            }
        }
    }
})
`

export let apiAccess =
`let dp = new AirDatepicker('#el');

dp.show();
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
