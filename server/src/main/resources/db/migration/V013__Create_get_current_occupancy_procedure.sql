CREATE PROCEDURE GetCurrentOccupancy( 
    IN datetime DATETIME
)
BEGIN
    SELECT COUNT(ID) AS occupancy FROM RESERVATION WHERE DATE_ADD(time_and_date, INTERVAL 2 HOUR) >= datetime AND time_and_date <= datetime;
END
