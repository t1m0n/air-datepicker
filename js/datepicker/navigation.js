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
