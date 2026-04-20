import express from "express";
import { addEnrolment, removeEnrolment } from "../controllers/enrolmentsController.js";

const router = express.Router();

router.post("/", addEnrolment)
router.post("/drop", removeEnrolment);

export default router;