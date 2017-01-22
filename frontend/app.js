var app = angular.module('bytespaces', []);

app.factory('API', function($http) {
  return {
    getTrending : function(type, order, term){
      return $http.get('http://www.bytespaces.com/api/trending', {params: {'type': type, 'order': order, 'term': term}});
    }
  }
});

app.controller('DashboardController', ['$window','$scope', 'API', function($window, $scope, API){
  $scope.Webpages = [];
  $scope.query = { 'type': 'date', 'order': '1', 'term': '' };
  getTrending($scope.query);

  function getTrending(query){
    API.getTrending(query.type, query.order, query.term)
      .then(function(response){
        $scope.Webpages = response.data.data;
        $scope.status = true;
      }, function(response){
        $scope.status = false;
      });
  }


  $scope.search = function(query){
    getTrending(query);
  };

}]);