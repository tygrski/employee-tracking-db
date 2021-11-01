
DROP DATABASE IF EXISTS traking;
CREATE DATABASE traking;
USE  traking;

-- creating database traking

-- Department table Created ================================================================================
CREATE TABLE department (
-- rows
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL UNIQUE
);

-- Roles table Created ====================================================================================
CREATE TABLE roles(
-- rows
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER,
-- FKeys
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

-- Employee table Created ==================================================================================
CREATE TABLE employee(
--  Rows
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
-- FKeys
  CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(id)
);

