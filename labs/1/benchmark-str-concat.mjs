import strConcatObj from './string-concatenation.mjs';

const
  createMessageAFn = strConcatObj.createMessageAFn,
  createMessageBFn = strConcatObj.createMessageBFn
;

// Begin /benchmark A vs. B/
// Purpose : Compare the performance of functions A and B
// Actions :
//   * Start a timer
//   * Execute the function 1000 times
//   * Stop the timer
//
console.time( 'A' );
for ( let i = 0; i < 1000; i++ ) {
  createMessageAFn( 'Hello', 'World' );
}
console.timeEnd( 'A' );

console.time( 'B' );
for ( let i = 0; i < 1000; i++ ) {
  createMessageBFn( 'Hello', 'World' );
}
console.timeEnd( 'B' );
// . END /benchmark A vs. B/