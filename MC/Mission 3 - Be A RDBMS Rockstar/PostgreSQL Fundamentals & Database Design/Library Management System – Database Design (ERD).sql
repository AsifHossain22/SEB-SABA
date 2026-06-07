-- CreateDatabase 
create database library_management_system;

-- DropDatabase
drop database database_name;

-- CreateTable
create table books (
  id serial primary key,
  title varchar(255) not null,
  author varchar(255) not null,
  isbn bigint unique,
  book_category varchar(50) not null,
  rating smallint check (rating <= 5),
  price numeric(8, 2) check (price > 0),
  isAvailable boolean default true,
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
    rating,
    price,
    tags,
    metadata
  )
values
  (
    1,
    'Book 1',
    'Author 1',
    '1234567',
    'Category 1',
    4,
    500,
    array['English', 'Mathematics', 'Programming'],
    '{"page" : "1500", "bio" : "Boook1Bio"}'
  )

  -- InsertMultipleRecords
  -- InsertRecordUsingDefaultAutoIncrementID
insert into
  books (
    title,
    author,
    isbn,
    book_category,
    rating,
    price,
    tags,
    metadata
  )
values
  (
    'The Silent Echo',
    'Eleanor Vance',
    '9876543',
    'Mystery',
    5,
    340,
    ARRAY['Fiction', 'Suspense', 'Thriller'],
    '{"page": "340", "bio": "A gripping psychological thriller set in modern London."}'
  ),
  (
    'Quantum Horizons',
    'Dr. Aris Thorne',
    '4561237',
    'Science',
    4,
    520,
    ARRAY['Physics', 'Quantum Mechanics', 'Non-Fiction'],
    '{"page": "520", "bio": "An accessible dive into the anomalies of quantum physics."}'
  ),
  (
    'Pythonic Mastery',
    'Code Smith',
    '3216549',
    'Technology',
    5,
    410,
    ARRAY['Programming', 'Python', 'Software Engineering'],
    '{"page": "410", "bio": "Advanced design patterns and optimization techniques for Python."}'
  ),
  (
    'Shadows of the Empire',
    'J. R. Thorne',
    '8529631',
    'Fantasy',
    3,
    680,
    ARRAY['Fiction', 'Epic Fantasy', 'World Building'],
    '{"page": "680", "bio": "Book one of the acclaimed high-fantasy trilogy."}'
  ),
  (
    'The Wealth Mindset',
    'Sarah Jenkins',
    '1593574',
    'Finance',
    4,
    290,
    ARRAY['Economics', 'Personal Finance', 'Self-Help'],
    '{"page": "290", "bio": "Practical strategies for long-term wealth accumulation."}'
  ),
  (
    'Calculus Unlocked',
    'Prof. Alan Turing',
    '7531598',
    'Mathematics',
    5,
    450,
    ARRAY['Mathematics', 'Calculus', 'Education'],
    '{"page": "450", "bio": "A comprehensive guide from limits to multi-variable integration."}'
  ),
  (
    'Baking with Science',
    'Chef Chloe',
    '2584561',
    'Culinary',
    4,
    210,
    ARRAY['Cooking', 'Baking', 'Food Chemistry'],
    '{"page": "210", "bio": "Understanding the chemical reactions behind perfect pastries."}'
  ),
  (
    'Ancient Echoes',
    'Marcus Aurelius',
    '6547893',
    'History',
    4,
    380,
    ARRAY['Non-Fiction', 'Roman History', 'Philosophy'],
    '{"page": "380", "bio": "An in-depth look at daily life during the height of the Roman Empire."}'
  ),
  (
    'Data Structures & Algorithms',
    'Linus Torvalds',
    '1472583',
    'Technology',
    5,
    590,
    ARRAY['Computer Science', 'Programming', 'Algorithms'],
    '{"page": "590", "bio": "The essential handbook for interview preparation and problem solving."}'
  ),
  (
    'The Art of Minimalism',
    'Marie Kondo',
    '3692581',
    'Lifestyle',
    3,
    180,
    ARRAY['Self-Help', 'Organization', 'Minimalism'],
    '{"page": "180", "bio": "Decluttering your digital and physical space for maximum focus."}'
  );

-- ViewAllRecords
select
  *
from
  books;