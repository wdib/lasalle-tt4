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
    setItemList( [ ...itemList, item_map ] );
  }

  function handleUpdate ( update_item_map ) {
    setItemList(
      itemList.map( item_map => {
        if ( item_map.id === update_item_map.id ) {
          return update_item_map;
        }
        return item_map;
      })
    );
  }

  function handleRemove ( item_id ) {
    setItemList(
      itemList.filter( item_map => item_id !== item_map.id )
    );
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
          itemList = { itemList     }
          onUpdate = { handleUpdate }
          onRemove = { handleRemove }
        />
      }
    </>
  );
}

export default App;