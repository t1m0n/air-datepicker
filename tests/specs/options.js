var assert = chai.assert,
    expect = chai.expect,
    $input, dp;


describe('Options', function () {
    before(function () {
        $input = $('<input>').appendTo('#container');
    });

    afterEach(function () {
        if (dp) {
            dp.$datepicker.remove();
            dp = '';
            $input.data('datepicker', '')
        }
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
    })

});
