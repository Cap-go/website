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

- [ ] 将@capacitor/core更新至^8.0.0
- [ ] 将@capacitor/android更新至^8.0.0
- [ ] 将@capacitor/ios更新至^8.0.0
- [ ] 遵循Capacitor的v8迁移指南
- [ ] 将@capgo/capacitor-updater更新至^8.0.0
- [ ] 运行`npx cap sync`
- [ ] 在iOS和Android上全面测试您的应用

## 需要帮助？

如果您在迁移过程中遇到任何问题，请：

1. 查看我们的[文档](/docs/live-updates/)
2. 访问我们的[Discord社区](https://discord.com/invite/VnYRvBfgA6)
3. 在[GitHub](https://github.com/Cap-go/capacitor-updater/issues)上开issue
