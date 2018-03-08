const sourceJS = 'src/**/*.js';
const sourceCSS = './v2/less/**/*.less';
const destCSS = 'build/css/app.css';
const destJS = 'build/js/app.js';
const es6JSSource = './v2/es6/' + sourceJS;
const reactJSSource = './v2/react/' + sourceJS;
const vueJSSource = './v2/vue/' + sourceJS;

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        eslint: {
            options: {configFile: '.eslintrc.json'},
            es6: { target : [es6JSSource] },
            react: { target : [reactJSSource] },
            vue: { target : [vueJSSource] }
        },
        less: {
            options: { compress: true },
            es6: { src : sourceCSS, dest:'./v2/es6/' + destCSS },
            react: { src : sourceCSS, dest:'./v2/react/' + destCSS },
            vue: { src : sourceCSS, dest:'./v2/vue/' + destCSS },
        },
        browserify: {
            options: {
                debug: true,
                transform: [["babelify", { "presets": ["env"] }], "brfs"]
            },
            es6: { 
                src: es6JSSource, 
                dest:'./v2/es6/' + destJS,
                browserifyOptions: {
                    debug: false,
                    transform: [["pugify", {compileDebug: false}],"brfs"]
                }
            },
            react: {
                src: reactJSSource,
                dest:'./v2/react/'+ destJS,
                browserifyOptions: {
                    transform: [["babelify", { "presets": ["env", "react"] }]]
                }
            },
            vue: { src: vueJSSource, dest:'./v2/vue/' + destJS }
        },
        uglify: {

        },
        mochaTest : {
            options :{
                reporter: 'nyan',
                ui: 'bdd',
                colors : true
            },
            es6: {
                src: ['./v2/es6/test/**/*.js']
            },
            react: {
                src: ['./v2/react/test/**/*.js']
            },
            vue: {
                src: ['./v2/vue/test/**/*.js']
            }
        }
    });

  // Load plugins that provide tasks.
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Alias Tasks
    grunt.registerTask('default', ['eslint', 'less']);

    grunt.registerTask('build:es6', ['eslint:es6', 'less:es6', 'browserify:es6']);
    grunt.registerTask('test:es6', ['mochaTest:es6']);

    grunt.registerTask('build:react', ['eslint:react', 'less:react', 'browserify:react']);
    grunt.registerTask('test:react', ['mochaTest:react']);

    grunt.registerTask('build:vue', ['eslint:vue', 'less:vue', 'browserify:vue']);
    grunt.registerTask('test:vue', ['mochaTest:vue']);


};
