-- NOT -- Select students who are not from Egypt -- Select students whose grade
is not 'A'

select first_name, country_code from students where not country_code = 'Egypt';

select first_name, grade from students where not grade = 'A';

-- Scaler functions -- upper, lower, concat, length

select upper(first_name) as first_name_in_upper, first_name from students;

select concat(first_name, last_name) as full_name, first_name from students;
