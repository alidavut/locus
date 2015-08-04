ʆ LOCUS
=======

Locus is a line injection module for node.js.

It allows to open a REPL during your program execution, with access to all variables.

## Installing

```bash
npm install locus
```

## Using
To load locus globally add this line of code in any file of the project: ``` require('locus') ```

Note: Loading in development environments is recommended.

Then use this command in any line: ``` eval(locus) ``` or ```eval(require('locus'))```

To leave locus just type ``` quit ```

### Example session

Code : `example.js`

```javascript
require('locus');

function repeat(str, count) {
  var result = '';
  for(var i = 0; i < count; i++) {
    result += str;
  }
  return result;
}
eval(locus);

console.log('finished');
```

![example.png](example.png)
