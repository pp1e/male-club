SELECT COUNT(ID) FROM RESERVATION WHERE DATEADD(HOUR, 2, time_and_date) >= GETDATE() AND time_and_date <= GETDATE() AND console_id IS NULL