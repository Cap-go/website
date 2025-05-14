---
slug: how-live-updates-for-capacitor-work
title: Capgoにおけるライブアップデートの仕組み
description: Capgoにおけるライブアップデートの技術的実装を深く掘り下げ、iOSとAndroidの両方でどのように機能しているかを理解します。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-18T06:14:25.862Z
updated_at: 2025-03-18T15:14:16.781Z
head_image: /capgo_banner.webp
head_image_alt: ライブアップデートアーキテクチャ
keywords: >-
  Capgo live updates, OTA updates, Capacitor updates, mobile app development,
  app updates
tag: 'Development, Mobile, Updates'
published: true
locale: ja
next_blog: ''
---
# Capgoにおけるライブアップデートの理解

ライブアップデートは、Capacitorアプリにおける最も強力な機能の一つであり、アプリストアへの提出なしにリアルタイムの更新を可能にします。Capgoがこの機能をどのように実装しているのか、詳しく見ていきましょう。

## コアコンセプト

Capacitorアプリは、主に二つの層から構成されています：

1. **ウェブ層**: WebViewに読み込まれるHTML、CSS、およびJavaScriptファイルを含みます
2. **ネイティブ層**: プラットフォーム固有のコード（Android用のJava/Kotlin、iOS用のSwift）を含みます

Capgoのライブアップデートシステムは、アプリのバイナリにコンパイルされないこれらのファイルをランタイムでウェブ層と置き換えることにより機能します。

## 技術的な実装

### Capacitorにおけるサーバーパス

Capgoは、二つの重要なパスを管理しています：

- **現在のサーバーパス**: 現在WebViewに読み込まれているファイルを指します
- **次のサーバーパス**: 次回アプリを再起動した際に読み込まれるファイルを指します

### Android実装

Androidでは、Capgoは以下のようにパスを管理します：

```java
// Store next server path
private void setNextCapacitorServerPath(String path) {
    SharedPreferences prefs = context.getSharedPreferences("CapWebViewSettings", Activity.MODE_PRIVATE);
    SharedPreferences.Editor editor = prefs.edit();
    editor.putString("serverBasePath", path);
    editor.apply();
}

// Update current path and reload
private void setCurrentCapacitorServerPath(String path) {
    bridge.setServerBasePath(path);
    bridge.reload();
}
```

### iOS実装

iOSでは、パスは以下のように管理されます：

```swift
// Store next server path
private func setNextCapacitorServerPath(path: String) {
    KeyValueStore.standard["serverBasePath"] = path
}

// Update current path
private func setCurrentCapacitorServerPath(path: String) {
    bridge.viewController.setServerBasePath(path: path)
}
```

## セキュリティ対策

Capgoはエンドツーエンドの暗号化を通じて軍用レベルのセキュリティを実装しており、開発から展開までアプリの更新が完全に安全であることを保証します。当社の暗号化システムは、従来のコード署名を超えて真のゼロ知識セキュリティを提供します。

### エンドツーエンド暗号化アーキテクチャ

1. **エンドツーエンド暗号化（E2EE）**: すべての更新バンドルは、開発環境を出る前にAES-256-GCM暗号化を使用して暗号化されます。この軍用レベルの暗号化により、アプリの更新が配信プロセス全体にわたって完全にプライベートで安全に保たれます。

2. **ゼロ知識アーキテクチャ**: Capgoは、他のOTA更新ソリューションが更新のみを署名するのとは異なり、真のゼロ知識暗号化を採用しています。これは意味します：
   - 更新内容はアップロード前に暗号化されます
   - Capgoサーバーは暗号化されたデータのみを保存します
   - 復号はエンドユーザーのデバイスでのみ行われます
   - 中間者は更新内容にアクセスできません

3. **安全なキー管理**:
   - 暗号化キーは生成され、CI/CD環境内で安全に保存されます
   - プライベートキーはCapgoのサーバーには触れません
   - 各アプリ版はユニークな暗号化キーを使用できます
   - セキュリティ向上のためのキーのローテーションをサポートします

当社の暗号化システムに関する詳細ガイドは、こちらをご覧ください: [Capgoライブアップデートにおけるエンドツーエンド暗号化](https://capgo.app/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing/)

### 更新セキュリティプロセス

1. **アップロード前暗号化**:
   - 更新はCI/CDパイプライン内で暗号化されます
   - 各ファイルは個別に暗号化されます
   - 完全なプライバシーのためにメタデータも暗号化されます

2. **安全なストレージ**:
   - 暗号化されたバンドルはCapgoのグローバルCDNに保存されます
   - プレーンテキストデータがサーバーに触れることはありません
   - サーバー侵害が発生した場合でも、データは安全です

3. **安全な配信**:
   - 更新は暗号化されたチャネルを通じて配信されます
   - 各アプリインスタンスは暗号化の整合性を検証します
   - 復号に失敗した場合の自動再試行機構

4. **クライアント側のセキュリティ**:
   - 更新はインストール前に検証されます
   - 復号に失敗すると自動的にロールバックがトリガーされます
   - アプリの保護されたストレージに安全なキーが保存されます

この包括的なセキュリティアプローチにより、アプリの更新が以下の攻撃から保護されます：
- 中間者攻撃
- サーバー側の侵害
- 不正な変更
- リプレイ攻撃
- コンテンツの改ざん

## 更新ライフサイクル

Capgoの更新プロセスはデフォルトで自動的に設計されています。自動プロセスの仕組みは以下の通りです：

### 1. 自動更新チェック

プラグインは以下の状況で自動的に更新を確認します：
- アプリが起動したとき

この動作は`autoUpdate`設定で制御されます：

```typescript
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true // Enable automatic updates
    }
  }
}
```
手動でチェックすることもできます: `getLatest()`

### 2. 自動ダウンロード

新しいバージョンが検出され、`autoUpdate`が有効になっている場合：
1. ダウンロードが自動的に開始されます
2. 進捗が内部で追跡されます
3. ダウンロードに失敗した場合はアプリを開くたびに自動再試行されます
4. 成功したダウンロードはアプリストレージに保存されます

このプロセスはイベントを通じて監視できます：
```typescript
CapacitorUpdater.addListener('download', (info: DownloadEvent) => {
  console.log('Auto-download progress:', info.percent);
});

CapacitorUpdater.addListener('downloadComplete', (info: DownloadCompleteEvent) => {
  console.log('Auto-download complete:', info.bundle);
});
```

### 3. 自動インストール

インストールのタイミングは構成に依存します：

```typescript
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": false // install update on app backgrounding
      "resetWhenUpdate": true, // reset live updates on native update (true by default)
      "autoDeleteFailed": true, // Auto cleanup failed updates (true by default)
      "autoDeletePrevious": true // Auto cleanup old versions (true by default)
    }
  }
}
```

インストールは以下の条件に基づいて行われます：
- `directUpdate`がtrueの場合は即時
- `directUpdate`がfalseの場合は次回アプリがバックグラウンドになるとき
- インストールが失敗した場合は自動ロールバック

プラグインはストレージも自動で管理します：
- `autoDeleteFailed`がtrueの場合は失敗した更新を削除します
- `autoDeletePrevious`がtrueの場合は古いバージョンをクリーンアップします

### 更新の遅延

遅延条件を使用して更新がインストールされるタイミングを制御できます：

```typescript
// Delay until app goes to background
await CapacitorUpdater.setDelay({
  kind: 'background'
});

// Delay until specific date
await CapacitorUpdater.setDelay({
  kind: 'date',
  value: '2024-03-20T10:00:00.000Z'
});

// Delay until next native version
await CapacitorUpdater.setDelay({
  kind: 'nativeVersion'
});

// Multiple conditions
await CapacitorUpdater.setMultiDelay({
  delayConditions: [
    {
      kind: 'background'
    },
    {
      kind: 'date',
      value: '2024-03-20T10:00:00.000Z'
    }
  ]
});
```

利用可能な遅延条件：
- **background**: アプリがバックグラウンドに移行したときにインストール
- **date**: 特定の日付/時間の後にインストール
- **nativeVersion**: 次のネイティブアップデートの後にインストール
- **kill**: アプリが終了した後にインストール

これは以下のことに役立ちます：
- オフピーク時間に更新をスケジュール
- ユーザーの活動と更新を調整
- スムーズな更新体験の確保
- 重要なタスク中の中断を防ぐ

### 更新状態

自動プロセス中に、バンドルは以下の状態を遷移します：
1. **downloading**: ダウンロード進行中
2. **pending**: ダウンロード完了、インストール待機中
3. **success**: 更新がインストールされ、アクティブ
4. **error**: 更新に失敗（自動ロールバックをトリガー）

## ストアコンプライアンス

### Apple App Store ✅

ライブアップデートはApple App Storeのポリシーに完全に準拠しています。Apple Developer Program License Agreementに記載されている通り：

> "解釈されたコードはアプリケーションにダウンロードされることがありますが、そのコードが以下の条件を満たす限りである必要があります：(a) アプリケーションの意図された広告された目的と矛盾する機能や機能を提供することにより、アプリケーションの主な目的を変更しないこと、(b) 他のコードやアプリケーションのためのストアまたはストアフロントを作成しないこと、(c) 署名、サンドボックス、またはOSの他のセキュリティ機能を回避しないこと。"

Capgoの更新は、すべてのプラットフォームのセキュリティ境界を尊重しつつ、ウェブ層のみを変更します。

### Google Play Store ✅

ライブアップデートはGoogle Playポリシーに準拠しています。デバイスとネットワーク不正行為ポリシーは以下のように記載しています：

> "この制限は、仮想マシンまたはインタプリタ内で動作し、いずれかがAndroid API（WebViewまたはブラウザ内のJavaScriptなど）への間接的なアクセスを提供するコードには適用されません。"

CapgoはWebViewコンテンツのみを更新するため、これらの許可されたガイドラインに該当します。

## ベストプラクティス

1. **段階的ロールアウト**: 更新を段階的に展開する
2. **バージョン管理**: 展開されたすべてのバージョンを追跡する
3. **ロールバックサポート**: 問題から迅速に回復する
4. **デルタ更新**: 変更されたファイルのみをダウンロード

## ライブアップデートを使用すべき時

以下に最適です：
- バグ修正
- UIの改善
- コンテンツの更新
- 機能のトグル

以下には適していません：
- ネイティブコードの変更
- メジャーバージョンの更新
- ネイティブ変更を必要とするセキュリティパッチ
