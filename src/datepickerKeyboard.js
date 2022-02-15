import consts from './consts';
import {getParsedDate, getDaysCount} from './utils';

export default class DatepickerKeyboard {
    pressedKeys = new Set();
    
    hotKeys = new Map(
        [
            [[['Control', 'ArrowRight'], ['Control', 'ArrowUp']], dateParts =>  dateParts.month++],
            [[['Control', 'ArrowLeft'], ['Control', 'ArrowDown']], dateParts =>  dateParts.month--],
            [[['Shift', 'ArrowRight'], ['Shift', 'ArrowUp']], dateParts =>  dateParts.year++],
            [[['Shift', 'ArrowLeft'], ['Shift', 'ArrowDown']], dateParts =>  dateParts.year--],
            [[['Alt', 'ArrowRight'], ['Alt', 'ArrowUp']], dateParts =>  dateParts.year += 10],
            [[['Alt', 'ArrowLeft'], ['Alt', 'ArrowDown']], dateParts =>  dateParts.year -= 10],
            [['Control', 'Shift', 'ArrowUp'], (dateParts, dp) =>  dp.up()],
        ]
    )

    constructor({dp, opts}) {
        this.dp = dp;
        this.opts = opts;

        this.init();
    }

    init() {
        this.bindKeyboardEvents();
    }

    bindKeyboardEvents() {
        let {$el} = this.dp;

        $el.addEventListener('keydown', this.onKeyDown);
        $el.addEventListener('keyup', this.onKeyUp);
    }

    destroy() {
        let {$el} = this.dp;

        $el.removeEventListener('keydown', this.onKeyDown);
        $el.removeEventListener('keyup', this.onKeyUp);
        this.hotKeys = null;
        this.pressedKeys = null;
    }
    
    getInitialFocusDate() {
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
            parsedFocusDate = getParsedDate(initialFocusDate),
            y = parsedFocusDate.year,
            m = parsedFocusDate.month,
            d = parsedFocusDate.date;

        switch (keyName) {
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

        let newFocusedDate = this.dp.getClampedDate(new Date(y, m, d));
        this.dp.setFocusDate(newFocusedDate, {viewDateTransition: true});
    }

    registerKey(keyName) {
        this.pressedKeys.add(keyName);
    }

    removeKey(keyName) {
        this.pressedKeys.delete(keyName);
    }

    handleHotKey = (combination) => {
        let fn = this.hotKeys.get(combination),
            dateParts = getParsedDate(this.getInitialFocusDate());

        fn(dateParts, this.dp);

        let {year, month, date} = dateParts;

        let totalDaysInNextMonth = getDaysCount(new Date(year, month));

        if (totalDaysInNextMonth < date) {
            date = totalDaysInNextMonth;
        }

        let newFocusedDate = this.dp.getClampedDate(new Date(year, month, date));

        this.dp.setFocusDate(newFocusedDate, {viewDateTransition: true});
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
