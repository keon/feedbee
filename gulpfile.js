const gulp = require('gulp');
//const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss')
const postcss = require('gulp-postcss');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const gulpPostcss = require('gulp-postcss');


const paths = {
    root: {
        src: './src/index.js',
        dest: './dist/'
    },
    plugin: {
        html: {
            src: './src/plugin/index.html',
            dest: './dist/plugin/'
        },
        css: {
            src: './src/plugin/**/*.css',
            dest: './dist/plugin/'
        },
        js: {
            src: './src/plugin/**/*.js',
            dest: './dist/plugin/'
        }
    }
}

function clean() {
    return del(['dist']);
}

function root() {
    return gulp.src(paths.root.src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.root.dest))
}

function html() {
    return gulp.src(paths.plugin.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.plugin.html.dest))
}

function css() {
    return gulp.src(paths.plugin.css.src)
    .pipe(concat({path: 'index.min.css'}))
    .pipe(postcss([
        require('tailwindcss'),
        require('autoprefixer')
    ]))
    .pipe(cleanCSS())
    .pipe(purgecss({
        content: ['**/*.html']
    }))
    .pipe(gulp.dest(paths.plugin.css.dest))
}

function js() {
    return gulp.src(paths.plugin.js.src)
    .pipe(concat({path: 'index.min.js'}))
    .pipe(uglify({}))
    .pipe(gulp.dest(paths.plugin.js.dest))
}

function watch() {
    console.log('Feedbee: Starting development environment...')
    console.log('Feedbee: Creating initial build...')
    build();
    console.log('Feedbee: Watching for changes...')
    gulp.watch(paths.plugin.html.src, build);
    gulp.watch(paths.plugin.css.src, build);
    gulp.watch(paths.plugin.js.src, build);
    gulp.watch(paths.root.src, build);
}

const build = gulp.series(clean, gulp.parallel( root, html, css, js));

exports.css = css;
exports.watch = watch;
exports.default = build;