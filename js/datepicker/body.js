;(function () {
    var templates = {
        days:'' +
        '<div class="datepicker--days datepicker--body">' +
        '<div class="datepicker--days-names"></div>' +
        '<div class="datepicker--cells datepicker--cells-days"></div>' +
        '</div>',
        months: '' +
        '<div class="datepicker--months datepicker--body">' +
        '<div class="datepicker--cells datepicker--cells-months"></div>' +
        '</div>',
        years: '' +
        '<div class="datepicker--years datepicker--body">' +
        '<div class="datepicker--cells datepicker--cells-years"></div>' +
        '</div>'
    };

    Datepicker.Body = function (d, type, opts) {
        this.d = d;
        this.type = type;
        this.opts = opts;

        this.init();
    };

    Datepicker.Body.prototype = {
        init: function () {
            this._buildBaseHtml();
            this._render();

            this._bindEvents();
        },

        _bindEvents: function () {
            this.$el.on('click', '.datepicker--cell', $.proxy(this._onClickCell, this));
        },

        _buildBaseHtml: function () {
            this.$el = $(templates[this.type]).appendTo(this.d.$content);
            this.$names = $('.datepicker--days-names', this.$el);
            this.$cells = $('.datepicker--cells', this.$el);
        },

        _getDayNamesHtml: function (firstDay, curDay, html, i) {
            curDay = curDay != undefined ? curDay : firstDay;
            html = html ? html : '';
            i = i != undefined ? i : 0;

            if (i > 7) return html;
            if (curDay == 7) return this._getDayNamesHtml(firstDay, 0, html, ++i);

            html += '<div class="datepicker--day-name' + (this.d.isWeekend(curDay) ? " -weekend-" : "") + '">' + this.d.loc.days[curDay] + '</div>';

            return this._getDayNamesHtml(firstDay, ++curDay, html, ++i);
        },

        /**
         * Calculates days number to render. Generates days html and returns it.
         * @param {object} date - Date object
         * @returns {string}
         * @private
         */
        _getDaysHtml: function (date) {
            var totalMonthDays = Datepicker.getDaysCount(date),
                firstMonthDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
                lastMonthDay = new Date(date.getFullYear(), date.getMonth(), totalMonthDays).getDay(),
                daysFromPevMonth = firstMonthDay - this.opts.firstDay,
                daysFromNextMonth = 6 - lastMonthDay + this.opts.firstDay;

            daysFromPevMonth = daysFromPevMonth < 0 ? daysFromPevMonth + 7 : daysFromPevMonth;
            daysFromNextMonth = daysFromNextMonth > 6 ? daysFromNextMonth - 7 : daysFromNextMonth;

            var startDayIndex = -daysFromPevMonth + 1,
                m, y,
                html = '';

            for (var i = startDayIndex, max = totalMonthDays + daysFromNextMonth; i <= max; i++) {
                y = date.getFullYear();
                m = date.getMonth();

                html += this._getDayHtml(new Date(y, m, i))
            }

            return html;
        },

        _getDayHtml: function (date) {
            var _class = "datepicker--cell datepicker--cell-day",
                currentDate = new Date(),
                d = Datepicker.getParsedDate(date);

            if (this.d.isWeekend(d.day)) _class += " -weekend-";
            if (d.month != this.d.parsedDate.month) _class += " -another-month-";
            if (Datepicker.isSame(currentDate, date)) _class += ' -current-';
            if (this._isSelected(date, 'day')) _class += ' -selected-';

            return '<div class="' + _class + '" data-date="' + date.getDate() + '">' + date.getDate() + '</div>';
        },

        /**
         * Generates months html
         * @param {object} date - date instance
         * @returns {string}
         * @private
         */
        _getMonthsHtml: function (date) {
            var html = '',
                d = Datepicker.getParsedDate(date),
                i = 0;

            while(i < 12) {
                html += this._getMonthHtml(new Date(d.year, i));
                i++
            }

            return html;
        },

        _getMonthHtml: function (date) {
            var _class = "datepicker--cell datepicker--cell-month",
                d = Datepicker.getParsedDate(date),
                currentDate = new Date(),
                loc = this.d.loc;

            if (Datepicker.isSame(currentDate, date, 'month')) _class += ' -current-';

            return '<div class="' + _class + '" data-month="' + d.month + '">' + loc.months[d.month] + '</div>'
        },

        _getYearsHtml: function (date) {
            var d = Datepicker.getParsedDate(date),
                decade = Datepicker.getDecade(date),
                firstYear = decade[0] - 1,
                html = '',
                i = firstYear;

            for (i; i <= decade[1] + 1; i++) {
                html += this._getYearHtml(new Date(i , 0));
            }

            return html;
        },

        _getYearHtml: function (date) {
            var _class = "datepicker--cell datepicker--cell-year",
                decade = Datepicker.getDecade(this.d.date),
                currentDate = new Date(),
                d = Datepicker.getParsedDate(date);

            if (d.year < decade[0] || d.year > decade[1]) {
                _class += ' -another-decade-';
            }

            if (Datepicker.isSame(currentDate, date, 'year')) _class += ' -current-';

            return '<div class="' + _class + '" data-year="' + d.year + '">' + d.year + '</div>'
        },

        _renderTypes: {
            days: function () {
                var dayNames = this._getDayNamesHtml(this.opts.firstDay),
                    days = this._getDaysHtml(this.d.currentDate);

                this.$cells.html(days);
                this.$names.html(dayNames)
            },
            months: function () {
                var html = this._getMonthsHtml(this.d.currentDate);

                this.$cells.html(html)
            },
            years: function () {
                var html = this._getYearsHtml(this.d.currentDate);

                this.$cells.html(html)
            }
        },

        _render: function () {
            this._renderTypes[this.type].bind(this)()
        },

        _isSelected: function (cellDate, cellType) {
            var selectedDates = this.d.selectedDates,
                len = selectedDates.length,
                result;

            if (!len) return false;

            for (var i = 0; i < len; i++) {
                if (Datepicker.isSame(selectedDates[i], cellDate, cellType)) {
                    result = true;
                    break;
                }
            }

            return result;
        },

        show: function () {
            this.$el.addClass('active');
            this.acitve = true;
        },

        hide: function () {
            this.$el.removeClass('active');
            this.active = false;
        },

        //  Events
        // -------------------------------------------------

        _handleClick: {
            days: function (el) {
                var date = el.data('date'),
                    d = this.d.parsedDate;

                this.d.date = new Date(d.year, d.month, date);
                this.d.selectDate(this.d.date);

                if (this.d.opts.onChange) {
                    this.d._triggerOnChange()
                }
            },
            months: function (el) {
                var month = el.data('month'),
                    d = this.d.parsedDate;

                this.d.date = new Date(d.year, month, 1);
                this.d.view = 'days';
            },
            years: function (el) {
                var year = el.data('year');

                this.d.date = new Date(year, 0, 1);
                this.d.view = 'months';
            }
        },

        _onClickCell: function (e) {
            var $el = $(e.target).closest('.datepicker--cell');

            this._handleClick[this.d.currentView].bind(this)($el);
        }
    };
})();
