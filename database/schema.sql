CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    guard_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE permissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    guard_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role_has_permissions (
    permission_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,

    PRIMARY KEY(permission_id, role_id),

    FOREIGN KEY (permission_id)
    REFERENCES permissions(id)
    ON DELETE CASCADE,

    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE CASCADE
);

CREATE TABLE model_has_roles (
    role_id BIGINT NOT NULL,
    model_type VARCHAR(100) NOT NULL,
    model_id BIGINT NOT NULL,

    PRIMARY KEY(role_id, model_id, model_type),

    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE CASCADE
);

CREATE TABLE model_has_permissions (
    permission_id BIGINT NOT NULL,
    model_type VARCHAR(100) NOT NULL,
    model_id BIGINT NOT NULL,

    PRIMARY KEY(permission_id, model_id, model_type),

    FOREIGN KEY (permission_id)
    REFERENCES permissions(id)
    ON DELETE CASCADE
);


// Tabel untuk menyimpan data admin

-- ROLE DEFAULT

INSERT INTO roles (name, guard_name)
VALUES
('admin', 'web'),
('pegawai', 'web');


-- USER ADMIN DEFAULT

INSERT INTO users (nama, email, password)
VALUES (
    'Administrator',
    'admin@gmail.com',
    '$2b$10$lkt6LoO2h4YVfMyzgVp7GO99jrtT1Q7XJSuxypEepj4ZuPASJzXWW'
);

-- ROLE ADMIN

INSERT INTO model_has_roles (role_id, model_type, model_id)
VALUES (
    1,
    'User',
    1
);


/// Tabel untuk menyimpan data pegawai

INSERT INTO users (nama, email, password)
VALUES (
    'Pegawai',
    'pegawai@gmail.com',
    '$2b$10$BA1IpGMl8kH3ldPqbQr3Y.2l0h3bby4lv/Y/UKIFwRiBTwwy1tbZe'
);

INSERT INTO model_has_roles (role_id, model_type, model_id)
VALUES (
    2,
    'User',
    2
);