The Langara Engineering Course Enrolment System is a full-stack web application that allows students to view available courses, enrol in courses, and drop courses. It also includes an admin view where administrators can see course enrolment statistics.

The application is built using a Node.js and Express backend with a SQLite database, and a React frontend. The frontend communicates with the backend through a REST API using HTTP requests.

In the student view, users can:

enter their student ID
view their current enrolments
enrol in available courses
drop courses they are enrolled in

In the admin view, users can:

view all courses
see how many students are enrolled in each course

The application follows a structured design using routes, controllers, and models to separate concerns and improve maintainability. It also uses React state and conditional rendering to create a dynamic and interactive user interface without reloading the page.

Overall, this system demonstrates the core concepts of full-stack development, including API design, database relationships, and frontend-backend integration.
