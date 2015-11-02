var Datepicker;

(function (window, $, undefined) {
    var pluginName = 'datepicker',
        $body, $datepickersContainer,
        baseTemplate = '' +
            '<div class="datepicker">' +
            '<nav class="datepicker--nav"></nav>' +
            '<div class="datepicker--content"></div>' +
            '</div>',
        defaults = {
            //TODO сделать работу с инпутом
            inline: true,
            region: 'ru',
            firstDay: 1, // Week's first day
            start: '', // Start date
            weekends: [6, 0],
            defaultView: 'days',
            dateFormat: 'dd.mm.yyyy',
            toggleSelected: true,

            //TODO сделать тоже самое с годами
            showOtherMonths: true,
            selectOtherMonths: true,
            moveToOtherMonthsOnSelect: true,

            minDate: '',
            maxDate: '',
            //TODO сделать реакцию навигации на минимальную и максимальную даты
            disableNavWhenOutOfRange: '',

            //TODO возможно добавить огрнаичивать число выделяемых дат
            multipleDates: false,
            multipleDatesSeparator: ',',

            // navigation
            prevHtml: '&laquo;',
            nextHtml: '&raquo;',

            // events
            onChange: ''
        };

    Datepicker  = function (el, options) {
        this.$el = typeof el == 'string' ? $(el) : el;

        this.opts = $.extend({}, defaults, options);

        if (!this.opts.start) {
            this.opts.start = new Date();
        }
        if (this.containerBuilt && !this.opts.inline) {
            this._buildDatepickersContainer();
        }

        this.loc = Datepicker.region[this.opts.region];

        if ($body == undefined) {
            $body = $('body');
        }

        this.inited = false;
        this.silent = false; // Need to prevent unnecessary rendering

        this.currentDate = this.opts.start;
        this.currentView = this.opts.defaultView;
        this.minDate = this.opts.minDate ? this.opts.minDate : new Date(-8639999913600000);
        this.maxDate = this.opts.maxDate ? this.opts.maxDate : new Date(8639999913600000);
        this.selectedDates = [];
        this.views = {};

        this.init()
    };


    Datepicker.prototype = {
        containerBuilt: false,
        init: function () {
            this._buildBaseHtml();

            this.nav = new Datepicker.Navigation(this, this.opts);
            this.views[this.currentView] = new Datepicker.Body(this, this.currentView, this.opts);

            this.views[this.currentView].show();

            this.inited = true;
        },

        isWeekend: function (day) {
            return this.opts.weekends.indexOf(day) !== -1;
        },

        _buildDatepickersContainer: function () {
            this.containerBuilt = true;
            $body.append('<div class="datepickers-container" id="datepickers-container"></div>');
            $datepickersContainer = $('#datepickers-container');
        },

        _buildBaseHtml: function () {
            var $appendTarget = this.$el;
            if(!this.opts.inline) {
                $appendTarget = $datepickersContainer;
            }
            this.$datepicker = $(baseTemplate).appendTo($appendTarget);
            this.$content = $('.datepicker--content', this.$datepicker);
            this.$nav = $('.datepicker--nav', this.$datepicker);
        },

        _defineDOM: function () {

        },

        _triggerOnChange: function (cellType) {
            if (!this.selectedDates.length) {
                return this.opts.onChange('', '', this);
            }

            var selectedDates = this.selectedDates,
                parsedSelected = Datepicker.getParsedDate(selectedDates[0]),
                formattedDates = this.formatDate(this.opts.dateFormat, selectedDates[0]),
                _this = this,
                dates = new Date(parsedSelected.year, parsedSelected.month, parsedSelected.date);

            if (this.opts.multipleDates) {
                formattedDates = selectedDates.map(function (date) {
                    return _this.formatDate(_this.opts.dateFormat, date)
                }).join(this.opts.multipleDatesSeparator);

                // Create new dates array, to separate it from original selectedDates
                dates = selectedDates.map(function(date) {
                    var parsedDate = Datepicker.getParsedDate(date);
                    return new Date(parsedDate.year, parsedDate.month, parsedDate.date)
                })
            }

            this.opts.onChange(formattedDates, dates, this);
        },

        next: function () {
            var d = this.parsedDate;
            switch (this.view) {
                case 'days':
                    this.date = new Date(d.year, d.month + 1, 1);
                    break;
                case 'months':
                    this.date = new Date(d.year + 1, d.month, 1);
                    break;
                case 'years':
                    this.date = new Date(d.year + 10, 0, 1);
                    break;
            }
        },

        prev: function () {
            var d = this.parsedDate;
            switch (this.view) {
                case 'days':
                    this.date = new Date(d.year, d.month - 1, 1);
                    break;
                case 'months':
                    this.date = new Date(d.year - 1, d.month, 1);
                    break;
                case 'years':
                    this.date = new Date(d.year - 10, 0, 1);
                    break;
            }
        },

        formatDate: function (string, date) {
            var result = string,
                d = Datepicker.getParsedDate(date);

            switch (true) {
                case /dd/.test(result):
                    result = result.replace('dd', d.fullDate);
                case /d/.test(result):
                    result = result.replace('d', d.date);
                case /mm/.test(result):
                    result = result.replace('mm',d.fullMonth);
                case /m/.test(result):
                    result = result.replace('m',d.month + 1);
                case /MM/.test(result):
                    result = result.replace('MM', this.loc.months[d.month]);
                case /yyyy/.test(result):
                    result = result.replace('yyyy', d.year);
                case /yy/.test(result):
                    result = result.replace('yy', d.year.toString().slice(-2));
            }

            return result;
        },

        selectDate: function (date) {
            var d = this.parsedDate;

            if (date.getMonth() != d.month && this.opts.moveToOtherMonthsOnSelect) {
                this.silent = true;
                this.date = new Date(date.getFullYear(),date.getMonth(), 1);
                this.silent = false;
                this.nav._render()
            }

            if (this.opts.multipleDates) {
                if (!this._isSelected(date)) {
                    this.selectedDates.push(date);
                }
            } else {
                this.selectedDates = [date];
            }

            this.views[this.currentView]._render()
        },

        removeDate: function (date) {
            var selected = this.selectedDates,
                _this = this;

            return selected.some(function (curDate, i) {
                if (Datepicker.isSame(curDate, date)) {
                    selected.splice(i, 1);
                    _this.views[_this.currentView]._render();
                    return true
                }
            })
        },

        _isSelected: function (checkDate, cellType) {
            return this.selectedDates.some(function (date) {
                return Datepicker.isSame(date, checkDate, cellType)
            })
        },

        /**
         * Check if date is between minDate and maxDate
         * @param date {object} - date object
         * @param type {string} - cell type
         * @returns {*}
         * @private
         */
        _isInRange: function (date, type) {
            var time = date.getTime(),
                d = Datepicker.getParsedDate(date),
                min = Datepicker.getParsedDate(this.minDate),
                max = Datepicker.getParsedDate(this.maxDate),
                dMinTime = new Date(d.year, d.month, min.date).getTime(),
                dMaxTime = new Date(d.year, d.month, max.date).getTime(),
                types = {
                    day: time >= this.minTime && time <= this.maxTime,
                    month: dMinTime >= this.minTime && dMaxTime <= this.maxTime,
                    year: d.year >= min.year && d.year <= max.year
                };
            return type ? types[type] : types.day
        },

        get parsedDate() {
            return Datepicker.getParsedDate(this.date);
        },

        set date (val) {
            this.currentDate = val;

            if (this.inited && !this.silent) {
                this.views[this.view]._render();
                this.nav._render();
            }

            return val;
        },

        get date () {
            return this.currentDate
        },

        set view (val) {
            this.prevView = this.currentView;
            this.currentView = val;

            if (this.inited) {
                if (!this.views[val]) {
                    this.views[val] = new Datepicker.Body(this, val, this.opts)
                } else {
                    this.views[val]._render();
                }

                this.views[this.prevView].hide();
                this.views[val].show();
                this.nav._render();
            }

            return val
        },

        get view() {
            return this.currentView;
        },

        get minTime() {
            // Reset hours to 00:00, in case of new Date() is passed as option to minDate
            var min = Datepicker.getParsedDate(this.minDate);
            return new Date(min.year, min.month, min.date).getTime()
        },

        get maxTime() {
            var max = Datepicker.getParsedDate(this.maxDate);
            return new Date(max.year, max.month, max.date).getTime()
        }
    };

    Datepicker.getDaysCount = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    Datepicker.getParsedDate = function (date) {
        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            fullMonth: (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1, // One based
            date: date.getDate(),
            fullDate: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            day: date.getDay()
        }
    };

    Datepicker.getDecade = function (date) {
        var firstYear = Math.floor(date.getFullYear() / 10) * 10;

        return [firstYear, firstYear + 9];
    };

    Datepicker.template = function (str, data) {
        return str.replace(/#\{([\w]+)\}/g, function (source, match) {
            if (data[match] || data[match] === 0) {
                return data[match]
            }
        });
    };

    Datepicker.isSame = function (date1, date2, type) {
        var d1 = Datepicker.getParsedDate(date1),
            d2 = Datepicker.getParsedDate(date2),
            _type = type ? type : 'day',

            conditions = {
                day: d1.date == d2.date && d1.month == d2.month && d1.year == d2.year,
                month: d1.month == d2.month && d1.year == d2.year,
                year: d1.year == d2.year
            };

        return conditions[_type];
    };

    $.fn[pluginName] = function ( options ) {
        if (Datepicker.prototype[options]) {
            Datepicker.prototype[options].apply(this.data(pluginName), Array.prototype.slice.call(arguments, 1));
        } else {
            return this.each(function () {
                if (!$.data(this, pluginName)) {
                    $.data(this,  pluginName,
                        new Datepicker( this, options ));
                } else {
                    var _this = $.data(this, pluginName),
                        oldOpts = _this.opts;

                    _this.opts = $.extend({}, oldOpts, options);
                }
            });
        }
    };

})(window, jQuery, '');