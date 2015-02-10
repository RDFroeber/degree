'use strict';

angular.module('schools', [
  'schools.create',
  'schools.edit',
  'degreeApp.models.schools'
])
  .controller('SchoolsListCtrl', function CourseCtrl($scope, SchoolModel) {
    var schoolsListCrtl = this;

    function resetCreateForm(argument) {
      $scope.newSchool = {name: '', description: ''}
    }

    function createSchool(school){
      $scope.schools.push(school);
      resetCreateForm();
    }

    SchoolModel.getCourses()
      .then(function(result){
        $scope.schools = result;
      });
      
    $scope.createSchool = createSchool;
  })