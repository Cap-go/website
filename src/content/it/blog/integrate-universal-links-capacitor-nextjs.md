---
slug: integrate-universal-links-capacitor-nextjs
title: Come Integrare i Link Universali in Next.js con Capacitor
description: >-
  Impara passo dopo passo come configurare i collegamenti universali per la tua
  applicazione Next.js con Capacitor sulle piattaforme iOS e Android.
author: Martin Donadieu
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-14T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /deeplink_next_capacitor.webp
head_image_alt: Collegamenti Universali Capacitor
tag: DeepLinking
published: true
locale: it
next_blog: ''
---

Universal link su iOS e App Link su Android consentono agli utenti di essere indirizzati direttamente alla tua app da un link, bypassando il browser. Questo è particolarmente utile per migliorare l'esperienza utente e mantenere il contesto da una pagina web a un'app. In questa guida, vedremo il processo di configurazione di questi deep link per un'app Nextjs utilizzando Capacitor.

La configurazione dei deep link non richiede molto codice, ma comporta alcune configurazioni. Alla fine di questa guida, sarai in grado di cliccare un link come `https://www.capgo.app/details/22` e far aprire la tua app alla pagina corretta se è installata.

## Configurazione Deep Link per Nextjs

Innanzitutto, creeremo una nuova app Nextjs e una pagina dei dettagli per il test:

```sh
npx create-next-app@latest capgoLinks
cd capgoLinks
mkdir pages/details
touch pages/details/[id].js
npm run build
npx cap add ios
npx cap add android
```

Assicurati che il tuo **ID bundle** sia impostato correttamente nel file **capacitor.config.json**, poiché è cruciale per la configurazione:

```json
{
  "appId": "com.capgo.deeplinks",
  "appName": "capgoLinks",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

Per il routing, Nextjs utilizza il routing basato su file, quindi creando un file in `pages/details/[id].js`, abbiamo già configurato il nostro percorso con carattere jolly.

In `pages/details/[id].js`, possiamo recuperare l'ID dall'URL utilizzando il router integrato di Nextjs:

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

Questo codice ascolta l'evento `appUrlOpen` e naviga verso il percorso appropriato all'interno della tua app Nextjs.

## Configurazione iOS

Per iOS, avrai bisogno di un ID app con Associated Domains abilitato. Crea un file **apple-app-site-association** con il seguente contenuto, sostituendo `YOURTEAMID` e `com.yourbundle.id` con il tuo ID team e ID bundle effettivi:

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

Carica questo file nella directory `/.well-known` sul tuo dominio, rendendolo accessibile all'indirizzo `https://www.capgo.app/.well-known/apple-app-site-association`.

In Xcode, aggiungi il dominio alle autorizzazioni della tua app utilizzando il formato `applinks:capgo.app`.

## Configurazione Android

Per gli App Link di Android, segui questi passaggi:

1. Genera un file keystore se non ne hai uno.
2. Ottieni l'impronta digitale SHA256 dal keystore.
3. Crea un file **assetlinks.json** con il nome del tuo pacchetto e l'impronta digitale SHA256.
4. Carica questo file nella directory `/.well-known` sul tuo dominio.

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

Dopo aver caricato il file `assetlinks.json`, puoi verificarlo utilizzando lo strumento Digital Asset Links di Google. Se tutto è configurato correttamente, vedrai un segno di spunta verde.

Per compilare e firmare la tua app, usa i seguenti comandi:

```sh
cd android
./gradlew assembleRelease
cd ..
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
zipalign -v 4 android/app/build/outputs/apk/release/app-release-unsigned.apk capgo.apk
adb install capgo.apk
```

Questo installerà l'app firmata sul tuo dispositivo Android connesso.

## Capacitor Configure per le Impostazioni del Progetto Nativo

Per automatizzare le impostazioni del progetto nativo, considera l'utilizzo del [pacchetto Capacitor configure](https://github.com/ionic-team/capacitor-configure/). Installalo nel tuo progetto:

```sh
npm install @capacitor/configure
```

Crea un file `capacitor.config.yaml` alla radice del tuo progetto:

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

La configurazione dei deep link con Capacitor per un'app Nextjs comporta la configurazione delle impostazioni del dominio e del progetto sia per iOS che per Android. Mentre il processo richiede attenzione ai dettagli, è semplificato rispetto ai metodi più vecchi e non richiede plugin aggiuntivi. Assicurati che i file di verifica del dominio siano serviti correttamente e verificali con i rispettivi strumenti della piattaforma. Una volta configurato, la tua app si aprirà senza problemi dai link web, fornendo una transizione fluida per i tuoi utenti dal web all'app.