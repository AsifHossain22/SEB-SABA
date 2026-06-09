-- UsersTable
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL
);

-- PostsTable
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  user_id INT references users (id)
);

INSERT INTO
  users (username)
VALUES
  ('akash'),
  ('batash'),
  ('sagor'),
  ('nodi');

INSERT INTO
  posts (title, user_id)
VALUES
  ('Enjoying a sunny day with Akash!', 2),
  ('Batash just shared an amazing recipe!', 1),
  ('Exploring adventures with Sagor!', 4),
  ('Nodi-s wishdom always leaves me inspired!', 4);

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