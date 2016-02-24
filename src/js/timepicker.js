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
            this._setInitialTime(this.d.date);
            this._buildHTML();

            if (navigator.userAgent.match(/trident/gi)) {
                input = 'change';
            }

            this.d.$el.on('selectDate', this._onSelectDate.bind(this));
            this.$ranges.on(input, this._onChangeRange.bind(this));
        },

        _setInitialTime: function (date, parse) {
            var _date = datepicker.getParsedDate(date);

            this._handleDate(date);
            this.hours = _date.hours < this.minHours ? this.minHours : _date.hours;
            this.minutes = _date.minutes < this.minMinutes ? this.minMinutes : _date.minutes;
        },

        _setMinTimeFromDate: function (date) {
            this.minHours = date.getHours();
            this.minMinutes = date.getMinutes();
        },

        _setMaxTimeFromDate: function (date) {
            this.maxHours = date.getHours();
            this.maxMinutes = date.getMinutes();
        },

        _setDefaultMinMaxTime: function () {
            var maxHours = 23;

            this.minHours = this.opts.minHours;
            this.minMinutes = this.opts.minMinutes;
            this.maxHours = this.opts.maxHours > maxHours ? maxHours : this.opts.maxHours;
            this.maxMinutes = this.opts.maxMinutes > 59 ? 59 : this.opts.maxMinutes;
        },

        /**
         * Looks for min/max hours/minutes and if current values
         * are out of range sets valid values.
         * @private
         */
        _validateHoursMinutes: function () {
            if (this.hours < this.minHours) {
                this.hours = this.minHours;
            } else if (this.hours > this.maxHours) {
                this.hours = this.maxHours;
            }

            if (this.minutes < this.minMinutes) {
                this.minutes = this.minMinutes;
            } else if (this.minutes > this.maxMinutes) {
                this.minutes = this.maxMinutes;
            }
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
            this.$hours = $('[name="hours"]', this.$timepicker);
            this.$minutes = $('[name="minutes"]', this.$timepicker);
            this.$hoursText = $('.datepicker--time-current-hours', this.$timepicker);
            this.$minutesText = $('.datepicker--time-current-minutes', this.$timepicker);
        },

        _render: function () {

        },

        _updateCurrentTime: function () {
            var h = this.hours < 10 ? '0' + this.hours : this.hours,
                m = this.minutes < 10 ? '0' + this.minutes : this.minutes;

            this.$hoursText.html(h);
            this.$minutesText.html(m)
        },

        _updateRanges: function () {
            this.$hours.attr({
                min: this.minHours,
                max: this.maxHours,
                value: this.hours
            }).change();

            this.$minutes.attr({
                min: this.minMinutes,
                max: this.maxMinutes,
                value: this.minutes
            }).change();
        },

        _handleDate: function (date) {
            if (datepicker.isSame(date, this.d.opts.minDate)) {
                this._setMinTimeFromDate(this.d.opts.minDate);
            } else if (datepicker.isSame(date, this.d.opts.maxDate)) {
                this._setMaxTimeFromDate(this.d.opts.maxDate);
            } else {
                this._setDefaultMinMaxTime();
            }

            this._validateHoursMinutes();
        },


        //  Events
        // -------------------------------------------------

        _onChangeRange: function (e) {
            var $target = $(e.target),
                name = $target.attr('name');

            this[name] = $target.val();
            this._updateCurrentTime();
            this.d._trigger('timeChange', [this.hours, this.minutes])
        },

        _onSelectDate: function (e, data) {
            this._handleDate(data);
            this._updateRanges();
            this._updateCurrentTime();
        }

    };
})(window, jQuery, Datepicker);
