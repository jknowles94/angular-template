const gulp             = require('gulp');
const gulpIf           = require('gulp-if');
const htmlhint         = require('gulp-htmlhint');
const htmlmin          = require('gulp-htmlmin');
const inject           = require('gulp-inject');
const browserSync      = require('browser-sync');
const config           = require('../package').gulp;

const validateIndex = () => {
  return gulp.src(`${config.srcDir}${config.main.index}`)
  .pipe(htmlhint({'doctype-first': false}))
  .pipe(htmlhint.reporter('htmlhint-stylish'));
};

const buildIndex = (target) => {
  // this will require js.js and run buildJs
  const js  = require('./js')(target);
  // this will require js.js and run buildCss
  const css = require('./css')(target);
  var dest = config.destDir;

  if(target == "mobile"){
    dest = config.mobileDir;
  }
  if(target == "mobileStaging"){
    dest = config.mobileStagingDir;
  }

  return validateIndex()
    // write first to get relative path for inject
    .pipe(gulp.dest(dest))
    .pipe(inject(js, {relative: true, addRootSlash: false}))
    .pipe(inject(css, {relative: true, addRootSlash: false}))
    .pipe(gulpIf(global.production, htmlmin({collapseWhitespace: true, removeComments: true})))
    .pipe(gulp.dest(dest))
    .pipe(gulpIf(!global.production, browserSync.stream()));
};

gulp.task('build-index', buildIndex);
module.exports = buildIndex;
