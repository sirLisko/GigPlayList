'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');


var onError = function(err){
	gutil.log(err);
};


var gulpBowerFiles = require('gulp-bower-files');

gulp.task('bower', function(cb){
	var dest = gulp.dest('./dist/js/ext');
	dest.on('end', cb);

	gulpBowerFiles().pipe(rename(function (path) {
		path.basename = path.dirname;
		path.dirname = '';
	})).pipe(dest);
});


var clean = require('gulp-clean');

gulp.task('clean', function () {
  return gulp.src('./dist', {read: false})
    .pipe(clean());
});


var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

gulp.task('js:prod', function() {
  return gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('base.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('js:dev', function() {
  return gulp.src('./src/**/*.js')
    .pipe(concat('base.js'))
    .pipe(gulp.dest('./dist/js/'));
});


gulp.task('copy', function(){
  gulp.src('./public/**/*')
    .pipe(gulp.dest('./dist/public/'));
});


var fileinclude = require('gulp-file-include');

gulp.task('fileinclude', function() {
  gulp.src(['./src/templates/index.html'])
    .pipe(fileinclude())
    .pipe(gulp.dest('./dist'));
});


var less = require('gulp-less');

gulp.task('less', function () {
	gulp.src('./src/styles/*.less')
	  .pipe(less({
		strictImports:true,
		  compress:true
	  })).on('error', onError)
	  .pipe(gulp.dest('./dist/styles/'));
});


var openFile = require('gulp-open');

gulp.task('open', function(){
  gulp.src('./dist/index.html')
  .pipe(openFile('<%file.path%>'));
});


gulp.task('watch', function() {
	gulp.start('bower', 'fileinclude', 'less', 'js:dev', 'copy');
	gulp.watch('./src/**/*.html', ['fileinclude']);
	gulp.watch('./src/**/*.less', ['less']);
	gulp.watch('./src/**/*.js', ['js:dev']);
});


gulp.task('default', ['bower', 'fileinclude', 'less', 'js:prod', 'copy']);
