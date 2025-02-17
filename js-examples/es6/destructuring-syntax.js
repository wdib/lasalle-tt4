const user = {
  name : 'Sally',
  age  : 30,
  job  : 'Developer',
};

// Destructuring the properties in the function argument
const greetUserOne = ( { name, job } ) => {
  console.log( `Hello, ${name}! You are a ${job}.` );
};

// Destructuring the object properties as local constants
const greetUserTwo = ( user ) => {
  const { name, job } = user;
  console.log( `Hello, ${name}! You are a ${job}.` );
};

// Passing the entire object
greetUserOne( user ); // Hello, Sally! You are a Developer.
greetUserTwo( user ); // Hello, Sally! You are a Developer.