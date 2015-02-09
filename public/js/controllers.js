'use strict';

angular.module('degreeApp.controllers', [
  'degreeApp.models'
])
  .controller('IndexCtrl', function($scope, StudentModel) {
      $scope.world = "world";

      $scope.currentStudent = null;

      $scope.students = StudentModel.getStudents();

      function setCurrentStudent(student){
        $scope.currentStudent = student;
      }

      $scope.setCurrentStudent = setCurrentStudent;
  })
  .controller('CoursesListCtrl', function CourseCtrl($scope, CourseModel) {
    var coursesListCrtl = this;
    $scope.departments = ['Computer Science', 'Mathematics'];
    $scope.currentDepartment = 'Computer Science';

    CourseModel.getCourses()
      .then(function(result){
        console.log('result', result)
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
