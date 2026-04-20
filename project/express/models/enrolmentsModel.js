import db from "./db.js";


export const findEnrolment = (student_id, course_id) => {
    const statement = db.prepare(`
        SELECT *
        FROM enrolments
        WHERE student_id = ? AND course_id = ?
    `);

    return statement.get(student_id, course_id);
};
export const createEnrolment = (student_id, course_id) => {
    const statement = db.prepare(
        `
        INSERT INTO enrolments (student_id, course_id, status)
        VALUES (?,?,?)`
    ).run(student_id,course_id,"enrolled");

    return statement;
};

export const reEnrolment = (student_id, course_id) => {
    const statement = db.prepare(`
        UPDATE enrolments
        SET status = 'enrolled'
        WHERE student_id = ? AND course_id = ?
    `);

    return statement.run(student_id, course_id);
};

export const dropEnrolment = (student_id, course_id) => {
    const statement = db.prepare(
        `
        UPDATE enrolments
        SET status = 'dropped'
        WHERE student_id = ? AND course_id = ? AND status = 'enrolled'
        `
    ).run(student_id,course_id);

    return statement;
}