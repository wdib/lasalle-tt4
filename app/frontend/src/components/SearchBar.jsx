import httpReq from '../utils/httpReq';
import '../css/SearchBar.css';

function SearchBar ( { dispatch } ) {

  function handleKeyDown ( event ) {
    if ( event.key === 'Enter' ) {
      let input_value = event.target.value;
      let body_map    = { name : input_value };
      // Make an HTTP request to create my user (item)
      httpReq( 'post', '/item/create', body_map )
        .then( item_map => {
          // Update the state of the React app with the newly-created item
          dispatch({
            type : 'add',
            body : item_map
          });
        })
        .catch( error => {
          console.error( error );
        })
      ;
      event.target.value = '';
    }
  }

  return (
    <input
      className   = "search-bar"
      type        = "text"
      placeholder = "Who would you like to add today?"
      onKeyDown   = { handleKeyDown }
    />
  );
}

export default SearchBar;