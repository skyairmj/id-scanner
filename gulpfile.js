var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');

gulp.task('html', function(){
});

gulp.task('js', function(){
});

gulp.task('css', function(){
});

gulp.task('bower', function(){
});

gulp.task('vendorJS', function(){
  return gulp.src(mainBowerFiles({
      overrides: {
        jquery: {
          main: [
            "dist/*.min.*",
            "dist/jquery.js",
          ]
        },
        bootstrap: {
          main: [
            'dist/js/bootstrap.min.js'
          ]
        },
        'blueimp-tmpl': {
          main: [
            'js/*.min.*'
          ]
        },
        'jquery-file-upload': {
          main: [
            'js/**/*.js'
          ]
        },
        'blueimp-load-image': {
          main: [
            'js/*.min.*'
          ]
        },
        'blueimp-canvas-to-blob': {
          main: [
            'js/*.min.*'
          ]
        },
        'blueimp-gallery': {
          main: [
            'js/*.min.*'
          ]
        }
      }
    }))
    .pipe(filter(['**/*.js', '**/*.js.map', '**/*.min.map']))
    .pipe(gulp.dest('public/vendor/javascripts'))
});

gulp.task('vendorCSS', function(){
  return gulp.src(mainBowerFiles({
      overrides: {
        bootstrap: {
          main: [
            'dist/css/*.min.*'
          ]
        },
        'jquery-file-upload': {
          main: [
            'css/jquery.*.css'
          ]
        },
        'blueimp-gallery': {
          main: [
            'css/*.min.*'
          ]
        }
      }
    }))
    .pipe(filter(['**/*.css', '**/*.css.map']))
    .pipe(gulp.dest('public/vendor/stylesheets'))
});

gulp.task('vendorFont', function(){
  return gulp.src(mainBowerFiles({
      overrides: {
        bootstrap: {
          main: [
            'dist/fonts/*.*'
          ]
        }
      }
    }))
    .pipe(filter(['**/*.eot', '**/*.woff', '**/*.woff2', '**/*.svg', '**/*.ttf']))
    .pipe(gulp.dest('public/vendor/fonts'))
});

gulp.task('vendorImg', function(){
  return gulp.src(mainBowerFiles({
      overrides: {
        'jquery-file-upload': {
          main: [
            'img/*.*'
          ]
        }
      }
    }))
    .pipe(filter(['**/*.gif']))
    .pipe(gulp.dest('public/vendor/img'))
});

gulp.task('default', [ 'html', 'js', 'css', 'bower' ]);

gulp.task('vendor', [ 'vendorJS', 'vendorCSS', 'vendorFont', 'vendorImg']);
