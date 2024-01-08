CREATE PROCEDURE GetAdminInfoAboutConsoles (
    IN date DATE, IN time TIME, IN child_name VARCHAR(50)
)
BEGIN
    SELECT child.id, child.firstname, console.Number, reservation.phone,
           child.count_visit, child.peculiarities, child.birthdate, reservation.id
    FROM reservation
             INNER JOIN child ON child.id = reservation.child_id
             INNER JOIN console ON console.id = reservation.console_id
    WHERE DATE(reservation.time_and_date) = date AND
          (time IS NULL OR TIME(reservation.time_and_date) = time) AND
          child.firstname LIKE child_name
    ORDER BY reservation.time_and_date;
END
