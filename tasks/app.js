const gulp             = require('gulp');
const eventStream      = require('event-stream');
const buildIndex       = require('./index');
const buildPartials    = require('./partials');
const buildImages      = require('./images');
const buildFonts       = require('./fonts');
const installPackages  = require('./install');

const buildApp = function(target) {
  return eventStream.merge(
    installPackages(target),
    buildIndex(target),
    buildPartials(target),
    buildImages(target),
    buildFonts(target)
  );
};

const buildAppMobile = function(){
  buildApp("mobile");
}

gulp.task('build-app', ['clean', 'build-constant'], buildApp);
gulp.task('build-app-mobile', ['clean', 'build-constant'], buildAppMobile);

module.exports = buildApp;
