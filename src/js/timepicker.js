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
        '   <input type="text" value="#{hourValue}" placeholder="#{hourValue}" data-field="hours" name="hours-current" maxlength="2" data-max="#{hourMax}" data-action="next"/>' +
        '   <span>:</span>' +
        '   <input type="text" value="#{minValue}" placeholder="#{minValue}" data-field="minutes" name="minutes-current" maxlength="2" data-max="59" data-action="prev"/>' +
        '</div>' +
        '</div>',
        inputTimeout = 10;

    datepicker.Timepicker = function (inst, opts) {
        this.d = inst;
        this.opts = opts;

        var date = this.d.parsedDate;
        this.minutes = date.minutes;
        this.hours = date.hours;
        this._minutes = date.minutes;
        this._hours = date.hours;

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
            this.$currentInputs.on('mouseup', this._onMouseUpInput.bind(this));
            this.$currentInputs.on('keydown', this._onKeyPressInput.bind(this));
            this.$currentInputs.on('input', this._onInputInput.bind(this));
            this.$currentInputs.on('blur', this._onBlurInput.bind(this));
            this.$currentInputs.on('paste', this._onPasteInput.bind(this));
        },

        _buildHTML: function () {
            var date = this.d.parsedDate,
                data = {
                    hourMin: '00',
                    hourMax: '23',
                    hourStep: '1',
                    hourValue: date.fullHours,
                    hourLabel: 'Часы',
                    minMin: '00',
                    minMax: '59',
                    minStep: '1',
                    minValue: date.fullMinutes,
                    minLabel: 'Минуты'
                },
                _template = datepicker.template(template, data);

            this.$timepicker = $(_template).appendTo(this.d.$datepicker);
            this.$ranges = $('[type="range"]', this.$timepicker);
            this.$currentTime = $('.datepicker--time-current', this.$timepicker);
            this.$currentInputs = $('input[type="text"]', this.$timepicker);
            this.$hoursText = $('[name="hours-current"]', this.$timepicker);
            this.$minutesText = $('[name="minutes-current"]', this.$timepicker);
        },

        _render: function () {

        },

        _updateTime: function () {
            var h = this.hours < 10 ? '0'+this.hours : this.hours,
                m = this.minutes < 10 ? '0' + this.minutes : this.minutes,
                html =  h + ':' + m;

            this.$hoursText.val(h);
            this.$minutesText.val(m)
        },

        _onChangeRange: function (e) {
            var $target = $(e.target),
                value = $target.val(),
                name = $target.attr('name');

            this[name] = value;
            this._updateTime();
            this.d._trigger('timeChange', [this.hours, this.minutes])
        },

        _onMouseUpInput: function (e) {
            e.originalEvent.inFocus = true;
            e.originalEvent.timepickerFocus = true;
        },

        _onKeyPressInput: function (e) {
            var $el = $(e.target),
                field = $el.data('field'),
                max = $el.data('max'),
                _this = this,
                charCode = e.which,
                action = $el.data('action'),
                parsedVal,
                initialValue = $el.val(),
                val = $el.val();

            setTimeout(function () {
                val = $el.val();
                parsedVal = parseInt(val);

                if (parsedVal > max) {
                    $el.val(initialValue);
                    return;
                }

                if (val.length == 2) {
                    if (action == 'next' && charCode >= 48 && charCode <= 57) {
                        _this.$minutesText.focus().select();
                    }
                }

                if (!val.length) {
                    if (action == 'prev' && charCode == 8) {
                        _this.$hoursText.focus();

                        _this.$hoursText[0].selectionStart = 2;
                        _this.$hoursText[0].selectionEnd = 2;
                    }
                }


            }, inputTimeout);

            return charCode >= 48 && charCode <= 57
            || (charCode >= 37 && charCode <= 40)
            || (charCode >= 96 && charCode <= 105)
            || charCode == 17
            || charCode == 13
            || charCode == 46
            || charCode == 8
            || charCode == 9;
        },

        _onInputInput: function (e) {
            var $el = $(e.target),
                _this = this,
                field = $el.data('field'),
                max = $el.data('max'),
                val = parseInt($el.val());

            setTimeout(function () {
                val = parseInt($el.val());

                if (val > max) {
                    val = max;
                    $el.val(val);
                } else if (!val) {
                    val = _this['_' + field]
                }

                _this[field] = val;
                $('[name="' + field + '"]').val(val);
                _this.d._trigger('timeChange',[_this.hours, _this.minutes])
            }, inputTimeout)
        },

        _onBlurInput: function (e) {
            var $el = $(e.target),
                val = $el.val();

            if (val.length == 1) {
                val = '0' + val;
                $el.val(val);
            }
        },

        _onPasteInput: function (e) {
            var $el = $(e.target),
                val = $el.val(),
                _this = this;

            setTimeout(function () {
                val = $el.val().replace(/\D/gi, '');
                $el.val(val);
            }, inputTimeout)
        }
    };
})(window, jQuery, Datepicker);
