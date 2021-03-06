CREATE DATABASE database_links;

USE database_links;

CREATE TABLE users(id INT(11) NOT NULL,username VARCHAR(16) NOT NULL,password VARCHAR(60) NOT NULL,fullname VARCHAR(100) NOT NULL)

ALTER TABLE users
ADD PRIMARY KEY (id);

ALTER TABLE users MODIFY id INT(11) NOT NULL AUTO_INCREMENT = 1;

DECRIBE users;

-- links tables;
ALTER TABLE links MODIFY created_ad INT(11) NOT NULL AUTO_INCREMENT = 1;

CREATE TABLE links(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(150) NOT NULL, 
    url VARCHAR(255) NOT NULL, 
    description TEXT, 
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp, 
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id));

CREATE TABLE examen (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(150) NOT NULL,description TEXT, user_id INT(11),created_at timestamp NOT NULL DEFAULT current_timestamp,
 CONSTRAINT fk_examen_user FOREIGN KEY (user_id) REFERENCES users(id) );
