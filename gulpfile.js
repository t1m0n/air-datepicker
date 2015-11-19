var gulp = require('gulp'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload');

gulp.task('css', require('./tasks/css'));
gulp.task('js', require('./tasks/js'));
gulp.task('i18n', require('./tasks/i18n'));
gulp.task('cssPage', require('./tasks/cssPage'));



gulp.task('watch', function () {
    livereload.listen();

    gulp.watch('src/sass/*.scss', ['css']).on('change', function (file) {
        livereload.changed(file)
    });

    gulp.watch('src/js/**/*.js', ['js']).on('change', function (file) {
        livereload.changed(file)
    });

    gulp.watch('page/sass/*.scss', ['cssPage']).on('change', function (file) {
        livereload.changed(file)
    });
});




