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

### v3.3.4
* recreate global container if it was removed from DOM [#516](https://github.com/t1m0n/air-datepicker/issues/516)
* added Greek locale, thanks to [sonole](https://github.com/sonole), in [#515](https://github.com/t1m0n/air-datepicker/pull/515)

### v3.3.3
* fixed time format in timepicker body [#512](https://github.com/t1m0n/air-datepicker/issues/512)

### v3.3.2
* fixed day period value, when selecting date while datepicker is not active, [#510](https://github.com/t1m0n/air-datepicker/issues/510)
* fixed German locale, [#511](https://github.com/t1m0n/air-datepicker/issues/511)

### v3.3.1
* added Japanese locale, thanks to [kyong0612](https://github.com/kyong0612), in [#505](https://github.com/t1m0n/air-datepicker/pull/505)
* added Korean locale, thanks to [YankeeTube](https://github.com/YankeeTube), in [#506](https://github.com/t1m0n/air-datepicker/pull/506)

### v3.3.0
* new feature that allow you to add custom attributes via `onRenderCell` [#502](https://github.com/t1m0n/air-datepicker/issues/502), [read docs](https://air-datepicker.com/docs?scrollTo=onRenderCell)
* fixed selecting cell when using custom html with `onRenderCell` option  [#502](https://github.com/t1m0n/air-datepicker/issues/502)

### v3.2.1
* added Arabic locale, thanks to [abdo-host](https://github.com/abdo-host) [#497](https://github.com/t1m0n/air-datepicker/pull/497)
* added Italian locale, thanks to [msaltieri](https://github.com/msaltieri) [#498](https://github.com/t1m0n/air-datepicker/pull/498)

### v3.2.0
* added `onClickDayName` option, [#459](https://github.com/t1m0n/air-datepicker/issues/459)
* added `silent` param to `clear` method, [#477](https://github.com/t1m0n/air-datepicker/issues/477)
* added Swedish locale, thanks to [naton](https://github.com/naton) [#207](https://github.com/t1m0n/air-datepicker/pull/207)
* fixed error when trying to call `update` method with `view` parameter on hidden calendar, [#476](https://github.com/t1m0n/air-datepicker/issues/476)
* fixed styles issue with time sliders, [#489](https://github.com/t1m0n/air-datepicker/issues/489)
* fixed English docs description, [#490](https://github.com/t1m0n/air-datepicker/issues/490)
* fixed typings for `formatDate` method, [#491](https://github.com/t1m0n/air-datepicker/issues/491)


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
