var path = require('path');
var readline = require('readline-history');
var md5 = require('md5');
var color = require('cli-color');
var deasync = require('deasync');
var variables = require('./variables');
var _ = require('lodash');
var _rl;

function getAllProperties(obj) {
  var prototype = obj.constructor.prototype;

  return Object.getOwnPropertyNames(
    Object.getPrototypeOf(prototype) || prototype
  ).concat(Object.getOwnPropertyNames(obj));
}

function generateCompleter(filepath) {
  var fileVariables = Object.keys(global).concat(variables.get(filepath));

  return function(line) {
    var lineArray = line.split('.');
    var possibleHints;

    if (lineArray.length === 2) {
      var object = __locus_eval__(lineArray[0]);
      possibleHints = getAllProperties(object).map(function(i) {
        return lineArray[0] + '.' + i;
      });
    } else if (lineArray.length > 2) {
      possibleHints = [];
    } else {
      possibleHints = fileVariables;
    }

    var hits = possibleHints.filter(function(c){
      return c.indexOf(line) === 0
    });

    var result = [hits.length ? hits : possibleHints, line];

    return _.take(result, 20);
  }
}

var rl = deasync(function(filepath, cb) {
  if (_rl) return cb(null, _rl);

  readline.createInterface({
    path: path.join(__dirname, '..', 'histories', md5(filepath)),
    maxLength: 100,
    input: process.stdin,
    output: process.stdout,
    completer: generateCompleter(filepath),
    next: function(rli) {
      _rl = rli;
      cb(null, _rl);
    }
  });
});

exports.get = deasync(function(filepath, cb) {
  rl(filepath).question(color.blueBright('ʆ: '), function (text) {
    cb(null, text);
  });
});

exports.close = function() {
  _rl.close();
  _rl = null;
};
