'use strict';

let gulp = require('gulp'),
		nodemon = require('gulp-nodemon');

gulp.task('start', function() {
	nodemon({
		script: 'main.js'
	})
});
