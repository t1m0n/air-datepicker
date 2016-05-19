# Air Datepicker

Lightweight customizable cross-browser jQuery datepicker, built with es5 and css-flexbox. Works in all modern desktop and mobile browsers (tested no Android 4.4+ and iOS8+).

![air datepicker image](https://github.com/t1m0n/air-datepicker/raw/master/docs/img/promo-img-time.png)

## Install

### bower
```
bower i --save air-datepicker
```
### npm
```
npm i --save air-datepicker
```

## Usage
```javascript
$('.my-datepicker').datepicker([options])
```

## Demo and docs
* [In English](http://t1m0n.name/air-datepicker/docs/)
* [In Russian](http://t1m0n.name/air-datepicker/docs/index-ru.html)

## Change log

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
