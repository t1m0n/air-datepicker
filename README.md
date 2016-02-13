# Air Datepicker

Lightweight customizable cross-browser jQuery datepicker, built with es5 and css-flexbox. Works in all modern desktop and mobile browsers (tested no Android 4.4+ and iOS8+)
![air datepicker image](https://github.com/t1m0n/air-datepicker/raw/master/docs/img/promo-img.png)

## Install
```
bower i --save air-datepicker
```

## Usage
```javascript
$('.my-datepicker').datepicker([options])
```

## Demo and docs
* [In English](http://t1m0n.name/air-datepicker/docs/)
* [In Russian](http://t1m0n.name/air-datepicker/docs/index-ru.html)

## Change log

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
