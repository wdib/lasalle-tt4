function createMessageAFn ( str1, str2 ) {
  return str1 + ' ' + str2;
}

function createMessageBFn ( str1, str2 ) {
  return `${str1} ${str2}`;
}

module.exports = {
  createMessageAFn : createMessageAFn,
  createMessageBFn : createMessageBFn,
};