---
slug: impostazione-del-monitoraggio-delle-prestazioni-in-capacitor
title: Capacitorでのパフォーマンスモニタリングの設定
description: Firebase と Sentry を使用してアプリのパフォーマンスモニタリングを設定し、効率性とユーザー満足度を向上させる方法を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-23T05:36:41.635Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67df674387fa49042c75b4e1-1742708253934.jpg
head_image_alt: モバイル開発
keywords: >-
  Capacitor, performance monitoring, Firebase, Sentry, mobile app development,
  error tracking, monitoring tools
tag: 'Development, Mobile, Updates'
published: true
locale: ja
next_blog: ''
---
**[Capacitor](https://capacitorjs.com/)アプリのパフォーマンスを最適化したいですか？** [Firebase](https://firebase.google.com/)や[Sentry](https://sentry.io/)などの監視ツールを使用することで、クラッシュ、リソース使用量、応答時間を追跡し、よりスムーズなユーザー体験を確保できます。以下が概要です：

-   **パフォーマンス監視の理由**: クラッシュの特定、リソース使用の最適化、応答時間の改善。
-   **使用可能なツール**:
    -   **Firebase**: リアルタイムのパフォーマンスデータ、ネットワーク監視、カスタムイベント追跡。
    -   **Sentry**: 詳細なエラー追跡、スタックトレース分析、リアルタイム通知。
-   **セットアップ手順**:
    -   FirebaseまたはSentry SDKをインストール。
    -   パフォーマンスメトリクスまたはエラー追跡用にアプリを設定。
    -   ダッシュボードを使用してアプリのパフォーマンスを分析・改善。

**クイック比較**:

| 機能 | Firebase | Sentry |
| --- | --- | --- |
| リアルタイム監視 | わずかな遅延 | ほぼ瞬時 |
| ネイティブサポート | Android、iOS | Android、iOS、Web |
| カスタムメトリクス | 基本的 | 柔軟 |
| 統合の複雑さ | Googleベースのワークフロー | 簡単なSDKセットアップ |

ライブアップデートには、**[Capgo](https://capgo.app/)**のようなツールを統合して、アプリストアの遅延なしで即座に修正を配信できます。今日から監視を開始して、アプリの効率とユーザー満足度を向上させましょう。

## [Firebase](https://firebase.google.com/)パフォーマンス監視でアプリの健全性を最適化...

![Firebase Platform Dashboard](https://mars-images.imgix.net/seobot/screenshots/firebase.google.com-ab24bd47674782df651734052f495a0c-2025-03-23.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/ENaOg5YefjQ" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## 監視ツールの選択

アプリの要件とチームの専門知識に合った監視ツールを選択してください。以下にFirebaseパフォーマンス監視とSentryの比較を示します。

### ツールの比較

| 機能 | Firebaseパフォーマンス監視 | Sentry |
| --- | --- | --- |
| 価格モデル | スケーラブルな有料オプション付きの無料枠 | 手頃な成長プラン付きの無料枠 |
| リアルタイム監視 | わずかな遅延のあるパフォーマンスインサイト | ほぼ瞬時の監視 |
| ネイティブプラットフォームサポート | AndroidとiOS | Android、iOS、Web |
| 統合の複雑さ | Googleサービスとの連携 | 簡単なSDKセットアップ |
| カスタムイベント追跡 | 基本的なカスタムメトリクス | 柔軟なカスタムイベント追跡 |
| 保持期間 | 無料枠では制限あり | すべてのプランで拡張 |

### 選択基準

これらのツールを選択する際は、以下を考慮してください：

-   **アプリのサイズとトラフィック**: 急速な成長が予想されるアプリの場合、Firebaseが適しています。Sentryは小規模な実装に適しています。
-   **技術要件**: Firebaseは[Google Play Services](https://en.wikipedia.org/wiki/Google_Play_Services)が必要で、そのエコシステム内のアプリに最適です。Sentryは独立して動作し、プラットフォーム間でより柔軟性があります。
-   **チームの経験**: FirebaseはGoogleツールに慣れているチームに適していますが、Sentryの簡単なSDKセットアップはより幅広い用途に適しています。
-   **予算制約**: 両ツールとも無料枠を提供していますが、機能のスケーリングコストを比較して予算に合うことを確認してください。
-   **統合の目標**: FirebaseはGoogleベースのワークフローとシームレスに統合しますが、Sentryはエラー追跡が特に強みです。
-   **規制要件**: 特にアプリが機密ユーザーデータを扱う場合、[GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation)などの基準に準拠していることを確認してください。
-   **更新頻度**: 頻繁な更新が重要な場合、Capgoのようなツールでライブ修正を速めることができ、監視セットアップを補完できます。

## Firebaseセットアップガイド

[Capacitorアプリ](https://capgo.app/plugins/ivs-player/)でFirebaseパフォーマンス監視を設定するには、正確なデータ追跡を確保するためにいくつかの明確な手順が必要です。

### Firebase SDKのインストール

プロジェクトにFirebase SDKを追加し、プラットフォームごとに設定します：

-   **Firebase依存関係のインストール**

以下のコマンドを実行して、必要なFirebaseパッケージをインストールします：

```bash
npm install @capacitor-firebase/performance
npm install firebase
```

-   **Firebaseの初期化**

メインアプリケーションファイルでFirebaseを設定します：

```typescript
import { FirebasePerformance } from '@capacitor-firebase/performance';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // Add your Firebase configuration object here
};

initializeApp(firebaseConfig);
await FirebasePerformance.initializePerformance();
```

-   **プラットフォーム設定の追加**

パフォーマンス監視を有効にするために`capacitor.config.json`ファイルを更新します：

```json
{
  "plugins": {
    "FirebasePerformance": {
      "collectMetrics": true,
      "instrumentationEnabled": true,
      "dataCollectionEnabled": true
    }
  }
}
```

### パフォーマンス追跡のセットアップ

Firebaseパフォーマンスモニタリングを使用して、データベースクエリやネットワークリクエストなどの特定のアプリ活動の追跡を開始できます。

-   **データベースクエリの追跡**

```typescript
async function trackDatabaseQuery() {
  const trace = await FirebasePerformance.startTrace({ traceName: 'database_query' });

  // Perform your database operation
  await performDatabaseOperation();

  await FirebasePerformance.stopTrace({ traceName: 'database_query' });
}
```

-   **ネットワークリクエストの監視**

```typescript
await FirebasePerformance.setAttributes({
  traceName: 'api_call',
  attributes: {
    endpoint: '/users',
    method: 'GET'
  }
});
```

-   **カスタムメトリクスの追跡**

ショッピングカートの値の追跡などのカスタムメトリクスの場合：

```typescript
await FirebasePerformance.putMetric({
  traceName: 'checkout_flow',
  metricName: 'cart_value',
  value: 99.99
});
```

これらのトレースを実装すると、Firebase Consoleで収集したデータを確認できます。

### Firebase Consoleの使用

監視の設定後、Firebase Consoleでアプリのパフォーマンスデータを表示および分析できます：

1. **パフォーマンスデータへのアクセス**
    
    -   Firebase Consoleにログイン。
    -   プロジェクトを選択。
    -   **パフォーマンス監視**に移動。
    -   ドロップダウンメニューからアプリを選択。
2. **主要メトリクスの監視**
    

ダッシュボードは以下を含むさまざまなパフォーマンス指標に関する洞察を提供します：

-   アプリ起動時間
-   ネットワークリクエストの成功率
-   画面レンダリング時間
-   カスタムトレースの結果

3. **カスタムレポートの設定**

アプリのパフォーマンスの特定の側面を分析するためのカスタマイズされたレポートを作成します：

-   場所による性能の違い
-   デバイスタイプに基づくメトリクス
-   ネットワーク状態の影響
-   カスタムトレースのパターン

これらのツールを使用して、パフォーマンスのボトルネックを効果的に特定し対処します。

## [Sentry](https://sentry.io/)エラー追跡のセットアップ

![Sentry Error Tracking Dashboard](https://mars-images.imgix.net/seobot/screenshots/sentry.io-925fc70e12ac801815ba3ab27e6adcda-2025-03-23.jpg?auto=compress)

Firebaseはパフォーマンスメトリクスを扱いますが、Sentryはエラーのキャッチと診断に特化しています。両者を組み合わせることで、強力な監視セットアップが得られます。

### Sentry SDKのインストール

必要なSentryパッケージをインストールすることから始めます：

```bash
npm install @sentry/capacitor
# Add the Sentry package for your specific framework
```

インストール後、アプリのエントリーポイントでSentryを設定します。

### Sentryの初期化

以下のセットアップを使用してアプリのエントリーポイントでSentryを設定します：

```typescript
import * as Sentry from "@sentry/capacitor";
import { BrowserTracing } from "@sentry/browser";

Sentry.init({
    dsn: "your-project-dsn",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.2,
    environment: "production",
    release: "app-version@" + process.env.VERSION,
    dist: process.env.BUILD_NUMBER,
    debug: false
});
```

この設定には、エラーを特定のアプリバージョンにリンクするリリース追跡が含まれています。

### エラー追跡の設定

カスタムエラー境界とtry-catchブロックを使用して、さらにエラー追跡をカスタマイズできます。

**カスタムエラー境界：**

```typescript
class ErrorBoundary extends React.Component {
    componentDidCatch(error, errorInfo) {
        Sentry.captureException(error, { extra: errorInfo });
    }
}
```

**特定のエラーの追跡：**

```typescript
try {
    riskyOperation();
} catch (error) {
    Sentry.captureException(error, {
        tags: { operation: "data_sync", severity: "critical" },
        extra: { userId: currentUser.id, timestamp: new Date().toISOString() }
    });
}
```

**パフォーマンスの監視：**

```typescript
const transaction = Sentry.startTransaction({
    name: "API Request",
    op: "http.request"
});

try {
    await makeApiCall();
} finally {
    transaction.finish();
}
```

これらの方法により、アプリが効果的にエラーを記録し、Sentryを通じて追跡と解決が容易になります。

### Sentryダッシュボードの使用

Sentryダッシュボードはエラーを詳しく調査し理解するためのツールを提供します：

-   **リアルタイム監視**: エラーの頻度、解決状況、影響を受けるユーザーを確認。
-   **エラー分析**: スタックトレースの確認、類似エラーのグループ化、環境によるフィルタリング。
-   **アラート**: エラーしきい値の設定、通知オプションの設定、カスタムアラートルールの作成。

このダッシュボードにより、問題の診断と修正が簡単になります。

## 監視のベストプラクティス

### 主要メトリクスへの注力

Capgoの750の本番アプリの分析[\[1\]](https://capgo.app/)は、監視すべき主要メトリクスを強調しています：

-   **更新成功率**: 82%以上を目指す。
-   **更新速度**: グローバルCDNは5MBを114ミリ秒で配信すべき。
-   **ユーザー採用**: 24時間以内に95%のユーザーが更新すべき。
-   **APIレスポンス時間**: 500ミリ秒未満を維持（世界平均は434ミリ秒）。

これらのメトリクスの偏差を素早く検出するためのアラートを設定してください。

### 効果的なアラートルールの作成

以下はパフォーマンス監視のアラート設定例です：

```typescript
// Example alert configuration
{
    performance: {
        apiLatency: {
            threshold: 1000, // ms
            period: "5m",
            condition: "above"
        },
        errorRate: {
            threshold: 1.0, // percentage
            period: "15m",
            condition: "above"
        },
        updateSuccess: {
            threshold: 75, // percentage
            period: "1h",
            condition: "below"
        }
    }
}
```

### 継続的な監視と調整

アラートを設定したら、継続的な監視と改善に注力します：

-   **定期的なパフォーマンスチェック**: 地域別の更新成功率の確認、異なるアプリバージョンのエラー傾向の分析、ピーク時のAPIレスポンス時間の監視。
    
-   **段階的なアップデートのロールアウト**: 最初の24時間は10%のユーザーから開始。問題なく実行されれば50%に増やし、48時間の安定したパフォーマンス後に完全なロールアウトを行う。
    
-   **継続的な最適化**: 失敗した更新の調査、遅いAPIエンドポイントの特定、更新後のユーザーエンゲージメントの評価による持続的な改善。
    

## [Capgo](https://capgo.app/)のアップデートと監視

![Capgo Live Update Dashboard Interface](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-23.jpg?auto=compress)

### Capgoの主要機能

750の本番アプリでテストされたCapgoのライブアップデートシステムは、5MBのバンドルを114ミリ秒で配信します[\[1\]](https://capgo.app/) 。

主な機能：

-   **リアルタイム分析**: 現在世界平均82%の更新成功率を監視[\[1\]](https://capgo.app/) 。
-   **即時デプロイメント**: アプリストアの承認を待たずに重要な修正を配信。
-   **部分更新**: 変更されたコンポーネントのみをダウンロードし、帯域幅と時間を節約。
-   **バージョン管理**: パフォーマンスに悪影響を与える更新を素早くロールバック。

このシステムは既存の監視ツールと簡単に統合でき、スムーズな運用を確保します。

> "5000以上のユーザーベースを持つ本番環境でCapgo OTAアップデートを展開しました。OTAが@Capgoにデプロイされてから数分以内にほぼすべてのユーザーが最新版にな

| モニタリングの側面 | Capgo 統合 | 追加ツール |
| --- | --- | --- |
| エラー追跡 | 組み込みエラーモニタリング | 詳細なスタックトレース用にSentryと組み合わせ |
| パフォーマンスメトリクス | アップデート成功率の追跡 | ユーザーインタラクションデータにFirebaseを使用 |
| レスポンスタイム | APIレスポンスモニタリング | カスタムFirebaseタイミングイベントで強化 |

Capgoのチャネルシステムを効果的に設定するには:

- ベータテスターに最初にアップデートをデプロイ
- Capgoのアナリティクスでパフォーマンスメトリクスを監視
- より広いユーザーベースへ段階的にロールアウトを拡大

> "私たちはアジャイル開発を実践しており、@Capgoはユーザーへの継続的なデリバリーに不可欠です！" - Rodrigo Mantica [\[1\]](https://capgo.app/)

世界中で2,350万回のアップデートを提供し、Capgoのリアルタイムダッシュボードは明確な洞察を提供し、チームがアップデートとパフォーマンス改善について賢明な判断を下せるようにします。

## 次のステップ

### 主なポイント

重要なメトリクスを監視することは、効果的なパフォーマンスモニタリングに不可欠です。これらの重要な指標を追跡するツールを使用してください：

| **メトリクスタイプ** | **重点分野** | **推奨ツール** |
| --- | --- | --- |
| アプリパフォーマンス | レスポンスタイム、クラッシュ | Firebase Performance |
| エラー追跡 | 例外発生率、スタックトレース | Sentry |
| アップデート分析 | 配信成功率 | Capgo Analytics |

以下のリソースを通じて、これらのメトリクスとツールについてより深く理解してください。

### さらに学ぶ

パフォーマンスモニタリングツールと実践方法は常に進化しています。これらのガイドと戦略を探索して最新情報を把握しましょう：

**公式ドキュメント**:

- Firebase Performance Monitoringドキュメント
- SentryのCapacitor統合ガイド
- Capacitorの公式パフォーマンス最適化ガイド

**高度な実装**: 750以上の本番アプリで使用されているCapgoのアナリティクスシステムを探索してください[\[1\]](https://capgo.app/) 。そのドキュメントでは、他のパフォーマンス追跡ツールとシームレスに連携するモニタリングパターンとライブアップデート戦略についての洞察が提供されています。
