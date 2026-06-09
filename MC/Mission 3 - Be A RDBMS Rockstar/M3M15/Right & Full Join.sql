 -- LeftJoin
select
  *
from
  posts as p
  left outer join users as u on p.user_id = u.id;

-- RightJoin
select
  *
from
  posts as p
  right outer join users as u on p.user_id = u.id;

-- FullJoin
select
  *
from
  posts as p
  full outer join users as u on p.user_id = u.id;