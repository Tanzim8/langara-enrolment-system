DROP TABLE IF EXISTS enrolments;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS courses;

CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    department TEXT NOT NULL
);

CREATE TABLE courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_code TEXT NOT NULL UNIQUE,
    course_name TEXT NOT NULL,
    department TEXT NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity > 0)
);

CREATE TABLE enrolments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'enrolled' CHECK (status IN('enrolled', 'dropped')),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE(student_id, course_id)
);

INSERT INTO students (name, email, department) VALUES
('Tanzim Rahman', 'tanzim1@student.ca', 'Computer Engineering'),
('Ariana Smith', 'ariana1@student.ca', 'Mechanical Engineering'),
('David Lee', 'david1@student.ca', 'Civil Engineering'),
('Sara Khan', 'sara1@student.ca', 'Computer Engineering');

INSERT INTO courses (course_code, course_name, department, capacity) VALUES
('ENGR1100', 'Introduction to Engineering', 'General Engineering', 40),
('CPSC1200', 'Programming Basics', 'Computer Engineering', 35),
('MECH2300', 'Thermodynamics', 'Mechanical Engineering', 30),
('CIVL1400', 'Statics', 'Civil Engineering', 25),
('CPSC2600', 'Full Stack Development', 'Computer Engineering', 30);

INSERT INTO enrolments (student_id, course_id, status) VALUES
(1, 1, 'enrolled'),
(1, 2, 'enrolled'),
(2, 3, 'enrolled'),
(3, 4, 'enrolled'),
(4, 2, 'enrolled'),
(4, 5, 'enrolled');