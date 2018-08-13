# juejin-spider
本菜虫使用nodejs技术，利用Promise控制同步，比较蛋疼哈，异步的语言硬生生搞成同步。

1. 开发环境
* node v10.4.0
* ubuntu 18.04 LTS
* mysql 5.7.22-0ubuntu18.04.1
* redis-server v4.0.9

2. 准备工作和运行
* npm install
* node article.js

### change log ###
2018-8-6 10:13:57

现状：
    实现正常爬取和存储，使用到布隆过滤器，但是实际效果出现重复据。
权限验证一块，一直未出现token过期的问题，未作处理

计划：
    解决重复爬取问题

2018-8-13 13:59:45
去掉布隆过滤器，暂时将objectId作为key存储到redis中，后期考虑定时清理和惰性清理redis

参考文章

https://cnodejs.org/topic/5ad2c1a4ba60fcc66b7b80fe
