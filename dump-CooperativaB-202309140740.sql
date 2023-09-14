-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: CooperativaB
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CuentaAhorros`
--

DROP TABLE IF EXISTS `CuentaAhorros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CuentaAhorros` (
  `idCuentaAhorros` int NOT NULL AUTO_INCREMENT,
  `cuentaSocio` int NOT NULL,
  `saldo` int NOT NULL,
  `fechaCreacion` timestamp NOT NULL,
  PRIMARY KEY (`idCuentaAhorros`),
  KEY `CuentaAhorros_FK` (`cuentaSocio`),
  CONSTRAINT `CuentaAhorros_FK` FOREIGN KEY (`cuentaSocio`) REFERENCES `socios` (`idSocio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CuentaAhorros`
--

LOCK TABLES `CuentaAhorros` WRITE;
/*!40000 ALTER TABLE `CuentaAhorros` DISABLE KEYS */;
/*!40000 ALTER TABLE `CuentaAhorros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transacciones`
--

DROP TABLE IF EXISTS `Transacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transacciones` (
  `idTransaccion` int NOT NULL AUTO_INCREMENT,
  `idCuentaAhorros` int NOT NULL,
  `tipoTransaccion` enum('retiro','deposito','transferencia') NOT NULL,
  `monto` int NOT NULL,
  `transaccionFecHor` timestamp NOT NULL,
  PRIMARY KEY (`idTransaccion`),
  KEY `Transacciones_FK` (`idCuentaAhorros`),
  CONSTRAINT `Transacciones_FK` FOREIGN KEY (`idCuentaAhorros`) REFERENCES `CuentaAhorros` (`idCuentaAhorros`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transacciones`
--

LOCK TABLES `Transacciones` WRITE;
/*!40000 ALTER TABLE `Transacciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `Transacciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuarios` (
  `idUsuarios` int NOT NULL AUTO_INCREMENT,
  `loginUsuarios` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  `nombreUsuarios` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `contraseñaUsuarios` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `permisos` enum('Normal','Admin') COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`idUsuarios`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (5,'1','1','$2a$08$trMl63U0bCPJkkmN5R4a2eqe9QGXnwvUhACzlVUOjE55YBFT1VKvC','Normal'),(28,'Adrian','adr','$2a$08$iu.9ehtFPl8YyFpJn2oaf.zdTwAt9qAJTbV0SQS7aoYVgqRb8p7bi','Admin'),(29,'Adrian','Adri','$2a$08$J7LJVzCNBHv3q//ULGo2iOPaXk5IDgBGMqMtD.RlsdfBjm2y3upNe','Admin'),(30,'1','1','$2a$08$fmq9N32TsWA.aVGdZ2M6POIwhVRgRP8ow4stJEs0vBufiD1a9aEx6','Admin'),(31,'a','a','$2a$08$Y4kcQK86kr09LwQyVJYUo.DRLu7yDE71i6A3W4TF3pNdLis50TaXy','Admin'),(32,'d','d','$2a$08$EmwmHbV9KPpk4WAIm6fQEOucbvOoFS.AkCWRre7xeLtm53BDBm3nK','Admin');
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `garantias`
--

DROP TABLE IF EXISTS `garantias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `garantias` (
  `idGarantias` int NOT NULL,
  `idsolicitud` int NOT NULL,
  `valorGarantia` float NOT NULL,
  `Descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idGarantias`),
  KEY `garantias_FK` (`idsolicitud`),
  CONSTRAINT `garantias_FK` FOREIGN KEY (`idsolicitud`) REFERENCES `soicitudPrestamo` (`idPrestamo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garantias`
--

LOCK TABLES `garantias` WRITE;
/*!40000 ALTER TABLE `garantias` DISABLE KEYS */;
/*!40000 ALTER TABLE `garantias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socios`
--

DROP TABLE IF EXISTS `socios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socios` (
  `idSocio` int NOT NULL AUTO_INCREMENT,
  `nombreSocio` varchar(20) NOT NULL,
  `cedulaSocio` int NOT NULL,
  `fechaNacimiento` varchar(100) NOT NULL,
  `sexo` enum('M','F') NOT NULL,
  `estadoCivil` varchar(20) NOT NULL,
  `puestoTrabajo` varchar(100) NOT NULL,
  `nombreEmpresa` varchar(100) NOT NULL,
  `direccionEmpresa` varchar(100) NOT NULL,
  `gananciasMensual` int NOT NULL,
  `apellidosSocio` varchar(100) NOT NULL,
  PRIMARY KEY (`idSocio`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socios`
--

LOCK TABLES `socios` WRITE;
/*!40000 ALTER TABLE `socios` DISABLE KEYS */;
INSERT INTO `socios` VALUES (1,'1',1,'2023-09-13','M','1','1','1','1',1,'1');
/*!40000 ALTER TABLE `socios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `soicitudPrestamo`
--

DROP TABLE IF EXISTS `soicitudPrestamo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `soicitudPrestamo` (
  `idPrestamo` int NOT NULL AUTO_INCREMENT,
  `idSocios` int NOT NULL,
  `tipoPrestamo` enum('hipotecario','perosanl','negocio','automovilistico') NOT NULL,
  `tasaInteres` float DEFAULT NULL,
  `fechaSolicitud` timestamp NOT NULL,
  `idGarantia` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `estadoSolicitud` enum('Pendiente','Aprovada','Rechasada') NOT NULL,
  PRIMARY KEY (`idPrestamo`),
  KEY `soicitudPrestamo_FK` (`idSocios`),
  CONSTRAINT `soicitudPrestamo_FK` FOREIGN KEY (`idSocios`) REFERENCES `socios` (`idSocio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `soicitudPrestamo`
--

LOCK TABLES `soicitudPrestamo` WRITE;
/*!40000 ALTER TABLE `soicitudPrestamo` DISABLE KEYS */;
/*!40000 ALTER TABLE `soicitudPrestamo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'CooperativaB'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-14  7:40:39
