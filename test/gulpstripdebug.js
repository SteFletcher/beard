var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var rimraf = require('gulp-rimraf');
var gutil = require('gulp-util');
var fs = require('fs'),
    watch = require('gulp-watch'),
      debug = require('gulp-debug');

gulp.task('default', function () {
    return gulp.src('../js/*.js')
    	.pipe(concat('site.js'))
        .pipe(stripDebug())
        .pipe(gulp.dest('clean.js'));
});
