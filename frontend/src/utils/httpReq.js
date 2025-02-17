// method_name - 'get' or 'post'
// path_str    - an optional string added to the URL, e.g. /item/update
// body_map    - optional data to attach to the body of the HTTP request
function httpReq ( method_name, path_str, body_map ) {
  let
    req_map = {
      method : method_name,
      url    : 'http://127.0.0.1:3000' + ( path_str ? path_str : '' )
    }
  ;

  if ( body_map ) {
    req_map.data = body_map;
  }

  return axios( req_map )
    .then( response => {
      return response.data;
    })
    .catch( error => {
      console.error( error );
    })
  ;
}

export default httpReq;