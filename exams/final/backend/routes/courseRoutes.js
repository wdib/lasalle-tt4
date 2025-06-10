const
  expressObj = require( 'express' ),
  routerObj  = expressObj.Router(),
  courseList = require( '../data/courses' ),
  registList = require( '../data/registrations' )
;


routerObj.get( '/', function ( request, response ) {
  const
    page_raw     = parseInt( request.query.page,  10 ),
    limit_raw    = parseInt( request.query.limit, 10 ),
    page_int     = ! isNaN( page_raw  ) && page_raw  > 0 ? page_raw  : 1,
    limit_int    = ! isNaN( limit_raw ) && limit_raw > 0 ? limit_raw : 1,
    course_count = courseList.length,
    page_total   = Math.ceil( course_count / limit_int )
  ;

  if ( page_int > page_total && page_total !== 0 ) {
    return response
      .status( 400 )
      .json({
        error : 'Page ' + page_int + 'exceeds total pages (' + page_total + ')'
      })
    ;
  }

  const
    start_idx = ( page_int - 1 ) * limit_int,
    end_idx   = start_idx + limit_int
  ;

  response.json({
    data       : courseList.slice( start_idx, end_idx ),
    total      : course_count,
    page       : page_int,
    limit      : limit_int,
    page_total : page_total,
  });
});


routerObj.post( '/register', function ( request, response ) {
  const
    student_id = request.body.student_id,
    course_id  = request.body.course_id
  ;

  // Basic input validation
  if ( ! student_id || ! course_id ) {
    return res
      .status( 400 )
      .json( { error : 'Missing student ID or course ID' } )
    ;
  }

  // Do not allow a student to register for a course that they're already
  // registered for
  const is_registered = registList.some( function ( regist ) {
    return regist.student_id === student_id
      &&   regist.course_id  === course_id
    ;
  });
  if ( is_registered ) {
    return res
      .status( 409 )
      .json( { error : 'Student already registered for this course' } )
    ;
  }

  // Enforce the 3-course limit for the student
  const student_regist_list = registList.filter( function ( regist ) {
    return regist.student_id === student_id;
  });
  if ( student_regist_list.length === 3 ) {
    return res
      .status( 422 )
      .json( { error : 'Student cannot register for more than 3 courses' } )
    ;
  }

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