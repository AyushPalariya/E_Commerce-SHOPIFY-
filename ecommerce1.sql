-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce1
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `orders_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKea29bb770t1s99pp2ngvhgwnt` (`orders_id`),
  KEY `FK551losx9j75ss5d6bfsqvijna` (`product_id`),
  CONSTRAINT `FK551losx9j75ss5d6bfsqvijna` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKea29bb770t1s99pp2ngvhgwnt` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (1,7,1,1),(2,4,1,2),(3,1,2,6),(4,1,2,9),(5,1,3,5),(6,1,4,3),(7,1,4,9),(8,2,5,6),(9,2,5,9),(10,1,6,4),(11,2,6,9);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_date` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_amount` double NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKel9kyl84ego2otj2accfd8mr7` (`user_id`),
  CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2025-08-07 16:45:46.122000','pending',139000,1),(2,'2026-04-21 11:59:04.168000','pending',4498,3),(3,'2026-04-21 12:03:04.865000','pending',2499,3),(4,'2026-04-21 12:32:05.647000','pending',8499,10),(5,'2026-04-21 12:42:35.035000','pending',8996,10),(6,'2026-04-21 13:21:11.358000','pending',8997,11);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_order`
--

DROP TABLE IF EXISTS `payment_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `payment_id` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_order`
--

LOCK TABLES `payment_order` WRITE;
/*!40000 ALTER TABLE `payment_order` DISABLE KEYS */;
INSERT INTO `payment_order` VALUES (1,2341,'2026-04-14 20:08:52.554589','piyuudri9eariya7869@gmail.com','Rameshhq',NULL,'9139030229','Created','order_SdPOgKjvpJa0cq'),(2,3499,'2026-04-21 11:24:08.423473','ayushpalariya96@gmail.com','Ayush palariya',NULL,'0000000000','Created','order_Sg2CH9c4jlakLr'),(3,5000,'2026-04-21 11:42:04.831399','ayushpalariya96@gmail.com','Ayush palariya',NULL,'0000000000','Created','order_Sg2VE9OmN01k78'),(4,4498,'2026-04-21 11:58:27.694519','ayushpalariya96@gmail.com','Ayush palariya','pay_Sg2mdbubpYWa1f','0000000000','Confirmed','order_Sg2mWyti6WX7bP'),(5,35000,'2026-04-21 12:01:56.102972','ayushpalariya96@gmail.com','Ayush palariya',NULL,'0000000000','Created','order_Sg2qCTv97tygQc'),(6,2499,'2026-04-21 12:02:32.317503','ayushpalariya96@gmail.com','Ayush palariya','pay_Sg2qwq0fBeiqnC','0000000000','Confirmed','order_Sg2qq0bR1iRIt0'),(7,8499,'2026-04-21 12:30:30.549455','guptaitsdivyanshu@gmail.com','Divyanshu Neda',NULL,'8103780640','Created','order_Sg3KNrolwAVAq9'),(8,8499,'2026-04-21 12:31:32.359652','guptaitsdivyanshu@gmail.com','Divyanshu Neda','pay_Sg3Lc9sb3w4JSb','8103780640','Confirmed','order_Sg3LTMQOKtpMq4'),(9,8996,'2026-04-21 12:42:07.525703','guptaitsdivyanshu@gmail.com','Divyanshu Neda','pay_Sg3WkFGPgu9hsM','8103780640','Confirmed','order_Sg3WefPlB25bR7'),(10,5498,'2026-04-21 12:44:44.379148','hemlatapalariya4@gmail.com','Hemlata Palariya2',NULL,'6263909768','Created','order_Sg3ZPtCpyOhv7K'),(11,8997,'2026-04-21 13:20:38.693193','hemlatapalariya4@gmail.com','Hemlata Palariya2','pay_Sg4BU4hqWoItAk','6263909768','Confirmed','order_Sg4BLQI2Bfnq9p'),(12,51997,'2026-04-21 15:43:31.670303','ayushpalariya96@gmail.com','Ayush palariya',NULL,'0000000000','Created','order_Sg6cGQTdg328g4'),(13,51997,'2026-04-21 17:50:38.298591','ayushpalariya96@gmail.com','Ayush palariya',NULL,'0000000000','Created','order_Sg8mXHXIuan6cf'),(14,51997,'2026-04-21 17:51:51.236078','ayushpalariya96@gmail.com','Ayush palariya',NULL,'0000000000','Created','order_Sg8nowqIhxJZ1H'),(15,48498,'2026-04-22 01:56:01.876671','ayushpalariya96@gmail.com','Ayush palariya',NULL,'0000000000','Created','order_SgH3HDAXM6bLBP');
/*!40000 ALTER TABLE `payment_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Electronics','High-performance laptop for gaming and work','https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_1280.jpg','Laptop',5000),(2,'Electronics','Lightweight and powerful MacBook with Retina Display','https://cdn.pixabay.com/photo/2016/11/29/05/08/apple-1867461_1280.jpg','Apple MacBook',15000),(3,'Electronics','Wireless noise-cancelling headphones','https://cdn.pixabay.com/photo/2018/10/04/05/38/headphone-3722950_1280.jpg','Headphones',5000),(4,'Clothing','Cotton casual shirts for men','https://cdn.pixabay.com/photo/2014/08/26/21/49/shirts-428618_640.jpg','Men Shirts',1999),(5,'Clothing','Trendy women outfits for all seasons','https://cdn.pixabay.com/photo/2017/01/14/10/03/fashion-1979136_640.jpg','Women Fashion',2499),(6,'Clothing','Soft and comfortable baby shoes','https://cdn.pixabay.com/photo/2017/09/13/18/06/babys-bootees-2746390_640.jpg','Baby Shoes',999),(7,'Gadgets','High-quality audio headset for music production','https://cdn.pixabay.com/photo/2022/06/21/21/15/audio-7276511_640.jpg','Studio Headset',1999),(8,'Gadgets','Professional DSLR camera with high-quality lens','https://cdn.pixabay.com/photo/2023/11/14/15/46/nikon-8388022_640.jpg','Nikon Camera',44999),(9,'Gadgets','Compact and stylish wireless earphones','https://cdn.pixabay.com/photo/2020/09/24/14/51/earphones-5598952_640.jpg','Wireless Earphones',3499),(12,'Clothing','its more comfortable','https://media.istockphoto.com/id/173239968/photo/skinny-tight-blue-jeans-on-white-background.jpg?s=612x612&w=0&k=20&c=HsI-xC12KkzjeCaFC4eQ33SZuL53EerbfLMkPuLpaVw=','Men jeans',15000);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ashwani@gmail.com','Ashwani','123',NULL),(2,'aman@gmail.com','aman','456',NULL),(3,'ayushpalariya96@gmail.com','Ayush palariya','Ayush@2003',NULL),(4,'ayush@gmail.com','Ashish','Ashish45',NULL),(5,'aman@gmail.com',NULL,'456',NULL),(6,'ayushnath003@gmail.com','Ayush Nath','AyushNath',NULL),(7,'guptadivyanshu@gmail.com','Divyanshu Gupta','Divyanshu123',NULL),(8,'xyz@gmail.com','Piyush','12345678',NULL),(9,'sejalG@gmail.com','Sejal Toriya','SejalHagdu',NULL),(10,'guptaitsdivyanshu@gmail.com','Divyanshu Neda','Divyanshu','8103780640'),(11,'hemlatapalariya4@gmail.com','Hemlata Palariya2','Hemlata','6263909768');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-23 20:34:51
