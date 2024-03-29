CREATE PROCEDURE GetUpcomingEvents (
    IN parent_id BIGINT
)
BEGIN
    SELECT reservation.id, child.firstname, reservation.time_and_date, console.Number
    FROM child
        INNER JOIN reservation ON child.id = reservation.child_id
        LEFT JOIN console ON reservation.console_id = console.id
    WHERE child.user_id = parent_id AND reservation.time_and_date > NOW() AND is_confirmed = false
    ORDER BY reservation.time_and_date;
END
