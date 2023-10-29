const { src, dest, watch, series, parallel } = require("gulp");

// CSS Y SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");

// funcion para compilar el scss into css.
function css(done) {
  src("src/scss/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("build/css"));
  done();
}
async function imagenes(done) {
  const imagemin = await import("gulp-imagemin");
  src("src/img/**/*")
    .pipe(imagemin.default({ optimizationLevel: 3 }))
    .pipe(dest("build/img"));

  done();
}

async function versionWebp(done) {
  const webp = require("gulp-webp");
  const opciones = { quality: 50 };
  src("src/img/**/*.{png,jpg}").pipe(webp(opciones)).pipe(dest("build/img"));
  done();
}

async function versionAvif(done) {
  const avif = require("gulp-avif");
  const opciones = { quality: 50 };
  src("src/img/**/*.{png,jpg}").pipe(avif(opciones)).pipe(dest("build/img"));
  done();
}

//WATCHER
function dev() {
  watch("src/scss/**/*.scss", css);

  //watch("src/img/**/*", imagenes);
}

exports.css = css;
exports.dev = dev;
//exports.imagenes = imagenes;
//exports.versionWebp = versionWebp;
//exports.versionAvif = versionAvif;
//exports.default = series(imagenes, versionWebp, versionAvif, css, dev);
exports.default = series(css, dev);
