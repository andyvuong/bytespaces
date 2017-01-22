chrome.runtime.sendMessage({type: 'get', url: window.location.href}, function(response) {
  console.log(response);
  var commentDict = {};
});

