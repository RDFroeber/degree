var expect = require('chai').expect;

describe('Hapi Degree Tests', function (){

  describe('Models:', function () {
    require('./models/studentSpec');
    require('./models/degreeSpec');
    require('./models/courseSpec');
    require('./models/requirementSpec');
  });

  describe('Controllers:', function () {
    // TODO: Add tests
  });

});