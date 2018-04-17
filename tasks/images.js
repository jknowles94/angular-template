const gulp             = require('gulp');
const clean            = require('gulp-clean');
const eventStream      = require('event-stream');
const imagemin         = require('gulp-imagemin');
const browserSync      = require('browser-sync');
const config           = require('../package').gulp;

const cleanImages = (target) => {
  var dest = config.dest.images;

  if(target == "mobile"){
    dest = config.dest.mobileImages;
  }
  if(target == "mobileStaging"){
    dest = config.dest.mobileStagingImages;
  }

  return gulp.src(dest, { read: false })
    .pipe(clean());
};

const copyImages = (target) => {
  var dest = config.dest.images;

  if(target == "mobile"){
    dest = config.dest.mobileImages;
  }
  if(target == "mobileStaging"){
    dest = config.dest.mobileStagingImages;
  }

  return gulp.src(`${config.src.images}${config.selectors.images}`)
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(dest));
};

const buildImages = (target) => {
  return eventStream.merge(
    cleanImages(target),
    copyImages(target)
  )
  .pipe(browserSync.stream());
};

gulp.task('build-images', buildImages);
module.exports = buildImages;
