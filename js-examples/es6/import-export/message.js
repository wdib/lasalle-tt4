function createMessage () {
  console.log( 'Hello world!' );
}

// Node.js-style export:
// module.exports = {
//   createMessage : createMessage
// };

// ES6 module export
export default {
  createMessage : createMessage
};