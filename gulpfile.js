'use strict'

var gulp = require('gulp')
var $ = require('gulp-load-plugins')()

gulp.task('sass', function () {
  return gulp.src('./assets/stylesheets/*.scss')
    .pipe($.sass())
    .on('error', $.sass.logError)
    .pipe($.autoprefixer({
      browsers: ['> 5%'],
      cascade: false
    }))
    .pipe($.csso())
    .pipe(gulp.dest('./public/stylesheets'))
})

gulp.task('watch', function () {
  gulp.start('default')
  gulp.watch('./assets/**/*.scss', ['sass'])
})

gulp.task('default', ['sass'])
