/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var del = require('del');
var gulp = require('gulp');
var builder = require('./builder.js');
var webserver = require('gulp-webserver');

var rootDir = 'app';
var version = '200';

gulp.task('serve', function(cb) {
	gulp.src(rootDir)
		.pipe(webserver({
			livereload: true,
			directoryListing: true,
			port: 8001,
			fallback: 'index.html'
		}))
});

gulp.task('clean', function(cb) {
	var filesToDelete = [
		rootDir + '/index.html'
	];
	var opts = {dryRun: false, dot: true};
    del.sync(filesToDelete, opts);
})

gulp.task('build', function(cb) {
	builder.buildIndex();
})