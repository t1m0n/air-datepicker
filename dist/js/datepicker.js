var Datepicker;

(function (window, $, undefined) {
    var pluginName = 'datepicker',
        $body, $datepickersContainer,
        baseTemplate = '' +
            '<div class="datepicker">' +
            '<header class="datepicker--header"></header>' +
            '<div class="datepicker--content"></div>' +
            '</div>',
        defaults = {
            inline: true,
            start: '',
            format: 'dd.mm.yyyy'
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

        if ($body == undefined) {
            $body = $('body');
        }

        this.init()
    };

    Datepicker.prototype = {
        containerBuilt: false,
        init: function () {
            this._buildBaseHtml();

            this.days = new Datepicker.Body(this, 'days', this.opts)

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
            this.$header = $('.datepicker--header', this.$datepicker);
        },

        _defineDOM: function () {

        }
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
Datepicker.Cell = function () {

};
;(function () {
    var templates = {
        days:'' +
        '<div class="datepicker--days">' +
        '<div class="datepicker--days--names"></div>' +
        '<div class="datepicker--days--cells"></div>' +
        '</div>'
    };

    Datepicker.Body = function (d, type, opts) {
        this.d = d;
        this.type = type;
        this.opts = opts;

        this.viewDate = opts.start;

        this.init();
    };

    Datepicker.Body.prototype = {
        init: function () {
            this._render();
        },

        _getCellsNumber: function () {
            var d = this.viewDate;

            return {
                days: new Date(d.getFullYear(), d.getMonth()+1, 0).getDate(),
                months: 12,
                years: 10
            }
        },

        _buildBaseHtml: function () {
            this.$el = $(templates[this.type]).appendTo(this.d.$content);
            this.$names = $('.datepicker--days--names', this.$el);
            this.$cells = $('.datepicker--days--cells', this.$el);
        },

        _render: function () {
            var cells = this._getCellsNumber();

            this._buildBaseHtml();
        }
    };
})();
