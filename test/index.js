const should = require('chai').should();
const commandLineParser = require('../index');

describe( '#commandLineParser', function() {

  it( 'correctly parses empty args', function() {
    const argsObj = commandLineParser( { args: [] } );
    argsObj.should.be.an('object');
    argsObj.should.deep.equal( { _args: [] } );  // nearly should.be.empty
  });

  it( 'correctly parses just dash args', function() {
    const argsObj = commandLineParser( { args: [ '-', '--', '---' ] } );
    argsObj.should.be.an('object');
    argsObj.should.deep.equal( { _args: [] } );  // nearly should.be.empty
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

  it( 'correctly parses full args with one dash but two-dashes supported', function() {
    process.argv = [ '/my/bin/node', './myscript.js', '-port', '8081', '-a', 'b', '-c', '-dee', 'e', 'extra', 'something', '-f' ];
    const argsObj = commandLineParser( { allowKeyGrouping: true } );
    const { p, o, r, t, a, c, d, e, f, _args: files } = argsObj ;

    p.should.be.true;
    o.should.be.true;
    r.should.be.true;
    t.should.be.true;
    a.should.equal( 'b' );
    c.should.be.true;
    d.should.be.true;
    e.should.be.true;
    f.should.be.true;
    files.should.have.length( 4 );
    files[0].should.equal( '8081' );
    files[1].should.equal( 'e' );
    files[2].should.equal( 'extra' );
    files[3].should.equal( 'something' );
  });

  it( 'correctly parses full args with two dashes', function() {
    process.argv = [ '/my/bin/node', './myscript.js', '--port', '8081', '-a', 'b', '-c', '--dee', 'e', 'extra', 'something', '-f' ];
    const argsObj = commandLineParser( { allowKeyGrouping: true } );
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

  it( 'correctly parses boolean keys even with arguments', function() {
    process.argv = [ '/my/bin/node', './myscript.js', '--port', '8081', '-a', 'b', '-c', '--dee', 'e', 'extra', 'something', '-f' ];
    const argsObj = commandLineParser( { booleanKeys: [ 'a', 'dee' ] } );
    const { port, a, c, dee, f, _args: files } = argsObj ;

    port.should.equal( '8081' );
    a.should.be.true;
    c.should.be.true;
    dee.should.be.true;
    f.should.be.true;
    files.should.have.length( 4 );
    files[0].should.equal( 'b' );
    files[1].should.equal( 'e' );
    files[2].should.equal( 'extra' );
    files[3].should.equal( 'something' );
  });

  it( 'correctly parses embedded keys', function() {
    process.argv = [ '/my/bin/node', './myscript.js', '-n8', '--number100', '--port', '8081', '-a', 'b', '-c', '--dee', 'e', 'extra', 'something', '-f' ];
    const argsObj = commandLineParser( { allowEmbeddedValues: true, booleanKeys: [ 'a', 'dee' ] } );
    const { n, number, port, a, c, dee, f, _args: files } = argsObj ;

    n.should.equal( '8' );
    number.should.equal( '100' );
    port.should.equal( '8081' );
    a.should.be.true;
    c.should.be.true;
    dee.should.be.true;
    f.should.be.true;
    files.should.have.length( 4 );
    files[0].should.equal( 'b' );
    files[1].should.equal( 'e' );
    files[2].should.equal( 'extra' );
    files[3].should.equal( 'something' );
  });

  it( 'correctly removes leading dashes from keys', function() {
    process.argv = [ '/my/bin/node', './myscript.js', '-n8', '--------------number100' ];
    const argsObj = commandLineParser();
    const { n8, number100 } = argsObj ;

    n8.should.be.true;
    number100.should.be.true;
  });

  it( 'correctly converts keys with embedded spaces or dashes to camelCase', function() {
    process.argv = [ '/my/bin/node', './myscript.js', '--po-rt', '8081', '--d-e e' ];
    const argsObj = commandLineParser();
    const { poRt, dEE } = argsObj ;

    poRt.should.equal( '8081' );
    dEE.should.be.true;
  });
});
