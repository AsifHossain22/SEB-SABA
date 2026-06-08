-- NULL 
select * from students
where email is null;

select * from students
where email is not null;

-- Coalesce()
select coalesce(2, null);

select coalesce(null, 2);

select coalesce(null, null, 2);

select coalesce(null, null, 2, 3);

select coalesce(null, null, 3, 2);

select coalesce(email, 'Not provided') as email from students;


