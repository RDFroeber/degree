'use strict';

angular.module('degreeApp.controllers', [])
  // IndexCtrl
  .controller('IndexCtrl', function($scope, crResources, $route) {
            
  })
  .controller('DegreeListCtrl', function($scope, $http) {
    $http.get('/api/v1.1/degrees').success(function(data) {
      $scope.degrees = data;
    });
  })
  .controller('DegreeDetailCtrl', function($scope, $routeParams) {
    $scope.degreeName = $routeParams.degreeName;
  });