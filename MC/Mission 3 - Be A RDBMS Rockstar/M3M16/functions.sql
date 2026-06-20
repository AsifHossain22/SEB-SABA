-- Functions
-- EmployeeFunction
CREATE FUNCTION employee_count () RETURNS INT LANGUAGE SQL AS $$
    SELECT COUNT(*) FROM employees
$$;
SELECT
  employee_count ();

-- DeleteFunction
CREATE FUNCTION delete_employee_id (employee_id INT) RETURNS void LANGUAGE SQL AS $$
    DELETE FROM employees WHERE id = employee_id
$$;
SELECT
  delete_employee_id (4);