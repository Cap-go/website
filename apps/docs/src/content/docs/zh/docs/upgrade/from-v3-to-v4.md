---
title: "从 V3 升级到 V4"
locale: zh
description: "如何从 Capgo updater V3 升级到 V4，了解有哪些重大变更以及如何处理它们"
sidebar:
  order: 3
---

## 为什么要升级

在 Discord 社区与您进行多次交流后，我发现手动模式太过手动且使用不安全，例如，无法自动回滚，所以如果在手动模式下更新失败，用户必须删除应用程序并重新安装，这是糟糕的用户体验。

同时，我借此机会给您更多的自由，并删除了我写的所有不好的代码。

## 安装

`npm i @capgo/capacitor-updater@4`

## 云端自动更新

如果您在应用中使用基本示例，则可以安全地迁移到新版本，尽情享受吧！

## 自托管自动更新

对于您来说，仍然很简单，变化如下：

* 设置名称从 `autoUpdateUrl` 改为 `updateUrl`
* 端点方法从 `GET` 改为 POST

## 手动模式用户

对于您来说，这是最重大的变化，但也是最好的！您将获得大量改进，请仔细阅读。

## 变更内容

* `autoUpdateUrl` 变为 `updateUrl`，因为此设置现在也可以在手动模式下使用
* 删除 `cancelDelay` 和 `delayUpdate`，改用 `setDelay`
* set 中不再有 `versionName`
* 将大多数函数中返回的 `version` 键改为对象 `BundleInfo`

```typescript
interface BundleInfo {
  id: string;
  version: string;
  downloaded: string;
  status: 'success' | 'error' | 'pending' | 'downloading'
}
```

* 重命名了容易误导的名称（即使解释起来可能不清楚，但在使用时很容易理解新名称）：
  * 以前称为 `version` 的现在指的是 `bundle`
  * `id` 指的是旧的 `version`，它是一个 10 个字符的随机字符串，这个 `id` 是访问您的包的唯一可靠且唯一的方式，例如 `7Dfcd2RedN`。
  * `version` 现在指的是您为包选择的 `versionName`，例如 `1.0.0`
* `updateUrl` 从 `get` 改为 `post`，因为自定义标头对某些人来说是个问题，而且 post 更符合逻辑，所有之前的标头都进入正文，前缀 `cap_` 消失了。
* `versionName` 方法被删除，改用 `getId`
* list 现在返回 `BundleInfo` 列表
* 将 `getId` 重命名为 `getDeviceId`
* `autoUpdate` 默认变为 true，如果您使用手动模式，请将其设置为 false。

## 新功能

* 方法 `getLatest`，此方法允许您从使用 `updateUrl` 设置的服务器获取最新可用版本。
* 方法 `setDelay`，它接受 `{`kind`:` "background" | "kill" | "nativeVersion" | "date", value? : string`}` 作为参数，将延迟设置为不同的模式。
* 方法 `next`，在下次进入后台时设置版本，与立即执行的 `set` 相反。
* 方法 `isAutoUpdateEnabled`，让您知道是否处于自动更新上下文中
* 事件 `downloadComplete`，当下载达到 100% 时触发
* 在 download 方法中添加了必需字段 `version`
* `notifyAppReady` 在手动模式下也变成必需的，如果在 10 秒后未调用，应用将回滚到之前的版本。

## 贡献者

[@lincolnthree](https://github.com/lincolnthree/) 非常感谢您启动这项工作，没有您就不可能完成这次更新。
