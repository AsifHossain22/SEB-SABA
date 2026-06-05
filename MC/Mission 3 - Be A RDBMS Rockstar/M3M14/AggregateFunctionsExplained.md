-- Aggregate functions -- avg, max, min, sum, count

select avg(age) as avg_age from students;

select max(age) as max_age from students;

select min(age) as min_age from students;

select sum(age) as sum_of_age from students;

select count(first_name) as total_first_name from students;

select count(\*) from students;
