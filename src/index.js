global.locusModules = {};
global.locusModules.deasync = require.resolve('deasync');
global.locusModules.color = require.resolve('cli-color');
global.locusModules.stackTrace = require.resolve('stack-trace');
global.locusDone = true;

function listener() {
  var EXCLUDED_NAMES = ['global', 'GLOBAL', 'locusModules',
                      'locusReadLine', 'locusDone', 'locus'];

  var deasync = require(global.locusModules.deasync);
  deasync.loopWhile(function(){ return !locusDone });

  global.locusDone = false;
  var localDone = false;
  var color = require(global.locusModules.color);
  var util = require('util');

  var rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: completer
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
          rl.close();
          global.locusDone = true;
          return localDone = true;
        } else {
          var result = eval(text);
          console.log(color.greenBright(util.inspect(result, false, 1, true)));
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

  function completer(text, cb, scope) {
    scope = scope || 'GLOBAL';

    var lastDot = text.lastIndexOf('.');
    var parent = text.slice(0, lastDot);
    var name = text.slice(lastDot + 1);
    if (lastDot > -1) {
      return completer(name, null, parent);
    }

    var target = eval(scope);
    if (typeof target !== 'object' || target == null) {
      return [[], text];
    }

    var list = Object.keys(target).filter(function(prop) {
      return EXCLUDED_NAMES.indexOf(prop) === -1;
    });

    var matches = list.filter(function(prop) {
      return prop.indexOf(text) === 0;
    });

    return [matches, text];
  }

  deasync.loopWhile(function(){ return !localDone });
}

global.locus = '(' + listener.toString() + ').call(this)';
module.exports = locus;
