USE traking;
-- seeding the database

-- Derpartments rows data ============================================================
INSERT INTO department (department_name)
VALUES
  ('Finance'),
  ('Marketing'),
  ('Management');

--Roles rows data ==================================================================
INSERT INTO roles (title, salary, department_id)
VALUES
  ('CFO', 200000.00, 1),
  ('Accounting', 120000.00, 1),
  ('Marketing Sales', 100000.00, 2),
  ('Genereal Manager', 110000.00, 3);

-- Employees rows data ==============================================================
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Cherry', 'Hills', 2, 3),
  ('Amber', 'Frost', 1, 1),
  ('Wendy', 'Thomas', 2, 2 ),
  ('Crystal', 'Lands', 3, 2);
 
