'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var pump = require('pump');
const jsLibraries = ['./assets/js/jquery.min.js', './assets/js/parallax.min.js'];

gulp.task('sass', function () {
  return gulp.src('./assets/scss/main.scss')
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }).on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(rename('styles.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
  gulp.watch('./assets/js/*.js', ['copy-js', 'js-compile']);
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

gulp.task('copy-js', function() {
  return gulp.src(jsLibraries)
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('js-compile', function(cb) {
  pump([
    gulp.src('./assets/js/main.js'),
    babel({
      presets: ['env']
    }),
    uglify(),
    gulp.dest('./dist/js')
  ], cb);
});