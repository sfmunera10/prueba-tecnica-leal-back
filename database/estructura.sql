-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema abc-db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema abc-db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `abc-db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `abc-db` ;

-- -----------------------------------------------------
-- Table `abc-db`.`abcusers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `abc-db`.`abcusers` ;

CREATE TABLE IF NOT EXISTS `abc-db`.`abcusers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(255) NOT NULL,
  `created_date` DATETIME NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `lastname` VARCHAR(255) NULL DEFAULT NULL,
  `birth_date` DATETIME NULL DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE,
  UNIQUE INDEX `user_id` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `abc-db`.`abctransactions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `abc-db`.`abctransactions` ;

CREATE TABLE IF NOT EXISTS `abc-db`.`abctransactions` (
  `transaction_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(255) NOT NULL,
  `created_date` DATETIME NOT NULL,
  `value` FLOAT NULL DEFAULT NULL,
  `points` INT(11) NULL DEFAULT NULL,
  `status` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  UNIQUE INDEX `transaction_id` (`transaction_id` ASC) VISIBLE,
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `abctransactions_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `abc-db`.`abcusers` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `abc-db`.`sequelizemeta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `abc-db`.`sequelizemeta` ;

CREATE TABLE IF NOT EXISTS `abc-db`.`sequelizemeta` (
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
