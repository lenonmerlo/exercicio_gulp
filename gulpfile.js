// Importando os módulos necessários
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

// Caminhos dos arquivos
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

// Tarefa para compilar o SASS
function compileSass() {
    return gulp.src(paths.sass.src)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(paths.sass.dest));
}

// Tarefa para comprimir imagens
function compressImages() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

// Tarefa para comprimir JavaScript
function compressJS() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
}

// Tarefa padrão para executar todas as tarefas
exports.default = gulp.series(
    compileSass,
    compressImages,
    compressJS
);
