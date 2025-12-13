---
title: "从 V6 升级到 V7"
locale: zh
description: "一份关于从 Capgo updater 版本 6 过渡到版本 7 的详细指南，概述成功升级过程所需的步骤和注意事项，确保与最新的 Capacitor 功能和改进兼容。"
sidebar:
  order: 2
---

## 为什么要升级

此主要版本是为了跟随 Capacitor 主要版本

首先按照 Capacitor 的迁移指南操作：

[https://capacitorjs.com/docs/updating/7-0](https://capacitorjs.com/docs/updating/7-0/)

## 安装

`npm i @capgo/capacitor-updater@7`

`然后同步原生代码更新：`

`npx cap sync`

就是这样！非常简单！

## 加密迁移

如果您正在使用 `key-v1` 加密方法，您需要迁移到新的加密系统，因为 V7 不再支持 `key-v1`。[[memory:96112]]

请按照此处的加密迁移指南操作：[加密迁移指南](/docs/cli/migrations/encryption/)

## 配置变更

我们建议在您的 `capacitor.config` 文件中添加以下属性：
- `capacitorUpdater`
- `appId`
- `version`
- `autoUpdate`

这些设置应该有助于更好地管理插件及其行为。


