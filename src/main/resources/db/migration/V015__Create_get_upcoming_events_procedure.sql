CREATE PROCEDURE GetUpcomingEvents (
    IN parent_id BIGINT
)
BEGIN
    SELECT child.firstname, reservation_console.time_and_date, console.Number
    FROM child
        INNER JOIN reservation_console ON child.id = reservation_console.child_id
        INNER JOIN console ON reservation_console.console_id = console.id
    WHERE child.user_id = parent_id AND reservation_console.time_and_date > NOW()
    ORDER BY reservation_console.time_and_date;
END