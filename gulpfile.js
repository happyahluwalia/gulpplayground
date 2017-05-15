//include gulp
var gulp = require('gulp');

// include gulp-uglify
var uglify = require('gulp-uglify');


// include browserSync

//uglify / minify JavaScript
gulp.task('minify', function() {
    gulp.src('js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

// add default tasks

// watch files

// run a local server
