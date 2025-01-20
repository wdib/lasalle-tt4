function createMessageAFn ( str1, str2 ) {
  return str1 + ' ' + str2;
}

function createMessageBFn ( str1, str2 ) {
  return `${str1} ${str2}`;
}

export default {
  createMessageAFn : createMessageAFn,
  createMessageBFn : createMessageBFn,
};