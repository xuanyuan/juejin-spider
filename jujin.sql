/*
Navicat MySQL Data Transfer

Source Server         : 192.168.22.128
Source Server Version : 50722
Source Host           : 192.168.22.128:3306
Source Database       : jujin

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2018-07-28 16:28:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `objectId` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `lastCommentTime` varchar(255) DEFAULT NULL,
  `originalUrl` varchar(255) DEFAULT NULL,
  `user` mediumtext,
  `content` mediumtext,
  `summaryInfo` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1301 DEFAULT CHARSET=utf8mb4 COMMENT='掘金文章';