var s = document.getSelection();
var oRange = s.getRangeAt(0);
var objectRect = oRange.getBoundingClientRect();
render();

function render() {
  var commentBox = document.createElement("div"); 
  commentBox.setAttribute("id", "bytespaces-box");
  var commentArea = document.createElement("textarea"); 
  commentArea.setAttribute("id", "bytespaces-area");
  var commentButton = document.createElement("button");
  commentButton.setAttribute("id", "bytespaces-butt");

  commentArea.setAttribute('type', 'text');
  commentArea.setAttribute('rows', '6');
  commentArea.setAttribute('cols', '20');

  commentButton.setAttribute('type', 'submit');
  commentButton.innerHTML = 'Submit';

  document.body.appendChild(commentBox);
  commentBox.appendChild(commentArea);
  commentBox.appendChild(commentButton);

  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  commentBox.style.position = 'absolute';
  commentBox.style.top = objectRect.top +  scrollTop + "px";
  commentBox.style.left = objectRect.left + scrollLeft + "px";

  document.getElementById("bytespaces-box").className = "bytespaces-comment";
  document.getElementById("bytespaces-area").className = "bytespaces-input";
  document.getElementById("bytespaces-butt").className = "bytespaces-button";

  document.getElementById("bytespaces-butt").addEventListener("click", sendRequest, false);
}

function sendRequest() {
  if ( $('#bytespaces-area').val() && $('#bytespaces-area').val().length === 0 ) {
    $('#bytespaces-box').remove();
  } else {
    chrome.storage.local.get('username', function(items) {
      var name = items.username;
      var data = {
        username: name,
        comment: $('#bytespaces-area').val(),
        title: $('title').text(),
        url: window.location.href
      }

      chrome.runtime.sendMessage({request: JSON.stringify(data)}, function(response) {
        $('#bytespaces-box').remove();
      });
    });    
  }
}
