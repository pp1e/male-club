CREATE PROCEDURE CheckPassword (
    IN phone VARCHAR(12),
    IN password VARCHAR(200)
)
BEGIN
    SELECT id FROM user WHERE phone = user.phone AND password = user.password;
END