'use strict';

module.exports = {
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