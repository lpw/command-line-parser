# command-line-parser

This module exports a default function that takes an array of command-line arguments from node and returns a parsed object.

Any argument with a dash is considered a key.  If followed by a non-dash argument, the key in that parsed object will have the value of that following non-dash argument - otherwise, the key will be set to true.

Non-dash arguments that don't fulfill a value for a key will be added to a field called ```_extraArgs``` in the parsed object.

See ```test/assert.js``` for example usage.
```
const commandLineParser = require('./command-line-parser.js');
const assert = require('assert');
argsObj = commandLineParser( process.argv );
```

Run tests via ```npm test```.
