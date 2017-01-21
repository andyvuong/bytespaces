$( document ).ready(function() {
  
  $('#signin').on('click', function(event) {
    event.preventDefault();
    //var url = 'http://bytespaces.com/api/users/signup';
    var url = 'http://localhost:3000/api/users/signup';
    post(url);
  });

  $('#signup').on('click', function(event) {
    event.preventDefault(); 
    //var url = 'http://bytespaces.com/api/users/login';
    var url = 'http://localhost:3000/api/users/login';
    post(url);
  });

  function post(url) {
    $.ajax({
      url: url, 
      type: 'POST', 
      data: $('#form-bs').serialize(),
      success: function(data){
           alert('successfully submitted');
      }
    });
  }
});


