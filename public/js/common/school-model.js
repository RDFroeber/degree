'use strict';

angular.module('degreeApp.models.schools', [
  // dependencies
])
  .service('SchoolModel', function($http){
    var model = this,
        URLS = {
          FETCH: 'http://localhost:8080/api/v1.1/schools'
        },
        schools;

    function getData(result){
      return result.data;
    }

    function cacheSchools(result){
      schools = getData(result);
      return schools;
    }

    model.getCourses = function(){
      return $http.get(URLS.FETCH).then(cacheSchools);
    }
  });