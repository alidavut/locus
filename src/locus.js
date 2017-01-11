var fs = require('fs');
var script = fs.readFileSync(__dirname + '/script.js', 'utf-8');

// to use in script.js
global.__locus_modules__ = {
  deasync: require('deasync'),
  color: require('cli-color'),
  parseStack: require('parse-stack'),
  print: require('./print'),
  lodash: require('lodash'),
  cardinal: require('cardinal'),
  syntaxTheme: require('cardinal/themes/tomorrow-night.js'),
  prompt: require('./prompt')
}

global.__locus_running__ = false;
global.locus = module.exports = script;
