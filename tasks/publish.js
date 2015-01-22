
'use strict';

var lib = require('../lib'),
    path = require('path'),
    fs = require('fs-utils'),
    radic = require('radic'),
    _ = require('lodash'),
    util = radic.util,
    temp = require('temp'),
    yaml = require('js-yaml'),
    semver = require('semver');

module.exports = function (grunt) {



    grunt.registerTask('publish', 'Publish node/bower projects.', function (action) {

        var self = this;
        var taskDone = this.async();
        var cwd = process.cwd();
        var ok = grunt.log.ok;
        var defaults = {
            bower: true,
            git: {
                'pushTag': true,
                'pushMaster': true
            }
        };
        var config = _.merge(defaults, grunt.config.get('publish') || {});
        var npm = radic.binwraps.create('npm');
        var git = radic.binwraps.create('git');

        // Make sure we have an appropriate action
        if(typeof action === 'undefined'){
            grunt.fail.fatal('Missing task action. usage: "grunt publisher:ACTION". Check "grunt publisher:help" for all options');
        } else if(['patch', 'minor', 'major'].indexOf(action) === -1) {
            grunt.fail.fatal('Invalid task action "' + action + '".');
        }

        // Get the version from package.json
        var version = semver(fs.readJSONSync('package.json').version);

        // Increase version by given action
        version.inc(action);

        // Increase bower version, if enabled
        if(config.bower === true && fs.exists('bower.json')){
            var bowerJson = fs.readJSONSync('bower.json');
            bowerJson.version = version.toString();
            fs.writeJSONSync('bower.json', bowerJson);
            git('add', 'bower.json');
            git('commit', { m: 'Synced bower version with upcomming npm version' });
            ok('Bower has been synced');
        }

        git('add', { A: true });
        git('commit', { m: 'pre-publish commit' });
        //git('')
        if(npm('version', action).code === 1){
            ok('npm version increased');
        } else {
            grunt.log.error('An error occured');
        }

        git('push', { u: 'origin v' + version.toString() });
        git('push', { u: 'origin master' });

        taskDone();
    });

};
