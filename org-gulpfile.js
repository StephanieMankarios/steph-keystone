'use strict'
/*-----------------------------------------------------------------
 * REQUIRED MODULES
 *-----------------------------------------------------------------*/
var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	del = require('del'),
	data = require('gulp-data'),
	nodemon = require('nodemon'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};


/*-----------------------------------------------------------------
 * NODEMON TASK
 *-----------------------------------------------------------------*/
gulp.task('nodemon', function () {
  nodemon({
    script: 'keystone.js',
		env: { 'NODE_ENV': 'development' }
  })
})

/*-----------------------------------------------------------------
 * SCRIPT TASK
 *-----------------------------------------------------------------*/
// gulp.task('scripts', function () {
// 	gulp.src(['src/js/main.js', '!src/js/*.min.js'])
// 		.pipe(plumber())
// 		.pipe(rename({
// 			suffix: '.min'
// 		}))
// 		.pipe(uglify())
// 		.pipe(gulp.dest('src/js'))
// 		.pipe(reload({
// 			stream: true
// 		}));
// });


/*-----------------------------------------------------------------
 * HTML TASK
 *-----------------------------------------------------------------*/
gulp.task('html', function () {
	gulp.src('/templates/**/*.html')
		.pipe(reload({
			stream: true
		}));
});

/*-----------------------------------------------------------------
 * SASS TASK
 *-----------------------------------------------------------------*/
gulp.task('styles', function() {
	gulp.src('/public/styles/**/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
//    .pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write())
		.pipe(reload({stream:true}));
})

/*-----------------------------------------------------------------
 * BUILT TASKS
 *-----------------------------------------------------------------*/
// Clear out all files and folders from build folder
// gulp.task('build:cleanfolder', function (cb) {
// 	del([
// 		'dist/**'
// 	], cb());
// });

// Create build directory for all files
// gulp.task('build:copy', ['build:cleanfolder'], function () {
// 	return gulp.src('src/**/*')
// 		.pipe(gulp.dest('dist'))
// });

// Remove unwanted build files
// List all files and directories here you don't want to include
// gulp.task('build:remove', ['build:copy'], function (cb) {
// 	del([
// 		'dist/scss/',
// 		'dist/js/!(*.min.js)'
// 	], cb())
// });

// Simple to default task - kicks off everything
// gulp.task('build', ['build:copy', 'build:remove','imagemin']);

/*-----------------------------------------------------------------
 * BROWSER-SYNC TASK
 *-----------------------------------------------------------------*/
gulp.task('browser-sync', function () {
	browserSync({
		browser: "google chrome",
		server: {
			baseDir: './',
		}
	});
});


//Task to run build server for testing final src
// gulp.task('build:serve', function () {
// 	browserSync({
// 		browser: "google chrome",
// 		server: {
// 			baseDir: './dist/'
// 		}
// 	});
// });


/*-----------------------------------------------------------------
 * WATCH TASK
 *-----------------------------------------------------------------*/
gulp.task('watch', function () {
	// gulp.watch('/public/js/scripts.js', ['scripts']);
	gulp.watch('/public/styles/**/*.scss', ['styles']);
	gulp.watch('/templates/**/*.html', ['html']);
});

/*-----------------------------------------------------------------
 * DEFAULT TASK - a task that calls other tasks
 *-----------------------------------------------------------------*/

gulp.task('default', ['nodemon', 'styles', 'html', 'watch']);