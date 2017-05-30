var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var bs = require('browser-sync').create();


var paths = {
	'src': ['./models/**/*.js', './routes/**/*.js', 'keystone.js', 'package.json'],
	'style': {
		all: './public/styles/**/*.scss',
		output: './public/styles/'
	},
	'html': {
    all: './templates/**/*.html'
	}
};

gulp.task('html', function () {
	gulp.src('paths.html.all')
  .pipe(bs.stream());
});

gulp.task('sass', function () {
	gulp.src(paths.style.all)
		.pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.style.output))
		.pipe(bs.stream());
});

gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('watch:html', function () {
	gulp.watch(paths.html.all, ['html']);
});

gulp.task('browser-sync', function () {
	bs.init({
		proxy: 'http://localhost:3000',
		port: '4000'
	});
});

gulp.task('runKeystone', shell.task('nodemon'));

gulp.task('watch', ['watch:sass', 'watch:html']);
gulp.task('default', ['watch', 'runKeystone', 'browser-sync']);
