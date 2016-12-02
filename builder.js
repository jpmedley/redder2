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

var fs = require('fs');
var jsdom = require('jsdom');
var fetch = require('node-fetch');

function createFullElement(document, elementName, attributeData) {
  var newElement = document.createElement(elementName);
  for (var attr in attributeData) {
    var newAttribute = document.createAttribute(attr)
    newAttribute.value = attributeData[attr]
    newElement.setAttributeNode(newAttribute);
  }

  return newElement;
}

function addSubReddits(document) {
  var subredditsByTopicUrl = 'https://www.reddit.com/api/subreddits_by_topic.json?query=javascript';
  return fetch(subredditsByTopicUrl)
    .then( response => {
      return response.json();
  }).then( json => {
    for (var k = 0; k < json.length; k++) {
      var linkEl = createFullElement(document, 'a', {
        'class': 'mdl-navigation__link',
        'href': '#' + json[k].name
      });

      var linkText = document.createTextNode(json[k].name);
      linkEl.appendChild(linkText);
      var navEl = document.querySelector('.mdl-navigation');
      var linkNode = navEl.appendChild(linkEl);
    }
  }).catch( ex => {
    console.log('[Redder] Parsing failed: ', ex);
  });
}

function domToString(document) {
  var tmp = document.createElement("div");
  tmp.appendChild(document);
  return tmp.innerHTML;
}

function buildIndex() {
  var page = fs.readFileSync('index.html', 'utf8');
  jsdom.env(page, function(err, window) {
    addSubReddits(window.document)
      .then(function() {
        var contents = domToString(window.document);
        fs.writeFileSync('app/index.html', contents, 'utf8');
        window.close();
      })
    // 
    
  });
}

exports.buildIndex = buildIndex;