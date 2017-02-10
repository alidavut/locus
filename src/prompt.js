var path = require('path');
var readline = require('readline-history');
var md5 = require('md5');
var color = require('cli-color');
var deasync = require('deasync');
var variables = require('./variables');
var _rl;

function generateCompleter(filepath) {
  var fileVariables = Object.keys(global).concat(variables.get(filepath));

  return function(line) {
    var hits = fileVariables.filter(function(c){
      return c.indexOf(line) === 0
    });

    return [hits.length ? hits : fileVariables, line];
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
