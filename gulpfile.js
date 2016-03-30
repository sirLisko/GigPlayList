'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var dev;


gulp.task('js', function() {
	return gulp.src('./assets/javascripts/**/*.js')
		.pipe($.eslint())
		.pipe($.eslint.format())
		.pipe($.if(!dev, $.eslint.failAfterError()))
		.pipe($.uglify())
		.pipe(gulp.dest('./public/javascripts'));
});

gulp.task('sass', function () {
	return gulp.src('./assets/stylesheets/*.scss')
		.pipe($.sass())
		.on('error', $.sass.logError)
		.pipe($.autoprefixer({
			browsers: ['> 5%'],
			cascade: false
		}))
		.pipe($.csso())
		.pipe(gulp.dest('./public/stylesheets'));
});


gulp.task('watch', function() {
	dev = true;
	gulp.start('default');
	gulp.watch('./assets/**/*.scss', ['sass']);
	gulp.watch('./assets/**/*.js', ['js']);
});


gulp.task('default', ['sass', 'js']);
