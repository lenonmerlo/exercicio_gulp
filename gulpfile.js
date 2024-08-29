const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');

// Importação dinâmica do gulp-imagemin
let imagemin;

async function importImagemin() {
    imagemin = (await import('gulp-imagemin')).default;
}

const paths = {
    sass: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css'
    },
    images: {
        src: 'src/images/*',
        dest: 'dist/images'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js'
    }
};

async function compressImages() {
    await importImagemin();
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

function compileSass() {
    return gulp.src(paths.sass.src)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(paths.sass.dest));
}

function compressJS() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
}

exports.default = gulp.series(
    compileSass,
    compressImages,
    compressJS
);
