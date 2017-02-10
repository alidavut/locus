var __locus_stack__ = __locus_modules__.parseStack(new Error());
var __locus_filepath__ = __locus_stack__[1].filepath;
var __locus_line__ = __locus_stack__[1].lineNumber;

__locus_modules__.deasync.loopWhile(function() {
  return __locus_running__;
});

__locus_modules__.print.file(__locus_filepath__, __locus_line__);

// for autocomplete improvements
global.__locus_eval__ = function(code) {
  return eval(code);
}

while (true) {
  __locus_running__ = true;

  var __locus_code__ = __locus_modules__.prompt.get(__locus_filepath__);

  try {
    if (__locus_code__ === 'exit') {
      __locus_running__ = false;
      __locus_modules__.prompt.close();
      break;
    } else {
      __locus_modules__.print.success(eval(__locus_code__));
    }
  } catch(err) {
    __locus_modules__.print.error(err);
  }
}
