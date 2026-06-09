Q. When we need to use 'JOIN' to join two different tables using Inner JOIN, what should we use between 'JOIN' and 'INNER JOIN'? And what's the best practice?


-- InnerJoin
select
  title,
  username
from
  posts
  join users on posts.user_id = users.id;

select
  posts.id,
  title,
  username
from
  posts
  join users on posts.user_id = users.id;

-- Aliasing
select
  p.id,
  title,
  username
from
  posts as p
  join users as u on p.user_id = u.id;

select
  *
from
  posts
  join users on posts.user_id = users.id;

select
  *
from
  users as u
  inner join posts as p on p.user_id = u.id;

INSERT INTO
  posts (id, title)
VALUES
  (5, 'Enjoying a sunny day with Akash!');