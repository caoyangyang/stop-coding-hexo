---
title: 另一种前端脚手架--sao.js
tags: 前端工程化
category: 工具
---

### 之前使用的脚手架工具
做前端项目的经历过大概这么几个阶段
- 最开始的时候，会根据官网的例子，setup好环境（node），用package管理好依赖，自己用grunt来处理打包的活；
- 过程中有遇到各种不一样技术栈的项目，开始有人推荐我用脚手架工具[yeoman][1]，按照官网的例子，找到合适的generator，一步步的可以搭建起一个项目的架子；
- 后面一些主流开发框架，如Angular和React 都提供了一些对应的cli，如[angular-cli][2]之类的命令行工具，帮助快速setup好环境，感觉比之前自己用yeoman方便且快速

这是之前走过的一些路，今天想尝试下其他比较方便的路。



### sao.js
>地上本没有路，走的人多了，也便成了路。

并且个人感觉，抄小路有风险，但探索的乐趣和成就感确实很爽呀。
[sao.js][3] 是我无意间在github发现的，自己尝试了下，确实还可以，并且过程中让我有其他收获。

sao.js 和yeoman一样也是脚手架工具。readme里面的一段话交代了项目的原因
>SAO was made because yeoman, while powerful, is too complex. vue-cli, on the other hand, is more than a scaffolding tool and lacks some important features like unit testing. SAO combines the powerful core features of yeoman with the simplicity of vue-cli into a single application.

其中有一点很想+1， yeoman真的很厉害但是真的也确实很复杂，特别是在在使用过一些cli工具后。但单个的cli工具一般都是为特定框架使用的比如vue 比如angular，这个时候就是尝试sao.js的时候了。

### start sao.js
```shell
npm i -g sao

sao nm node-project
```
然后就会开始创建git仓库了，如图
![图片描述][4]

![图片描述][5]
然后开始运行test
```shell
yarn test
```

结果发现checkstyle报错，这样也行，先fix再说

![图片描述][6]

运行
```shell
yarn lint-staged
```

再次run test，居然第一个测试就报错，search了下是缺babel相关依赖

![图片描述][7]

在package.json 中增加依赖
```js
"@babel/core": "^7.5.5",
"@babel/preset-env": "^7.5.5",
"babel-core": "7.0.0-bridge.0",
```
以及在项目加入基本的banel配置，并修改test的script为
```js
 "test": "npm run lint && jest --no-cache",
```
就可以啦
![图片描述][8]

101 done！


  [1]: https://yeoman.io/
  [2]: https://cli.angular.io/
  [3]: https://github.com/saojs/sao
  [4]: https://image-static.segmentfault.com/128/707/1287077295-5d64c11ddac44_articlex
  [5]: https://image-static.segmentfault.com/437/209/437209647-5d64c17b9f98b_articlex
  [6]: https://image-static.segmentfault.com/174/886/1748868294-5d64c1d64def2_articlex
  [7]: https://image-static.segmentfault.com/399/668/3996688633-5d64c30c107e8_articlex
  [8]:https://image-static.segmentfault.com/160/926/1609265320-5d64c50b2ae5f_articlex