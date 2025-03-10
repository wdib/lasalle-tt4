import { useState } from "react";

function UserItem ( { item_map } ) {
  const [ isUpdateMode, setIsUpdateMode ] = useState( false );

  function handleDoubleClick () {
    setIsUpdateMode( true );
  }

  function handleBlur () {
    setIsUpdateMode( false );
  }

  return (
    <li>
      <label
        onDoubleClick = { handleDoubleClick }
      >{ item_map.name }</label>
      {
        isUpdateMode &&
        <input
          onBlur = { handleBlur }
          autoFocus
        />
      }
    </li>
  );
}

export default UserItem;