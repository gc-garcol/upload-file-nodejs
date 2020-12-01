'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const bro = require('gulp-bro');

gulp.task('build-css', () => {
    return gulp.src('_frontend/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('_public/css'));
});

gulp.task('build-js', () => {
    return gulp.src('_frontend/js/**/*js')
        .pipe(bro())
        .pipe(gulp.dest('_public/js'))
});

gulp.task('default',
    gulp.series('build-css', 'build-js', () => {
        gulp.watch('_frontend/scss/**/*.scss', (done) => {
            gulp.series(['build-css'])(done);
        });

        gulp.watch('_frontend/js/**/*.js', (done) => {
            gulp.series(['build-js'])(done);
        });
    })
);

gulp.task('dev',
  gulp.series('build-css', 'build-js', () => {
    gulp.watch('_frontend/scss/**/*.scss', (done) => {
        gulp.series(['build-css'])(done);
    });
    
    gulp.watch('_frontend/js/**/*.js', (done) => {
        gulp.series(['build-js'])(done);
    });
  })
);

gulp.task('build',
    gulp.series(['build-css', 'build-js'])
);

