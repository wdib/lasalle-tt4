// file: user.js
function getName () {
  return 'Sally';
}

const age = 30;

export { username, age };

// file: app.js
import { getName, age } from './user.js';

console.log( getName() ); // Alice
console.log( age );      // 30