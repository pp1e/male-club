CREATE PROCEDURE GetChildFromParent (
    IN parent_id BIGINT
)
BEGIN
    SELECT id, firstname, peculiarities, phone, count_visit FROM child WHERE user_id = parent_id;
END