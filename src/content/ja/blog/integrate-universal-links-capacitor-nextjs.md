---
slug: integrate-universal-links-capacitor-nextjs
title: Next.jsでCapacitorを使用してユニバーサルリンクを統合する方法
description: >-
  Next.js アプリケーションで Capacitor を使用して iOS および Android
  プラットフォーム向けにユニバーサルリンクを設定する方法を段階的に学びましょう。
author: Martin Donadieu
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-14T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /deeplink_next_capacitor.webp
head_image_alt: ユニバーサルリンクコンデンサ
tag: DeepLinking
published: true
locale: ja
next_blog: ''
---

iOSのユニバーサルリンクとAndroidのアプリリンクにより、ユーザーはリンクから直接アプリにアクセスでき、ブラウザをバイパスすることができます。これは、ユーザーエクスペリエンスの向上や、ウェブページからアプリへのコンテキストの維持に特に役立ちます。このガイドでは、Capacitorを使用してNextjsアプリのディープリンクを設定するプロセスについて説明します。

ディープリンクの設定には多くのコードは必要ありませんが、いくつかの構成が関与します。このガイドの終わりには、`https://www.capgoapp/details/22`のようなリンクをクリックし、アプリがインストールされている場合は正しいページが開く状態にすることができます。

## Nextjsディープリンク設定

まず、新しいNextjsアプリとテスト用の詳細ページを作成します。

```sh
npx create-next-app@latest capgoLinks
cd capgoLinks
mkdir pages/details
touch pages/details/[id].js
npm run build
npx cap add ios
npx cap add android
```

**capacitorconfigjson**ファイルに**バンドルID**が正しく設定されていることを確認してください。これは設定にとって重要です。

```json
{
  "appId": "com.capgo.deeplinks",
  "appName": "capgoLinks",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

ルーティングに関して、Nextjsはファイルベースのルーティングを使用しているため、`pages/details/[id].js`というファイルを作成することで、既にワイルドカードルートが設定されています。

`pages/details/[id].js`では、Nextjsの組み込みルーターを使用してURLからIDを取得できます。

```jsx
import { useRouter } from 'next/router'

function DetailsPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <p>My ID: {id}</p>
    </div>
  )
}

export default DetailsPage
```

次に、Capacitorを使って`appUrlOpen`イベントを処理します。このイベントは、カスタムURLスキームを介してアプリが開かれたときにトリガーされます。`pages/_app.js`ファイルにリスナーを追加します。

```jsx
import { useEffect } from 'react'
import { App } from '@capacitor/app'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    App.addListener('appUrlOpen', (event) => {
      const slug = event.url.split('.app').pop()
      if (slug)
        window.location.href = slug

    })
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
```

このコードは`appUrlOpen`イベントをリッスンし、Nextjsアプリ内の適切なルートにナビゲートします。

## iOS設定

iOSの場合、関連ドメインが有効なアプリIDが必要です。次の内容で**apple-app-site-association**ファイルを作成し、`YOURTEAMID`と`com.your.bundle.id`を実際のチームIDとバンドルIDに置き換えます。

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "YOURTEAMID.com.your.bundleid",
        "paths": ["*"]
      }
    ]
  }
}
```

このファイルをドメインの`well-known`ディレクトリにアップロードし、`https://www.capgoapp/well-known/apple-app-site-association`でアクセスできるようにします。

Xcodeで、`applinks:capgoapp`の形式を使用してアプリの権限にドメインを追加します。

## Android設定

Androidアプリリンクについては、以下の手順に従ってください。

1. もしキーストアファイルを持っていない場合は生成してください。
2. キーストアからSHA256フィンガープリントを取得します。
3. パッケージ名とSHA256フィンガープリントを持つ**assetlinks.json**ファイルを作成します。
4. このファイルをドメインの`well-known`ディレクトリにアップロードします。

`AndroidManifest.xml`で、ディープリンクを処理する`activity`要素に`intent-filter`を追加します。

```xml
<activity ...>
  <intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="capgo.app" />
  </intent-filter>
</activity>
```

`assetlinks.json`ファイルをアップロードした後、GoogleのDigital Asset Linksツールを使用して確認できます。すべてが正しく設定されていれば、緑のチェックマークが表示されます。

アプリをビルドし、署名するには、以下のコマンドを使用します。

```sh
cd android
./gradlew assembleRelease
cd ..
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
zipalign -v 4 android/app/build/outputs/apk/release/app-release-unsigned.apk capgo.apk
adb install capgo.apk
```

これにより、接続されたAndroidデバイスに署名されたアプリがインストールされます。

## Capacitorのネイティブプロジェクト設定の構成

ネイティブプロジェクト設定を自動化するために、[Capacitor configureパッケージ](https://github.com/ionic-team/capacitor-configure/)の使用を検討してください。プロジェクトにインストールします。

```sh
npm install @capacitor/configure
```

プロジェクトのルートに`capacitorconfig.yaml`ファイルを作成します。

```yaml
vars:
  BUNDLE_ID: com.capgo.deeplinks
  PACKAGE_NAME: com.capgo.deeplinks
platforms:
  ios:
    targets:
      App:
        bundleId: $BUNDLE_ID
    entitlements:
      - com.apple.developer.associated-domains: ['applinks:capgo.app']
  android:
    packageName: $PACKAGE_NAME
```

この構成で構成ツールを実行します。

```sh
npx cap-config run capacitor.config.yaml
```

これにより、YAMLファイルに指定された設定がネイティブプロジェクトに適用されます。

## 結論

Nextjsアプリ用にCapacitorでディープリンクを設定するには、iOSおよびAndroidの両方についてドメインとプロジェクト設定の構成が必要です。このプロセスは細部に注意を必要としますが、古い方法と比べて効率的であり、追加のプラグインは必要ありません。ドメイン検証ファイルが正しく提供されていることを確認し、それらを各プラットフォームのツールでチェックしてください。設定が完了すると、ユーザーはウェブからアプリに移行する際にスムーズでシームレスな体験が得られます。