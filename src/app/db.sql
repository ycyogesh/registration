show databases;
use crud;
show tables;
-- create table signupUsers(id int(11) primary key not null auto_increment,
-- orgName varchar(255),
-- email varchar(255),
-- password varchar(255),
-- mobileNo int(10),
-- isVerified boolean,
-- isDeleted boolean default 0,
-- createdBy int(11) default 1,
-- updatedBy int(11),
-- createdOn datetime default current_timestamp,
-- updatedOn datetime);

create index id on signupUsers(id,email);
desc signupUsers;

