module.exports = function(grunt) {
    'use strict';

    grunt.loadTasks('tasks');

    grunt.initConfig({
        radic_jsdoc: {
            docs: {
                docsPath: 'docs'
            }
        },
        radic_jsdoc_mdpages: {
            docs: {
                files: [{
                    cwd: 'test/mdpages',
                    src: '*.md',
                    dest: 'docs',
                    expand: true
                },{
                    src: 'README.md',
                    dest: 'docs/index.md'
                }]
            }
        }
    });


    grunt.registerTask('jsdoc', ['radic_jsdoc', 'radic_jsdoc_mdpages']);
};
