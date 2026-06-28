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
INSERT INTO `abouts` VALUES ('5d0ad454-8d71-4ba1-8dd4-771685eaf5ab','What is Lorem Ipsum?','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popul00arised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop ssa publishing software like Aldus PageMaker including versisdodsns of Lorem Ipsum.\r\n\r\n','12+','/uploads/About_Image/image-1777065054968-954561422.jpg','2026-04-24 06:28:01','2026-04-24 21:10:54');
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
  `airline` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trip_type` enum('Round Trip','One Way','Multi-City') COLLATE utf8mb4_unicode_ci DEFAULT 'Round Trip',
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
INSERT INTO `blogs` VALUES ('b416b889-c075-47d0-942e-9641da6e832f','dsfsadasd','Md. Saiful Islam','22/04/2026','Travel Tips','<h2>What&nbsp;is&nbsp;Lorem&nbsp;Ipsum?</h2>','[\"/uploads/Blog_Images/images-1776861764188-909485233.jpg\"]','2026-04-22 12:42:32','2026-04-29 17:20:18');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
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
INSERT INTO `contacts` VALUES ('60e1522a-97d5-4eca-940d-56669a12bb9b','Md. Saiful Islam','saiful01741899@gmail.com','+880 1741-899XXX','trtt','unread','2026-04-28 15:23:30','2026-04-28 15:23:30'),('86e02c4f-09d3-4439-8bd3-a5ecf8fb277a','Md. Saiful Islam','N/A','0147896532','fgsfsfsfg','unread','2026-04-28 15:24:10','2026-04-28 15:24:10');
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
INSERT INTO `destinations` VALUES ('e7c09595-6a6e-4487-8567-80ce4d1b0cf8','Why do we use it?','italy','1000',5,'8 days','<h2>What&nbsp;is&nbsp;Lorem&nbsp;Ipsum?</h2><p><strong>Lorem&nbsp;Ipsum</strong>&nbsp;is&nbsp;simply&nbsp;dummy&nbsp;text&nbsp;of&nbsp;the&nbsp;printing&nbsp;and&nbsp;typesetting&nbsp;industry.&nbsp;Lorem&nbsp;Ipsum&nbsp;has&nbsp;been&nbsp;the&nbsp;industry&#39;s&nbsp;standard&nbsp;dummy&nbsp;text&nbsp;ever&nbsp;since&nbsp;the&nbsp;1500s,&nbsp;when&nbsp;an&nbsp;unknown&nbsp;printer&nbsp;took&nbsp;a&nbsp;galley&nbsp;of&nbsp;type&nbsp;and&nbsp;scrambled&nbsp;it&nbsp;to&nbsp;make&nbsp;a&nbsp;type&nbsp;specimen&nbsp;book.&nbsp;It&nbsp;has&nbsp;survived&nbsp;not&nbsp;only&nbsp;five&nbsp;centuries,&nbsp;but&nbsp;also&nbsp;the&nbsp;leap&nbsp;into&nbsp;electronic&nbsp;typesetting,&nbsp;remaining&nbsp;essentially&nbsp;unchanged.&nbsp;It&nbsp;was&nbsp;popularised&nbsp;in&nbsp;the&nbsp;1960s&nbsp;with&nbsp;the&nbsp;release&nbsp;of&nbsp;Letraset&nbsp;sheets&nbsp;containing&nbsp;Lorem&nbsp;Ipsum&nbsp;passages,&nbsp;and&nbsp;more&nbsp;recently&nbsp;with&nbsp;desktop&nbsp;publishing&nbsp;software&nbsp;like&nbsp;Aldus&nbsp;PageMaker&nbsp;including&nbsp;versions&nbsp;of&nbsp;Lorem&nbsp;Ipsum.</p><h2>Why&nbsp;do&nbsp;we&nbsp;use&nbsp;it?</h2><p>It&nbsp;is&nbsp;a&nbsp;long&nbsp;established&nbsp;fact&nbsp;that&nbsp;a&nbsp;reader&nbsp;will&nbsp;be&nbsp;distracted&nbsp;by&nbsp;the&nbsp;readable&nbsp;content&nbsp;of&nbsp;a&nbsp;page&nbsp;when&nbsp;looking&nbsp;at&nbsp;its&nbsp;layout.&nbsp;The&nbsp;point&nbsp;of&nbsp;using&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;that&nbsp;it&nbsp;has&nbsp;a&nbsp;more-or-less&nbsp;normal&nbsp;distribution&nbsp;of&nbsp;letters,&nbsp;as&nbsp;opposed&nbsp;to&nbsp;using&nbsp;&#39;Content&nbsp;here,&nbsp;content&nbsp;here&#39;,&nbsp;making&nbsp;it&nbsp;look&nbsp;like&nbsp;readable&nbsp;English.&nbsp;Many&nbsp;desktop&nbsp;publishing&nbsp;packages&nbsp;and&nbsp;web&nbsp;page&nbsp;editors&nbsp;now&nbsp;use&nbsp;Lorem&nbsp;Ipsum&nbsp;as&nbsp;their&nbsp;default&nbsp;model&nbsp;text,&nbsp;and&nbsp;a&nbsp;search&nbsp;for&nbsp;&#39;lorem&nbsp;ipsum&#39;&nbsp;will&nbsp;uncover&nbsp;many&nbsp;web&nbsp;sites&nbsp;still&nbsp;in&nbsp;their&nbsp;infancy.&nbsp;Various&nbsp;versions&nbsp;have&nbsp;evolved&nbsp;over&nbsp;the&nbsp;years,&nbsp;sometimes&nbsp;by&nbsp;accident,&nbsp;sometimes&nbsp;on&nbsp;purpose&nbsp;(injected&nbsp;humour&nbsp;and&nbsp;the&nbsp;like).</p><p></p><h2>Where&nbsp;does&nbsp;it&nbsp;come&nbsp;from?</h2><p>Contrary&nbsp;to&nbsp;popular&nbsp;belief,&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;not&nbsp;simply&nbsp;random&nbsp;text.&nbsp;It&nbsp;has&nbsp;roots&nbsp;in&nbsp;a&nbsp;piece&nbsp;of&nbsp;classical&nbsp;Latin&nbsp;literature&nbsp;from&nbsp;45&nbsp;BC,&nbsp;making&nbsp;it&nbsp;over&nbsp;2000&nbsp;years&nbsp;old.&nbsp;Richard&nbsp;McClintock,&nbsp;a&nbsp;Latin&nbsp;professor&nbsp;at&nbsp;Hampden-Sydney&nbsp;College&nbsp;in&nbsp;Virginia,&nbsp;looked&nbsp;up&nbsp;one&nbsp;of&nbsp;the&nbsp;more&nbsp;obscure&nbsp;Latin&nbsp;words,&nbsp;consectetur,&nbsp;from&nbsp;a&nbsp;Lorem&nbsp;Ipsum&nbsp;passage,&nbsp;and&nbsp;going&nbsp;through&nbsp;the&nbsp;cites&nbsp;of&nbsp;the&nbsp;word&nbsp;in&nbsp;classical&nbsp;literature,&nbsp;discovered&nbsp;the&nbsp;undoubtable&nbsp;source.&nbsp;Lorem&nbsp;Ipsum&nbsp;comes&nbsp;from&nbsp;sections&nbsp;1.10.32&nbsp;and&nbsp;1.10.33&nbsp;of&nbsp;&quot;de&nbsp;Finibus&nbsp;Bonorum&nbsp;et&nbsp;Malorum&quot;&nbsp;(The&nbsp;Extremes&nbsp;of&nbsp;Good&nbsp;and&nbsp;Evil)&nbsp;by&nbsp;Cicero,&nbsp;written&nbsp;in&nbsp;45&nbsp;BC.&nbsp;This&nbsp;book&nbsp;is&nbsp;a&nbsp;treatise&nbsp;on&nbsp;the&nbsp;theory&nbsp;of&nbsp;ethics,&nbsp;very&nbsp;popular&nbsp;during&nbsp;the&nbsp;Renaissance.&nbsp;The&nbsp;first&nbsp;line&nbsp;of&nbsp;Lorem&nbsp;Ipsum,&nbsp;&quot;Lorem&nbsp;ipsum&nbsp;dolor&nbsp;sit&nbsp;amet..&quot;,&nbsp;comes&nbsp;from&nbsp;a&nbsp;line&nbsp;in&nbsp;section&nbsp;1.10.32.</p><p>The&nbsp;standard&nbsp;chunk&nbsp;of&nbsp;Lorem&nbsp;Ipsum&nbsp;used&nbsp;since&nbsp;the&nbsp;1500s&nbsp;is&nbsp;reproduced&nbsp;below&nbsp;for&nbsp;those&nbsp;interested.&nbsp;Sections&nbsp;1.10.32&nbsp;and&nbsp;1.10.33&nbsp;from&nbsp;&quot;de&nbsp;Finibus&nbsp;Bonorum&nbsp;et&nbsp;Malorum&quot;&nbsp;by&nbsp;Cicero&nbsp;are&nbsp;also&nbsp;reproduced&nbsp;in&nbsp;their&nbsp;exact&nbsp;original&nbsp;form,&nbsp;accompanied&nbsp;by&nbsp;English&nbsp;versions&nbsp;from&nbsp;the&nbsp;1914&nbsp;translation&nbsp;by&nbsp;H.&nbsp;Rackham.</p><h2>Where&nbsp;can&nbsp;I&nbsp;get&nbsp;some?</h2><p>There&nbsp;are&nbsp;many&nbsp;variations&nbsp;of&nbsp;passages&nbsp;of&nbsp;Lorem&nbsp;Ipsum&nbsp;available,&nbsp;but&nbsp;the&nbsp;majority&nbsp;have&nbsp;suffered&nbsp;alteration&nbsp;in&nbsp;some&nbsp;form,&nbsp;by&nbsp;injected&nbsp;humour,&nbsp;or&nbsp;randomised&nbsp;words&nbsp;which&nbsp;don&#39;t&nbsp;look&nbsp;even&nbsp;slightly&nbsp;believable.&nbsp;If&nbsp;you&nbsp;are&nbsp;going&nbsp;to&nbsp;use&nbsp;a&nbsp;passage&nbsp;of&nbsp;Lorem&nbsp;Ipsum,&nbsp;you&nbsp;need&nbsp;to&nbsp;be&nbsp;sure&nbsp;there&nbsp;isn&#39;t&nbsp;anything&nbsp;embarrassing&nbsp;hidden&nbsp;in&nbsp;the&nbsp;middle&nbsp;of&nbsp;text.&nbsp;All&nbsp;the&nbsp;Lorem&nbsp;Ipsum&nbsp;generators&nbsp;on&nbsp;the&nbsp;Internet&nbsp;tend&nbsp;to&nbsp;repeat&nbsp;predefined&nbsp;chunks&nbsp;as&nbsp;necessary,&nbsp;making&nbsp;this&nbsp;the&nbsp;first&nbsp;true&nbsp;generator&nbsp;on&nbsp;the&nbsp;Internet.&nbsp;It&nbsp;uses&nbsp;a&nbsp;dictionary&nbsp;of&nbsp;over&nbsp;200&nbsp;Latin&nbsp;words,&nbsp;combined&nbsp;with&nbsp;a&nbsp;handful&nbsp;of&nbsp;model&nbsp;sentence&nbsp;structures,&nbsp;to&nbsp;generate&nbsp;Lorem&nbsp;Ipsum&nbsp;which&nbsp;looks&nbsp;reasonable.&nbsp;The&nbsp;generated&nbsp;Lorem&nbsp;Ipsum&nbsp;is&nbsp;therefore&nbsp;always&nbsp;free&nbsp;from&nbsp;repetition,&nbsp;injected&nbsp;humour,&nbsp;or&nbsp;non-characteristic&nbsp;words&nbsp;etc.</p>','[\"/uploads/Destination_Image/images-1776778322523-494696641.jpg\", \"/uploads/Destination_Image/images-1776778322653-105281067.jpg\"]','[\"abc\", \"dfg\"]','2026-04-21 13:32:02','2026-04-21 13:32:02');
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
INSERT INTO `faqs` VALUES ('0045079d-7875-46f4-b3dc-e0a4636cb6ab','What is Lorem Ipsum?','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\n','Active','2026-04-23 14:19:58','2026-04-23 14:19:58'),('675b0bd4-c661-4fbd-add6-1617510b01c8','Why do we use it?','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n\n','Active','2026-04-23 14:20:32','2026-04-23 15:42:24');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES ('36467b08-193a-4f1c-bf95-8d0520a2dfa3','Travel Admin by Saiful','dhaka, bangla desh,saiful',0,'/uploads/Site_Settings/siteLogo-1777325305985-594991344.png','sai@gmail.com','0174189909500','afsdasdf','https://www.facebook.com/','instagram.com','linkedin.com','017418990950','nullhff','We are dedicated to making your travel dreams come true. Explore the world with our premium and affordable tour packages tailored just for you. by saiful','2026-04-24 14:41:36','2026-04-29 15:56:33','/uploads/Site_Settings/siteFavicon-1777473639421-781597646.png');
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
  `link` varchar(255) DEFAULT '/destinations',
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
INSERT INTO `sliders` VALUES ('27867a64-1b6a-475d-bbe0-9620a3279f80','rtregf','cxvvxcvc','Explore Nowfdfdfd','Learn More','/destinations','/uploads/Slider_Image/image-1777410984238-504282353.png',1,'2026-04-28 21:16:24','2026-04-28 21:16:24');
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
INSERT INTO `tours` VALUES ('e56a361d-b43e-40b5-b6ca-bb522518acdc','afd','asdf','sad','xsa','10',0,0,'City Tour','[\"/uploads/Tour_Image/images-1776527053758-526943259.jpg\", \"/uploads/Tour_Image/images-1776527053760-211468980.png\"]','[\"no\"]','<p>asdf</p>','2026-04-18 15:44:13','2026-04-18 15:44:13');
/*!40000 ALTER TABLE `tours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('Super Admin','Moderator','Editor') DEFAULT 'Moderator',
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `bio` text,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('36a559f8-a912-449e-8b29-d141faf13323','ddsf','ab@gmail.com','','Moderator','Active','','$2b$10$a9JRjIvYV4znCqoycLbWjusTMVnWCS.PlmpM8x09aCixRF3oXlTQa',NULL,'2026-04-29 16:33:33','2026-04-29 16:33:33'),('5','Super Admin','admin@agency.com',NULL,'Super Admin','Active',NULL,'$2b$10$Am5qkcIsoChyfXewND2noOPhLqFNNQeGhXkxvqU51e5rCHzTqumZi',NULL,'2026-04-28 21:43:18','2026-04-29 16:51:18'),('6','saiful','saiful30204050@gmail.com','01741899095','Super Admin','Active','No bio 02','$2b$10$fw1DlQWwBEgxRnBcE3gK4.JGYiNx0mAkvaI401iaLEf/z43mpIg.S','/uploads/User_Image/image-1777479244178-537369015.png','2026-04-28 21:44:45','2026-04-29 16:48:52'),('db3d6b2b-99a5-465b-bcd0-227c412b1cf3','sssgbnv','abc@gmail.com','01741899095','Moderator','Active','fddfdfdf','$2b$10$qXIIBDg7sjX68wkmrYZNwuUhnpzQh1jycnJYTNIdxRhODlRLEJKNC','/uploads/User_Image/image-1777479348064-650099642.jpg','2026-04-29 16:01:08','2026-04-29 16:16:23');
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
INSERT INTO `visas` VALUES ('65dff526-d06a-40e1-8aaf-e6d6bdfddd3c','What is Lorem Ipsum?','chaina','Tourist Sticker Visa','5,500 BDT','7 Days, 6 Nights','90 Days','Single Entry','Asia','[\"/uploads/Visa_Image/images-1776786138176-87671554.jpg\", \"/uploads/Visa_Image/images-1776786138176-782044819.jpg\"]','[\"dsa\"]','<p>sdafdsa</p>','2026-04-21 15:42:18','2026-04-29 17:19:36'),('8ac866b4-1d7d-4e16-9870-8c00dc1071ed','dsfadafs','dds','Tourist Sticker Visa','5,500 BDT','7 Days, 6 Nights','90 Days','Single Entry','Europe','[\"/uploads/Visa_Image/images-1776786095361-936157836.jpg\", \"/uploads/Visa_Image/images-1776786095361-709733611.jpg\"]','[\"dasfda\", \"sdafasdfads\"]','<p></p><h2>What&nbsp;is&nbsp;Lorem&nbsp;Ipsum?</h2><p><strong>Lorem&nbsp;Ipsum</strong>&nbsp;is&nbsp;simply&nbsp;dummy&nbsp;text&nbsp;of&nbsp;the&nbsp;printing&nbsp;and&nbsp;typesetting&nbsp;industry.&nbsp;Lorem&nbsp;Ipsum&nbsp;has&nbsp;been&nbsp;the&nbsp;industry&#39;s&nbsp;standard&nbsp;dummy&nbsp;text&nbsp;ever&nbsp;since&nbsp;the&nbsp;1500s,&nbsp;when&nbsp;an&nbsp;unknown&nbsp;printer&nbsp;took&nbsp;a&nbsp;galley&nbsp;of&nbsp;type&nbsp;and&nbsp;scrambled&nbsp;it&nbsp;to&nbsp;make&nbsp;a&nbsp;type&nbsp;specimen&nbsp;book.&nbsp;It&nbsp;has&nbsp;survived&nbsp;not&nbsp;only&nbsp;five&nbsp;centuries,&nbsp;but&nbsp;also&nbsp;the&nbsp;leap&nbsp;into&nbsp;electronic&nbsp;typesetting,&nbsp;remaining&nbsp;essentially&nbsp;unchanged.&nbsp;It&nbsp;was&nbsp;popularised&nbsp;in&nbsp;the&nbsp;1960s&nbsp;with&nbsp;the&nbsp;release&nbsp;of&nbsp;Letraset&nbsp;sheets&nbsp;containing&nbsp;Lorem&nbsp;Ipsum&nbsp;passages,&nbsp;and&nbsp;more&nbsp;recently&nbsp;with&nbsp;desktop&nbsp;publishing&nbsp;software&nbsp;like&nbsp;Aldus&nbsp;PageMaker&nbsp;including&nbsp;versions&nbsp;of&nbsp;Lorem&nbsp;Ipsum.</p><h2></h2>','2026-04-21 15:39:43','2026-04-29 17:19:45'),('8cb1e2ca-55e9-4095-a6ac-4b5c9ce881a3','fdssdfadsf','fdsafdsa','Tourist Sticker Visa','5,500 BDT','7 Days, 6 Nights','90 Days','Single Entry','South America','[\"/uploads/Visa_Image/images-1777063148766-895119043.jpg\", \"/uploads/Visa_Image/images-1777063148808-74447541.jpg\", \"/uploads/Visa_Image/images-1777063148819-216750831.jpg\", \"/uploads/Visa_Image/images-1777063148826-684146469.jpg\"]','[\"dffd\", \"dsfasdfa\"]','<p>Lorem&nbsp;ipsum&nbsp;dolor&nbsp;sit&nbsp;amet,&nbsp;consectetur&nbsp;adipiscing&nbsp;elit,&nbsp;sed&nbsp;do&nbsp;eiusmod&nbsp;tempor&nbsp;incididunt&nbsp;ut&nbsp;labore&nbsp;et&nbsp;dolore&nbsp;magna&nbsp;aliqua.&nbsp;Ut&nbsp;enim&nbsp;ad&nbsp;minim&nbsp;veniam,&nbsp;quis&nbsp;nostrud&nbsp;exercitation&nbsp;ullamco&nbsp;laboris&nbsp;nisi&nbsp;ut&nbsp;aliquip&nbsp;ex&nbsp;ea&nbsp;commodo&nbsp;consequat.&nbsp;Duis&nbsp;aute&nbsp;irure&nbsp;dolor&nbsp;in&nbsp;reprehenderit&nbsp;in&nbsp;voluptate&nbsp;velit&nbsp;esse&nbsp;cillum&nbsp;dolore&nbsp;eu&nbsp;fugiat&nbsp;nulla&nbsp;pariatur.&nbsp;Excepteur&nbsp;sint&nbsp;occaecat&nbsp;cupidatat&nbsp;non&nbsp;proident,&nbsp;sunt&nbsp;in&nbsp;culpa&nbsp;qui&nbsp;officia&nbsp;deserunt&nbsp;mollit&nbsp;anim&nbsp;id&nbsp;est&nbsp;laborum.</p><p></p><p>Lorem&nbsp;ipsum&nbsp;dolor&nbsp;sit&nbsp;amet,&nbsp;consectetur&nbsp;adipiscing&nbsp;elit,&nbsp;sed&nbsp;do&nbsp;eiusmod&nbsp;tempor&nbsp;incididunt&nbsp;ut&nbsp;labore&nbsp;et&nbsp;dolore&nbsp;magna&nbsp;aliqua.&nbsp;Ut&nbsp;enim&nbsp;ad&nbsp;minim&nbsp;veniam,&nbsp;quis&nbsp;nostrud&nbsp;exercitation&nbsp;ullamco&nbsp;laboris&nbsp;nisi&nbsp;ut&nbsp;aliquip&nbsp;ex&nbsp;ea&nbsp;commodo&nbsp;consequat.&nbsp;Duis&nbsp;aute&nbsp;irure&nbsp;dolor&nbsp;in&nbsp;reprehenderit&nbsp;in&nbsp;voluptate&nbsp;velit&nbsp;esse&nbsp;cillum&nbsp;dolore&nbsp;eu&nbsp;fugiat&nbsp;nulla&nbsp;pariatur.&nbsp;Excepteur&nbsp;sint&nbsp;occaecat&nbsp;cupidatat&nbsp;non&nbsp;proident,&nbsp;sunt&nbsp;in&nbsp;culpa&nbsp;qui&nbsp;officia&nbsp;deserunt&nbsp;mollit&nbsp;anim&nbsp;id&nbsp;est&nbsp;laborum.&nbsp;saiful</p>','2026-04-24 20:39:08','2026-04-25 08:17:23');
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

-- Dump completed on 2026-04-29 23:23:57
