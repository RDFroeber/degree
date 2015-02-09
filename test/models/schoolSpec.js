'use strict';

var expect = require('chai').expect,
    School = require('../../models/School');

describe('School', function() {
  var schema = School.schema.paths;

  it('should exist', function() {
    expect(School).to.exist;
  });

  describe('.name', function() {
    it('should exist and be a String', function() {
      expect(schema.name).to.exist;
      expect(schema.name.instance).to.equal('String');
    });

    it('should be required', function() {
      expect(schema.name.options.required).to.equal(true);
    });
  });

  describe('.description', function() {
    it('should exist and be a String', function() {
      expect(schema.description).to.exist;
      expect(schema.description.instance).to.equal('String');
    });
  });

  describe('degrees:', function() {
    describe('.degree', function() {
       it('should exist and be an Object Id', function() {
        expect(schema.degrees.caster).to.exist;
        expect(schema.degrees.caster.instance).to.equal('ObjectID');
      });

      it('should reference Degree', function() {
        expect(schema.degrees.caster.options.ref).to.equal('Degree');
      });
    });
  });


  describe('timestamps:', function() {
    describe('.createdAt', function() {
      it('should exist and be a Date', function() {
        expect(schema.createdAt).to.exist;
        expect(schema.createdAt.options.type.name).to.equal('Date');
      });
    });

    describe('.updatedAt', function() {
      it('should exist and be a Date', function() {
        expect(schema.updatedAt).to.exist;
        expect(schema.updatedAt.options.type.name).to.equal('Date');
      });
    });
  });

});