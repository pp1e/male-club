CREATE PROCEDURE DeleteReservation (
    IN child BIGINT,
    IN console BIGINT,
    IN time DATETIME
)
BEGIN
    DELETE FROM reservation WHERE child_id = child AND console_id = console AND time_and_date = time;
END
