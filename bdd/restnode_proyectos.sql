CREATE DATABASE  IF NOT EXISTS `restnode` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `restnode`;
-- MySQL dump 10.13  Distrib 5.6.19, for osx10.7 (i386)
--
-- Host: 127.0.0.1    Database: restnode
-- ------------------------------------------------------
-- Server version	5.5.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreP` varchar(45) DEFAULT NULL,
  `statusP` varchar(45) DEFAULT NULL,
  `responsableP` varchar(45) DEFAULT NULL,
  `fechaP` date DEFAULT NULL,
  `referidoP` varchar(45) DEFAULT NULL,
  `ratingP` varchar(45) DEFAULT NULL,
  `descripcionP` varchar(60) DEFAULT NULL,
  `actualP` date DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (1,'Alegrias Dulces Navideños','En Progreso','Guillermos','2016-02-22','no hay','800','En este proyecto veremos la expansion de la empresas','2016-02-02','karla'),(2,'Proyecto de expansion','progreso','Guillermo','2016-02-02','Yo','50','Expansion de la empresa','2016-02-02',NULL),(3,'Creación de Proyecto','En Progreso','Guillermos','2016-02-15','Guillermo','800','Ni ideas','2016-02-04','karla'),(5,'Compra de mobiliario','En Progreso','Guillermo lone','2016-02-05','Un amigo recomendo','89','Compra de mobiliario pronto','2016-02-05','metalman'),(9,'Expansion empresa a Sonora','En Progreso','Hellos','2016-02-17','Hello','90','Ganamos','2016-02-15','karla'),(18,'Prueba','En Progreso','Guillermo','2016-02-20','Guillermo','15','prueb','2016-02-18','karla');
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-02-23 17:40:00
