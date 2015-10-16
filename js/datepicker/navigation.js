;(function () {
    var template = '' +
        '<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div>' +
        '<div class="datepicker--nav-title">#{title}</div>' +
        '<div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>';

    Datepicker.Navigation = function (d, opts) {
        this.d = d;
        this.opts = opts;

        this.init();
    };

    Datepicker.Navigation.prototype = {
        init: function () {
            this._buildBaseHtml();
            this._bindEvents();
        },

        _bindEvents: function () {
            this.d.$nav.on('click', '.datepicker--nav-action', $.proxy(this._onClickNavButton, this));
            this.d.$nav.on('click', '.datepicker--nav-title', $.proxy(this._onClickNavTitle, this));
        },

        _buildBaseHtml: function () {
            this._render();
            this.$navButton = $('.datepicker--nav-action', this.d.$nav);
        },

        _render: function () {
            var title = this._getTitle(this.d.currentDate),
                html = Datepicker.template(template, $.extend({title: title}, this.opts));

            this.d.$nav.html(html);
        },

        _getTitle: function (date) {
            var month = this.d.loc.months[date.getMonth()],
                year = date.getFullYear(),
                types = {
                    days: month + ', ' + year,
                    months: year
                };

            return types[this.d.view];
        },

        _onClickNavButton: function (e) {
            var $el = $(e.target),
                action = $el.data('action');

            this.d[action]();
        },

        _onClickNavTitle: function () {
            if (this.d.view == 'days') {
                return this.d.view = 'months'
            }

            this.d.view = 'years';
        }
    }

})();
