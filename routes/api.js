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
        params: {
          firstName: Joi.string().trim().min(8).max(100),
          lastName: Joi.string().trim().min(8).max(100),
          email: Joi.string().email().trim(),
          picture: Joi.string().trim().min(8).max(100),
          gender: Joi.array().includes('female', 'male', 'undisclosed'),
          google: Joi.object().keys({
            token: Joi.string().token(),
            id: Joi.string().guid(),
          })
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 400, message: 'Bad Request' },
            { code: 500, message: 'Internal Server Error'},
            { code: 201, message: 'Created' },
          ]
        }
      }
    }
  },{
    method: 'GET',
    path: '/students/{email}',
    config: {
      handler: ctrl.students.findByEmail,
      description: 'Creates a Student',
      tags: ['api', 'students'],
      validate: {
        params: {
          email: Joi.string().email().trim()
        }
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [
            { code: 400, message: 'Bad Request' },
            { code: 404, message: 'Not Found' },
            { code: 500, message: 'Internal Server Error'},
            { code: 200, message: 'OK' },
          ]
        }
      }
    }
  },
]

module.exports = apiRoutes;
