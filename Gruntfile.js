module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
    /*        build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }*/
        },
        browserify: {
          'dist/polyform.js': ['js/polyform.js']
        },
        clean: ['dist/'],
        copy: {
            data: {
                src: 'data/',
                dest: 'dist/data',
                expand: true
            }
        },
        watch: {
            scripts: {
                files: ['js/polyform.js'],
                tasks: ['clean', 'browserify'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-rework');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'browserify', 'uglify', 'copy']);

};