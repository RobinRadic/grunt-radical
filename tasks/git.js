'use strict';

var lib = require('../lib'),
    path = require('path'),
    fs = require('fs-utils'),
    radic = require('radic'),
    _ = require('lodash'),
    util = radic.util,
    temp = require('temp'),
    yaml = require('js-yaml');

module.exports = function (grunt) {
    grunt.registerMultiTask('git', 'Git commands.', function () {
        var self = this;
        //var taskDone = this.async();
        var cwd = process.cwd();
        var ok = grunt.log.ok;
        var options = this.options({
            output: true
        });
        var commands = this.data.commands;

        var git = radic.binwraps.create('git');
        commands.forEach(function(command){
            var result = git.apply(git, command);
            if(result.code === 1){
                grunt.verbose.error('Error: ' + result.stdout);
                grunt.log.error('An error occured');
                grunt.fail();
            }
            if(options.output === true){
                grunt.log.writeln('code: ' + result.code);
                grunt.log.writeln(result.stdout);
            }
        });

        ok('Git commands executed');

        // Done
        //taskDone();
    });

};
