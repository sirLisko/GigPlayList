'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


var onError = function(err){
	$.util.log(err.plugin + ': ' + $.util.colors.red(err.message));
	$.util.beep();
};


var bower = require('main-bower-files');

gulp.task('bower', function() {
	return gulp.src(bower())
		.pipe(gulp.dest('./public/javascripts/ext'));
});


gulp.task('js', function() {
	gulp.src('./assets/javascripts/**/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter('default'))
		.pipe($.uglifyjs('base.js'))
		.pipe(gulp.dest('./public/javascripts'));
});


gulp.task('sass', function () {
	return gulp.src('./assets/stylesheets/*.scss')
		.pipe($.sass())
		.on('error', onError)
		.pipe(gulp.dest('./public/stylesheets'));
});


gulp.task('watch', function() {
	gulp.start('default');
	gulp.watch('./assets/**/*.scss', ['sass']);
	gulp.watch('./assets/**/*.js', ['js']);
});

gulp.task('default', ['sass', 'js', 'bower']);
