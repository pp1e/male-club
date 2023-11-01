CREATE PROCEDURE `AddVisitChild` (
    IN child_id BIGINT
)
BEGIN
    UPDATE child SET count_visit = 1 + (SELECT count_visit FROM child WHERE id = child_id) WHERE id = child_id;
END