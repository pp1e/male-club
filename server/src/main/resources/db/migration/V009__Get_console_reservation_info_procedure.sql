CREATE PROCEDURE GetConsoleReservationInfo (
    IN datetime DATETIME
)
BEGIN
    SELECT id, name, number, description, reservations FROM console
        LEFT JOIN (
            SELECT console_id, COUNT(*) as reservations
                FROM reservation WHERE time_and_date <= datetime AND
                                       time_and_date > DATE_SUB(datetime, INTERVAL 2 HOUR)
                    GROUP BY console_id
            ) AS reserv_count ON console.id = reserv_count.console_id;
END