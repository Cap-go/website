---
title: "从V7升级到V8"
locale: zh
description: "详细指南介绍如何从Capgo更新器版本7过渡到版本8，概述成功升级过程所需的步骤和注意事项，确保与Capacitor 8功能和改进的兼容性。"
sidebar:
  order: 0
---

## 为什么要升级

此主要版本是为了跟随Capacitor主要版本8

首先遵循Capacitor的迁移指南：

[https://capacitorjs.com/docs/updating/8-0](https://capacitorjs.com/docs/updating/8-0/)

## iOS最低版本要求

iOS最低部署目标已提升至**15.5**，以确保排除存在[CVE-2022-36943](https://nvd.nist.gov/vuln/detail/CVE-2022-36943)漏洞的iOS设备。这是实施了安全修复的iOS zip库的最低版本。

### Swift Package Manager (SPM) 解决方案

Capacitor目前存在一个bug（[ionic-team/capacitor#7556](https://github.com/ionic-team/capacitor/issues/7556)），在使用SPM时无法将iOS部署目标设置为15.5。

如果您需要SPM支持，可以临时使用我们的分支：

**GitHub:** [https://github.com/Cap-go/capacitor-plus](https://github.com/Cap-go/capacitor-plus)

使用方法是将CLI包 `@capacitor/cli` 替换为 `@capacitor-plus/cli`：

```bash
npm uninstall @capacitor/cli
npm install @capacitor-plus/cli
```

然后像往常一样使用CLI：

```bash
npx capacitor sync
```

## 安装

`npm i @capgo/capacitor-updater@8`

然后同步原生代码更新：

`npx cap sync`

完成！非常简单！

## V8的新功能

capacitor-updater版本8带来了与Capacitor 8的完全兼容性，确保您的应用可以利用最新的移动操作系统功能和改进。

### 主要更新

- **Capacitor 8兼容性**：完全支持Capacitor 8增强的原生功能
- **性能改进**：优化的更新交付和安装过程
- **增强的稳定性**：自v7以来的错误修复和稳定性改进
- **保持API兼容性**：自v7以来插件API无重大更改

## 配置

配置与v7保持相同。您现有的`capacitor.config`设置将继续工作：

```typescript
{
  plugins: {
    CapacitorUpdater: {
      appId: 'your-app-id',
      version: '1.0.0',
      autoUpdate: true,
      // ... 其他设置
    }
  }
}
```

## 迁移检查清单

- [ ] 遵循Capacitor的v8[迁移指南](https://capacitorjs.com/docs/updating/8-0)，检查破坏性更改
- [ ] 将iOS最低部署目标提升至15.5（CVE-2022-36943修复所需）
- [ ] 如果使用SPM，在[ionic-team/capacitor#7556](https://github.com/ionic-team/capacitor/issues/7556)修复之前临时切换到[@capacitor-plus/cli](https://github.com/Cap-go/capacitor-plus)
- [ ] 将@capgo/capacitor-updater更新至^8.0.0
- [ ] 运行`npx cap sync`
- [ ] 在iOS和Android上全面测试您的应用

## 需要帮助？

如果您在迁移过程中遇到任何问题，请：

1. 查看我们的[文档](/docs/live-updates/)
2. 访问我们的[Discord社区](https://discord.com/invite/VnYRvBfgA6)
3. 在[GitHub](https://github.com/Cap-go/capacitor-updater/issues)上开issue
