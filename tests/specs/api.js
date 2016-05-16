describe('API', function () {

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

    describe('selectDate', function () {
        it('should select passed date', function () {
            dp = $input.datepicker().data('datepicker');

            var date = new Date();
            
            dp.selectDate(date);

            expect(dp.selectedDates).to.have.length(1);
            expect(dp.selectedDates[0]).to.be.equal(date)
        });
        it('should select multiple dates if {multipleDates: true}', function () {
            dp = $input.datepicker({
                multipleDates: true
            }).data('datepicker');

            var date = new Date(2016, 4, 16),
                date2 = new Date(2016, 4, 18);

            dp.selectDate(date);
            dp.selectDate(date2);

            expect(dp.selectedDates).to.have.length(2);
        });
        it('should swap dates if {range: true} and second date is smaller then first', function () {
            dp = $input.datepicker({
                range: true
            }).data('datepicker');

            var date = new Date(2016, 4, 18),
                date2 = new Date(2016, 4, 16);

            dp.selectDate(date);
            dp.selectDate(date2);

            expect(dp.selectedDates[0]).to.be.equal(date2);
        })
    });
});
