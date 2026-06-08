-- UPDATE
select * from students;

update students set email = 'default@mail.com'
where email is null;

update students set first_name = 'Hi ASIF', age = 25
where student_id = 1;

update students set grade = 'C', age = 25
where student_id = 1 or student_id = 2;

update students set grade = 'A', age = 25
where student_id in (1, 2);