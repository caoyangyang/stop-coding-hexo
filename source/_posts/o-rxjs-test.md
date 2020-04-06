---
title: RxJS修炼之 用弹珠测试学习RxJS
---

罗里吧嗦的一些解释
----------
RxJS使用的越来越多，但发现很多开发者都是使用最基础的部分用来处理http请求，其实RxJS可以做的事情不仅仅是在对网络资源处理过程中替代Promise，但如果按照一些已有的网络博客和分享来看，对二者在实践上的差异确实体现的不明显，所以想从测试的角度，和大家一起理解RxJS，发现它更大的威力。

另外其实本人实际上是在网络上自己学习过一些RxJS的基本概念和使用，并在项目上小小尝试过RxJS，只是觉得尝试的不够彻底，建议看这篇文章的时候最好还是对RxJS的基本概念有一个大的了解。

此文作为对RxJS有了大概了解后，从另一个观察角度去了解RxJS的一个分享。

测试，什么样的测试？
----------
接触过测试的人可能马上会想知道，你说的是什么测试？在测试金字塔的哪一层？可以TDD吗?和我们之前了解的测试有什么特别不一样的？

我说的测试叫弹珠测试（Marble Tests），它属于底层的单元测试级别，主要用于针对自定义操作符的测试，可以TDD，比较特别的算是它是基于DSL的，你必须了解它的DSL之后才能开始写测试。

关于如何写弹珠测试，在官方github上面也有一些文档可以参考，但不是特别详细，没法像一个框架的quick start帮助大家起步。我会尝试和大家一起动手来写这些测试（从最基本的环境搭建开始），不会步步到位，但是关键步骤都有。


看第一个测试？
----------
以下是官网随便找的一个测试，一个简单的map你可以记住你看完这个测试的感受。
```js
  asDiagram('map(x => 10 * x)')('should map multiple values', function () {
        var a = cold('--1--2--3--|');
        var asubs = '^          !';
        var expected = '--x--y--z--|';
        var r = a.map(function (x) { return 10 * x; });
        expectObservable(r).toBe(expected, { x: 10, y: 20, z: 30 });
        expectSubscriptions(a.subscriptions).toBe(asubs);
    });
```
我并不知道你的感受，我第一眼是有点懵的反正，原因也很简单为什么出现 | ^ - 这些字符，它们在这里是干什么的？ 这个时候要放出DSL这个大招了。

学弹珠测试的DSL
----------
前面我们随意找的一个测试，似乎并不符合测试语义化这一点，其实是因为我们没有理解它所使用的DSL，此处的DSL可以理解为编写弹珠测试的时候使用的一种特定的语言，是基于弹珠测试的上下文可以让机器懂得你语义的一种语言。

我们需要简单介绍下弹珠测试所使用的DSL中的一些基本知识（此部分信息摘自[cn.rx.js.org][1]）

首先弹珠语法是用字符串表示随“时间”流逝而发生的事件。任何弹珠字符串的首字符永远都表示“零帧”。“帧”是有点类似于虚拟毫秒的概念。

基本的弹珠语法 
- "-" 时间: 10“帧”的时间段。
- "|" 完成: 表示 Observalbe 成功完成。这是 Observable 生产者所发出的 complete() 信号。
- "#" 错误: 终止 Observable 的错误。 这是 Observable 生产者所发出的 error() 信号。
- "a" 任意字符: 所有其他字符表示由 Observalbe 生产者所发出的 next() 信号的值。
- "()" 同步分组: 当多个事件需要在同一帧中同步地发出，用圆括号来将这些事件聚集在一起。你可以以这种形式来聚合值、完成或错误。 起始 ( 的位置决定了值发出的时间。
- "^" 订阅时间点: (只适用于热的 Observabe) 显示测试 Observable 订阅热的 Observable 的点。它是此 Observable 的“零帧”，在 ^ 前的所有帧都将是无效的。

 
Subscription 的弹珠语法 
- "-" 时间: 10“帧”的时间段。
- "^" 订阅时间点: 显示订阅发生的时间点。
- "!" 取消订阅时间点: 显示取消订阅发生的时间点。

所以我们尝试逐行理解下前面出现的测试
```
  asDiagram('map(x => 10 * x)')('should map multiple values', function () {
       ***
    });
```
asDiagram是指基于测试生成 PNG 弹珠图，生成弹珠图的原理是根据一些结构化的信息，加上一些如imagemagick的库，就可以生成如下的图了，更多的操作符对应的弹珠图例子可以再[rxmarbles.com][2]找到。
![图片描述][3]

```js
 var a = cold('--1--2--3--|');
 var asubs = '^          !';
 var expected = '--x--y--z--|';
 var r = a.map(function (x) { return 10 * x; });
 expectObservable(r).toBe(expected, { x: 10, y: 20, z: 30 });
 expectSubscriptions(a.subscriptions).toBe(asubs);
```
 这个测试的步骤是这样的
 - 创建一个 Observable a,a在第30帧传入1，第60帧传入2，第90帧传入3，第120帧complete。
 - 对a进行map操作的方法r，r将a中的每个值变为原来的10倍
 - 期待对a的进行方法r的操作后，在第30帧收到10，第60帧收到20，第90帧收到30，第120帧结束
 - 期待对a的订阅在第10帧开始，在第120帧结束

自己搭建环境？
----------
刚刚是我们用官网的例子结合一些辅助网站的资料，对弹珠测试进行的简单的了解，下面我们开始自己搭建一个可以自己写弹珠测试、运行测试的环境。

我们先使用和官网一样的第三方依赖创建环境，等我们慢慢熟悉这套之后，再换用其他第三方的依赖搭建环境。
ready go！

首先我们创建一个ts项目（最近ts写多了),并使用yarn安装基本的测试依赖。
```js
  "dependencies": {
    "@types/chai": "^4.0.10",
    "@types/mocha": "^2.2.45",
    "chai": "^4.1.2",
    "mocha": "^4.0.1",
    "rxjs": "^5.5.6",
    "ts-node": "^4.1.0",
    "typescript": "^2.6.2"
  },
  "scripts": {
    "test": "TS_NODE_FAST=true mocha --compilers ts:ts-node/register --opts spec/support/coverage.opts \"specs/**/*.spec.ts\""
  }
```

然后我依样画瓢的把对TestScheduler的包装方法copy了下，中间遇到一些写法不一样的部分稍作调整。
```js
import { TestScheduler, Observable } from 'rxjs';
import { SubscriptionLog } from 'rxjs/src/testing/SubscriptionLog';
import { ColdObservable } from 'rxjs/src/testing/ColdObservable';
import { HotObservable } from 'rxjs/src/testing/HotObservable';
export type observableToBeFn = (marbles: string, values?: any, errorValue?: any) => void;
export type subscriptionLogsToBeFn = (marbles: string | string[]) => void;

const testScheduler =  new TestScheduler(null);
export function hot(marbles: string, values?: any, error?: any): HotObservable<any> {
  return testScheduler.createHotObservable.apply(testScheduler, arguments);
}

export function cold(marbles: string, values?: any, error?: any): ColdObservable<any> {
  return testScheduler.createColdObservable.apply(testScheduler, arguments);
}

export function expectObservable(observable: Observable<any>,
                                 unsubscriptionMarbles: string = null): ({ toBe:observableToBeFn }) {
  return testScheduler.expectObservable.apply(testScheduler, arguments);
}

export function expectSubscriptions(actualSubscriptionLogs: SubscriptionLog[]): ({ toBe: subscriptionLogsToBeFn }) {
  return testScheduler.expectSubscriptions.apply(testScheduler, arguments);
}

export function time(marbles: string): number {
  return testScheduler.createTime.apply(testScheduler, arguments);
}
```
这样基本的hot cold方法就可以使用啦！

![图片描述][4]
下一篇 Fancy的弹珠图
----------
弹珠测试之所以能称之为弹珠测试，从字面意思上很容易猜测和弹珠图相关。
我们已经有一个基本的测试了，下一篇我们开始把它变成弹珠图吧。


  [1]:http://cn.rx.js.org/manual/usage.html
  [2]:http://rxmarbles.com/
  [3]:https://image-static.segmentfault.com/393/953/3939537179-5a420936db36b_articlex
  [4]:https://image-static.segmentfault.com/100/316/1003164343-5a42372e8eb27_articlex