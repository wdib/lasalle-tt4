import UserItem from "./UserItem";
import '../css/UserList.css';

function UserList ( { itemList, dispatch } ) {
  return (
    <ul>
      {
        itemList.map( function ( item_map ) {
          return (
            <UserItem
              key      = { item_map.id }
              item_map = { item_map    }
              dispatch = { dispatch    }
            />
          );
        })
      }
    </ul>
  );
}

export default UserList;