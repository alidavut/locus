var readline = require('readline');
var color = __locus_modules__.color;
var rl;

exports.get = __locus_modules__.deasync(function(cb) {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    // completer: completer
  });

  rl.question(color.blueBright('ʆ: '), function (text) {
    cb(null, text);
  });
});

exports.close = function() {
  rl.close();
};
