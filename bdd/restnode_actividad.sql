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
-- Table structure for table `actividad`
--

DROP TABLE IF EXISTS `actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actividad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) DEFAULT NULL,
  `user` varchar(45) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `typeid` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad`
--

LOCK TABLES `actividad` WRITE;
/*!40000 ALTER TABLE `actividad` DISABLE KEYS */;
INSERT INTO `actividad` VALUES (49,'Cambios en Proyecto','karla','2016-02-15 23:13:35','Expansion de empresas',NULL,NULL),(50,'Cambios en Proyecto','karla','2016-02-15 23:13:43','Expansion de empresas',NULL,NULL),(51,'Cambios en Proyecto','karla','2016-02-15 23:13:49','Expansion de empresa',NULL,NULL),(52,'Cambios en Proyecto','karla','2016-02-15 23:14:04','Expansion empresa a Sonora',NULL,NULL),(53,'Cambios en Oportunidad','karla','2016-02-15 23:17:50','Compra de materialr',NULL,NULL),(54,'Cambios en Proyecto','karla','2016-02-15 23:18:49','Proyectile',NULL,NULL),(55,'Cambios en Oportunidad','karla','2016-02-15 23:19:08','Compra de materialr',NULL,NULL),(56,'Cambios en Oportunidad','karla','2016-02-15 23:21:43','Compra de e',NULL,NULL),(57,'Cambios en Oportunidad','karla','2016-02-15 23:25:45','Compra de scuela',NULL,NULL),(58,'Cambios en Oportunidad','karla','2016-02-17 18:59:52','Compra de escuela',NULL,NULL),(59,'Cambios en Oportunidad','karla','2016-02-17 19:22:59','Compra de escuela de lo que sea',NULL,NULL),(60,'Cambios en Oportunidad','karla','2016-02-17 19:23:13','Compra de escuela de lo que sea dsdsdsdsdsdsd',NULL,NULL),(61,'Cambios en Proyecto','karla','2016-02-17 19:23:32','Expansion de empresa',NULL,NULL),(62,'Cambios en Oportunidad','karla','2016-02-17 19:23:45','Compra de escuela',NULL,NULL),(63,'Cambios en Proyecto','karla','2016-02-17 19:24:01','Dulces Alegria',NULL,NULL),(64,'Cambios en Proyecto','karla','2016-02-18 16:34:15','Expansion de empresas',NULL,NULL),(65,'Creacion de Proyecto','karla','2016-02-18 16:38:55',NULL,NULL,NULL),(66,'Creacion de Proyecto','karla','2016-02-18 16:38:55',NULL,NULL,NULL),(67,'Creacion de Proyecto','karla','2016-02-18 16:39:13',NULL,NULL,NULL),(68,'Creacion de Proyecto','karla','2016-02-18 16:40:55',NULL,NULL,NULL),(69,'Elimininacion de Proyecto','karla','2016-02-18 16:44:00',NULL,NULL,NULL),(70,'Elimininacion de Proyecto','karla','2016-02-18 16:44:03',NULL,NULL,NULL),(71,'Elimininacion de Proyecto','karla','2016-02-18 16:44:05',NULL,NULL,NULL),(72,'Elimininación de Proyecto','karla','2016-02-18 16:44:08',NULL,NULL,NULL),(73,'Creacion de Proyecto','karla','2016-02-18 16:44:19',NULL,NULL,NULL),(74,'Elimininación de Proyecto','karla','2016-02-18 16:44:56',NULL,NULL,NULL),(75,'Creacion de Proyecto','karla','2016-02-18 16:47:41',NULL,NULL,NULL),(76,'Elimininación de Proyecto','karla','2016-02-18 16:47:59',NULL,NULL,NULL),(77,'Cambios en Proyecto','karla','2016-02-18 16:49:44',NULL,NULL,NULL),(78,'Creacin de Proyecto','karla','2016-02-18 16:50:22',NULL,NULL,NULL),(79,'Elimininación de Proyecto','karla','2016-02-18 16:50:30',NULL,NULL,NULL),(80,'Cambios en Proyecto','karla','2016-02-18 16:52:32',NULL,NULL,NULL),(81,'Cambios en Proyecto','karla','2016-02-18 16:54:30',NULL,'oportunidad','374'),(82,'Cambios en Proyecto','karla','2016-02-18 16:58:50','Alegrias','oportunidad','374'),(83,'Cambios en Proyecto','karla','2016-02-18 16:59:04','Creación de Proyecto','proyecto','9'),(84,'Cambios en Proyecto','karla','2016-02-18 17:39:01','Creación de Proyecto','proyecto','3'),(85,'Cambios en Oportunidad','karla','2016-02-18 17:39:22','Compra de escuela','oportunidad','374'),(86,'Creación de Proyecto','karla','2016-02-18 17:42:06','ffgfggh',NULL,NULL),(87,'Elimininación de Proyecto','karla','2016-02-18 17:43:23',NULL,NULL,NULL),(88,'Creación de Proyecto','karla','2016-02-18 19:59:29','Prueba',NULL,NULL),(89,'Creación de Oportunidad','karla','2016-02-18 20:00:14','oportunidad test','home',''),(90,'Cambios en Proyecto','karla','2016-02-18 23:34:10','Prueba','proyecto','18'),(91,'Cambios en Proyecto','karla','2016-02-19 00:02:50','Prueba','proyecto','18'),(92,'Cambios en Proyecto','karla','2016-02-19 00:09:28','Alegrias Dulces Navideños','proyecto','1'),(93,'Cambios en Oportunidad','karla','2016-02-22 14:22:36','Compra de escuela','oportunidad','374'),(94,'Cambios en Proyecto','karla','2016-02-22 17:10:29','Alegrias Dulces Navideños','proyecto','1'),(95,'Creación de Oportunidad','karla','2016-02-22 18:55:47','Creando una nueva','home','');
/*!40000 ALTER TABLE `actividad` ENABLE KEYS */;
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
