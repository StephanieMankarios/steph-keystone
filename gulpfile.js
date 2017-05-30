var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var cssclean = require('gulp-clean-css');

var paths = {
	'src': ['./models/**/*.js', './routes/**/*.js', 'keystone.js', 'package.json'],
	'style': {
		all: './public/styles/**/*.scss',
		output: './public/styles/'
	},
	'html': {
		all: './templates/views/**/*.html'
	}
};

// create sass tasks
gulp.task('sass', function () {
	return gulp.src(paths.style.all)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cssclean())
		.pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest(paths.style.output))
		.pipe(browserSync.stream({
			match: '/public/styles/*.css'
		}))
		.on('error', function (err) {
			console.error('Error!', err.message);
		});
});

gulp.task('serve', ['sass'], function () {

	browserSync.init({
		proxy: 'http://localhost:3000',
		port: '4000'
	});

	gulp.watch(paths.style.all, ['sass']);
	gulp.watch(['./public/styles/*.css']).on('change', browserSync.reload);
	// gulp.watch(['./public/styles/*.css', 'assets/javascript/*.js']).on('change', browserSync.reload);
});

gulp.task('runKeystone', shell.task('nodemon'));

// default task (just run gulp)
gulp.task('default', ['runKeystone', 'serve']);
