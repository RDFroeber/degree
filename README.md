# Hapi Degree

A degree tracking application built with Hapi.js

[![Dependency Status](https://david-dm.org/RDFroeber/degree.svg)](https://david-dm.org/RDFroeber/degree)
[![devDependency Status](https://david-dm.org/RDFroeber/degree/dev-status.svg?theme=shields.io)](https://david-dm.org/RDFroeber/degree#info=devDependencies)
[![Build Status](https://travis-ci.org/RDFroeber/degree.svg?branch=master)](https://travis-ci.org/RDFroeber/degree)

## Installation

**In Development**

```sh
git clone https://github.com/RDFroeber/degree.git
cd degree/
npm install
touch auth.js
```

Source code can be found [here](https://github.com/RDFroeber/degree).

## Usage

```bash
npm start
```

## Development Task List

* ~~Project Setup~~
* ~~Add Authentication~~
  * ~~Add Student Model~~
  * ~~Google OAuth~~
  * ~~Student Signup~~
  * ~~Student Login~~
* Complete Student CRUD Actions
  * View Profile
  * Edit Profile
  * Delete Profile
* Add Example Degrees
  * ~~Add Degree Model~~
  * ~~Add Course Model~~
  * ~~Add Requirement Model~~
  * CRUD Course Actions
  * CRUD Degree Actions
  * Course Requirements
* Student Degree Selection
  * Associate Degree
  * Select Track
* Students Select Courses
  * Default Current Semester
  * Default Core Courses
  * Select Required/Elective Courses


### Resources

Schema Outlines

* **Student**
  * First Name
  * Last Name
  * Email
  * Password
  * Contact
    * Address
    * Phone
  * Projected Graduation Year
  * Chosen Degree *Reference*
  * Chosen Degree Track
  * Semesters:
    * Date
    * Complete?
    * Courses:
      * *Reference to Course*
      * Instructor
      * Status active|completed|dropped
      * Grade

* **Course**
  * Name
  * Number
  * Department
  * Units
  * Grade Scale
  * Number of Semesters
  * Description
  * Approval Needed?

* **Degree**
  * Total Credits
  * Track Options
  * Core - Locked/Required Courses
    * Requirements:
      * *Course Reference*
  * Track - Specific Course Options
    * Name
    * Requirements:
      * *Course Reference*
      * Substitutes: 
        * Exist?
        * Options
  * Electives - Open/Restricted Courses
    * Requirements:
      * *Course Reference*
      * Restriction
        * Type department|course|level
        * Options (based on type)
      * Approval Needed?

## Tests

Not implemented.

```sh
npm install
npm test
```

## Dependencies

- [bcrypt](https://github.com/ncb000gt/node.bcrypt.js): A bcrypt library for NodeJS
- [bell](https://github.com/hapijs/bell): Third-party login plugin for hapi
- [good](https://github.com/hapijs/good): Server and process monitoring plugin
- [good-console](https://github.com/hapijs/good-console): Console broadcasting for Good process monitor
- [handlebars](https://github.com/wycats/handlebars.js): Build semantic templates effectively with no frustration
- [hapi](https://github.com/hapijs/hapi): An HTTP Server framework 
- [hapi-auth-cookie](https://github.com/hapijs/hapi-auth-cookie): Cookie authentication plugin
- [hapi-mongoose-db-connector](https://github.com/codedoctor/hapi-mongoose-db-connector): Hapi plugin that connects to mongodb
- [joi](https://github.com/hapijs/joi): An object schema validation
- [lout](https://github.com/hapijs/lout): API documentation generator plugin for hapi
- [moment](https://github.com/moment/moment): Parse, validate, manipulate, and display dates
- [mongoose](https://github.com/LearnBoost/mongoose): Mongoose MongoDB ODM
- [nodemon](https://github.com/remy/nodemon): A simple monitor script for use during development of a node.js app

## Dev Dependencies

- [grunt](https://github.com/gruntjs/grunt): The JavaScript Task Runner
- [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint): Validate files with JSHint
- [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks): Load multiple grunt tasks using globbing patterns
- [time-grunt](https://github.com/sindresorhus/time-grunt): Display the elapsed execution time of grunt tasks

## License

MIT