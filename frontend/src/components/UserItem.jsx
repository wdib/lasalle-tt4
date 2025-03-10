import { useState } from "react";
import httpReq      from "../utils/httpReq";

function UserItem ( { item_map, onUpdate, onRemove } ) {
  const [ isUpdateMode, setIsUpdateMode ] = useState( false );

  function handleDoubleClick () {
    setIsUpdateMode( true );
  }

  function handleBlur () {
    setIsUpdateMode( false );
  }

  function handleKeyDown ( event ) {
    if ( event.key === 'Enter' ) {
      let input_value = event.target.value;
      let body_map    = { name : input_value };
      httpReq( 'post', '/item/update/' + item_map.id, body_map )
        .then( item_map => {
          onUpdate( item_map );
        })
        .catch( error => {
          console.error( error );
        })
      ;
      setIsUpdateMode( false );
    }
  }

  function handleClickRemove () {
    httpReq( 'delete', '/item/delete/' + item_map.id )
      .then( () => {
        onRemove( item_map.id );
      })
      .catch( error => {
        console.error( error );
      })
    ;
  }

  return (
    <li>
      <label
        onDoubleClick = { handleDoubleClick }
      >{ item_map.name }</label>
      {
        isUpdateMode &&
        <input
          defaultValue = { item_map.name }
          onKeyDown    = { handleKeyDown }
          onBlur       = { handleBlur    }
          autoFocus
        />
      }
      <button
        onClick = { handleClickRemove }
      ></button>
    </li>
  );
}

export default UserItem;