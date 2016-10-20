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
A key argument (one starting with a dash) looks to the next argument for a value (as in ```-key value```), unless the following argument also starts with a dash (as in ```-key1 -key2```), or unless that key argument is in ```booleanKeys``` passed to the parser function.

If the key argument does not have a value, its value is set to true in the parsed object.

Keys with embedded dashes or spaces will be converted to ```camelCase``` from ```camel-case```.

Arguments that don't fulfill the role of a key or a value will be added in an array to a key called ```_args``` in the parsed object.

### Embedding values with keys
If behavior is desired to allow embedded values with keys, as in ```-n8``` instead of ```-n 8```, then set ```allowEmbeddedValues``` in the config object passed to the parser function to get a result like:
```
{
	n: 8	// instead of n8: true without allowEmbeddedValues
}
```
### Single letter key grouping
If behavior is desired to allow grouping of single letter keys such as ```-abc``` setting three one-letter keys instead of one three-letter key, then set ```allowKeyGrouping``` in the config object passed to the parser function.  Key grouping can be overridden for an argument by prefixing it with double-dashes, so that ``` -lt --debug``` sets:
```
{
	l: true,
	t: true,	// instead of lt: true without allowKeyGrouping
	debug: true
}
```

### Passing configuration object into parser function
The configuration object that can be passed in to the parser function looks like:
```
function parser( {
		args = process.argv.slice(2),	// skip the binary program and script file args
		booleanKeys = [],
		allowKeyGrouping = false,
		allowEmbeddedValues = false
	} = {} )
```
### Installation and testing
Install with ```npm install command-line-parser```.

Test via ```npm test``` (and see test/index.js for some examples).

### Useful destructuring assignment pattern
This is a common pattern using destructuring assignment which can be effective here, especially with default values, and with renaming ```_args```:
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
