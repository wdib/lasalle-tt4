import React, { useEffect, useReducer } from 'react';
import { fetchCourses, registerCourse, deregisterCourse } from './httpReq';
import CourseRow from './CourseRow';
import reducer   from './reducer';

const initialState = {
  loading           : true,
  error             : null,
  courses           : [],
  registeredCourses : [],
};

function CourseTable () {
  const [ state, dispatch ] = useReducer( reducer, initialState );

  useEffect( function () {
    dispatch( { type : 'load_start' } );
    fetchCourses()
      .then( data => {
        dispatch({
          type    : 'load_success',
          payload : data
        });
      })
      .catch( error => {
        dispatch({
          type  : 'load_error',
          error : error.message
        })
      })
    ;
  }, [] );

  const handleToggle = async ( courseId, isRegistered ) => {
    try {
      if ( isRegistered ) {
        await deregisterCourse( courseId );
        dispatch( { type : 'deregister', courseId : courseId } );
      }
      else {
        await registerCourse( courseId );
        dispatch( { type : 'register', courseId : courseId } );
      }
    }
    catch ( error ) {
      alert( 'Action failed: ' + error.message );
    }
  };

  const { loading, error, courses, registeredCourses } = state;

  if ( loading ) {
    return <div>Loading courses...</div>;
  }
    
  if ( error ) {
    return <div>Error: { error }</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Course</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          courses.map( course => {
            const isRegistered = registeredCourses.includes( course.id );
            return (
              <CourseRow
                key          = { course.id    }
                course       = { course       }
                isRegistered = { isRegistered }
                onToggle     = { handleToggle }
              />
            );
          })
        }
      </tbody>
    </table>
  );
}

export default CourseTable;