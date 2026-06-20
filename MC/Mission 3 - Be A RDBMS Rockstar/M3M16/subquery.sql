CREATE DATABASE sub_query;

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  department VARCHAR(50),
  salary INT
);

INSERT INTO
  employees (name, department, salary)
VALUES
  ('Rahim', 'IT', 50000),
  ('Karim', 'HR', 40000),
  ('Selim', 'IT', 60000),
  ('Jamal', 'Finance', 45000),
  ('Kamal', 'HR', 35000);

-- Find the highest salary
SELECT
  MAX(salary)
FROM
  employees;

-- Find which employee gets the highest salary
SELECT
  *
FROM
  employees
WHERE
  salary = (
    SELECT
      MAX(salary)
    FROM
      employees
  );

-- Find employees who earn more than the average salary
SELECT
  *
FROM
  employees
WHERE
  salary > (
    SELECT
      AVG(salary)
    FROM
      employees
  );

-- Name of the employee who gets the highest salary in HR department
SELECT
  name,
  salary,
  department
FROM
  employees
WHERE
  salary = (
    SELECT
      MAX(salary)
    FROM
      employees
    WHERE
      department = 'HR'
  );