const should = require('chai').should();
const commandLineParser = require('../index');

describe( '#commandLineParser', function() {

  it( 'correctly parses empty args', function() {
    const argsObj = commandLineParser( [] );
    argsObj.should.be.empty;
    argsObj.should.be.an('object');
  });

  it( 'correctly parses full args', function() {
    process.argv = [ '/my/bin/node', './myscript.js', '-port', '8081', '-a', 'b', '-c', '-dee', 'e', 'extra', 'something', '-f' ];
    const argsObj = commandLineParser( );
    const { port, a, c, dee, f, _args: files } = argsObj ;

    port.should.equal( '8081' );
    a.should.equal( 'b' );
    c.should.be.true;
    dee.should.equal( 'e' );
    f.should.be.true;
    files.should.have.length( 2 );
    files[0].should.equal( 'extra' );
    files[1].should.equal( 'something' );
  });

});
