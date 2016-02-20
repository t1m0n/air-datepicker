(function (window, $, datepicker) {
    //TODO включить время в минимальную и максимальную дату
    //TODO возможность задания минимальных и максимальных минут/часов
    //TODO возможность задания шага для часов минут
    //TODO возоможность задавать определенные часы и минуты

    var template = '<div class="datepicker--time">' +
        '<div class="datepicker--time-sliders">' +
        '   <label class="datepicker--time-label">#{hourLabel}</label>' +
        '   <div class="datepicker--time-row">' +
        '      <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>' +
        '   </div>' +
        '   <label class="datepicker--time-label">#{minLabel}</label>' +
        '   <div class="datepicker--time-row">' +
        '      <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>' +
        '   </div>' +
        '</div>' +
        '<div class="datepicker--time-current">' +
        '   <i class="datepicker--time-icon"></i>' +
        '   <span data-max="#{hourMax}" class="datepicker--time-current-hours">#{hourValue}</span>' +
        '   <span class="datepicker--time-current-colon">:</span>' +
        '   <span data-max="#{hourMax}" class="datepicker--time-current-minutes">#{minValue}</span>' +
        '</div>' +
        '</div>',
        inputTimeout = 10;

    datepicker.Timepicker = function (inst, opts) {
        this.d = inst;
        this.opts = opts;

        this.init();
    };

    datepicker.Timepicker.prototype = {
        init: function () {
            var input = 'input';
            this._setValidTimes(this.d.date);
            this._buildHTML();

            if (navigator.userAgent.match(/trident/gi)) {
                input = 'change';
            }

            this.$ranges.on(input, this._onChangeRange.bind(this));
        },

        _setValidTimes: function (date) {
            var _date = datepicker.getParsedDate(date),
                maxHours = 23;

            this.minHours = this.opts.minHours;
            this.minMinutes = this.opts.minMinutes;
            this.maxHours = this.opts.maxHours > maxHours ? maxHours : this.opts.maxHours;
            this.maxMinutes = this.opts.maxMinutes > 59 ? 59 : this.opts.maxMinutes;
            this.hours = _date.hours < this.minHours ? this.minHours : _date.hours;
            this.minutes = _date.minutes < this.minMinutes ? this.minMinutes : _date.minutes;
        },

        _buildHTML: function () {
            var lz = datepicker.getLeadingZeroNum,
                data = {
                    hourMin: this.minHours,
                    hourMax: lz(this.maxHours),
                    hourStep: this.opts.hoursStep,
                    hourValue: lz(this.hours),
                    minMin: this.minMinutes,
                    minMax: lz(this.maxMinutes),
                    minStep: this.opts.minutesStep,
                    minValue: lz(this.minutes)
                },
                _template = datepicker.template(template, data);

            this.$timepicker = $(_template).appendTo(this.d.$datepicker);
            this.$ranges = $('[type="range"]', this.$timepicker);
            this.$currentInputs = $('input[type="text"]', this.$timepicker);
            this.$hoursText = $('.datepicker--time-current-hours', this.$timepicker);
            this.$minutesText = $('.datepicker--time-current-minutes', this.$timepicker);
        },

        _render: function () {

        },

        _updateTime: function () {
            var h = this.hours < 10 ? '0'+this.hours : this.hours,
                m = this.minutes < 10 ? '0' + this.minutes : this.minutes;

            this.$hoursText.html(h);
            this.$minutesText.html(m)
        },


        //  Events
        // -------------------------------------------------

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
