CREATE PROCEDURE DeleteChild (
    IN child_id INT
)
BEGIN
    DELETE FROM reservation_console WHERE child_id = reservation_console.child_id;
    DELETE FROM child WHERE id = child_id;
END