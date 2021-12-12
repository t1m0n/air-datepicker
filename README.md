> :tada: New version released! :tada:

# Air Datepicker

Lightweight, **dependency-free**, fast, customizable datepicker written in pure JavaScript. Works in all modern browsers which supports native css variables.

![air datepicker image](https://github.com/t1m0n/air-datepicker/raw/master/promo-img.png)

## Install

```
npm i air-datepicker
```

## Usage
```javascript
import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'

new AirDatepicker('#el' [, options]);
```

## Demo and docs
* [Version 3](https://air-datepicker.com)
* [Version 2](http://t1m0n.name/air-datepicker/docs/)

## Recent updates

### 3.1.0
* added lazy rendering - now inner components of datepicker will be created only when it will be visible, and will be destroyed when datepicker is hidden
* improved `position` - now it can be function which allows you to perform advanced positioning using third-party libraries such as [popperjs](https://popper.js.org/) or manually
* added `isMobile` option, which allows showing Air Datepicker as modal window on mobile devices
* added `visiblie` option, if it is set to `true` then calendar will be visible at the start
* changed `dateFormat` - as function it now handles all dates at once, instead of each date separately
* fixed field names in `onSelect` and `onRenderCell` options: `type` -> `cellType`, `dp` -> `datepicker`
* fixed typings
* fixed `closet` function, thanks to [@hreyeslo](https://github.com/hreyeslo) in [#445](https://github.com/t1m0n/air-datepicker/pull/445)
* added Turkish locale, thanks to [@ozkanozcan](https://github.com/ozkanozcan) in [#447](https://github.com/t1m0n/air-datepicker/pull/447)
* added opportunity to set attributes when creating custom buttons, thanks to [@khidirbekov](https://github.com/khidirbekov) in [#448](https://github.com/t1m0n/air-datepicker/pull/448)
* added Thai locale, thanks to [@boatkung](https://github.com/boatkung) in [#453](https://github.com/t1m0n/air-datepicker/pull/453)
 


## Version 3.0.0 highlights
It is been a while since the last release, a lot of work has been done, and I'm glad to finally present a new version of Air Datepicker.

The main goal was to remove jQuery dependency, and I'm happy to announce that Air Datepicker is no longer need any dependency, hurray! :partying_face:  

Now it's written in ES6, uses native css variables for easy customization, and it's all built with webpack.

Soooo, here is the full list of changes:

* no more jQuery
* improve rendering process - remove redundant cell render when selecting date, which gave a large speed boost compared to the old version
* date format tokens now use [Unicode Technical Standard](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table)
* TypeScript support
* added `selectedDates` option, to be able to select dates from the start
* added a possibility to create custom buttons
* now one could change selected range by dragging dates
* added `container` option which allows you to place datepicker in a custom element
* `navTitles` can receive a function and could render dynamically
* `dateFormat` now can receive a function
* `onSelect` and `onRenderCell` callbacks are now receive a single object as an argument instead of multiple parameters
* `selectDate` now receives second parameter with options
* `onChangeMonth`, `onChangeYear`, `onChangeDecades` are replaced with single option `onChangeViewDate`
* localization now must be provided as an object instead of string as it was before

## Contribution

* To run project run `npm i`, then `npm run dev:serve`.
* If you want to report a bug, please provide steps and code to reproduce it or create a live example. You could use [this template](https://codesandbox.io/s/air-datepicker-c1lmk) for creating sandbox
* If you have a question please ask it on [StackOverflow](https://stackoverflow.com/questions/ask) with tag `air-datepicker`
* If you have a proposal or PR please submit it to the [main branch](https://github.com/t1m0n/air-datepicker/tree/v3) - please follow code style according to .eslint configuration.
Also make sure that your effort is aligned with project roadmap - my goal is to keep datepicker clean and lightweight (under 15kb) without overcomplications or narrowly focused features

Thank you! :blush:

## License

Air Datepicker is MIT licensed.
