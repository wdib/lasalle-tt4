function addByPushFn ( iteration_count ) {
  let
    int_list = [],
    start_ms, end_ms, duration_ms,
    i
  ;
  start_ms = performance.now();
  for ( i = 0; i < iteration_count; i++ ) {
    int_list.push( i );
  }
  end_ms      = performance.now();
  duration_ms = end_ms - start_ms;
  console.log( 'Adding by push took: ' + duration_ms + ' ms' );
  return duration_ms;
}

function addByIndexFn ( iteration_count ) {
  let
    int_list = [],
    start_ms, end_ms, duration_ms,
    i
  ;
  start_ms = performance.now();
  for ( i = 0; i < iteration_count; i++ ) {
    int_list[ i ] = i;
  }
  end_ms      = performance.now();
  duration_ms = end_ms - start_ms;
  console.log( 'Adding by index took: ' + duration_ms + ' ms' );
  return duration_ms;
}

function mainFn () {
  let
    iteration_count = 1e6,
    push_total_ms   = 0,
    index_total_ms  = 0,
    push_avg_ms, index_avg_ms, i
  ;

  for ( i = 0; i < 3; i++ ) {
    push_total_ms += addByPushFn( iteration_count );
  }
  push_avg_ms = push_total_ms / 3;
  console.log( 'Average for add by push: ' + push_avg_ms + ' ms' );

  for ( i = 0; i < 3; i++ ) {
    index_total_ms += addByIndexFn( iteration_count );
  }
  index_avg_ms = index_total_ms / 3;
  console.log( 'Average for add by index: ' + index_avg_ms + ' ms' );
}

mainFn();