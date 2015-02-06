'use strict';

/**
 * API Routes
 **/

var Joi = require('joi'),
    ctrl = require('../controllers');

var apiRoutes = [
  {
    method: 'POST',
    path: '/students',
    config: {
      handler: ctrl.students.create,
      description: 'Creates a Student',
      tags: ['api', 'students'],
      validate: {
        payload: {
          firstName: Joi.string().trim().min(3).max(100),
          lastName: Joi.string().trim().min(8).max(100),
          email: Joi.string().email().trim().required(),
          picture: Joi.string().trim().min(8).max(100),
          gender: Joi.string().valid('female', 'male', 'undisclosed'),
          google: {
            token: Joi.string().token(),
            id: Joi.string().alphanum()
          },
          address: {
            street: Joi.string().trim().min(20).max(150),
            city: Joi.string().trim().min(3).max(50),
            state: Joi.string().trim().length(2),
            zipcode: Joi.number().integer().min(5).max(5),
          },
          phone: Joi.string().regex(/(\(?[0-9]{3}\)?|[0-9]{3}).?[0-9]{3}.?[0-9]{4}/, 'US number'),
          gradYr: Joi.number().integer().min(4).max(4),
          degree: Joi.string().alphanum(),
          track: Joi.string().trim().min(3).max(50),
          semesters: Joi.array().includes(
            Joi.object().keys({
              date: Joi.string().trim().min(9).max(11).required(),
              complete: Joi.boolean(),
              courses: Joi.array().includes(
                Joi.object().keys({
                  course: Joi.string().alphanum(),
                  section: Joi.string().trim().min(3).max(50),
                  status: Joi.string().valid('active', 'completed', 'dropped'),
                  grade: Joi.string().trim().min(1).max(4),
                })
              )
            })
          )
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 201, message: 'Created' },
            { code: 400, message: 'Bad Request' },
            { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'GET',
    path: '/students/{id}',
    config: {
      handler: ctrl.students.findById,
      description: 'Finds a Student by id',
      tags: ['api', 'students'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 200, message: 'OK' },
            { code: 400, message: 'Bad Request' },
            { code: 404, message: 'Student Not Found' },
            { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'GET',
    path: '/students',
    config: {
      handler: ctrl.students.findByEmail,
      description: 'Finds a Student by email query',
      tags: ['api', 'students'],
      validate: {
        query: {
          email: Joi.string().email().trim().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 200, message: 'OK' },
            { code: 400, message: 'Bad Request' },
            { code: 404, message: 'Student Not Found' },
            { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'PUT',
    path: '/students/{id}',
    config: {
      handler: ctrl.students.updateById,
      description: 'Updates a Student',
      tags: ['api', 'students'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        },
        payload: {
          id: Joi.string().alphanum(),
          firstName: Joi.string().trim().min(3).max(100),
          lastName: Joi.string().trim().min(8).max(100),
          email: Joi.string().email().trim(),
          picture: Joi.string().trim().min(8).max(100),
          gender: Joi.string().valid('female', 'male', 'undisclosed'),
          google: {
            token: Joi.string().token(),
            id: Joi.string().alphanum()
          },
          address: {
            street: Joi.string().trim().min(20).max(150),
            city: Joi.string().trim().min(3).max(50),
            state: Joi.string().trim().length(2),
            zipcode: Joi.number().integer().min(5).max(5),
          },
          phone: Joi.string().regex(/(\(?[0-9]{3}\)?|[0-9]{3}).?[0-9]{3}.?[0-9]{4}/, 'US number'),
          gradYr: Joi.number().integer().min(4).max(4),
          degree: Joi.string().alphanum(),
          track: Joi.string().trim().min(3).max(50),
          semesters: Joi.array().includes(
            Joi.object().keys({
              date: Joi.string().trim().min(9).max(11).required(),
              complete: Joi.boolean(),
              courses: Joi.array().includes(
                Joi.object().keys({
                  course: Joi.string().alphanum(),
                  section: Joi.string().trim().min(3).max(50),
                  status: Joi.string().valid('active', 'completed', 'dropped'),
                  grade: Joi.string().trim().min(1).max(4),
                })
              )
            })
          )
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 200, message: 'OK' },
            { code: 400, message: 'Bad Request' },
            { code: 404, message: 'Student Not Found' },
            { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'DELETE',
    path: '/students/{id}',
    config: {
      handler: ctrl.students.hardDelete,
      description: 'Permanently deletes a Student',
      tags: ['api', 'students'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 200, message: 'OK' },
            { code: 400, message: 'Bad Request' },
            { code: 404, message: 'Student Not Found' },
            { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'POST',
    path: '/degrees',
    config: {
      handler: ctrl.degrees.create,
      description: 'Creates a Degree',
      tags: ['api', 'degrees'],
      validate: {
        payload: {
          name: Joi.string().trim().min(3).max(100).required(),
          credits: Joi.number().precision(1).required(),
          core: Joi.object().keys({
            totalReq: Joi.number().integer().min(1).max(60),
            requirements: Joi.array().includes(Joi.string().alphanum())
          }),
          tracks: Joi.array().includes(
            Joi.object().keys({
              name: Joi.string().trim().min(3).max(100).required(),
              totalReq: Joi.number().integer().min(1).max(60),
              requirements: Joi.array().includes(Joi.string().alphanum())
            })
          ),
          electives: Joi.object().keys({
            totalReq: Joi.number().integer().min(1).max(60),
            requirements: Joi.array().includes(Joi.string().alphanum())
          })
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 201, message: 'Created' },
            { code: 400, message: 'Bad Request' },
            { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'GET',
    path: '/degrees/{id}',
    config: {
      handler: ctrl.degrees.findById,
      description: 'Finds a Degree by id',
      tags: ['api', 'degrees'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 200, message: 'OK' },
            { code: 400, message: 'Bad Request' },
            { code: 404, message: 'Degree Not Found' },
            { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'GET',
    path: '/degrees',
    config: {
      handler: ctrl.degrees.findByName,
      description: 'Finds a Degree by name or track query',
      tags: ['api', 'degrees'],
      validate: {
        query: {
          name: Joi.string().trim().min(3).max(100),
          track: Joi.string().trim().min(3).max(100)
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 200, message: 'OK' },
            { code: 400, message: 'Bad Request' },
            { code: 404, message: 'Degree Not Found' },
            { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'PUT',
    path: '/degrees/{id}',
    config: {
      handler: ctrl.degrees.updateById,
      description: 'Updates a Degree',
      tags: ['api', 'degrees'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        },
        payload: {
          name: Joi.string().trim().min(3).max(100).required(),
          credits: Joi.number().precision(1).required(),
          core: Joi.object().keys({
            totalReq: Joi.number().integer().min(1).max(60),
            requirements: Joi.array().includes(Joi.string().alphanum())
          }),
          tracks: Joi.array().includes(
            Joi.object().keys({
              name: Joi.string().trim().min(3).max(100).required(),
              totalReq: Joi.number().integer().min(1).max(60),
              requirements: Joi.array().includes(Joi.string().alphanum())
            })
          ),
          electives: Joi.object().keys({
            totalReq: Joi.number().integer().min(1).max(60),
            requirements: Joi.array().includes(Joi.string().alphanum())
          })
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 200, message: 'OK' },
            { code: 400, message: 'Bad Request' },
            { code: 404, message: 'Degree Not Found' },
            { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'DELETE',
    path: '/degrees/{id}',
    config: {
      handler: ctrl.degrees.hardDelete,
      description: 'Permanently deletes a Degree',
      tags: ['api', 'degrees'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 200, message: 'OK' },
            { code: 400, message: 'Bad Request' },
            { code: 404, message: 'Degree Not Found' },
            { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'POST',
    path: '/courses',
    config: {
      handler: ctrl.courses.create,
      description: 'Creates a Course',
      tags: ['api', 'courses'],
      validate: {
        payload: {
          name: Joi.string().trim().min(3).max(100).required(),
          courseType: Joi.string().valid('Lecture', 'Seminar', 'Lab', 'Independent'),
          number: Joi.string().trim().min(3).max(10).required(),
          department: Joi.string().trim().min(3).max(100).required(),
          units: Joi.number().precision(1).required(),
          enrollment: {
            current: Joi.number().integer(),
            max: Joi.number().integer()
          },
          gradeScale: Joi.string().valid('pass/fail', '4.0'),
          approval: Joi.boolean(),
          description: Joi.string().trim().min(40).max(300).required(),
          courseLength: Joi.number().precision(1).min(0).max(6),
          sections: Joi.array().includes(
            Joi.object().keys({
              name: Joi.string().trim().min(3).max(100),
              instructor: Joi.string().trim().min(8).max(100),
              day: Joi.string().valid('M','Tu','W','Th','F','Sa','Su','M/W','Tu/Th','M/W/F','OT'),
              time: Joi.string().trim().min(3).max(20),
              location: Joi.string().trim().min(10).max(100),
              semester: Joi.string().trim().min(9).max(11).required()
            })
          )
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 201, message: 'Created' },
            { code: 400, message: 'Bad Request' },
            { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'GET',
    path: '/courses/{id}',
    config: {
      handler: ctrl.courses.findById,
      description: 'Finds a Course by id',
      tags: ['api', 'courses'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 200, message: 'OK' },
            { code: 400, message: 'Bad Request' },
            { code: 404, message: 'Course Not Found' },
            { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'GET',
    path: '/courses',
    config: {
      handler: ctrl.courses.findByNumber,
      description: 'Finds a Course by number or name query',
      tags: ['api', 'courses'],
      validate: {
        query: {
          name: Joi.string().trim().min(3).max(100),
          number: Joi.string().trim().min(3).max(10)
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 200, message: 'OK' },
            { code: 400, message: 'Bad Request' },
            { code: 404, message: 'Course Not Found' },
            { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'PUT',
    path: '/courses/{id}',
    config: {
      handler: ctrl.courses.updateById,
      description: 'Updates a Course',
      tags: ['api', 'courses'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        },
        payload: {
          name: Joi.string().trim().min(3).max(100).required(),
          courseType: Joi.string().valid('Lecture', 'Seminar', 'Lab', 'Independent'),
          number: Joi.string().trim().min(3).max(10).required(),
          department: Joi.string().trim().min(3).max(100).required(),
          units: Joi.number().precision(1).required(),
          enrollment: {
            current: Joi.number().integer(),
            max: Joi.number().integer()
          },
          gradeScale: Joi.string().valid('pass/fail', '4.0'),
          approval: Joi.boolean(),
          description: Joi.string().trim().min(40).max(300).required(),
          courseLength: Joi.number().precision(1).min(0).max(6),
          sections: Joi.array().includes(
            Joi.object().keys({
              name: Joi.string().trim().min(3).max(100),
              instructor: Joi.string().trim().min(8).max(100),
              day: Joi.string().valid('M','Tu','W','Th','F','Sa','Su','M/W','Tu/Th','M/W/F','OT'),
              time: Joi.string().trim().min(3).max(20),
              location: Joi.string().trim().min(10).max(100),
              semester: Joi.string().trim().min(9).max(11).required()
            })
          )
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 200, message: 'OK' },
            { code: 400, message: 'Bad Request' },
            { code: 404, message: 'Course Not Found' },
            { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'DELETE',
    path: '/courses/{id}',
    config: {
      handler: ctrl.courses.hardDelete,
      description: 'Permanently deletes a Course',
      tags: ['api', 'courses'],
      validate: {
        params: {
          id: Joi.string().alphanum().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 200, message: 'OK' },
            { code: 400, message: 'Bad Request' },
            { code: 404, message: 'Course Not Found' },
            { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  }
]

module.exports = apiRoutes;
