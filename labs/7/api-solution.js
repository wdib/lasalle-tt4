// BEGIN global variables ----------------------------------------------------
const
  expressObj = require( 'express' ),
  app        = expressObj(),
  bodyParser = require( 'body-parser' ),
  port       = 3000
;

let users = [
  { id : 1,  name : 'Sally'     },
  { id : 2,  name : 'Paul'      },
  { id : 3,  name : 'Jake'      },
  { id : 4,  name : 'Bob'       },
  { id : 5,  name : 'Tim'       },
  { id : 6,  name : 'Sophie'    },
  { id : 7,  name : 'Helen'     },
  { id : 8,  name : 'Michael'   },
  { id : 9,  name : 'Gabrielle' },
  { id : 10, name : 'Stephen'   },
  { id : 11, name : 'Nadia'     },
  { id : 12, name : 'Nadir'     },
  { id : 13, name : 'George'    },
];
// . END global variables ----------------------------------------------------


// BEGIN middleware ----------------------------------------------------------
app.use( bodyParser.json() );
// . END middleware ----------------------------------------------------------


// BEGIN routes --------------------------------------------------------------
app.get( '/users', ( request, response ) => {
  const
    limit_count  = parseInt( request.query.limit  ) || 10,
    offset_count = parseInt( request.query.offset ) || 0,
    start_idx    = offset_count,
    end_idx      = start_idx + ( limit_count > 10 ? 10 : limit_count )
  ;
  response.json( users.slice( start_idx, end_idx ) );
});

app.get( '/users/:id', ( request, response ) => {
  const user = users.find(
    user => user.id === parseInt( request.params.id )
  );
  if ( ! user ) {
    return response.status( 404 ).send( 'User not found' );
  }
  response.json( user );
});

app.post( '/users', ( request, response ) => {
  const user = request.body;
  if ( ! user.name ) {
    return response.status( 400 ).send( 'Name is required' );
  }

  let is_invalid = user.name.trim() === ''
    || ! /^[A-Za-z\s]+$/.test( user.name )
  ;
  if ( is_invalid ) {
    return response.status( 400 ).send( 'Name is not valid' );
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