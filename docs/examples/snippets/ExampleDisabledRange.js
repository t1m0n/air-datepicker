import AirDatepicker from 'components/airDatepicker';
import isWithinInterval  from 'date-fns/isWithinInterval';
import isEqual  from 'date-fns/isEqual';
import {useCallback} from 'react';

const disabledDate = new Date('2023-07-13T00:00:00');
const isDateBetweenRange = ({date, datepicker}) => {
    const selectedDate = datepicker.selectedDates[0];
    if (selectedDate && datepicker.selectedDates.length === 1) {
        const sortedDates = [selectedDate, date].toSorted((a, b) => {
            if (a.getTime() > b.getTime()) {
                return 1;
            }
            return -1;
        })

        return (isWithinInterval(disabledDate, {
            start: sortedDates[0],
            end: sortedDates[1]
        }))
    }
}
export const ExampleDisabledRange = () => {
    const onBeforeSelect = useCallback(({date, datepicker}) => {
        return !isDateBetweenRange({date, datepicker});
    }, [])

    const onFocus = useCallback(({date, datepicker}) => {
        if (isDateBetweenRange({date, datepicker}) || isEqual(date, disabledDate)) {
           datepicker.$datepicker.classList.add('-disabled-range-')
        } else {
           datepicker.$datepicker.classList.remove('-disabled-range-')
        }
    }, [])

    return <AirDatepicker
        startDate={'2023-07-19'}
        inlineInput
        range
        onBeforeSelect={onBeforeSelect}
        onFocus={onFocus}
        onRenderCell={({date}) => {
            if (date.toLocaleDateString() === disabledDate.toLocaleDateString()) {
                return {
                    disabled: true
                }
            }
        }}
    />
}
