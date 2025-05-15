---
slug: integrate-universal-links-capacitor-nextjs
title: Wie man universelle Links in Next.js mit Capacitor integriert
description: >-
  Lerne Schritt für Schritt, wie du universelle Links für deine Next.js-App mit
  Capacitor auf den Plattformen iOS und Android einrichtest.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-14T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /deeplink_next_capacitor.webp
head_image_alt: Capacitor Universelle Links
keywords: >-
  Capacitor, Universal Links, Next.js, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: DeepLinking
published: true
locale: de
next_blog: ''
---
Universelle Links auf iOS und App Links auf Android ermöglichen es den Benutzern, direkt über einen Link in Ihre App zu gelangen, ohne den Browser zu verwenden. Dies ist besonders nützlich, um die Benutzererfahrung zu verbessern und den Kontext von einer Webseite zu einer App beizubehalten. In diesem Leitfaden führen wir Sie durch den Prozess der Einrichtung dieser Deep Links für eine Next.js-App unter Verwendung von Capacitor.

Die Einrichtung von Deep Links erfordert nicht viel Code, beinhaltet jedoch einige Konfigurationen. Am Ende dieses Leitfadens werden Sie in der Lage sein, auf einen Link wie `https://www.capgo.app/details/22` zu klicken und Ihre App wird auf die richtige Seite geöffnet, wenn sie installiert ist.

## Next.js Deep Link Einrichtung

Zuerst erstellen wir eine neue Next.js-App und eine Detailseite für Tests:

```sh
npx create-next-app@latest capgoLinks
cd capgoLinks
mkdir pages/details
touch pages/details/[id].js
npm run build
npx cap add ios
npx cap add android
```

Stellen Sie sicher, dass Ihre **Bundle-ID** korrekt in der **capacitor.config.json**-Datei festgelegt ist, da dies für die Einrichtung entscheidend ist:

```json
{
  "appId": "com.capgo.deeplinks",
  "appName": "capgoLinks",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

Für die Routenverwaltung verwendet Next.js eine dateibasierte Routenführung. Indem wir eine Datei unter `pages/details/[id].js` erstellen, haben wir bereits unsere Wildcard-Route eingerichtet.

In `pages/details/[id].js` können wir die ID aus der URL mit dem integrierten Router von Next.js abrufen:

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

Nun kümmern wir uns um das Ereignis `appUrlOpen` mit Capacitor. Dieses Ereignis wird ausgelöst, wenn die App über ein benutzerdefiniertes URL-Schema geöffnet wird. Fügen Sie einen Listener in der Datei `pages/_app.js` hinzu:

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

Dieser Code hört auf das Ereignis `appUrlOpen` und navigiert zur entsprechenden Route innerhalb Ihrer Next.js-App.

## iOS-Konfiguration

Für iOS benötigen Sie eine App-ID mit aktivierten zugehörigen Domains. Erstellen Sie eine **apple-app-site-association**-Datei mit folgendem Inhalt, wobei Sie `YOURTEAMID` und `com.your.bundleid` durch Ihre tatsächliche Team-ID und Bundle-ID ersetzen:

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

Laden Sie diese Datei in das Verzeichnis `.well-known` auf Ihrer Domain hoch, sodass sie unter `https://www.capgo.app/.well-known/apple-app-site-association` zugänglich ist.

Fügen Sie in Xcode die Domain zu den Berechtigungen Ihrer App im Format `applinks:capgo.app` hinzu.

## Android-Konfiguration

Für Android App Links befolgen Sie diese Schritte:

1. Generieren Sie eine Keystore-Datei, wenn Sie noch keine haben.
2. Erhalten Sie den SHA256-Fingerabdruck aus dem Keystore.
3. Erstellen Sie eine **assetlinks.json**-Datei mit Ihrem Paketnamen und SHA256-Fingerabdruck.
4. Laden Sie diese Datei in das Verzeichnis `.well-known` auf Ihrer Domain hoch.

Fügen Sie in Ihrer `AndroidManifest.xml` ein `intent-filter` zu dem `activity`-Element hinzu, das Deep Links verarbeitet:

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

Nachdem Sie die Datei `assetlinks.json` hochgeladen haben, können Sie dies mit dem Digital Asset Links-Tool von Google überprüfen. Wenn alles korrekt eingerichtet ist, sehen Sie ein grünes Häkchen.

Um Ihre App zu erstellen und zu signieren, verwenden Sie die folgenden Befehle:

```sh
cd android
./gradlew assembleRelease
cd ..
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
zipalign -v 4 android/app/build/outputs/apk/release/app-release-unsigned.apk capgo.apk
adb install capgo.apk
```

Dies installiert die signierte App auf Ihrem angeschlossenen Android-Gerät.

## Capacitor Konfiguration für Native Project Einstellungen

Um die nativen Projekteinstellungen zu automatisieren, ziehen Sie in Betracht, das [Capacitor configure-Paket](https://github.com/ionic-team/capacitor-configure/) zu verwenden. Installieren Sie es in Ihrem Projekt:

```sh
npm install @capacitor/configure
```

Erstellen Sie eine Datei `capacitor.config.yaml` im Stammverzeichnis Ihres Projekts:

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

Die Einrichtung von Deep Links mit Capacitor für eine Next.js-App umfasst die Konfiguration Ihrer Domain und der Projekteinstellungen sowohl für iOS als auch für Android. Während der Prozess eine sorgfältige Aufmerksamkeit erfordert, ist er im Vergleich zu älteren Methoden optimiert und erfordert keine zusätzlichen Plugins. Stellen Sie sicher, dass Ihre Domain-Überprüfungsdateien korrekt bereitgestellt werden und überprüfen Sie sie mit den jeweiligen Plattform-Tools. Sobald alles eingerichtet ist, wird Ihre App nahtlos von Weblinks geöffnet, was einen reibungslosen Übergang für Ihre Benutzer von Web zu App bietet.
