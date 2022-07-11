-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: jwtlogin
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.22.04.2

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
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `stud_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `college_name` varchar(200) DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  PRIMARY KEY (`stud_id`),
  UNIQUE KEY `password` (`password`),
  UNIQUE KEY `address` (`address`),
  UNIQUE KEY `ix_student_username` (`username`),
  UNIQUE KEY `ix_student_email` (`email`),
  KEY `ix_student_stud_id` (`stud_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_info`
--

DROP TABLE IF EXISTS `student_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_info` (
  `stud_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `college_name` varchar(200) DEFAULT NULL,
  `is_active` int DEFAULT NULL,
  PRIMARY KEY (`stud_id`),
  UNIQUE KEY `password` (`password`),
  UNIQUE KEY `address` (`address`),
  UNIQUE KEY `ix_student_info_email` (`email`),
  UNIQUE KEY `ix_student_info_username` (`username`),
  KEY `ix_student_info_stud_id` (`stud_id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_info`
--

LOCK TABLES `student_info` WRITE;
/*!40000 ALTER TABLE `student_info` DISABLE KEYS */;
INSERT INTO `student_info` VALUES (19,'driss','driss@gmail.com','$2b$12$pYA.qoMUjbpHYNxG5OxmgOWX/zaPY9BOJOvjlCvNeIW77hyBhBAna','678,bulidev block appartmaent',19,'Princeton University Estd',0),(20,'yale','yale@gmail.com','$2b$12$.r81BGXkNZeSFqNxbuREhup9OYkBrZC5RtbgR8jWNcAWolZAiRrTO','124,venue ',17,'Yale University Estd',0),(21,'hugo','hugo@gmail.com','$2b$12$zM1QfBRzxQXFwXb11d1/k.jMnnTONdFgtQaXcojfVuJD8SsQRQ8YG','topicanation,soc',23,'University of Oxford Estd',0),(22,'marco','marco@gmail.com','$2b$12$vhHGsranjnwynangZouQF.QNk4NURGDMk/76436PMKaDHiLfSlJPK','123,main street ,newy',19,'Stanford University Estd',0),(23,'malia','malia@gmail.com','$2b$12$hCJEJNj6.h4g.mSz7Axfw.7AcvROnoOZjDTsThtyV7OD75KqvWQNK','453,korien near',24,'University of Oxford.',0),(24,'katoka','katoka@gmail.com','$2b$12$ewLlyaUjYkmcDMz5J7gKj.xMNp2e.rhWpbaZuxQjhyR1TISjjRBY2','67,rodanv hard near',19,'UCL (University College London)',0),(25,'zahra','zahra@gmail.com','$2b$12$ZBy8Ych0d1iFwZyVrpqCSunZpmMGG1.Sp22mwkCCENqupW1hBJBTi','45,suryandra contexa near',23,'University of Vienna',0),(26,'shira','shira@gmail.com','$2b$12$Gy5M.wlqh1nzfOV0/O.6KegQir2EjsEdkd/rN0D1.I/8sM9WLFQNK','78,banglor',20,'jain univercity',0),(27,'khol','khol@gmail.com','$2b$12$wlxzBHpL/li7MGMazzyV6ORYftr1MVDBl.JsZh5erFbku3YBuSlvS','234,devolpee near',19,'cambrige univercity',0),(29,'hej','hej@gmail.com','$2b$12$ZI3XD3yflGFwMmsb1zZ.beKeEORK9UxJ1tsNrJ34cEmaZmFk4pkKe','14,street food near',24,'Stanford University Estd',0),(30,'garmi','ygarmis@gmail.com','$2b$12$ahpygxQPyJpaY26ofmT41.zCPrhzBJOQGIchXItZQX./OD4mPZj3S','674,bhurj khalifa',20,'harvard univercity',0),(31,'krish','vk@gmail.com','$2b$12$D9xy/z.Rp8XVwBm/eyBqUeev1RUnI.oiqLu31Ly2gVBBvOzkIIVVC','14,united states near ',21,'harvard univercity',0),(32,'kohinur','hkohinur@gmail.com','$2b$12$akEiqhwAQKKhcZBKZm3F.el7DxPtyMhbzmRy/ocvkB2xR7GDBrRcG','dfg hefg',24,'cambrige univercity',0),(33,'rom','rom@gmail.com','$2b$12$dUKElrIBpfAl84y8vsFBZ.rwClMl2wNqRp6D/zMLL0jXVy8OQoOI.','73,keltech apartment',22,'maliba',0),(34,'pakhi','sppakhi@gmail.com','$2b$12$n4BOpl.PKlSXu8tJy85Yoez2x45LHywa6KGvEQlYJmlYgu52hEqTu','23,united states,surat',23,'Stanford University Estd',0),(35,'laris','hoslaris@gmail.com','$2b$12$efDbvG/tPdAIecHsrXm/MOV8nYHK40w5LVL7OdUU99D63j879mVaO','myanmar',20,'gn bharthwaj univercity',0),(36,'man','nman@gmail.com','$2b$12$GN/40KPRL6RQFaFXXpOhIeaQ.OCRRj3FAUcxDoRn//xXsynlLbimy','senderolla japan',25,'deft college',0),(37,'ruh','ruh@gmail.com','$2b$12$jd/Fw9lOUi5bxaUXfLeh.uNnzFCn856wcIeWqN/FWpHnnbb76d4Mm','ghenric apartment ,singapur',21,'kotak college',0),(38,'sohl','sohl@gmail.com','$2b$12$bPXPFEbl5Oepdvq9lM0Gj.X5XCuZMMkXudaoKxINW1J9guDN2Fxhy','wandoor park near ,platinum plaza',24,'gendra univercity',0),(39,'pol','pol@gmail.com','$2b$12$rA7.Lz4GLwBgEdZpiieAFOc5An9kAU6boT2cKPRxI1pGkAoYFMK/m','fehrej pur,pakistan',20,'ishlamabad new univercity',0),(40,'don','don@gmail.com','$2b$12$fsTyiRmC1mvDpYJtFouOS.SKeAl7Ksmvw2S7GEXDOt350vfwmgEny','34,geelpark honidon soc',19,'bevldoj univercity',0),(41,'leris','leris@gmail.com','$2b$12$PfVblxypkQVrNxcw.X5TFO3Brfh8WyukBj77XMc9XgDA42tNSf63W','ferhnagar donpark3',18,'winsoon univercity',0),(42,'kogi','kogi@gmail.com','$2b$12$4nQbT/YkQnIB8ijgmw/WleI4E2sr.ziLz0lekoytz.YaSzU5gS06y','your apartment',22,'ghanganga univercity',0),(43,'henas','hrenas@gmail.com','$2b$12$X/VMZjNOfZ/k0Ab2L4D7mOoSdjoWhPFlhQN6R7MNmBeSt3GiN22di','pahardar soc,2',17,'ruprelas univercity',0),(44,'orap','orap@gmail.com','$2b$12$bU.YFUeyY7R8ahhGSnciJe9.75vO.CnyHQ6GJoWRpUVHJ0V3G49.K','queen ciracle parle point',20,'mehndra univercity',0),(45,'dell','dell@gmail.com','$2b$12$QXmrNAbic.9K6t.XPxItG.TKrnnBqDlLTxVz0vykocAUOvFAFnJCa','juhi chavada park',25,'kaminis college',0),(46,'beena','beena@gmail.com','$2b$12$ZW1GPos9hpdQjdzWk.M6xuSqKfcK1Mq4pJalmHD6bdsccmcbgYJkm','xopen soc',23,'cameribge univercity',0),(47,'sanvi','sanvi@gmail.com','$2b$12$k63wBgR8v1QhEVy572WQq.wWFuYWBSNr/SxYrO.nxQ.LaE.yfk.ZS','36,hendra soc,up',21,'vanishah univercity',0),(48,'aesha','aesha@gmail.com','$2b$12$OQLkizj2x9qKy3FPBtE8Wu6Fq.qLEhAhSIS1y.XUEW6pOKPE3o6eC','aesha',27,'jalshad univercity',0),(49,'clone','clone@gmail.com','$2b$12$s2HmzDUS0UgIJyuF4p/nhuOdelSP3yDAIFjo5ErV0RTnz0aKlUrI6','jev daya trust soc',23,'mahior univercity',0),(50,'ranas','rans@gmail.com','$2b$12$5ODJzdoPsuxJR/qMpPz8wOYUdxemAAz197ejTlzLd1Ke6I.zNyLaK','fetahpur unvercity',18,'lapinor college ',0),(51,'hanji','hanji@gmail.com','$2b$12$TaQhpfd2YJsa0binHFG3HeK7RqXYD6Vwui3uxDs7Db1ZPt.PoOKN6','wendra soc ',18,'mojemoj college ',0),(53,'gafta','gafta@gmail.com','$2b$12$DARx2iyDMRR15rJvf9dDae1Bvb21mENWP.bok6irikX6P2piyFJzy','ilap galeksi',24,'rooprela univercity',0),(54,'vaya','vaya@gmail.com','$2b$12$GOk0H5hpmIipVhEaJT1Qy.4.wkLG0ibRtws1puh7/JfjfzvjqEPH.','lck tanta apart',17,'bangadth univercity',0),(55,'nvaya','nvaya@gmail.com','$2b$12$V9ro2anO/OHvz41VnTFYK.UEmamoPyz/9COvzOYe/W2xvUSFcwgnu','dooper sonstar ',18,'sinndor univercity',0),(58,'yaani','yaani@gmail.com','$2b$12$dvJBPu8jRSiqja7wH.zN0e32GoSCHG3rqsPJEXkQxuVKfMNPe6g5i','henfa soc',19,'kevans univercity',0),(59,'uaani','uaani@gmail.com','$2b$12$oi6q15GKoe6JqyrXorqZQOjqG6gLraCXvo6EyEfz4cTGClHsAc57W','aeval soc',20,'kevans univercity',0),(61,'paani','paani@gmail.com','$2b$12$9XwhArcWpHtPHL0LZvs4BeFWGKCjQ3C/IUFGStuPqtfv9UhgmOSTS','jafrabad soc',22,'ukrain univercity',0),(64,'qaani','qaani@gmail.com','$2b$12$/ZSwYXTrLXtQlyazR01KJePKl.aJrcQ5ibMCx959kS2hPXWbNJBUS','saravans soc',24,'pakistan univercity',0),(66,'naani','naani@gmail.com','$2b$12$76V3GDSJyve4Omk7/nF95u1c/MKJ68sCcGwW1aAwr9EKSvF1k2Pxi','helishah soc',25,'china univercity',0),(71,'kaani4','kaani4@gmail.com','$2b$12$E5KicL2pI/X0fpwHcRZoK.E71ZBQ0nLj6LdxVqMPlKo4YjmyOSy8W','qelishah ',20,'mohenjodaro univercity',0),(72,'kaani5','kaani5@gmail.com','$2b$12$ApEEmJBpdI4kb.0VE5w7vuTM02maLxNZpHNFfi1lgbmFG8eevHhoq','doopera univercity',21,'mohenjodaro univercity',0),(76,'ranpa','ranpa@gmail.com','$2b$12$55Im27PYC3.ClXvZVi/qVuZ.DFvKLNIBK7fOD8wmesBTGWG5hSX3W','iopfarwell',21,'mohenjodaro univercity',0),(78,'ranpa2','ranpa2@gmail.com','$2b$12$bv/iQ8pcoCgaim6vkRD1Ze0Rmr6QLHNs.pJg5mNaPk60uLKGZzLL.','gangvi',22,'lapikaj univercity',0),(79,'ranpa3','ranpa3@gmail.com','$2b$12$pz1Woiyck5Sow8XPhrsOIeG68QZzoXiZm4URhLltBrEXrCqQLY.se','bhoolbhulaya',25,'vanikach univercity',0),(81,'fetah','fetah@gmail.com','$2b$12$Nbmb0qIwa3w7qJvRy98eQuaYJ.ZBMZmiKG9idmr80JV07oiUrAiMC','bhalishah',26,'vanika univercity',0),(82,'het','het@gmail.com','$2b$12$ZqPGp4/4GvOzvigjP1Get.w5yoPyM.L/WW660otGoJx7WcgSqIlNS','bhal soc',21,'kanika univercity',0),(83,'het1','het1@gmail.com','$2b$12$TTGxoQtm0/ojc1BuicM7me.FMFW3VLcQzlo62oUzvj9mmDFSjvJOu','bhal1 soc',22,'kanika1 univercity',0),(84,'het2','het2@gmail.com','$2b$12$n/Y2yQOxoOKIr9QH7o1dTOfCYdJr654UNat2S0UGhgXMrinHVu8rK','bhaer soc',24,'kanika univercity',0),(85,'het3','het3@gmail.com','$2b$12$GVX95zrUBe1SCo6RFwSHtO5aZhxumhz35Xu6qCsIrBYLrv9Gc2svS','bhaeio soc',22,'lohinapur univercity',0),(86,'het4','het4@gmail.com','$2b$12$xWa6UOkrQnIqxpJC8qP/euC3thjeupurYLOVZ555/OXAcDxmaD1c2','jangirpura soc',17,'kutabhminar univercity',0);
/*!40000 ALTER TABLE `student_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-11 12:30:29
