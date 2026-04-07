---
title: "加密"
description: "如何使用加密 v2 加密您的数据,保护您的应用并确保只有您才能使用您的更新来更新您的用户"
locale: zh
sidebar:
  order: 5
---

本文档说明如何迁移到加密 v2 系统。在[博客文章](/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing)中了解有关加密 v2 系统的更多信息。

## 1. 创建密钥对

```bash
npx @capgo/cli key create
```

:::warning
安全存储私钥。切勿将其提交到源代码管理或与不受信任的方共享。
:::

此命令:
- 在您的应用中创建新的密钥对
- 从 Capacitor 配置中删除旧密钥
- 保留旧密钥文件以实现向后兼容

## 2. 更新 Capacitor 配置

当提示"您想使用新频道设置加密以支持旧应用并促进迁移吗?"时,选择是。这会在您的 Capacitor 配置中添加新的 `defaultChannel` 选项。

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  plugins: {
    CapacitorUpdater: {
      // ... 其他选项
      defaultChannel: 'encryption_v2' // 新应用将使用此频道
    }
  }
};

export default config;
```

## 3. 上传 Bundle 到新频道

```bash
npx @capgo/cli bundle upload --channel encryption_v2
```

## 4. 启用自我分配

:::caution
`defaultChannel` 选项需要此功能才能工作
:::

```bash
npx @capgo/cli channel set encryption_v2 --self-assign
```

## 5. 上传到旧频道

```bash
npx @capgo/cli bundle upload --channel production
```

:::tip
Capacitor 配置永远不会上传到 Capgo
:::

## 6. 清理(3-4 个月后)

一旦所有用户更新了他们的应用:

1. 从 Capacitor 配置中删除 `defaultChannel`
2. 删除旧频道:

```bash
npx @capgo/cli channel delete encryption_v2
```

:::note
使用 `encryption_v2` 作为默认频道的应用将在删除后切换到 `production` 频道
:::
