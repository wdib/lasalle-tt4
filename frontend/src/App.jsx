import { useState, useEffect } from 'react';
import SearchBar               from './components/SearchBar';
import UserList                from './components/userList';
import httpReq                 from './utils/httpReq';
import './App.css';

function App () {
  const [ itemList, setItemList ] = useState( [] );

  useEffect( function () {
    httpReq( 'get', '/item/list' )
      .then( item_list => {
        setItemList( item_list );
      })
      .catch( error => {
        console.error( error );
      })
    ;
  }, [] );

  function handleAdd ( item_map ) {
    // Update the itemList variable in the state to add the new item
    setItemList( [ ...itemList, item_map ] );
  }

  return (
    <>
      <h1>Welcome to TT4</h1>
      <SearchBar
        onSubmit = { handleAdd }
      />
      {
        itemList.length > 0 &&
        <UserList
          itemList = { itemList }
        />
      }
    </>
  );
}

export default App;