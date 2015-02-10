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
touch authCredentials.js
```

Source code can be found [here](https://github.com/RDFroeber/degree).

## Usage

```bash
npm start
```

## API Documentation

API documentation is automatically generated using the [hapi-swagger](https://www.npmjs.com/package/hapi-swagger) module and can be found at ['/documentation'](http://localhost:8080/documentation) when your server is running.

## Development Task List

* Project Setup
  * ~~File Structure~~
  * Gruntfile
  * Bower
* Add Authentication
  * ~~Google OAuth~~
  * ~~Student Signup~~
  * ~~Student Login~~
  * Integrate with Angular
* ~~Data Layer~~
  * ~~Add Student Model~~
  * ~~Add School Model~~
  * ~~Add Degree Model~~
  * ~~Add Course Model~~
  * ~~Add Requirement Model~~
* ~~API Layer~~
  * ~~Student CRUD Actions~~
  * ~~School CRUD Actions~~
  * ~~Degree CRUD Actions~~
  * ~~Course CRUD Actions~~
  * ~~Requirement CRUD Actions~~
* Seed the Database
  * ~~Add Students~~
  * ~~Add Schools~~
  * ~~Add Degree~~
  * Add Courses
  * Add Requirements
  * Associate Models
* Views: Angular SPA
  * Login/Signup
  * Dashboard
    * My Account
      * Edit
    * My Degree
      * Progress
    * My Classes
      * Active
  * All Schools
    * Search by name or degree
  * All Degrees
    * Search by name, department, track
  * All Courses
    * Search by name, number, department
* Add Styling
  * ~~Foundation~~
* Tests
  * ~~Models~~
    * ~~Student~~
    * ~~School~~
    * ~~Degree~~
    * ~~Course~~
    * ~~Requirement~~
  * Controllers
  * Client

### Resources

Schema Outlines

* **Student**
  * First Name
  * Last Name
  * Email
  * Address
  * Phone
  * School
  * Projected Graduation Year
  * Chosen Degree *Reference*
  * Chosen Degree Track
  * Semesters:
    * Date
    * Complete?
    * Courses:
      * *Reference to Course*
      * Section
      * Status active|completed|dropped
      * Grade

* **School**
  * Name
  * Description
  * Degrees: 
    * Degree *Reference*

* **Course**
  * Name
  * Course Type Lecture|Seminar|Lab|Independent
  * Number
  * Department
  * Units
  * Enrollment:
    * Current
    * Max
  * Grade Scale pass/fail|4.0
  * Description
  * Approval Needed?
  * Course Length in Semesters
  * Sections
    * Name
    * Instructor
    * Day M|Tu|W|Th|F|Sa|Su|M/W|Tu/Th|M/W/F|OT
    * Time
    * Location
    * Semester

* **Degree**
  * Name i.e. BS
  * Specialization i.e. Computer Science
  * Total Credits
  * Core - Locked/Required Courses
    * Requirements:
      * *Course Reference*
  * Tracks - Specific Course Options
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

Not fully implemented.

```sh
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
- [moment](https://github.com/moment/moment): Parse, validate, manipulate, and display dates
- [mongoose](https://github.com/LearnBoost/mongoose): Mongoose MongoDB ODM
- [nodemon](https://github.com/remy/nodemon): A simple monitor script for use during development of a node.js app

## Dev Dependencies

- [chai](https://github.com/chaijs/chai): BDD/TDD assertion library for node.js and the browser
- [grunt](https://github.com/gruntjs/grunt): The JavaScript Task Runner
- [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint): Validate files with JSHint
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch): Run tasks whenever watched files change
- [grunt-nodemon](https://github.com/ChrisWren/grunt-nodemon): Grunt task to run nodemon
- [hapi-swagger](https://github.com/glennjones/hapi-swagger): A swagger documentation UI generator plugin for hapi
- [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks): Load multiple grunt tasks using globbing patterns
- [mocha](https://github.com/mochajs/mocha): A simple, flexible, fun test framework
- [time-grunt](https://github.com/sindresorhus/time-grunt): Display the elapsed execution time of grunt tasks

## License

MIT