> :tada: New version released! :tada:

# Air Datepicker

Lightweight, **dependency free**, fast, customizable datepicker written in pure JavaScript. Works in all modern browsers which supports native css variables.

![air datepicker image](https://github.com/t1m0n/air-datepicker/raw/master/docs/img/promo-img-time.png)

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


## Change log

### v3.0.0
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

### v2.2.3
* fixed min,max dates in decade mode

### v2.2.2
* fixed min,max dates handling

### v2.2.1
* changed RegExp for recognizing date parts
* changed jquery version dependency

### v2.2.0
* added `onlyTimepicker` option
* added `onShow` and `onHide` callbacks
* added `VERSION` field to plugin's prototype
* now for selecting same date in `range` mode, you should set `{toggleSelected: false}`
* fixed `dateFormat` method (fixed wrong month name in Hungarian language)
* fixed second call of `onRenderCallback`
* fixed `_getCell()` throwing exception
* new language:
    - `sk` thanks to [RobiNN1](https://github.com/RobiNN1)


### v2.1.0
* added possibility to select single date when `{range: true}`
* added support of 12 hours mode in `altFieldDateFormat`
* improved work with minDate and maxDate when `{timepicker: true}`
* fixed wrong class adding when `{range: true}`
* new languages:
    - `es` thanks to [MarioAraque](https://github.com/MarioAraque)
    - `cs` thanks to [liborm85](https://github.com/liborm85)
    - `hu` thanks to [gergo85](https://github.com/gergo85)
    - `fi` thanks to [joonaskaskisolaphz](https://github.com/joonaskaskisolaphz)
    - `pl` thanks to [xiio](https://github.com/xiio)
    - `fr` thanks to [nicooprat](https://github.com/nicooprat)

### v2.0.2
* fixed dates array in `onSelect` callback

### v2.0.1
* fixed version for npm

### v2.0.0
* added timepicker (see [docs](http://t1m0n.name/air-datepicker/docs#timepicker) for more info)
* added possibility to set `Date` in `todayButton` 
* global variable `Datepicker` has been removed, now all placed in `$.fn.datepicker`
* improved `selectDate` method, now one can pass an array of dates to select
* added `npm` package
* fixed issue caused by `placeholder` on `readonly` inputs in IE
* fixed issue when `range` is true and first selected date is bigger than second
* added new languages:
    - `da`  thanks to [bjarnef](https://github.com/bjarnef)
    - `nl`  thanks to [JaZo](https://github.com/JaZo)
    - `pt`  thanks to [cmpscabral](https://github.com/cmpscabral)
    - `pt-BR`  thanks to [dowglaz](https://github.com/dowglaz)
    - `ro`  thanks to [tourniquet](https://github.com/tourniquet)

### v1.2.4
* fixed '$ is not defined' problem. 

### v1.2.3
* fixed `dateFormat` method.
* fixed typo in Russian docs, add ids in docs headers.

### v1.2.2
* fixed typo in `monthsField`
* added German language (thanks to [Ichag](https://github.com/Ichag))

### v1.2.1
* tests added
* added Chinese language (thanks to [think2011](https://github.com/think2011))
* fixed if '0' is passed to `firstDay`
* fixed `showOtherYears` option
* fixed `onSelect` event, when `range` is true
* fixed case when `range` and `multipleDates` both set to true

### v1.2.0
* add `range` feature
* improve keyboard navigation (fixed two focused cells)

### v1.1.0
* add keyboard navigation
* add `classes` option to add custom classes
* add `altField` option
* bug fixes
