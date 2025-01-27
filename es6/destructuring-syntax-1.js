const user = {
  name : 'Sally',
  age  : 30,
  job  : 'Developer',
};

// Destructuring the properties in the function argument
const greetUser = ( { name, job } ) => {
  console.log( `Hello, ${name}! You are a ${job}.` );
};

// Passing the entire object
greetUser( user ); // Hello, Sally! You are a Developer.