import UserItem from "./UserItem";
import '../css/UserList.css';

function UserList ( { itemList, onUpdate, onRemove } ) {
  return (
    <ul>
      {
        itemList.map( function ( item_map ) {
          return (
            <UserItem
              key      = { item_map.id }
              item_map = { item_map    }
              onUpdate = { onUpdate    }
              onRemove = { onRemove    }
            />
          );
        })
      }
    </ul>
  );
}

export default UserList;