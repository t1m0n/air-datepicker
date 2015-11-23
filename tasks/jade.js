var gulp = require('gulp'),
    _jade =  require('gulp-jade/node_modules/jade'),
    jade = require('gulp-jade');

_jade.filters.code = function( block ) {
    return block
        .replace( /&/g, '&amp;'  )
        .replace( /</g, '&lt;'   )
        .replace( />/g, '&gt;'   )
        .replace( /"/g, '&quot;' )
        .replace( /#/g, '&#35;'  )
        .replace( /\\/g, '\\\\'  );
};

module.exports = function () {
    gulp.src('page/jade/pages/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./'))
};
