CREATE PROCEDURE GetUpcomingOccupancy(
	IN datetime DATETIME
)
BEGIN
	SELECT COUNT(ID) AS occupancy FROM reservation WHERE DATE_ADD(datetime, INTERVAL 2 HOUR) >= time_and_date AND time_and_date >= datetime;
END
