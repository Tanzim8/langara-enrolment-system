import db from "./db.js";

export const getAllCourses=(limit = 10, offset = 0)=>{
    const statement = db.prepare(
        `
        SELECT * 
        FROM courses
        LIMIT ? OFFSET ?
        `
    );

    return statement.all(limit, offset);
}

export const getCourseByID = (id) =>{
    const statement = db.prepare(
        `
        SELECT * FROM courses WHERE id = ?
        `
    ).get(id);

    return statement;
}