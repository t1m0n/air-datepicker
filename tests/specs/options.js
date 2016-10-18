describe('Options', function () {

    var assert = chai.assert,
        expect = chai.expect,
        destroy = true,
        $altInput,
        $input, dp;

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

    after(function () {
        $input.remove();
        $altInput.remove();
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

            expect(dp.loc.days).to.eql($.fn.datepicker.language.en.days);
        });
        it('should change language to custom if object is passed', function () {
            var daysMin = ['В','П','В','С','Ч','П','С'];
            dp = $input.datepicker({
                language: {
                    daysMin: daysMin
                }
            }).data('datepicker');

            expect(dp.loc.daysMin).to.eql(daysMin);
            expect(dp.loc.days).to.eql($.fn.datepicker.language.ru.days);
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
        var date = new Date(2015, 6, 4, 11, 5),
            formats = {
                '@': date.getTime(),
                'aa': 'am',
                'AA': 'AM',
                'h': 11,
                'hh': 11,
                'i': 5,
                'ii': '05',
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

        it('should work with special characters', function () {
            dp = $input.datepicker({
                language: 'de',
                dateFormat: 'Month is MM'
            }).data('datepicker');
            dp.selectDate(new Date(2016, 2, 1));
            expect(dp.$el.val()).to.be.equal('Month is März');
        })
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
        });
        
        it('should support 24 hour mode, even if main date format is in 12', function () {
            var date = new Date(2015, 11, 17, 22, 47);

            dp = $input.datepicker({
                timepicker: true,
                timeFormat: 'hh:ii aa',
                altField: '.alt-field',
                altFieldDateFormat: 'dd-mm-yyyy hh:ii'
            }).data('datepicker');

            dp.selectDate(date);

            assert.equal(dp.$altField.val(), '17-12-2015 22:47');
        });

        it('should support 12 hour mode', function () {
            var date = new Date(2015, 11, 17, 22, 47);

            dp = $input.datepicker({
                timepicker: true,
                timeFormat: 'hh:ii',
                altField: '.alt-field',
                altFieldDateFormat: 'dd-mm-yyyy hh:ii aa'
            }).data('datepicker');

            dp.selectDate(date);

            assert.equal(dp.$altField.val(), '17-12-2015 10:47 pm');
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
    });

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
    });

    describe('offset', function () {
        var iDims, dpDims,
            offset;

        var i = 0;
        while(i < 5) {
            offset = Math.round(Math.random() * 50);
            
            (function (offset) {
                it('should set offset ' + offset + ' from main axis', function () {
                    dp = $input.datepicker({
                        offset: offset
                    }).data('datepicker');
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

                    assert.equal(iDims.top + iDims.height + offset, dpDims.top);
                });
            })(offset);
            
            i++;
        }
    });

    describe('view', function () {
        it('should set initial datepicker view to `months`', function () {
            dp = $input.datepicker({view: 'months'}).data('datepicker');
            assert.equal('months', dp.view)
        });
        it('should set initial datepicker view to `years`', function () {
            dp = $input.datepicker({view: 'years'}).data('datepicker');
            assert.equal('years', dp.view)
        })
    });

    describe('minView', function () {
        it('should set minimum possible view', function () {
            dp = $input.datepicker({
                view: 'months',
                minView: 'months'
            }).data('datepicker');

            $('.datepicker--cell-month', dp.$datepicker).eq(0).click();
            assert.equal('months', dp.view)
        });

    });

    describe('showOtherMonths', function () {
        var date = new Date(2015, 11, 22);

        it('if `true` should show days from other months', function () {
            dp = $input.datepicker().data('datepicker');
            dp.date = date;

            var $cell = $('.datepicker--cell-day.-other-month-', dp.$datepicker).eq(0);

            assert($cell.text(), 'must have text')
        });

        it('if `false` should hide days from other months', function () {
            dp = $input.datepicker({showOtherMonths: false}).data('datepicker');
            dp.date = date;

            var $cell = $('.datepicker--cell-day.-other-month-', dp.$datepicker).eq(0);

            expect($cell.text()).to.be.empty;
        });

    });

    describe('selectOtherMonths', function () {
        var date = new Date(2015, 11, 22);

        it('if `true` you can select cells from other months', function () {
            dp = $input.datepicker().data('datepicker');
            dp.date = date;

            var $cell = $('.datepicker--cell-day.-other-month-', dp.$datepicker).eq(0);
            $cell.click();
            expect(dp.selectedDates).to.have.length(1)
        });

        it('if `false` you can not select cells from other months ', function () {
            dp = $input.datepicker({selectOtherMonths: false}).data('datepicker');
            dp.date = date;

            var $cell = $('.datepicker--cell-day.-other-month-', dp.$datepicker).eq(0);
            $cell.click();
            expect(dp.selectedDates).to.have.length(0)
        });

    });

    describe('moveToOtherMonthsOnSelect', function () {
        var date = new Date(2015, 11, 22);

        it('if `true` datepicker will translate to other month if date from other month is selected', function () {
            dp = $input.datepicker().data('datepicker');
            dp.date = date;

            var $cell = $('.datepicker--cell-day.-other-month-', dp.$datepicker).eq(0);
            $cell.click();

            assert.equal(dp.date.getMonth(), 10)

        });

        it('if `false` datepicker will stay on same month when selecting dates from other month', function () {
            dp = $input.datepicker({moveToOtherMonthsOnSelect: false}).data('datepicker');
            dp.date = date;

            var $cell = $('.datepicker--cell-day.-other-month-', dp.$datepicker).eq(0);
            $cell.click();

            assert.equal(dp.date.getMonth(), 11)
        });

    });

    describe('showOtherYears', function () {
        var date = new Date(2015, 11, 22);
        it('if `true` should show years from other decades', function () {
            dp = $input.datepicker({
                view: 'years'
            }).data('datepicker');
            dp.date = date;

            var $cell = $('.datepicker--cell-year.-other-decade-', dp.$datepicker).eq(0);

            assert($cell.text(), 'must have text')
        });

        it('if `false` should hide years from other decades', function () {
            destroy = false;
            dp = $input.datepicker({
                view: 'years',
                showOtherYears: false
            }).data('datepicker');
            dp.date = date;

            var $cell = $('.datepicker--cell-year.-other-decade-', dp.$datepicker).eq(0);

            expect($cell.text()).to.be.empty;
        });

    });

    describe('selectOtherYears', function () {
        var date = new Date(2015, 11, 22);

        it('if `true` you can select cells from other decades', function () {
            dp = $input.datepicker({
                view: 'years',
                minView: 'years',
                selectOtherYears: true
            }).data('datepicker');
            dp.date = date;

            var $cell = $('.datepicker--cell-year.-other-decade-', dp.$datepicker).eq(0);
            $cell.click();
            expect(dp.selectedDates).to.have.length(1)
        });

        it('if `false` you can not select cells from other months ', function () {
            dp = $input.datepicker({
                view: 'years',
                minView: 'years',
                selectOtherYears: false
            }).data('datepicker');
            dp.date = date;

            var $cell = $('.datepicker--cell-year.-other-decade-', dp.$datepicker).eq(0);
            $cell.click();
            expect(dp.selectedDates).to.have.length(0)
        });

    });

    describe('moveToOtherYearsOnSelect', function () {
        var date = new Date(2015, 11, 22);

        it('if `true` datepicker will translate to other decade if date from other decade is selected', function () {
            dp = $input.datepicker({
                view: 'years',
                minView: 'years',
                moveToOtherYearsOnSelect: true
            }).data('datepicker');
            dp.date = date;

            var $cell = $('.datepicker--cell-year.-other-decade-', dp.$datepicker).eq(0);
            $cell.click();

            assert.equal(dp.date.getFullYear(), 2009)

        });

        it('if `false` datepicker will stay on same decade when selecting dates from other decade', function () {
            dp = $input.datepicker({
                view: 'years',
                minView: 'years',
                moveToOtherYearsOnSelect: false
            }).data('datepicker');
            dp.date = date;

            var $cell = $('.datepicker--cell-year.-other-decade-', dp.$datepicker).eq(0);
            $cell.click();

            assert.equal(dp.date.getFullYear(), 2015)
        });
    });

    describe('minDate', function () {
        it('should set minimum possible date to choose', function () {
            var date = new Date(2015, 11, 30);

            dp = $input.datepicker({
                minDate: date
            }).data('datepicker');

            dp.date = date;

            var $cell = $('.datepicker--cell-day[data-year="2015"][data-month="11"][data-date="30"]', dp.$datepicker);

            expect($cell.prev().attr('class')).to.have.string('-disabled-')
        })
    });

    describe('maxDate', function () {
        it('should set maximum possible date to choose', function () {
            var date = new Date(2015, 11, 30);

            dp = $input.datepicker({
                maxDate: date
            }).data('datepicker');

            dp.date = date;

            var $cell = $('.datepicker--cell-day[data-year="2015"][data-month="11"][data-date="30"]', dp.$datepicker);

            expect($cell.next().attr('class')).to.have.string('-disabled-')
        })
    });

    describe('disableNavWhenOutOfRange', function () {
        it('if `true` then navigation buttons will be disabled if there is no more possible dates to select to in next or prev month', function () {
            var date = new Date(2015, 11, 30);

            dp = $input.datepicker({
                minDate: date,
                inline: true
            }).data('datepicker');

            dp.date = date;

            var $prev = $('.datepicker--nav-action[data-action="prev"]', dp.$datepicker);

            expect($prev.attr('class')).to.have.string('-disabled-')
        })
    });

    describe('multipleDates', function () {
        it('if `true` then one can select multiple dates', function () {
            dp = $input.datepicker({
                multipleDates: true
            }).data('datepicker');

            dp.selectDate(new Date(2016, 0, 7));
            dp.selectDate(new Date(2016, 0, 8));
            dp.selectDate(new Date(2016, 0, 9));

            expect(dp.selectedDates).to.have.length(3)
        });

        it('if `number` should limit length of selected dates by its value', function () {
            dp = $input.datepicker({
                multipleDates: 3
            }).data('datepicker');

            dp.selectDate(new Date(2016, 0, 7));
            dp.selectDate(new Date(2016, 0, 8));
            dp.selectDate(new Date(2016, 0, 9));
            dp.selectDate(new Date(2016, 0, 10));
            dp.selectDate(new Date(2016, 0, 11));

            expect(dp.selectedDates).to.have.length(3)
        })
    });

    describe('multipleDatesSeparator', function () {
        it('defines multiple dates separator sign', function () {
            dp = $input.datepicker({
                multipleDates: true,
                multipleDatesSeparator: ' separator '
            }).data('datepicker');

            dp.selectDate(new Date(2016, 0, 12));
            dp.selectDate(new Date(2016, 0, 13))

            expect($input.val()).to.have.string(' separator ')
        })
    });

    describe('todayButton', function () {
        it('should add "today" button if true', function () {

            dp = $input.datepicker({
                todayButton: true
            }).data('datepicker');

            var $button = $('.datepicker--button', dp.$datepicker);

            expect($button.length).to.be.equal(1);
            expect($button.data('action')).to.be.equal('today');

        })
    });

    describe('clearButton', function () {
        it('should add "clear" button if true', function () {

            dp = $input.datepicker({
                clearButton: true
            }).data('datepicker');

            var $button = $('.datepicker--button', dp.$datepicker);

            expect($button.length).to.be.equal(1);
            expect($button.data('action')).to.be.equal('clear');

        })
    });

    describe('showEvent', function () {
        it('should define event type on which datepicker will be shown', function () {
            dp = $input.datepicker({
                showEvent: 'click'
            }).data('datepicker');

            $input.click();

            expect(dp.visible).to.be.equal(true)

        })
    });


    describe('autoClose', function () {
        it('if true, when datepicker will close after date was selected', function () {
            dp = $input.datepicker({
                autoClose: true
            }).data('datepicker');

            dp.show();
            dp.selectDate(new Date());

            expect(dp.visible).to.be.equal(false)

        });

        it('if false, when datepicker will not close after date was selected', function () {
            dp = $input.datepicker({
                autoClose: false
            }).data('datepicker');

            dp.show();
            dp.selectDate(new Date());

            expect(dp.visible).to.be.equal(true)

        })
    });

    describe('monthsField', function () {
        it('defines which field from localization must be used as source for months name in "months view"', function () {
            dp = $input.datepicker({
                monthsField: 'months',
                view: 'months'
            }).data('datepicker');

            var $cell = $('.datepicker--cell-month').eq(0);

            expect($cell.text()).to.be.equal('Январь');
        });
    });

    describe('prevHtml', function () {
        it('defines html which should be used in "previous" button', function () {
            dp = $input.datepicker({
                prevHtml: 'previous'
            }).data('datepicker');

            var $prev = $('[data-action="prev"]', dp.$datepicker);

            expect($prev.html()).to.be.equal('previous');
        });
    });

    describe('nextHtml', function () {
        it('defines html which should be used in "next" button', function () {
            dp = $input.datepicker({
                nextHtml: 'next'
            }).data('datepicker');

            var $next = $('[data-action="next"]', dp.$datepicker);

            expect($next.html()).to.be.equal('next');
        });
    });

    describe('navTitles', function () {
        it('defines datepicker titles', function () {
            dp = $input.datepicker({
                navTitles: {
                    days: 'Days',
                    months: 'Months',
                    years: 'Years'
                }
            }).data('datepicker');

            var $title = $('.datepicker--nav-title', dp.$datepicker);
            expect($title.html()).to.have.string('Days');

            dp.view = 'months';
            $title = $('.datepicker--nav-title', dp.$datepicker);
            expect($title.html()).to.have.string('Months');

            dp.view = 'years';
            $title = $('.datepicker--nav-title', dp.$datepicker);
            expect($title.html()).to.have.string('Years');

        });
    });

    describe('timepicker', function () {
        it('should add timepicker to calendar', function () {
            dp = $input.datepicker({
                timepicker: true
            }).data('datepicker');

            var $time = $('.datepicker--time', dp.$datepicker);
            expect($time).to.have.length(1)

        })
    });

    describe('onlyTimepicker', function () {
        it('only timepicker should be visible', function () {
            dp = $input.datepicker({
                timepicker: true,
                onlyTimepicker: true
            }).data('datepicker');

            var $time = $('.datepicker--time', dp.$datepicker),
                $cells = $('.datepicker--cells', dp.$datepicker),
                $nav = $('.datepicker--nav-title', dp.$datepicker),
                _class = dp.$datepicker.hasClass('-only-timepicker-');

            expect($time).to.have.length(1);
            expect($cells).to.have.length(0);
            expect($nav).to.have.length(0);
            expect(_class).to.be.equal(true);

        })
    });

    describe('dateTimeSeparator', function () {
        it('should define separator between date string and time', function () {
            var date = new Date(2016,2,9,11,24);
            dp = $input.datepicker({
                timepicker: true,
                onSelect: function (fd, d) {
                    expect(fd).to.be.equal('09.03.2016 time separator 11:24')
                },
                dateTimeSeparator: ' time separator '
            }).data('datepicker');

            dp.selectDate(date);

        })
    });

    describe('timeFormat', function () {
        it('should define time format', function () {
            var date = new Date(2016,2,9,9,4);
            dp = $input.datepicker({
                timepicker: true,
                timeFormat: 'h - ii',
                onSelect: function (fd, d) {
                    expect(fd).to.be.equal('09.03.2016 9 - 04')
                }
            }).data('datepicker');

            dp.selectDate(date);
        })
    });

    describe('minHours', function () {
        it('should set minimum hours value', function () {
            var date = new Date();
            date.setHours(9);
            dp = $input.datepicker({
                timepicker: true,
                minHours: 10,
                onSelect: function (fd, d) {
                    var hours = d.getHours();
                    expect(hours).to.be.equal(10)
                }
            }).data('datepicker');
            dp.selectDate(date);
        })
    });

    describe('minMinutes', function () {
        it('should set minimum minutes value', function () {
            var date = new Date();
            date.setMinutes(20);
            dp = $input.datepicker({
                timepicker: true,
                minMinutes: 30,
                onSelect: function (fd, d) {
                    var minutes = d.getMinutes();
                    expect(minutes).to.be.equal(30)
                }
            }).data('datepicker');
            dp.selectDate(date);
        })
    });

    describe('maxHours', function () {
        it('should set maximum hours value', function () {
            var date = new Date();
            date.setHours(20);
            dp = $input.datepicker({
                timepicker: true,
                maxHours: 18,
                onSelect: function (fd, d) {
                    var hours = d.getHours();
                    expect(hours).to.be.equal(18)
                }
            }).data('datepicker');
            dp.selectDate(date);
        })
    });

    describe('maxMinutes', function () {
        it('should set maximum minutes value', function () {
            var date = new Date();
            date.setMinutes(50);
            dp = $input.datepicker({
                timepicker: true,
                maxMinutes: 30,
                onSelect: function (fd, d) {
                    var minutes = d.getMinutes();
                    expect(minutes).to.be.equal(30)
                }
            }).data('datepicker');
            dp.selectDate(date);
        })
    })
});
