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
            inline: true,
            region: 'ru',
            firstDay: 1, // Week's first day
            start: '', // Start date
            weekends: [6, 0],
            format: 'dd.mm.yyyy',

            // navigation
            prevHtml: '&laquo;',
            nextHtml: '&raquo;'
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

        this.currentDate = this.opts.start;

        this.init()
    };


    Datepicker.prototype = {
        containerBuilt: false,
        init: function () {
            this._buildBaseHtml();

            this.nav = new Datepicker.Navigation(this, this.opts);
            this.days = new Datepicker.Body(this, 'days', this.opts);
        },

        isWeekend: function (day) {
            return this.opts.weekends.indexOf(day) !== -1;

        },

        _buildDatepickersContainer: function () {
            this.containerBuilt = true;
            $body.append('<div class="datepickers-container" id="datepickers-container"></div>')
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

        }
    };


    Datepicker.getDaysCount = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    Datepicker.getParsedDate = function (date) {
        return {
            year: date.getUTCFullYear(),
            month: date.getUTCMonth(),
            day: date.getUTCDay()
        }
    };

    Datepicker.template = function (str, data) {
        return str.replace(/#\{([\w]+)\}/g, function (source, match) {
            if (data[match] || data[match] === 0) {
                return data[match]
            }
        });
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


;(function () {
    Datepicker.region = {
        'ru': {
            days: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
        }
    }
})();

;(function () {
    var template = '' +
        '<div class="datepicker--nav-action">#{prevHtml}</div>' +
        '<div class="datepicker--nav-title">#{title}</div>' +
        '<div class="datepicker--nav-action">#{nextHtml}</div>';

    Datepicker.Navigation = function (d, opts) {
        this.d = d;
        this.opts = opts;

        this.init();
    };

    Datepicker.Navigation.prototype = {
        init: function () {
            this._buildBaseHtml();
        },
        
        _buildBaseHtml: function () {
            var title = this._getTitle(this.d.currentDate);
                html = Datepicker.template(template, $.extend({title: title}, this.opts));

            this.d.$nav.html(html);
        },

        _getTitle: function (date) {
            var month = this.d.loc.months[date.getUTCMonth()],
                year = date.getUTCFullYear();

            return month + ', ' + year;
        }
    }

})();

Datepicker.Cell = function () {

};
;(function () {
    var templates = {
        days:'' +
        '<div class="datepicker--days">' +
        '<div class="datepicker--days-names"></div>' +
        '<div class="datepicker--cells datepicker--cells-days"></div>' +
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
            this._render();
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

                remainingDays = 6 - lastMonthDay + this.opts.firstDay,
                startDayIndex = this.opts.firstDay - (firstMonthDay - 1), // Minus one, because of zero based counter

                m, y,
                html = '';

            for (var i = startDayIndex, max = totalMonthDays + remainingDays; i <= max; i++) {
                y = date.getFullYear();
                m = date.getMonth();

                html += this._getDayHtml(new Date(y, m, i))
            }

            return html;
        },

        _getDayHtml: function (date) {
            var _class = "datepicker--cell datepicker--cell-day";

            if (this.d.isWeekend(date.getDay())) _class += " -weekend-";
            if (date.getMonth() != this.d.currentDate.getMonth()) _class += " -another-month-";

            return '<div class="' + _class + '">' + date.getDate() + '</div>';
        },

        _renderDays: function () {
            var dayNames = this._getDayNamesHtml(this.opts.firstDay),
                days = this._getDaysHtml(this.d.currentDate);

            this.$cells.html(days);
            this.$names.html(dayNames)
        },

        _render: function () {
            this._buildBaseHtml();
            this._renderDays();
        }
    };
})();
