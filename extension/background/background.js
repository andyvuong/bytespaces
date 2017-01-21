chrome.contextMenus.create({title: "Bytespaces: Comment", 
  contexts:["selection"],
  onclick: function(info, tab) { 
    chrome.tabs.executeScript(null, { file: 'background/selection.js' });
  }
});