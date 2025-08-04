---
slug: integrate-universal-links-capacitor-nextjs
title: Come integrare i link universali in Next.js con Capacitor
description: >-
  Apprenez étape par étape comment configurer des liens universels pour votre
  application Next.js avec Capacitor sur les plateformes iOS et Android.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-12-14T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /deeplink_next_capacitor.webp
head_image_alt: Capacitor Universal Links
keywords: >-
  Capacitor, Universal Links, Next.js, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: DeepLinking
published: true
locale: it
next_blog: ''
---
Universal links su iOS e App Links su Android consentono agli utenti di accedere direttamente alla tua app tramite un link, bypassando il browser. Questo è particolarmente utile per migliorare l'esperienza dell'utente e mantenere il contesto da una pagina web a un'app. In questa guida, ti guideremo attraverso il processo di configurazione di questi deep link per un'app Next.js utilizzando Capacitor.

Configurare i deep link non richiede molto codice, ma implica alcune configurazioni. Alla fine di questa guida, sarai in grado di cliccare su un link come `https://www.capgo.app/details/22` e far aprire la tua app sulla pagina corretta se è installata.

## Configurazione del Deep Link in Next.js

Per prima cosa, creeremo una nuova app Next.js e una pagina dei dettagli per il testing:

```sh
npx create-next-app@latest capgoLinks
cd capgoLinks
mkdir pages/details
touch pages/details/[id].js
npm run build
npx cap add ios
npx cap add android
```

Assicurati che il tuo **bundle ID** sia impostato correttamente nel file **capacitor.config.json**, poiché è cruciale per la configurazione:

```json
{
  "appId": "com.capgo.deeplinks",
  "appName": "capgoLinks",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

Per il routing, Next.js utilizza il routing basato su file, quindi creando un file in `pages/details/[id].js`, abbiamo già impostato la nostra rotta wildcard.

In `pages/details/[id].js`, possiamo recuperare l'ID dall'URL utilizzando il router integrato di Next.js:

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

Ora, gestiamo l'evento `appUrlOpen` con Capacitor. Questo evento viene attivato quando l'app viene aperta tramite uno schema URL personalizzato. Aggiungi un listener nel file `pages/_app.js`:

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

Questo codice ascolta l'evento `appUrlOpen` e naviga verso la rotta appropriata all'interno della tua app Next.js.

## Configurazione per iOS

Per iOS, avrai bisogno di un ID app con i domini associati abilitati. Crea un file **apple-app-site-association** con il seguente contenuto, sostituendo `YOURTEAMID` e `com.your.bundleid` con il tuo attuale team ID e bundle ID:

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

Carica questo file nella directory `.well-known` sul tuo dominio, rendendolo accessibile a `https://www.capgo.app/.well-known/apple-app-site-association`.

In Xcode, aggiungi il dominio nelle autorizzazioni della tua app utilizzando il formato `applinks:capgo.app`.

## Configurazione per Android

Per gli App Links di Android, segui questi passaggi:

1. Genera un file keystore se non ne hai uno.
2. Ottieni l'impronta SHA256 dal keystore.
3. Crea un file **assetlinks.json** con il tuo nome pacchetto e impronta SHA256.
4. Carica questo file nella directory `.well-known` sul tuo dominio.

Nel tuo `AndroidManifest.xml`, aggiungi un `intent-filter` all'elemento `activity` che gestisce i deep link:

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

Dopo aver caricato il file `assetlinks.json`, puoi verificarlo utilizzando lo strumento Google Digital Asset Links. Se tutto è impostato correttamente, vedrai un segno di spunta verde.

Per costruire e firmare la tua app, utilizza i seguenti comandi:

```sh
cd android
./gradlew assembleRelease
cd ..
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
zipalign -v 4 android/app/build/outputs/apk/release/app-release-unsigned.apk capgo.apk
adb install capgo.apk
```

Questo installerà l'app firmata sul tuo dispositivo Android collegato.

## Configurare Capacitor per le Impostazioni del Progetto Nativo

Per automatizzare le impostazioni del progetto nativo, considera di utilizzare il [pacchetto di configurazione di Capacitor](https://github.com/ionic-team/capacitor-configure/). Installalo nel tuo progetto:

```sh
npm install @capacitor/configure
```

Crea un file `capacitor.config.yaml` nella radice del tuo progetto:

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

Esegui lo strumento di configurazione con questa configurazione:

```sh
npx cap-config run capacitor.config.yaml
```

Questo applicherà le impostazioni specificate nel file YAML ai tuoi progetti nativi.

## Conclusione

Configurare i deep link con Capacitor per un'app Next.js implica la configurazione del tuo dominio e delle impostazioni del progetto sia per iOS che per Android. Anche se il processo richiede attenzione ai dettagli, è semplificato rispetto ai metodi precedenti e non richiede plugin aggiuntivi. Assicurati che i tuoi file di verifica del dominio siano serviti correttamente e controllali con gli strumenti delle rispettive piattaforme. Una volta impostata, la tua app si aprirà senza problemi dai link web, fornendo una transizione fluida per i tuoi utenti dal web all'app.
