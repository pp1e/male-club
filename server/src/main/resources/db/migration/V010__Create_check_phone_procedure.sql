CREATE PROCEDURE CheckPhone (
    IN phone VARCHAR(12)
)
BEGIN
    SELECT COUNT(phone) FROM user WHERE phone = user.phone;
END