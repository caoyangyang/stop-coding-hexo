---
title: 关于Elixir学习的101？
date: 2017-01-08 21:27:59
tags: Elixir
category: 技术基础
---
## Elixir 初尝试 0 --环境安装
这一篇是从我自己的笔记里面搬出来的，所以有些描述会过于简洁。

### Elixir开始耍
最近无聊，逛ruby社区，发现一个词貌似很火（原谅我最近没读书看报），好奇心又蹦出来了，就开始了学习elixir的道路。
 
### 安装Elixir
安装只需一行命令
brew install elixir
但是实际安装的东西仔细观察，会发现大概包含相关依赖jpeg, libtiff, wxmac, erlang
具体每个做什么的 请自行参考维基百科。

```
➜  ~ brew install elixir
==> Installing dependencies for elixir: jpeg, libtiff, wxmac, erlang
==> Installing elixir dependency: jpeg
==> Downloading https://homebrew.bintray.com/bottles/jpeg-8d.el_capitan.bottle.2.tar.gz
######################################################################## 100.0%
==> Pouring jpeg-8d.el_capitan.bottle.2.tar.gz
?  /usr/local/Cellar/jpeg/8d: 19 files, 713.7K
==> Installing elixir dependency: libtiff
==> Downloading https://homebrew.bintray.com/bottles/libtiff-4.0.6_1.el_capitan.bottle.tar.gz
######################################################################## 100.0%
==> Pouring libtiff-4.0.6_1.el_capitan.bottle.tar.gz
?  /usr/local/Cellar/libtiff/4.0.6_1: 261 files, 3.4M
==> Installing elixir dependency: wxmac
==> Downloading https://homebrew.bintray.com/bottles/wxmac-3.0.2_2.el_capitan.bottle.tar.gz
######################################################################## 100.0%
==> Pouring wxmac-3.0.2_2.el_capitan.bottle.tar.gz
?  /usr/local/Cellar/wxmac/3.0.2_2: 809 files, 23.7M
==> Installing elixir dependency: erlang
==> Downloading https://homebrew.bintray.com/bottles/erlang-18.3.el_capitan.bottle.2.tar.gz
######################################################################## 100.0%
==> Pouring erlang-18.3.el_capitan.bottle.2.tar.gz
==> Caveats
Man pages can be found in:
  /usr/local/opt/erlang/lib/erlang/man
 
Access them with `erl -man`, or add this directory to MANPATH.
==> Summary
?  /usr/local/Cellar/erlang/18.3: 7,388 files, 272.9M
==> Installing elixir
==> Downloading https://homebrew.bintray.com/bottles/elixir-1.3.1.el_capitan.bottle.tar.gz
 
######################################################################## 100.0%
==> Pouring elixir-1.3.1.el_capitan.bottle.tar.gz
?  /usr/local/Cellar/elixir/1.3.1: 383 files, 5M
```

### hello world 之旅
第二步是开始一个“hello world”之旅
但听说elixir的一个框架还不错，名字也很厉害叫做phoenix，决定写个简单的API 来返回“hello world”吧
然后又开始安装的道路。
 
官网介绍先需要利用mix命令（安装完Elixir就会自动get到的一个命令）安装Hex，Hex是个什么东东，官网的介绍是The package manager for the Erlang ecosystem，简单来说就是Erlang生态圈的包管理器，基本上就是npm之于node，gem之于ruby。
```
➜  ~  mix local.hex
Are you sure you want to install archive "https://repo.hex.pm/installs/1.3.0/hex-0.14.1.ez"? [Yn] y
* creating .mix/archives/hex-0.14.1
```

### Phoenix
这样还不能开始，检查下 Elixir and Erlang是不是都有了，就开始安装凤凰侠吧！
```
➜  ~ mix archive.install https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez
Are you sure you want to install archive "https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez"? [Yn] y
* creating .mix/archives/phoenix_new
```
如果安装失败，就去官网下个包放在文件系统，然后run下命令  
```
mix archive.install /path/to/local/phoenix_new.ez
```
应该也是可以滴，人家官网如是说：
```
Note: if the Phoenix archive won't install properly with this command, we can download the package from the Phoenix archives, save it to the filesystem, and then run: mix archive.install /path/to/local/phoenix_new.ez.
```

这个命令同样也是一个命令安装了很多的默认包如Plug, Cowboy, and Ecto，
另外如果需要使用 brunch.io来编译一些静态部分，需要用npm，npm默认需要node。

最后关于elixir这个语言的一些框架 第三方可用组件信息在github也有前人做了收集，叫做[awesome-elixir][1].



##  Elixir 初尝试 1 -- 这里的等号不一样 & 不变的数据
### Elixir是个什么鬼
自行百度维基google

### Elixir 这里的等号不一样
当等号‘=’不是赋值，而是匹配（match opertator），变得更像断言，更像我们初中开始学代数的时候。
P.S. 
^(脱字符)，强制让变量的已有值参与匹配


### Elixir 函数式编程--不可变的数据 才是好用的数据
编程就是进行数据转换，而不是数据修改。所以我们期待
```
some_value=[some_object];
print(some_value);
do_something_with(some_value);
print(some_value);
```

前后两次打印的变量并没有变，应该说此时变量都不能称之为变量，叫它为值更合适些。
而函数则是对值进行变换的引擎，一切魔法所在。

按常规想法，因为elixir的值都是不可变的，所以在进行转换的时候，需要一个副本，涉及到copy，性能很渣吧，NO
原因是既然值都是不变的，直接拿来用就好了。
比如
```
iex(9)> list1=[2,3,4,1]
[2, 3, 4, 1]
iex(10)> list2 =[6|list1]
[6, 2, 3, 4, 1]
```
list2 就是直接使用list1作为尾项，用6作为首项生成的[2,3,4,1]的值也不会变。

## Elixir 初尝试 2 -- 模式匹配&等号&函数
### 啥模式匹配，不仅仅是正则？
谈到模式匹配，最开始很容易想到正则上面去，但是在Elixir里面，最基本的等号，以及函数调用都涉及到模式匹配。这到底是怎么回事呢？

### 等号和模式匹配
以等号为例，在前面简单说过，Elixir里面等号并不代表的是赋值，等号符号是匹配运算符（match operator），
如例子中所示
```
iex(1)> a=1
1
iex(2)> [x,y,_]=[2017.1,"hello","world"]
[2017.1, "hello", "world"]
iex(3)> x
2017.1
iex(4)> y
"hello"
```
并不是将右项赋值给左项，而是Elixir试图让等号左边等于等号右边，当等号两边的值以及数据结构完全匹配的时候，才算成功，这个过程叫做模式匹配。

### 函数和模式匹配
Elixir中最常见到的就是各种函数，下面是一个最简单的函数
```
iex(1)> swap = fn{a,b}-> {b,a} end
#Function<6.50752066/1 in :erl_eval.expr/5>
iex(2)> swap.({1,2})
{2, 1}
```
在调用函数swap的时候，如果是按照原来js或者java的思维，我们可以认为是将1赋值给a，2赋值给b。但Elixir中没有赋值的概念，实际上是对值进行模式进行模式匹配。

下面的例子更好的说明在函数调用时的函数匹配，反复出现的斐波那契数列在elixir的实现
```
defmodule Factorial do
 def of(0), do: 1
 def of(n), do: n*of(n-1)
end
```
是不是更清晰呀

### 模式匹配不够用，哨兵子句来凑
如果需要在函数调用的参数部分做更多的分支，单靠模式匹配根本不够。这个时候可以找下帮手——哨兵子句。
还是用那个用烂了的例子斐波那契数列，我们希望只对正数处理，当然你可以写成这种
```
defmodule Factorial do
 def of(0), do: 1
 def of(n), do: n>0&&n*of(n-1)||0
end
```
在计算部分加入判断的逻辑，还有一种如下
```
defmodule Factorial do
 def of(0), do: 1
 def of(n) when n>0, do: n*of(n-1)
end
```
这就是哨兵子句，在函数调用时，先执行模式匹配，在模式匹配通过的时候，哨兵子句的条件也满足的状况下，才会执行代码块。
模式匹配很好用，但也不是万能的。

## Elixir 初尝试 3 -- Enum和她的方法们
### Enum是啥子鬼
先聊Enum可能需要先了解下Elixir的收集（collection），Elixir的收集类型可以包含任意类型的值。
常见的收集类型的数据类型有元组，列表，散列表，二进制型，字典，区间甚至可以自定义收集类型。

各种收集类型各不相同，但肯定共同点是存在的嘛。它们的共同点是都可以对它们进行遍历。
我们可以使用Enum进行迭代、过滤、组合、分割和其他收集方法。下面就是Enum和她的方法们的show。

### Enum 的方法show
大部分时候，我们处理数据可以分为，**筛选数据**、**转换数据**、**整理数据**
#### 筛选
根据位置查找
```
iex(9)> Enum.at(1..10,0)
1
iex(10)> Enum.at(1..10,2)
3
```
根据条件过滤
```
iex(29)> list= Enum.to_list 1..10
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
iex(30)> Enum.filter(list,&(&1 * &1>30))
[6, 7, 8, 9, 10]
iex(31)>
```

#### 转换
变为列表
```
iex(6)> Enum.to_list 1..6
[1, 2, 3, 4, 5, 6]
```

合并
```
iex(5)> Enum.concat([1,2,3],[5,8])
[1, 2, 3, 5, 8]
```
映射
```
iex(7)> Enum.map((Enum.to_list 1..6),&(&1*&1))
[1, 4, 9, 16, 25, 36]
```

取最大值
```
iex(32)> Enum.max ['12',12,"hello"]
"hello"
```

字符串拼接
```
iex(33)> list=["hello","world","elixir","erlang","vm"]
["hello", "world", "elixir", "erlang", "vm"]
iex(34)> Enum.join list
"helloworldelixirerlangvm"
iex(35)> Enum.join(list, ",")
"hello,world,elixir,erlang,vm"
```

#### 整理
排序
```
iex(31)> Enum.sort ["hello","world","elixir"]
["elixir", "hello", "world"]
```

 ## Elixir 初尝试 4 -- 函数中的管道运算符
 ### 函数是干嘛的
 答案：进行*数据转化*，得到你想要的数据的的,举个栗子
 你有大家考试的成绩单（数据），但是你想排个序（转化），得到一个成绩排名（想要的数据）。
 这个时候你可能需要一个排序的函数了。
 
 
 ### 函数长啥样子
 答案：
 * 匿名函数用fn关键字创建，形如
 ```
 fn 
   parameter-list -> body
   parameter-list -> body  ...
 end
 ```
 
 * 命名函数必须写在模块里面，用def声明，形如
 ```
 defmodule ModuleName do
   def functionName(parameter-list) do
   ...
   end
 end
 ```
 
 其中body，以及do...end的部分就是函数体（代码块）
 
 ### 如何编译运行
 假设我们已经写好一个模块叫moduleA，并且把它保存为moduleA.exs,里面有一个模块moduleA以及方法functionB，如何执行方法呢？
 
 * 初始进入命令行，未进入iex
 ```
 iex moduleA.exs
 iex>moduleA.functionB parameter-list
 ```
 * 已进入iex
 ```
 iex> c "moduleA.exs"
 iex>moduleA.functionB parameter-list
 ```
 
 ### 如何写漂亮的Elixir函数
 函数就是做各种数据转换，转换的时候我们需要依据一定的规则（流程控制）进行数据的变换（运算）
 其中流程控制有我们之前提到过的模式匹配，哨兵子句，还有我们在其他语言里面已经很熟悉的if，但这次都不会具体聊这些。
 我其实只想聊一下，怎么让函数变漂亮
 假设我们选择有几个函数，order_by_grade,fetch_top_ten,select_by_subject,
 已经一份未排名的各科成绩单 grade_list，要得到数学成绩前十名的信息
 大概我们会这么做
 ```
 fetch_top_ten(order_by_grade(select_by_subject(math)))
 ```
 这里想给大家抛出另一个优雅些的方式，对你不笨就是管道
 ```
 select_by_subject(math)
 |>order_by_grade()
 |>fetch_top_ten()
 ```
 管道是一种在linux常见的用法，把一个命令的输出结果，作为下一个命令的输入
 在我们这里，就是|>运算符获得左边表达式的结果，并将其作为右边函数的第一个参数。
 因为运算符优先级的问题（怀恋clojure），适当的时候需要对管道运算符前后的参数使用括号。
 
 ## Elixir 初尝试 5 -- 遇见Actor
 
### Actor模型的定义
wiki如是说
```
The actor model in computer science is a mathematical model of concurrent computation that treats "actors" as the universal primitives of concurrent computation. In response to a message that it receives, an actor can: make local decisions, create more actors, send more messages, and determine how to respond to the next message received. Actors may modify private state, but can only affect each other through messages (avoiding the need for any locks).
```
 
 
 




[1]:https://github.com/h4cc/awesome-elixir

