const gulp             = require('gulp');
const ngConstant       = require('gulp-ng-constant');
const { env }          = require('../config/environment');
const myConfig = require('../config.json');

const buildConstant = () => {
  const envConfig = myConfig[env];
  return ngConstant({
      createModule: false,
      name: "o2Insights",
      deps: false,
      constants: envConfig,
      wrap: "\"use strict\";\n<\%= __ngModule %>",
      stream: true
    })
    .pipe(gulp.dest('src/js/constants'));
};

gulp.task('build-constant', buildConstant);
module.exports = buildConstant;