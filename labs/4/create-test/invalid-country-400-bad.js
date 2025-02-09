import axiosObj from 'axios';

axiosObj.post( 'http://127.0.0.1:3000/item/create',
  { name : 'Sally', age : 23, country : 'Ice' }
)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
;