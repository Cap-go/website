---
slug: integrate-universal-links-capacitor-nextjs
title: Next.jsでCapacitorのユニバーサルリンクを統合する方法
description: >-
  Next.jsアプリでCapacitorを使用して、iOSとAndroidの両プラットフォームでユニバーサルリンクを設定する方法をステップバイステップで学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-12-14T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /deeplink_next_capacitor.webp
head_image_alt: Capacitor ユニバーサルリンク
keywords: >-
  Capacitor, Universal Links, Next.js, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: DeepLinking
published: true
locale: ja
next_blog: ''
---
iOSのユニバーサルリンクとAndroidのAppリンクを使用すると、ユーザーはブラウザを経由せずに直接アプリに移動することができます。これは特にユーザーエクスペリエンスを向上させ、Webページからアプリへのコンテキストを維持するのに役立ちます。このガイドでは、Capacitorを使用したNext.jsアプリのディープリンクの設定プロセスについて説明します。

ディープリンクの設定には多くのコードは必要ありませんが、いくつかの設定が必要です。このガイドの最後には、`https://www.capgo.app/details/22`のようなリンクをクリックすると、インストールされているアプリが正しいページで開くようになります。

## Next.jsディープリンク設定

まず、新しいNext.jsアプリとテスト用の詳細ページを作成します：

```sh
npx create-next-app@latest capgoLinks
cd capgoLinks
mkdir pages/details
touch pages/details/[id].js
npm run build
npx cap add ios
npx cap add android
```

設定に重要なため、**capacitor.config.json**ファイルで**バンドルID**が正しく設定されていることを確認してください：

```json
{
  "appId": "com.capgo.deeplinks",
  "appName": "capgoLinks",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

ルーティングについて、Next.jsはファイルベースのルーティングを使用するため、`pages/details/[id].js`にファイルを作成することで、すでにワイルドカードルートを設定しています。

`pages/details/[id].js`では、Next.jsの組み込みルーターを使用してURLからIDを取得できます：

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

次に、Capacitorで`appUrlOpen`イベントを処理しましょう。このイベントは、カスタムURLスキームを介してアプリが開かれたときにトリガーされます。`pages/_app.js`ファイルにリスナーを追加します：

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

このコードは`appUrlOpen`イベントをリッスンし、Next.jsアプリ内の適切なルートにナビゲートします。

## iOS設定

iOSの場合、関連ドメインが有効になっているアプリIDが必要です。**apple-app-site-association**ファイルを作成し、`YOURTEAMID`と`com.your.bundleid`を実際のチームIDとバンドルIDに置き換えてください：

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

このファイルをドメインの`.well-known`ディレクトリにアップロードし、`https://www.capgo.app/.well-known/apple-app-site-association`でアクセスできるようにします。

Xcodeで、`applinks:capgo.app`形式を使用してアプリの権限にドメインを追加します。

## Android設定

Androidアプリリンクについてはこれらのステップに従ってください：

1. keystoreファイルがない場合は生成します。
2. keystoreからSHA256フィンガープリントを取得します。
3. パッケージ名とSHA256フィンガープリントを含む**assetlinks.json**ファイルを作成します。
4. このファイルをドメインの`.well-known`ディレクトリにアップロードします。

`AndroidManifest.xml`で、ディープリンクを処理する`activity`要素に`intent-filter`を追加します：

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

`assetlinks.json`ファイルをアップロードした後、GoogleのDigital Asset Linksツールで確認できます。すべてが正しく設定されていれば、緑のチェックマークが表示されます。

アプリをビルドして署名するには、次のコマンドを使用します：

```sh
cd android
./gradlew assembleRelease
cd ..
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
zipalign -v 4 android/app/build/outputs/apk/release/app-release-unsigned.apk capgo.apk
adb install capgo.apk
```

これにより、接続されているAndroidデバイスに署名されたアプリがインストールされます。

## ネイティブプロジェクト設定のためのCapacitor設定

ネイティブプロジェクト設定を自動化するには、[Capacitor configureパッケージ](https://github.com/ionic-team/capacitor-configure/)の使用を検討してください。プロジェクトにインストールします：

```sh
npm install @capacitor/configure
```

プロジェクトのルートに`capacitor.config.yaml`ファイルを作成します：

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

この設定で設定ツールを実行します：

```sh
npx cap-config run capacitor.config.yaml
```

これにより、YAMLファイルで指定された設定がネイティブプロジェクトに適用されます。

## 結論

Next.jsアプリでCapacitorを使用したディープリンクの設定には、iOSとAndroid両方のドメインとプロジェクト設定が必要です。このプロセスは細かい注意が必要ですが、以前の方法と比べて簡素化されており、追加のプラグインは必要ありません。ドメイン検証ファイルが正しく提供されていることを確認し、それぞれのプラットフォームツールでチェックしてください。設定が完了すると、アプリはWebリンクからシームレスに開き、ユーザーにWebからアプリへのスムーズな移行を提供します。
