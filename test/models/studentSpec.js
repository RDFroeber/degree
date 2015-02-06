'use strict';

var expect = require('chai').expect,
    Student = require('../../models/Student');

describe('Student', function() {
  var schema = Student.schema.paths;

  it('should exist', function() {
    expect(Student).to.exist;
  });

  describe('.firstName', function() {
    it('should exist and be a String', function() {
      expect(schema.firstName).to.exist;
      expect(schema.firstName.instance).to.equal('String');
    });
  });

  describe('.lastName', function() {
    it('should exist and be a String', function() {
      expect(schema.lastName).to.exist;
      expect(schema.lastName.instance).to.equal('String');
    });
  });

  describe('.email', function() {
    it('should exist and be a String', function() {
      expect(schema.email).to.exist;
      expect(schema.email.instance).to.equal('String');
    });

    it('should be an index', function() {
      expect(schema.email._index).to.not.equal(null);
    });

    it('should be lowercase', function() {
      expect(schema.email.options.lowercase).to.equal(true);
    });

    it('should be required', function() {
      expect(schema.email.options.required).to.equal(true);
    });
  });

  describe('.gender', function() {
    it('should exist and be a String', function() {
      expect(schema.gender).to.exist;
      expect(schema.gender.instance).to.equal('String');
    });

    it('should only be: female, male, or undisclosed', function() {
      expect(schema.gender.options.enum).to.include.members([ 'female', 'male', 'undisclosed' ]);
    });
  });

  describe('google:', function() {
    describe('.id', function() {
      it('should exist and be a String', function() {
        expect(schema['google.id']).to.exist;
        expect(schema['google.id'].instance).to.equal('String');
      });
    });

    describe('.token', function() {
      it('should exist and be a String', function() {
        expect(schema['google.token']).to.exist;
        expect(schema['google.token'].instance).to.equal('String');
      });
    });
  });

  describe('.picture', function() {
    it('should exist and be a String', function() {
      expect(schema.picture).to.exist;
      expect(schema.picture.instance).to.equal('String');
    });

    it('should default to: defaultImgpath', function() {
      expect(schema.picture.options.default).to.equal('defaultImgpath');
    });
  });

  describe('.phone', function() {
    it('should exist and be a String', function() {
      expect(schema.phone).to.exist;
      expect(schema.phone.instance).to.be.a('String');
    });
  });

  describe('address:', function() {
    describe('.street', function() {
      it('should exist and be a String', function() {
        expect(schema['address.street']).to.exist;
        expect(schema['address.street'].instance).to.equal('String');
      });
    });

    describe('.city', function() {
      it('should exist and be a String', function() {
        expect(schema['address.city']).to.exist;
        expect(schema['address.city'].instance).to.equal('String');
      });
    });

    describe('.state', function() {
      it('should exist and be a String', function() {
        expect(schema['address.state']).to.exist;
        expect(schema['address.state'].instance).to.equal('String');
      });
    });

    describe('.zipcode', function() {
      it('should exist and be a Number', function() {
        expect(schema['address.zipcode']).to.exist;
        expect(schema['address.zipcode'].instance).to.equal('Number');
      });
    });
  });

  describe('.gradYr', function() {
    it('should exist and be a Number', function() {
      expect(schema.gradYr).to.exist;
      expect(schema.gradYr.instance).to.equal('Number');
    });
  });

  describe('.degree', function() {
    it('should exist and be an Object Id', function() {
      expect(schema.degree).to.exist;
      expect(schema.degree.instance).to.equal('ObjectID');
    });

    it('should reference Degree', function() {
      expect(schema.degree.options.ref).to.equal('Degree');
    });
  });

  describe('.track', function() {
    it('should exist and be a String', function() {
      expect(schema.track).to.exist;
      expect(schema.track.instance).to.equal('String');
    });
  });

  describe('semesters:', function() {
    var semSchema = schema.semesters.schema.paths; // Embedded Document

    describe('.date', function() {
      it('should exist and be a String', function() {
        expect(semSchema.date).to.exist;
        expect(semSchema.date.options.type.name).to.equal('String');
      });

      it('should be required', function() {
        expect(semSchema.date.options.required).to.equal(true);
      });
    });

    describe('.complete', function() {
      it('should exist and be a Boolean', function() {
        expect(semSchema.complete).to.exist;
        expect(semSchema.complete.options.type.name).to.equal('Boolean');
      });
    });

    describe('courses:', function() {
      var courseSchema = semSchema.courses.schema.paths; // Embedded Document

      describe('.course', function() {
         it('should exist and be an Object Id', function() {
          expect(courseSchema.course).to.exist;
          expect(courseSchema.course.instance).to.equal('ObjectID');
        });

        it('should reference Course', function() {
          expect(courseSchema.course.options.ref).to.equal('Course');
        });
      });

      describe('.instructor', function() {
        it('should exist and be a String', function() {
          expect(courseSchema.instructor).to.exist;
          expect(courseSchema.instructor.options.type.name).to.equal('String');
        });
      });

      describe('.status', function() {
        it('should exist and be a String', function() {
          expect(courseSchema.status).to.exist;
          expect(courseSchema.status.options.type.name).to.equal('String');
        });

        it('should only be: active, completed, or dropped', function() {
          expect(courseSchema.status.options.enum).to.include.members(['active', 'completed', 'dropped']);
        });
      });

      describe('.grade', function() {
        it('should exist and be a String', function() {
          expect(courseSchema.grade).to.exist;
          expect(courseSchema.grade.options.type.name).to.equal('String');
        });
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