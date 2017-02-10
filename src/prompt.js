var path = require('path');
var readline = __locus_modules__.readline;
var md5 = __locus_modules__.md5;
var color = __locus_modules__.color;
var _rl;

function completer(line) {
  var globalKeys = Object.keys(global);

  var hits = globalKeys.filter(function(c){
    return c.indexOf(line) === 0
  });

  return [hits.length ? hits : globalKeys, line];
}

var rl = __locus_modules__.deasync(function(filepath, cb) {
  if (_rl) return cb(null, _rl);

  readline.createInterface({
    path: path.join(__dirname, '..', 'histories', md5(filepath)),
    maxLength: 100,
    input: process.stdin,
    output: process.stdout,
    completer: completer,
    next: function(rli) {
      _rl = rli;
      cb(null, _rl);
    }
  });
});

exports.get = __locus_modules__.deasync(function(filepath, cb) {
  rl(filepath).question(color.blueBright('ʆ: '), function (text) {
    cb(null, text);
  });
});

exports.close = function() {
  _rl.close();
  _rl = null;
};
