$.get(chrome.extension.getURL('views/overlay.html'), function(data) {
    $(data).appendTo('body');
    openNav();
    $( "#close-overlay" ).click(function() {
      document.getElementById("mySidenav").style.width = "0";
      document.body.style.marginLeft= "0";
    });
    document.getElementById("bytespaces-butt").addEventListener("click", sendRequest, false);

    chrome.runtime.sendMessage({type: 'get', url: window.location.href}, function(response) {
      console.log(response);
    });
});

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.body.style.marginLeft = "250px";
}

function sendRequest() {
  console.log(12);
  if ( $('#bytespaces-area').val() && $('#bytespaces-area').val().trim().length > 0 ) {
    chrome.storage.local.get('username', function(items) {
      var name = items.username;
      var pos = $('#bytespaces-butt').position();
      var data = {
        username: name,
        content: $('#bytespaces-area').val(),
        title: $('title').text(),
        url: window.location.href,
        x: pos.left,
        y: pos.top,
        gridIndex: 0
      };
      chrome.runtime.sendMessage({request: JSON.stringify(data)}, function(response) {
        $('#bytespaces-area').val('');
      });
    });    
  }
}