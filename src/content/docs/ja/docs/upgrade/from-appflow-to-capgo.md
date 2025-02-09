---
title: AppFlowからCapgoへの移行
description: Ionic AppFlowからCapgoへのアプリ移行完全ガイド
sidebar:
  order: 7
---

## Capgoへ移行する理由

Ionic AppFlowのサービス終了に伴い、Capgoへの移行によってモバイルアプリ開発ワークフローをスムーズに移行できます。Capgoは、重要な機能をすべて維持しながら、機能の向上、パフォーマンスの改善、大幅なコスト削減を提供します。

### 主なメリット
- より高速なアップデート配信（10分から1分未満へ）
- より手頃な価格（499ドル/月から14ドル/月へ）
- すべてのプランにエンドツーエンド暗号化を含む
- アップデートチャネルの制御性向上
- 包括的なCI/CD統合オプション

## 移行手順

### 1. ライブアップデートの移行

#### 既存の依存関係を削除
```bash
npm uninstall @ionic/appflow
# capacitor.config.jsonからAppFlow固有の設定を削除
```

#### Capgoのインストール
```bash
npm install @capgo/capacitor-updater
npx cap sync
```

#### 設定の更新
`capacitor.config.json`にCapgoの設定を追加：
```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true
    }
  }
}
```

### 2. CI/CDの移行

Capgoは柔軟なCI/CDオプションを提供：

#### オプション1：既存のCI/CDを使用
人気のプラットフォームでCI/CDを設定する詳細なチュートリアル：
- [iOSビルド設定](https://capgo.app/blog/automatic-capacitor-ios-build-github-action/)
- [Androidビルド設定](https://capgo.app/blog/automatic-capacitor-android-build-github-action/)
- [GitHub Actions統合](https://capgo.app/blog/github-action-capacitor/)

#### オプション2：CI/CDサービス
[マネージドサービス](https://cal.com/martindonadieu/mobile-ci-cd-done-for-you)で私たちがCI/CD設定を代行します。

### 3. チャネル設定

1. Capgoダッシュボードでチャネルを作成：
```bash
npx @capgo/cli channel create production
npx @capgo/cli channel create staging
```

2. チャネル設定の構成：
```bash
# プロダクションチャネルの設定
npx @capgo/cli channel update production --no-downgrade --no-upgrade

# ステージングチャネルの設定
npx @capgo/cli channel update staging
```

### 4. 移行のテスト

1. **ライブアップデートのテスト**
```bash
# テストバンドルの作成とアップロード
npx @capgo/cli bundle create --channel staging
```

2. **アップデート受信の確認**
- テスト端末にアプリをインストール
- アップデートが正しく受信されることを確認
- アップデートのインストールプロセスを確認
- リカバリー機能をテスト

## トラブルシューティング

### 一般的な問題

#### アップデートが受信されない
- チャネル設定の確認
- デバイスログの確認
- ネットワーク接続の確認
- バンドルバージョン形式の検証

## 次のステップ

1. [Capgoアカウントの作成](/register/)
2. [クイックスタートガイド](/docs/getting-started/quickstart/)に従う
3. [CI/CD統合](/docs/getting-started/cicd-integration/)のセットアップ
4. [ライブアップデート](/docs/live-updates/)の設定

移行時に専任サポートが必要な企業チームは、[チームとの通話を予約](https://cal.com/martindonadieu/capgo-enterprise-inquiry)してください。
