'use strict';

var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var es = require('event-stream');
var flatten = require('gulp-flatten');
var fs = require('fs');
var glob = require('glob');
var gulp = require('gulp');
var gutil = require('gulp-util');
var rimraf = require('gulp-rimraf');
var scss = require('gulp-sass');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var vueify = require('vueify');
var zip = require('gulp-zip');

var paths = {
    src: {
        dir: './src/',
        files: ['./src/*.*', './src/**/*.ttf', './src/**/*.png'],
        js: './src/js/*.js',
        scss: './src/scss/*.*'
    },
    watch: {
        js: './src/js/**/*.*',
        scss: './src/scss/**/*.*',
        files: './src/*.*'
    },
    dest: {
        dir: './dest/',
        js: './dest/js/',
        css: './dest/css/'
    }
};

var manifest = JSON.parse(fs.readFileSync(paths.src.dir + 'manifest.json', 'UTF-8'));
var announce = (message) => { gutil.log(gutil.colors.green(message)); };
var error = (e) => {
    if (e.formatted) {
        gutil.log(gutil.colors.yellow(`${e.name} on in task ${e.plugin}.`));
        gutil.log(gutil.colors.yellow(`Line ${e.line}, Column ${e.column} in ${e.relativePath}.`));
        console.log(gutil.colors.red(e.formatted));
    } else {
        // This is probably a babel error, which is different from a normal gulp error.
        // gutil.log(gutil.colors.red(`Line ${e.loc.line}, Column ${e.loc.column} in ${e.filename}.`));
        // console.log(Object.keys(e.codeFrame));
        console.log(e);
    }
};

gulp.task('start', function () {
    announce(`Gulpin' ${manifest.name}`);
});

gulp.task('copy', function () {
    announce(`Copying all those top-level files`);
    gulp.src(paths.src.files, { cwd: paths.src })
        .pipe(gulp.dest(paths.dest.dir));
});

gulp.task('bundle', function (done) {
    announce('Bundling that sweet sweet ES6.');
    glob(paths.src.js, function (err, files) {
        if (err) plumber(err);
        var tasks = files.map(function (entry) {
            announce(`Bundling ${entry}...`);
            return browserify({ entries: entry })
                .transform(vueify)
                .transform(babelify)
                .bundle()
                .on('error', function (err) {
                    error(err);
                    done();
                })
                .pipe(source(entry))
                .pipe(flatten())
                .pipe(gulp.dest(paths.dest.js));
        });

        es.merge(tasks).on('end', done);
    });
});

gulp.task('scss', function () {
    announce('SCSS is gunna get all CSSified.');
    gulp.src(paths.src.scss)
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(scss())
        .on('error', error)
        .pipe(gulp.dest(paths.dest.css));
});

gulp.task('watch', function () {
    gulp.watch(paths.watch.js, ['bundle']);
    gulp.watch(paths.watch.scss, ['scss']);
    gulp.watch(paths.watch.files, ['copy']);
});


gulp.task('default', ['start', 'copy', 'scss', 'bundle', 'watch'], function () {
    announce('I\'m watching you... 👓');
});