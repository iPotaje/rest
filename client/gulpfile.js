var gulp            = require('gulp');
var webserver       = require('gulp-webserver');
var ngAnnotate      = require('gulp-ng-annotate');
var templateCache   = require('gulp-angular-templatecache');
var concat          = require('gulp-concat');
var plumber         = require('gulp-plumber');
var uglify          = require('gulp-uglify');
var del             = require('del');
var browserify      = require('browserify');
var watchify        = require('watchify');
var babelify        = require('babelify'); //Babelify need package: babel-preset-es2015
var source          = require('vinyl-source-stream');
var buffer          = require('vinyl-buffer');
var rename          = require('gulp-rename');


var dest      = {
  preDirectory      : 'pre',
  directory         : 'dist',
  bundle            : '/' + 'all.js'
};

var src       = {
  webserver         : '.',
  angularModules    : 'src/*.js',
  angularTemplates  : 'partials/*.html',
  alljs : [
              dest.preDirectory + '/*.js'
          ]
};

//Webserver
gulp.task('webserver', function() {
  gulp.src(src.webserver)
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

//Correct Angular for correct minification
gulp.task('annotate', ['clean'], function () {
    return gulp.src(src.angularModules)
        .pipe(ngAnnotate())
        .pipe(gulp.dest(dest.preDirectory));
});


//Concat all Angular Templates
gulp.task('templates', ['clean'], function () {
  return gulp.src(src.angularTemplates)
    .pipe(templateCache({standalone: true}))
    .pipe(gulp.dest(dest.preDirectory));
});

//Concat all angular javascript files
gulp.task('scripts',['annotate', 'templates'], function(ok) {
  // plumber(del(['pre/all.js'], ok));
  return gulp.src(src.alljs)
    .pipe(plumber())
    .pipe(concat(dest.bundle))
    .pipe(gulp.dest(dest.preDirectory));
});

//Minimify javascript file
gulp.task('compress', ['scripts'], function() {
  return gulp.src(dest.preDirectory + dest.bundle)
    .pipe(uglify())
    .pipe(gulp.dest(dest.directory));
});

//Delete files preprocessed
gulp.task('clean', function () {
  return del.sync(['pre'])
});

//Watch for changes in angular and its templates
gulp.task("watcher", function (){
  gulp.watch(src.angularModules, ['clean', 'annotate', 'templates', 'scripts', 'browserify']);
  gulp.watch(src.angularTemplates, ['clean', 'annotate' , 'templates', 'scripts', 'browserify'])
});

// Watchify
gulp.task('watchify',['scripts'], function () {
  var bundler   = watchify(
                    browserify('pre/all.js', { debug: true }))
                          // .transform(debowerify)
                          // .transform(browserifyShim)
                          // .transform(
                          //     babelify, {
                          //       presets: ['es2015']
                          //     }
                          // )
  bundle_js(bundler)

  bundler.on('update', function () {
    console.log("event");
    bundle_js(bundler)
  })
})

function bundle_js(bundler) {
  return bundler.bundle()
    .pipe(source('all.js'))
    .pipe(buffer())
    .pipe(rename('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
}

// Browserify without watchify
gulp.task('browserify',['scripts'], function () {
  var bundler   = browserify('pre/all.js', { debug: true })
                            // .transform(debowerify)
                            // .transform(browserifyShim)
                            // .transform(
                            //   babelify, {
                            //   presets: ['es2015']
                            // });
  return bundle_js(bundler);
})

gulp.task('default', ['annotate', 'templates', 'scripts', 'watcher','webserver', 'watchify']);