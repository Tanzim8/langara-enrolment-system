import express from "express";
import { showStudentEnrolemnts } from "../controllers/studentsController.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.send("student router works");
});

router.get("/:id/enrolments", showStudentEnrolemnts);

export default router;