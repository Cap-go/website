---
slug: how-capacitor-handles-platform-differences
title: Capacitorの仕組みとプラットフォームの違いについて
description: モバイルアプリ開発において、iOSとAndroid向けの単一のコードベースを使用してプラットフォームの違いを効果的に管理する方法を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-25T02:08:36.160Z
updated_at: 2025-03-25T02:08:56.741Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67e200987856e801f1f26fa8-1742868536741.jpg
head_image_alt: モバイル開発
keywords: >-
  Capacitor, mobile development, cross-platform, iOS, Android, custom plugins,
  UI design, live updates
tag: 'Development, Mobile, Updates'
published: true
locale: ja
next_blog: ''
---

[Capacitor](https://capacitorjscom/) は、開発者が同じコードベースを使用してiOSとAndroidのアプリを構築し、プラットフォーム固有の違いに対応することを支援します。ネイティブ機能の統合を簡素化し、プラットフォームのガイドラインへの準拠を確保し、パフォーマンスを最適化します。主なポイント：

-   **プラットフォーム検出**: `Capacitor.getPlatform()`を使用してプラットフォーム固有のコードを適用
-   **組み込みプラグイン**: カメラ、ストレージ、ジオロケーションなどの機能のための統一されたAPI
-   **カスタムプラグイン**: 固有の要件のためのネイティブコードの追加
-   **UI調整**: iOS（例：[SF Symbols](https://developer.apple.com/sf-symbols/)、丸みを帯びたボタン）とAndroid（例：[Material Icons](https://developers.google.com/fonts/docs/material_icons)、左揃えのボタン）のデザインルールに従う
-   **設定**: `capacitor.config.json`で両プラットフォームの設定を調整
-   **[Capgo](https://capgo.app/)によるライブアップデート**: アプリストアの遅延なしで即時更新を展開し、24時間以内に最大95%のユーザー採用を達成

### クイック比較

| 機能 | iOS | Android |
| --- | --- | --- |
| **ナビゲーション** | 下部タブバー、左戻るボタン | 上部ナビゲーションドロワー、下部ナビ |
| **タイポグラフィ** | San Franciscoフォント | Robotoフォント |
| **プラグイン（例：カメラ）** | [AVFoundation](https://developer.apple.com/documentation/avfoundation/) | [Camera2 API](https://developer.android.com/media/camera/camera2) |
| **ビルド出力** | `ipa`ファイル | `aab`または`apk`ファイル |

Capacitorは、ウェブとネイティブアプリ開発の間のギャップを埋め、プラットフォーム固有の最適化を維持しながらクロスプラットフォームアプリの作成を容易にします。

## クロスプラットフォーム開発：CapacitorJSの探求

<Steps>

## [Capacitor](https://capacitorjs.com/)によるプラットフォームコードの処理

![Capacitor](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-03-25.jpg?auto=compress)

Capacitorは、プラットフォーム固有のコードを管理するツールを提供し、開発者が単一のAPIを使用してiOSとAndroid向けにカスタマイズされた体験を作成できるようにします。

### コードでのプラットフォーム検出

Capacitorの組み込みプラットフォームAPIを使用すると、現在のプラットフォームの検出が簡単です。`Capacitor.getPlatform()`メソッドは実行環境を識別し、条件付きロジックの適用を容易にします：

このアプローチは、[生体認証](https://capgo.app/plugins/capacitor-native-biometric/)のような機能で特に便利です。iOSは[Face ID](https://en.wikipedia.org/wiki/Face_ID)を使用し、Androidは指紋認証に依存します。プラットフォーム検出に加えて、Capacitorの組み込みプラグインはネイティブ統合を簡素化します。

### 組み込みプラットフォーム機能

Capacitorには、プラットフォーム固有の違いをシームレスに処理するコアプラグインセットが付属しています。これらのプラグインは、一貫したJavaScriptインターフェースを提供しながら、ネイティブ実装の複雑さを管理します：

| プラグイン | iOS実装 | Android実装 |
| --- | --- | --- |
| カメラ | AVFoundation | Camera2 API |
| ストレージ | UserDefaults | SharedPreferences |
| ジオロケーション | CoreLocation | LocationManager |

各プラグインは自動的にプラットフォームのネイティブAPIを使用し、スムーズなパフォーマンスと機能を確保します。

### カスタムプラットフォームプラグインの構築

組み込みプラグインがニーズを満たさない場合、特定のネイティブAPIにアクセスするためのカスタムプラグインを作成できます。方法は以下の通りです：

1.  **プラグインの定義**

2.  **ネイティブコードの追加**

3.  **プラットフォームハンドラーの実装**

    -   **iOS (Swift):**

    -   **Android (Kotlin):**

カスタムプラグインにより、APIの一貫性と使いやすさを保ちながら、ネイティブ機能へのアクセスが可能になります。これにより、開発プロセスを複雑にすることなく、パフォーマンスと機能性を確保できます。

## プラットフォーム固有のUIガイドライン

### iOSとAndroidのデザインルール

iOSとAndroid向けにデザインする際は、ネイティブデザインパターンに従うことが重要です。