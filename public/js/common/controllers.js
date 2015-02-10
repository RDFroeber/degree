'use strict';

angular.module('degreeApp.controllers', [
  'degreeApp.models'
])
  .controller('CoursesListCtrl', function CourseCtrl($scope, CourseModel) {
    var coursesListCrtl = this;
    $scope.departments = ['Computer Science', 'Mathematics'];
    $scope.currentDepartment = 'Computer Science';

    CourseModel.getCourses()
      .then(function(result){
        $scope.courses = result;
      });

     function setCurrentDepartment(department){
        $scope.currentDepartment = department;
      }

      function isCurrentDepartment(department){
        return $scope.currentDepartment !== null && department === $scope.currentDepartment
      }

      $scope.setCurrentDepartment = setCurrentDepartment;
      $scope.isCurrentDepartment = isCurrentDepartment;

  });
