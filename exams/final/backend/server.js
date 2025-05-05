const
  expressObj    = require( 'express' ),
  bodyParser    = require( 'body-parser' ),
  courseRoutes  = require( './routes/courseRoutes' ),
  studentRoutes = require( './routes/studentRoutes' ),
  app           = expressObj()
;

app.use( bodyParser.json() );
app.use( '/api/courses',  courseRoutes  );
app.use( '/api/students', studentRoutes );

app.listen( 3000, () => console.log( 'Server running on port 3000' ) );