'use strict';

//General
var output = require('./gulp/output');
var gulp = require('gulp');
var plumber = require('gulp-plumber');

//SCSS
var autoPrefixer = require('gulp-autoprefixer');
var scss = require('gulp-sass');

//Javascript
var babelify = require('babelify');
var browserify = require('browserify');
var eventStream = require('event-stream');
var flatten = require('gulp-flatten');
var glob = require('glob');
var source = require('vinyl-source-stream');

var paths = require('./gulp/paths');
var babelConfig = require('./gulp/babelConfig');

gulp.task('start', function () {
    output.log('Gulping our files!');
});

gulp.task('copy', function () {
    output.log('Copying all those top-level files');
    paths.files.forEach(function (path) {
        gulp.src(path.src)
            .pipe(gulp.dest(path.dest));
    });
});

gulp.task('bundle', function (done) {
    output.log('Bundling our JS.');
    glob(paths.src.js, function (err, files) {
        if (err) plumber(err);
        var tasks = files.map(function (entry) {
            output.log('Bundling ' + entry + '.');
            return browserify({ entries: entry })
                .transform(babelify, babelConfig)
                .bundle()
                .on('error', function (err) {
                    output.error('Error during bundling.', err);
                    done();
                })
                .pipe(source(entry))
                .pipe(flatten())
                .pipe(gulp.dest(paths.dest.js));
        });

        eventStream.merge(tasks).on('end', function () {
            output.log('All files bundled.');
            done();
        });
    });
});

gulp.task('scss', function () {
    output.log('Converting SCSS => CSS.');
    gulp.src(paths.src.scss)
        .pipe(plumber())
        .pipe(autoPrefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(scss())
        .on('error', function (e) {
            output.error('Error during SCSS', e);
        })
        .pipe(gulp.dest(paths.dest.css));
});

gulp.task('watch', function () {
    gulp.watch(paths.watch.js, ['bundle']);
    gulp.watch(paths.watch.scss, ['scss']);
    gulp.watch(paths.watch.files, ['copy']);
});


gulp.task('default', ['start', 'copy', 'scss', 'bundle', 'watch']);