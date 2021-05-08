const { dest, series, src } = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const uglify = require("gulp-uglify-es").default;

function cleanDist() {
  return del("dist");
}

function scripts() {
  return src(["src/js/**/*.js"], { base: "src" }).pipe(uglify()).pipe(dest("dist"));
}

function styles() {
  return src(["src/css/**/*.css"], { base: "src" })
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["defaults"],
        grid: true,
      })
    )
    .pipe(cleanCSS())
    .pipe(dest("dist"));
}

function build() {
  return src(["src/icons/**/*", "src/manifest.json"], { base: "src" }).pipe(dest("dist"));
}

exports.cleanDist = cleanDist;
exports.scripts = scripts;
exports.styles = styles;

exports.build = series(cleanDist, build, styles, scripts);
