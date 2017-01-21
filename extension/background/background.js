chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var url = 'http://localhost:3000/api/comment';
    //var url = 'http://bytespaces/api/comment';
    $.ajax({
      url: url, 
      type: 'POST', 
      data: request.request,
      contentType: "application/json",
      xhrFields: {
       withCredentials: true
      },
      success: function(data) {
        sendResponse({status: true});
      },
      error: function(data) {
        sendResponse({status: false});
      }
    });
    // so the event handler stays valid
    return true;
});

chrome.contextMenus.create({title: "Bytespaces: Comment", 
  contexts:["selection"],
  onclick: function(info, tab) { 
    chrome.tabs.executeScript(null, { file: 'background/selection.js' });
  }
});