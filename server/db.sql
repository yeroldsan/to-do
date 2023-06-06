drop database if exists todo;

create database todo;

\c todo; -- for PostgeSQL / use todo (MySQL)

create table task (
    id int primary key generated always as identity, -- For PostgreSQL versions below 10, use SERIAL
    description varchar(100) not null,
    completed boolean not null
);

-- Testing
insert into task (description) values ("My test task");
insert into task (description) values ("My another task");