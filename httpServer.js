import httpObj from 'node:http';

const server = httpObj.createServer( function ( request, response ) {
  response.writeHead( 200, { 'content-type' : 'text/plain' } );
  response.end( 'Welcome to the HTTP server!\n' );
});

server.listen( 3000, '127.0.0.1', function () {
  console.log( 'HTTP server listening on 127.0.0.1:3000' );
});