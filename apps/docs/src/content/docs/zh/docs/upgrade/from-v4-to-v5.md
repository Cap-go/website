---
title: "从 V4 升级到 V5"
locale: zh
description: "如何从 Capgo updater V4 升级到 V5，需要注意哪些重大变更，这其实很简单"
sidebar:
  order: 2
---

## 为什么要升级

此主要版本是为了跟随 Capacitor 主要版本

首先按照 Capacitor 的迁移指南操作：

[https://capacitorjs.com/docs/updating/5-0](https://capacitorjs.com/docs/updating/5-0/)

## 安装

`npm i @capgo/capacitor-updater@5`

`然后同步原生代码更新：`

`npx cap sync`

就是这样！非常简单！

## 手动模式

如果您使用 getLatest 自己获取更新，这里有一个小变化。
现在如果您已经是最新版本，它将进入 catch。
任何与可用更新不同的响应都会这样做。
