import expressObj from 'express';

const app = expressObj();

app.get( '/', function ( request, response ) {
  response.set( 'Content-Type', 'text/plain' );
  response.send( 'Welcome to the HTTP server!\n' );
});

const server = app.listen( 3000, '127.0.0.1', function () {
  console.log( 'HTTP server listening on 127.0.0.1:3000' );
});