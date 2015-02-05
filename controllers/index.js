'use strict';

/**
 * Controllers
 **/

var students = require('./studentCtrl'),
    degrees = require('./degreeCtrl'),
    requirements = require('./requirementCtrl'),
    courses = require('./courseCtrl');

module.exports = {

  students: students,
  degrees: degrees,
  requirements: requirements,
  courses: courses

};