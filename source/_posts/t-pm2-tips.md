---
title: pm2介绍 & Tips
date: 2020-10-29 23:00:00
tags: 前端
category: 工具
---

## PM2介绍


## PM2 使用
### 安装
```
$ npm install pm2@latest -g
# or
$ yarn global add pm2
```

### 基本命令使用
#### 服务操作相关的命令
```
pm2 start pm2.config.yaml
pm2 stop app_name
pm2 reload app_name
pm2 stop app_name
pm2 delete app_name

```

其中pm2.config.yaml 为配置文件，大概内容为

```
apps:
  - script   : ./api.js
    name     : 'api-app'
    instances: 4
    exec_mode: cluster
    kill_timeout : 3000
  - script : ./worker.js
    name   : 'worker'
    watch  : true
    env    :
      NODE_ENV: development
    env_production:
      NODE_ENV: production

```
具体可以查看[env文档][3], 配置文件本身支持JavaScript格式和yaml[格式][1]的。

#### 查看信息相关的命令
```
pm2 [list|ls|status]
pm2 logs
pm2 show app-name
pm2 monit
pm2 plus
```

### PM2 的其他实践
#### [优雅启动退出][2]

优雅start：
主要是利用配置信号（ready），和一些操作的timeout时间（wait_ready: true，--listen-timeout）使相关资源连接ok后启动；

优雅
配置信号（SIGINT），以及--kill-timeout

除了利用信号，还可以利用--shutdown-with-message， 通过不同的message 对应不同的行为，实现优雅启动和退出。


#### 使用pm2 进行部署
利用deploy这个字段，更改yaml文件就可以实现。
但是对于已经有cicd的，总感觉有点不习惯。
实现逻辑和[实例代码][4]也比较简单


## PM2 注意事项

#### NODE_ENV更新
环境变量如NODE_ENV 在第一次配置后，会记录到服务， 可以使用 
```
NODE_ENV=development pm2 restart app-name --update-env 

```
这个时候使用
```
pm2 show app-name
```
就可以查看NODE_ENV是否更新成功了


#### 变量更新
 --update-env 很好用，但并不是所有变量都可以用这个，yaml里面自带的变量在服务start后是没法更新的，需要干掉服务后重新start才能使用。
 
 更改pm2的pm2.config.yaml后，如果希望立即使用，需要干掉当前的应用服务，然后进行start操作才行， stop后start是不行的， 必须用到delete或者kill




[1]:https://pm2.keymetrics.io/docs/usage/application-declaration/
[2]:https://pm2.keymetrics.io/docs/usage/signals-clean-restart/
[3]:https://pm2.keymetrics.io/docs/usage/environment/
[4]:https://pm2.keymetrics.io/docs/usage/deployment/