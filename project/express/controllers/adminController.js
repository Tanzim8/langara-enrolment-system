import { getCourseEnrolmentCounts } from "../models/adminModel.js";

export const listAdminCourses = (req,res) =>{
    const courses = getCourseEnrolmentCounts();

    res.status(200).json({
        courses: courses,
        links : [
            {
                rel : "self",
                href: "api/v1/admin/courses"
            }
        ]
    });
};