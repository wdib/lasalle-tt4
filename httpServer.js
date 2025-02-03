import expressObj from 'express';

const app = expressObj();

const itemList = [];

let idCounter = 0;

// Begin middleware ----------------------------------------------------------
// This following line parses the data in a POST request and makes it
// available in request.body
app.use( expressObj.json() );
// . END middleware ----------------------------------------------------------


// Begin routes --------------------------------------------------------------
// I need a general route here that sets the Content-Type HTTP header in the
// response to application/json for all responses
//
app.all( '/item/*?', function ( request, response, next ) {
  response.set( 'Content-Type', 'application/json' );
  next();
});

app.get( '/item/list', function ( request, response ) {
  response.send( itemList );
});

app.post( '/item/create', function ( request, response ) {
  // I need to access the body of the request which contains the data
  // for the object that I will be creating on the backend
  let item_map = request.body;
  item_map.id  = 'c' + idCounter; // For the first object, this will be "c0". Then, "c1", "c2" etc.

  // Increment the counter after using it to avoid ID collisions
  idCounter += 1;

  // Add the object to my itemList array
  itemList.push( item_map );
  
  // Send the newly-created object in the response
  response.send( item_map );
});
// End routes ----------------------------------------------------------------

const server = app.listen( 3000, '127.0.0.1', function () {
  console.log( 'HTTP server listening on 127.0.0.1:3000' );
});
