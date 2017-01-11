var rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  // completer: completer
});

exports.get = function(cb) {
  var color = __locus_modules__.color;

  rl.question(color.blueBright('ʆ: '), function (text) {
    cb(text);
  });
}

exports.close = function() {
  rl.close();
};
