'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const styleguide = require('sc5-styleguide');
const outputPath = 'output';
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pump = require('pump');
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

gulp.task('styleguide:generate', function () {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(styleguide.generate({
      title: 'My Styleguide',
      server: true,
      rootPath: outputPath,
      overviewPath: 'ReadMe.md'
    }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src('./assets/scss/main.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('watch', ['styleguide'], function () {
  gulp.start('copy-imgs');
  gulp.watch('./assets/scss/**/*.scss', ['sass', 'styleguide']);
  gulp.watch('./assets/js/*.js', ['copy-js', 'js-compile']);
  gulp.watch('./assets/img/*.png', ['copy-imgs']);
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

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

gulp.task('copy-imgs', function() {
  return gulp.src('./assets/img/*.png')
  .pipe(gulp.dest('./dist/img/'));
});