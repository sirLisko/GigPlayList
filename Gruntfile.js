module.exports = function (grunt) {
	'use strict';

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bower: {
			install: {
				options: {
					targetDir: './dist/js/ext',
					install: true,
					cleanTargetDir: false,
					cleanBowerDir: true
				}
			}
		},
		clean: ['dist/'],
		concat: {
			dist: {
				src: ['src/**/*.js'],
				dest: 'dist/js/base.js'
			}
		},
		copy: {
			'public': {
				files: [
					{expand: true, src: ['public/**'], dest: 'dist/'}
				]
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'index.html': 'dist/index.html'
				}
			}
		},
		jshint: {
			files: ['gruntfile.js', 'src/**/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		less: {
			dev: {
				options: {
					paths: ['src/styles'],
					yuicompress: false
				},
				files: {
					'dist/styles/style.css': 'src/styles/style.less'
				}
			},
			prod: {
				options: {
					paths: ['src/styles'],
					yuicompress: true
				},
				files: {
					'dist/styles/style.css': 'src/styles/style.less'
				}
			}
		},
		includes: {
			files: {
				src: ['src/**/*.html', '!src/**/partials/*.html'],
				dest: 'dist/',
				flatten: true,
				cwd: '.'
			}
		},
		open: {
			page : {
				path: './dist/index.html',
				app: 'Google Chrome'
			}
		},
		uglify: {
			dist: {
				files: {
					'dist/js/base.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		watch: {
			include: {
				files: ['src/**/*.html'],
				tasks: ['includes']
			},
			less: {
				files: ['src/**/*.less'],
				tasks: ['less:dev']
			},
			javascripts: {
				files: ['src/**/*.js'],
				tasks: ['concat']
			}
		}
	});

	grunt.registerTask('dev', ['includes', 'jshint', 'concat', 'bower', 'less:dev', 'copy:public']);
	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less:prod', 'includes', 'bower', 'htmlmin', 'copy:public']);
};
