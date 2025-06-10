const BASE_URL = '/api';

export async function fetchCourses () {
  const response = await fetch( `${ BASE_URL }/courses` );
  if ( ! response.ok ) {
    throw new Error( 'Failed to fetch courses' );
  }
  return response.json();
}

export async function registerCourse( courseId ) {
  const response = await fetch( `${ BASE_URL }/courses/register`, {
    method  : 'POST',
    headers : { 'Content-Type': 'application/json' },
    body    : JSON.stringify( { courseId : courseId } ),
  });
  if ( ! response.ok ) {
    throw new Error( 'Failed to register course' );
  }
  return response.json();
}

export async function deregisterCourse( courseId ) {
  const response = await fetch( `${ BASE_URL }/courses/deregister`, {
    method  : 'POST',
    headers : { 'Content-Type': 'application/json' },
    body    : JSON.stringify( { courseId } ),
  });
  if ( ! response.ok ) {
    throw new Error( 'Failed to deregister course' );
  }
  return response.json();
}