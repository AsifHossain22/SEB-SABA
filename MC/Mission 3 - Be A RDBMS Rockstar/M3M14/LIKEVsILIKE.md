-- Select students whose first name starts from 'A' -- Case sensitive: select
first_name from students where first_name like 'A%';

select first_name from students where first_name like 'M\_\_';

select first_name from students where first_name like '%a';

select first_name from students where first_name like '%a\*';

select email from students where email like 'A%';

-- Case insensitive: select email from students where email ilike 'A%';

-- Select students whose last name ends from 'n': select last_name from students
where last_name like '%n';
