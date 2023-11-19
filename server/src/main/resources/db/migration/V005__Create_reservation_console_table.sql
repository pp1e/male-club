CREATE TABLE reservation_console (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    child_id BIGINT NOT NULL,
    console_id BIGINT NULL,
    time_and_date DATETIME NOT NULL,
    CONSTRAINT relation_5_child_fk FOREIGN KEY (child_id) REFERENCES child (id),
    CONSTRAINT relation_5_console_fk FOREIGN KEY (console_id) REFERENCES console (id)
);
