CREATE PROCEDURE GetAdminInfoAboutConsoles (
    IN date DATETIME
)
BEGIN
    SELECT child.firstname, console.Number, child.phone, child.count_visit, child.peculiarities
    FROM reservation_console
             INNER JOIN child ON child.id = reservation_console.child_id
             INNER JOIN console ON console.id = reservation_console.console_id
    WHERE reservation_console.time_and_date = date;
END