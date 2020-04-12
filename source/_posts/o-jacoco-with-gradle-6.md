---
title: gradle 6 with jacoco
date: 2020-04-12 21:27:59
tags: 测试实践
category: java
---

### jacoco作用
生成测试覆盖报告，可以集成在build环境中，保证代码的测试覆盖率高于基线。

### 配置
因为gradle6 以后，有些配置的设置方式发生了改变，这篇博客用来mark一下
[官方文档][1]
最终配置如下，其中classDirectories.setFrom的设置方法和以前不一样。

```groovy
plugins {
    id "java"
    id "jacoco"
}

jacoco {
  toolVersion = "0.8.5"
}
jacocoTestReport {
  reports {
    xml.enabled false
    csv.enabled false
    html.destination file("${buildDir}/reports/jacoco")
  }
  afterEvaluate {
    classDirectories.setFrom(files(classDirectories.files.collect {
      fileTree(dir: it, exclude: ['**/**/model/**','**/**/dto/**','**/**/**Exception','**/**/**Controller'])
    }))
  }
}
jacocoTestCoverageVerification.dependsOn jacocoTestReport
jacocoTestCoverageVerification {
  violationRules {
    rule {
      limit {
        minimum = 0.6
      }
    }

    rule {
      enabled = false
      element = 'CLASS'

      limit {
        counter = 'LINE'
        value = 'TOTALCOUNT'
        maximum = 0.9
      }
    }
  }
}

```

以前老的设置方法如下
```groovy
jacocoTestReport {
    afterEvaluate {
        classDirectories = files(classDirectories.files.collect {
            fileTree(dir: it,
                exclude: ['**/**/model/**'])
        })
    }
}

```

[1]:https://docs.gradle.org/current/userguide/jacoco_plugin.html
