---
slug: integrate-universal-links-capacitor-nextjs
title: Wie man Universal Links in Next.js mit Capacitor integriert
description: >-
  Erfahren Sie Schritt für Schritt, wie Sie universelle Links für Ihre
  Next.js-App mit Capacitor sowohl auf iOS- als auch auf Android-Plattformen
  einrichten.
author: Martin Donadieu
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-14T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /deeplink_next_capacitor.webp
head_image_alt: Capacitor Universelle Links
tag: DeepLinking
published: true
locale: de
next_blog: ''
---

Universelle Links auf iOS und App-Links auf Android ermöglichen es Benutzern, direkt von einem Link in Ihre App zu gelangen, ohne den Browser zu durchlaufen. Dies ist besonders nützlich, um die Benutzererfahrung zu verbessern und den Kontext von einer Webseite zu einer App beizubehalten. In diesem Leitfaden werden wir den Prozess der Einrichtung dieser Deep Links für eine Next.js-App mit Capacitor durchgehen.

Die Einrichtung von Deep Links erfordert nicht viel Code, aber einige Konfigurationen. Am Ende dieses Leitfadens werden Sie in der Lage sein, auf einen Link wie `https://www.capgo.app/details/22` zu klicken und Ihre App wird sich auf der richtigen Seite öffnen, wenn sie installiert ist.

## Next.js Deep Link Setup

Zunächst erstellen wir eine neue Next.js-App und eine Detailseite zum Testen:

```sh
npx create-next-app@latest capgoLinks
cd capgoLinks
mkdir pages/details
touch pages/details/[id].js
npm run build
npx cap add ios
npx cap add android
```

Stellen Sie sicher, dass Ihre **Bundle-ID** in der **capacitor.config.json**-Datei korrekt eingestellt ist, da dies für die Einrichtung entscheidend ist:

```json
{
  "appId": "com.capgo.deeplinks",
  "appName": "capgoLinks",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

Für das Routing verwendet Next.js dateibasiertes Routing, sodass wir durch die Erstellung einer Datei unter `pages/details/[id].js` bereits unsere Wildcard-Route eingerichtet haben.

In `pages/details/[id].js` können wir die ID aus der URL mithilfe des eingebauten Routers von Next.js abrufen:

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

Nun lassen Sie uns das `appUrlOpen`-Ereignis mit Capacitor behandeln. Dieses Ereignis wird ausgelöst, wenn die App über ein benutzerdefiniertes URL-Schema geöffnet wird. Fügen Sie einen Listener in der Datei `pages/_app.js` hinzu:

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

Dieser Code lauscht auf das `appUrlOpen`-Ereignis und navigiert zur entsprechenden Route innerhalb Ihrer Next.js-App.

## iOS-Konfiguration

Für iOS benötigen Sie eine App-ID mit aktivierten Associated Domains. Erstellen Sie eine **apple-app-site-association**-Datei mit folgendem Inhalt, wobei Sie `YOURTEAMID` und `com.yourbundle.id` durch Ihre tatsächliche Team-ID und Bundle-ID ersetzen:

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

Für Android App Links folgen Sie diesen Schritten:

1. Generieren Sie eine Keystore-Datei, falls Sie noch keine haben.
2. Ermitteln Sie den SHA256-Fingerabdruck aus dem Keystore.
3. Erstellen Sie eine **assetlinks.json**-Datei mit Ihrem Paketnamen und SHA256-Fingerabdruck.
4. Laden Sie diese Datei in das Verzeichnis `.well-known` auf Ihrer Domain hoch.

Fügen Sie in Ihrer `AndroidManifest.xml` einen `intent-filter` zum `activity`-Element hinzu, das Deep Links behandelt:

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

Nachdem Sie die `assetlinks.json`-Datei hochgeladen haben, können Sie sie mit dem Digital Asset Links-Tool von Google überprüfen. Wenn alles korrekt eingerichtet ist, sehen Sie ein grünes Häkchen.

Verwenden Sie die folgenden Befehle, um Ihre App zu erstellen und zu signieren:

```sh
cd android
./gradlew assembleRelease
cd ..
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
zipalign -v 4 android/app/build/outputs/apk/release/app-release-unsigned.apk capgo.apk
adb install capgo.apk
```

Dies wird die signierte App auf Ihrem verbundenen Android-Gerät installieren.

## Capacitor Configure für native Projekteinstellungen

Um native Projekteinstellungen zu automatisieren, sollten Sie das [Capacitor Configure-Paket](https://github.com/ionic-team/capacitor-configure/) in Betracht ziehen. Installieren Sie es in Ihrem Projekt:

```sh
npm install @capacitor/configure
```

Erstellen Sie eine `capacitor.config.yaml`-Datei im Stammverzeichnis Ihres Projekts:

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

Führen Sie das Configure-Tool mit dieser Konfiguration aus:

```sh
npx cap-config run capacitor.config.yaml
```

Dies wird die in der YAML-Datei angegebenen Einstellungen auf Ihre nativen Projekte anwenden.

## Fazit

Die Einrichtung von Deep Links mit Capacitor für eine Next.js-App erfordert die Konfiguration Ihrer Domain und Projekteinstellungen sowohl für iOS als auch für Android. Während der Prozess Aufmerksamkeit für Details erfordert, ist er im Vergleich zu älteren Methoden optimiert und erfordert keine zusätzlichen Plugins. Stellen Sie sicher, dass Ihre Domain-Verifizierungsdateien korrekt bereitgestellt werden und überprüfen Sie sie mit den jeweiligen Plattform-Tools. Einmal eingerichtet, wird sich Ihre App nahtlos von Web-Links aus öffnen und bietet Ihren Benutzern einen reibungslosen Übergang vom Web zur App.