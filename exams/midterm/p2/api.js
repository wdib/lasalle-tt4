const
  expressObj = require( 'express' ),
  app        = expressObj(),
  port       = 3000
;

const
  product_list = [
    { id : 'c1', name : 'Laptop',     price : 1000, inventory: 10,  category : 'Electronics' },
    { id : 'c2', name : 'Smartphone', price : 800,  inventory: 5,   category : 'Electronics' },
    { id : 'c3', name : 'Desk',       price : 150,  inventory: 0,   category : 'Furniture'   },
    { id : 'c4', name : 'Chair',      price : 75,   inventory: 20,  category : 'Furniture'   },
    { id : 'c5', name : 'Headphones', price : 200,  inventory: 0,   category : 'Accessories' },
  ]
;

const
  order_list = [
    { id : 1, product_list : [ { id : 'c1' } ] },
    { id : 2, product_list : [ { id : 'c2' } ] },
    { id : 3, product_list : [ { id : 'c4' }, { id : 'c5' } ] },
  ]
;

function getProductIdx ( product_id ) {
  let
    product_count = product_list.length,
    product_map, i
  ;
  for ( i = 0; i < product_count; i++ ) {
    product_map = product_list[ i ];
    if ( product_map.id === product_id ) {
      return i;
    }
  }
  return null;
}

function hasOrders ( product_id ) {
  let
    order_count = order_list.length,
    order_map, product_list, product_count,
    i, j
  ;
  for ( i = 0; i < order_count; i++ ) {
    order_map     = order_list[ i ];
    product_list  = order_map.product_list;
    product_count = product_list.length;
    for ( j = 0; j < product_count; j++ ) {
      if ( product_list[ j ].id === product_id ) {
        return true;
      }
    }
  }
  return false;
}

app.delete( '/:id', function ( request, response ) {
  let
    product_id  = request.params.id,
    product_idx = getProductIdx( product_id ),
    inventory_count
  ;

  // Search that the product exists
  if ( product_idx === null ) {
    return response
      .status( 404 )
      .send( 'Product with ID ' + product_id + ' does not exist' )
    ;
  }

  // Ensure that it does not have any inventory
  inventory_count = product_list[ product_idx ].inventory;
  if ( inventory_count > 0 ) {
    return response
      .status( 409 )
      .send( 'Product with ID ' + product_id + ' still has inventory of ' + inventory_count )
    ;
  }

  // Ensure that it is not associated with any orders
  if ( hasOrders( product_id ) ) {
    return response
      .status( 409 )
      .send( 'Product with ID ' + product_id + ' still has associated order(s)' );
    ;
  }

  // Delete the product
  product_list.splice( product_idx, 1 );

  // Return the list
  response.status( 200 ).send( product_list );
});

app.listen( port, function () {
  console.log( 'Express server listening on port ' + port );
});