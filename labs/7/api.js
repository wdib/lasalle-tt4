// BEGIN global variables ----------------------------------------------------
const
  expressObj = require( 'express' ),
  app        = expressObj(),
  bodyParser = require( 'body-parser' ),
  port       = 3000
;

let users = [
  { id : 1, name : 'Sally' },
  { id : 2, name : 'Paul'  }
];
// . END global variables ----------------------------------------------------


// BEGIN middleware ----------------------------------------------------------
app.use( bodyParser.json() );
// . END middleware ----------------------------------------------------------


// BEGIN routes --------------------------------------------------------------
app.get( '/users', ( request, response ) => {
  response.json( users );
});

app.get( '/users/:id', ( request, response ) => {
  const user = users.find(
    user => user.id === parseInt( request.params.id )
  );
  if ( ! user ) {
    response.status( 404 ).send( 'User not found' );
  }
  response.json( user );
});

app.post( '/users', ( request, response ) => {
  const user = request.body;
  if ( ! user.name ) {
    return response.status( 400 ).send( 'Name is required' );
  }
  users.push({
    id   : users.length + 1,
    name : user.name
  });
  response.status( 201 ).send( 'User created' );
});

app.delete( '/users/:id', async ( request, response ) => {
  const
    userId    = parseInt( request.params.id ),
    userIndex = users.findIndex( user => user.id === userId )
  ;
  
  if ( userIndex === -1 ) {
    return response.status( 404 ).send( 'User not found' );
  }

  // Simulate an async operation
  await new Promise((resolve) => setTimeout(resolve, 1000));

  users.splice( userIndex, 1 );
  response.send( 'User deleted' );
});
// . END routes --------------------------------------------------------------


// Start the server ----------------------------------------------------------
app.listen( port, () => {
  console.log( `Server running on port ${ port }` );
});