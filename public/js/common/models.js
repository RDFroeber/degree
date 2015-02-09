'use strict';

angular.module('degreeApp.models', [
  // dependencies
])
  .service('CourseModel', function($http){
    var model = this,
        URLS = {
          FETCH: 'http://localhost:8080/api/v1.1/courses'
        },
        courses;

    function getData(result){
      return result.data;
    }

    function cacheCourses(result){
      courses = getData(result);
      return courses;
    }

    model.getCourses = function(){
      return $http.get(URLS.FETCH).then(cacheCourses);
    }
  });