'use strict';

var expect = require('chai').expect,
    Course = require('../../models/Course');

describe('Course', function() {
  var schema = Course.schema.paths;

  it('should exist', function() {
    expect(Course).to.exist;
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

  describe('.courseType', function() {
    it('should exist and be a String', function() {
      expect(schema.courseType).to.exist;
      expect(schema.courseType.instance).to.equal('String');
    });

    it('should only be: Lecture, Seminar, Lab, or Independent', function() {
      expect(schema.courseType.options.enum).to.include.members(['Lecture', 'Seminar', 'Lab', 'Independent']);
    });
  });

  describe('.number', function() {
    it('should exist and be a String', function() {
      expect(schema.number).to.exist;
      expect(schema.number.instance).to.equal('String');
    });

    it('should be an index (unique)', function() {
      expect(schema.number._index).to.not.equal(null);
    });

    it('should be required', function() {
      expect(schema.number.options.required).to.equal(true);
    });
  });

  describe('.department', function() {
    it('should exist and be a String', function() {
      expect(schema.department).to.exist;
      expect(schema.department.instance).to.equal('String');
    });

    it('should be required', function() {
      expect(schema.department.options.required).to.equal(true);
    });
  });

  describe('.units', function() {
    it('should exist and be a Number', function() {
      expect(schema.units).to.exist;
      expect(schema.units.instance).to.equal('Number');
    });

    it('should be required', function() {
      expect(schema.units.options.required).to.equal(true);
    });

    it('should default to: 3', function() {
      expect(schema.units.options.default).to.equal(3);
    });
  });

  describe('enrollment:', function() {
    describe('.current', function() {
      it('should exist and be a Number', function() {
        expect(schema['enrollment.current']).to.exist;
        expect(schema['enrollment.current'].instance).to.equal('Number');
      });
    });

    describe('.max', function() {
      it('should exist and be a Number', function() {
        expect(schema['enrollment.max']).to.exist;
        expect(schema['enrollment.max'].instance).to.equal('Number');
      });
    });
  });

  describe('.gradeScale', function() {
    it('should exist and be a String', function() {
      expect(schema.gradeScale).to.exist;
      expect(schema.gradeScale.instance).to.equal('String');
    });

    it('should only be: pass/fail or 4.0', function() {
      expect(schema.gradeScale.options.enum).to.include.members(['pass/fail', '4.0']);
    });
  });

  describe('.approval', function() {
    it('should exist and be a Boolean', function() {
      expect(schema.approval).to.exist;
      expect(schema.approval.options.type.name).to.equal('Boolean');
    });

    it('should default to: false', function() {
      expect(schema.approval.options.default).to.equal(false);
    });
  });

  describe('.description', function() {
    it('should exist and be a String', function() {
      expect(schema.description).to.exist;
      expect(schema.description.instance).to.equal('String');
    });

    it('should be required', function() {
      expect(schema.description.options.required).to.equal(true);
    });
  });

  describe('sections:', function() {
    var sectionSchema = schema.sections.schema.paths; // Embedded Document

    describe('.number', function() {
      it('should exist and be a String', function() {
        expect(sectionSchema.number).to.exist;
        expect(sectionSchema.number.options.type.name).to.equal('String');
      });
    });

    describe('.instructor', function() {
      it('should exist and be a String', function() {
        expect(sectionSchema.instructor).to.exist;
        expect(sectionSchema.instructor.options.type.name).to.equal('String');
      });
    });

    describe('.day', function() {
      it('should exist and be a String', function() {
        expect(sectionSchema.day).to.exist;
        expect(sectionSchema.day.instance).to.equal('String');
      });

      it('should only be: M, Tu, W, Th, F, Sa, Su, M/W, Tu/Th, M/W/F, OT', function() {
        expect(sectionSchema.day.options.enum).to.include.members(['M','Tu','W','Th','F','Sa','Su','M/W','Tu/Th','M/W/F','OT']);
      });
    });

    describe('.time', function() {
      it('should exist and be a String', function() {
        expect(sectionSchema.time).to.exist;
        expect(sectionSchema.time.options.type.name).to.equal('String');
      });
    });

    describe('.location', function() {
      it('should exist and be a String', function() {
        expect(sectionSchema.location).to.exist;
        expect(sectionSchema.location.options.type.name).to.equal('String');
      });
    });

    describe('.semester', function() {
      it('should exist and be a String', function() {
        expect(sectionSchema.semester).to.exist;
        expect(sectionSchema.semester.options.type.name).to.equal('String');
      });
    });
  });

  describe('.courseLength', function() {
    it('should exist and be a Number', function() {
      expect(schema.courseLength).to.exist;
      expect(schema.courseLength.instance).to.equal('Number');
    });

    it('should default to: 1', function() {
      expect(schema.courseLength.options.default).to.equal(1);
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