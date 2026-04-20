import React from "react";

const CourseCard = ({course, onEnrol}) =>{
    return(
        <div className="course-card">
            <h3>{course.course_code}</h3>
            <p><strong>Course:</strong> {course.course_name}</p>
            <p><strong>Department:</strong> {course.department}</p>
            <p><strong>Capacity:</strong> {course.capacity}</p>

            <button onClick={() => onEnrol(course.id)}>
                Enrol
            </button>
        </div>
    )
}

export default CourseCard;