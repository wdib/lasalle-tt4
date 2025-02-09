import expressObj    from 'express';
import morganObj     from 'morgan';
import jsonSchemaObj from 'jsonschema';

const
  app          = expressObj(),
  itemList     = [],
  Validator    = jsonSchemaObj.Validator,
  validatorObj = new Validator(),
  schemaMap    = {
    type                 : 'object',
    additionalProperties : false,
    properties           : {
      name    : { type : 'string', minLength : 2 },
      age     : { type : 'number' },
      country : { type : 'string', minLength : 4 },
    },
    required             : [ 'name', 'country' ]
  }
;

let idCounter = 0;

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
app.use( expressObj.json() );
app.use( morganObj( 'dev' ) );
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
  let
    item_map   = request.body,
    report_map = validatorObj.validate( item_map, schemaMap ),
    is_valid   = report_map.errors.length === 0,
    error_list, first_error_map, response_msg
  ;

  if ( ! is_valid ) {
    error_list      = report_map.errors;
    first_error_map = error_list[ 0 ];
    response_msg    = first_error_map.message
      + ' (' + first_error_map.property + ')'
    ;
    return response.status( 400 ).send( response_msg );
  }

  if ( ! item_map.hasOwnProperty( 'age' ) ) {
    item_map.age = 18;
  }

  item_map.id  = 'c' + idCounter;
  idCounter   += 1;
  itemList.push( item_map );
  response.send( item_map );
});

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

app.post( '/item/update/:id', function ( request, response ) {
  let
    item_id    = request.params.id,
    update_map = request.body,
    item_idx   = getIdx( item_id ),
    report_map, is_valid, error_list,
    first_error_map, response_msg
  ;

  if ( item_idx === null ) {
    return response.status( 404 ).send( 'Item not found' );
  }

  report_map = validatorObj.validate( update_map, schemaMap );
  is_valid   = report_map.errors.length === 0;
  
  if ( ! is_valid ) {
    error_list      = report_map.errors;
    first_error_map = error_list[ 0 ];
    response_msg    = first_error_map.message
      + ' (' + first_error_map.property + ')'
    ;
    return response.status( 400 ).send( response_msg );
  }

  if ( ! update_map.hasOwnProperty( 'age' ) ) {
    update_map.age = 18;
  }

  update_map.id        = item_id;
  itemList[ item_idx ] = update_map;
  response.send( itemList[ item_idx ] );
});

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
