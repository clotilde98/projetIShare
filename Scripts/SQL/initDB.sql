-- Suppression dans l'ordre inverse des dépendances
DROP TABLE IF EXISTS Comment;
DROP TABLE IF EXISTS Post_category;
DROP TABLE IF EXISTS Reservation CASCADE;
DROP TABLE IF EXISTS Post CASCADE;
DROP TABLE IF EXISTS Client CASCADE;
DROP TABLE IF EXISTS Category_product CASCADE;
DROP TABLE IF EXISTS Address CASCADE;


-- 1. Création de la table Address (Référence VILLE/CP)
CREATE TABLE Address (
    id SERIAL PRIMARY KEY,
    city VARCHAR(50) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    UNIQUE (city, postal_code)
);

-- 2. Création de la table Client (Contient l'adresse complète)
CREATE TABLE Client (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    street VARCHAR(100) NOT NULL,
    number INT NOT NULL,
    CHECK (number > 0),
    registration_date DATE DEFAULT NOW(),
    photo VARCHAR(255) NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    address_id INT NOT NULL REFERENCES Address(id) ON DELETE CASCADE
);

-- 3. Création de la table Post (Dépend de Client et Address)
CREATE TABLE Post (
    id SERIAL PRIMARY KEY,
    post_date DATE DEFAULT NOW(),
    description VARCHAR(255) NOT NULL,
    title VARCHAR(50) NOT NULL,
    number_of_places INT NOT NULL,
    post_status VARCHAR(20) NOT NULL DEFAULT 'available',
    CHECK (number_of_places > 0),
    CHECK (post_status IN ('available', 'unavailable')),
    photo VARCHAR(255) NULL,
    address_id INT NOT NULL REFERENCES Address(id) ON DELETE CASCADE, 
    client_id INT NOT NULL REFERENCES Client(id) ON DELETE CASCADE
);


CREATE TABLE Reservation (
    id SERIAL PRIMARY KEY,
    reservation_date DATE DEFAULT NOW(),
    reservation_status VARCHAR(20) NOT NULL DEFAULT 'confirmed',
    CHECK (reservation_status IN ('confirmed', 'cancelled')),
    post_id INT NOT NULL REFERENCES Post(id) ON DELETE CASCADE,
    client_id INT NOT NULL REFERENCES Client(id) ON DELETE CASCADE
);

CREATE TABLE Category_product (
    id_category SERIAL PRIMARY KEY,
    name_category VARCHAR(20) UNIQUE NOT NULL 
);

CREATE TABLE Post_category (
    id SERIAL PRIMARY KEY,
    id_category INT NOT NULL,
    id_ad INT NOT NULL,
    CONSTRAINT fk_category FOREIGN KEY (id_category) REFERENCES Category_product(id_category) ON DELETE CASCADE,
    CONSTRAINT fk_ad FOREIGN KEY (id_ad) REFERENCES Post(id) ON DELETE CASCADE,
    UNIQUE (id_category, id_ad)
);

CREATE TABLE Comment (
    id SERIAL PRIMARY KEY,
    content VARCHAR(300),
    date DATE DEFAULT CURRENT_DATE,
    id_post INT NOT NULL REFERENCES Post(id) ON DELETE CASCADE,
    id_costumer INT NOT NULL REFERENCES Client(id) ON DELETE CASCADE 
);


-- ----------------------------------------------------
-- DONNÉES D'INSERTION CORRIGÉES
-- ----------------------------------------------------

-- 1. Insérer l'Adresse de référence (Ville/CP) en premier
INSERT INTO Address (city, postal_code) 
VALUES ('Namur', '5000') 
RETURNING id; 
-- ID 1 est créé ici

-- 2. Insérer le Client (y compris rue/numéro) en utilisant l'address_id = 1
INSERT INTO Client (username, email, password, is_admin, street, number, address_id)
VALUES ('Clotilde', 'clotilde@example.com', 'motdepasse', FALSE, 'Rue des Fleurs', 15, 1)
RETURNING id; 
-- ID 1 est créé ici

-- 3. Insérer les Catégories
INSERT INTO Category_product (name_category) VALUES ('Food'); -- ID 1
INSERT INTO Category_product (name_category) VALUES ('Beverage'); -- ID 2
INSERT INTO Category_product (name_category) VALUES ('Frozen food'); -- ID 3

-- 4. Insérer le Post (adresse du post = 1, client_id = 1)
INSERT INTO Post (description, title, number_of_places, post_status, address_id, client_id) 
VALUES 
('Très bonnes pommes à donner gratuitement.', 'Pommes à donner', 3, 'available', 1, 1)
RETURNING id; 
-- ID 1 est créé ici

-- 5. Insérer les données liées
INSERT INTO Reservation (post_id, client_id) VALUES (1, 1);
INSERT INTO Post_category (id_category, id_ad) VALUES (1, 1);
INSERT INTO Comment(content, id_post, id_costumer)  
VALUES ('Pouvez-vous donner plus de précision sur le lieu exact ?', 1, 1);