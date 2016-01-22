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
        }

        destroy = true;
    });

    describe('onSelect', function () {
        it('should add callback when user selects date', function () {
            var date = new Date(2016,0,13);

            dp = $input.datepicker({
                onSelect: function (fd, d, inst) {
                    expect(fd).to.be.equal('13.01.2016');
                    expect(d).to.be.instanceof(Date);
                    expect(inst).to.be.instanceof(Datepicker);
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

});
