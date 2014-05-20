var gulp = require('gulp');

var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var rimraf = require('gulp-rimraf');
var gutil = require('gulp-util');
var fs = require('fs');


console.log("loading....");

// Compile Our Sass
gulp.task('sassy', ['clean'], function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dev/css'));
});

gulp.task('css', ['sassy'],function() {
	gulp.src('./dev/css/*.css')
	 .pipe(concat('site.css'))
	 .pipe(minifyCSS())
  	   .pipe(gulp.dest('./dev/css'));

});
   
 gulp.task('clean', function() {
 	try{
		fs.unlinkSync('./dev/css/site.css');
	}catch(err){
		gutil.log('error occured while trying to remove files.');
	}
});

gulp.task('watch', function() {
    gulp.watch('./scss/*.scss', ['css']);

});

gulp.task('default', ['watch']);