# command-line-parser
This statement:
```
const argsObj = require('command-line-parser')();
```
returns this ```argsObj``` object:
```
{
	v: true,
	debug: true,
	host: 'there.com',
	port: '8081',
	_args: [ 'myfile1', 'myfile2' ]
}
```
when invoked with:
```
node ./myscript.js myfile1 -v -debug -host there.com -port 8081 myfile2
```
This simple lightweight module exports a default function that takes an array of command-line arguments and returns a parsed object (a bit simpler than the venerable ```minimist``` or ```commander```).

### Arguments as keys and values
A key argument (starts with a dash) looks to the next argument for a value, such as ```-foo bar```.  If ```foo``` does not find a value, a default value of ```true``` will be set.

There's a few ways in which ```foo``` might not find a value:
* the following argument also starts with a dash, as in ```-foo -hey```
* there are no more arguments
* ```foo``` is set in ```booleanKeys``` of config (an optional argument):
```
const argsObj = require('command-line-parser')({
	booleanKeys: [ 'foo' ]
});
```
A key with multiple leading dashes such as ```--debug``` will be the same as ```-debug``` (with the exception of overriding the optional argument ```allowKeyGrouping``` described below).

A key with embedded dashes or spaces will be converted to ```camelCase``` from ```camel-case```.

Arguments that don't fulfill the role of a key or a value will be added in an array to a key called ```_args``` in the parsed object.

To avoid any arguments intended for ```_args``` from becoming the unintentional value of a preceding boolean key, either specify that boolean key in ```booleanKeys``` of config, or follow that boolean key with a placeholder argument such as a single ```-``` or double dash ```--``` on the command line.
```
node ./myscript.js -d -- foo1 foo2 foo3
```

### Embedding numerical values within keys
Instead of having to separate a numerical argument from its key:
```
node ./myscript.js -n 8
```
it may be embedded in the key:
```
node ./myscript.js -n8
```
by setting ```allowEmbeddedValues``` in the config:
```
const argsObj = require('command-line-parser')({
	allowEmbeddedValues: true
});
```
to give the result
```
{
	n: 8
}
```
### Single letter key grouping
To parse a leading-dash argument such as ```-abc``` as single-letter keys instead of one multi-letter key, then set ```allowKeyGrouping``` in config so that
```
node ./myscript.js -abc
```
when parsed by
```
const argsObj = require('command-line-parser')({
	allowKeyGrouping: true
});
```
gives the result
```
{
	a: true,
	b: true,
	c: true
}
```
```allowKeyGrouping``` can be overridden on the command-line by prefixing the argument with double-dashes, so that
```
node ./myscript.js --abc
```
becomes
```
{
	abc: true
}
```

### Passing configuration
An optional configuration object may be passed in that will override these default values:
```
const argsObj = require('command-line-parser')({
	args = process.argv.slice(2),	// skip the binary and script file args
	booleanKeys = [],
	allowKeyGrouping: false,
	allowEmbeddedValues: false
});
```
### Installation and testing
Install with ```npm install command-line-parser```.

Test via ```npm test``` (and see test/index.js for some examples).

### Useful destructuring assignment pattern
This is a common pattern using destructuring assignment (available in ES6 or via Babel) which can be useful here, especially with default values, and perhaps renaming ```_args```:
```
const {
	v,
	debug = false,
	host = 'default.com',
	port = '80',
	_args: files = []
} = argsObj ;
```
will assign the locally scoped constant variables ```v```, ```debug```, ```host```, ```port```, and ```files```.
