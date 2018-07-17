-- --------------------------------------------------------
-- Host:                         mysql.planetgraf.com.br
-- Server version:               5.5.43-log - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for planetgraf04
CREATE DATABASE IF NOT EXISTS `planetgraf04` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `planetgraf04`;

-- Dumping structure for table planetgraf04.areas
CREATE TABLE IF NOT EXISTS `areas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `page_name` varchar(50) NOT NULL,
  `menu` tinyint(4) NOT NULL DEFAULT '0',
  `image` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table planetgraf04.areas: ~4 rows (approximately)
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
REPLACE INTO `areas` (`id`, `name`, `page_name`, `menu`, `image`) VALUES
	(1, 'Produtos', 'prod', 1, 'briefcase'),
	(2, 'Cadastro de Produto', 'prodEdit', 0, NULL),
	(3, 'Usuários', 'user', 1, 'user'),
	(4, 'Cadastro de Usuários', 'userEdit', 0, NULL);
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;

-- Dumping structure for table planetgraf04.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(32) NOT NULL,
  `last_token` varchar(32) DEFAULT '0',
  `level` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 - default , 1 - adm',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table planetgraf04.users: ~1 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE INTO `users` (`id`, `name`, `email`, `password`, `last_token`, `level`) VALUES
	(1, 'Rafael Passarela', 'rafaelpassarela@gmail.com', 'ed8bf37019bca7bccc502bb16e715c6f', NULL, 1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table planetgraf04.user_areas
CREATE TABLE IF NOT EXISTS `user_areas` (
  `idUser` int(11) NOT NULL,
  `idArea` int(11) NOT NULL,
  `level` tinyint(4) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`idUser`,`idArea`),
  KEY `FKUserAreas_Areas` (`idArea`),
  CONSTRAINT `FKUserAreas_Areas` FOREIGN KEY (`idArea`) REFERENCES `areas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKUserAreas_Users` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table planetgraf04.user_areas: ~3 rows (approximately)
/*!40000 ALTER TABLE `user_areas` DISABLE KEYS */;
REPLACE INTO `user_areas` (`idUser`, `idArea`, `level`) VALUES
	(1, 1, 1),
	(1, 2, 1),
	(1, 3, 1);
/*!40000 ALTER TABLE `user_areas` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
