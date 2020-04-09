---
title: 如何用Rosie来mock data
tags: 测试实践
category: 工具
---

### Rosie? factory_girl?
如果说是单纯命名上面，是受一幅画的影响，画里面的妹子叫Rosie；
如果是项目灵感其实是来自于[factory_girl][2],factory_girl在github以及segmentfault上的资料都有一些，百度也找得到，但是关于Rosie的着实不多，所以就想share下。
![图片描述][1]

### What 
Rosie的作用主要就是构建一些js的数据对象，大部分使用场景也是在测试中。

虽然这部分和mock service没有直接的关系，但是因为在整个涉及到api的test过程中（非单元测试），我们的套路一般是用工具生成假的数据对象（结构和真实的一致），然后把数据传给对应的mock service，所以暂时也把本文放在[mock service][3] 系列。

### How
一般使用npm或者yarn 添加依赖并安装js包就可以使用。

具体使用时候，一般会有一个factory用来构建，另外一个在需要数据的地方进行直接引入。好处是数据构建逻辑和业务处理的逻辑可以隔离。
在object builder 部分
```js
import { Factory } from 'rosie'
export default new Factory()
  .sequence('id')
  .attr('Type', () => 'User')
  .attr('Name', {first: 'Yangyang', last:'Cao')
  .attr('Birthday':'1992-01-01')
  .attr('Job', {company:'TW',position:'Developer'})
```
在使用的部分

```js
 import ProfileFactory from './fixtures/profile'
 beforeEach(() => {
    parameters = {
      ID: '00124B00000zU5f17AE',
      Profile: ProfileFactory.build()
    }
  })
```

其他的使用方法也是存在的，具体请参考github
### Why
为什么使用，本人是因为之前每次在before each 或者自己写builder太麻烦了，最常见的是，在一个已有的obeject上面增加新的属性，烦不胜烦。

### When
当你厌倦已有的无论是字面量生成mock data，还是单独数据builder 生成mock data的方式。
感觉用Rosie更符合语义以及函数思维。

### 缺点
暂时没发现，增加了新的依赖算吗？



  [1]:https://image-static.segmentfault.com/408/011/4080117135-596da9cdc19d2_articlex
  [2]:https://github.com/thoughtbot/factory_girl
  [3]:https://segmentfault.com/blog/yangyangcaosblog