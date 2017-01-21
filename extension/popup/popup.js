$( document ).ready(function() {
  
  $('#signin').on('click', function(event) {
    event.preventDefault();
    //var url = 'http://bytespaces.com/api/users/login';
    var url = 'http://localhost:3000/api/users/login';
    post(url);
  });

  $('#signup').on('click', function(event) {
    event.preventDefault(); 
    //var url = 'http://bytespaces.com/api/users/signup';
    var url = 'http://localhost:3000/api/users/signup';
    post(url);
  });

  function post(url) {
    var data = {
      username: $('#user').val(),
      password: $('#pass').val()
    }
    console.log(data);
    
    $.ajax({
      url: url, 
      type: 'POST', 
      data: JSON.stringify(data),
      contentType: "application/json",
      xhrFields: {
       withCredentials: true
      },
      success: function(data){
        $( "#pop-form" ).hide();
      }
    });
  }
});


