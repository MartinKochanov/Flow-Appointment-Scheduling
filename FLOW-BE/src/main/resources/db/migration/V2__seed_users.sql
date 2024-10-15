ALTER TABLE users
    ADD COLUMN role ENUM ('ADMIN', 'USER', 'EMPLOYEE') NOT NULL;

INSERT INTO users (first_name, last_name, email, password, role, phone)
VALUES ("Admin", "Adminovic", "admin@test.com", "$2a$10$f87hSOCzpYENK8qwV7vNBuTZYKR99BZvQkAkR8FEctNvAOCAZhw0q", "ADMIN", "02093094"),
     ("Employee", "Employev", "employee@test.com", "$2a$10$f87hSOCzpYENK8qwV7vNBuTZYKR99BZvQkAkR8FEctNvAOCAZhw0q", "EMPLOYEE", "02093094"),
     ("User", "Userov", "user@test.com", "$2a$10$f87hSOCzpYENK8qwV7vNBuTZYKR99BZvQkAkR8FEctNvAOCAZhw0q", "USER", "02093094")

