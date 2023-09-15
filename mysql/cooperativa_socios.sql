-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: cooperativa
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `socios`
--

DROP TABLE IF EXISTS `socios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socios` (
  `idSocio` int NOT NULL AUTO_INCREMENT,
  `nombreSocio` varchar(20) NOT NULL,
  `apellidosSocio` varchar(100) NOT NULL,
  `socioTelefono` varchar(100) NOT NULL,
  `cedulaSocio` bigint DEFAULT NULL,
  `activo_inactivo` varchar(30) NOT NULL,
  `socioDireccion` varchar(50) NOT NULL,
  `socioCorreoElectronico` varchar(55) NOT NULL,
  `fechaNacimiento` varchar(100) NOT NULL,
  `sexo` enum('M','F') NOT NULL,
  `estadoCivil` varchar(20) NOT NULL,
  `puestoTrabajo` varchar(100) NOT NULL,
  `nombreEmpresa` varchar(100) NOT NULL,
  `direccionEmpresa` varchar(100) NOT NULL,
  `gananciasMensual` int NOT NULL,
  `socioFechaRegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idSocio`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socios`
--

LOCK TABLES `socios` WRITE;
/*!40000 ALTER TABLE `socios` DISABLE KEYS */;
INSERT INTO `socios` VALUES (9,'dsfsd','sdfsdf','8095845468',40205505455,'Activo','asda','dasds@gmail.com','2023-09-15','M','Soltero/a','Infotep','asdas','etete',45342423,'2023-09-15 22:41:48'),(10,'Juan','Perez','8095845468',40205505456,'Activo','Aqui','dasds@gmail.com','2023-09-15','M','Soltero/a','asdas','asda','asda',4324234,'2023-09-15 22:44:01'),(11,'dawd','awd','8095845468',40205505458,'Activo','awdwad','dasds@gmail.com','2023-09-15','M','Soltero/a','awda','awd','awd',1223,'2023-09-15 22:51:26'),(12,'asdasd','asdasd','8095845468',40205505454,'Activo','asdasd','dasds@gmail.com','2023-09-22','M','Soltero/a','asdasd','asdasd','asdas',12312,'2023-09-15 23:02:51');
/*!40000 ALTER TABLE `socios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-15 16:04:13
