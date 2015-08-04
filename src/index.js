global.locusModules = {};
global.locusModules.deasync = require.resolve('deasync');
global.locusModules.color = require.resolve('cli-color');
global.locusModules.stackTrace = require.resolve('stack-trace');
global.locusHistory = [];

function listener() {
  var done = false;
  var readline = require('readline');
  var color = require(global.locusModules.color);
  var deasync = require(global.locusModules.deasync);

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  writeBlock();
  exec.call(this);

  function writeBlock () {
    var trace = require(global.locusModules.stackTrace).parse(new Error());
    var fileName = trace[3].getFileName();
    var file = require('fs').readFileSync(fileName, 'utf8');
    var lines = file.split('\n');
    var lineNumber = trace[3].getLineNumber() - 1;
    var start = lineNumber > 8 ? lineNumber - 8 : 0;
    var header = ' ' + fileName + ' - Line: ' + lineNumber + ' ';
    var border = '';

    for(var i = 0; i < header.length; i++) {
      border += '—';
    }

    console.log('');
    console.log(color.xterm(236).bgXterm(220)(header));
    console.log(color.xterm(244)(border));

    for(var i = start; i < lineNumber; i++) {
      console.log(i + ' : ' + color.xterm(220)(lines[i]));
    }
  }

  function exec() {
    var cb = function (text) {
      try {
        if (text === 'quit' || text === 'exit') {
          return done = true;
        } else {
          var result = eval(text);

          if (result === null) {
            result = 'null';
          } else if (result === undefined) {
            result = 'undefined';
          }

          console.log(color.greenBright(result));
          exec.call(this);
        }
      } catch(err) {
        console.log(color.redBright(err));
        exec.call(this);
      }
    };

    var __self = this;
    rl.question(color.blueBright('ʆ: '), function (text) {
      cb.call(__self, text);
    });
  }

  deasync.loopWhile(function(){ return !done });
}

global.locus = '(' + listener.toString() + ').call(this)';
module.exports = locus;