new Vue({

  // We want to target the div with an id of 'events'
  el: '#WebpageTrends',

  // Here we can register any values or collections that hold data
  // for the application
  data: {
    Webpages: []
  },

  mounted: function() {
    this.fetchEvents();
  },

  // Methods we want to use in our application are registered here
  methods: {

    // We dedicate a method to retrieving and setting some data
    fetchEvents: function() {
      var vm = this;
      $.ajax({
        url: 'http://localhost:3000/api/trending',
        type: 'GET',
        xhrFields: {
         withCredentials: true
        },
        success: function(Webpages){
          vm.Webpages = Webpages.data;
        }
      });
    }
  }

});