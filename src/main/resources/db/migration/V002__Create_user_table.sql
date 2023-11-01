CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    patronymic VARCHAR(50),
    phone VARCHAR(12) NOT NULL,
    password VARCHAR(200) NOT NULL,
    role_id BIGINT NOT NULL,
    CONSTRAINT user_role_fk FOREIGN KEY (role_id) REFERENCES role (id)
);