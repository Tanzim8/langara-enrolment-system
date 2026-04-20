import db from "./db.js";

export const getCourseEnrolmentCounts = () =>{
    const statement = db.prepare(`
        SELECT 
            courses.id,
            courses.course_code,
            courses.course_name,
            courses.department,
            courses.capacity,
            COUNT (enrolments.id) AS total_students
        FROM courses
        LEFT JOIN enrolments
            ON courses.id = enrolments.course_id
            AND enrolments.status = 'enrolled'
        GROUP BY courses.id
        `).all();
        return statement;


}