$.get(chrome.extension.getURL('views/overlay.html'), function(data) {
    $(data).appendTo('body');
    $('#comment-list').empty();
    openNav();
    $( "#close-overlay" ).click(function(event) {
      event.stopPropagation();
      document.getElementById("mySidenav").style.width = "0";
      document.body.style.marginLeft= "0";
    });
    
    $( "#bytespaces-butt" ).unbind().click(function(event) {
      event.stopPropagation();
      sendRequest();  
    });

    chrome.runtime.sendMessage({type: 'get', url: window.location.href}, function(response) {
      console.log(response);
      var data = response.data;
      for (var i = 0; i < data.length; i++ ) {
        console.log(data[i]);
        var d = new Date(Date.parse(data[i].date));
        var comment = '<strong>' + data[i].username + '</strong> said... <br>' + data[i].content + '<br><small class="date">' + d.toString() + '</small>';
        $('#comment-list').append('<li>' + comment + '</li>');
      }
    });
});

function openNav() {
  document.getElementById("mySidenav").style.width = "23%";
  document.body.style.marginLeft = "23%";
}

function sendRequest() {
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