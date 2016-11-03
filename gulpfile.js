'use strict';

const gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	watch = require('gulp-watch'),
	autoprefixer = require('gulp-autoprefixer'),

	path = {
		src: {
			jade: 'src/jade/*.jade',
			style: 'src/style/main.scss',
			js:'src/js/*.js',
			img: 'src/img/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
		},
		build: {
			html: 'build',
			css: 'build/css/',
			js: 'build/js',
			img: 'build/img/',
		},
	};

//Server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "build"
    },
    port: 8080,
    open: true,
    notify: false
  });
});

//html
gulp.task('jade:build', function() {
  var YOUR_LOCALS = {};
 
  gulp.src(path.src.jade)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.reload({stream: true}));
});

//style
gulp.task('sass:build', function(){
   return gulp.src(path.src.style)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 10'], { cascade: true }))
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.reload({stream:true}));
});

//img
gulp.task('img:build', function () {
	gulp.src(path.src.img)
		.pipe(gulp.dest(path.build.img))
		.pipe(browserSync.reload({stream: true}));
});

//js
gulp.task('js:build', function () {
	gulp.src(path.src.js)
		.pipe(gulp.dest(path.build.js))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass:watch', function () {
  gulp.watch('src/style/**/*.scss',['sass:build']);
});

gulp.task('jade:watch', function () {
  gulp.watch(path.src.jade,['jade:build']);
});


gulp.task('build', [
	'jade:build',
	'sass:build',
	'img:build',
	'js:build',
]);

gulp.task('watch', [
	'jade:watch',
	'sass:watch',
	]);

gulp.task('default', [
	'browserSync',
	'build',
	'watch',
	]);