---
title: "V7からV8へ"
locale: ja
description: "Capgoアップデーターのバージョン7からバージョン8への移行に関する詳細なガイドで、Capacitor 8の機能と改善との互換性を確保するための成功的なアップグレードプロセスに必要な手順と考慮事項を概説しています。"
sidebar:
  order: 0
---

## このアップグレードの理由

このメジャーバージョンは、Capacitorのメジャーバージョン8に対応するためのものです

まず、Capacitorの移行ガイドに従ってください：

[https://capacitorjs.com/docs/updating/8-0](https://capacitorjs.com/docs/updating/8-0/)

## インストール

`npm i @capgo/capacitor-updater@8`

次に、ネイティブコードの更新を同期します：

`npx cap sync`

これで完了です！とても簡単です！

## V8の新機能

capacitor-updaterのバージョン8は、Capacitor 8との完全な互換性をもたらし、アプリが最新のモバイルOS機能と改善を活用できることを保証します。

### 主要なアップデート

- **Capacitor 8互換性**：Capacitor 8の拡張されたネイティブ機能への完全なサポート
- **パフォーマンスの改善**：最適化された更新配信とインストールプロセス
- **安定性の向上**：v7からのバグ修正と安定性の改善
- **API互換性の維持**：v7からプラグインAPIに破壊的変更なし

## 設定

設定はv7と同じままです。既存の`capacitor.config`設定は引き続き機能します：

```typescript
{
  plugins: {
    CapacitorUpdater: {
      appId: 'your-app-id',
      version: '1.0.0',
      autoUpdate: true,
      // ... その他の設定
    }
  }
}
```

## 移行チェックリスト

- [ ] @capacitor/coreを^8.0.0に更新
- [ ] @capacitor/androidを^8.0.0に更新
- [ ] @capacitor/iosを^8.0.0に更新
- [ ] Capacitorのv8移行ガイドに従う
- [ ] @capgo/capacitor-updaterを^8.0.0に更新
- [ ] `npx cap sync`を実行
- [ ] iOSとAndroidでアプリを徹底的にテスト

## サポートが必要ですか？

移行中に問題が発生した場合は：

1. [ドキュメント](/docs/live-updates/)を確認
2. [Discordコミュニティ](https://discord.com/invite/VnYRvBfgA6)を訪問
3. [GitHub](https://github.com/Cap-go/capacitor-updater/issues)でissueを開く
