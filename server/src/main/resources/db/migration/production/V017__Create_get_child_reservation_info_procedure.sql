CREATE PROCEDURE GetChildReservationInfo( 
    IN datetime DATETIME,
    IN id_child BIGINT
)
BEGIN
    SELECT COUNT(ID) AS count_res FROM reservation WHERE CHILD_ID = id_child AND DATE_ADD(TIME_AND_DATE, INTERVAL 2 HOUR) >= datetime AND DATE_SUB(TIME_AND_DATE, INTERVAL 2 HOUR) <= datetime;
END
