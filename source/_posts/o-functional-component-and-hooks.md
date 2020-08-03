---
title: 函数式组件和hooks
date: 2020-08-03 22:00:00
tags: 前端
category: 杂
---


## 函数式组件
### 什么是函数式组件
- 你理解的函数式编程思想
- 组件X函数式

### 函数式组件和class 组件的区别
类组件和功能组件。区别非常明显。
类组件是ES6类，而功能组件是函数。函数式组件的唯一约束是接受props作为参数并返回有效的JSX。
```
//functional compoent
function Hello(props){
   return <div>Hello {props.name}</div>
}

//class compoent
class Hello extends Component{
   render(){
      return <div>Hello {this.props.name}</div>
   }
}
```
关键是缺少状态和生命周期方法。这就是为什么功能组件通常也称为`无状态组件`的原因。

### 为什么使用函数式组件
- 易于理解
> “The ratio of time spent reading versus writing (code) is well over 10 to 1 …  making it easy to read makes it easier to write.” --- Robert Marti 《Clean Code》

从时间成本来说，对你的小伙伴好，就尽量让ta看的懂你写的代码吧 ta会感激你的

- 易于测试
理论可推，如需demo 后续

- 性能提升
别人家的例子[45% Faster React Functional Components, Now][1]
但也有说性能变化不大的，具体by case来，后续有时间详细讨论


### 什么场景可以不用函数式组件
- 如果发现需要生命周期方法，或者具有小部件级别的状态是有意义的，可以考虑类组件。
- 转换成本过高，你更熟悉OO，代码库里面大规模试验类组件
- 已经在使用PureComponent并且符合规范，转变过来差异不大
[其他函数式组件的吐槽][2]

------------
## HOOKS

### hooks的来历，解决了什么问题
1. 在组件之间复用状态逻辑很难

以往复用逻辑
- Ctrl+C
- React.mixin
- hoc

2. 复杂组件变得难以理解
状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。
在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。这也给测试带来了一定挑战。同时，这也是很多人将 React 与状态管理库结合使用的原因之一。但是，这往往会引入了很多抽象概念，需要你在不同的文件之间来回切换，使得复用变得更加困难。

3. 难以理解的 class
class和其他语言class的区别，this的区别。
后续在预编译这块的阻力。


### hooks是什么？
基础 Hook
- useState
- useEffect
- useContext

额外的 Hook
- useReducer
- useCallback
- useMemo
- useRef
- useImperativeHandle
- useLayoutEffect
- useDebugValue

#### 哪些问题可以用hooks处理
- 状态处理 ≈ state
useState取代 this.state

- 副作用 ≈ 生命周期函数
useEffect取代 componentDidMount + componentDidUpdate + componentWillUnmount

- 状态管理 ≈ 小型redux
useReducer

### 为什么用hooks
#### 好处
- 复用更优雅
[复用例子][14]

- 更函数式

- 更声明式
声明式编程表明想要实现什么目的，应该做什么，但是不指定具体怎么做。
旧的思维：“我在这个生命周期要检查props.A和state.B（props和state），如果改变的话就触发xxx副作用”。这种思维在后续修改逻辑的时候很容易漏掉检查项，造成bug。
新的思维：“我的组件有xxx这个副作用，这个副作用依赖的数据是props.A和state.B”。从过去的 命令式 转变成了 声明式 编程。

#### hooks的原理
[React hooks: not magic, just arrays][12]
[React Hooks 原理 by 砖家][13]

#### hooks的特性
- value capture


### 如何使用hooks
[使用hook时因遵循的规则][5]
[useEffect 的完整指南][15]
我们可以使用哪些hooks
- [基本官方hooks][7]
- 第三方hooks 
[umihooks][6]改名 [ahooks][9] 3.8k
[react-hooks][10] 884 star
[beautiful-react-hooks][11]3.5k


参考
[React Function Components][3]
[React Hooks Migration][4]
[awesome-react-hooks][8]


[1]:https://medium.com/missive-app/45-faster-react-functional-components-now-3509a668e69f
[2]:https://www.freecodecamp.org/news/7-reasons-to-outlaw-reacts-functional-components-ff5b5ae09b7c/
[3]:https://www.robinwieruch.de/react-function-component
[4]:https://www.robinwieruch.de/react-hooks-migration
[5]:https://reactjs.org/docs/hooks-rules.html
[6]:https://hooks.umijs.org/zh-cn
[7]:https://reactjs.org/docs/hooks-reference.html
[8]:https://github.com/rehooks/awesome-react-hooks
[9]:https://github.com/alibaba/hooks
[10]:https://github.com/nikgraf/react-hooks
[11]:https://github.com/beautifulinteractions/beautiful-react-hooks
[12]:https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e
[13]:https://github.com/brickspert/blog/issues/26
[14]:https://juejin.im/post/6844903905449476103
[15]:https://overreacted.io/zh-hant/a-complete-guide-to-useeffect/
