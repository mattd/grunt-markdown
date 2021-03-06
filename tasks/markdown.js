/*
 * grunt-markdown
 * https://github.com/treasonx/grunt-markdown
 *
 * Copyright (c) 2012 James Morrin
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var path = require('path');

  // Internal lib.
  var markdown = require('./lib/markdown').init(grunt);

  grunt.registerMultiTask('markdown', 'Compiles markdown files into html.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      htmlExtension: 'html',
      markdownExtension: 'md',
      markdownOptions: {},
      template: path.join(__dirname, 'template.html')
    });
    var template = grunt.file.read(options.template);

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      f.src.forEach(function(filepath) {
        var destName = f.dest.replace(
          options.markdownExtension,
          options.htmlExtension
        );
        var content = markdown.markdown(
          grunt.file.read(filepath),
          options.markdownOptions,
          template
        );

        grunt.file.write(destName, content);
        grunt.log.writeln('File "' + destName + '" created.');
      });
    });

  });

};
