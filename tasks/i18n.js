var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    clone = require('gulp-clone'),
    concat = require('gulp-concat');

module.exports = function () {
    gulp.src('src/js/i18n/*.js')
        .pipe(gulp.dest('dist/js/i18n'))
};
