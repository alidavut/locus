(function() {
  var Locus, _base;

  if (global.locus_variables == null) {
    global.locus_variables = {};
  }

  if ((_base = global.locus_variables).modules == null) {
    _base.modules = {};
  }

  global.locus_variables.modules.sync_prompt = require.resolve('sync-prompt');

  Locus = (function() {
    function Locus() {}

    Locus.listen = function() {
      var e, input, prompt, quit, _results;
      quit = false;
      _results = [];
      while (!quit) {
        prompt = require(locus_variables.modules.sync_prompt).prompt;
        input = prompt('> ').trim();
        try {
          if (input === 'quit' || input === 'exit') {
            _results.push(quit = true);
          } else {
            _results.push(console.log(eval(input)));
          }
        } catch (_error) {
          e = _error;
          _results.push(console.log(e));
        }
      }
      return _results;
    };

    return Locus;

  })();

  global.locus = "(" + (Locus.listen.toString()) + ").call(this)";

}).call(this);
