function createMessageA ( str1, str2 ) {
  return str1 + ' ' + str2;
}

function createMessageB ( str1, str2 ) {
  return `${str1} ${str2}`;
}

function createMessageC ( str1, str2 ) {
  return str1 + str2;
}

// The following prints the output of the above functions:
// console.log( createMessageA( 'Hello', 'World' ) );
// console.log( createMessageB( 'Hello', 'World' ) );
// console.log( createMessageC( 'Hello', 'World' ) );

// The following is a benchmark test for functions A vs. B:
// Execute each function 1000 times
// Time the duration it takes for this execution
// Goal: compare the performance of each of the functions
// We're going to test functions A and B

console.time( 'A' ); // Starts the timer

// Executes a function 1000 times
for ( let i = 0; i < 10000000; i++ ) {
  createMessageA( 'Hello', 'World' );
}

console.timeEnd( 'A' ); // Ends the timer