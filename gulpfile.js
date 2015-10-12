var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat');

gulp.task('js', function () {
    gulp.src(['js/datepicker/datepicker.js',
        'js/datepicker/i18n.js',
        'js/datepicker/navigation.js',
        'js/datepicker/cell.js',
        'js/datepicker/body.js'])
        .pipe(concat('datepicker.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(livereload())
});

gulp.task('sass', function () {
    gulp.src('sass/datepicker.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('datepicker.css'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(livereload())
});

gulp.task('build', ['js', 'sass']);

gulp.task('pageSass', function () {
    gulp.src('sass/page-init.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('css/'))
        .pipe(livereload())
});

gulp.task('watch', function () {
    livereload.listen();

    gulp.watch('sass/**/*.scss', ['pageSass', 'sass']).on('change', function (file) {
        livereload.changed(file)
    });

    gulp.watch('js/**/*.js', ['js']).on('change', function (file) {
        livereload.changed(file)
    });
});

gulp.task('default', ['build', 'pageSass', 'watch']);



