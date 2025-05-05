const
  expressObj = require( 'express' ),
  routerObj  = expressObj.Router(),
  registList = require( '../data/registrations' )
;

routerObj.get( '/:studentId/courses', function ( request, response ) {
  const
    student_id          = request.params.studentId,
    student_course_list = registList
      .filter ( r => r.student_id === student_id )
      .map    ( r => r.course_id )
  ;
  response.json( student_course_list );
});

module.exports = routerObj;