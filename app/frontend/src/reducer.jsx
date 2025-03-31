function reducer ( itemList, action ) {
  switch ( action.type ) {
    case 'add': {
      let item_map = action.body;
      return [ ...itemList, item_map ];
    }

    case 'update': {
      let update_item_map = action.body;
      return itemList.map( item_map => {
        if ( item_map.id === update_item_map.id ) {
          return update_item_map;
        }
        return item_map;
      });
    }

    case 'remove': {
      let item_id = action.body.id;
      return itemList.filter( item_map => item_id !== item_map.id );
    }

    case 'init': {
      return action.body;
    }

    default:
      throw new Error( 'Unsupported action type ' + action.type );
  }
}

export default reducer;