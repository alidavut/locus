LOCUS
=====

Locus is a line injection module for node.js.

It allows to open a REPL during your program execution, with access to all variables.


## Installing

```
npm install locus
```

## Using
To load locus globally add this line of code in any file of the project: ``` require('locus') ```

Note: Loading in development environments is recommended.

Then use this command in any line: ``` eval(locus) ```

To leave locus just type ``` quit ```

### Example session

Code : `test.js`

```javascript
'use strict';

require('locus');

console.log('Hello world !');

var foo = 'bar';
console.log("foo is :", foo);
eval(locus);
console.log("foo is now :", foo);
```

Now run this program with `node test.js` :

```
Hello world !
foo is : bar
> foo          <-- here the REPL open. I type "foo"
bar            <-- and get its value : I have access to program scope variables !
> foo="baz"    <-- I now manually override foo
baz
> quit         <-- and exit the REPL
foo is now : baz  <-- foo did change in program scope !
```
