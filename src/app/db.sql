-- show databases;
-- use crud;
-- show tables;
-- create table signupUsers(id int(11) primary key not null auto_increment,
-- orgName varchar(255),
-- email varchar(255),
-- password varchar(255),
-- mobileNo decimal(10),
-- token varchar(255),
-- isVerified boolean default 0,
-- isDeleted boolean default 0,
-- createdBy int(11) default 1,
-- updatedBy int(11),
-- createdOn datetime default current_timestamp,
-- updatedOn datetime);
-- alter table signupUsers add column isBlocked boolean default 0;
-- alter table signupUsers add column loginCount int(11) default 0;


-- create index id on signupUsers(id,email);
-- desc signupUsers;
select * from signupUsers;
--  drop table signupUsers;

