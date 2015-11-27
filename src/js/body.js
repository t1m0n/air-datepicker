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

            html += '<div class="datepicker--day-name' + (this.d.isWeekend(curDay) ? " -weekend-" : "") + '">' + this.d.loc.daysMin[curDay] + '</div>';

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
                daysFromPevMonth = firstMonthDay - this.d.loc.firstDay,
                daysFromNextMonth = 6 - lastMonthDay + this.d.loc.firstDay;

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
                d = Datepicker.getParsedDate(date),
                render = {},
                html = d.date;

            if (this.opts.onRenderCell) {
                render = this.opts.onRenderCell(date, 'day') || {};
                html = render.html ? render.html : html;
                _class += render.classes ? ' ' + render.classes : '';
            }

            if (this.d.isWeekend(d.day)) _class += " -weekend-";
            if (Datepicker.isSame(currentDate, date)) _class += ' -current-';
            if (this.d._isSelected(date, 'day')) _class += ' -selected-';
            if (!this.d._isInRange(date) || render.disabled) _class += ' -disabled-';
            if (d.month != this.d.parsedDate.month) {
                _class += " -other-month-";

                if (!this.opts.selectOtherMonths) {
                    _class += " -disabled-";
                }

                if (!this.opts.showOtherMonths) html = '';
            }

            return '<div class="' + _class + '" ' +
                'data-date="' + date.getDate() + '" ' +
                'data-month="' + date.getMonth() + '" ' +
                'data-year="' + date.getFullYear() + '">' + html + '</div>';
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
                loc = this.d.loc,
                html = loc[this.opts.monthsFiled][d.month],
                render = {};

            if (this.opts.onRenderCell) {
                render = this.opts.onRenderCell(date, 'month') || {};
                html = render.html ? render.html : html;
                _class += render.classes ? ' ' + render.classes : '';
            }

            if (Datepicker.isSame(currentDate, date, 'month')) _class += ' -current-';
            if (this.d._isSelected(date, 'month')) _class += ' -selected-';
            if (!this.d._isInRange(date, 'month') || render.disabled) _class += ' -disabled-';

            return '<div class="' + _class + '" data-month="' + d.month + '">' + html + '</div>'
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
                d = Datepicker.getParsedDate(date),
                html = d.year,
                render = {};

            if (this.opts.onRenderCell) {
                render = this.opts.onRenderCell(date, 'year') || {};
                html = render.html ? render.html : html;
                _class += render.classes ? ' ' + render.classes : '';
            }

            if (d.year < decade[0] || d.year > decade[1]) {
                _class += ' -other-decade-';

                if (!this.opts.selectOtherYears) {
                    _class += " -disabled-";
                }

                if (!this.opts.showOtherYears) html = '';
            }

            if (Datepicker.isSame(currentDate, date, 'year')) _class += ' -current-';
            if (this.d._isSelected(date, 'year')) _class += ' -selected-';
            if (!this.d._isInRange(date, 'year') || render.disabled) _class += ' -disabled-';

            return '<div class="' + _class + '" data-year="' + d.year + '">' + html + '</div>'
        },

        _renderTypes: {
            days: function () {
                var dayNames = this._getDayNamesHtml(this.d.loc.firstDay),
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
            this._renderTypes[this.type].bind(this)();
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

        _handleClick: function (el) {
            var date = el.data('date') || 1,
                month = el.data('month') || 0,
                year = el.data('year') || this.d.parsedDate.year;

            // Change view if min view does not reach yet
            if (this.d.view != this.opts.minView) {
                var nextViewIndex = this.d.viewIndex - 1;

                this.d.silent = true;
                this.d.date = new Date(year, month, date);
                this.d.silent = false;
                this.d.view = this.d.viewIndexes[nextViewIndex];

                return;
            }

            // Select date if min view is reached
            var selectedDate = new Date(year, month, date),
                alreadySelected = this.d._isSelected(selectedDate, this.d.cellType);

            if (!alreadySelected) {
                this.d.selectDate(selectedDate);
            } else if (alreadySelected && this.opts.toggleSelected){
                this.d.removeDate(selectedDate);
            }

        },

        _onClickCell: function (e) {
            var $el = $(e.target).closest('.datepicker--cell');

            if ($el.hasClass('-disabled-')) return;

            this._handleClick.bind(this)($el);
        }
    };
})();
