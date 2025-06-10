function reducer( state, action ) {
  switch ( action.type ) {
    case 'load_start': {
      return {
        ...state,
        loading : true,
        error   : null
      };
    }

    case 'load_success': {
      return {
        ...state,
        loading           : false,
        courses           : action.payload,
        registeredCourses : action.payload
          .filter ( course => course.isRegistered )
          .map    ( course => course.id ),
      };
    }

    case 'load_error': {
      return {
        ...state,
        loading : false,
        error   : action.error
      };
    }

    case 'register': {
      return {
        ...state,
        registeredCourses : [
          ...state.registeredCourses, action.courseId
        ],
      };
    }

    case 'deregister': {
      return {
        ...state,
        registeredCourses : state.registeredCourses.filter(
          id => id !== action.courseId
        ),
      };
    }

    default:
      return state;
  }
}

export default reducer;