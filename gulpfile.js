var gulp       = require('gulp'),

	// React building process
	browserify = require('browserify'),
	babelify   = require('babelify'),
	source     = require('vinyl-source-stream'),
	buffer     = require('vinyl-buffer'),

	// CSS spesific
	sass       = require('gulp-sass'),

	// Development spesific
	livereload = require('gulp-livereload');

var SOURCE = './src/',
	DIST = './dist/';

gulp.task('style', function() {
	return gulp.src(SOURCE + 'style.scss')
	    .pipe(sass())
	    .pipe(gulp.dest(DIST + 'style'))
	    .pipe(livereload());
});

gulp.task('build-react-components', function() {
	return browserify(SOURCE + 'StackedBars.js', {debug: false})
		.transform(babelify, {presets: ['es2015', 'react']})
		.bundle()
		.pipe(source('stackedbars.js'))
		.pipe(buffer())
		.pipe(gulp.dest(DIST + 'scripts'))
		.pipe(livereload());
});

gulp.task('copy', function() {
	return gulp.src(SOURCE + 'index.html')
		.pipe(gulp.dest(DIST))
		.pipe(livereload());
});

gulp.task('watch-css', function() {
	livereload.listen();
	gulp.watch(SOURCE + '**/*.scss', ['style']);
});

gulp.task('watch-js', function() {
	livereload.listen();
	gulp.watch(SOURCE + '**/*.js', ['build-react-components']);
});

gulp.task('watch-html', function() {
	livereload.listen();
	gulp.watch(SOURCE + '**/*.html', ['copy']);
});

gulp.task('watch', ['watch-html', 'watch-css', 'watch-js']);

gulp.task('default', ['copy', 'style', 'build-react-components']);
