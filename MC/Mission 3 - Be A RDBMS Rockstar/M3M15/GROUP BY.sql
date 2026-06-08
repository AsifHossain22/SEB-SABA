select country_code, avg(age) from students
group by country_code;


-- Count students by country
select country_code, count(*) from students
group by country_code;

-- Count students by grade
select grade, count(*) from students
group by grade;