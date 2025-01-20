function forLoopFn ( arr ) {
  let
    arr_count = arr.length,
    elem, i
  ;
  for ( i = 0; i < arr_count; i++ ) {
    elem  = arr[ i ];
    elem += 1;
  }
}

function forEachLoopFn ( arr ) {
  arr.forEach( function ( elem ) {
    elem += 1;
  });
}

function generateArrayFn ( arg_count ) {
  let
    arr = [],
    i
  ;
  for ( i = 0; i < arg_count; i++ ) {
    arr.push( i );
  }
  return arr;
}

function mainFn ( arg_count ) {
  let arr = generateArrayFn( arg_count );

  console.time( 'for' );
  forLoopFn( arr );
  console.timeEnd( 'for' );

  console.time( 'forEach' );
  forEachLoopFn( arr );
  console.timeEnd( 'forEach' );
}

mainFn( 10000000 );