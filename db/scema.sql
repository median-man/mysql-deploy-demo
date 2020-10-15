create database if not exists mysql_deploy_demo;
use mysql_deploy_demo;
create table users (
    id int primary key not null auto_increment,
    email varchar(255) not null,
    unique key email (email)
); 