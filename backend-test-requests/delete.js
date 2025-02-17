import axiosObj from 'axios';

axiosObj.delete( 'http://127.0.0.1:3000/item/delete/c0' )
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
;