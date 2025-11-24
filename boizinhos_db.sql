
CREATE DATABASE IF NOT EXISTS `boizinhos_db`;


USE `boizinhos_db`;


CREATE TABLE IF NOT EXISTS `bois` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nome_animal` VARCHAR(100) NOT NULL,
    `nome_dono` VARCHAR(100) NOT NULL,
    `raca` VARCHAR(50),
    `sexo` VARCHAR(10),
    `telefone` VARCHAR(20)
);

