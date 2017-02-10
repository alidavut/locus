var fs = require('fs');
var util = require('util');
var color = require('cli-color');
var highlight = require('cardinal').highlight;
var syntaxTheme = require('cardinal/themes/tomorrow-night.js');
var _ = require('lodash');

exports.file = function(path, line) {
  var file = highlight(
    fs.readFileSync(path, 'utf-8'),
    { theme: syntaxTheme }
  );

  console.log();
  console.log(color.bold('File : ') + path + ' @ line: ' + line);
  console.log();

  var startLine = line > 7 ? line - 7 : 0;
  var lines = file.split('\n');

  for(var i = startLine; i < line + 3 && i < lines.length; i++) {
    var maxLineNumberLength = line.toString().length;

    if (line === i + 1) {
      var lineNumber = ' => ' + (i + 1);
    } else {
      var lineNumber = i + 1;
    }

    lineNumber = _.padStart(lineNumber + ': ', maxLineNumberLength + 6);

    console.log(color.xterm(111)(lineNumber) + lines[i]);
  }

  console.log();
}

exports.success = function(result) {
  console.log(color.greenBright(util.inspect(result, false, 1, true)));
}

exports.error = function(err) {
  console.log(color.redBright(err));
}
