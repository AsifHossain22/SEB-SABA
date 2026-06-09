-- AllJoin
-- Employees Table
create table employees (emp_id INT, emp_name VARCHAR(50), dept_id INT);

-- Departments Table
create table departments (dept_id INT, dept_name VARCHAR(50));

-- Inserting sample data
INSERT INTO
  employees
VALUES
  (1, 'John Doe', 101),
  (2, 'Jane Smith', 102);

INSERT INTO
  departments
VALUES
  (101, 'Human Resources'),
  (102, 'Marketing');

SELECT
  *
from
  employees;

SELECT
  *
from
  departments;

-- CrossJoin
select
  *
from
  employees
  cross join departments;

-- NaturalJoin
select
  *
from
  employees
  natural join departments;