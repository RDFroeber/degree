module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    jshint: {
      /* Linting Options */
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'models/*.js', 'controllers/*.js', 'routes/*.js', 'plugins/**/*.js'],
      client: ['public/js/*.js'],
      test: ['text/**/*.js']
    }

  });

  grunt.registerTask('hint', ['jshint:all', 'jshint:client']);

};