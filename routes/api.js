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
                  instructor: Joi.string().trim().min(10).max(100),
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
  },
  {
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
            { code: 404, message: 'Not Found' },
            { code: 500, message: 'Internal Server Error'}
          ]
        }
      }
    }
  },{
    method: 'GET',
    path: '/students/email/{email}',
    config: {
      handler: ctrl.students.findByEmail,
      description: 'Finds a Student by email',
      tags: ['api', 'students'],
      validate: {
        params: {
          email: Joi.string().email().trim().required()
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 200, message: 'OK' },
            { code: 400, message: 'Bad Request' },
            { code: 404, message: 'Not Found' },
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
                  instructor: Joi.string().trim().min(10).max(100),
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
  }
]

module.exports = apiRoutes;

