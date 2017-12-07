'use strict';
var glob = require('glob');
var fs = require('fs');
module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            dist: {
                src: [
                    'libs/RongEmoji.js',
                    'libs/utils.js',
                    'libs/qiniu-upload.js',
                    'template.js',
                    'emoji.js',
                    'im.js'
                ],
                dest: 'temp/im.js'
            }
        },
        uglify: {
            dist: {
                src: [
                    'temp/im.js',
                    'temp/template.js'
                ],
                dest: 'dist/im.min.js'
            }
        },
        cssmin: {
            dist: {
                src: 'im.css',
                dest: 'dist/im.min.css'
            }
        },
        clean: {
            dist: {
                src: 'temp'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('html-to-js',function () {
        var template = {};
        glob.sync('./templates/**/*.html').forEach(filePath => {
            var content = fs.readFileSync(filePath, {
                encoding: 'utf8'
            });
            var key = filePath.replace(/^\.\//, '');
            template[key] = content;
        });
        var dest = './temp/template.js';
        var outputContent = 'RCS.templateCache=' + JSON.stringify(template, null, 4) + ';';
        fs.writeFileSync(dest, outputContent);
    });

    grunt.registerTask('dist', ['concat', 'html-to-js', 'uglify', 'cssmin', 'clean']);
}