const gulp             = require('gulp');
const clean            = require('gulp-clean');
const config           = require('../package').gulp;

const cleanDest = () => {
  return gulp.src([config.destDir, config.mobileDir, config.mobileStagingDir], { read: false })
    .pipe(clean());
};

gulp.task('clean', cleanDest);
module.exports = cleanDest;
