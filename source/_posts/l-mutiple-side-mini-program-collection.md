---
title: 多端小程序开发的知识集合
date: 2020-07-31 21:27:59
tags: MP
category: 杂
---
#  概念
多端小程序指的是各个不同平台的小程序。
包含常见的微信小程序，支付宝小程序，头条小程序等。局限于个人上下文，此处的知识集合仅包括微信小程序，手机淘宝小程序，支付宝小程序。

#  多端小程序开发选型
- [Taro][1] 类react栈，3.X后也支持Vue

- [Uniapp][2] Vue栈

但即使使用了第三方平台提供的一些多端的能力，但还是要对各个平台比较了解，从文档，到概念到整个流程也都要熟悉，Taro和Uniapp只是帮助我们减少了部分工作量。
但各平台下的小程序的基本知识和概念模型还是少不的，过程中不仅仅是前端一侧，也有整个流程的。

原生平台文档
1.[微信小程序][3]
2.[支付宝小程序][4]
3.[淘宝小程序][5]

# 常见多端要处理的场景
文档，基本的概念，流程最终都是为业务场景服务的。
对于一个小程序应用，一般跑不脱的几个场景我们详细聊一下。
## 用户登录 注册 授权相关
### 手机淘宝小程序
[手机淘宝小程序授权][6]
[手机淘宝入会 有些场景会用到][7]
[手机淘宝云函数系统参数][8]
[手机淘宝后端可调用api][9]

手机淘宝小程序常见登录常见为
1 小程序提示用户授权,授权成功，调用云函数
2 云函数会将在上下文 context 里面带上 mixNick, accessToken(是否为共用的sessionkey)传给后端第三方api.
3 后端讲 mixNick调用淘宝开放平台获取对应的 淘宝的 unionId,进行第三方系统自己逻辑 检查unionId和自己的系统相关能标识会员的字段进行绑定

补充说明， 后端用unionId可以作为唯一标识符，云函数可用mixNick作为唯一标识符（存在时效性）

### 支付宝小程序
[用户授权介绍][10]
[支付宝小程序授权API 例子][11]
[获取授权信息 api][13]
[换取token api][14]
![流程图][12]

1 小程序端 用户进行授权.
2 授权后，后台调用 `alipay.system.oauth.token(换取授权访问令牌)` 可以获取 支付宝用户的唯一userId + access_token访问令牌。通过该令牌调用需要授权类接口 
按需调用 `alipay.user.info.share(支付宝会员授权信息查询接口)` 获取更细的用户信息如 省份，地址，昵称，用户头像地址。具体根据使用场景来
 补充说明，唯一userId可以作为唯一标识符
 
### 微信小程序
[微信小程序登录简介][15]
[获取code][16]
[code换取openid和session_key等信息][17]
[UnionID 机制说明][19]

![流程图][18]

1. 小程序端登录 获取code
2. 服务器端使用code换取openid和session_key等信息,也包含UnionID

P.S. UnionID可以作为唯一标识符。
如果开发者拥有多个移动应用、网站应用、和公众帐号（包括小程序），可通过 UnionID 来区分用户的唯一性，因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号（包括小程序），用户的 UnionID 是唯一的。换句话说，同一用户，对同一个微信开放平台下的不同应用，UnionID是相同的。

## 小程序端接收推送消息
### 手机淘宝小程序
[订阅消息介绍][20]
[获取用户订阅授权权限][21]
[调用接口下发订阅消息][22]

介绍里面有详细介绍，中间涉及到很多手动配置的内容，对于开发侧，主要一个是授权 一个是下发消息。
P.S. 目前仅面向商家应用类型的消费者端模板开放消息能力，适用类目将逐步扩展。并不是每种小程序都可以用到

### 支付宝小程序
[模板消息][23]

![有支付行为的模板消息图][24]
有支付行为的模板消息
![无支付行为的模板消息图][25]
无支付行为的模板消息
[服务端下发消息api][26]
详细介绍链接里面很全，就是有一个特别的，支付宝的模板消息很像微信小程序以前的模板消息，但是根据业务场景分为了有支付行为的和没有支付行为的。
有支付行为的模板消息消息一定会经过支付宝服务端。

### 微信小程序
[订阅消息 推荐][27]
[获取权限][28]
[发送消息][29]
订阅消息是现在推荐的做法，在更早以前有[模板消息][30]的做法，但已经不推荐了。但支付宝和微信的模板消息有很多相似之处，大家可以知道一下。
1 配置，然后获取模板 ID
2 小程序端获取下发权限
3 服务端调用接口下发订阅消息


## 小程序请求第三方api
在有很多自己定制化业务需求的情况，大多数情况下都会调用自己业务相关的后端服务，在小程序这侧看来，这些都属于第三方api。
不同端调用方法和配置也会有所差异。整体来说都是需要配置白名单的，另外淘宝小程序需要走云函数调用。

### 手机淘宝小程序
[外部http调用][31]
申请入口见 应用管理-> 云服务 -> 云函数-> 域名配置
P.S.
GET请求URL长度不得超过256字节，超过部分将会被截断；
POST请求，相对GET请求审核更严格，如无必要请使用GET，申请POST后，GET权限同步开通；
申请时，请务必详细说明需要使用HTTP外联的业务场景和需求；
调用方法，在云函数侧`context.cloud.httpApi.invoke`进行调用

### 支付宝小程序
[request 调用][32]
配置入口为支付宝小程序管理中心 > 小程序详情 > 设置 > 开发设置 > 服务器域名白名单 中配置域名白名单

### 微信小程序
[request调用][33]
[网络配置][34]
P.S. 
注意一个点就是域名必须经过 ICP 备案；以及支持https



[1]:https://taro-docs.jd.com/taro/docs/README/index.html
[2]:https://uniapp.dcloud.io/
[3]:https://developers.weixin.qq.com/miniprogram/dev/framework/
[4]:https://opendocs.alipay.com/mini/api
[5]:https://miniapp.open.taobao.com/docV3.htm?docId=117323&docType=1&tag=dev
[6]:https://miniapp.open.taobao.com/docV3.htm?docId=118295&docType=1&source=search
[7]:https://open.taobao.com/doc.htm?spm=a219a.7386797.0.0.5f51669aUyFd5p&source=search&docId=107142&docType=1
[8]:https://miniapp.open.taobao.com/docV3.htm?docId=118990&docType=1&source=search#ss0
[9]:https://developer.alibaba.com/docs/api.htm?apiId=40973
[10]:https://opendocs.alipay.com/mini/introduce/authcode
[11]:https://opendocs.alipay.com/mini/api/openapi-authorize
[12]:https://gw.alipayobjects.com/zos/skylark-tools/public/files/a1d4b36ba749a924bdbdd75d53989784.png
[13]:https://opendocs.alipay.com/apis/api_2/alipay.user.info.share
[14]:https://opendocs.alipay.com/apis/api_9/alipay.system.oauth.token
[15]:https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html
[16]:https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html
[17]:https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
[18]:https://res.wx.qq.com/wxdoc/dist/assets/img/api-login.2fcc9f35.jpg
[19]:https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/union-id.html
[20]:https://miniapp.open.taobao.com/docV3.htm?docId=119008&docType=1
[21]:https://miniapp.open.taobao.com/docV3.htm?spm=a219a.15212435.0.0.298d669anYhLNF&docId=1620&docType=20&tag=dev
[22]:https://open.taobao.com/api.htm?spm=a219a.15212435.0.0.298d669anYhLNF&docId=50611&docType=2
[23]:https://opendocs.alipay.com/mini/introduce/message
[24]:https://gw.alipayobjects.com/zos/skylark-tools/public/files/7ad3ecf9e1a8989a2dca7771a0f4ac7f.png
[25]:https://gw.alipayobjects.com/zos/skylark-tools/public/files/583bd9b3554e47331702ddc599896246.png
[26]:https://opendocs.alipay.com/mini/api/templatemessage
[27]:https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message.html
[28]:https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html
[29]:https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html
[30]:https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/template-message.html
[31]:https://miniapp.open.taobao.com/docV3.htm?spm=a219a.15212435.0.0.1b74669aD7KB2S&docId=118444&docType=1
[32]:https://opendocs.alipay.com/mini/api/owycmh
[33]:https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
[34]:https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html

