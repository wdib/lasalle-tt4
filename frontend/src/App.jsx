import { useState, useEffect } from 'react';
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

  return (
    <>
      <h1>Welcome to TT4</h1>
      <UserList
        itemList = { itemList }
      />
    </>
  );
}

export default App;