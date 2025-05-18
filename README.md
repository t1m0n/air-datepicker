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

## Recent updates

### v3.6.0
* added iso-date data attribute to the cells, [#640](https://github.com/t1m0n/air-datepicker/issues/640)
* added triggering `change` event on `<input />` element when user selects a date in the calendar [#624](https://github.com/t1m0n/air-datepicker/issues/624)
* fixed an unnecessary call to the `onBeforeSelect` function when the `{silent: false}` argument is passed [#649](https://github.com/t1m0n/air-datepicker/issues/649)
* now `clear` button works correctly in the range mode [#642](https://github.com/t1m0n/air-datepicker/issues/642)
* now keyboard events are not triggered when the calendar is hidden [#631](https://github.com/t1m0n/air-datepicker/issues/631)
* fixed return type in `selectDate` function, thanks to [marfrede](https://github.com/marfrede) in [#656](https://github.com/t1m0n/air-datepicker/pull/656)
* now you can re-enable cells in `onRenderCell` callback, thanks to [kdagnan](https://github.com/kdagnan) in [#657](https://github.com/t1m0n/air-datepicker/pull/657)
* fixed gramma and spelling in the Russian docs, thanks to [Ser5](https://github.com/Ser5) [#669](https://github.com/t1m0n/air-datepicker/pull/669)

### v3.5.3
* fixed range mode [#613](https://github.com/t1m0n/air-datepicker/issues/613)

### v3.5.2
* fixed range mode [#613](https://github.com/t1m0n/air-datepicker/issues/613)

### v3.5.1
* improved `destroy()` behavior - added `isDestroyed` property, `opts` and `selectedDates` will still have empty values, instead of `null`, even after AirDatepicker has been destroyed [#600](https://github.com/t1m0n/air-datepicker/issues/600)

### v3.5.0
* added `fixedHeight` option, allows you to have equal weeks number in every month
* added method `disableDate`, allows you to disabled one or multiple dates with datepicker API
* added prop `disabledDates` - it is a Set which holds all disabled dates
* added possibility to pass `{silent: true}` to `update` and `setCurrentView` methods, [#583](https://github.com/t1m0n/air-datepicker/issues/568)
* changed `update` method - now if you pass `selectedDates` then calendar will keep selected only those dates
* fixed selecting time on same date when `range: true`, [#568](https://github.com/t1m0n/air-datepicker/issues/568)
* fixed date conversion to local date when using strings, e.g `selectDate('2024-03-05')` [#589](https://github.com/t1m0n/air-datepicker/issues/589)
* fixed localization generation, thanks to [hreyeslo](https://github.com/hreyeslo) in [#524](https://github.com/t1m0n/air-datepicker/pull/524)
* fixed type definition for `clear` method, thanks to [ahmetzambak](https://github.com/ahmetzambak) in [#591](https://github.com/t1m0n/air-datepicker/pull/591)
* fixed German translation for "clear", thanks to [pbek](https://github.com/pbek) in [#582](https://github.com/t1m0n/air-datepicker/pull/582)
* added Slovenian locale, thanks to [carliblaz](https://github.com/carliblaz) in [#569](https://github.com/t1m0n/air-datepicker/pull/569)
* added Basque locale, thanks to [ikerib](https://github.com/ikerib) in [#529](https://github.com/t1m0n/air-datepicker/pull/529)
* added Norwegian locale, thanks to [MortenSpjotvoll](https://github.com/MortenSpjotvoll) in [#521](https://github.com/t1m0n/air-datepicker/pull/521)

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
