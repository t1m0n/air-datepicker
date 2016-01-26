(function (window, $, datepicker) {
    var template = '<div class="datepicker--time">' +
    '   <label class="datepicker--time-label">#{hourLabel}</label>' +
        '<div class="datepicker--time-row">' +
        '   <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>' +
        '</div>' +
    '   <label class="datepicker--time-label">#{minLabel}</label>' +
        '<div class="datepicker--time-row">' +
        '   <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>' +
        '</div>' +
        '</div>';
    datepicker.Timepicker = function (inst, opts) {
        this.d = inst;
        this.opts = opts;

        var date = this.d.parsedDate;
        this.minutes = date.minutes;
        this.hours = date.hours;

        this.init();
    };

    datepicker.Timepicker.prototype = {
        init: function () {
            var input = 'input';
            this._buildHTML();

            if (navigator.userAgent.match(/trident/gi)) {
                input = 'change';
            }

            this.$ranges.on(input, this._onChangeRange.bind(this));
        },

        _buildHTML: function () {
            var date = this.d.parsedDate,
                data = {
                    hourMin: '00',
                    hourMax: '23',
                    hourStep: '1',
                    hourValue: date.hours,
                    hourLabel: 'Часы',
                    minMin: '00',
                    minMax: '59',
                    minStep: '1',
                    minValue: date.minutes,
                    minLabel: 'Минуты'
                },
                _template = datepicker.template(template, data);

            this.$timepicker = $(_template).appendTo(this.d.$datepicker);
            this.$ranges = $('[type="range"]', this.$timepicker);
        },

        _render: function () {
        },

        _onChangeRange: function (e) {
            var $target = $(e.target),
                value = $target.val(),
                name = $target.attr('name');

            this[name] = value;
            this.d._trigger('timeChange', [this.hours, this.minutes])
        }
    };
})(window, jQuery, Datepicker);
