CREATE TABLE appointments
(
    id               BIGINT PRIMARY KEY AUTO_INCREMENT,
    service_id       BIGINT    NOT NULL,
    employee_id      BIGINT    NOT NULL,
    client_id        BIGINT    NOT NULL,
    appointment_time TIMESTAMP NOT NULL,
    end_date_time    TIMESTAMP NOT NULL,
    status           ENUM ('SCHEDULED', 'CANCELED' ) NOT NULL DEFAULT 'SCHEDULED',
    CONSTRAINT fk_appointment_service FOREIGN KEY (service_id) REFERENCES services (id),
    CONSTRAINT fk_appointment_employee FOREIGN KEY (employee_id) REFERENCES users (id),
    CONSTRAINT fk_appointment_customer FOREIGN KEY (client_id) REFERENCES users (id)
);
