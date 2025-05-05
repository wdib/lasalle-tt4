import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CourseTable({ studentId }) {
    const [courses, setCourses] = useState([]);
    const [registeredCourses, setRegisteredCourses] = useState([]);

    useEffect(() => {
        axios.get('/api/courses').then(res => setCourses(res.data));
        axios.get(`/api/students/${studentId}/courses`).then(res => setRegisteredCourses(res.data));
    }, [studentId]);

    const handleClick = (courseId, isRegistered) => {
        const url = isRegistered ? '/api/courses/deregister' : '/api/courses/register';
        axios.post(url, { studentId, courseId }).then(() => {
            axios.get(`/api/students/${studentId}/courses`).then(res => setRegisteredCourses(res.data));
        });
    };

    return (
        <table>
            <thead>
                <tr><th>Course</th><th>Action</th></tr>
            </thead>
            <tbody>
                {courses.map(course => {
                    const isRegistered = registeredCourses.includes(course.id);
                    return (
                        <tr key={course.id}>
                            <td>{course.name}</td>
                            <td>
                                <button onClick={() => handleClick(course.id, isRegistered)}>
                                    {isRegistered ? 'Deregister' : 'Register'}
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default CourseTable;
