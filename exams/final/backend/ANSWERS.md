# Answers for Part 1

## Answer to question 1A

- No input validation: neither the /register nor /deregister routes validate that `student_id` and `course_id` are present in the request body, allowing invalid or incomplete data to be recorded without error.

- No existence validation: neither the /register nor /deregister routes validate that the course even exists, allowing invalid or incomplete data to be recorded without error.

- No check for duplicate registrations: the same student can register for the same course multiple times.

## Answer to question 1B

- Add pagination to course listing: the /api/courses endpoint returns all courses at once. As the number of courses grows, this could lead to performance issues or unnecessarily large payloads. Implementing pagination improves performance both on the server-side as well as on the client-side by limiting processing to the relevant data.

- Consolidate backend logic in a dedicated module instead of embedding it directly in the route handlers. This would improve separation of concerns and testability.

- Introduce middleware for input validation: use a library to validate request bodies before processing them in order to prevent invalid or incomplete data from entering the system as outlined in question 1A.

- Add logging and error handling middleware: use Express error-handling middleware to catch and format errors consistently across all routes, improving debugging and API reliability.

- Replace in-memory arrays with a database: storing courses and registrations in .js files means data is lost on server restart. A proper database would persist data and support scaling.