import UserItem from "./UserItem";
import '../css/UserList.css';

function UserList ( { itemList } ) {
  return (
    <ul>
      {
        itemList.map( function ( item_map ) {
          return (
            <UserItem
              key      = { item_map.id }
              item_map = { item_map }
            />
          );
        })
      }
    </ul>
  );
}

export default UserList;