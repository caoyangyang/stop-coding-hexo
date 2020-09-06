---
title: wrk介绍
date: 2020-09-01 23:00:00
tags: 压测
category: 工具
---
## WRK介绍
> wrk is a modern HTTP benchmarking tool capable of generating significant load when run on a single multi-core CPU. It combines a multithreaded design with scalable event notification systems such as epoll and kqueue.

个人使用体会，不是最好的，但绝对是上手最快的，建议先用wrk入门，了解压测这件事，再去思考理论以及工具层的选用。


## WRK 使用
参考[github][1]

### 安装
mac机器
```bash
brew install wrk
```

### 基本命令行使用
常见命令参数
- c 连接数
- d 压测持续时间
- t 压测启用线程数
- s 指定脚本
- H 请求header

比如压百度的一个api请求
```bash
➜  ~ wrk -c 100 -t 2 -d 30 https://www.baidu.com
Running 30s test @ https://www.baidu.com
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   927.41ms  476.69ms   1.99s    65.50%
    Req/Sec     8.94      6.28    30.00     76.43%
  380 requests in 30.00s, 6.21MB read
  Socket errors: connect 0, read 0, write 0, timeout 151
Requests/sec:     12.67
Transfer/sec:    212.08KB
```

### 脚本使用

常用脚本
- report.lua
统计不同分为的请求时延

```lua
-- example reporting script which demonstrates a custom
-- done() function that prints latency percentiles as CSV

done = function(summary, latency, requests)
   io.write("------------------------------\n")
   for _, p in pairs({ 50, 90, 99, 99.999 }) do
      n = latency:percentile(p)
      io.write(string.format("%g%%,%d\n", p, n))
   end
end
```

- post.lua
```lua
-- example HTTP POST script which demonstrates setting the
-- HTTP method, body, and adding a header

wrk.method = "POST"
wrk.body   = "foo=bar&baz=quux"
wrk.headers["Content-Type"] = "application/x-www-form-urlencoded"
```



[1]:https://github.com/wg/wrk

