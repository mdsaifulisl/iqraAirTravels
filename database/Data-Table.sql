-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: travel_agency_db
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `abouts`
--

DROP TABLE IF EXISTS `abouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abouts` (
  `id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `experience` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abouts`
--

LOCK TABLES `abouts` WRITE;
/*!40000 ALTER TABLE `abouts` DISABLE KEYS */;
INSERT INTO `abouts` VALUES ('5d0ad454-8d71-4ba1-8dd4-771685eaf5ab','What is Lorem Ipsum?','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popul00arised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop ssa publishing software like Aldus PageMaker including versisdodsns of Lorem Ipsum.\r\n\r\n','12+','/uploads/About_Image/image-1784913743079-557259012.jpg','2026-04-24 06:28:01','2026-07-24 17:22:23');
/*!40000 ALTER TABLE `abouts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `air_tickets`
--

DROP TABLE IF EXISTS `air_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `air_tickets` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `from` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `to` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `airline` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trip_type` enum('Round Trip','One Way','Multi-City') COLLATE utf8mb4_unicode_ci DEFAULT 'One Way',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `air_tickets`
--

LOCK TABLES `air_tickets` WRITE;
/*!40000 ALTER TABLE `air_tickets` DISABLE KEYS */;
INSERT INTO `air_tickets` VALUES ('a749250b-8e61-4b0d-a428-93f5f81778bf','dhaka','Araihazer','Dhaka','2000','Round Trip','/uploads/AirTicket_Image/image-1776845883050-711685224.jpg','fffdf','2026-04-22 07:24:28','2026-04-22 08:18:03');
/*!40000 ALTER TABLE `air_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(100) NOT NULL,
  `date` varchar(50) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `content` text NOT NULL,
  `images` json DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES ('d72d2fd8-e007-4b2b-850b-ea9a40e96f4e','asdda','Osman','24/07/2026','Visa Guide','<p>sdfdsa</p>','[\"/uploads/Blog_Images/images-1784908011015-823763526.jpg\", \"/uploads/Blog_Images/images-1784908011015-704435505.jpg\"]','2026-07-24 15:46:51','2026-07-24 15:46:51');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_documents`
--

DROP TABLE IF EXISTS `booking_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_documents` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bookingId` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `filePath` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'Document',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_bookingId` (`bookingId`),
  CONSTRAINT `fk_booking_documents_booking` FOREIGN KEY (`bookingId`) REFERENCES `bookings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_documents`
--

LOCK TABLES `booking_documents` WRITE;
/*!40000 ALTER TABLE `booking_documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bookingType` enum('tour','hajj') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'tour',
  `itemId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `specialRequest` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('Pending','Confirmed','Cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'Pending',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` char(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `message` text NOT NULL,
  `status` enum('unread','read','replied') DEFAULT 'unread',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destinations`
--

DROP TABLE IF EXISTS `destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinations` (
  `id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `price` varchar(50) NOT NULL,
  `rating` float DEFAULT '0',
  `duration` varchar(100) NOT NULL,
  `description` text,
  `images` json DEFAULT NULL,
  `highlights` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinations`
--

LOCK TABLES `destinations` WRITE;
/*!40000 ALTER TABLE `destinations` DISABLE KEYS */;
INSERT INTO `destinations` VALUES ('a97b8424-1ddf-4dcd-87ac-91696198d69e','adsdsaf','dafsdfa','sdfadsfa',5,'sdfadfsa','<p>fdaafds</p>','[\"/uploads/Destination_Image/images-1784908163370-83030278.jpg\", \"/uploads/Destination_Image/images-1784908163370-855358778.jpg\"]','[\"dsdfs\"]','2026-07-24 15:49:23','2026-07-24 15:49:23');
/*!40000 ALTER TABLE `destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs`
--

DROP TABLE IF EXISTS `faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faqs` (
  `id` char(36) NOT NULL,
  `question` varchar(500) NOT NULL,
  `answer` text NOT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs`
--

LOCK TABLES `faqs` WRITE;
/*!40000 ALTER TABLE `faqs` DISABLE KEYS */;
INSERT INTO `faqs` VALUES ('0045079d-7875-46f4-b3dc-e0a4636cb6ab','What is Lorem Ipsum?','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\n','Active','2026-04-23 14:19:58','2026-04-23 14:19:58'),('5b5f6196-ad09-4292-b16e-f0051e916118','adsfdsadas','saiful','Active','2026-07-24 17:03:34','2026-07-24 17:03:34'),('675b0bd4-c661-4fbd-add6-1617510b01c8','Why do we use it?','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n\n','Active','2026-04-23 14:20:32','2026-04-23 15:42:24'),('e3947268-2119-4a24-8cb7-96752521c1b6','gffgfda','dsadsfafsda','Active','2026-07-24 17:03:21','2026-07-24 17:03:21');
/*!40000 ALTER TABLE `faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` char(36) NOT NULL,
  `siteName` varchar(255) DEFAULT 'Travel Admin',
  `footerText` varchar(255) DEFAULT NULL,
  `maintenanceMode` tinyint(1) DEFAULT '0',
  `siteLogo` varchar(255) DEFAULT NULL,
  `siteEmail` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` text,
  `facebook` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `whatsapp` varchar(255) DEFAULT NULL,
  `metaTitle` varchar(255) DEFAULT NULL,
  `metaDescription` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `siteFavicon` varchar(255) DEFAULT NULL,
  `affiliateLink` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES ('36467b08-193a-4f1c-bf95-8d0520a2dfa3','Travel Admin by Saiful','dhaka, bangla desh,saiful',1,'/uploads/Site_Settings/siteLogo-1784909193639-364461096.jpg','sai@gmail.com','0174189909','afsdasdf','https://www.facebook.com/','instagram.com','linkedin.com','017418990950','nullhff','We are dedicated to making your travel dreams come true. Explore the world with our premium and affordable tour packages tailored just for you. by saiful','2026-04-24 14:41:36','2026-07-24 16:06:33','/uploads/Site_Settings/siteFavicon-1782537185215-239468241.png','https://www.trip.com/flights/Kuala%20Lumpur-to-Dhaka/tickets-KUL-DAC?flighttype=S&dcity=KUL&acity=DAC&Allianceid=7899074&SID=296372406&trip_sub1=&trip_sub3=D18363431&linkhub_token=sl_uO9kVSJTKV2');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sliders`
--

DROP TABLE IF EXISTS `sliders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sliders` (
  `id` char(36) NOT NULL,
  `headline` varchar(255) NOT NULL,
  `subtext` text NOT NULL,
  `btn1` varchar(50) DEFAULT 'Explore Now',
  `btn2` varchar(50) DEFAULT 'Learn More',
  `link` varchar(255) DEFAULT '/hajj&umrah',
  `image` varchar(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sliders`
--

LOCK TABLES `sliders` WRITE;
/*!40000 ALTER TABLE `sliders` DISABLE KEYS */;
INSERT INTO `sliders` VALUES ('4a26f633-5c63-4693-a5b3-bed265c86eea','আমার সোনার বাং','simply dummy text of the printing and typesetting industry. Lorem Ipsum has be','Explore Nowsdadsaf','Learn More dfsa','/air-tickets','/uploads/Slider_Image/image-1782533408371-19013482.jpg',1,'2026-06-26 09:30:18','2026-07-28 04:43:47');
/*!40000 ALTER TABLE `sliders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tours`
--

DROP TABLE IF EXISTS `tours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tours` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `groupSize` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` float DEFAULT '0',
  `reviews` int DEFAULT '0',
  `category` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `images` json DEFAULT NULL,
  `highlights` json DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tours`
--

LOCK TABLES `tours` WRITE;
/*!40000 ALTER TABLE `tours` DISABLE KEYS */;
INSERT INTO `tours` VALUES ('f81aa2af-6ed9-4ee7-9a1b-34b04e78808c','hjjh','Dhaka','7 Days, 6 Nights','15 People','10',0,0,'Adventure','[\"/uploads/Tour_Image/images-1784910078890-509131698.png\"]','[]','<p>ghfhh</p>','2026-07-24 16:21:18','2026-07-24 16:21:18');
/*!40000 ALTER TABLE `tours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'ইউজারের ইউনিক আইডি (UUIDv4)',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ইউজারের সম্পূর্ণ নাম',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ইউনিক লগইন ইমেইল এড্রেস',
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'যোগাযোগের মোবাইল নাম্বার',
  `role` enum('Super Admin','Moderator','Editor') COLLATE utf8mb4_unicode_ci DEFAULT 'Moderator' COMMENT 'অ্যাডমিন প্যানেল এক্সেস লেভেল',
  `status` enum('Active','Inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'Active' COMMENT 'অ্যাকাউন্ট স্ট্যাটাস কন্ট্রোল',
  `bio` text COLLATE utf8mb4_unicode_ci COMMENT 'ইউজারের সংক্ষিপ্ত পরিচিতি বা বায়ো',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'হ্যাশ করা সিকিউর পাসওয়ার্ড',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'প্রোফাইল পিকচারের ফাইল পাথ বা ইউআরএল',
  `otpCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'পাসওয়ার্ড রিসেটের জন্য পাঠানো ওটিপি কোড',
  `otpExpires` datetime DEFAULT NULL COMMENT 'ওটিপি কোডের মেয়াদ শেষ হওয়ার সময়',
  `createdAt` datetime NOT NULL COMMENT 'অ্যাকাউন্ট তৈরির সময়',
  `updatedAt` datetime NOT NULL COMMENT 'সর্বশেষ তথ্য পরিবর্তনের সময়',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='AFS Travel টিম মেম্বার এবং অ্যাডমিন ম্যানেজমেন্ট টেবিল';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('57d11b7f-e399-455a-8f9e-06ec27062296','Super Admin','admin@agency.com','','Super Admin','Active','','$2b$10$UcJKoVc1OJuN/as8AmndFuhUjQet0yygqHMJiOVPlSCBOKn2ZsRPq',NULL,NULL,NULL,'2026-07-24 14:11:35','2026-07-26 17:39:36'),('b42e46d5-4288-4032-b578-aaf82284aa2c','ds','saiful30204050@gmail.com','01741899095','Super Admin','Active','dfsadfsa','$2b$10$gMoQc97gVsmMO.03zFfRIO2XwM6JkQjKnTHTQw.CJPE8OFoPO.pYO','/uploads/User_Image/image-1784908818199-980764226.jpg',NULL,NULL,'2026-07-24 16:00:18','2026-07-26 18:11:27');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visas`
--

DROP TABLE IF EXISTS `visas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visas` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fee` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duration` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `validity` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `entry` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `continent` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `images` json DEFAULT NULL,
  `requirements` json DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visas`
--

LOCK TABLES `visas` WRITE;
/*!40000 ALTER TABLE `visas` DISABLE KEYS */;
INSERT INTO `visas` VALUES ('54bbc8d7-a726-4f0b-ad16-49c836319d6b','fsddf','afsdsadf','Tourist Sticker Visa','5,500 BDT','7 Days, 6 Nights','90 Days','Single Entry','Europe','[\"/uploads/Visa_Image/images-1784910526139-863821627.jpg\"]','[\"sdfa\"]','<p>উপন্যাস&nbsp;উপনয়&nbsp;বা&nbsp;উপন্যস্ত&nbsp;শব্দ&nbsp;থেকে&nbsp;‘উপন্যাস’&nbsp;শব্দের&nbsp;উৎপত্তি,&nbsp;যা&nbsp;</p><p></p><p>ইংরেজি&nbsp;Novel&nbsp;শব্দের&nbsp;পরিভাষারূপে&nbsp;গৃহীত।&nbsp;সাধারণ&nbsp;অর্থে&nbsp;উপন্যাস&nbsp;বলতে&nbsp;<strong>গদ্যে&nbsp;লিখিত&nbsp;দীর্ঘ&nbsp;উপস্থাপনা</strong>কে&nbsp;</p><p>বোঝায়।&nbsp;ছোটগল্পের&nbsp;তুলনায়&nbsp;উপন্যাসের&nbsp;বিস্তৃতি&nbsp;বেশি।&nbsp;উপন্যাস&nbsp;রচনায়&nbsp;ব্যক্তিচেতনা&nbsp;ও&nbsp;সমাজচেতনা&nbsp;অপরিহার্য।&nbsp;একটি&nbsp;সার্থক&nbsp;উপন্যাসে&nbsp;কাহিনী,&nbsp;ঘটনা,&nbsp;চরিত্র,&nbsp;</p><p></p><p></p><p>বর্ণনাভঙ্গি,&nbsp;রস,&nbsp;সংলাপ,&nbsp;ভাষা&nbsp;ইত্যাদির&nbsp;মাধ্যমে&nbsp;মূলত&nbsp;লেখকের&nbsp;জীবনদর্শন&nbsp;ও&nbsp;জীবনানুভূতিই&nbsp;প্রকাশ&nbsp;পায়।&nbsp;উপন্যাসের&nbsp;বিস্তৃত&nbsp;পটভূমিতে&nbsp;সমগ্র&nbsp;মানবজীবন&nbsp;ও&nbsp;সমাজের&nbsp;প্রতিচ্ছবি&nbsp;ফুটে&nbsp;ওঠে।</p><p></p><p></p><p></p><p></p><p></p><ul><li>উপন্যাস&nbsp;উপনয়&nbsp;বা&nbsp;উপন্যস্ত&nbsp;শব্দ&nbsp;থেকে&nbsp;‘উপন্যাস’&nbsp;শব্দের&nbsp;উৎপত্তি,&nbsp;যা&nbsp;</li><li>উপন্যাস&nbsp;উপনয়&nbsp;বা&nbsp;উপন্যস্ত&nbsp;শব্দ&nbsp;থেকে&nbsp;‘উপন্যাস’&nbsp;শব্দের&nbsp;উৎপত্তি,&nbsp;যা&nbsp;</li><li>উপন্যাস&nbsp;উপনয়&nbsp;বা&nbsp;উপন্যস্ত&nbsp;শব্দ&nbsp;থেকে&nbsp;‘উপন্যাস’&nbsp;শব্দের&nbsp;উৎপত্তি,&nbsp;যা&nbsp;</li></ul>','2026-07-24 16:28:46','2026-07-25 06:12:14');
/*!40000 ALTER TABLE `visas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-28 10:50:03
