import React from 'react';

function CourseRow ( { course, isRegistered, onToggle } ) {
  return (
    <tr>
      <td>{ course.name }</td>
      <td>
        <button
          onClick = { () => onToggle( course.id, isRegistered ) }
        >
          { isRegistered ? 'Deregister' : 'Register' }
        </button>
      </td>
    </tr>
  );
}

export default CourseRow;