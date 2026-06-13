# Creations & Insertions
-- CreateDatabase 
create database library_management_system;

-- DropDatabase
drop database database_name;

-- CreateTable
create table books (
  id serial primary key,
  title varchar(100) not null,
  author varchar(100) not null,
  isbn bigint unique,
  book_category varchar(50),
  price numeric(8, 2),
  pages int,
  rating decimal(2, 1),
  stock smallint,
  is_available boolean,
  published_date date,
  tags text[],
  metadata jsonb
);

-- DeleteTable
drop table books;

-- InsertSingleRecord
insert into
  books (
    title,
    author,
    isbn,
    book_category,
    price,
    pages,
    rating,
    stock,
    is_available,
    published_date,
    tags,
    metadata
  )
values
  (
    'Clean Code',
    'Robert Martin',
    1001,
    'Programming',
    850.00,
    474,
    4.8,
    10,
    true,
    '2008-08-01',
    ARRAY['coding', 'best-practice'],
    '{"publisher":"Prentice Hall","language":"EN", "format":"hardcover"}'
  )
  -- InsertMultipleRecords
  -- InsertRecordUsingDefaultAutoIncrementID
insert into
  books (
    title,
    author,
    isbn,
    book_category,
    price,
    pages,
    rating,
    stock,
    is_available,
    published_date,
    tags,
    metadata
  )
values
  (
    'Clean Code',
    'Robert Martin',
    1001,
    'Programming',
    850.00,
    474,
    4.8,
    10,
    true,
    '2008-08-01',
    ARRAY['coding', 'best-practice'],
    '{"publisher":"Prentice Hall","language":"EN", "format":"hardcover"}'
  ),
  (
    'The Pragmatic Programmer',
    'Andrew Hunt',
    1002,
    'Programming',
    900.00,
    352,
    4.9,
    15,
    true,
    '1999-10-30',
    ARRAY['career', 'software-engineering'],
    '{"publisher": "Addison-Wesley", "language": "EN", "format": "hardcover"}'
  ),
  (
    'Introduction to Algorithms',
    'Thomas Cormen',
    1003,
    'Computer Science',
    1200.00,
    1312,
    4.7,
    5,
    true,
    '2009-07-31',
    ARRAY['algorithms', 'data-structures'],
    '{"publisher": "MIT Press", "language": "EN", "format": "hardcover"}'
  ),
  (
    'Design Patterns',
    'Erich Gamma',
    1004,
    'Programming',
    950.00,
    395,
    4.8,
    8,
    true,
    '1994-10-21',
    ARRAY['oop', 'architecture'],
    '{"publisher": "Addison-Wesley", "language": "EN", "format": "paperback"}'
  ),
  (
    'You Don''t Know JS Yet',
    'Kyle Simpson',
    1005,
    'Web Development',
    350.00,
    150,
    4.6,
    25,
    true,
    '2020-01-25',
    ARRAY['javascript', 'frontend'],
    '{"publisher": "O''Reilly", "language": "EN", "format": "paperback"}'
  ),
  (
    'Designing Data-Intensive Applications',
    'Martin Kleppmann',
    1006,
    'System Design',
    1100.00,
    611,
    4.9,
    12,
    true,
    '2017-03-16',
    ARRAY['databases', 'distributed-systems'],
    '{"publisher": "O''Reilly", "language": "EN", "format": "paperback"}'
  ),
  (
    'Refactoring',
    'Martin Fowler',
    1007,
    'Programming',
    880.00,
    448,
    4.8,
    0,
    false,
    '2018-11-19',
    ARRAY['coding', 'quality'],
    '{"publisher": "Addison-Wesley", "language": "EN", "format": "hardcover"}'
  ),
  (
    'The Lean Startup',
    'Eric Ries',
    1008,
    'Business',
    600.00,
    336,
    4.5,
    30,
    true,
    '2011-09-13',
    ARRAY['startup', 'management'],
    '{"publisher": "Crown Business", "language": "EN", "format": "hardcover"}'
  ),
  (
    'Atomic Habits',
    'James Clear',
    1009,
    'Self-Help',
    550.00,
    320,
    4.9,
    50,
    true,
    '2018-10-16',
    ARRAY['productivity', 'psychology'],
    '{"publisher": "Penguin", "language": "EN", "format": "paperback"}'
  ),
  (
    'Sapiens',
    'Yuval Noah Harari',
    1010,
    'History',
    650.00,
    512,
    4.7,
    18,
    true,
    '2014-09-04',
    ARRAY['history', 'anthropology'],
    '{"publisher": "Harper", "language": "EN", "format": "paperback"}'
  ),
  (
    'Deep Work',
    'Cal Newport',
    1011,
    'Self-Help',
    500.00,
    304,
    4.6,
    14,
    true,
    '2016-01-05',
    ARRAY['focus', 'productivity'],
    '{"publisher": "Grand Central", "language": "EN", "format": "hardcover"}'
  ),
  (
    'Head First Design Patterns',
    'Eric Freeman',
    1012,
    'Programming',
    800.00,
    694,
    4.7,
    7,
    true,
    '2004-10-25',
    ARRAY['oop', 'beginners'],
    '{"publisher": "O''Reilly", "language": "EN", "format": "paperback"}'
  ),
  (
    'Cracking the Coding Interview',
    'Gayle Laakmann McDowell',
    1013,
    'Career',
    999.00,
    687,
    4.8,
    22,
    true,
    '2015-07-01',
    ARRAY['interview', 'algorithms'],
    '{"publisher": "CareerCup", "language": "EN", "format": "paperback"}'
  ),
  (
    'The Mythical Man-Month',
    'Fred Brooks',
    1014,
    'Software Engineering',
    750.00,
    322,
    4.5,
    4,
    true,
    '1975-01-01',
    ARRAY['management', 'history'],
    '{"publisher": "Addison-Wesley", "language": "EN", "format": "paperback"}'
  ),
  (
    'Python Crash Course',
    'Eric Matthes',
    1015,
    'Programming',
    700.00,
    544,
    4.7,
    0,
    false,
    '2019-05-03',
    ARRAY['python', 'beginners'],
    '{"publisher": "No Starch Press", "language": "EN", "format": "paperback"}'
  ),
  (
    'The Phoenix Project',
    'Gene Kim',
    1016,
    'DevOps',
    680.00,
    382,
    4.7,
    11,
    true,
    '2013-01-10',
    ARRAY['devops', 'fiction'],
    '{"publisher": "IT Revolution Press", "language": "EN", "format": "hardcover"}'
  ),
  (
    'Continuous Delivery',
    'Jez Humble',
    1017,
    'DevOps',
    920.00,
    496,
    4.6,
    6,
    true,
    '2010-07-27',
    ARRAY['ci-cd', 'automation'],
    '{"publisher": "Addison-Wesley", "language": "EN", "format": "hardcover"}'
  ),
  (
    'Zero to One',
    'Peter Thiel',
    1018,
    'Business',
    580.00,
    224,
    4.5,
    40,
    true,
    '2014-09-16',
    ARRAY['startup', 'strategy'],
    '{"publisher": "Crown Business", "language": "EN", "format": "hardcover"}'
  ),
  (
    'Thinking, Fast and Slow',
    'Daniel Kahneman',
    1019,
    'Psychology',
    620.00,
    499,
    4.6,
    15,
    true,
    '2011-10-25',
    ARRAY['psychology', 'decision-making'],
    '{"publisher": "Farrar, Straus and Giroux", "language": "EN", "format": "paperback"}'
  ),
  (
    'Domain-Driven Design',
    'Eric Evans',
    1020,
    'System Design',
    1050.00,
    560,
    4.6,
    9,
    true,
    '2003-08-30',
    ARRAY['ddd', 'architecture'],
    '{"publisher": "Addison-Wesley", "language": "EN", "format": "hardcover"}'
  );

-- ViewAllRecords
select
  *
from
  books;

-- UsingColumnAlias
select title as book_title from books;

select title as "Title Of Books", price as "Price Of Books" from books;

# Alter

-- RenameTable
alter table book
rename to books;

-- AddColumn
alter table books
add column publishingDate date;

-- DropColumn
alter table books
drop column rating;

-- RenameColumn
alter table books
rename column book_category to categories;

-- ChangeDataType
alter table books
alter column price type int using price::int;

alter table books
alter column price type text;

-- TypeCasting
alter table books
alter column price type int using price::int;

-- SetDefaultValue
alter table books
alter column publishingDate
set default current_date;

-- DropDefaultValue
alter table books
alter column publishingDate
drop default;

-- SetNotNullConstraint
alter table books
alter column categories
set not null;

-- DropNotNullConstraint
alter table books
alter column categories
drop not null;

-- AddUniqueConstraint
alter table books
add constraint title_unique unique (title);

-- DropUniqueConstraint
alter table books
drop constraint title_unique;

-- AddPrimaryKeyConstraint
alter table books
add constraint id_primary primary key (id);

-- DropPrimaryKeyConstraint
alter table books
drop constraint id_primary;

# Select
  -- SortBooksByPrice (Descending)
select
  title as "Title Of Books",
  price as "Price Of Books"
from
  books
order by
  price desc;

-- SelectUniqueCategories (Distinct)
select distinct
  book_category
from
  books;

-- FilterBooksUsingWHEREClause
-- FilterUsingEqual (=) Operator
select
  *
from
  books
where
  book_category = 'Computer Science';

-- SelectAvailableBooks
select
  *
from
  books
where
  is_available = true;

-- FilterUsingOROperator
select
  *
from
  books
where
  book_category = 'Computer Science'
  or book_category = 'Programming';

-- FilterUsing AND, OR and ComparisonOperators
select
  *
from
  books
where
  (
    book_category = 'Computer Science'
    or book_category = 'Programming'
    or book_category = 'System Design'
  )
  and (price > 1000);

-- FilterUsingBETWEENOperator
select
  *
from
  books
where
  pages between 500 and 700;

-- FilterUsingINOperator
select
  *
from
  books
where
  book_category in ('Computer Science', 'System Design');

-- FilterFromArray
select
  *
from
  books
where
  'data-structures' = any (tags);

-- FilterFromJsonb
select
  *
from
  books
where
  metadata ->> 'format' = 'paperback';

# Like & ILike
-- FilterDataUsingLIKEOperator
select
  *
from
  books
where
  title like 'T%';

-- FilterDataUsingLIKEWithFixedCharacterLenght
select
  *
from
  books
where
  author like 'A__________';

-- FilterDataUsingILikeOperator (Case Insensitive)
select
  *
from
  books
where
  author ilike 'e%'
  or author ilike 'E%';

# ScalarFunctions
-- UpperFunction 
select
  upper(title) as "Books Title"
from
  books;

-- LowerFunction
select
  lower(title) as "Books Title"
from
  books;

-- ConcatFunction
select
  concat(title, ' ', author) as "Books Title & Author Name"
from
  books;

-- LengthFunction
select
  title,
  length(title) as "Books Title Length"
from
  books;

# AggregateFunctions
-- AverageFunction
select
  avg(pages)
from
  books;

-- MaximumFunction
select
  max(pages)
from
  books;

-- MinimumFunction
select
  min(pages)
from
  books;

-- SumFunction
select
  sum(price)
from
  books;

-- CountFunction (count non-null values)
select
  count(price)
from
  books;

-- CountAllRows
select
  count(*)
from
  books;

-- Find books where ISBN is NULL
select
  *
from
  books
where
  isbn is null;

select
  *
from
  books
where
  isbn is not null;

-- COALESCE
select
  title,
  coalesce(isbn, 0) as isbn,
  coalesce(price, 0) as price
from
  books;

-- Limit
select
  *
from
  books
limit
  5;

-- Offset
select
  *
from
  books
offset
  5;

-- Pagination
select
  *
from
  books
limit
  5
offset
  5 * 0;

select
  *
from
  books
limit
  5
offset
  5 * 1;