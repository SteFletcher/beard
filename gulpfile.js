var gulp = require('gulp');

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
    gulp.watch('./dev/*.htm', notifyLivereload);
    gulp.watch('./dev/js/*.js', notifyLivereload);

});


var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname;
var LIVERELOAD_PORT = 35729;

// We'll need a reference to the tinylr
// object to send notifications of file changes
var lr;
function startLivereload() {
 
  lr = require('tiny-lr')();
  lr.listen(LIVERELOAD_PORT);
}


function startExpress() {
 
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(EXPRESS_ROOT));
  app.listen(EXPRESS_PORT);
}

// Notifies livereload of changes detected
// by `gulp.watch()` 
function notifyLivereload(event) {
  gutil.log('live re-loading!', gutil.colors.cyan('123'));

	console.log("live re-loading!");
  // `gulp.watch()` events provide an absolute path
  // so we need to make it relative to the server root
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);
 
  lr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('default', ['watch'], function(){
  startExpress();
  startLivereload();
});

