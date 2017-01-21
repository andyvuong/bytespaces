$( document ).ready(function() {
  
  // initiate the popup
  get('http://localhost:3000/api/users/profile', function(data) {
    if ( data.user ) {
      $( "#pop-form, #err" ).hide(10, function() {
        render(data);
      });
    }
  });

  $('#signin').on('click', function(event) {
    event.preventDefault();
    //var url = 'http://bytespaces.com/api/users/login';
    var url = 'http://localhost:3000/api/users/login';
    post(url, function(data) {
      $( "#pop-form, #err" ).hide(10, function() {
        render(data);
      });
    }, function(data) {
      $('#err').append('Invalid login!');
    });
  });

  $('#signup').on('click', function(event) {
    event.preventDefault(); 
    //var url = 'http://bytespaces.com/api/users/signup';
    var url = 'http://localhost:3000/api/users/signup';
    post(url, function(data) {
      $( "#pop-form, #err" ).hide(10, function() {
        render(data);
      });
    }, function(data) {
      $('#err').append('Invalid sign in!');
    });
  });

});

function render(data) {
  $('#addition').show();
  $('#addition h3').text('Welcome ' + data.user.username);
  $('#addition h5').text('Your Points: ' + data.user.points);
}

function post(url, scb, fcb) {
  var data = {
    username: $('#user').val(),
    password: $('#pass').val()
  }
  
  $.ajax({
    url: url, 
    type: 'POST', 
    data: JSON.stringify(data),
    contentType: "application/json",
    xhrFields: {
     withCredentials: true
    },
    success: function(data) {
      scb(data);
    },
    error: function(data) {
      fcb(data);
    }
  });
}

function get(url, callback) {    
  $.ajax({
    url: url, 
    type: 'GET', 
    xhrFields: {
     withCredentials: true
    },
    success: function(data){
      callback(data);
    }
  });
}
