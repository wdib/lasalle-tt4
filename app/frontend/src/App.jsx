import { useEffect, useReducer } from 'react';
import SearchBar               from './components/SearchBar';
import UserList                from './components/UserList';
import httpReq                 from './utils/httpReq';
import reducer                 from './reducer';
import './App.css';

function App () {
  const [ itemList, dispatch ] = useReducer( reducer, [] );

  useEffect( function () {
    httpReq( 'get', '/item/list' )
      .then( item_list => {
        dispatch({
          type : 'init',
          body : item_list
        });
      })
      .catch( error => {
        console.error( error );
      })
    ;
  }, [] );

  return (
    <>
      <h1>Welcome to TT4</h1>
      <SearchBar
        dispatch = { dispatch }
      />
      {
        itemList.length > 0 &&
        <UserList
          itemList = { itemList }
          dispatch = { dispatch }
        />
      }
    </>
  );
}

export default App;