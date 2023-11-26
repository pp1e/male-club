CREATE PROCEDURE GetAdminInfoAboutConsoles (
    IN date DATETIME
)
BEGIN
    SELECT child.firstname, console.Number, reservation.phone, child.count_visit, child.peculiarities
    FROM reservation
             INNER JOIN child ON child.id = reservation.child_id
             INNER JOIN console ON console.id = reservation.console_id
    WHERE reservation.time_and_date = date;
END
