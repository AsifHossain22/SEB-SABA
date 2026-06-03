# DATABASE CREATION & DELETION

- Create a new Database: create database school;

- Delete (drop) a database completely: drop database school;

# TABLE CREATION

- Create a new table: create table students ( id serial, name varchar(50), age
  int, isActive boolean, dob date )

# TABLE DELETION & CLEARING

- Delete (drop) the table permanently: drop table students;

- Drop + recreate if already exists (safe way): drop table if exists students;
