# command-line-parser

This simple lightweight module exports a default function that takes an array of command-line arguments and returns a parsed object (quite a bit simpler than the venerable ```minimist```). 
* Each argument is separate - it does not support combining multiple options (or options with values) into one argument.  
* Only the first character is examined for a dash to see if it should be treated as a key to an option (double-dashes mean nothing special here).

Any argument with a dash is considered one key and will be in the parsed object with the following value:
* If the key is followed by a non-dash argument, its value will be that of the non-dash argument.
* If the key is not followed by a non-dash argument, its value will be true.

Arguments that don't fulfill the role of a key or a value for a key will be added to a field called ```_extraArgs``` in the parsed object.

For example, this code:
```
const commandLineParser = require('command-line-parser');
const argsObj = commandLineParser();	// defaults to  process.argv.slice(2)
const { v, debug, host, port, _extraArgs: files } = argsObj;	// same as host = argsObj.port etc
```
invoked with:
```
node ./myscript.js -v -debug -host there.com -port 8081 myfile
```
the resultant ```argsObj``` object would then have:
* v === true
* debug === true
* host === 'there.com'
* port === 8081
* files[2] === 'myfile'

See ```test/assert.js``` for example usage.

Run tests via ```npm test```.
