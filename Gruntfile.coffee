module.exports = (grunt) ->
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    coffee:
      lib:
        files:
          'lib/locus.js': ['src/locus.coffee']

    watch:
      lib:
        files: ['src/*.coffee']
        tasks: ['coffee:lib']

  grunt.registerTask('default', ['coffee'])