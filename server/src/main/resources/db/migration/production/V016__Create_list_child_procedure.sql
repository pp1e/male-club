CREATE PROCEDURE GetChildList(
    IN parent_id INT,
    IN age_filter BOOLEAN
)
BEGIN
    SELECT id, firstname, peculiarities, count_visit, user_id, birthdate
        FROM child WHERE (parent_id IS NULL OR user_id = parent_id)
                     AND (age_filter = false OR
                          # calculates child age
                          ((YEAR(NOW()) - YEAR(birthdate) - (DATE_FORMAT(NOW(), '%m%d') < DATE_FORMAT(birthdate, '%m%d')))
                              BETWEEN 2 AND 16)
                         );
END
