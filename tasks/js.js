const gulp             = require('gulp');
const gulpIf           = require('gulp-if');
const bowerFiles       = require('main-bower-files');
const concat           = require('gulp-concat');
const jshint           = require('gulp-jshint');
const order            = require('gulp-order');
const babel            = require('gulp-babel');
const eventStream      = require('event-stream');
const sourcemaps       = require('gulp-sourcemaps');
const uglify           = require('gulp-uglify');
const rename           = require('gulp-rename');
const browserSync      = require('browser-sync');
const config           = require('../package').gulp;
const replace          = require('gulp-replace');

const fetchVendorJs = () => {
  return gulp.src(bowerFiles(config.selectors.js))
    .pipe(concat(config.vendor.js));
};

const validateLocalJs = () => {
  return gulp.src(`${config.src.js}${config.selectors.js}`)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {beep: true}));
};

const fetchLocalJs = () => {
  return validateLocalJs()
    .pipe(order([config.main.js,config.selectors.js]))
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-object-rest-spread']
    }));
};

const buildJs = (target) => {
  var dest = config.dest.js;

  if(target == "mobile"){
    dest = config.dest.mobileJs;
  }
  if(target == "mobileStaging"){
    dest = config.dest.mobileStagingJs;
  }

  return eventStream.merge(
    fetchVendorJs(),
    fetchLocalJs()
  )
  .pipe(order([config.vendor.js, config.selectors.js]))
  .pipe(gulpIf(global.production, replace('http://localhost:4000', process.env.API_URL)))
  .pipe(concat(config.output.js))
  // .pipe(sourcemaps.init())
  .pipe(gulpIf(global.production, uglify()))
  .pipe(gulpIf(global.production, rename({ suffix: '.min' })))
  // .pipe(sourcemaps.write())
  .pipe(gulp.dest(dest))
  .pipe(gulpIf(!global.production, browserSync.stream()));
};

gulp.task('build-js', buildJs);
module.exports = buildJs;
