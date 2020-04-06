---
title: 另一种build方式——bili
---
### 另一种系列
原因是最近闲，想简单尝试和之前不一样的开发小工具，先来一波前端工程实践的。整个系列会从脚手架、CI、打包、样式、语义化版本号等各个不同部分尝试新的工具，基本上都会是比较简单的小例子，不求很精，但求有趣好玩。

### 自己问自己
如果前端build不用webpack，你会用啥？
我大概率不会退回去用grunt或者gulp之类的，在github发现一个比较简单容易上手的名为Bili，上手试过总结如下
- 和webpack相比，plugin支持较少比如最近在摆弄的gitverison，git-revision-webpack-plugin可以试试，但Bili未找到合适的
- 版本3官方文档找不到了，只能用版本4
- 用的人目前不多， 但上手容易，[官方文档][1]很简短，适合入门
- 优势，简单，快，不用过多关注
- 相比于前端复杂的build需求，更适合纯node的项目（需求相对统一 简单）

[个人demo地址][2]

### 以下内容来自Ctrl+C自 github介绍

#### Features

- 🚀 Fast, zero-config by default.
- 📦 Using Rollup under the hood.
- 🚗 Automatically transforms JS files using Buble/Babel/TypeScript.
- 💅 Built-in support for `CSS` `Sass` `Stylus` `Less` `CSS modules`.
- 🎶 Ridiculously easy to use Rollup plugins if you want.
- 🚨 Friendly error logging experience.
- 💻 Written in TypeScript, automatically generated API docs.



#### Documentation

https://bili.egoist.sh

#### Author

**bili** © EGOIST, Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by EGOIST with help from contributors ([list](https://github.com/egoist/bili/contributors)).

> [Website](https://egoist.sh) · GitHub [@EGOIST](https://github.com/egoist) · Twitter [@\_egoistlily](https://twitter.com/_egoistlily)


  [1]: https://bili.egoist.sh
  [2]: https://github.com/caoyangyang/mini-tools