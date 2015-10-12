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

