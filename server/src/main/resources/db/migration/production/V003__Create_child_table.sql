CREATE TABLE child(
    id BIGINT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    peculiarities VARCHAR(200) NULL,
    count_visit INT NOT NULL,
    user_id BIGINT NOT NULL,
    birthdate DATE NOT NULL,
    PRIMARY KEY (ID),
    CONSTRAINT child_user_fk FOREIGN KEY (user_id) REFERENCES user (id)
);
