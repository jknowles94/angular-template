const gulp             = require('gulp');
const clean            = require('gulp-clean');
const eventStream      = require('event-stream');
const browserSync      = require('browser-sync');
const bowerFiles       = require('main-bower-files');
const config           = require('../package').gulp;

const localFonts = () => {
  return gulp.src(`${config.src.fonts}${config.selectors.fonts}`);
};

const vendorFonts = () => {
  return gulp.src(bowerFiles(config.selectors.fonts));
};

const cleanFonts = (target) => {
  var dest = config.dest.fonts;

  if(target == "mobile"){
    dest = config.dest.mobileFonts;
  }
  if(target == "mobileStaging"){
    dest = config.dest.mobileStagingFonts;
  }

  return gulp.src(dest, { read: false })
    .pipe(clean());
};

const copyFonts = (target) => {
  var dest = config.dest.fonts;

  if(target == "mobile"){
    dest = config.dest.mobileFonts;
  }
  if(target == "mobileStaging"){
    dest = config.dest.mobileStagingFonts;
  }

  return eventStream.merge(
    localFonts(),
    vendorFonts()
  )
  .pipe(gulp.dest(dest));
};

const buildFonts = (target) => {
  return eventStream.merge(
    cleanFonts(target),
    copyFonts(target)
  )
  .pipe(browserSync.stream());
};

gulp.task('build-fonts', buildFonts);
module.exports = buildFonts;
