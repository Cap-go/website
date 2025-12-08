---
title: "重大变更"
description: "如何使用版本化渠道处理重大变更"
sidebar:
  order: 6
locale: zh
---

本文档解释了如何使用版本化渠道处理应用中的重大变更。这种方法允许您维护应用的不同版本,同时确保用户收到兼容的更新。

## 示例场景

假设您有:
- 应用版本 1.2.3(旧版本)- 使用 production 渠道
- 应用版本 2.0.0(具有重大变更的新版本)- 使用 v2 渠道
- 实时更新 1.2.4(与 1.2.3 兼容)
- 实时更新 2.0.1(与 2.0.0 兼容)

## 策略:始终为主要版本使用 defaultChannel

**推荐方法:** 为每个主要版本设置 `defaultChannel`。这确保您始终可以向特定用户组推送更新,而无需依赖动态渠道分配。

```ts
// 版本 1.x 发布
defaultChannel: 'v1'

// 版本 2.x 发布
defaultChannel: 'v2'

// 版本 3.x 发布(未来)
defaultChannel: 'v3'
```

:::tip
**此方法的好处:**
- **始终拥有控制权** 控制哪些用户接收更新
- **无需动态渠道切换** 在您的应用代码中
- **清晰分离** 不同应用版本之间
- **灵活性** 向任何特定版本组推送更新
:::

## 1. 为新版本创建渠道

```bash
# 为版本 2.x 创建渠道
npx @capgo/cli channel create v2
```

## 2. 为版本 2.0.0 更新 Capacitor 配置

在为应用商店构建版本 2.0.0 之前更新您的 Capacitor 配置:

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  plugins: {
    CapacitorUpdater: {
      // ... 其他选项
      defaultChannel: 'v2' // 所有 2.0.0 用户将使用 v2 渠道
    }
  }
};

export default config;
```

:::note
**对于版本 1.x:** 如果您最初没有设置 `defaultChannel`,版本 1.x 用户在 `production` 渠道上。对于未来的主要版本,始终设置特定渠道,如 `v3`、`v4` 等。
:::

## 3. 管理单独的代码分支

创建单独的 git 分支以维护应用版本之间的兼容性:

```bash
# 创建并维护版本 1.x 更新的分支
git checkout -b v1-maintenance
git push origin v1-maintenance

# 您的主分支继续进行版本 2.x 开发
git checkout main
```

:::warning
**关键:** 永远不要将 JavaScript bundle 推送到期望它们没有的原生代码/API 的旧应用。始终从适当的分支构建更新:
- **v1-maintenance 分支**: 用于更新 1.x 应用(production 渠道)
- **main 分支**: 用于更新 2.x 应用(v2 渠道)
:::

## 4. 将 Bundle 上传到相应渠道

```bash
# 对于 1.x 更新:从 v1-maintenance 分支构建
git checkout v1-maintenance
# 在此处进行 1.x 兼容的更改
npx @capgo/cli bundle upload --channel production

# 对于 2.x 更新:从 main 分支构建
git checkout main
# 在此处进行 2.x 更改
npx @capgo/cli bundle upload --channel v2
```

## 5. 启用自我分配

```bash
# 允许应用自我分配到 v2 渠道
npx @capgo/cli channel set v2 --self-assign
```

## 6. 部署到应用商店

构建并将版本 2.0.0 部署到应用商店。所有下载此版本的用户(无论是新用户还是现有用户升级)都将自动使用 v2 渠道,因为它在应用 bundle 中配置。

:::note
**无需更改代码!** 由于 `defaultChannel: 'v2'` 与应用商店版本捆绑在一起,所有下载版本 2.0.0 的用户都将自动使用正确的渠道。
:::

## 扩展到未来版本

当您发布具有更多重大变更的版本 3.0.0 时:

```bash
# 为版本 3.x 创建渠道
npx @capgo/cli channel create v3
```

```ts
// 版本 3.0.0 的 capacitor.config.ts
const config: CapacitorConfig = {
  // ...
  plugins: {
    CapacitorUpdater: {
      defaultChannel: 'v3' // 版本 3.x 用户
    }
  }
};
```

现在您可以向任何版本推送更新:
- `production` 渠道 → 版本 1.x 用户
- `v2` 渠道 → 版本 2.x 用户
- `v3` 渠道 → 版本 3.x 用户

## 7. 清理(迁移后)

一旦所有用户都迁移到版本 2.x(计数 3-4 个月):

1. 从您的 Capacitor 配置中删除 `defaultChannel`
2. 删除 v2 渠道:

```bash
npx @capgo/cli channel delete v2
```

3. 删除 v1-maintenance 分支:

```bash
git branch -d v1-maintenance
git push origin --delete v1-maintenance
```

:::tip
这种方法确保用户只接收与其应用版本兼容的更新
:::

:::warning
在部署之前,务必在每个渠道中彻底测试更新
:::

:::note
即使某些用户仍有渠道覆盖,您也可以安全地在 Capgo 中删除 v2 渠道。他们将自动从 production 渠道接收更新。
:::

## 维护版本 1.x 更新

要发送与版本 1.x 兼容的更新:

1. 切换到 v1-maintenance 分支:
```bash
git checkout v1-maintenance
```

2. 进行更改并提交:
```bash
# 进行 1.x 兼容的更改
git add .
git commit -m "Fix for v1.x"
git push origin v1-maintenance
```

3. 构建并上传到 production 渠道:
```bash
npx @capgo/cli bundle upload --channel production
```

:::tip
保持您的 v1-maintenance 分支更新与版本 1.x 兼容的错误修复,但永远不要从 main 合并重大变更
:::
