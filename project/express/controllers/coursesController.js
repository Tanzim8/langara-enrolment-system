import { getAllCourses, getCourseByID } from "../models/coursesModel.js";

export const listCourses =(req, res) =>{
    let limit = Number(req.query.limit) || 10;
    let offset = Number(req.query.offset) || 0;

    if (isNaN(limit) || isNaN(offset) || limit < 0 || offset < 0) {
        return res.status(400).json({
            error: "limit and offset must be valid non-negative numbers"
        });
    }

    const courses = getAllCourses(limit, offset);

    return res.status(200).json(
        {
           courses: courses,
           links: [
            { rel: "self", href: `/api/v1/courses?limit=${limit}&offset=${offset}`}
           ] 
        }
    )
}

export const showCourse = (req, res) =>{
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({
            error: "Invalid course id"
        });
    }
    const course = getCourseByID(id);

    if(!course){
        return res.status(404).json({
            error: "Course not found"
        })
    }

    return res.status(200).json({
        course: course,
        links: [
            {
                rel: "self",
                href: `/api/v1/courses/${id}`
            },
            {
                rel: "all-courses",
                href: "/api/v1/courses"
            }
        ]
    })
}