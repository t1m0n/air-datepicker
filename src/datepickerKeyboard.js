import consts from './consts';
import {getParsedDate, isDateBigger, isDateSmaller} from './utils';

export default class DatepickerKeyboard {
    pressedKeys = new Set();
    
    hotKeys = new Map(
        [
            [[['Control', 'ArrowRight'],['Control', 'ArrowUp']], dateParts =>  dateParts.month++],
            [[['Control', 'ArrowLeft'],['Control', 'ArrowDown']], dateParts =>  dateParts.month--],
            [[['Shift', 'ArrowRight'],['Shift', 'ArrowUp']], dateParts =>  dateParts.year++],
            [[['Shift', 'ArrowLeft'],['Shift', 'ArrowDown']], dateParts =>  dateParts.year--],
            [[['Alt', 'ArrowRight'],['Alt', 'ArrowUp']], dateParts =>  dateParts.year+= 10],
            [[['Alt', 'ArrowLeft'],['Alt', 'ArrowDown']], dateParts =>  dateParts.year-= 10],
            [['Control', 'Shift', 'ArrowUp'], (dateParts, dp) =>  dp.up()],
        ]
    )

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

        this.dp.setFocusDate(newFocusedDate, {viewDateTransition: true});
    }

    registerKey(keyName) {
        this.pressedKeys.add(keyName);
    }

    removeKey(keyName) {
        this.pressedKeys.delete(keyName);
    }

    handleHotKey = (combination) =>{
        let fn = this.hotKeys.get(combination);
        let dateParts = getParsedDate(this.getInitialFocusDate());

        fn(dateParts);

        let {year, month, date} = dateParts;

        let newFocusDate = new Date(year, month, date);

        this.dp.setFocusDate(newFocusDate, {viewDateTransition: true});
    }

    /**
     * Checks if one of hot key is pressed. If so, then returns array of matched combinations
      * @return {boolean | Array}
     */
    isHotKeyPressed = () => {
        let hotKeyIsPressed = false;
        let pressedKeysLength = this.pressedKeys.size;
        let isAllKeysArePressed = key => this.pressedKeys.has(key);

        for (let [combinations] of this.hotKeys) {
            if (hotKeyIsPressed) break;
            if (Array.isArray(combinations[0])) {
                combinations.forEach((combination) => {
                    if (hotKeyIsPressed || pressedKeysLength !== combination.length) return;
                    hotKeyIsPressed = combination.every(isAllKeysArePressed) && combinations;
                });
            } else {
                if (pressedKeysLength !== combinations.length) continue;
                hotKeyIsPressed = combinations.every(isAllKeysArePressed) && combinations;
            }
        }

        return hotKeyIsPressed;
    }

    isArrow = (keyCode) => {
        return keyCode >= 37 && keyCode <= 40;
    }

    onKeyDown = (e) => {
        let {key, which} = e;
        let {dp, dp: {focusDate}, opts} = this;

        this.registerKey(key);

        let pressedHotKey = this.isHotKeyPressed();

        if (pressedHotKey) {
            e.preventDefault();
            this.handleHotKey(pressedHotKey);
            return;
        }

        if (this.isArrow(which)) {
            e.preventDefault();
            this.focusNextCell(key);
            return;
        }

        if (key === 'Enter') {
            if (dp.currentView !== opts.minView) {
                dp.down();
                return;
            }
            if (focusDate) {
                let alreadySelectedDate = dp._checkIfDateIsSelected(focusDate);
                if (!alreadySelectedDate) {
                    dp.selectDate(focusDate);
                } else {
                    dp._handleAlreadySelectedDates(alreadySelectedDate, focusDate);
                }
                return;
            }
        }

        if (key === 'Escape') {
            this.dp.hide();
        }
    }

    onKeyUp = (e) => {
        this.removeKey(e.key);
    }
}
