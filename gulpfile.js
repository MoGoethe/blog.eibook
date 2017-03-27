var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require("gulp-autoprefixer"),
    cleancss = require('gulp-clean-css');
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');

gulp.task('styles',function(){//创建一个任务
    gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    // .pipe(concat('main.css'))合并
    .pipe(gulp.dest('./css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleancss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./css'))
    .pipe(notify('css  style task complete'))
})

gulp.task('default',function(){//开启一个默认任务
    gulp.start('styles');
})

gulp.task('watch',function(){
    gulp.watch('./scss/*.scss',['styles']); //监听一个目录文件，使用任务。
})