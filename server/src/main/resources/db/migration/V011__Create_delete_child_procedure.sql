CREATE PROCEDURE DeleteChild (
    IN child_id BIGINT
)
BEGIN
    DELETE FROM reservation WHERE child_id = reservation.child_id;
    DELETE FROM child WHERE id = child_id;
END
