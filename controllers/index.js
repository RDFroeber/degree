'use strict';

/**
 * Controllers
 **/

var students = require('./studentCtrl'),
    schools = require('./schoolCtrl'),
    degrees = require('./degreeCtrl'),
    requirements = require('./requirementCtrl'),
    courses = require('./courseCtrl');

module.exports = {

  students: students,
  schools: schools,
  degrees: degrees,
  requirements: requirements,
  courses: courses

};