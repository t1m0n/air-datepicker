var assert = chai.assert,
    expect = chai.expect,
    plugin = $.fn.datepicker.Constructor;

describe('Datepicker', function () {
    describe('getDaysCount', function () {
        it('should return 31 days in December', function () {
            assert.equal(plugin.getDaysCount(new Date(2015, 11)), 31)
        });
        it('should return 30 days in September', function () {
            assert.equal(plugin.getDaysCount(new Date(2015, 8)), 30)
        });
        it('should return 28 days in February', function () {
            assert.equal(plugin.getDaysCount(new Date(2015, 1)), 28)
        })
    });

    describe('getParsedDate', function () {
        var currentDate = new Date(),
            date = plugin.getParsedDate(currentDate);

        it('should return object with detailed date fields', function () {
            expect(date).to.have.all.keys(['year','month','fullMonth','date', 'fullDate', 'day','hours', 'fullHours', 'minutes', 'fullMinutes']);
        });

        describe('.year', function () {
            it('`year` must be equal to current year', function () {
                assert.equal(currentDate.getFullYear(), date.year);
            })
        });
        describe('.month', function () {
            it('`month` must be equal to current month', function () {
                assert.equal(currentDate.getMonth(), date.month);
            })
        });
        describe('.fullMonth', function () {
            it('`fullMonth` must be equal to current month + 1 with leading zero', function () {
                assert.equal(currentDate.getMonth() < 10 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1 , date.fullMonth);
            })
        });
        describe('.date', function () {
            it('`date` must be equal to current date', function () {
                assert.equal(currentDate.getDate() , date.date);
            })
        });
        describe('.fullDate', function () {
            it('`fullDate` must be equal to current date with leading zero', function () {
                assert.equal(currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate() , date.fullDate);
            })
        });
        describe('.day', function () {
            it('`day` must be equal to current day', function () {
                assert.equal(currentDate.getDay(), date.day);
            })
        });
        describe('.hours', function () {
            it('`hours` must be equal to current hours', function () {
                assert.equal(currentDate.getHours(), date.hours);
            })
        });
        describe('.fullHours', function () {
            it('`fullHours` must be equal to current hours with leading zero', function () {
                assert.equal(currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours(), date.hours);
            })
        });
        describe('.minutes', function () {
            it('`minutes` must be equal to current minutes', function () {
                assert.equal(currentDate.getMinutes(), date.minutes);
            })
        });
        describe('.fullMinutes', function () {
            it('`fullMinutes` must be equal to current hours with leading zero', function () {
                assert.equal(currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes(), date.fullMinutes);
            })
        })
    });

    describe('getDecade', function () {
        it('should return array with first and last years in decade', function () {
            var decade = plugin.getDecade(new Date(2015, 1));

            expect(decade).to.be.an('array');
            assert.equal(decade[0], 2010)
            assert.equal(decade[1], 2019)
        })
    })

    describe('template', function () {
        it('should return string with replaced #{} signs', function () {
            var template = 'Hello #{who}';
            assert.equal(plugin.template(template, {who:'World!'}), 'Hello World!')
        })
    })

    describe('isSame', function () {
        var date1 = new Date(2015, 11, 14),
            date2 = new Date(2015, 11, 14),
            date3 = new Date(2015, 10, 14),
            date4 = new Date(2016, 11, 14);

        it('should return true if dates are equal', function () {
            assert(plugin.isSame(date1,date2))
        })
        it('should return false when checking dates with different months', function () {
            assert.isFalse(plugin.isSame(date1,date3))
        })
        it('should return false when checking dates with different years', function () {
            assert.isFalse(plugin.isSame(date1,date4))
        })
        it('should return true when comparing months', function () {
            assert(plugin.isSame(date1, date2,'month'))
        })
        it('should return false when comparing months from different years', function () {
            assert.isFalse(plugin.isSame(date1, date4, 'month'))
        })
        it('should return true when comparing years', function () {
            assert(plugin.isSame(date1, date2, 'year'))
        })
    })

    describe('less(date1, date2)', function () {
        it('should return true if date2 less then date1', function () {
            assert(plugin.less(new Date(2015, 11, 14), new Date(2015, 11, 13)))
        })
    })
    describe('bigger(date1, date2)', function () {
        it('should return true if date2 bigger then date1', function () {
            assert(plugin.bigger(new Date(2015, 11, 14), new Date(2015, 11, 15)))
        })
    })
});
