-- Crear una enumeración para los roles de usuario
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Crear la tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear una enumeración para el estado de los reportes
CREATE TYPE report_status AS ENUM ('open', 'in_progress', 'closed');

-- Crear la tabla de reportes
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status report_status DEFAULT 'open',
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE -- Si se borra un usuario, se borran sus reportes
);

-- Insertar un usuario administrador inicial para pruebas
INSERT INTO users (email, password_hash, role) VALUES ('admin@example.com', '$2b$10$fakesecretpasswordhash', 'admin');