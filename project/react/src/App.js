import React, {use, useEffect, useState} from 'react';
import CourseCard from "./components/CourseCard.js";

const App = () =>{
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [studentId, setStudentId] = useState("");
    const [enrolments, setEnrolments] = useState([]);
    const [enrolmentError, setEnrolmentError] = useState("");
    const [enrolmentLoading, setEnrolmentLoading] = useState(false);

    const [view, setView] = useState("student");

    const [adminCourses, setAdminCourses] = useState([]);
    const [adminLoading, setAdminLoading] = useState(false);
    const [adminError, setAdminError] = useState("");

    const [message, setMessage] = useState("");
    

    useEffect(()=>{
        const fetchCourses = async () => {
            try{
                const response = await fetch("http://localhost:3000/api/v1/courses");
                if(!response.ok){
                    throw new Error("Could not fetch courses");
                }

                const data = await response.json();
                setCourses(data.courses);
            } catch(err){
                setError(err.message);
            } finally{
                setLoading(false);
            }
        }

        fetchCourses();
    }, []);

        const fetchStudentEnrolments = async () => {
            if(!studentId){
                setEnrolmentError("Please enter a student ID");
                setEnrolments([]);
                return;
            }

            try{
                setEnrolmentLoading(true);
                setEnrolmentError("");

                const response = await fetch(`http://localhost:3000/api/v1/students/${studentId}/enrolments`);
                const data = await response.json();

                if(!response.ok){
                    throw new Error(data.error || "Could not fetch enrolments");
                }
                setEnrolments(data.enrolments);
            }catch(err){
                setEnrolmentError(err.message);
                setEnrolments([]);
            }finally{
                setEnrolmentLoading(false);
            }
        }

        const handleEnrol = async (courseId) => {
            if(!studentId){
                setMessage("Please enter a student ID before enrolling");
                return;
            }

            try{
                setMessage("");
                const response = await fetch(`http://localhost:3000/api/v1/enrolments`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        student_id: Number(studentId),
                        course_id: courseId
                    })
            });
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.error || "Could not enrol in course");
            }

            setMessage("Student enrolled successfully!");

            await fetchStudentEnrolments();
            }catch(err){
                setMessage(err.message);
            }
        };

        const handleDrop = async(courseId) =>{
            if(!studentId){
                setMessage("Please enter a student ID first.");
                return;
            }
            try{
                setMessage("");
                const response = await fetch("http://localhost:3000/api/v1/enrolments/drop", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        student_id: Number(studentId),
                        course_id: courseId
                    })

            });
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.error || "Could not drop course");
            }
            setMessage("Course dropped successfully!");

            await fetchStudentEnrolments();
            }catch(err){
                setMessage(err.message);
            }
        }

        const fetchAdminCourses = async () => {
            try{
                setAdminLoading(true);
                setAdminError("");

                const response = await fetch("http://localhost:3000/api/v1/admin/courses");
                const data = await response.json();

                if(!response.ok){
                    throw new Error(data.error || "Could not fetch courses");
                }
                setAdminCourses(data.courses);
            }catch(err){
                setAdminError(err.message);
            }finally{
                setAdminLoading(false);

            }
        }
        useEffect(()=>{
            if(view === "admin"){
                fetchAdminCourses();
            }
        }, [view]);

return (
    <div>
        <h1>Langara Engineering Enrollment System</h1>
        {message && <p className="message">{message}</p>}

        <div className="view-toggle">
            <button onClick={() => setView("student")}>
                Student View
            </button>

            <button onClick={() => setView("admin")}>
                Admin View
            </button>
        </div>

        {view === "student" && (
            <>
                <div className="student-panel">
                    <h2>Student Panel</h2>
                    <input
                        type="number"
                        placeholder="Enter student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />
                    <button onClick={fetchStudentEnrolments}>
                        Load My Enrolments
                    </button>

                    {enrolmentLoading && <p>Loading enrolments...</p>}
                    {enrolmentError && <p>Error: {enrolmentError}</p>}
                </div>

                <div className="enrolments-section">
                    <h2>My Enrolments</h2>

                    {enrolments.length > 0 ? (
                        <ul className="enrolment-list">
                            {enrolments.map((item) => (
                                <li key={item.course_id} className="enrolment-item">
                                    <span>
                                        {item.course_code} - {item.course_name} ({item.department})
                                    </span>

                                    <button onClick={() => handleDrop(item.course_id)}>
                                        Drop
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        !enrolmentLoading && !enrolmentError && (
                            <p>No enrolments found for this student.</p>
                        )
                    )}
                </div>

                {loading && <p>Loading courses...</p>}
                {error && <p>Error: {error}</p>}

                {!loading && !error && (
                    <div>
                        <h2>Available Courses</h2>
                        <div className="courses-container">
                            {courses.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    onEnrol={handleEnrol}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </>
        )}

        {view === "admin" && (
            <div className="admin-section">
                <h2>Admin Dashboard</h2>

                {adminLoading && <p>Loading admin courses...</p>}
                {adminError && <p>Error: {adminError}</p>}

                {!adminLoading && !adminError && (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Course Name</th>
                                <th>Department</th>
                                <th>Capacity</th>
                                <th>Total Enrolled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminCourses.map((course) => (
                                <tr key={course.id}>
                                    <td>{course.course_code}</td>
                                    <td>{course.course_name}</td>
                                    <td>{course.department}</td>
                                    <td>{course.capacity}</td>
                                    <td>{course.total_students}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        )}
    </div>
)};

export default App;


//     return(
//         <div>
//             <h1>Langara Engineering Enrollment System</h1>
//             {message && <p className="message">{message}</p>}

            
//             <div className = "student-panel">
//                 <h2>Student Panel</h2>
//                 <input
//                     type="number"
//                     placeholder="Enter student ID"
//                     value={studentId}
//                     onChange={(e)=>setStudentId(e.target.value)}
//                 />
//                 <button onClick={fetchStudentEnrolments}>
//                     Load My Enrolments
//                 </button>

//                 {enrolmentLoading && <p>Loading enrolments...</p>}
//                 {enrolmentError && <p>Error: {enrolmentError}</p>}
//             </div>

//             <div className="enrolments-section">
//                 <h2>My Enrolments</h2>

//                 {enrolments.length > 0 ? (
//                     <ul className="enrolment-list">
//                         {enrolments.map((item) => (
//                             <li key={item.course_id} className="enrolment-item">
//                                 <span>
//                                     {item.course_code} - {item.course_name} ({item.department})
//                                 </span>

//                                 <button onClick={() => handleDrop(item.course_id)}>
//                                     Drop
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 ):(
//                     !enrolmentLoading && <p>No enrolments found for this student.</p>
//                 )

//                 }
//             </div>


//             {loading && <p>Loading courses...</p>}
//             {error && <p>Error: {error}</p>}

//             {!loading && !error && (
//                 <div>
//                     <h2>Available Courses</h2>
//                     <div className="courses-container">
//                         {courses.map((course) => (
//                             <CourseCard key={course.id} course={course} onEnrol={handleEnrol} />
//                     ))}
//                     </div>
//                 </div>
//             )}
//             </div>
//     );
// };