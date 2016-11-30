
function createFullElement(elementName, attributeData) {
  var newElement = document.createElement(elementName);
  for (var attr in attributeData) {
    var newAttribute = document.createAttribute(attr)
    newAttribute.value = attributeData[attr]
    newElement.setAttributeNode(newAttribute);
  }

  return newElement;
}

function fetchSubreddits() {
  var subredditsByTopicUrl = 'https://www.reddit.com/api/subreddits_by_topic.json?query=javascript';
  fetch(subredditsByTopicUrl).then( response => {
    return response.json();
  }).then( json => {
    for (var k = 0; k < json.length; k++) {
      var linkEl = createFullElement('a', {
        'class': 'mdl-navigation__link',
        'href': '#' + json[k].name
      });

      var linkText = document.createTextNode(json[k].name);
      linkEl.appendChild(linkText);
      var navEl = document.querySelector('.mdl-navigation');
      var linkNode = navEl.appendChild(linkEl);

      linkNode.addEventListener('click', e => {
        fetchTopics(e.target.firstChild.nodeValue);
        navigator.serviceWorker.ready.then( reg => {
          return reg.sync.register('articles');
        })
      });
    }
  }).catch( ex => {
    console.log('[Redder] Parsing failed: ', ex);
  });
}