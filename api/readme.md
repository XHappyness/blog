## 一. 安装依赖
1. ```yarn install```安装本项目依赖;  另附：
2. [mysql数据库安装教程](https://www.cnblogs.com/XHappyness/p/11864868.html)
3. [redis安装教程](https://www.runoob.com/redis/redis-install.html)

## 二. 启动
1. 启动mysql数据库  
安装完数据库后```net start mysql```开启数据库服务；  
只要不手动关闭，以后就不用再开了。
2. 启动redis
进入到安装目录，运行```redis-server.exe```即可，  
安装教程里有详细介绍

3. 启动项目
```
yarn dev
```

## 三.说明
本项目是博客的api后端接口提供，  
主要使用了node+mysql+redis