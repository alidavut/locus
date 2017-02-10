var escope = require('escope');
var esprima = require('esprima');
var estraverse = require('estraverse');
var fs = require('fs');
var _ = require('lodash');

exports.get = function(filepath) {
  var variables = [];

  try {
    var ast = esprima.parse(fs.readFileSync(filepath, 'utf-8'));
  } catch(e) {
    return [];
  }

  var scopeManager = escope.analyze(ast);
  var currentScope = scopeManager.acquire(ast);

  estraverse.traverse(ast, {
    leave: function(node, parent) {
      var scope = scopeManager.acquire(node);

      if (scope) {
        var nodeVariables = _.values(scope.variables).map(function(item) {
          return item.name;
        });

        variables = variables.concat(nodeVariables)
      }
    }
  });

  return _.uniq(variables);
}
