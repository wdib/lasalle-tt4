import axiosObj from 'axios';

axiosObj.post( 'http://127.0.0.1:3000/item/update/c5',
  { name : 'Georges' }
)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
;