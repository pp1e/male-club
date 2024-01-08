INSERT INTO console (id, name, number, description) VALUES (1, "PS5", 1, "Definitely better than Xbox");
INSERT INTO console (id, name, number) VALUEs (2, "Xbox series X", 2);

# Логин: 1488
# Пароль: qwerty
INSERT INTO user (id, firstname, lastname, phone, password, role_id)
    VALUES (2, "Deniska", "", "1488", "$2a$10$EwIMrVcx./tgkqMemyrwHu8KpwpnhAGnkM0sr2jvn5wQVigNEtbVu", 1);

INSERT INTO child (id, firstname, peculiarities, count_visit, user_id, birthdate)
    VALUES (1, "Nikitos", "Driving Cherry Tiggo 7 pro max 128gb ultra HD plus", "5", 2, "2010-05-31");
INSERT INTO child (id, firstname, peculiarities, count_visit, user_id, birthdate)
    VALUES (2, "Polina", "Always late for couples", "1", 2, "2002-06-11");

INSERT INTO reservation (id, child_id, console_id, time_and_date, phone)
    VALUES (1, 2, 2, "2023-11-23 14:42:10", "322");
INSERT INTO reservation (id, child_id, console_id, time_and_date, phone)
    VALUES (2, 1, 1, "2024-01-20 14:42:10", "228")
