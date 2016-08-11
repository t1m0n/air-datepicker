describe('Events', function () {
var assert = chai.assert,
    expect = chai.expect,
    destroy = true,
    $span,
    $altInput,
    $input, dp;

    before(function () {
        $input = $('<input>').appendTo('#container');
        $span = $('<span>').appendTo('#container');
        $altInput = $('<input class="alt-field">').appendTo('#container');
    });

    afterEach(function () {
        if (dp && destroy) {
            dp.destroy();
            dp = '';
        }

        destroy = true;
    });

    after(function () {
        $input.remove();
        $span.remove();
        $altInput.remove();
    });

    describe('onSelect', function () {
        it('should add callback when user selects date', function () {
            var date = new Date(2016,0,13);

            dp = $input.datepicker({
                onSelect: function (fd, d, inst) {
                    expect(fd).to.be.equal('13.01.2016');
                    expect(d).to.be.instanceof(Date);
                    expect(inst).to.be.instanceof($.fn.datepicker.Constructor);
                }
            }).data('datepicker');

            dp.selectDate(date);

        });

        it('should receive array of dates when "multipleDates" set to true', function () {
            var date = new Date(2016,0,22),
                date2 = new Date(2016,0,23),
                dates = [];

            dp = $input.datepicker({
                multipleDates: true,
                onSelect: function (fd, d, inst) {
                    dates = d;
                }
            }).data('datepicker');

            dp.selectDate(date);
            dp.selectDate(date2);

            expect(dates).to.have.length(2)

        })
        it('should receive array of dates when "range" set to true', function () {
            var date = new Date(2016,0,22),
                date2 = new Date(2016,0,23),
                dates = [];

            dp = $input.datepicker({
                range: true,
                onSelect: function (fd, d, inst) {
                    dates = d;
                }
            }).data('datepicker');

            dp.selectDate(date);
            dp.selectDate(date2);

            expect(dates).to.have.length(2)
        })
    });
    
    describe('onShow', function () {
        it('should add callback when datepicker is showing', function () {
            var test = '';
            dp = $input.datepicker({
                onShow: function (dp, completed) {
                    if (!completed) {
                        test = dp;
                    }
                }
            }).data('datepicker');

            dp.show();
            expect(test).to.be.equal(dp);
        })
    });

    describe('onHide', function () {
        it('should add callback when datepicker is hiding (after transition completed)', function () {
            var test = '';
            dp = $input.datepicker({
                onHide: function (dp, completed) {
                    if (!completed) {
                        test = dp;
                    }
                }
            }).data('datepicker');

            dp.show();
            dp.hide();
            expect(test).to.be.equal(dp);
        });
    });

    describe('onRenderCell', function () {
        it('should add callback when cell is rendered', function () {
            dp = $input.datepicker({
                onRenderCell: function (d, type) {
                    expect(d).to.be.instanceOf(Date);
                    expect(type).to.be.equal('day');
                }
            }).data('datepicker');
        })
    });

    describe('onChangeView', function () {
        it('should add callback when view is changed', function () {
            var _view;

            dp = $input.datepicker({
                onChangeView: function (view) {
                    _view = view;
                }
            }).data('datepicker');

            dp.view = 'months';
            expect(_view).to.be.equal('months')
        })
    });

    describe('onChangeMonth', function () {
        it('should add callback when month is changed', function () {
            var _month, _year;

            dp = $input.datepicker({
                startDate: new Date(2016, 0, 22),
                onChangeMonth: function (month, year) {
                    _month = month;
                    _year = year;
                }
            }).data('datepicker');

            $('.datepicker--nav-action[data-action="next"]',dp.$datepicker).click();

            expect(_month).to.be.equal(1);
            expect(_year).to.be.equal(2016)
        })
    });

    describe('onChangeYear', function () {
        it('should add callback when year is changed', function () {
            var _year;

            dp = $input.datepicker({
                startDate: new Date(2016, 0, 22),
                view: 'months',
                onChangeYear: function (year) {
                    _year = year;
                }
            }).data('datepicker');

            $('.datepicker--nav-action[data-action="next"]',dp.$datepicker).click();

            expect(_year).to.be.equal(2017)
        })
    });

    describe('onChangeDecade', function () {
        it('should add callback when decade is changed', function () {
            var _decade;

            dp = $input.datepicker({
                startDate: new Date(2016, 0, 22),
                view: 'years',
                onChangeDecade: function (decade) {
                    _decade = decade;
                }
            }).data('datepicker');

            $('.datepicker--nav-action[data-action="next"]',dp.$datepicker).click();

            expect(_decade).to.have.length(2);
            expect(_decade[0]).to.be.equal(2020);
            expect(_decade[1]).to.be.equal(2029);
        })
    });

});
