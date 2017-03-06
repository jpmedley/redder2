/**
 * Copyright 2017 Google Inc. All rights reserved.
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

// importScripts('js/sw-lib.min.js');
importScripts('sw-lib.js');

// This is in many of the examples. Why would an external developer want to do this?
// console.log(self.goog.swlib);

// PRECACING

// I assume I should NOT cache sw-lib.min.js. Correct?
goog.swlib.cacheRevisionedAssets([
	{
		url: '/index.html',
		revision: '001'
	},
	{
		url: '/message.html',
		revision: '001' // Using a const here would mean that every rev was
		                // incremented whether I changed it or not. Is this a good
		                // idea, a bad idea, or does it even matter?
	},
	{
		url: '/js/redder.js', // Can I pass an array to url, a glob, or a regex?
		revision: '001'
	},
	{
		url: '/images/dog.png',
		revision: '001'
	},
	{
		url: '/images/dog155x155.png',
		revision: '001'
	},
	{
		url: '/css/styles.css',
		revision: '001'
	}
])

// RUNTIME CACHING

const staleWhileRevalidateStrategy = goog.swlib.staleWhileRevalidate();

//Titles

// So registerRoute() appears to take a specific path. What if I need to cover
// a glob or a regex?
goog.swlib.router.registerRoute(/https:\/\/www\.reddit\.com\/r\/\w{1,255}\.json/, 
													 staleWhileRevalidateStrategy);