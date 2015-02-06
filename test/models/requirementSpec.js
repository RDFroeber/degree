'use strict';

var expect = require('chai').expect,
    Requirement = require('../../models/Requirement');

describe('Requirement', function() {
  var schema = Requirement.schema.paths;

  it('should exist', function() {
    expect(Requirement).to.exist;
  });

  describe('.reqType', function() {
    it('should exist and be a String', function() {
      expect(schema.reqType).to.exist;
      expect(schema.reqType.instance).to.equal('String');
    });

    it('should be required', function() {
      expect(schema.reqType.options.required).to.equal(true);
    });

    it('should only be: core, track, elective, or prerequisite', function() {
      expect(schema.reqType.options.enum).to.include.members(['core', 'track', 'elective', 'prerequisite']);
    });
  });

  describe('.course', function() {
     it('should exist and be an Object Id', function() {
      expect(schema.course).to.exist;
      expect(schema.course.instance).to.equal('ObjectID');
    });

    it('should reference Course', function() {
      expect(schema.course.options.ref).to.equal('Course');
    });
  });

  describe('substitutes:', function() {
    describe('.exist', function() {
      it('should exist and be a Boolean', function() {
        expect(schema['substitutes.exist']).to.exist;
        expect(schema['substitutes.exist'].options.type.name).to.equal('Boolean');
      });
    });

    describe('.options', function() {
      var options = schema['substitutes.options'].caster; // Embedded Reference

      it('should exist and be an Object Id', function() {
        expect(options).to.exist;
        expect(options.instance).to.equal('ObjectID');
      });

      it('should reference Course', function() {
        expect(options.options.ref).to.equal('Course');
      });
    });
  });

  describe('restriction:', function() {
    describe('.resType', function() {
      it('should resType and be a String', function() {
        expect(schema['restriction.resType']).to.exist;
        expect(schema['restriction.resType'].options.type.name).to.equal('String');
      });

      it('should only be: department, course, level, or approval', function() {
        expect(schema['restriction.resType'].options.enum).to.include.members(['department', 'course', 'level', 'approval']);
      });
    });

    describe('.options', function() {
      it('should options and be a Array', function() {
        expect(schema['restriction.options']).to.exist;
        expect(schema['restriction.options'].options.type.name).to.equal('Array');
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