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

### v3.4.0
* added new options `onFocus` and `onBeforeSelect` grant you more control over range selection behaviour and more [#526](https://github.com/t1m0n/air-datepicker/issues/526)
* added new method `getViewDates()` allows you to get all dates that should be currently displayed in calendar [#536](https://github.com/t1m0n/air-datepicker/issues/536)
* `toggleSelected` now can be a function [#534](https://github.com/t1m0n/air-datepicker/issues/534)
* fixed `clear` method [#546](https://github.com/t1m0n/air-datepicker/issues/546)
* added Bulgarian locale, thanks to [tonytomov](https://github.com/tonytomov), in [#531](https://github.com/t1m0n/air-datepicker/pull/531)
* added Catalan locale, thanks to [joatb](https://github.com/joatb), in [#542](https://github.com/t1m0n/air-datepicker/pull/542)
* added Croatian Locale, thanks to [diomed](https://github.com/diomed), in [#551](https://github.com/t1m0n/air-datepicker/pull/551)

### v3.3.5
* added handling of optional chaining operator in dist package [#518](https://github.com/t1m0n/air-datepicker/issues/518)
* added Indonesian locale, thanks to [BariqDharmawan](https://github.com/BariqDharmawan), in [#517](https://github.com/t1m0n/air-datepicker/pull/517)

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
