import db from "./db.js";

export const getStudentEnrolments = (studentId) =>{
    const statement = db.prepare(
        `
        SELECT
            students.id AS student_id,
            students.name AS student_name,
            students.email,
            courses.id AS course_id,
            courses.course_code,
            courses.course_name,
            courses.department,
            enrolments.status
        FROM enrolments
        JOIN students ON enrolments.student_id = students.id
        JOIN courses ON enrolments.course_id = courses.id
        WHERE students.id = ?
        AND enrolments.status = 'enrolled'

        `
    ).all(studentId);
    return statement;
}