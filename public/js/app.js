'use strict';

angular.module('degreeApp', [
  'ui.router',
  'students',
  'schools',
  'degreeApp.controllers'
])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/templates/dashboard.tmpl.html',
        controller: 'IndexCtrl'
      })
      .state('about', {
        url: '/about',
        template: '<h3>Hey hey we\'re the Monkeys!</h3>'
      })
      .state('account', {
        url: '/dashboard',
        templateUrl: '/js/students/students.tmpl.html',
        controller: 'StudentsAccountCtrl'
      })
      .state('student-list', {
        url: '/students',
        templateUrl: '/js/students/students.tmpl.html',
        controller: 'StudentsListCtrl'
      })
      .state('school-list', {
        url: '/schools',
        templateUrl: '/js/schools/schools.tmpl.html',
        controller: 'SchoolsListCtrl'
      })
      .state('course-list', {
        url: '/courses',
        templateUrl: '/templates/courses.tmpl.html',
        controller: 'CoursesListCtrl'
      })

  })
  .controller('IndexCtrl', function($scope, StudentModel) {
      $scope.students = StudentModel.getStudents();
      $scope.currentStudent = $scope.students[0];
  })
