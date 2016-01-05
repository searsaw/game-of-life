var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var APP_DIRECTORY = 'app'

gulp.task('build:js', function() {
    browserify({
        entries: APP_DIRECTORY + '/app.js',
        debug: true,
    })
    .transform(babelify)
    .bundle()
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(APP_DIRECTORY));
});

gulp.task('watch:js', ['build:js'], function() {
    gulp.watch('src/js/**/*.*', ['build:js']);
});

 gulp.task('default', ['build:js']);
