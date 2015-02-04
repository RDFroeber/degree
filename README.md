# Degree

A degree tracking application

[![Dependency Status](https://david-dm.org/RDFroeber/degree.svg)](https://david-dm.org/RDFroeber/degree)
[![devDependency Status](https://david-dm.org/RDFroeber/degree/dev-status.svg?theme=shields.io)](https://david-dm.org/RDFroeber/degree#info=devDependencies)
[![Build Status](https://travis-ci.org/RDFroeber/degree.svg?branch=master)](https://travis-ci.org/RDFroeber/degree)

## Installation

**In Development**

```sh
git clone https://github.com/RDFroeber/degree.git
cd degree/
npm install
```

Source code can be found [here](https://github.com/RDFroeber/degree).

## Usage

While many command options are listed here, very few are actually implemented to date. I will update this document as more become available.

```bash
npm start
```

## Development Task List

* ~~Project Setup~~
* Add Basic Authentication
  * Add Student Model
  * Student Signup
  * Student Login
* Complete Student CRUD Actions
  * View Profile
  * Edit Profile
  * Delete Profile
* Add Dummy Degrees
  * Add Degree Model
  * Add Course Model
  * Course Requirements
* Student Degree Selection
  * Associate Degree
* Students Select Courses
  * Default Current Semester
  * Default Core Courses
  * Select Required/Elective Courses

### Resources

Schema Outlines

* **Student**
  * Info
    * Email
    * Password
    * Contact
      * Address
      * Phone
    * Projected Graduation Year
  * Chosen Degree *Reference*
  * Chosen Degree Track
  * Semesters
    * Date
    * Complete?
    * Courses
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
  * Length
  * Description
  * Approval Needed?

* **Degree**
  * Total Credits
  * Track Options
  * Core - Locked/Required Courses
    * First:
      * *Course Reference*
  * Track - Specific Course Options
    * Name
    * First:
      * *Course Reference*
      * Substitute: 
        * Exist?
        * Options
  * Electives - Open/Restricted Courses
    * First:
      * *Course Reference*
      * Restriction
        * Type department|course|level
        * Options (based on type)
        * Approval Needed?

### Data Examples

Billy (Student)
  email:
  password:
  contact:
    address:
    gradYr:
  degree: *ref*
  track: 
  semesters: [
      date:
      complete:
      courses: [
        course: *ref*
        instructor:
        status: active|completed|dropped
        grade:
      ],
    semester
      ...
      ...
      ...,
  ]

Comp Sci (Degree)
  credits: 
  tracks: [
    name: Vision & Graphics,
    ...
  ]
  core: 
    one: 
      course: Intro to Computing 
      substitutes: none
    two: 
      course: Intro to CS and Programming in Java
      substitutes: Honors Intro to CS
    three:
      course: Data Structures in Java
      substitutes: Honors Data Structures and Algorithms
    four: 
      course: Advanced Programming
      substitutes: none
    five:
      course: Discrete Mathematics
      substitutes: none
    six:
      course: Computational Linear Algebra
      substitutes: none
    seven:
      course: Computer Science Theory
      substitutes: none
    eight:
      course: Fundamentals of Computer System
      substitutes: none
    nine: 
      course: Probability and Statistics
      substitutes: none
    ten:
      course: Calculus I 
      substitutes: none
    eleven:
      course: Calculus II
      substitutes: none
    twelve:
      course: Calculus III
      substitutes: none
  track: 
    name: Vision & Graphics
    one: 
      course: Computer Vision 
      substitutes: Computer Graphics|Computer Animation
    two:
      course: Computer Vision 
      substitutes: Computer Graphics|Computer Animation
    three:
      course: 
      substitutes:
          Advanced Computer Graphics  
          Pixel Processing  
          Computer Animation  
          User Interface Design 
          3D User Interfaces and Augmented Reality  
          Artificial Intelligence 
          Computational Aspects of Robotics 
          Visual Interfaces to Computers  
          Machine Learning  
          Video Game Technology & Design  
          Undergraduate Thesis  
          Undergraduate Projects in CS
    ...
  electives: 
    one: 
      ref:
      restriction: 
        type: course
        options: [
          Advanced Computer Graphics  
          Pixel Processing  
          Computer Animation  
        ]
        approval: true
    two: 
      ref:
      restriction: 
        type: level
        options: 600
        approval: true

## Tests

Not implemented.

```sh
npm install
npm test
npm test-cover
```

## Dependencies

- [bell](https://github.com/hapijs/bell): Third-party login plugin for hapi
- [good](https://github.com/hapijs/good): Server and process monitoring plugin
- [good-console](https://github.com/hapijs/good-console): Console broadcasting for Good process monitor
- [handlebars](https://github.com/wycats/handlebars.js): Build semantic templates effectively with no frustration
- [hapi](https://github.com/hapijs/hapi): An HTTP Server framework 
- [hapi-auth-cookie](https://github.com/hapijs/hapi-auth-cookie): Cookie authentication plugin
- [joi](https://github.com/hapijs/joi): An object schema validation
- [lout](https://github.com/hapijs/lout): API documentation generator plugin for hapi
- [nodemon](https://github.com/remy/nodemon): A simple monitor script for use during development of a node.js app

## Dev Dependencies

- [code](https://github.com/hapijs/code): An assertion library
- [lab](https://github.com/hapijs/lab): A test utility

## License

MIT