'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

function swallowError (error) {

  console.log(error.toString())

  this.emit('end')
}

gulp.task('sass', function () {
  return gulp.src('./assets/scss/main.scss')
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('styles.css'))
    .pipe(sourcemaps.write('./maps'))
    .on('error', swallowError)
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
});

gulp.task('sass:prod', function () {
  return gulp.src('./assets/scss/main.scss')
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
     }))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('./dist/'));
});