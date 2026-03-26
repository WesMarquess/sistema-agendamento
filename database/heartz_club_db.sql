CREATE DATABASE game_reviews;
USE game_reviews;

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL UNIQUE,
password_hash VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password_hash) VALUES
('joao123','[joao@email.com](mailto:joao@email.com)','hash1'),
('maria_gamer','[maria@email.com](mailto:maria@email.com)','hash2'),
('carlos_dev','[carlos@email.com](mailto:carlos@email.com)','hash3'),
('ana_player','[ana@email.com](mailto:ana@email.com)','hash4'),
('rafael','[rafael@email.com](mailto:rafael@email.com)','hash5'),
('lucas','[lucas@email.com](mailto:lucas@email.com)','hash6'),
('fernanda','[fernanda@email.com](mailto:fernanda@email.com)','hash7'),
('bruno','[bruno@email.com](mailto:bruno@email.com)','hash8'),
('patricia','[patricia@email.com](mailto:patricia@email.com)','hash9'),
('gamerx','[gamer@email.com](mailto:gamer@email.com)','hash10');

CREATE TABLE games (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(150) NOT NULL,
genre VARCHAR(100),
release_year INT,
developer VARCHAR(150)
);

INSERT INTO games (title, genre, release_year, developer) VALUES
('The Witcher 3','RPG',2015,'CD Projekt Red'),
('Elden Ring','RPG',2022,'FromSoftware'),
('Minecraft','Sandbox',2011,'Mojang'),
('Fortnite','Battle Royale',2017,'Epic Games'),
('Cyberpunk 2077','RPG',2020,'CD Projekt Red'),
('God of War','Action',2018,'Santa Monica Studio'),
('Red Dead Redemption 2','Action Adventure',2018,'Rockstar Games'),
('League of Legends','MOBA',2009,'Riot Games'),
('Valorant','FPS',2020,'Riot Games'),
('Hades','Roguelike',2020,'Supergiant Games');


CREATE TABLE posts (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
game_id INT,
title VARCHAR(150),
content TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (game_id) REFERENCES games(id)
);

INSERT INTO posts (user_id, game_id, title, content) VALUES
(1,1,'Uma obra-prima','The Witcher 3 tem uma narrativa incrível.'),
(2,2,'Muito difícil','Elden Ring é brutal mas recompensador.'),
(3,3,'Criatividade infinita','Minecraft é perfeito para construir mundos.'),
(4,4,'Viciante','Fortnite é divertido com amigos.'),
(5,5,'Gráficos impressionantes','Cyberpunk melhorou muito após updates.'),
(6,6,'História emocionante','God of War tem uma relação pai e filho linda.'),
(7,7,'Mundo vivo','RDR2 tem um dos mundos mais imersivos.'),
(8,8,'Competitivo','League of Legends é ótimo mas tóxico às vezes.'),
(9,9,'FPS tático','Valorant mistura CS com habilidades.'),
(10,10,'Gameplay perfeito','Hades é um dos melhores roguelikes.');


CREATE TABLE ratings (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
game_id INT,
rating DECIMAL(2,1),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (game_id) REFERENCES games(id)
);

INSERT INTO ratings (user_id, game_id, rating) VALUES
(1,1,9.5),
(2,2,9.0),
(3,3,8.5),
(4,4,8.0),
(5,5,7.5),
(6,6,9.2),
(7,7,9.7),
(8,8,8.3),
(9,9,8.6),
(10,10,9.1);


CREATE TABLE comments (
id INT AUTO_INCREMENT PRIMARY KEY,
post_id INT,
user_id INT,
content TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (post_id) REFERENCES posts(id),
FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO comments (post_id, user_id, content) VALUES
(1,2,'Concordo totalmente!'),
(2,3,'Também achei difícil.'),
(3,4,'Minecraft nunca fica velho.'),
(4,5,'Fortnite melhorou muito.'),
(5,6,'Cyberpunk no lançamento foi complicado.'),
(6,7,'Kratos é um personagem incrível.'),
(7,8,'RDR2 é muito realista.'),
(8,9,'LoL precisa melhorar a comunidade.'),
(9,10,'Valorant é muito competitivo.'),
(10,1,'Hades é viciante.');

CREATE TABLE likes (
id INT AUTO_INCREMENT PRIMARY KEY,
post_id INT,
user_id INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (post_id) REFERENCES posts(id),
FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO likes (post_id, user_id) VALUES
(1,3),
(2,4),
(3,5),
(4,6),
(5,7),
(6,8),
(7,9),
(8,10),
(9,1),
(10,2);

