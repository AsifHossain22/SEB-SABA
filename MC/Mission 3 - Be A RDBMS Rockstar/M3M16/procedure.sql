-- Procedure
CREATE PROCEDURE delete_employee_by_id (employee_id INT) LANGUAGE PLPGSQL AS $$
  begin
    DELETE FROM employees WHERE id = employee_id;
  end;
  $$;

CALL delete_employee_by_id (3);

CREATE PROCEDURE increase_low_salary (department_name VARCHAR(50)) LANGUAGE PLPGSQL AS $$
  declare
  avg_salary INT;
  begin
  -- FirstStep
    SELECT AVG(salary) INTO avg_salary FROM employees
    WHERE department = department_name;

  -- SecondStep
    UPDATE employees SET salary = salary * 1.1
    WHERE department = department_name AND salary < avg_salary;
  end;
  $$
CALL increase_low_salary ('HR');

CALL increase_low_salary ('IT');