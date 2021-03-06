# ConsoleiT Frontend
ConsoleiT 的前端代码

[![bitHound Overall Score](https://www.bithound.io/github/CircuitCoder/ConsoleiT-Frontend/badges/score.svg)](https://www.bithound.io/github/CircuitCoder/ConsoleiT-Frontend)
[![bitHound Dependencies](https://www.bithound.io/github/CircuitCoder/ConsoleiT-Frontend/badges/dependencies.svg)](https://www.bithound.io/github/CircuitCoder/ConsoleiT-Frontend/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/CircuitCoder/ConsoleiT-Frontend/badges/devDependencies.svg)](https://www.bithound.io/github/CircuitCoder/ConsoleiT-Frontend/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/CircuitCoder/ConsoleiT-Frontend/badges/code.svg)](https://www.bithound.io/github/CircuitCoder/ConsoleiT-Frontend)
[![Build Status](https://travis-ci.org/CircuitCoder/ConsoleiT-Frontend.svg?branch=master)](https://travis-ci.org/CircuitCoder/ConsoleiT-Frontend)

## 安装
在 git clone 完成以后，首先请将 `ts/config.example.ts` 重命名为 `ts/config.ts` ，修改其内容，随后在项目目录下执行以下指令:
* `npm install`
* `npm run typings install`
* `npm run gulp build:production`

这会在项目根目录下生成 dist 目录，其中包含生成的资源

### 开发
请使用 Gulp => 4.0 版本

安装:
```
npm install gulpjs/gulp#4.0
```

运行开发服务器
```
npm run typings install
npm run gulp
```

## 维护者
- [刘晓义](mailto:circuitcoder0@gmail.com)

## 版权与协议
Copyright 2016 北京市高中生模拟联合国协会

本项目所有代码在 AGPL-3.0 协议下公开。细节请查阅 LICENSE 文件
