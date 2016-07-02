var gulp = require('gulp'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload');

gulp.task('css', require('./tasks/css'));
gulp.task('js', require('./tasks/js'));
gulp.task('i18n', require('./tasks/i18n'));
gulp.task('cssPage', require('./tasks/cssPage'));
gulp.task('jade-ru', require('./tasks/jade').ru);
gulp.task('jade-en', require('./tasks/jade').en);
gulp.task('gzip', require('./tasks/gzip'));

gulp.task('watch', function () {
    livereload.listen();

    gulp.watch('src/sass/*.scss', ['css']).on('change', function (file) {
        livereload.changed(file)
    });

    gulp.watch('src/js/**/*.js', ['js']).on('change', function (file) {
        livereload.changed(file)
    });

    gulp.watch('docs/sass/*.scss', ['cssPage']).on('change', function (file) {
        livereload.changed(file)
    });

    gulp.watch('docs/jade/**/*.jade', ['jade-ru', 'jade-en']).on('change', function (file) {
        livereload.changed(file)
    });
});

gulp.task('dev', ['css','js','i18n', 'cssPage', 'jade-ru', 'jade-en', 'watch']);
gulp.task('build', ['css','js','i18n', 'jade-ru', 'jade-en']);




