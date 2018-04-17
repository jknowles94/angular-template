const gulp             = require("gulp");
const install          = require("gulp-install");
const fs               = require("fs");
const dir              = "./bower_components";

const installPackages = () => {
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  return gulp.src(["./bower.json", "./package.json"])
  .pipe(install());
};

gulp.task("install", installPackages);
module.exports = installPackages;






