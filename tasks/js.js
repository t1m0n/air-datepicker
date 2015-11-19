var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    clone = require('gulp-clone'),
    concat = require('gulp-concat');

module.exports = function () {
    var stream = gulp.src([
        'src/js/datepicker.js',
        'src/js/body.js',
        'src/js/navigation.js'
    ])
        .pipe(concat('datepicker.js'));

    stream.pipe(clone())
        .pipe(gulp.dest('dist/js'));

    stream.pipe(clone())
        .pipe(uglify())
        .pipe(rename('datepicker.min.js'))
        .pipe(gulp.dest('dist/js'))

};