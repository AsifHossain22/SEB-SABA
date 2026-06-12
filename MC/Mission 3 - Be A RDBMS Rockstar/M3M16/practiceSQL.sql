-- CreateDatabase
CREATE DATABASE practice_sql;

-- CreateEmployeesTable
CREATE TABLE employees (
  employee_id SERIAL PRIMARY KEY,
  employee_name VARCHAR(50),
  department_id INT REFERENCES departments (department_id),
  salary DECIMAL(10, 2),
  hire_date DATE
);

-- CreateDepartmentsTable
CREATE TABLE departments (
  department_id SERIAL PRIMARY KEY,
  department_name VARCHAR(50)
);

-- InsertDataIntoDepartments
INSERT INTO
  departments (department_name)
VALUES
  ('HR'),
  ('Marketing'),
  ('Finance'),
  ('IT'),
  ('Sales'),
  ('Engineering'),
  ('Customer Support'),
  ('Administration'),
  ('Research'),
  ('Quality Assurance');

-- InsertDataIntoEmployees
INSERT INTO
  employees (employee_name, department_id, salary, hire_date)
VALUES
  ('John Doe', 1, 60000.00, '2024-03-07'),
  ('Jane Smith', 2, 75000.00, '2023-05-14'),
  ('Michael Brown', 1, 55000.00, '2024-01-10'),
  ('Emily Davis', 3, 90000.00, '2022-11-22'),
  ('David Wilson', 2, 68000.00, '2023-08-19'),
  ('Sarah Martinez', 4, 82000.00, '2021-04-05'),
  ('James Anderson', 3, 48000.00, '2025-02-17'),
  ('Amanda Thomas', 1, 62000.00, '2024-06-30'),
  ('Robert Taylor', 4, 105000.00, '2020-09-12'),
  ('Lisa White', 2, 71000.00, '2023-12-01'),
  ('William Harris', 5, 52000.00, '2025-05-20'),
  ('Megan Clark', 3, 88000.00, '2021-10-14'),
  ('Kevin Lewis', 1, 58000.00, '2024-08-11'),
  ('Rachel Robinson', 2, 79000.00, '2022-03-29'),
  ('Brian Walker', 4, 95000.00, '2019-07-18'),
  ('Stephanie Young', 5, 64000.00, '2024-11-05'),
  ('Jason Hall', 1, 61000.00, '2023-04-22'),
  ('Nicole Allen', 3, 72000.00, '2023-09-15'),
  ('Jeffrey King', 2, 66000.00, '2024-02-28'),
  ('Christine Wright', 4, 112000.00, '2018-12-03'),
  ('Daniel Scott', 5, 49000.00, '2025-11-10'),
  ('Amber Torres', 1, 57000.00, '2025-01-05'),
  ('Ryan Nguyen', 3, 85000.00, '2022-06-12'),
  ('Heather Hill', 2, 73000.00, '2023-07-25'),
  ('Justin Adams', 4, 91000.00, '2020-05-19'),
  ('Melissa Baker', 5, 67000.00, '2024-09-01'),
  ('Timothy Nelson', 1, 63000.00, '2023-10-10'),
  ('Ashley Mitchell', 3, 76000.00, '2023-01-30'),
  ('Brandon Perez', 2, 80000.00, '2022-08-14'),
  ('Laura Roberts', 4, 98000.00, '2021-02-27');

-- 1. INNER JOIN to Retrieve Employee and Department Information:
SELECT
  employee_id,
  employee_name,
  e.department_id,
  department_name
FROM
  employees AS e
  INNER JOIN departments AS d ON e.department_id = d.department_id;

-- AlternativeWay
SELECT
  employee_id,
  employee_name,
  department_id,
  department_name
FROM
  employees
  INNER JOIN departments USING (department_id);

-- 2. Show Department Name with Average Salary:
SELECT
  department_name,
  AVG(salary)
FROM
  employees
  INNER JOIN departments USING (department_id)
  GROUP BY department_name;

-- 3. Count Employees in Each Department:
SELECT
  department_name,
  COUNT(*) as total_employees
FROM
  employees
  INNER JOIN departments USING (department_id)
GROUP BY
  department_name;

-- 4. Find the Department name with the Highest Average Salary:
SELECT
  department_name,
  round(AVG(salary)) AS average_salary
FROM
  employees
  JOIN departments USING (department_id)
GROUP BY
  department_name
ORDER BY
  AVG(salary) DESC
LIMIT
  1;

-- 5. Count Employees Hired Each Year:
-- SELECT EXTRACT (YEAR FROM '2020-12-1'::DATE)
SELECT
  EXTRACT(
    YEAR
    FROM
      hire_date
  ) AS hired_year,
  COUNT(*)
FROM
  employees
GROUP BY
  hired_year;