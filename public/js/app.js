angular.module('degreeApp', [
  // 'degreeApp.controllers'
])
  .controller('IndexCtrl', function($scope) {
      $scope.world = "world";
      $scope.students = [{
        firstName: "Jason",
        lastName: "Merlin",
        email: "jmerlin@gmail.com",
        gender: "male",
        address: {
          street: "320 E 22nd St, Apt 8E",
          city: "New York",
          state: "NY",
          zipcode: "10010"
        },
        phone: "800-888-1111",
        picture: "/public/img/Graduate-male-64.png",
        school: "NYU"
      },{
        firstName: "Raleigh",
        lastName: "Daniel",
        email: "rdfroeber@gmail.com",
        gender: "female",
        address: {
          street: "155 E 48th St, Apt 12F",
          city: "New York",
          state: "NY",
          zipcode: "10022"
        },
        phone: "800-888-9999",
        picture: "/public/img/Graduate-female-64.png",
        school: "Columbia"
      }];
  });


  