---
slug: biometric-authentication-in-capacitor-apps
title: Capacitorアプリでの生体認証
description: Capacitorアプリでのセキュアな生体認証の実装方法を学び、ユーザー体験を向上させ、機密データを保護しましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-05-14T05:13:56.152Z
updated_at: 2025-05-14T05:17:04.736Z
head_image: >-
  https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/68240bea59ff61289922287e-1747199824736.jpg
head_image_alt: モバイル開発
keywords: >-
  biometric authentication, Capacitor, mobile security, fingerprint, facial
  recognition, app development
tag: 'Development, Mobile, Security'
published: true
locale: ja
next_blog: ''
---
[Biometric authentication](https://capgo.app/plugins/capacitor-native-biometric/)は、パスワードの代わりに指紋、顔、その他の生体的特徴を使用してユーザーがアプリに安全にアクセスできるようにします。[Capacitor](https://capacitorjs.com/)を使用する開発者にとって、この機能の実装は簡単で、iOSとAndroidの両方で動作します。以下が概要です：

-   **生体認証を使用する理由**
    
    -   パスワードよりも安全です。
    -   ログインを速くすることでユーザー体験を向上させます。
    -   機密データのセキュリティ基準を満たします。
-   **サポートされる方法：**
    
    -   指紋認証：迅速で一般的。
    -   顔認証：ハンズフリーオプション。
    -   虹彩スキャン：高セキュリティのユースケース（限定デバイス）。
    -   音声認識：アクセシビリティ重視（限定サポート）。
-   **必要な主要ツール：**
    
    -   Capacitor 3.0+。
    -   `@capawesome-team/capacitor-biometrics`や`capacitor-native-biometric`などのプラグイン。
-   **セットアップのポイント：**
    
    -   AndroidManifestとInfo.plistに権限を追加。
    -   安全な保存のためにKeychain（iOS）またはKeystore（Android）を使用。
    -   互換性とフォールバックオプションを徹底的にテスト。

### プラグインの比較

| プラグイン名 | Capacitorバージョン | 機能 | 最適な用途 |
| --- | --- | --- | --- |
| `@aparajita/capacitor-biometric-auth` | Capacitor 7 | ネイティブ生体認証、デバイス認証情報 | Capacitor 7を使用する新規プロジェクト |
| `capacitor-native-biometric` | Capacitor 3, 4 | 安全な認証情報保存、Keychain/Keystore | 認証情報管理 |
| `@capawesome-team/capacitor-biometrics` | 全バージョン | 生体認証とデバイス認証情報のサポート | 柔軟な認証オプション |

[Capacitorアプリにおける生体認証](https://capgo.app/plugins/capacitor-native-biometric/)は、機密データを保護する安全でユーザーフレンドリーな方法です。完全な記事では、セットアップ手順、コード例、テスト戦略、セキュリティ基準について詳しく説明しています。

## Ionic生体認証（FaceID / 指紋認証）

## セットアップ要件

[Capacitorアプリ](https://capgo.app/plugins/ivs-player/)で生体認証を有効にするには、いくつかのツール、依存関係、およびプラットフォーム固有の設定を構成する必要があります。以下に、AndroidとiOSプラットフォーム両方のステップバイステップのセットアップ要件を示します。

### 必要なツールと依存関係

実装を始める前に、以下のツールと依存関係が準備されていることを確認してください：

| コンポーネント | 最小バージョン | 目的 |
| --- | --- | --- |
| **Capacitor** | 3.0以上 | コアフレームワーク |
| **[Node.js](https://nodejs.org/en)** | 最新LTS | パッケージ管理 |
| **[Xcode](https://developer.apple.com/xcode/)** | 最新バージョン | iOS開発 |
| **[Android Studio](https://developer.android.com/studio)** | 最新バージョン | Android開発 |
| **物理デバイス** | iOS 13+ / Android API 23+ | 生体認証機能のテスト |

Capacitorバージョンに基づいて[生体認証プラグイン](https://capgo.app/plugins/capacitor-native-biometric/)を選択してください：

-   Capacitor 7用の**@aparajita/capacitor-biometric-auth**
-   Capacitor 3と4用の**capacitor-native-biometric**
-   追加のデバイス認証情報サポート用の**@capawesome-team/capacitor-biometrics**

### Androidセットアップ手順

Androidで生体認証を設定するには、プロジェクトファイルに以下の調整が必要です：

1.   **マニフェスト設定**
    
    `AndroidManifest.xml`ファイルに以下の権限を追加：
    
    ```xml
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />
    <!-- For Android 9 (API 28) or lower -->
    <uses-permission android:name="android.permission.USE_FINGERPRINT" />
    ```
    
2.   **Gradle設定**
    
    アプリの`build.gradle`ファイルに必要な生体認証依存関係を追加：
    
    ```kotlin
    dependencies {
        implementation "androidx.biometric:biometric:1.1.0"
    }
    ```
    
3.   **プラグイン登録**
    
    `MainActivity.java`ファイルに生体認証プラグインを登録：
    
    ```java
    public class MainActivity extends BridgeActivity {
        @Override
        public void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            registerPlugin(NativeBiometricPlugin.class);
        }
    }
    ```
    

### iOSセットアップ手順

iOSでは、生体認証を設定するために以下の手順が必要です：

1.   **Info.plist設定**
    
    `Info.plist`ファイルに必要な使用説明を追加：
    
    ```xml
    <key>NSFaceIDUsageDescription</key>
    <string>Authentication required for secure access</string>
    ```
    
2.   **Keychain設定**
    
    Xcodeでキーチェーン機能を有効化：
    
    -   プロジェクト設定を開く。
    -   **Signing & Capabilities**タブに移動。
    -   **Keychain Sharing**機能を追加。
    -   必要に応じてアクセスグループを設定。
3.   **認証ポリシー**
    
    以下を処理するローカル認証ポリシーを設定：
    
    -   認証失敗の試行
    -   デバイスパスコードへのフォールバック
    -   生体認証の利用可能性チェック
    
    セキュリティを向上させるため、機密データの保存にはiOSキーチェーンを使用します。これにより、Touch IDとFace IDの両方との互換性を確保しながら、ユーザー認証情報を保護します。

## コード実装

セットアップ設定が完了したら、次のステップは安全なコードの実装です。これには適切なプラグインの選択と信頼性の高い認証フローの作成が含まれます。

### プラグイン選択ガイド

Capacitorアプリ用の生体認証プラグインを選択する際は、プロジェクトの具体的なニーズに合わせて選択する必要があります。以下が人気のオプションです：

| プラグイン名 | Capacitorバージョン | 主な機能 | 最適な用途 |
| --- | --- | --- | --- |
| @aparajita/capacitor-biometric-auth | Capacitor 7 | ネイティブ生体認証、デバイス認証情報、包括的なAPI | Capacitor 7で始める新規プロジェクト |
| capacitor-native-biometric | Capacitor 3, 4 | 安全な認証情報保存、Keychain/Keystore統合 | 認証情報管理が必要な既存プロジェクト |
| @capawesome-team/capacitor-biometrics | 全バージョン | 生体認証とデバイス認証情報認証、クリーンなAPI | 柔軟な認証オプションが必要なプロジェクト |

### 認証コード例

**@capawesome-team/capacitor-biometrics**プラグインを使用した生体認証の方法：

```typescript
import { Biometrics } from '@capawesome-team/capacitor-biometrics';

async function setupBiometricAuth() {
  try {
    const { isAvailable } = await Biometrics.isBiometricsAvailable();

    if (!isAvailable) {
      return {
        success: false,
        message: "Biometric authentication not available"
      };
    }

    const result = await Biometrics.authenticate({
      reason: "Access your secure data",
      title: "Verify Identity",
      subtitle: "Use biometrics to authenticate",
      cancelTitle: "Use Password Instead"
    });

    return {
      success: true,
      data: result
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
```

安全な認証情報を管理するために、**capacitor-native-biometric**プラグインは簡単なアプローチを提供します：

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

async function secureCredentialStorage(credentials) {
  try {
    await NativeBiometric.setCredentials({
      username: credentials.username,
      password: credentials.password,
      server: "api.yourserver.com"
    });

    // Verify storage by retrieving the credentials
    const stored = await NativeBiometric.getCredentials({
      server: "api.yourserver.com"
    });

    return stored.username === credentials.username;
  } catch (error) {
    console.error("Credential storage failed:", error);
    return false;
  }
}
```

コードを配置したら、適切なテストを通じてその機能を検証することが重要です。

### テスト方法

生体認証が信頼性が高く安全であることを確認するために、以下のテスト戦略を検討してください：

-   **デバイス互換性テスト**
    
    様々なデバイスと条件で認証が機能することを確認：
    
    ```typescript
    async function runCompatibilityTests() {
      const tests = {
        biometricAvailable: await Biometrics.isBiometricsAvailable(),
        credentialStorage: await testCredentialStorage(),
        authenticationFlow: await testAuthFlow(),
        fallbackMechanism: await testFallbackAuth()
      };
    
      return tests;
    }
    ```
    
-   **エラー処理と一般的なシナリオ**
    
    エラーをシミュレートしフォールバックメカニズムをテスト：
    
    ```typescript
    async function validateErrorHandling() {
      try {
        await Promise.race([
          Biometrics.authenticate(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), 30000)
          )
        ]);
      } catch (error) {
        return implementFallbackAuth();
      }
    }
    ```
    
-   **セキュリティ検証**
    
    実装がセキュリティ基準を満たしていることを確認：
    
    ```typescript
    async function validateSecurityMeasures() {
      const validations = {
        keychain: await validateKeychainAccess(),
        biometricStrength: await checkBiometricStrength(),
        encryptionStatus: await verifyEncryption()
      };
    
      return validations.keychain &&
             validations.biometricStrength &&
             validations.encryptionStatus;
    }
    ```
    

さらに、以下のシナリオをテストします：

-   複数回の認証失敗
-   デバイス再起動後の動作
-   フォアグラウンドとバックグラウンド状態の遷移
-   ネットワーク接続の変更
-   システムの生体認証設定の変更

徹底的なテストにより、生体認証システムが堅牢で実世界での使用に適していることを確認します。

## セキュリティ基準

生体認証のセキュリティを強化するには、データ保護を優先し、コンプライアンス規制に従い、階層的なセキュリティ技術を適用する必要があります。

### データセキュリティ方法

iOSでは生体認証データは**Keychain**を使用して暗号化・保存され、Androidでは**Keystore**を使用します。`capacitor-native-biometric`プラグインを使用している場合、以下のようにユーザー認証情報を安全に保存できます：

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

async function securelyStoreCredentials(username, password) {
  const server = "api.yourapp.com";

  // Use the highest available encryption
  await NativeBiometric.setCredentials({
    username,
    password,
    server,
    authenticationType: "biometricAndDevice",
    accessControl: "biometryAny"
  });
}
```

データ送信については、常に**エンドツーエンド暗号化**を実装して機密情報を保護します。

### ストアガイドライン

アプリストアは[生体認証セキュリティ](https://capgo.app/plugins/capacitor-native-biometric/)に関して厳格なルールを施行しています。主要プラットフォームの要件は以下の通りです：

| プラットフォーム | 主要要件 | 実装上の注意 |
| --- | --- | --- |
| iOS | LocalAuthentication フレームワークの使用、フォールバックオプションの提供、明確なユーザー同意の確保 | Face IDとTouch IDの両方をサポートする必要がある |
| Android | BiometricPrompt APIの活用、明示的なユーザー許可の取得、セキュリティレベルの宣言 | 様々なセキュリティレベルに応じた指紋認証と顔認証のサポート |

### マルチファクター設定

セキュリティを強化するには、[生体認証](https://capgo.app/plugins/capacitor-native-biometric/)を追加の認証層と組み合わせることがよくあります。例えば、初期の[生体認証](https://capgo.app/plugins/capacitor-native-biometric/)の後、ユーザーのアイデンティティを確認する二次ステップを追加できます：

```typescript
async function setupMultiFactorAuth() {
  // First factor: Biometric verification
  const biometricResult = await Biometrics.authenticate({
    reason: "Verify your identity",
    title: "Authentication Required"
  });

  if (biometricResult.verified) {
    // Second factor: Time-based OTP or similar mechanism
    const totpResult = await verifyTOTP();
    return totpResult.success;
  }

  return false;
}
```

マルチファクターアプローチには通常以下が含まれます：

-   **主要な生体認証**
-   **二次認証**（SMSコードや認証アプリなど）
-   **トランザクション固有の確認**によるセキュリティの強化

Capgoをライブアップデート用に使用している場合は、その**エンドツーエンド暗号化**機能を活用してセキュリティ基準への準拠を確保してください。これにより、生体認証方法がアップデート中も安全に保たれ、プラットフォームの要件に沿っていることが保証されます[\[1\]](https://capacitor-tutorial.com/plugins/capacitor-biometric-auth/)。

## メンテナンスガイド

速度、バッテリー効率、タイムリーなアップデートのバランスを取ることで、生体認証システムをスムーズに運用し続けることができます。

### 速度とバッテリーのヒント

効率的な生体認証を実装するためのコードスニペット：

```typescript
// Efficient authentication implementation
async function optimizedBiometricCheck() {
  const authResult = await NativeBiometric.isAvailable();

  if (!authResult.isAvailable) {
    return handleFallback();
  }

  // Cache authentication state to avoid unnecessary re-checks
  if (this.cachedAuthState && !this.isAuthExpired()) {
    return this.cachedAuthState;
  }

  return NativeBiometric.verifyIdentity({
    reason: "Verify your identity",
    title: "Authentication Required",
    maxAttempts: 3
  });
}
```

生体認証システムのパフォーマンスを最大限に活用するには：

-   **バッチ認証**：複数のプロンプトを避け、認証が必要なアクションを1つのセッションにグループ化して中断を減らす。
-   **スマートキャッシング**：認証状態を安全に保存し、冗長な検証を避けるために有効期限を設定する。
-   **バックグラウンド最適化**：認証中は不要なタスクを一時的に停止して、速度を向上させバッテリーを節約する。
-   **イベント駆動アプローチ**：認証状態の監視に定期的なポーリングの代わりにイベントリスナーを使用する。

### [Capgo](https://capgo.app/)でのアップデート

![Capgo](https://assets.seobotai.com/capgo.app/68240bea59ff61289922287e/21f0f35e63cf5752e2e56f9c4dd03eab.jpg)

Capgoはバイオメトリック更新を簡素化します。以下のように設定してください:

```typescript
// Set Capgo parameters for biometric updates
{
  "plugins": {
    "BiometricAuth": {
      "version": "latest",
      "updateStrategy": "immediate",
      "rollbackEnabled": true
    }
  }
}
```

Capgoが更新管理に優れているツールである理由:

-   **即時デプロイ**: 重要なセキュリティ修正と新機能をすぐにプッシュできます。
-   **段階的なロールアウト**: 全ユーザーに展開する前に、特定のユーザーグループでアップデートをテストできます。
-   **バージョン管理**: より良い管理のために異なる認証バージョンを追跡できます。
-   **緊急ロールバック**: 問題が発生した場合、すぐに前のバージョンに戻すことができます。

### API更新

バイオメトリックAPIを最新に保つことは、セキュリティと機能性にとって重要です。以下のガイドラインに従って、更新に積極的に取り組んでください:

| 更新タイプ | 監視方法 | 実装タイムライン |
| --- | --- | --- |
| セキュリティパッチ | プラグインリポジトリアラート | 24時間 |
| 機能更新 | プラットフォームドキュメント | 1週間 |
| 破壊的変更 | リリースノート | 2-4週間 |
| ストアポリシー更新 | 開発者ポータル | 提出前 |

以下の分野に注目してください:

-   **プラグイン更新**: `@capawesome-team/capacitor-biometrics`などの依存関係を定期的に更新します。
-   **プラットフォーム変更**: iOSのLocalAuthenticationとAndroidのBiometricPrompt APIの更新を追跡します。
-   **セキュリティ基準**: 最新のバイオメトリックセキュリティ要件に合わせます。
-   **ストアガイドライン**: 提出の問題を避けるため、Apple App StoreとGoogle Playのポリシーに準拠します。

## 結論

### 重要なポイント

Capacitorアプリにバイオメトリック認証を追加する際は、セキュリティ、パフォーマンス、ユーザーエクスペリエンスのバランスを取る必要があります。以下は念頭に置くべき核となる要素の概要です:

| **コンポーネント** | **実装の焦点** | **重要な考慮事項** |
| --- | --- | --- |
| **セキュリティ基準** | プラットフォームネイティブストレージ (Keychain/Keystore) | エンドツーエンドの暗号化、認証情報の保護 |
| **プラグイン選択** | 最新バージョンの互換性 | 複数のバイオメトリックタイプのサポート |
| **更新管理** | 定期的なメンテナンスサイクル | セキュリティパッチの迅速な展開 |
| **ユーザーエクスペリエンス** | フォールバック認証オプション | 明確でユーザーフレンドリーな認証プロンプト |

これらのコンポーネントが成功する統合へのロードマップとなります。

### バイオメトリック認証を実装するためのステップ

アプリにバイオメトリック認証を統合するには、以下のステップに従ってください:

-   **プラグイン統合**  
    Capacitorバージョンに合ったバイオメトリックプラグインを選択することから始めます。`AndroidManifest.xml`や`Info.plist`などの設定ファイルが適切に設定されていることを確認します。認証情報の安全な保存には、KeychainやKeystoreなどのネイティブソリューションを利用します。
    
-   **セキュリティ設定**  
    すべての認証情報送信にエンドツーエンドの暗号化を有効にしてユーザーデータを保護します。必要に応じて、[多要素認証](https://capgo.app/docs/webapp/mfa/)を含めて追加のセキュリティ層を提供します。障害時の機能を維持するため、堅牢なエラー処理とフォールバックオプションを計画します。
    
-   **継続的なメンテナンス**  
    セキュリティパッチの定期的な更新パイプラインを設定してアプリを安全に保ちます。プラグインの更新を追跡し、セキュリティアドバイザリーを監視します。Capgoのようなツールを使用すると、即時更新を可能にすることでこのプロセスを簡素化できます。Capgoは24時間以内に95%のユーザー更新率を誇り、ツールキットの貴重な追加となります[\[2\]](https://capgo.app)。
    

> "Capgoは生産性を向上させたい開発者にとって必須のツールです。バグ修正のためのレビューを避けられることは素晴らしいです。" - Bessie Cooper [\[2\]](https://capgo.app)

## よくある質問

:::faq
### Capacitorのバイオメトリックプラグインの違いは何で、アプリに最適なものをどのように選択できますか？

Capacitorアプリのバイオメトリックプラグインを選ぶ際は、プロジェクトの具体的な要件に合わせることが重要です。**プラットフォームの互換性**（iOS、Android、または両方のサポートが必要か）、統合プロセスの簡単さ、**Face ID**や**指紋認証**などの高度なバイオメトリック方式をサポートしているかなどの要因を考慮してください。

このガイドは[Capacitorアプリ](https://capgo.app/blog/capacitor-comprehensive-guide/)でのバイオメトリック認証の実装に焦点を当てていますが、**Capgo**のようなツールも重要な役割を果たすことができます。アプリストアの承認なしでリアルタイムの更新をプッシュすることができ、AppleとAndroidの両方の基準に準拠しながら、アプリを最新のセキュリティ機能（バイオメトリック更新を含む）で最新の状態に保つことができます。
:::

:::faq
### Capacitorアプリのバイオメトリックがセキュリティスタンダードとアプリストアガイドラインに適合していることをどのように確認できますか？

Capacitorアプリのバイオメトリック認証が現在のセキュリティ基準とアプリストアルールを満たすようにするには、以下の主要な実践に従ってください:

-   **信頼できるプラグインを選択**: Capacitorの`@capacitor/biometrics`のような信頼できるバイオメトリック認証プラグインを使用して、アプリが安全でデバイス間でシームレスに動作することを確保します。
-   **プラットフォームルールに従う**: ユーザーの同意取得、安全なストレージの使用、PINやパスワードなどのバックアップオプションの提供など、AppleとAndroidのガイドラインに従います。
-   **依存関係を最新に保つ**: 脆弱性を修正し、変更される基準に合わせるため、アプリとそのライブラリを定期的に更新します。

**Capgo**のようなライブ更新サービスを使用すると、このプロセスをよりスムーズにすることができます。アプリストアの承認の遅延を回避して、セキュリティ更新や改善を即座にプッシュすることができます。これにより、アプリを安全で、準拠し、AppleとAndroidのポリシーに最新の状態に保つことができます。
:::

:::faq
### 開発者がCapacitorアプリにバイオメトリック認証を統合する際に直面する可能性のある課題と、それらを克服する方法は何ですか？

Capacitorアプリでのバイオメトリック認証の実装には、多くの課題があります。これには、デバイス間の互換性の確保、ユーザー権限の効果的な管理、機密データの安全な取り扱いなどが含まれます。以下がこれらの問題に対処する方法です:

-   **デバイスの互換性**: AndroidとiOS両方でバイオメトリック機能をサポートするために、`@capacitor-fingerprint-auth`のようなプラグインの使用を検討してください。これらのツールはプラットフォーム間のギャップを埋め、様々なデバイスでアプリがシームレスに動作することを確保します。
    
-   **ユーザー権限**: アプリがバイオメトリックアクセスを必要とする理由を明確に説明することが重要です。透明性のある情報をユーザーに提供し、ユーザーが権限を付与しない場合でも適切に対処できるようにアプリを設計します。
    
-   **データセキュリティ**: 認証データの保護は重要です。[暗号化のベストプラクティス](https://capgo.app/docs/cli/migrations/encryption/)に従い、機密情報の安全を確保するために各プラットフォームが提供するセキュリティガイドラインを遵守します。
    

バイオメトリック機能に関連する更新や問題を修正する際に、アプリストアの承認なしで行えるようにするには、Capgoのようなツールを使用できます。これにより、AppleとAndroidのポリシーに準拠しながら、バグの修正や機能の改善をリアルタイムで行うことができます。
:::
