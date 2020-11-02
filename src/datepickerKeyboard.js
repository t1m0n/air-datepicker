import consts from './consts';
import {getParsedDate, isDateBigger, isDateSmaller} from './utils';

export default class DatepickerKeyboard {
    pressedKeys = new Set();

    constructor({dp, opts}) {
        this.dp = dp;
        this.opts = opts;

        this.init();
    }

    init(){
        this.bindKeyboardEvents();
    }

    bindKeyboardEvents(){
        let {$el} = this.dp;

        $el.addEventListener('keydown', this.onKeyDown);
        $el.addEventListener('keyup', this.onKeyUp);
    }
    
    getInitialFocusDate(){
        let {focusDate, currentView, selectedDates, parsedViewDate: {year, month}} = this.dp;
        let potentialFocused  = focusDate || selectedDates[selectedDates.length - 1];

        if (!potentialFocused) {
            switch (currentView) {
                case consts.days:
                    potentialFocused = new Date(year, month, new Date().getDate());
                    break;
                case consts.months:
                    potentialFocused = new Date(year, month, 1);
                    break;
                case consts.years:
                    potentialFocused = new Date(year, 0, 1);
                    break;
            }
        }

        return potentialFocused;
    }

    //TODO next переход к следующему месяцу после фокусировки
    focusNextCell(keyName) {
        let initialFocusDate = this.getInitialFocusDate(),
            {currentView} = this.dp,
            {days, months, years} = consts,
            {minDate, maxDate} = this.opts,
            parsedFocusDate = getParsedDate(initialFocusDate),
            y = parsedFocusDate.year,
            m = parsedFocusDate.month,
            d = parsedFocusDate.date;

        switch(keyName) {
            case 'ArrowLeft':
                currentView === days ? (d -= 1) : '';
                currentView === months ? (m -= 1) : '';
                currentView === years ? (y -= 1) : '';
                break;
            case 'ArrowUp':
                currentView === days ? (d -= 7) : '';
                currentView === months ? (m -= 3) : '';
                currentView === years ? (y -= 4) : '';
                break;
            case 'ArrowRight':
                currentView === days ? (d += 1) : '';
                currentView === months ? (m += 1) : '';
                currentView === years ? (y += 1) : '';
                break;
            case 'ArrowDown':
                currentView === days ? (d += 7) : '';
                currentView === months ? (m += 3) : '';
                currentView === years ? (y += 4) : '';
                break;
        }

        let newFocusedDate = new Date(y, m, d);

        if (maxDate && isDateBigger(newFocusedDate, maxDate)) {
            newFocusedDate = maxDate;
        } else if (minDate && isDateSmaller(newFocusedDate, minDate)) {
            newFocusedDate = minDate;
        }

        this.dp.setFocusDate(newFocusedDate, {byKeyboard: true});
    }

    registerKey(keyName) {
        this.pressedKeys.add(keyName);
    }

    removeKey(keyName) {
        this.pressedKeys.delete(keyName);
    }

    isHotKeyPressed = () => {

    }

    isArrow = (keyCode) => {
        return keyCode >= 37 && keyCode <= 40;
    }

    onKeyDown = (e) => {
        let {key, which} = e;
        this.registerKey(key);
        
        if (this.isArrow(which)) {
            e.preventDefault();
            this.focusNextCell(key);
        }
    }

    onKeyUp = (e) => {
        this.removeKey(e.key);
    }
}
