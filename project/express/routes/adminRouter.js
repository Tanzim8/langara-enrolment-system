import express from "express";
import { listAdminCourses } from "../controllers/adminController.js";

const router = express.Router();

router.get("/courses", listAdminCourses);

export default router