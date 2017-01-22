var s = document.getSelection();
var oRange = s.getRangeAt(0);
var objectRect = oRange.getBoundingClientRect();

if ( $('#bytespaces-area').length < 1 ) {
  render();
}

function render() {
  // magic nums for now sorry
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
  var offsetLeft = 100; // should align left of comment s.t right is at start of bounding
  commentBox.style.top = objectRect.top +  scrollTop + "px";
  commentBox.style.left = objectRect.left + scrollLeft - offsetLeft +"px";

  document.getElementById("bytespaces-box").className = "bytespaces-comment";
  document.getElementById("bytespaces-area").className = "bytespaces-input";
  document.getElementById("bytespaces-butt").className = "bytespaces-button";

  document.getElementById("bytespaces-butt").addEventListener("click", sendRequest, false);
}

function sendRequest() {
  if ( $('#bytespaces-area').val() && $('#bytespaces-area').val().trim().length === 0 ) {
    $('#bytespaces-box').remove();
  } else {
    chrome.storage.local.get('username', function(items) {
      var name = items.username;
      var pos = $('#bytespaces-box').position();
      var data = {
        username: name,
        content: $('#bytespaces-area').val(),
        title: $('title').text(),
        url: window.location.href,
        x: pos.left,
        y: pos.top,
        gridIndex: computeGridIndex(pos.top)
      };

      chrome.runtime.sendMessage({request: JSON.stringify(data)}, function(response) {
        $('#bytespaces-box').remove();
      });
    });    
  }
}

function computeGridIndex(x) {
  var smallest = 0;
  var largest = $(document).height(); 
  var min = 0;
  var max = 12;
  var val = Math.round(min + (max - min) / (largest - smallest) * (x - smallest));
  if ( val > max ) {
    return max;
  }
  return val;
}



