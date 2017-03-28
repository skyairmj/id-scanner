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
          main: "dist/jquery.min.js"
        },
        bootstrap: {
          main: [
            './dist/js/bootstrap.js',
          ]
        }
      }
    }))
    .pipe(filter('**/*.js'))
    .pipe(uglify())
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

gulp.task('default', [ 'html', 'js', 'css', 'bower' ]);

gulp.task('vendor', [ 'vendorJS', 'vendorCSS', 'vendorFont']);
