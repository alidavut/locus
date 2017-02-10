var fs = require('fs');
var script = fs.readFileSync(__dirname + '/script.js', 'utf-8');

// to use in script.js
global.__locus_modules__ = {
  deasync: require('deasync'),
  color: require('cli-color'),
  parseStack: require('parse-stack'),
  lodash: require('lodash'),
  cardinal: require('cardinal'),
  syntaxTheme: require('cardinal/themes/tomorrow-night.js'),
  readline: require('readline-history'),
  md5: require('md5')
}

global.__locus_modules__.print = require('./print');
global.__locus_modules__.prompt = require('./prompt');

global.__locus_running__ = false;
global.locus = module.exports = script;
