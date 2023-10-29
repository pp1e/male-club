CREATE PROCEDURE ReservConsole (
    IN child INT,
    IN console INT,
    IN date DATETIME
)
BEGIN
    INSERT INTO reservation_console (child_id, console_id, time_and_date)
    VALUES (child, console, date);
END