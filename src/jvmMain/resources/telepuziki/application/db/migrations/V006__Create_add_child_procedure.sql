CREATE PROCEDURE AddChild (
    IN firstname VARCHAR(50),
    IN peculiarities VARCHAR(200),
    IN phone VARCHAR(12),
    IN user_id INT
)
BEGIN
    INSERT INTO `child` (firstname, peculiarities, phone, count_visit, user_id)
    VALUES (firstName, peculiarities, phone, 0, user_id);
END