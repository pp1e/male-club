CREATE PROCEDURE AddUser (
    IN firstName VARCHAR(50),
    IN lastName VARCHAR(50),
    IN patronymic VARCHAR(50),
    IN phone VARCHAR(12),
    IN password VARCHAR(200)
)
BEGIN
    INSERT INTO user (lastname, firstname, patronymic, phone, password, role_id)
    VALUES (lastName, firstName, patronymic, phone, password, 1);
END