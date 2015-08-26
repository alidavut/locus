var EXCLUDED_NAMES = ['global', 'GLOBAL', 'locusModules', 'locusReadLine'];

module.exports = function completer(text, cb, scope) {
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
};
