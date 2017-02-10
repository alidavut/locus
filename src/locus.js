var fs = require('fs');
var script = fs.readFileSync(__dirname + '/script.js', 'utf-8');

// to use in script.js
global.__locus_modules__ = {
  deasync: require('deasync'),
  parseStack: require('parse-stack'),
  print: require('./print'),
  prompt: require('./prompt')
}

global.__locus_running__ = false;
global.locus = module.exports = script;
