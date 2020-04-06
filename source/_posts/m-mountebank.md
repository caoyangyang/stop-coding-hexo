---
title: 如何用mountebank作mock service
---

### Mountebank--江湖骗子,他有药，你要吗？
最开始看到这个词感觉怪怪的，词典解释是江湖骗子、卖假药的意思，感觉很奇妙，为啥子取这个名字。
官网图片如下，确实有一瓶药。
![图片描述][1]

### What
Mountebank到底是什么？
从我使用的理解，就是给开发者提供假的api，替换掉被真实依赖的api，这在测试场景中经常用到。

### How
如何使用，可以单独使用，按照[官网教程][2]就好，也可以结合docker使用。
后续我会把单独使用的demo以及结合docker使用的demo 上传至[github][3] 供大家参考，欢迎提意见。
详细的步骤请参考git里面的commit信息。
第一个get api 效果如图
![图片描述][4]
![图片描述][5]

纯数据代码只有下面一部分
```json
{
  "port": 4545,
  "protocol": "http",
  "stubs": [{
      "responses": [{
        "is": {
          "statusCode": 200,
          "headers": {
            "Content-Type": "application/json"
          },
          "body": ["Australia", "Brazil", "Canada", "Chile", "China", "Ecuador", "Germany", "India", "Italy", "Singapore", "South Africa", "Spain", "Turkey", "UK", "US Central", "US East", "US West"]
        }
      }],
      "predicates": [{
        "equals": {
          "path": "/country",
          "method": "GET"
        }
      }]
    }, {
      "responses": [{
        "is": {
          "statusCode": 400,
          "body": {
            "code": "bad-request",
            "message": "Bad Request"
          }
        }
      }]
    }]
}

```
而需要把数据run起来 脚本部分只要shell就好

```shell
#!/bin/sh
set -e
RUN_RESULT=$(docker ps | grep hasanozgan/mountebank | wc -l)
MOUNTEBANK_URI=http://localhost:2525
BANK_IS_OPEN=1

if [ "$RUN_RESULT" -eq 0 ]; then
  docker run -p 2525:2525 -p 4545:4545 -d hasanozgan/mountebank
fi

curl $MOUNTEBANK_URI/imposters || BANK_IS_OPEN=0
if [ $BANK_IS_OPEN -eq 1 ]; then
  break
fi

curl -X DELETE $MOUNTEBANK_URI/imposters/4545
curl -X POST -H 'Content-Type: application/json' -d @stubs.json $MOUNTEBANK_URI/imposters
```
### Why
为什么选用mountebank，
一个原因是因为之前没用过，只是听到国内一些[讲测试的文章][6]有说过，看完并没有get太多的点，还不如动手玩一下；
另外更重要的原因是刚好一个codebase有现成的，有项目契机做事情很lucky。

抛开这些自身兴趣和巧合，我推荐开发者选用mountebank的原因大概会有以下几个
 1. 轻量级 无平台依赖
 2. 多语言 多协议支持
 3. 免费
 4. 有UI交互有趣
 
更多的自夸部分参见Why mountebank?
>**Trivial to get started**
>mountebank is easy to install, without any platform dependencies. mountebank aims for fun and comprehensive documentation with lots of examples, and a nice UI that lets you explore the API interactively.

>**A platform, not just a tool**
>mountebank aims to be fully cross-platform, with native language bindings. Servers are extensible through scripting when the out of the box functionality isn't enough.

>**Powerful**
>mountebank is the only open source service virtualization tool that is non-modal and multi-protocol. Commercial solutions exist, but their licensed platforms make it hard to move the tests closer to development and may even require a specialized IDE. mountebank provides service virtualization free of charge without any platform constraints


### When&缺点
其实目前我也刚使用不久，也不知道啥太大的缺点，而关于什么时候使用呢？
当有需要mock假的依赖的api的时候，就可以使用，感觉和没说一样。
只是目前国内使用的不多，想想先积累点使用经验也是好的，说不定又激发新的灵感。


  [1]:https://image-static.segmentfault.com/665/504/665504319-596d78ab15999_articlex
  [2]:http://www.mbtest.org/
  [3]:https://github.com/caoyangyang/mounte-bank-demo
  [4]:https://image-static.segmentfault.com/194/533/1945331960-596da2dd3c3e6_articlex
  [5]:https://image-static.segmentfault.com/137/213/1372132189-596da2eb6a877_articlex
  [6]:http://insights.thoughtworkers.org/software-testing-trend/