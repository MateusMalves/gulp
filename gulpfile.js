const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function compressImages() {
    return gulp.src('./source/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'));
}

function compressJavascript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

function compileSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/styles'));
}

function watchFiles() {
    gulp.watch('./source/img/*', compressImages);
    gulp.watch('./source/scripts/*.js', compressJavascript);
    gulp.watch('./source/styles/**/*.scss', compileSass);
}

const build = gulp.series(gulp.parallel(compressImages, compressJavascript, compileSass));

exports.compressImages = compressImages;
exports.compressJavascript = compressJavascript;
exports.compileSass = compileSass;
exports.watch = watchFiles;
exports.default = build;

