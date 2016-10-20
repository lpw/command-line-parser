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

A key argument (one starting with a dash) will look to the next argument for a value (as in ```-key value```), unless the following argument also starts with a dash (as in ```-key1 -key2```), or unless that key argument is in the list of boolean keys passed to the parser function ```{ booleanKeys: 'debug' }```.  If the key argument does not have a value, its value is set to true in the parsed object.

Arguments that don't fulfill the role of a key or a value will be added to a field called ```_args``` in the parsed object.

If behavior is desired to allow grouping of single letter keys such as ```-abc``` setting three one-letter keys instead of one three-letter key, then pass in ```{ allowKeyGrouping: true }``` to the parser function.  Key grouping can be overridden for an argument by prefixing it with double-dashes, so that ``` -lt --debug``` sets:
```
{
	l: true,
	t: true,
	debug: true
}
```
The parsing function processes ```process.argv.slice(2)``` by default, but arguments can be passed in to the parser function such as ```{ args = [ '-v', '--debug' ] }```.  The configuration object that can be passed in to the parser function looks like:
```
function parser( { booleanKeys = [], allowKeyGrouping = false, args = process.argv.slice(2) } = {} )
```
Install with ```npm install command-line-parser```.

Test via ```npm test``` (and see test/index.js for some examples).

PS. Useful pattern using destructuring assignment, default values, and renaming ```_args```:
```
const { v, debug = false, host = 'default.com', port = '80', _args: files = [] } = argsObj ;
```
will assign the locally scoped constant variables ```v```, ```debug```, ```host```, ```port```, and ```files```.
