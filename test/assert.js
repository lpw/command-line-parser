const commandLineParser = require('../index');
const assert = require('assert');

const args = [ '/my/bin/node', './myscript.js', '-port', 8081, '-a', 'b', '-c', '-dee', 'e', 'extra', 'something', '-f' ];

argsObj = commandLineParser( args );

console.log('commandLineParser with', args );
console.log('commandLineParser returned', argsObj );

assert( argsObj.port === 8081 );
assert( argsObj.a === 'b' );
assert( argsObj.c === true );
assert( argsObj.dee === 'e' );
assert( argsObj.f === true );
assert( argsObj._extraArgs.length === 4 );
assert( argsObj._extraArgs[2] === 'extra' );
assert( argsObj._extraArgs[3] === 'something' );
