---
slug: integrate-universal-links-capacitor-nextjs
title: Comment intégrer des liens universels dans Next.js avec Capacitor
description: >-
  Étape 1: Comment configurer les liens universels pour votre application
  Next.js avec Capacitor sur les plates-formes iOS et Android.
author: Martin Donadieu
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-14T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /deeplink_next_capacitor.webp
head_image_alt: Capacitor Universal Links
tag: DeepLinking
published: true
next_blog: ''
locale: fr
---

Les liens universels sur iOS et App Links sur Android permettent aux utilisateurs d'être redirigés directement vers votre application à partir d'un lien, en contournant le navigateur. Ceci est particulièrement utile pour améliorer l'expérience utilisateur et maintenir le contexte d'une page Web vers une application. Dans ce guide, nous' Je vais parcourir le processus de configuration de ces liens profonds pour une application Nextjs utilisant Capacitor

La configuration de liens profonds ne nécessite pas beaucoup de code, mais cela implique une certaine configuration. À la fin de ce guide, vous pourrez cliquer sur un lien comme « https://wwwcapgoapp/details/22 » et avoir votre l'application s'ouvre sur la bonne page si elle est installée

## Configuration du lien profond Nextjs

Tout d'abord, nous allons créer une nouvelle application Nextjs et une page de détails à des fins de test :

```sh
npx create-next-app@latest capgoLinks
cd capgoLinks
mkdir pages/details
touch pages/details/[id].js
npm run build
npx cap add ios
npx cap add android
```

Assurez-vous que votre **bundle ID** est correctement défini dans le fichier **capacitorconfigjson**, car il est crucial pour la configuration :

```json
{
  "appId": "com.capgo.deeplinks",
  "appName": "capgoLinks",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

Pour le routage, Nextjs utilise le routage basé sur des fichiers, donc en créant un fichier dans `pages/details/[id]js`, nous avons déjà configuré notre route générique

Dans `pages/details/[id]js`, nous pouvons récupérer l'ID de l'URL à l'aide du routeur intégré de Nextjs :

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

Maintenant, gérons l'événement `appUrlOpen` avec Capacitor. Cet événement est déclenché lorsque l'application est ouverte via un schéma d'URL personnalisé. Ajoutez un écouteur dans le fichier `pages/_appjs` :

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

Ce code écoute l'événement « appUrlOpen » et accède à l'itinéraire approprié dans votre application Nextjs.

##Configuration iOS

Pour iOS, vous aurez besoin d'un identifiant d'application avec les domaines associés activés. Créez un fichier **apple-app-site-association** avec le contenu suivant, en remplaçant « YOURTEAMID » et « comyourbundleid » par votre ID d'équipe et votre ID de bundle réels :

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

Téléchargez ce fichier dans le répertoire « bien connu » de votre domaine, en le rendant accessible sur « https://wwwcapgoapp/well-known/apple-app-site-association »

Dans Xcode, ajoutez le domaine aux droits de votre application en utilisant le format « applinks:capgoapp »

##Configuration Android

Pour les liens d'application Android, procédez comme suit :

1 Générez un fichier de clés si vous n'en avez pas
2 Obtenez l'empreinte digitale SHA256 à partir du magasin de clés
3 Créez un fichier **assetlinksjson** avec le nom de votre package et l'empreinte SHA256.
4 Téléchargez ce fichier dans le répertoire « bien connu » de votre domaine

Dans votre `AndroidManifestxml`, ajoutez un `intent-filter` à l'élément `activity` qui gère les liens profonds :

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

Après avoir téléchargé le fichier «assetlinksjson», vous pouvez le vérifier à l'aide de l'outil Digital Asset Links de Google. Si tout est correctement configuré, vous verrez une coche verte

Pour créer et signer votre application, utilisez les commandes suivantes :

```sh
cd android
./gradlew assembleRelease
cd ..
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
zipalign -v 4 android/app/build/outputs/apk/release/app-release-unsigned.apk capgo.apk
adb install capgo.apk
```

Cela installera l'application signée sur votre appareil Android connecté

## Configuration du condensateur pour les paramètres de projet natifs

Pour automatiser les paramètres natifs du projet, pensez à utiliser le [package de configuration Capacitor](https://githubcom/ionic-team/capacitor-configure/) Installez-le dans votre projet :

```sh
npm install @capacitor/configure
```

Créez un fichier `capacitorconfigyaml` à la racine de votre projet :

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

Exécutez l'outil de configuration avec cette configuration :

```sh
npx cap-config run capacitor.config.yaml
```

Cela appliquera les paramètres spécifiés dans le fichier YAML à vos projets natifs

## Conclusion

La configuration de liens profonds avec Capacitor pour une application Nextjs implique la configuration des paramètres de votre domaine et de votre projet pour iOS et Android. Bien que le processus nécessite une attention particulière aux détails, il est simplifié par rapport aux méthodes plus anciennes et ne nécessite pas de plugins supplémentaires. Assurez-vous que vos fichiers de vérification de domaine sont correctement servis et vérifiez-les avec les outils de la plate-forme respective. Une fois configurée, votre application s'ouvrira de manière transparente à partir de liens Web, offrant une transition en douceur à vos utilisateurs du Web à l'application.