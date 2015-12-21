var assert = chai.assert,
    expect = chai.expect,
    destroy = true,
    $altInput,
    $input, dp;


describe('Options', function () {
    before(function () {
        $input = $('<input>').appendTo('#container');
        $altInput = $('<input class="alt-field">').appendTo('#container');
    });

    afterEach(function () {
        if (dp && destroy) {
            dp.destroy();
        }

        destroy = true;
    });

    describe('classes', function () {
        it('should add extra classes to datepicker', function () {
            dp = $input.datepicker({
                classes: 'custom-class'
            }).data('datepicker');

            expect(dp.$datepicker.attr('class')).to.have.string('custom-class')

        })
    });

    describe('inline', function () {
        it('if true, should be always visible', function () {
            dp = $input.datepicker({
                inline: true
            }).data('datepicker');

            expect(dp.$datepicker.parent().attr('class')).to.have.string('datepicker-inline');
        });
        it('if false, should be hidden', function () {
            dp = $input.datepicker({
                inline: false
            }).data('datepicker');

            expect(dp.$datepicker.parent().attr('class')).to.have.string('datepickers-container');
        })
    });

    describe('language', function () {
        it('should change language to English if it `en`', function () {
            dp = $input.datepicker({
                language: 'en'
            }).data('datepicker');

            expect(dp.loc.days).to.eql(Datepicker.language.en.days);
        });
        it('should change language to custom if object is passed', function () {
            var daysMin = ['В','П','В','С','Ч','П','С'];
            dp = $input.datepicker({
                language: {
                    daysMin: daysMin
                }
            }).data('datepicker');

            expect(dp.loc.daysMin).to.eql(daysMin);
            expect(dp.loc.days).to.eql(Datepicker.language.ru.days);
        })
    });

    describe('startDate', function () {
        it('should change initial viewing date', function () {
            dp = $input.datepicker({
                startDate: new Date(2014,11,12)
            }).data('datepicker');

            expect(dp.$nav.text()).to.have.string('Декабрь');
            expect(dp.$nav.text()).to.have.string('2014');

        })
    });

    describe('firstDay', function () {
        it('should change first day of week', function () {
            dp = $input.datepicker({
                firstDay: 2
            }).data('datepicker');

            var firstCell = $('.datepicker--days-names .datepicker--day-name', dp.$datepicker).eq(0);

            assert.equal(firstCell.text(),'Вт')
        })
        it('should change first day of week to `Воскресенье` if it `0`', function () {
            dp = $input.datepicker({
                firstDay: 0
            }).data('datepicker');

            var firstCell = $('.datepicker--days-names .datepicker--day-name', dp.$datepicker).eq(0);

            assert.equal(firstCell.text(),'Вс')
        })
    });

    describe('weekends', function () {
        it('should change days, which should considered to be weekends', function () {
            dp = $input.datepicker({
                weekends: [0, 2],
                firstDay: 0
            }).data('datepicker');

            var $cells = $('.datepicker--cell-day', dp.$datepicker);

            expect($cells.eq(0).attr('class')).to.have.string('-weekend-')
            expect($cells.eq(2).attr('class')).to.have.string('-weekend-')
        })
    });

    describe('dateFormat', function () {
        var date = new Date(2015, 6, 4),
            formats = {
                '@': date.getTime(),
                'dd': '04',
                'd': 4,
                'DD': 'Суббота',
                'D': 'Суб',
                'mm': '07',
                'm': 7,
                'MM': 'Июль',
                'M': 'Июл',
                'yyyy' : 2015,
                'yy': 15,
                'yyyy1': 2010,
                'yyyy2': 2019

            };

        for (var format in formats) {
            (function (format) {
                it(format, function () {
                    dp = $input.datepicker({
                        dateFormat: 'Selected date: ' + format
                    }).data('datepicker');

                    dp.selectDate(date);
                    assert.equal(dp.$el.val(), 'Selected date: ' + formats[format]);
                })
            }(format))
        }
    });

    describe('altField', function () {
        it('should define `$altField` if selector or jQuery object is passed', function () {
            dp = $input.datepicker({
                altField: '.alt-field'
            }).data('datepicker');

            assert(dp.$altField.length);
        })
    })

    describe('altFieldFormat', function () {
        it('should define date format for alternative field', function () {
            var date = new Date(2015, 11, 17);

            dp = $input.datepicker({
                altField: '.alt-field',
                altFieldDateFormat: 'dd-mm-yyyy'
            }).data('datepicker');

            dp.selectDate(date);

            assert.equal(dp.$altField.val(), '17-12-2015');
        })
    });

    describe('toggleSelected', function () {
        it('when true, click on selected cells should remove selection', function () {
            var date = new Date(2015, 11, 17);

            dp = $input.datepicker().data('datepicker');

            dp.selectDate(date);
            dp._getCell(date, 'day').click();

            expect(dp.selectedDates).to.have.length(0)
        });

        it('when false, click on selected cell must do nothing', function () {
            var date = new Date(2015, 11, 17);

            dp = $input.datepicker({
                toggleSelected: false
            }).data('datepicker');

            dp.selectDate(date);
            dp._getCell(date, 'day').click();

            expect(dp.selectedDates).to.have.length(1)
        })
    })

    describe('keyboardNav', function () {
        var year = 2015,
            month = 10,
            day = 18,
            date = new Date(year, month, day),
            cases = [
                {
                    it: '→: should focus next cell',
                    keys: [39],
                    validDate: new Date(year, month, day + 1)
                },
                {
                    it: '←: should focus previous cell',
                    keys: [37],
                    validDate: new Date(year, month, day - 1)
                },
                {
                    it: '↑: should focus +7 day cell',
                    keys: [40],
                    validDate: new Date(year, month, day + 7)
                },
                {
                    it: '↓: should focus -7 day cell',
                    keys: [38],
                    validDate: new Date(year, month, day - 7)
                },
                {
                    it: 'Ctrl + →: should focus next month',
                    keys: [17, 39],
                    validDate: new Date(year, month + 1, day)
                },
                {
                    it: 'Ctrl + ←: should focus previous month',
                    keys: [17, 37],
                    validDate: new Date(year, month - 1, day)
                },
                {
                    it: 'Shift + →: should focus next year',
                    keys: [16, 39],
                    validDate: new Date(year + 1, month, day)
                },
                {
                    it: 'Shift + ←: should focus previous year',
                    keys: [16, 37],
                    validDate: new Date(year - 1, month, day)
                },
                {
                    it: 'Alt + →: should focus on +10 year cell',
                    keys: [18, 39],
                    validDate: new Date(year + 10, month, day)
                },
                {
                    it: 'Alt + ←: should focus on -10 year cell',
                    keys: [18, 37],
                    validDate: new Date(year - 10, month, day)
                },
                {
                    it: 'Ctrl + Shift + ↑: should change view to months',
                    keys: [16, 17, 38],
                    view: 'months'
                }
            ];

        cases.forEach(function (currentCase) {
            var keys = currentCase.keys,
                valid = currentCase.validDate;

            it(currentCase.it, function () {
                dp = $input.datepicker().data('datepicker');
                dp.selectDate(date);

                keys.forEach(function (key) {
                    $input.trigger($.Event('keydown', {which: key}));
                });

                var focused = dp.focused;


                if (currentCase.validDate) {
                    assert.equal(valid.getFullYear(), focused.getFullYear());
                    assert.equal(valid.getMonth(), focused.getMonth());
                    assert.equal(valid.getDate(), focused.getDate());
                }

                if (currentCase.view) {
                    assert.equal(currentCase.view, dp.view)
                }
            })

        });
    });

    describe('position', function () {
        var iDims, dpDims,
            offset;

        function prepare (position) {
            dp = $input.datepicker({position: position}).data('datepicker');
            $input.focus();

            iDims = {
                width: $input.outerWidth(),
                height: $input.outerHeight(),
                left: $input.offset().left,
                top: $input.offset().top
            };

            dpDims = {
                width: dp.$datepicker.outerWidth(),
                height: dp.$datepicker.outerHeight(),
                left: dp.$datepicker.offset().left,
                top: dp.$datepicker.offset().top
            };

            offset = dp.opts.offset;
        }

        it('should set `bottom left` position', function () {
            prepare('bottom left');

            assert.equal(iDims.top + iDims.height + offset, dpDims.top);
            assert.equal(iDims.left, dpDims.left);
        });
        it('should set `top right` position', function () {
            prepare('top right');

            assert.equal(iDims.top, dpDims.top + dpDims.height + offset);
            assert.equal(iDims.left + iDims.width, dpDims.left + dpDims.width);
        });
        it('should set `right bottom` position', function () {
            prepare('right bottom');

            assert.equal(iDims.left + iDims.width + offset, dpDims.left);
            assert.equal(iDims.top + iDims.height, dpDims.top + dpDims.height);
        });
        it('should set `left center` position', function () {
            prepare('left center');

            assert.equal(iDims.left - offset, dpDims.left + dpDims.width);
            assert.equal(iDims.top + iDims.height/2, dpDims.top + dpDims.height/2);
        });
        it('should set `bottom center` position', function () {
            prepare('bottom center');

            assert.equal(iDims.top + iDims.height + offset, dpDims.top);
            assert.equal(iDims.left + iDims.width/2, dpDims.left + dpDims.width/2);
        })
    })
});
