import express from "express";
import { listCourses, showCourse } from "../controllers/coursesController.js";

const router = express.Router();

router.get("/", listCourses);
router.get("/:id", showCourse);

export default router;