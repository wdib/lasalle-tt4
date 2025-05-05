const
  expressObj = require( 'express' ),
  routerObj  = expressObj.Router(),
  courseList = require( '../data/courses' ),
  registList = require( '../data/registrations' )
;

routerObj.get( '/', function ( request, response ) {
  response.json( courseList );
});

routerObj.post( '/register', function ( request, response ) {
  const
    student_id = request.body.student_id,
    course_id  = request.body.course_id
  ;
  registList.push({
    student_id : student_id,
    course_id  : course_id
  });
  response.status( 201 ).json( { message : 'Registered successfully' } );
});

routerObj.post( '/deregister', function ( request, response ) {
  const
    student_id = request.body.student_id,
    course_id  = request.body.course_id,
    regist_idx = registList.findIndex(
      r => r.student_id === student_id && r.course_id === course_id
    )
  ;
  if ( regist_idx !== -1 ) {
    registList.splice( regist_idx, 1 );
    response.json( { message : 'Deregistered successfully' } );
  }
  else {
    response.status( 404 ).json( { message : 'Registration not found' } );
  }
});

module.exports = routerObj;