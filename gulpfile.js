//include gulp
var gulp = require('gulp');

// include gulp-uglify
var uglify = require('gulp-uglify');

// include prefixer package
//https://www.npmjs.com/package/gulp-autoprefixer
var autoprefixer = require('gulp-autoprefixer');

//include sourcemap package
//https://www.npmjs.com/package/gulp-sourcemaps
var sourcemaps = require('gulp-sourcemaps');

// include browserSync
var browserSync = require('browser-sync');


//uglify / minify JavaScript
gulp.task('minify', function() {
    gulp.src('js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});
//run "gulp minify" to run minification on main.js

// Prefix task
gulp.task('processCSS', function() {
    gulp.src('styles/main.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer ({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('build'));
});

// add default tasks
gulp.task('default',['serve']);

// watch files
gulp.task('watch', function() {
    gulp.watch('styles/*.css', ['processCSS']);
    gulp.watch('js/main.js', ['minify']);
});

// run a local server
gulp.task('serve',['processCSS','minify'], function(){
    browserSync.init({
        server: '.',
        port: 3000
    });
    gulp.watch('styles/*.css', ['processCSS']).on('change', browserSync.reload);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/main.js',['minify']).on('change',browserSync.reload)
});
