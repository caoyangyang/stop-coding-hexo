---
title: 如何用Sandbox作mock service
tags: 测试实践
category: 工具
---

### Sandbox--沙箱，第一反应，但sorry并不是。
[sandbox][1] 这个词大家并不陌生，但貌似国内的技术share中很少看到有提到这个工具的。
为避免误解，下文中所有提到sandbox都是指[sandbox][2]这个工具，不是沙箱。
另外在两周的使用过程中，感觉比我之前尝试过的mock service的方法都要舒服，并且对程序员更友好。所以愿意安利一波。
希望有遇到同样痛点的朋友，可以给feedback有不同观点也欢迎交流指正。

![图片描述][3]
### What
Sandbox做什么的，根据其官网上的描述
```
Quick and easy mock RESTful API and SOAP webservices. Generate from API definitions,
instant deploy, collaborative build, and debugging tools for integration.
```
可以理解为快速生成API，即时部署，协作构建并集成了调试工具。
更简单的说，你可以用它做假的API，并且马上就可以用。
### How
1. 你可能需要懂点js；
2. 理解下Sandbox 里面的state；

基本上写代码的部分超级简单，[demo][4]自取，[getting-start][5]也很简单。
我只是share下有这么个工具，以及简单的用法，其实一步一步的步骤不用讲太多，很简单动手即可。

### Why
聊为什么要用sandbox前，说说我之前用过什么其他的方式做mock service吧。

写js的时候，用express写过假的后端service，处理简单数据还行，后面发现数据验证，数据状态不抽离，越到后面越难mock，写ruby的时候，用sinatra直接写了fake server；

遇到过数据量好大，已有的数据在假server重启后就木有了，中间也用过mongodb，但是那个只是解决数据源，并且无形中也是增加了mock的effort；

也有同事推荐swagger，但没用上手，因为也没发现多方便 ，反倒发现swagger-ui很友好；

国内看到有人做了个叫做[easy mock][6]的, 感觉对不懂代码的貌似蛮友好各种点点点，但是我还是喜欢直接敲代码那种；

中间有阵子用了docker+[mountebank][7],对于纯粹只是get的，能把业务逻辑和数据分离，还算蛮好用，也是只用处理代码就好，但对于刚入门，可能不推荐。

github上也有一些利用json文件做fake server的 如[json-server][11]

聊了这么多，大概可以回答我为什么会推荐使用sandbox了
1. 关注code，不偏爱UI操作；
2. 简单，懂js就好，不需要额外effort（mongodb,docker）
3. state能够保存数据，即使进行到后面，也比较好继续添加新的相关联的api

### When
对项目而言，还是觉得最开始就可以；
如果是中期replace为sandbox，如果原来是用类似express的方法，还蛮简单的，如果是其他语言或技术栈的建议先做MVP的spike。

对个人而言，强烈推荐给入门的人。

### 缺点
安利了那么多，基于客观事实，还是要说些我遇到的不好的方面，
1. 数据丢失，隔了2天，有一次我的get API没法拿到数据，所以最好要初始化数据的设计，方便恢复；
2. 服务器不稳定，官网直接挂掉，我经历过一次；
3. 个人concern ，如果mock service中涉及敏感数据以及安全信息，建议先做一些处理，毕竟放在网上的没有你的本机安全
4. free plan有request次数限制，今天就遇到了
 ![图片描述][8]
排除以上几点，在开发code方面，个人觉得对程序员还是蛮友好的。
因为mock service本身其实对数据的稳定性要求也没那么高所以还可以接受（我遇到的case）

### 意外惊喜
1. 除了直接在web上的页面上直接写代码，也可以把代码sync到github的codebase里面，这样你只要有本地编辑器+网络+git就好了；
2. 中间开发基于ios的应用的时候，只能支持https协议，如果是本地mock的service 需要去改配置，这个支持https协议，0改动；
3. 会给一个域名下的资源链接，所有人可以访问，相当于你的资源以及API就是放在互联网上面的

### P.S.其他mock service 推荐
1. [Mocky][9] 实时当下马上可测，但是状态应该不可保存。slogan是Mock your HTTP responses to test your REST API
2. [mockable.io][10] slogan是The Fastest way to mock your API




  [1]:https://getsandbox.com/
  [2]:https://getsandbox.com/
  [3]:https://image-static.segmentfault.com/261/218/2612182484-595af6fb899e2_articlex
  [4]:https://github.com/caoyangyang/get-sandbox.git
  [5]:https://getsandbox.com/docs/getting-started
  [6]:https://www.easy-mock.com
  [7]:http://www.mbtest.org/
  [8]:https://image-static.segmentfault.com/168/794/1687940091-5954c734d8a89_articlex
  [9]:http://www.mocky.io/
  [10]:https://www.mockable.io/
  [11]:https://github.com/typicode/json-server