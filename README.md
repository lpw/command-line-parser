# command-line-parser
This code:
```
const argsObj = require('command-line-parser')();
```
invoked with:
```
node ./myscript.js myfile1 -v -debug -host there.com -port 8081 myfile2
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
This simple lightweight module exports a default function that takes an array of command-line arguments and returns a parsed object (a bit simpler than the venerable ```minimist```).

A key argument will be in the parsed object with the following value:
* If the key is followed by a non-dash argument, its value will be the non-dash argument (as in ```-key value```).
* If the key is not followed by a non-dash argument, its value will be ```true``` (as in ```-key1 -key2```).

Arguments that don't fulfill the role of a key or a value for a key will be added to a field called ```_args``` in the parsed object.

Prefixing an argument with a dash indicates that the argument is one key.  However, passing ```true``` into the parser ```require('command-line-parser')(true)```allows a parsing mode where dash indicates that each letter be treated like separate one-letter keys.  This option would cause ```-lt``` to set an object with:
```
{
	l: true,
	t: true
}
```
If it's desired to have a multi-letter argument represent one key in this mode, then two dashes should be specified for that argument, for instance ``` -lt --debug``` sets:
```
{
	l: true,
	t: true,
	debug: true
}
```
The parsing function takes these arguments with their respective default values:
```
require('command-line-parser')( allowMultiKeys = false, arguments = process.argv.slice(2));
```
Install with ```npm install command-line-parser```.

Test via ```npm test``` (and see test/index.js for some examples).

A couple of considerations - perhaps a number in a key should indicate the value, so ```-n5``` becomes:
```
{
	n: 5
}
```
And how best to disambiguate between whether an argument should serve as a value or an an argument.

PS. Useful pattern using destructuring assignment, default values, and renaming ```_args```:
```
const { v, debug = false, host = 'default.com', port = '80', _args: files = [] } = argsObj ;
```
will assign the locally scoped constant variables ```v```, ```debug```, ```host```, ```port```, and ```files```.
