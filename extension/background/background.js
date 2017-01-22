chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var url = 'http://localhost:3000/api/comment';
    //var url = 'http://bytespaces/api/comment';
    if ( request.type === 'get' ) {
      console.log('get');
      $.ajax({
        url: url, 
        data: { 
          url: request.url, 
        },
        type: 'GET', 
        xhrFields: {
         withCredentials: true
        },
        success: function(data){
          sendResponse({status: true, data: data.data });
        }
      });
    } else {
      console.log(request.request);
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
    }
    // so the event handler stays valid
    return true;
});

chrome.contextMenus.create({title: "comment", 
  contexts:["selection"],
  onclick: function(info, tab) { 
    chrome.tabs.executeScript(null, { file: 'background/selection.js' });
  }
});

chrome.contextMenus.create({title: "View", 
  contexts:["selection"],
  onclick: function(info, tab) { 
    chrome.tabs.executeScript(null, { file: 'background/view.js' });
  }
});