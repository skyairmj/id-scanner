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
        'jquery': {
          main: [
            "dist/*.min.*"
          ]
        },
        'bootstrap': {
          main: [
            'dist/js/*.min.*'
          ]
        },
        'fine-uploader': {
          main: [
            'dist/jquery.fine-uploader.min.js',
            'dist/jquery.fine-uploader.min.js.map'
          ]
        },
        'handsontable': {
          main: [
            'dist/*.min.*'
          ]
        },
        'excellentexport': {
          main: [
            '*.min.*'
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
        'bootstrap': {
          main: [
            'dist/css/*.min.*'
          ]
        },
        'fine-uploader': {
          main: [
            'dist/*.min.*',
            'dist/loading.gif',
            'dist/edit.gif',
            'dist/retry.gif'
          ]
        },
        'handsontable': {
          main: [
            'dist/*.min.*'
          ]
        }
      }
    }))
    .pipe(filter(['**/*.css', '**/*.css.map', '**/*.gif']))
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
        'fine-uploader': {
          main: [
            'dist/placeholders/*.png'
          ]
        }
      }
    }))
    .pipe(filter(['**/*.png']))
    .pipe(gulp.dest('public/vendor/images'))
});

gulp.task('default', [ 'html', 'js', 'css', 'bower' ]);

gulp.task('vendor', [ 'vendorJS', 'vendorCSS', 'vendorImg']);
