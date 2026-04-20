import { getStudentEnrolments } from "../models/studentsModel.js";

export const showStudentEnrolemnts = (req, res) =>{
    const id = Number(req.params.id);

    if(isNaN(id) || id <= 0){
        return res.status(400).json({
            error: "Invalid student id"
        });
    }

    const enrolments = getStudentEnrolments(id);

    if(enrolments.length === 0){
        return res.status(404).json({
            error: "No enrolments found for this student"
        });
    }

    return res.status(200).json({
        studentId: id,
        enrolments: enrolments,
        links: [
            {
                rel: "self",
                href: `/api/v1/students/${id}/enrolments`
            },
            {
                rel: "all-courses",
                href: "/api/v1/courses"
            }
        ]
    });
};