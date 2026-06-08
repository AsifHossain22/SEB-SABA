select
  country_code,
  avg(age)
from
  students
group by
  country_code;

-- Count students by country
select
  country_code,
  count(*)
from
  students
group by
  country_code;

-- Count students by grade
select
  grade,
  count(*)
from
  students
group by
  grade;

-- Courses with more than 4 students 
select
  course,
  count(*)
from
  students
group by
  course
having
  count(*) > 4;

-- Countries where average student age is greater than 21
select
  country_code,
  avg(age)
from
  students
group by
  country_code
having
  avg(age) > 21;