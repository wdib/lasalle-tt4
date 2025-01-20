// Create a function that sums integers in an array

const int_list = [ 1, 2, 3, 4, 5 ];

function sumFn ( arr ) {
  // Declare a variable to store the sum and initialise it to 0
  let sum_int = 0;

  // Loop through the array's integers
  for ( let i = 0; i < arr.length; i++ ) {
    sum_int += arr[ i ];
    // The above line is equivalent to writing:
    // sum_int = sum_int + arr[ i ];
  }

  return sum_int;
}

console.log( sumFn( int_list ) );