CREATE PROCEDURE UpdateChild (
    IN child_id BIGINT,
    IN firstname VARCHAR(50),
    IN peculiarities VARCHAR(200),
    IN phone VARCHAR(12)
)
BEGIN
    UPDATE child SET firstname = child.firstname, peculiarities = child.peculiarities,
                     phone = child.phone WHERE id = child_id;
END