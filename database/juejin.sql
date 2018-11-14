/*
Navicat MySQL Data Transfer

Source Server         : 192.168.22.132
Source Server Version : 50723
Source Host           : 192.168.22.132:3306
Source Database       : juejin

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2018-08-25 09:00:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `objectId` varchar(255) DEFAULT NULL COMMENT '每条记录的唯一标识',
  `title` varchar(255) DEFAULT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `lastCommentTime` varchar(255) DEFAULT NULL,
  `originalUrl` varchar(255) DEFAULT NULL,
  `user` mediumtext,
  `content` mediumtext,
  `summaryInfo` varchar(255) DEFAULT NULL COMMENT '摘要',
  `category` varchar(255) DEFAULT NULL,
  `collectionCount` int(11) DEFAULT NULL COMMENT '点赞加心数量',
  `commentsCount` int(11) DEFAULT NULL COMMENT '评论数量',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28631 DEFAULT CHARSET=utf8mb4 COMMENT='掘金文章';