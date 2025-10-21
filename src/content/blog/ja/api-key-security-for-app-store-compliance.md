---
slug: sicurezza-della-chiave-api-per-la-conformità-con-app-store
title: API キー セキュリティのストア コンプライアンス
description: アプリストアのガイドラインを遵守し、ユーザーデータを保護するために、APIキーの保存、転送、管理を含む重要な保護戦略について学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-30T02:43:03.273Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67e8ac6c283d21cbd67ac65e-1743302593642.jpg
head_image_alt: モバイル開発
keywords: >-
  API keys, security, encryption, app store compliance, HTTPS, key management,
  mobile security, transport security
tag: 'Development, Mobile, Updates'
published: true
locale: ja
next_blog: ''
---
**[API キー](https://capgo.app/docs/webapp/api-keys/)を安全に保管することは、ユーザーデータを保護し、アプリストアの規則を満たすために重要です。** キーが漏洩すると、データ侵害、サービスの悪用、アカウントの侵害につながる可能性があります。

### 重要なポイント:

-   **コードにキーを保存しない**: 環境変数や安全なファイルを使用する。
-   **プラットフォームツールを使用**: iOS Keychain と Android [EncryptedSharedPreferences](https://developer.android.com/reference/androidx/security/crypto/EncryptedSharedPreferences)。
-   **API キーを暗号化**: AES-256暗号化で追加のセキュリティ層を提供。
-   **安全な転送**: 常にHTTPSを使用し、SSL証明書のピン留めを検討。
-   **監視とキーのローテーション**: 定期的にキーをローテーションし、異常な使用を追跡。

これらのプラクティスを実装することで、アプリを保護し、AppleとGoogleのガイドラインに準拠し、ユーザーを保護できます。

## 安全なAPI キーの保存方法

### ソースコードからAPI キーを削除

API キーをソースコードに直接含めると、逆コンパイルやリポジトリの漏洩によって露出する可能性があります。これを避けるために、以下のアプローチを検討してください：

-   ローカル開発には**環境変数**を使用。
-   バージョン管理から除外された**安全な設定ファイル**にキーを保存。
-   キーの管理には**リモート設定サービス**を利用。

iOSでは、コードベースから設定を分離するために**XCConfig ファイル**の使用を検討してください。Androidでは、`gradle.properties`を使用してキーを管理できます：

```kotlin
# Store in ~/.gradle/gradle.properties
API_KEY=your_key_here

# Reference in build.gradle
buildConfigField "String", "API_KEY", "\"${project.API_KEY}\""
```

### プラットフォームのセキュリティツール

API キーを保存する際のセキュリティを強化するために、プラットフォーム固有のツールを活用してください。

iOSでは、安全な保存のために**[Keychain Services](https://developer.apple.com/documentation/security/keychain-services)**を使用：

```swift
let query: [String: Any] = [
    kSecClass as String: kSecClassGenericPassword,
    kSecAttrAccount as String: "APIKey",
    kSecValueData as String: apiKey.data(using: .utf8)!
]
let status = SecItemAdd(query as CFDictionary, nil)
```

Androidでは、安全なキー保存のために**EncryptedSharedPreferences**を活用：

```kotlin
val masterKey = MasterKey.Builder(context)
    .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
    .build()

val sharedPreferences = EncryptedSharedPreferences.create(
    context,
    "secret_shared_prefs",
    masterKey,
    EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
    EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
)
```

### 環境ごとのキーの分離

開発、ステージング、本番環境で異なるAPI キーを使用します。各環境には以下が必要です：

-   固有のキーローテーションスケジュール。
-   使用状況の監視。
-   厳格なアクセス制御。

環境固有のキーは、設定ファイルではなく**安全なCI/CD変数**に保存します。これにより、自動化されたビルドプロセスをサポートしながら、キーを保護することができます。さらに、転送中のキーを保護するための安全な転送メカニズムを確保してください。

## 高度なモバイルiOSセキュリティ – ランタイム攻撃とAPI キー...

<iframe src="https://www.youtube.com/embed/HfRP0lCbqZA" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## API キーの転送セキュリティ

転送中のAPI キーを安全に保つことは、ユーザーデータを保護し、アプリストアの要件に準拠するために不可欠です。強力な転送セキュリティ対策は、中間者攻撃や不正アクセスなどの攻撃を防ぐのに役立ちます。

### HTTPSの実装

API通信を保護するために、常にHTTPトラフィックをHTTPSにリダイレクトします。TLS 1.3以降を使用し、信頼できる認証局からSSL証明書を取得します。

以下は、Node.js [Express](https://expressjs.com/)アプリケーションでHTTPSを強制する基本的な例です：

```javascript
const express = require('express');
const app = express();

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
    if (!req.secure) {
        return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
});
```

さらなる保護層として、証明書のピン留めの実装を検討してください。

### SSL証明書のピン留め

証明書のピン留めは、サーバーのSSL証明書が信頼できるコピーと一致することを確認し、偽の証明書の使用を防ぎます。

iOSでは、`URLSession`を使用して証明書のピン留めを実装できます。例：

```swift
class APIManager: NSObject, URLSessionDelegate {
    func urlSession(_ session: URLSession, didReceive challenge: URLAuthenticationChallenge, completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {
        guard let serverTrust = challenge.protectionSpace.serverTrust,
              let certificate = SecTrustGetCertificateAtIndex(serverTrust, 0) else {
            completionHandler(.cancelAuthenticationChallenge, nil)
            return
        }

        // Compare certificate with pinned certificate
        if validateCertificate(certificate) {
            completionHandler(.useCredential, URLCredential(trust: serverTrust))
        } else {
            completionHandler(.cancelAuthenticationChallenge, nil)
        }
    }
}
```

転送の保護に加えて、アプリケーションレベルでAPI キーを暗号化します。

### API キーの暗号化

[API キーの暗号化](https://capgo.app/docs/webapp/api-keys/)は、さらなるセキュリティ層を追加します。例えば、Capgoはアプリの更新にエンドツーエンドの暗号化を使用しています。

> "真のエンドツーエンド暗号化を持つ唯一のソリューション、他は単に更新に署名するだけ" - Capgo [\[1\]](https://capgo.app/)

API キーを暗号化するには、信頼性の高い暗号化アルゴリズムを使用します。以下は、Node.jsでAES-256-GCMを使用してAPI キーを暗号化する例です：

```javascript
const crypto = require('crypto');

function encryptAPIKey(apiKey, encryptionKey) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey, iv);

    let encrypted = cipher.update(apiKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
        encrypted: encrypted,
        iv: iv.toString('hex'),
        tag: cipher.getAuthTag().toString('hex')
    };
}
```

HTTPS、証明書のピン留め、暗号化を組み合わせることで、API キーに対する強力な防御を確保できます。

## API キーのセキュリティ管理

API キーを効果的に管理するということは、その使用状況を注意深く監視し、定期的にローテーションを行い、厳格なアクセス制御を実施することを意味します。これらのステップは、機密データを保護し、アプリストアの要件への準拠を確保するのに役立ちます。

### 使用状況の監視

API キーの使用状況を追跡することは、異常なアクティビティを発見するために重要です。リアルタイム分析を使用して以下を監視します：

-   リクエストのパターンと量
-   アクセスの地理的位置
-   エラーの率と種類
-   認証の失敗

Node.jsでの例：

```javascript
const apiMetrics = {
    trackRequest: (apiKey, endpoint) => {
        // Log request details
        const requestData = {
            timestamp: new Date().toISOString(),
            endpoint,
            apiKey: hashKey(apiKey),
            geoLocation: getRequestLocation(),
            responseTime: calculateResponseTime()
        };

        // Alert on suspicious patterns
        if (isAnomalous(requestData)) {
            notifySecurityTeam(requestData);
        }
    }
};
```

### キーローテーションのスケジュール

使用状況を把握したら、定期的にキーをローテーションすることを確認してください。自動化されたローテーションプロセスは、アプリストアの要件への準拠を維持するのに役立ちます。以下はローテーション戦略です：

-   **緊急ローテーション:** 侵害が疑われる場合、直ちにキーを無効化。
-   **定期ローテーション:** 四半期ごとに本番キーを更新。
-   **開発ローテーション:** テスト環境のキーを毎月更新。

混乱を最小限に抑えるため、キーの変更時には移行期間を設けます：

```javascript
const keyRotation = {
    oldKey: process.env.OLD_API_KEY,
    newKey: process.env.NEW_API_KEY,
    transitionPeriod: 7 * 24 * 60 * 60 * 1000, // 7 days
    startDate: new Date()
};
```

### アクセス制御の設定

監視とローテーションは方程式の一部に過ぎません。厳格なアクセス制御も実施する必要があります。必要性に基づいて権限を割り当て、最小権限の原則に従います：

```javascript
const accessControl = {
    validateAccess: (apiKey, requestedOperation) => {
        const keyPermissions = getKeyPermissions(apiKey);
        const environmentType = getCurrentEnvironment();

        return isOperationAllowed(keyPermissions, requestedOperation, environmentType);
    }
};
```

定期的にアクセス権を持つユーザーを確認し、必要に応じて権限を調整し、異常なアクティビティに対する自動アラートを設定します。これらの対策により、アプリストアの規則に準拠しながら、強力なセキュリティを維持できます。

## [Capgo](https://capgo.app/)のセキュリティ機能

![Capgo](https://assets.seobotai.com/capgo.app/67e8ac6c283d21cbd67ac65e/93c1d42fe1ebf1e9553e1e7f4f856f98.jpg)

Capgoは、安全な保存と転送方法をプラットフォームに組み込まれた高度な機能と組み合わせることで、アプリのセキュリティを強化します。

### Capgoのセキュリティアーキテクチャ

Capgoのシステムは、750の本番アプリに2,350万以上の[安全な更新](https://capgo.app/docs/live-updates/update-behavior/) を正常に配信しています[\[1\]](https://capgo.app/) 。**エンドツーエンド暗号化**を使用し、認可されたユーザーのみが更新を復号化できることを保証します。以下がそのセキュリティ設定です：

```javascript
const capgoSecurity = {
    encryptionType: 'end-to-end',
    keyStorage: {
        separate: true,
        encrypted: true,
        environment: process.env.NODE_ENV
    },
    updateVerification: async (update) => {
        const isValid = await verifySignature(update);
        const isAuthorized = await checkUserPermissions(update.userId);
        return isValid && isAuthorized;
    }
};
```

この設計は、API キーを保護するだけでなく、アプリストアの要件への準拠も簡素化します。

### アプリストアガイドラインへの準拠

Capgoは、更新を迅速かつ安全に配信し、82%のグローバル成功率を達成し、アクティブユーザーの95%が24時間以内に更新を受信しています[\[1\]](https://capgo.app/) 。その機能は潜在的な脆弱性に対処するのに役立ちます：

-   アプリストアのポリシーに合わせた自動キーローテーション
-   特定の環境に合わせたデプロイメントコントロール
-   更新管理のための細かい権限設定

### CI/CDセキュリティ統合

Capgoは、API キーの保護を強化するためにCI/CDプラットフォームとシームレスに連携します。以下は統合の例です：

```yaml
capgo_deployment:
    environment:
        - CAPGO_API_KEY: ${SECURED_API_KEY}
        - APP_ENV: production
    security:
        - signature_verification: true
        - key_rotation: enabled
        - access_control: role_based
```

| セキュリティ機能 | 実装 |
| --- | --- |
| キーの暗号化 | ビルドとデプロイメント中のエンドツーエンド暗号化 |
| アクセス制御 | デプロイメントトリガーのロールベースの権限 |
| 監査ログ | すべてのデプロイメントアクティビティの包括的なログ |
| バージョン管理 | デプロイされた更新の安全な追跡 |

> "エンドツーエンド暗号化。あなたのユーザーだけが更新を復号化でき、他の誰もできません。" [\[1\]](https://capgo.app/) - Capgo

## まとめ

API キーを安全に保つことは、アプリストアの要件を満たし、ユーザーデータを保護するために重要です。以下は主要なプラクティスと次のステップの概要です。

### セキュリティチェックリスト

以下の表は、AppleとGoogleの基準に沿ってAPI キーを保護するための重要なステップを示しています：

| セキュリティ対策 | 実装要件 | コンプライアンスへの影響 |
| --- | --- | --- |
| **ストレージセキュリティ** | エンドツーエンド暗号化と環境の分離を使用 | Apple/Googleのデータ保護規則に準拠 |
| **トランスポート層** | HTTPSを強制しSSL証明書のピン留めを使用 | 転送中のデータを保護 |
| **アクセス制御** | ロールベースの権限を適用し[アクセスログ](https://capgo.app/docs/webapp/logs/)を追跡 | 不正アクセスをブロック |
| **キー管理** | キーを自動的にローテーションし環境固有のキーを使用 | 強力な継続的セキュリティを維持 |

このチェックリストをAPI キーの保護のガイドとして参照してください。

### 次のステップ

1.  **現在の実装を監査**
    
    既存のキーの保存方法と転送方法の脆弱性を確認し、特に暗号化とソースコードの露出に注目します。
    
2.  **セキュリティ対策を実装**
    
    リスクを軽減しアプリストアの要件を満たすために、エンドツーエンド暗号化を適用します。
    
3.  **監視システムを確立**
    
    自動アラートを設定し、継続的なセキュリティを確保するために定期的な監査を実施します。
    

> "アプリストア準拠" - Capgo [\[1\]](https://capgo.app/)
