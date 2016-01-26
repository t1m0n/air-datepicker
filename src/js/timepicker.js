(function (window, $, datepicker) {
    var template = '<div class="datepicker--time">' +
        '<div class="datepicker--time-current">#{hourValue}:#{minValue}</div>' +
        '<label class="datepicker--time-label">#{hourLabel}</label>' +
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
            this.$currentTime = $('.datepicker--time-current', this.$timepicker);
        },

        _render: function () {

        },

        _updateTime: function () {
            var h = this.hours < 10 ? '0'+this.hours : this.hours,
                m = this.minutes < 10 ? '0' + this.minutes : this.minutes,
                html =  h + ':' + m;
            this.$currentTime.html(html);
        },

        _onChangeRange: function (e) {
            var $target = $(e.target),
                value = $target.val(),
                name = $target.attr('name');

            this[name] = value;
            this._updateTime();
            this.d._trigger('timeChange', [this.hours, this.minutes])
        }
    };
})(window, jQuery, Datepicker);
