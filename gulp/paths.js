'use strict';

module.exports = {
    src: {
        dir: './src/',
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
    },
    files: [
        {
            src: './src/*.*',
            dest: './dest/'
        },
        {
            src: './src/fonts/**/*.*',
            dest: './dest/fonts/'
        }
    ]
};