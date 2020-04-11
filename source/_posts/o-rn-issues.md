---
title: Fix一个随机出现的键盘弹出的issue后的思考（ReactNative）
date: 2018-03-29 21:27:59
tags: ReactNative
category: 技术基础
---

最近花了近一周fix了一个移动端的bug，是个很有趣的bug，大概是这样的。这是一个比较长的故事，有兴趣的可以一直看。

## 是一个什么样的bug##
bug的表现是在一款tablet端应用***使用很久***之后，第一，在输入框内输入一些内容后，点击done/search，第二，然后点击页面的一些***空白区域***，软键盘弹出，并且光标focus在***最近输入过的***输入框内。

此时应用对用户行为的响应会让用户很疑惑和费解。
总结，它有如下几个特点
 1. 应用最开始是正常的，**不是每次**都能重现
 2. 一旦出现这个bug，在**每一个**存在输入框的页面都存在这个问题
 3. 重现的场景不明，目前已知是应用使用的**越久**越容易出现，应用一旦后台关闭病重新启动，又会消失。

## 如何去修复这个bug##
### 第一步 试图稳定重现###
我们先是试图去找一个最小的用户journey去复现这个bug，当时运气比较好，花了大概半天时间找到了一条最小的重现路径。

不说业务背景，简单介绍下应用的页面逻辑。

我们的应用在登录之后有一个home页面，home页面存在三个tab可以滑动或者点击切换，
在tab页面之上还存在一些功能菜单，其中某个功能菜单menuA可以点击跳到另一个新的带有一个输入框的页面。

页面大概如下，不是专业ux很丑勿见怪。
![图片描述][1]

我们发现的一条可以快速重现的路径是
1. 登录到达home页面后，**反复切换**三个tab多次（20次以上）
2. 点击menuA到达一个带输入框的页面
3. 在输入框输入数据，并点击软键盘的done
4. 点击页面空白区域
5. 然后软键盘就出来了。

### 第二步 试图从代码部分找到为什么最小场景会出现问题###
 找到一个最小重现路径之后，我们可以从代码里面找找为什么会出现这个问题。
因为这个bug在应用重启后没有，我们怀疑的方向就定位在render的问题，大概率是出在组件上。
我们中间有几个猜测
1. 自己封装的input组件有问题
2. 三个tabs的滑动组件有问题，滑动组件内的scroll view影响了RN的**手势响应系统**
最后发现貌似都不是，这个时候和组内另外一个同事pair，她发现在请求比较多的时候容易有问题，中间还怀疑过网络请求处理导致的。这个怀疑其实不大对，但是确实为我们找到了一条路。

因为我们最后发现   

我们所有的网络请求都在请求结果返回之前，在页面出现一层**蒙版mask**以及loading提示符号（在RN里面是ActivityIndicator），这个部分是会影响**页面render**的。

而把这部分去掉（在请求到达之前不出现蒙层），这个bug就没有了，这个发现当时还是让人很震惊的以及疑惑的，因为似乎找到了一部分原因但我们还是没搞清楚为什么。



### 第三步 尝试修复（未弄清根本原因的情况下）###
有了这个思路的提示，我们试图尝试修复。按照业务需求，我们不能取消ActivityIndicator的使用，因为给用户适当的提示这个确实很有必要，所以我们试图去修改mask的实现。

在老的mask里面
我们使用了一个第三方的RN组件[react-native-root-siblings][2]来帮助我们在root同级插入一个兄弟元素显示我们的loading提示符号。

一般在发完请求请求结果未到达之前，我们就插入一个新的同级兄弟元素，请求完成后就删除掉它。

当时怀疑因为这部分反复的修改页面的元素结构，就把**new-destory**的逻辑换成了**new-update**的逻辑，减少了元素的修改。
update的时候只是去让ActivityIndicator不出现似乎被hide了。

### 第四步 测试bug是否还能重现###
我们希望通过减少页面元素反复的删除创建，来fix这个bug，结果怎么样呢？

居然神奇的很难复现了，我们很开心，虽然还是没弄懂原因。

后面QA说在真机上还是遇到了几次，让我们更是费解，费解的是出现的**概率确实变少**了，但为啥还会出现？

### 第五步 分析bug产生的根本原因###
这个时候我们需要了解bug产生的真正原因了。
我们重新回到这个bug的表现，为什么点击空白区域会触发TextInput的focus方法？我们尝试做了这样的事情。


---

**找出在会触发TextInput的focus的地方，会不会是被错误的调用了。**

除了在代码逻辑里面少量的通过绑定ref然后触发.focus方法（因为是少量出现，不符合我们这个bug一出现所有input都受影响的情景，快速排除不是这部分原因），我们发现在RN提供的TextInput组件里面也有很多地方会调用到focus方法。

大概查找的路径是文件node_modules/react-native/Libraries/Components/TextInput/TextInput.js中发现多处this.focus()的调用，除了正常的onFocus事件的绑定以及autoFocus，有一个在_onPress里面的调用感觉很奇怪，暂时放着

```
    _onFocus: function(event: Event) {
      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
      if (this.props.selectionState) {
        this.props.selectionState.focus();
      }
    },
    //奇怪的地方
    _onPress: function(event: Event) {
      if (this.props.editable || this.props.editable === undefined) {
        console.log('------> _onPress',event);//log
        this.focus();
      }
    },
```
先打了一段log,发现点击空白区域的时候，真的被触发了呀，当然点击输入框也会触发，二者的表现一样一样的。

![图片描述][3]

**结论**
没法确认是不是被错误的调用了，但确实是被调用了，我们去找找调用的地方看有什么线索。
看到target里面的ResponderSyntheticEvent了吗，找到这个文件打几行log 有惊喜。

---

**在ResponderSyntheticEvent打日志获取更多信息，并对比正常和有bug时候的异同**
 
如下
```
function ResponderSyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  console.log('-->response',dispatchConfig.registrationName,nativeEventTarget);
  return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}
```

你会发现你点击页面的任何一个区域都会在console出现这样的记录
![图片描述][4]

并且任何一个点击的响应一般都会有如下四个阶段
- onResponderGrant
- onResponderStart
- onResponderEnd
- onResponderRelease
然后试图重现bug，看看log有没有什么不一样，果然被逮住了。
![图片描述][5]

其中绿色部分的log是正常的，红色划线是不正常的，发现是输入框（1387）这个node grant了手势响应但是后面手势开始是空白区域（1398），最终空白区域（1398）影响了输入框（1387）。

**结论**
正常情况下四个事件依次触发，出现bug的情况下input的onResponderGrant被调用后面是空白区域的onResponderStart被调用，和其他对比之后，发现onResponderGrant不应该被调用。

---

**了解手势响应系统**

还是很疑惑为什么最开始input框（1387）会grant呢？这部分涉及对手势的响应，去rn的官网上面我们去了解一下手势响应系统，看到提到

>具体的实现在ResponderEventPlugin.js文件中，你可以在源码中读到更多细节和文档。

然后找到react/lib/**ResponderEventPlugin**.js文件，

在多个地方（主要是**setResponderAndExtractTransfer**方法内）找到**ResponderSyntheticEvent**（老朋友了，之前在ta那里打过log）的调用,比如
```
 var grantEvent = ResponderSyntheticEvent.
getPooled(eventTypes.responderGrant, 
wantsResponderInst, nativeEvent, nativeEventTarget);
 
```

 而 **setResponderAndExtractTransfer** 方法是否调用取决于canTriggerTransfer方法的返回值。

```
 var extracted = canTriggerTransfer(topLevelType, targetInst, nativeEvent) ? setResponderAndExtractTransfer(topLevelType, targetInst, nativeEvent, nativeEventTarget) : null;
    
```
细看**canTriggerTransfer**方法
```
function canTriggerTransfer(topLevelType, topLevelInst, nativeEvent) {
    console.log('-->response c3', trackedTouchCount, trackedTouchCount > 0);
  return topLevelInst && (
  // responderIgnoreScroll: We are trying to migrate away from specifically
  // tracking native scroll events here and responderIgnoreScroll indicates we
  // will send topTouchCancel to handle canceling touch events instead

  topLevelType === EventConstants.topLevelTypes.topScroll &&
  !nativeEvent.responderIgnoreScroll || trackedTouchCount > 0 &&
  topLevelType === EventConstants.topLevelTypes.topSelectionChange ||
  isStartish(topLevelType) || isMoveish(topLevelType));
}
```
其实这个地方的log最开始打了好多，最好发现是**trackedTouchCount**值不一样导致的。
同时去能够影响trackedTouchCount值的地方加一些log

```
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    if (isStartish(topLevelType)) {
      trackedTouchCount += 1;
      console.log('-->response trackedTouchCount+1',trackedTouchCount,topLevelType,nativeEventTarget);
    } else if (isEndish(topLevelType)) {
      if (trackedTouchCount >= 0) {
        trackedTouchCount -= 1;
          console.log('-->response trackedTouchCount-1',trackedTouchCount,topLevelType,nativeEventTarget);
      } else {
          console.log('-->response trackedTouchCount null',trackedTouchCount,topLevelType);
          console.error('Ended a touch event which was not counted in `trackedTouchCount`.');
        return null;
      }
    }
    ***
    }
```
简单描述下这条依赖关系,但其实并不确定是不是在有bug情况下trackedTouchCount值不一样，先留一个假设。
- 变量trackedTouchCount
- 方法canTriggerTransfer返回值
- 方法setResponderAndExtractTransfer
- 影响grantEvent执行
  

在控制台仔细观察，随便点击几下，得到如下的截图，
![图片描述][6]
这是在正常未出现bug的情况下，**trackedTouchCount**的值在0和1之间摆动，当tounchstart的时候+1，在touchend的时候-1。

我们再去重现bug，当我们去反复切换tab的时候，看看日志有什么区别。

![图片描述][7]

**简单分析**

有一条toucnStart的记录987没有对应的TouchEnd，导致trackedTouchCount没法复位为0。
为什么在反复切换tab的时候，会出现这样有toucnStart而没有toucnEnd的情景，想了下发现是每次切换tab其实是做了这么几件事情
- 点击tab页签
- 页面出现mask（new一个新的）
- 页面请求数据
- 数据response到达（destroy mask）
但如果频繁点动tab页签，其实某些边界时刻，点到的是mask，对应mask的node的toucnStart被触发，然后请求即将到达，mask被destroy了，toucnEnd永远都不会被触发了。

所以当我们把mask的实现从**new-destroy**改成**new-update**的时候，保证了toucnEnd最终能够被触发了。

**归纳**
1. mask的老的实现，导致mask的toucnEnd事件某些状况不会被响应，
2. 影响了变量trackedTouchCount的值得正确性（永远无法恢复为0 ），
3. 影响方法canTriggerTransfer返回值在页面有input的时候为true，
4. 影响方法setResponderAndExtractTransfer中的grantEvent的被错误执行，
5. 最终导致focus的时候input被错误的grant，
6. 然后点击其他任何空白区域都会触发input。

##什么情况下 会再次发生##
这一次我们定位了这个issue的问题，并且使用了一些不是完全fix的方法，让这个bug不会由于mask的频繁使用而出现。
但有没有可能在其他的业务场景或者写代码的过程中再次引入这个bug呢？ 答案是肯定的。

后续在team 内我们再次fix过几次类似的问题，简单总结如下：
- 场景1 ： 给某个业务实体（人 或 物） 添加备注标签，在输入栏输入并按回车后就会生成新的备注标签，备注标签上会有一个小叉叉，点击小叉叉可以删除这个备注标签。一旦删除某个备注标签，就会重现。

- 场景2： 在某个页面，会展示一些实体（物）的详细信息，因为信息比较多，我们做了一个flip的效果，点击后会翻转展示更多，在点一下就会回到之前的，就像一个扑克牌的两面，一面是花纹，一面是具体的大小比如K。 如果连续多次翻转，就会重现。

这两个场景，以及我们最初遇到的mask的场景，看似没有任何联系，但是最终都会触发软键盘莫名显示的问题，其根本原因和之前mask的一致，都是trackedTouchCount这个变量被改坏了。

那为什么这几个场景都会改坏这个变量呢？
在排查的过程中，我们发现一旦出现某个页面元素（或者在RN的语境下称之为组件比较合适）被删除，而页面元素上的onPressOut没来得及触发，就会出现此类的问题。
这是RN事件响应系统的问题，一般很难去修改底层库，我们目前的解决办法基本上是
1. 不频繁反复的删除新建同样的页面元素，让同一页面元素保持住，或者减少其删除重新新建的次数（mask 和翻转的例子）；
2. 不使用onPressIn事件去触发删除某些正在显示的组件（备注标签的例子）；


##其他##
另外一个在github上面报的因为trackedTouchCount变量不正确状态导致的issue

[[ListView\]Scroll on ListView end with an error saying "Ended a touch event which was not counted in trackedTouchCount"][8]
有兴趣的可以看看。

  [1]: https://image-static.segmentfault.com/420/798/4207989571-5abcfdade5d2e_articlex
  [2]: https://github.com/magicismight/react-native-root-siblings
  [3]: https://image-static.segmentfault.com/215/641/2156416929-5abddeec42371_articlex
  [4]: https://image-static.segmentfault.com/365/835/3658356774-5abddfb37cd50_articlex
  [5]: https://image-static.segmentfault.com/264/253/2642539890-5abde14196b6f_articlex
  [6]: https://image-static.segmentfault.com/939/636/939636576-5abde6e1b1c0e_articlex
  [7]: https://image-static.segmentfault.com/409/122/4091221475-5abde7c932de7_articlex
  [8]: https://github.com/facebook/react-native/issues/1139