CREATE DATABASE todo;
USE todo;



CREATE TABLE users(
	id int auto_increment,
  login varchar(40),
  pass varchar(30),
  PRIMARY KEY(ID)
);

CREATE TABLE items(
	id bigint(50),
  userId int,
  text mediumtext,
  checked bool,
  PRIMARY KEY(id)
);