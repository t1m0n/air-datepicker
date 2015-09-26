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
