CREATE TABLE refresh_token (
     user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
     token VARCHAR(50) NOT NULL,
     expiry_date DATETIME NOT NULL,
     CONSTRAINT refresh_token_user_fk FOREIGN KEY (user_id) REFERENCES user (id)
);