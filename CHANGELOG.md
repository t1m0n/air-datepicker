# Changelog

### v3.6.0
* added iso-date data attribute to the cells, [#640](https://github.com/t1m0n/air-datepicker/issues/640)
* added triggering `change` event on `<input />` element when user selects a date in the calendar [#624](https://github.com/t1m0n/air-datepicker/issues/624)
* fixed an unnecessary call to the `onBeforeSelect` function when the `{silent: false}` argument is passed [#649](https://github.com/t1m0n/air-datepicker/issues/649)
* now `clear` button works correctly in the range mode [#642](https://github.com/t1m0n/air-datepicker/issues/642)
* now keyboard events are not triggered when the calendar is hidden [#631](https://github.com/t1m0n/air-datepicker/issues/631) 
* fixed return type in `selectDate` function, thanks to [marfrede](https://github.com/marfrede) in [#656](https://github.com/t1m0n/air-datepicker/pull/656)
* now you can re-enable cells in `onRenderCell` callback, thanks to [kdagnan](https://github.com/kdagnan) in [#657](https://github.com/t1m0n/air-datepicker/pull/657)
* fixed gramma and spelling in the Russian docs, thanks to [Ser5](https://github.com/Ser5) in [#669](https://github.com/t1m0n/air-datepicker/pull/669)

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

### v3.1.1
* fixed css compilation, [#461](https://github.com/t1m0n/air-datepicker/issues/461)
* fixed `autoClose` when range mode is on, [#466](https://github.com/t1m0n/air-datepicker/issues/466)
* fixed `onSelect` when range mode is on. Now it accepts array of selected dates instead of single one [#467](https://github.com/t1m0n/air-datepicker/issues/467)
* fixed transition between `isMobile` mode on and off [#470](https://github.com/t1m0n/air-datepicker/issues/470)
* added position update when resizing window [#472](https://github.com/t1m0n/air-datepicker/issues/472)
* added Sinhala locale, thanks to [nimeshc64](https://github.com/nimeshc64) in [#464](https://github.com/t1m0n/air-datepicker/pull/464)
* fixed French locale, thanks to [matschik](https://github.com/matschik) in [#465](https://github.com/t1m0n/air-datepicker/pull/465)
* added Ukrainian locale, thanks to [zaandr](https://github.com/zaandr) in [#471](https://github.com/t1m0n/air-datepicker/pull/471)

### v3.1.0
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

### v3.0.1
* fixed `update` method issue when some changes did not apply immediately 

### v3.0.0
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
