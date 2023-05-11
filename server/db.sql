drop database if exists todo;

create database todo;

-- \c todo;
use todo

create table task (
    id serial primary key,
    description varchar(255) not null,
    completed boolean not null
);

insert into task (description) values ("My test task");
insert into task (description) values ("My another task");