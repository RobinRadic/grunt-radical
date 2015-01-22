var lib = require('../lib'),
    path = require('path'),
    fs = require('fs-util'),
    radic = require('radic'),
    util = radic.util,
    temp = require('temp'),
    yaml = require('js-yaml');

module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('radic_jsdoc', 'Documentation generator for github pages projects using jsdoc3.', function () {
        // http://gruntjs.com/creating-tasks

        var self = this;
        var taskDone = this.async();
        var cwd = process.cwd();
        var ok = grunt.log.ok;

        var options = this.options({
            docsPath: path.resolve(cwd, 'docs'),
            readmePath: path.resolve(cwd, 'docs'),
            jsdocThemePath: path.resolve(__dirname, '../lib/jsdoctheme'),
            frontMatterPath: path.resolve(cwd, 'docs/front-matter.yml'),
            jsdocConfig: path.resolve(cwd, 'jsdoc.json'),
            jsdocBinPath: path.resolve(__dirname, '../node_modules/.bin/jsdoc')
        });

        // Load files
        var frontMatter = lib.getFrontMatterYaml(options.frontMatterPath);
        var jsdocConfig = fs.readJSONSync(options.jsdocConfig);
        var tmpConfigFile = temp.openSync('radic_jsdoc_config');

        // Write temporary config
        jsdocConfig.templates.frontMatter = frontMatter;
        fs.writeJSONSync(tmpConfigFile.fd, jsdocConfig);
        ok('Created temporary jsdoc.json config file');

        // Generate jsdoc
        radic.sh.execSync(options.jsdocBinPath + ' -t ' + options.jsdocThemePath + ' -c ' + tmpConfigFile.path);
        ok('Generated jsdoc');

        // Cleanup temporary files
        temp.cleanupSync();
        ok('Cleaned up temporary files');

        // Done
        taskDone();


        /*
         this.files.forEach(function(file) {
         var contents = file.src.filter(function(filepath) {
         // Remove nonexistent files (it's up to you to filter or warn here).
         if (!grunt.file.exists(filepath)) {
         grunt.log.warn('Source file "' + filepath + '" not found.');
         return false;
         } else {
         return true;
         }
         }).map(function(filepath) {
         // Read and return the file's source.
         return grunt.file.read(filepath);
         }).join('\n');
         // Write joined contents to destination filepath.
         grunt.file.write(file.dest, contents);
         // Print a success message.
         grunt.log.writeln('File "' + file.dest + '" created.');
         });
         */
    });

};
