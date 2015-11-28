var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    _jade =  require('gulp-jade/node_modules/jade'),
    jade = require('gulp-jade');

_jade.filters.code = function( block ) {
    return block
        .replace( /\&hellip;/g, '…'  )
        .replace( /&/g, '&amp;'  )
        .replace( /</g, '&lt;'   )
        .replace( />/g, '&gt;'   )
        .replace( /"/g, '&quot;' )
        .replace( /#/g, '&#35;'  )
        .replace( /\\/g, '\\\\'  );
};

module.exports = function () {
    gulp.src('docs/jade/pages/*.jade')
        .pipe(plumber())
        .pipe(jade())
        .pipe(gulp.dest('docs/'))
};
