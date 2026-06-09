-- CreateDatabase
CREATE DATABASE online_course_enrollment_db;

-- CreateStudentsTable
CREATE TABLE students (
  student_id INT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  country VARCHAR(50),
  enrollment_date DATE NOT NULL
);

-- CoursesTable
CREATE TABLE courses (
  course_id INT PRIMARY KEY,
  course_title VARCHAR(150) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  instructor VARCHAR(100) NOT NULL,
  published_year INT NOT NULL
);

-- EnrollmentsTable
CREATE TABLE enrollments (
  enrollment_id INT PRIMARY KEY,
  student_id INT REFERENCES students (student_id),
  course_id INT REFERENCES courses (course_id),
  enrollment_date DATE NOT NULL,
  progress_percentage INT,
  paid_amount DECIMAL(10, 2)
);

-- ALTER Table
ALTER TABLE students
ADD CONSTRAINT email UNIQUE (email);

ALTER TABLE students
ALTER COLUMN country
SET NOT NULL;

ALTER TABLE enrollments
ALTER COLUMN paid_amount
SET NOT NULL;

ALTER TABLE enrollments
ALTER COLUMN course_id
SET NOT NULL;

ALTER TABLE enrollments
ALTER COLUMN student_id
SET NOT NULL;

-- InsertStudentsData
INSERT INTO
  students (
    student_id,
    first_name,
    last_name,
    email,
    phone,
    country,
    enrollment_date
  )
VALUES
  (
    1,
    'Rahim',
    'Uddin',
    'rahim@email.com',
    '01711111111',
    'Bangladesh',
    '2023-01-10'
  ),
  (
    2,
    'Karim',
    'Ahmed',
    'karim@email.com',
    NULL,
    'Bangladesh',
    '2023-01-15'
  ),
  (
    3,
    'Sara',
    'Khan',
    'sara@email.com',
    '01822222222',
    'Pakistan',
    '2023-02-01'
  ),
  (
    4,
    'John',
    'Smith',
    'john@email.com',
    NULL,
    'USA',
    '2023-02-10'
  ),
  (
    5,
    'Emma',
    'Brown',
    'emma@email.com',
    '01933333333',
    'UK',
    '2023-02-20'
  ),
  (
    6,
    'Ayaan',
    'Ali',
    'ayaan@email.com',
    NULL,
    'India',
    '2023-03-05'
  ),
  (
    7,
    'Lina',
    'Rahman',
    'lina@email.com',
    '01644444444',
    'Bangladesh',
    '2023-03-12'
  ),
  (
    8,
    'Mark',
    'Taylor',
    'mark@email.com',
    NULL,
    'Australia',
    '2023-03-25'
  ),
  (
    9,
    'Sophia',
    'Lee',
    'sophia@email.com',
    '01555555555',
    'USA',
    '2023-04-01'
  ),
  (
    10,
    'Daniel',
    'Martinez',
    'daniel@email.com',
    NULL,
    'Spain',
    '2023-04-10'
  );

-- StudentsData
SELECT
  *
FROM
  students;

-- InsertCoursesData
INSERT INTO
  courses (
    course_id,
    course_title,
    category,
    price,
    instructor,
    published_year
  )
VALUES
  (
    1,
    'Complete SQL Bootcamp',
    'Database',
    49.99,
    'John Carter',
    2021
  ),
  (
    2,
    'Advanced JavaScript',
    'Programming',
    59.99,
    'Sarah Miller',
    2020
  ),
  (
    3,
    'Python for Data Science',
    'Data Science',
    69.99,
    'David Kim',
    2022
  ),
  (
    4,
    'Web Development with React',
    'Programming',
    54.99,
    'Emily Stone',
    2021
  ),
  (
    5,
    'Machine Learning Basics',
    'AI',
    79.99,
    'Andrew Ng',
    2019
  ),
  (
    6,
    'Cloud Computing Fundamentals',
    'Cloud',
    64.99,
    'James Allen',
    2020
  ),
  (
    7,
    'UI/UX Design Essentials',
    'Design',
    39.99,
    'Laura Scott',
    2022
  ),
  (
    8,
    'DevOps for Beginners',
    'DevOps',
    74.99,
    'Michael Brown',
    2023
  );

-- CoursesData
SELECT
  *
FROM
  courses;

-- InsertEnrollmentsData
INSERT INTO
  enrollments (
    enrollment_id,
    student_id,
    course_id,
    enrollment_date,
    progress_percentage,
    paid_amount
  )
VALUES
  (1, 1, 1, '2023-05-01', 80, 49.99),
  (2, 2, 2, '2023-05-03', NULL, 59.99),
  (3, 3, 3, '2023-05-05', 60, 69.99),
  (4, 4, 1, '2023-05-07', 100, 49.99),
  (5, 5, 4, '2023-05-10', 40, 54.99),
  (6, 6, 5, '2023-05-12', NULL, 79.99),
  (7, 7, 2, '2023-06-01', 90, 59.99),
  (8, 8, 6, '2023-06-02', 30, 64.99),
  (9, 9, 3, '2023-06-03', 70, 69.99),
  (10, 10, 7, '2023-06-04', NULL, 39.99),
  (11, 1, 8, '2023-06-05', 20, 74.99),
  (12, 2, 1, '2023-06-06', 50, 49.99),
  (13, 3, 6, '2023-06-07', NULL, 64.99),
  (14, 4, 4, '2023-06-08', 85, 54.99),
  (15, 5, 5, '2023-06-09', 60, 79.99);

-- EnrollmentsData
SELECT
  *
FROM
  enrollments;