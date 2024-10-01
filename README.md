# File-Management-System

## File management system using database and server

**Attention! The site was deployed on a local server, so before testing, you need to create and configure a database based on data from PHP files (MySQL).**

When creating, the following were used: HTML 5, CSS 3, JavaScript ES15, PHP 8.2.13, MySQL 8.2.0, PhpMyAdmin 5.2.1

File data is transferred to the database in the form of links to cloud storage with data. The site was created based on the idea of using it internally, so before testing the site, you need to create account data in the database

Query structure for creating a database:

 >CREATE TABLE Status (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, Name VARCHAR(255) NOT NULL, Изменять VARCHAR(255) NOT NULL, Добавлять VARCHAR(255) NOT NULL, Удалять VARCHAR(255) NOT NULL);


 >CREATE TABLE Papka (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, Name VARCHAR(255) NOT NULL, Доступ VARCHAR(255) NOT NULL, Описание VARCHAR(255) NOT NULL, Родительская_папка VARCHAR(255) NOT NULL);


 >CREATE TABLE Users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, Login VARCHAR(255) NOT NULL, Password VARCHAR(255) NOT NULL, STATUS VARCHAR(255) NOT NULL);


 >CREATE tABLE Files (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, Name VARCHAR(255) NOT NULL, Описание VARCHAR(255) NULL, Ссылка VARCHAR(255) NOT NULL, Папка VARCHAR(255) NOT NULL);
