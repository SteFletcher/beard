var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-ruby-sass');
var clean = require('gulp-clean');
var rimraf = require('gulp-rimraf');
var gutil = require('gulp-util');
var prefix = require('gulp-autoprefixer');
var fs = require('fs'),
    watch = require('gulp-watch'),
      debug = require('gulp-debug');


console.log("loading....");

// Compile Our Sass
gulp.task('sassy', ['clean'], function() {
    gulp.src('./scss/*.scss')
        .pipe(sass({
            style: 'compact'}))
        .pipe(gulp.dest('./dev/css'));

  console.log("sassy complete!");
});

gulp.task('css', ['sassy'],function() {
  gulp.src('./dev/css/*.css')
   .pipe(concat('site.css'))
  .pipe(prefix('last 1 version'))
   //.pipe(minifyCSS())
   .pipe(gulp.dest('./dev/css'));

  console.log("css complete!");

});

gulp.task('js', function() {

  console.log("JS starting!");
	return gulp.src('./js/*.js')
    .pipe(stripDebug())
     .pipe(concat('site.js'))
    //  .pipe(stripDebug())
     .pipe(gulp.dest('./dev/js'));
  console.log("JS complete!");

});


gulp.task('default', ['watch'], function(){
  startExpress();
  startLivereload();
});

gulp.task('watch', function() {

  console.log("watching scss!");
    gulp.watch('./scss/*.scss', ['css']);

  console.log("watching js!");
    var jswatcher = gulp.watch('./js/*.js', ['js']);

  console.log("watching htm!");
    gulp.watch('./dev/**/*.{htm,css,js}', notifyLivereload);

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

	console.log("live re-loading!");
  gutil.log('live re-loading!', gutil.colors.cyan(event.path));
  // `gulp.watch()` events provide an absolute path
  // so we need to make it relative to the server root
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);
 
  lr.changed({
    body: {
      files: [fileName]
    }
  });
}

   
 gulp.task('clean', function() {
  // try{
  //   fs.unlinkSync('./dev/js/site.js');
  // }catch(err){
  //   gutil.log('error occured while trying to remove files.');
  // }
  try{
    fs.unlinkSync('./dev/css/site.css');
  }catch(err){
    gutil.log('error occured while trying to remove files.');
  }
});
