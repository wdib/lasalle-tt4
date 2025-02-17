import expressObj from 'express';
import morganObj  from 'morgan';

const app = expressObj();

const itemList = [];

let idCounter = 0;

// Return the index of the object that matches item_id (if found)
// Otherwise, return null.
function getIdx ( item_id ) {
  let
    item_count = itemList.length,
    item_map, i
  ;
  for ( i = 0; i < item_count; i++ ) {
    item_map = itemList[ i ];
    if ( item_map.id === item_id ) {
      return i;
    }
  }
  return null;
}

// Begin middleware ----------------------------------------------------------
// This following line parses the data in a POST request and makes it
// available in request.body
app.use( expressObj.json() );
app.use( morganObj( 'dev' ) );
// . END middleware ----------------------------------------------------------


// Begin routes --------------------------------------------------------------
// I need a general route here that sets the Content-Type HTTP header in the
// response to application/json for all responses
//
app.all( '/item/*?', function ( request, response, next ) {
  response.set( 'Access-Control-Allow-Origin',      'http://localhost:5173' );
  response.set( 'Access-Control-Allow-Headers',     'content-type'          );
  response.set( 'Access-Control-Allow-Credentials', true                    );
  response.set( 'Content-Type', 'application/json' );
  next();
});

app.get( '/item/list', function ( request, response ) {
  response.send( itemList );
});

// Create
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

// Read
app.get( '/item/read/:id', function ( request, response ) {
  const item_id    = request.params.id;
  const item_idx   = getIdx( item_id );
  if ( item_idx !== null ) {
    response.send( itemList[ item_idx ] );
  }
  else {
    response.status( 404 ).send( 'Item not found' );
  }
});

// Update
app.post( '/item/update/:id', function ( request, response ) {
  const item_id    = request.params.id;
  const update_map = request.body;
  const item_idx   = getIdx( item_id );
  if ( item_idx !== null ) {
    update_map.id        = item_id;
    itemList[ item_idx ] = update_map;
    response.send( itemList[ item_idx ] );
  }
  else {
    response.status( 404 ).send( 'Item not found' );
  }
});

// Delete
app.delete( '/item/delete/:id', function ( request, response ) {
  const item_id  = request.params.id;
  const item_idx = getIdx( item_id );
  if ( item_idx !== null ) {
    itemList.splice( item_idx, 1 );
    response.status( 200 ).end();
  }
  else {
    response.status( 404 ).send( 'Item not found' );
  }
});
// End routes ----------------------------------------------------------------

const server = app.listen( 3000, '127.0.0.1', function () {
  console.log( 'HTTP server listening on 127.0.0.1:3000' );
});
