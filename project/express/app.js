import express from "express";
import cors from "cors";
import coursesRouter from "./routes/coursesRouter.js";
import studentRouter from "./routes/studentRouter.js";
import enrolmentRouter from "./routes/enrolmentRouter.js";
import adminRouter from "./routes/adminRouter.js"


import db from "./models/db.js"

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Langara Engineering Enrolment API is running");
})

app.get("/test-db",(req,res)=>{
    const courses = db.prepare(
        `SELECT * FROM courses`
    ).all();
    res.json(courses);
})

app.use("/api/v1/courses", coursesRouter)

app.use("/api/v1/students", studentRouter)

app.use("/api/v1/enrolments", enrolmentRouter)

app.use("/api/v1/admin", adminRouter)

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})