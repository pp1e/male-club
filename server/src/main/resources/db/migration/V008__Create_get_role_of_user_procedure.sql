CREATE PROCEDURE GetRole (
    IN user_id BIGINT
)
BEGIN
    SELECT role.name
    FROM user
         INNER JOIN role ON user.role_id = role.id
    WHERE user.id = user_id;
END
