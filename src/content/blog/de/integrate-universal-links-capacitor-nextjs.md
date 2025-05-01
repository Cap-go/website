---
slug: integrate-universal-links-capacitor-nextjs
title: Capacitor로 Next.js에서 유니버설 링크를 통합하는 방법
description: 'Next.js와 Capacitor를 사용하여, iOS 및 Android 플랫폼에서 앱의 유니버셜 링크를 구성하는 단계별 방법을 알아보세요.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-14T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /deeplink_next_capacitor.webp
head_image_alt: Universelle Capacitor-Links
keywords: >-
  Capacitor, Universal Links, Next.js, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: DeepLinking
published: true
locale: de
next_blog: ''
---

Universelle Links unter iOS und App Links unter Android ermöglichen es Benutzern, direkt über einen Link in Ihre App zu gelangen, ohne den Browser zu nutzen. Dies ist besonders nützlich zur Verbesserung der Benutzererfahrung und zur Beibehaltung des Kontexts von einer Webseite zur App. In diesem Leitfaden gehen wir durch den Prozess der Einrichtung dieser Deep Links für eine Nextjs-App mit Capacitor.

Die Einrichtung von Deep Links erfordert nicht viel Code, aber einige Konfigurationen. Am Ende dieses Leitfadens können Sie einen Link wie `https://www.capgo.app/details/22` anklicken und Ihre App öffnet sich auf der richtigen Seite, wenn sie installiert ist.

## Nextjs Deep Link Einrichtung

Zunächst erstellen wir eine neue Nextjs-App und eine Detailseite zum Testen:

```sh
npx create-next-app@latest capgoLinks
cd capgoLinks
mkdir pages/details
touch pages/details/[id].js
npm run build
npx cap add ios
npx cap add android
```

Stellen Sie sicher, dass Ihre **Bundle ID** in der **capacitor.config.json** Datei korrekt eingestellt ist, da dies entscheidend für die Einrichtung ist:

```json
{
  "appId": "com.capgo.deeplinks",
  "appName": "capgoLinks",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

Für das Routing verwendet Nextjs dateibasiertes Routing, durch das Erstellen einer Datei unter `pages/details/[id].js` haben wir bereits unsere Wildcard-Route eingerichtet.

In `pages/details/[id].js` können wir die ID aus der URL mit Nextjs's eingebautem Router abrufen:

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

Jetzt behandeln wir das `appUrlOpen` Event mit Capacitor. Dieses Event wird ausgelöst, wenn die App über ein benutzerdefiniertes URL-Schema geöffnet wird. Fügen Sie einen Listener in der `pages/_app.js` Datei hinzu:

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

Dieser Code überwacht das `appUrlOpen` Event und navigiert zur entsprechenden Route innerhalb Ihrer Nextjs-App.

## iOS-Konfiguration

Für iOS benötigen Sie eine App-ID mit aktivierten Associated Domains. Erstellen Sie eine **apple-app-site-association** Datei mit folgendem Inhalt, ersetzen Sie `YOURTEAMID` und `com.your.bundleid` durch Ihre tatsächliche Team-ID und Bundle-ID:

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

Laden Sie diese Datei in das `/.well-known` Verzeichnis Ihrer Domain hoch, sodass sie unter `https://www.capgo.app/.well-known/apple-app-site-association` erreichbar ist.

Fügen Sie in Xcode die Domain zu den Berechtigungen Ihrer App im Format `applinks:capgo.app` hinzu.

## Android-Konfiguration

Für Android App Links folgen Sie diesen Schritten:

1. Generieren Sie eine Keystore-Datei, falls Sie keine haben
2. Beziehen Sie den SHA256-Fingerabdruck aus dem Keystore
3. Erstellen Sie eine **assetlinks.json** Datei mit Ihrem Paketnamen und SHA256-Fingerabdruck
4. Laden Sie diese Datei in das `.well-known` Verzeichnis Ihrer Domain hoch

Fügen Sie in Ihrer `AndroidManifest.xml` einen `intent-filter` zum `activity` Element hinzu, das Deep Links behandelt:

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

Nach dem Hochladen der `assetlinks.json` Datei können Sie diese mit Googles Digital Asset Links Tool überprüfen. Wenn alles korrekt eingerichtet ist, sehen Sie ein grünes Häkchen.

Um Ihre App zu erstellen und zu signieren, verwenden Sie folgende Befehle:

```sh
cd android
./gradlew assembleRelease
cd ..
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
zipalign -v 4 android/app/build/outputs/apk/release/app-release-unsigned.apk capgo.apk
adb install capgo.apk
```

Dies installiert die signierte App auf Ihrem verbundenen Android-Gerät.

## Capacitor Konfiguration für Native Projekteinstellungen

Zur Automatisierung nativer Projekteinstellungen können Sie das [Capacitor configure package](https://github.com/ionic-team/capacitor-configure/) verwenden. Installieren Sie es in Ihrem Projekt:

```sh
npm install @capacitor/configure
```

Erstellen Sie eine `capacitor.config.yaml` Datei im Hauptverzeichnis Ihres Projekts:

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

Führen Sie das Konfigurationstool mit dieser Konfiguration aus:

```sh
npx cap-config run capacitor.config.yaml
```

Dies wendet die in der YAML-Datei angegebenen Einstellungen auf Ihre nativen Projekte an.

## Fazit

Die Einrichtung von Deep Links mit Capacitor für eine Nextjs-App erfordert die Konfiguration Ihrer Domain und Projekteinstellungen sowohl für iOS als auch für Android. Während der Prozess Aufmerksamkeit für Details erfordert, ist er im Vergleich zu älteren Methoden optimiert und benötigt keine zusätzlichen Plugins. Stellen Sie sicher, dass Ihre Domain-Verifizierungsdateien korrekt bereitgestellt werden und überprüfen Sie sie mit den jeweiligen Plattform-Tools. Nach der Einrichtung wird Ihre App nahtlos von Web-Links geöffnet und bietet einen reibungslosen Übergang für Ihre Benutzer von Web zu App.