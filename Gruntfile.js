module.exports = function(grunt) {

	grunt
			.initConfig({
				// Read the package JSON File
				pkg : grunt.file.readJSON('package.json'),

				// Concat all the JS files into one
				concat : {
					options : {
						// Define the string to put in between each file in the
						// concatenated output
						seprator : ';'
					},
					dist : {
						// Source Files to concatenate
						src : [ 'app/**/*.js' ],
						// Location of the resulting JS file
						dest : 'dist/assets/scripts/<%= pkg.name %>.js'
					}
				},

				// Minify the JS files
				uglify : {
					options : {
						banner : '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
					},
					dist : {
						files : {
							'dist/<%= pkg.name %>.min.js' : [ '<%= concat.dist.dest %>' ]
						}
					}
				},

				// QUnit to Run test
				qunit : {
					files : [ 'test/**/*.html' ]
				},

				// JSHint to adhere the Best Practice
				jshint : {
					// Define the files
					files : [ 'Gruntfile.js', 'src/**/*.js', 'test/**/*.js' ],

					// Configure JSHint
					options : {
						globals : {
							jQuery : true,
							console : true,
							module : true
						}
					}
				},

				// Watch to use qunit and jshint
				watch : {
					files : [ '<%= jshint.files %>' ],
					tasks : [ 'jshint', 'qunit' ]
				}

			});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// this would be run by typing "grunt test" on the command line
	grunt.registerTask('test', [ 'jshint', 'qunit' ]);

	// the default task can be run just by typing "grunt" on the command line
	grunt.registerTask('default', [ 'jshint', 'qunit', 'concat', 'uglify' ]);
};