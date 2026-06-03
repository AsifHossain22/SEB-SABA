# Create a table

create table person ( id serial primary key, username varchar(50) unique, email
varchar(50) unique, age int check (age>=20), isActive boolean default true )

-- Create a table create table person ( id serial primary key, username
varchar(50) unique, email varchar(50) unique, age int check (age>=20), isActive
boolean default true )

-- Single-row insert insert into person (id, username, email, age) values (2,
'ratul', 'ratul@email.com', 25);

select \* from person;
