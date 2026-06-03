# Column Constraints

- NOT NULL: Command: CREATE TABLE example ( name VARCHAR(50) NOT NULL );
- UNIQUE: Command: CREATE TABLE example_unique ( email VARCHAR(100) UNIQUE );
- PRIMARY KEY: Command: CREATE TABLE students ( student_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL ) - \* Primary Key = must be unique + cannot be
  null\*
- FOREIGN KEY: Command: CRATE TABLE orders( order_id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES product(product_id));
- DEFAULT: Command: CREATE TABLE users( user_id SERIAL PRIMARY KEY, name
  VARCHAR(50), status VARCHAR(20) DEFAULT 'active')
- CHECK: CREATE TABLE employees( emp_id SERIAL PRIMARY KEY, name VARCHAR(50),
  age INT CHECK (age >= 18));

- All Together in one table: CREATE TABLE students( student_id SERIAL PRIMARY
  KEY, full_name VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE, age INT CHECK
  (age >= 18), status VARCHAR(20) DEFAULT 'active')
