const mocha = require('gulp-mocha');
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const reactify = require('reactify');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const paths = {
  build: 'build',
  public: 'public',
  server: 'server/**/*.js',
  styles: 'styles/**/*.css',
  views: 'views/'
};

gulp.task('browser', () => {
  // set up the browserify instance on a task basis
  const b = browserify({
    entries: './browser/app.js',
    transform: [babelify, reactify]
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.public));
});

gulp.task('clean', (cb) => {
  del([paths.build, paths.public], () => cb());
});

gulp.task('test:server', (cb) => {
  gulp.src('test/server/**/*.js').pipe(mocha());
});

gulp.task('styles', () => {
  gulp.src(paths.styles)
      .pipe(cleanCSS())
      .pipe(gulp.dest(paths.public));
});

gulp.task('scripts', () => {
  gulp.src(paths.server)
      .pipe(babel())
      .pipe(rename((path) => {
        path.basename = path.basename.split('.')[0]
      }))
      .pipe(gulp.dest(paths.build))
});

gulp.task('views', () => {
  gulp.src(paths.views)
      .pipe(gulp.dest(paths.public))
});

gulp.task('build', ['scripts', 'styles', 'views', 'browser']);
