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

        _buildBaseHtml: function () {
            this.$el = $(templates[this.type]).appendTo(this.d.$content);
            this.$names = $('.datepicker--days--names', this.$el);
            this.$cells = $('.datepicker--days--cells', this.$el);
        },

        _getDayNamesHtml: function (firstDay, curDay, html, i) {
            curDay = curDay != undefined ? curDay : firstDay;
            html = html ? html : '';
            i = i != undefined ? i : 0;

            if (i > 7) return html;
            if (curDay == 7) return this._getDayNamesHtml(firstDay, 0, html, ++i);

            html += '<div class="datepicker--days--name' + (i >= 5 ? " -weekend-" : "") + '">' + this.d.loc.days[curDay] + '</div>';

            return this._getDayNamesHtml(firstDay, ++curDay, html, ++i);
        },

        _renderDays: function () {
            var count = Datepicker.getDaysCount(this.viewDate),
                dayNames = this._getDayNamesHtml(this.opts.firstDay),
                firstDayIndex = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1).getDay();

            this.$names.html(dayNames)
        },

        _render: function () {
            this._buildBaseHtml();
            this._renderDays();
        }
    };
})();
