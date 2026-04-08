---
title: "从 V2 升级到 V3"
locale: zh
description: "一份关于从 Capgo updater 版本 2 过渡到版本 3 的综合指南，详细说明成功升级过程所需的步骤和注意事项"
sidebar:
  order: 4
---

本文档将解释如何升级到自动更新的版本 3。

## 首先迁移到最新的工具：

```bash
npm remove -g capgo
npm remove capacitor-updater

npm i @capgo/cli
npm i @capgo/capacitor-updater@3
npx cap sync
```

## 删除所有之前的配置：

```json
{
  CapacitorUpdater: {
      autoUpdateURL: "https...",
      ...
  },
}
```

只保留这个：

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true
  }
}
```

> ⚠️ 如果您使用的是自己的服务器，并配置了 `autoUpdateURL`，我会尽快为您更新本指南。同时，请查看新的上传选项 `external`，它允许您只发送 zip 文件的链接，而不是将代码存储在 Capgo 云中。这是为具有严格隐私政策的公司设计的。在 external 模式下，代码永远不会到达 Capgo 服务器，我们只存储 URL 并将其发送到设备，设备将直接下载它。在标准方式下，代码会被压缩并存储在我们的服务器上，但我们也不会打开或使用它。

## 变更内容

所有自动更新配置都变成了服务器端配置，让您更好地控制如何向用户发送更新。

这使我们能够回滚，甚至只向一个用户部署更新！以下设置已重新添加到 Web 界面：

* 禁用在原生版本以下回滚
* 禁用主要版本以上的更新

> ⚠️ 对于所有渠道，这些设置默认为 true

这也将减少频繁更新插件的需要，大多数更新将在服务器端完成，您无需在客户端做任何更改即可获得更新。

> ⚠️ 当更新成为默认版本时会重置，因此如果您不想在从应用商店更新时删除所有已下载的版本，请执行以下操作：

```json
{
  "CapacitorUpdater": {
    "autoUpdate": true,
    "resetWhenUpdate": false
  }
}
```

## 更新您的代码

最后，更新您在 JS 中的所有导入，从：

```
import { CapacitorUpdater } from 'capacitor-updater'
```

to

```
import { CapacitorUpdater } from '@capgo/capacitor-updater'
```

然后再次构建您的代码 `npm run build` 并再次复制资源 `npx cap copy`。

现在您应该能够测试最新的自动更新系统了

使用以下命令发送您的版本：

```
npx @capgo/cli@latest bundle upload
```

而不是

```
npx capgo upload
```

## 未来的演进

目前只使用第一个公共渠道，将来如果设置了多个公共渠道，公共渠道会变成多公共渠道。

## 常见问题：

* 升级后的构建问题：如果您已经在 Android Studio 或 Xcode 中打开了插件的源代码，有时同步不会删除它们，这就是问题的原因。打开原生 IDE 手动删除 `capacitor-updater`，然后执行 `npx cap sync` 即可解决。
