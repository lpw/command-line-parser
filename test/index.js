const args = [ '/my/bin/node', './myscript.js', '-port', 8081, '-a', 'b', '-c', '-dee', 'e', 'extra', 'something', '-f' ];

const should = require('chai').should();
const commandLineParser = require('../index');

describe( '#commandLineParser', function() {
  it( 'correctly parses args', function() {
    const argsObj = commandLineParser( args );
    argsObj.port.should.equal( 8081 );
    argsObj.a.should.equal( 'b' );
    argsObj.c.should.be.true;
    argsObj.dee.should.equal( 'e' );
    argsObj.f.should.be.true;
    argsObj._extraArgs.should.have.length( 4 );
    argsObj._extraArgs[2].should.equal( 'extra' );
    argsObj._extraArgs[3].should.equal( 'something' );
    argsObj.a.should.equal( 'b' );
  });
});
