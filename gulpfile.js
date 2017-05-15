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

//Used for generating service worker
var path = require('path');
var swPrecache = require('sw-precache');

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
gulp.task('serve',['processCSS','minify','service-worker'], function(){
    browserSync.init({
        server: '.',
        port: 3000
    });
    gulp.watch('styles/*.css', ['processCSS','service-worker']).on('change', browserSync.reload);
    gulp.watch('*.html',['service-worker']).on('change', browserSync.reload);
    gulp.watch('js/*.js',['minify','service-worker']).on('change',browserSync.reload)
});

//Generate service worker as part of build process
var paths = {
    src: './'
};

gulp.task('service-worker', function(callback){

    swPrecache.write(path.join(paths.src, 'sw.js'),{
        staticFileGlobs: [
            paths.src + 'index.html',
            paths.src + 'build/main.css'
        ],
        importScripts: [
            'node_modules/sw-toolbox/sw-toolbox.js',
            'js/toolbox-script.js'
        ],
        stripPrefix: paths.src
    }, callback);
});