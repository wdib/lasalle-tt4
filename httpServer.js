import expressObj from 'express';

const app = expressObj();

const itemList = [];

app.get( '/item/list', function ( request, response ) {
  response.set( 'Content-Type', 'application/json' );
  response.send( itemList );
});

const server = app.listen( 3000, '127.0.0.1', function () {
  console.log( 'HTTP server listening on 127.0.0.1:3000' );
});