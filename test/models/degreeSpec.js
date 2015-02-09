'use strict';

var expect = require('chai').expect,
    Degree = require('../../models/Degree');

describe('Degree', function() {
  var schema = Degree.schema.paths;

  it('should exist', function() {
    expect(Degree).to.exist;
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

  describe('.specialization', function() {
    it('should exist and be a String', function() {
      expect(schema.specialization).to.exist;
      expect(schema.specialization.instance).to.equal('String');
    });

    it('should be required', function() {
      expect(schema.specialization.options.required).to.equal(true);
    });
  });

  describe('.credits', function() {
    it('should exist and be a Number', function() {
      expect(schema.credits).to.exist;
      expect(schema.credits.instance).to.equal('Number');
    });

    it('should be required', function() {
      expect(schema.credits.options.required).to.equal(true);
    });
  });
  
  describe('prerequisites:', function() {
    describe('.totalReq', function() {
      it('should exist and be a number', function() {
        expect(schema['prerequisites.totalReq']).to.exist;
        expect(schema['prerequisites.totalReq'].options.type.name).to.equal('Number');
      });
    });

    describe('.requirements', function() {
      var requirements = schema['prerequisites.requirements'].caster; // Embedded Reference

      it('should exist and be an Object Id', function() {
        expect(requirements).to.exist;
        expect(requirements.instance).to.equal('ObjectID');
      });

      it('should reference Requirement', function() {
        expect(requirements.options.ref).to.equal('Requirement');
      });
    });
  });

  describe('core:', function() {
    describe('.totalReq', function() {
      it('should exist and be a number', function() {
        expect(schema['core.totalReq']).to.exist;
        expect(schema['core.totalReq'].options.type.name).to.equal('Number');
      });
    });

    describe('.requirements', function() {
      var requirements = schema['core.requirements'].caster; // Embedded Reference

      it('should exist and be an Object Id', function() {
        expect(requirements).to.exist;
        expect(requirements.instance).to.equal('ObjectID');
      });

      it('should reference Requirement', function() {
        expect(requirements.options.ref).to.equal('Requirement');
      });
    });
  });

  describe('tracks:', function() {
    var trackSchema = schema.tracks.schema.paths; // Embedded Document
    describe('.totalReq', function() {
      it('should exist and be a number', function() {
        expect(trackSchema.totalReq).to.exist;
        expect(trackSchema.totalReq.options.type.name).to.equal('Number');
      });
    });

    describe('.requirements', function() {
      var requirements = trackSchema.requirements.caster; // Embedded Reference

      it('should exist and be an Object Id', function() {
        expect(requirements).to.exist;
        expect(requirements.instance).to.equal('ObjectID');
      });

      it('should reference Requirement', function() {
        expect(requirements.options.ref).to.equal('Requirement');
      });
    });
  });

  describe('electives:', function() {
    describe('.totalReq', function() {
      it('should exist and be a number', function() {
        expect(schema['electives.totalReq']).to.exist;
        expect(schema['electives.totalReq'].options.type.name).to.equal('Number');
      });
    });

    describe('.requirements', function() {
      var requirements = schema['electives.requirements'].caster; // Embedded Reference

      it('should exist and be an Object Id', function() {
        expect(requirements).to.exist;
        expect(requirements.instance).to.equal('ObjectID');
      });

      it('should reference Requirement', function() {
        expect(requirements.options.ref).to.equal('Requirement');
      });
    });
  });

  describe('.school', function() {
   it('should exist and be an Object Id', function() {
      expect(schema.school).to.exist;
      expect(schema.school.instance).to.equal('ObjectID');
    });

    it('should reference Requirement', function() {
      expect(schema.school.options.ref).to.equal('School');
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