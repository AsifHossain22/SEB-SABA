# ALTER

ALTER TABLE table_name action;

- Rename table
- Add/Drop column
- Rename column
- Modify data type
- Setting Default Value
- Add/Drop Constraint

create table employe (id serial, name varchar(100), age int);

-- Renaming table name: alter table employe rename to employee

-- Add a column: alter table employee add column email varchar(50);

-- Drop a column: alter table employee drop column email;

-- Renaming a column: alter table employee rename column name to user_name;

-- Modifying constraint: alter table employee alter column user_name type
varchar(50);

-- Add constraint: alter table employee alter column email set not null;

-- Drop constraint: alter table employee alter column email drop not null;
