var gulp = require('gulp'),
    jade = require('gulp-jade');

module.exports = function () {
    gulp.src('page/jade/pages/*.jade')
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./'))
};
