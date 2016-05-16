var gulp = require('gulp'),
    rename = require('gulp-rename'),
    wrap = require('gulp-wrap'),
    sass = require('gulp-sass'),
    clone = require('gulp-clone'),
    concat = require('gulp-concat');

module.exports = function () {
    gulp.src('src/js/i18n/*.js')
        .pipe(wrap(';(function ($) { <%=contents%> })(jQuery);'))
        .pipe(gulp.dest('dist/js/i18n'))
};
