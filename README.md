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
* Each argument is separate - no support for combining multiple options (or options with values) into one argument (as in ```-abc``` or ```-n5```).  
* Only the first character is examined for a dash to see if it should be treated as a key to an option (only the first dash of ```--debug``` would be processed).

Any argument with a dash is considered one key and will be in the parsed object with the following value:
* If the key is followed by a non-dash argument, its value will be the non-dash argument (as in ```-key value```).
* If the key is not followed by a non-dash argument, its value will be true (as in ```-key1 -key2```).

Arguments that don't fulfill the role of a key or a value for a key will be added to a field called ```_args``` in the parsed object.

If no argument is passed in to the default module function, it defaults to the array ```process.argv.slice(2)```.

See ```test/assert.js``` for example usage.

Install with ```npm install command-line-parser```.

Test via ```npm test```.

PS. Useful pattern using destructuring assignment, default values, and renaming ```_args```:
```
const { v, debug = false, host = 'default.com', port = '80', _args: files = [] } = argsObj ;
```
will assign the locally scoped constant variables ```v```, ```debug```, ```host```, ```port```, and ```files```.
