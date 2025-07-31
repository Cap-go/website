---
slug: integrate-universal-links-capacitor-nextjs
title: Comment intégrer des liens universels dans Next.js avec Capacitor
description: >-
  Apprenez étape par étape comment configurer des liens universels pour votre
  application Next.js avec Capacitor sur les plateformes iOS et Android.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-12-14T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /deeplink_next_capacitor.webp
head_image_alt: Liens universels Capacitor
keywords: >-
  Capacitor, Universal Links, Next.js, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: DeepLinking
published: true
locale: fr
next_blog: ''
---
Les liens universels sur iOS et les liens d'application sur Android permettent aux utilisateurs d'entrer directement dans votre application à partir d'un lien, contournant ainsi le navigateur. Cela est particulièrement utile pour améliorer l'expérience utilisateur et maintenir le contexte d'une page web à une application. Dans ce guide, nous allons passer en revue le processus de configuration de ces liens profonds pour une application Next.js utilisant Capacitor.

Configurer des liens profonds ne nécessite pas beaucoup de code, mais cela implique une certaine configuration. À la fin de ce guide, vous pourrez cliquer sur un lien tel que `https://www.capgo.app/details/22` et voir votre application s'ouvrir à la bonne page si elle est installée.

## Configuration des liens profonds Next.js

Tout d'abord, nous allons créer une nouvelle application Next.js et une page de détails pour les tests :

```sh
npx create-next-app@latest capgoLinks
cd capgoLinks
mkdir pages/details
touch pages/details/[id].js
npm run build
npx cap add ios
npx cap add android
```

Assurez-vous que votre **ID de bundle** est correctement défini dans le fichier **capacitor.config.json**, car il est crucial pour la configuration :

```json
{
  "appId": "com.capgo.deeplinks",
  "appName": "capgoLinks",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

Pour le routage, Next.js utilise un routage basé sur les fichiers, donc en créant un fichier à `pages/details/[id].js`, nous avons déjà configuré notre route wildcard.

Dans `pages/details/[id].js`, nous pouvons récupérer l'ID à partir de l'URL en utilisant le routeur intégré de Next.js :

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

Maintenant, gérons l'événement `appUrlOpen` avec Capacitor. Cet événement est déclenché lorsque l'application est ouverte via un schéma d'URL personnalisé. Ajoutez un écouteur dans le fichier `pages/_app.js` :

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

Ce code écoute l'événement `appUrlOpen` et navigue vers la route appropriée à l'intérieur de votre application Next.js.

## Configuration iOS

Pour iOS, vous aurez besoin d'un ID d'application avec les domaines associés activés. Créez un fichier **apple-app-site-association** avec le contenu suivant, en remplaçant `YOURTEAMID` et `com.your.bundleid` par votre ID d'équipe réel et l'ID de bundle :

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

Téléchargez ce fichier dans le répertoire `.well-known` sur votre domaine, le rendant accessible à `https://www.capgo.app/.well-known/apple-app-site-association`.

Dans Xcode, ajoutez le domaine aux droits (entitlements) de votre application en utilisant le format `applinks:capgo.app`.

## Configuration Android

Pour les liens d'application Android, suivez ces étapes :

1. Générer un fichier de keystore si vous n'en avez pas.
2. Obtenir l'empreinte SHA256 à partir du keystore.
3. Créer un fichier **assetlinks.json** avec votre nom de paquet et l'empreinte SHA256.
4. Téléchargez ce fichier dans le répertoire `.well-known` sur votre domaine.

Dans votre `AndroidManifest.xml`, ajoutez un `intent-filter` à l'élément `activity` qui gère les liens profonds :

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

Après avoir téléchargé le fichier `assetlinks.json`, vous pouvez le vérifier en utilisant l'outil Digital Asset Links de Google. Si tout est configuré correctement, vous verrez une coche verte.

Pour construire et signer votre application, utilisez les commandes suivantes :

```sh
cd android
./gradlew assembleRelease
cd ..
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
zipalign -v 4 android/app/build/outputs/apk/release/app-release-unsigned.apk capgo.apk
adb install capgo.apk
```

Cela installera l'application signée sur votre appareil Android connecté.

## Configurer Capacitor pour les paramètres du projet natif

Pour automatiser les paramètres du projet natif, envisagez d'utiliser le [package de configuration Capacitor](https://github.com/ionic-team/capacitor-configure/). Installez-le dans votre projet :

```sh
npm install @capacitor/configure
```

Créez un fichier `capacitor.config.yaml` à la racine de votre projet :

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

Exécutez l'outil de configuration avec cette configuration :

```sh
npx cap-config run capacitor.config.yaml
```

Cela appliquera les paramètres spécifiés dans le fichier YAML à vos projets natifs.

## Conclusion

Configurer des liens profonds avec Capacitor pour une application Next.js implique de configurer votre domaine et les paramètres du projet tant pour iOS que pour Android. Bien que le processus nécessite une attention aux détails, il est fluidifié par rapport aux anciennes méthodes et ne nécessite pas de plugins supplémentaires. Assurez-vous que vos fichiers de vérification de domaine sont correctement servis et vérifiez-les avec les outils des plateformes respectives. Une fois configurée, votre application s'ouvrira facilement à partir de liens web, offrant une transition fluide pour vos utilisateurs entre le web et l'application.
