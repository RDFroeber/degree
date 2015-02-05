module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    simplemocha: {
      options: {
        globals: ['expect', 'sinon'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },
      server: {
        src: ['test/**/*.js']
      },
      client: {
        // src: ['test/**/*.js']
      }
    },

    jshint: {
      /* Linting Options */
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'models/**/*.js', 'handlers/**/*.js', 'plugins/**/*.js'],
      client: ['public/js/*.js'],
      test: ['text/**/*.js']
    }

  });

  grunt.registerTask('hint', ['jshint:all', 'jshint:client']);

  grunt.registerTask('test', ['test:server', 'test:client']);

};