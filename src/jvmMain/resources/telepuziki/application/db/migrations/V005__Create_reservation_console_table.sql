CREATE TABLE reservation_console (
    child_id INT NOT NULL,
    console_id INT NOT NULL,
    time_and_date DATETIME NOT NULL,
    PRIMARY KEY (child_id, console_id),
    CONSTRAINT relation_5_child_fk FOREIGN KEY (child_id) REFERENCES child (id),
    CONSTRAINT relation_5_console_fk FOREIGN KEY (console_id) REFERENCES console (id)
);
