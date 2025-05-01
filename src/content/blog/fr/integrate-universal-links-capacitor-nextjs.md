---
slug: integrate-universal-links-capacitor-nextjs
title: Capacitor로 Next.js에서 유니버설 링크를 통합하는 방법
description: >-
  Next.jsアプリのユニバーサルリンクを、iOSとAndroidの両プラットフォームでCapacitorを使用して設定する方法をステップバイステップで学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
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

Les liens universels sur iOS et les App Links sur Android permettent aux utilisateurs d'être dirigés directement vers votre application depuis un lien, en contournant le navigateur. Ceci est particulièrement utile pour améliorer l'expérience utilisateur et maintenir le contexte d'une page web vers une application. Dans ce guide, nous allons parcourir le processus de configuration de ces liens profonds pour une application Nextjs utilisant Capacitor.

La configuration des liens profonds ne nécessite pas beaucoup de code, mais implique une certaine configuration. À la fin de ce guide, vous pourrez cliquer sur un lien comme `https://www.capgo.app/details/22` et votre application s'ouvrira à la bonne page si elle est installée.

## Configuration des liens profonds Nextjs

Tout d'abord, nous allons créer une nouvelle application Nextjs et une page de détails pour les tests :

```sh
npx create-next-app@latest capgoLinks
cd capgoLinks
mkdir pages/details
touch pages/details/[id].js
npm run build
npx cap add ios
npx cap add android
```

Assurez-vous que votre **bundle ID** est correctement défini dans le fichier **capacitor.config.json**, car il est crucial pour la configuration :

```json
{
  "appId": "com.capgo.deeplinks",
  "appName": "capgoLinks",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

Pour le routage, Nextjs utilise le routage basé sur les fichiers, donc en créant un fichier à `pages/details/[id].js`, nous avons déjà configuré notre route générique.

Dans `pages/details/[id].js`, nous pouvons récupérer l'ID depuis l'URL en utilisant le routeur intégré de Nextjs :

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

Ce code écoute l'événement `appUrlOpen` et navigue vers la route appropriée dans votre application Nextjs.

## Configuration iOS

Pour iOS, vous aurez besoin d'un ID d'application avec les Domaines Associés activés. Créez un fichier **apple-app-site-association** avec le contenu suivant, en remplaçant `YOURTEAMID` et `com.your.bundleid` par votre ID d'équipe et bundle ID réels :

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

Dans Xcode, ajoutez le domaine aux droits de votre application en utilisant le format `applinks:capgo.app`.

## Configuration Android

Pour les App Links Android, suivez ces étapes :

1. Générez un fichier keystore si vous n'en avez pas
2. Obtenez l'empreinte SHA256 du keystore
3. Créez un fichier **assetlinks.json** avec votre nom de package et l'empreinte SHA256
4. Téléchargez ce fichier dans le répertoire `.well-known` sur votre domaine

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

Après avoir téléchargé le fichier `assetlinks.json`, vous pouvez le vérifier en utilisant l'outil Digital Asset Links de Google. Si tout est correctement configuré, vous verrez une coche verte.

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

## Configuration Capacitor pour les paramètres du projet natif

Pour automatiser les paramètres du projet natif, envisagez d'utiliser le [package Capacitor configure](https://github.com/ionic-team/capacitor-configure/). Installez-le dans votre projet :

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

Exécutez l'outil de configuration avec cette config :

```sh
npx cap-config run capacitor.config.yaml
```

Cela appliquera les paramètres spécifiés dans le fichier YAML à vos projets natifs.

## Conclusion

La configuration des liens profonds avec Capacitor pour une application Nextjs implique la configuration de votre domaine et des paramètres de projet pour iOS et Android. Bien que le processus nécessite une attention aux détails, il est simplifié par rapport aux anciennes méthodes et ne nécessite pas de plugins supplémentaires. Assurez-vous que vos fichiers de vérification de domaine sont correctement servis et vérifiez-les avec les outils de plateforme respectifs. Une fois configurée, votre application s'ouvrira de manière transparente à partir des liens web, offrant une transition fluide pour vos utilisateurs du web vers l'application.