var UglifyJS = require("uglify-js");
var fs = require('fs');
var _ = require('lodash');

exports.get = function(filepath) {
  var variables = [];
  var ast = UglifyJS.parse(fs.readFileSync(filepath, 'utf-8'));
  ast.figure_out_scope();

  var walker = new UglifyJS.TreeWalker(function(node) {
    if (node.variables) {
      var nodeVariables = _.values(node.variables._values).map(function(item) {
        return item.name;
      });

      variables = variables.concat(nodeVariables);
    }
  });

  ast.walk(walker);

  return _.uniq(variables);
}
