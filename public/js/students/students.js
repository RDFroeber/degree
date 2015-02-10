'use strict';

angular.module('students', [
  'degreeApp.models.student'
])
  .controller('StudentsListCtrl', function CourseCtrl($scope, StudentModel) {
    $scope.world = "world";

    $scope.currentStudent = null;

    $scope.students = StudentModel.getStudents();

    function setCurrentStudent(student){
      $scope.currentStudent = student;
    }

    $scope.setCurrentStudent = setCurrentStudent;
  })