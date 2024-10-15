CREATE TABLE services
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255)   NOT NULL UNIQUE CHECK (LENGTH(name) >= 2),
    description VARCHAR(255)   NOT NULL,
    duration    INT            NOT NULL CHECK (duration >= 5),
    price       DECIMAL(19, 2) NOT NULL CHECK (price > 0)
);

CREATE TABLE user_services
(
    user_id    BIGINT NOT NULL,
    service_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, service_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);