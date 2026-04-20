import {
    createEnrolment,
    dropEnrolment,
    findEnrolment,
    reEnrolment
} from "../models/enrolmentsModel.js";

export const addEnrolment = (req, res) => {
    const { student_id, course_id } = req.body || {};

    if (!student_id || !course_id) {
        return res.status(400).json({
            error: "student_id and course_id are required"
        });
    }

    try {
        const existingEnrolment = findEnrolment(student_id, course_id);

        if (existingEnrolment) {
            if (existingEnrolment.status === "enrolled") {
                return res.status(400).json({
                    error: "Student is already enrolled in this course"
                });
            }

            if (existingEnrolment.status === "dropped") {
                reEnrolment(student_id, course_id);

                return res.status(200).json({
                    message: "Student re-enrolled successfully",
                    links: [
                        {
                            rel: "student-enrolments",
                            href: `/api/v1/students/${student_id}/enrolments`
                        },
                        {
                            rel: "course",
                            href: `/api/v1/courses/${course_id}`
                        }
                    ]
                });
            }
        }

        const result = createEnrolment(student_id, course_id);

        return res.status(201).json({
            message: "Student enrolled successfully",
            enrolmentId: result.lastInsertRowid,
            links: [
                {
                    rel: "student-enrolments",
                    href: `/api/v1/students/${student_id}/enrolments`
                },
                {
                    rel: "course",
                    href: `/api/v1/courses/${course_id}`
                }
            ]
        });
    } catch (error) {
        return res.status(500).json({
            error: "Could not create enrolment"
        });
    }
};

export const removeEnrolment = (req, res) => {
    const { student_id, course_id } = req.body || {};

    if (!student_id || !course_id) {
        return res.status(400).json({
            error: "student_id and course_id are required"
        });
    }

    const result = dropEnrolment(student_id, course_id);

    if (result.changes === 0) {
        return res.status(404).json({
            error: "Enrolment not found"
        });
    }

    return res.status(200).json({
        message: "Student dropped from course successfully",
        links: [
            {
                rel: "student-enrolments",
                href: `/api/v1/students/${student_id}/enrolments`
            },
            {
                rel: "course",
                href: `/api/v1/courses/${course_id}`
            }
        ]
    });
};