---
slug: building-a-native-mobile-app-with-nextjs-and-capacitor
title: >-
  Créer des Applications Mobiles Natives en 2024 avec Next.js 14 et Capacitor :
  Un Guide Étape par Étape
description: >-
  Découvrez dans ce guide complet comment créer des applications mobiles natives
  avec Next.js 14 et Capacitor. Explorez les dernières meilleures pratiques et
  techniques pour développer des applications mobiles puissantes et riches en
  fonctionnalités.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2024-09-19T00:00:00.000Z
head_image: /next_capgo.webp
head_image_alt: Next.js 14 et illustration de Capacitor
tag: Tutorial
published: true
locale: fr
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

## Introduction

Dans ce tutoriel, nous explorerons comment créer des applications mobiles natives en utilisant la puissante combinaison de [Nextjs](https://nextjsorg/) 14 et [Capacitor](https://capacitorjscom/) en 2024. En tirant parti des dernières versions de ces technologies, vous pouvez facilement créer des applications mobiles performantes et riches en fonctionnalités. Nous démontrerons également comment améliorer l'interface utilisateur mobile en utilisant [Konsta UI](https://konstauicom/) et Tailwind CSS, bien que cette étape soit facultative.

Nextjs, un framework React populaire, fournit une base solide pour la création d'applications web, tandis que Capacitor vous permet de transformer votre application Nextjs en une application mobile native sans modifications importantes ni besoin d'apprendre de nouvelles compétences comme React Native. Ce tutoriel vous guidera à travers le processus, en commençant par la configuration d'une nouvelle application Nextjs et l'intégration de Capacitor pour créer une expérience mobile native.

### Avantages de l'utilisation de Nextjs et Capacitor

- **Réutilisation du code** : Nextjs vous permet d'écrire des composants réutilisables et de partager du code entre vos applications web et mobiles, économisant du temps et des efforts de développement.
- **Performance** : Nextjs offre des optimisations de performance intégrées, telles que le rendu côté serveur et le découpage du code, assurant des temps de chargement rapides et une expérience utilisateur fluide.
- **Capacités natives** : Capacitor donne accès aux fonctionnalités natives de l'appareil comme la caméra, la géolocalisation et plus encore, vous permettant de créer des applications mobiles riches en fonctionnalités.
- **Développement simplifié** : Avec Capacitor, vous pouvez développer et tester votre application mobile en utilisant des technologies web familières, réduisant la courbe d'apprentissage et rationalisant le processus de développement.

## Préparation de votre application Nextjs

Pour commencer, créons une nouvelle application Nextjs en utilisant la commande `create-next-app` :

Cette commande configurera un projet Nextjs vierge avec la configuration recommandée pour la dernière version.

Ensuite, naviguez vers le répertoire du projet :

Pour créer une application mobile native, nous devons générer une exportation statique de notre projet Nextjs. Mettez à jour le fichier `packagejson` pour inclure un script de construction et d'exportation du projet :

L'exécution de la commande `npm run static` peut entraîner des erreurs dues à l'incompatibilité de l'optimisation des images. Pour résoudre ce problème, ouvrez le fichier `nextconfigjs` et modifiez-le comme suit :

Maintenant, l'exécution de `npm run static` devrait fonctionner sans problème, et vous trouverez un nouveau dossier `out` à la racine de votre projet. Ce dossier sera utilisé par Capacitor dans les prochaines étapes.

## Ajout de Capacitor à votre application Nextjs 14

Pour empaqueter votre application Nextjs dans un conteneur mobile natif, suivez ces étapes :

1. Installez le [CLI Capacitor](https://capacitorjscom/docs/cli/) comme dépendance de développement :

2. Initialisez Capacitor dans votre projet Nextjs :

Pendant le processus d'initialisation, vous pouvez appuyer sur "Entrée" pour accepter les valeurs par défaut pour le nom de l'application et l'ID du bundle.

3. Installez les packages Capacitor requis :

4. Ajoutez les plateformes natives :

Capacitor créera des dossiers pour chaque plateforme (`ios` et `android`) à la racine de votre projet. Ces dossiers contiennent les projets natifs pour iOS et Android, respectivement.

Pour accéder et construire le projet Android, vous devez avoir [Android Studio](https://developerandroidcom/studio) installé. Pour le développement iOS, vous avez besoin d'un Mac avec [Xcode](https://developerapplecom/xcode/) installé.

5. Configurez Capacitor :

Ouvrez le fichier `capacitorconfigts` et mettez à jour la propriété `webDir` pour pointer vers le répertoire de sortie de votre build Nextjs :

6. Construisez et synchronisez votre projet :

La commande `npm run static` construit votre projet Nextjs et exporte les fichiers statiques, tandis que `npx cap sync` synchronise le code web avec les plateformes natives.## Construction et déploiement d'applications natives

Pour construire et déployer votre application mobile native, suivez ces étapes :
Pour développer des applications iOS, vous devez avoir **Xcode** installé, et pour les applications Android, vous devez avoir **Android Studio** installé. De plus, si vous prévoyez de distribuer votre application sur l'app store, vous devez vous inscrire au Programme de Développeur Apple pour iOS et à la Google Play Console pour Android.

1. Ouvrez les projets natifs :

Pour iOS :
```shell
npx create-next-app@latest my-app
```

Pour Android :
```shell
cd my-app
```

2. Construisez et exécutez l'application :

![android-studio-run](/android-studio-run.webp)

- Dans Android Studio, attendez que le projet soit prêt, puis cliquez sur le bouton "Run" pour déployer l'application sur un appareil connecté ou un émulateur.
![xcode-run](/xcode-run.webp)

- Dans Xcode, configurez votre compte de signature pour déployer l'application sur un appareil réel. Si vous ne l'avez jamais fait auparavant, Xcode vous guidera tout au long du processus (notez que vous devez être inscrit au Programme de Développeur Apple). Une fois configuré, cliquez sur le bouton "Play" pour exécuter l'application sur votre appareil connecté.

Félicitations ! Vous avez réussi à déployer votre application web Nextjs sur un appareil mobile.

<div class="mx-auto" style="width: 50%;">
  <img src="/nextjs-mobile-app.webp" alt="nextjs-mobile-app">
</div>
Mais attendez, il existe également une façon plus rapide de le faire pendant le développement.

## Rechargement en direct de Capacitor

Pendant le développement, vous pouvez profiter du rechargement en direct pour voir les changements instantanément sur votre appareil mobile. Pour activer cette fonctionnalité, suivez ces étapes :

1. Trouvez votre adresse IP locale :

- Sur macOS, exécutez la commande suivante dans le terminal :
  ```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "static": "NEXT_PUBLIC_IS_MOBILE=true next build"
  }
}
```

- Sur Windows, exécutez :
  ```javascript
/** @type {import('next').NextConfig} */
const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === 'true';
const nextConfig = {
    ...(isMobile ? {output: 'export'} : {}),
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```
  Recherchez l'adresse IPv4 dans la sortie.

2. Mettez à jour le fichier `capacitor.config.ts` pour inclure la configuration du serveur :

```shell
npm install -D @capacitor/cli
```

Remplacez `YOUR_IP_ADDRESS` par votre adresse IP locale.

3. Appliquez les modifications à votre projet natif :

```shell
npx cap init
```

La commande `copy` copie le dossier web et les modifications de configuration dans le projet natif sans mettre à jour l'ensemble du projet.

4. Reconstruisez et exécutez l'application sur votre appareil en utilisant Android Studio ou Xcode.

Maintenant, chaque fois que vous apportez des modifications à votre application Nextjs, l'application mobile se rechargera automatiquement pour refléter ces changements.

Note : Si vous installez de nouveaux plugins ou apportez des modifications aux fichiers natifs, vous devrez reconstruire le projet natif car le rechargement en direct ne s'applique qu'aux changements de code web.

## Utilisation des plugins Capacitor

Les plugins Capacitor vous permettent d'accéder aux fonctionnalités natives de l'appareil depuis votre application Nextjs. Explorons comment utiliser le plugin Share comme exemple :

1. Installez le plugin Share :

```shell
npm install @capacitor/core @capacitor/ios @capacitor/android
```

2. Mettez à jour le fichier `pages/index.js` pour utiliser le plugin Share :

```shell
npx cap add ios
npx cap add android
```

3. Synchronisez les changements avec le projet natif :

Comme mentionné précédemment, lors de l'installation de nouveaux plugins, nous devons effectuer une opération de synchronisation puis redéployer l'application sur notre appareil. Pour ce faire, exécutez la commande suivante :

```json
{
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

4. Reconstruisez et exécutez l'application sur votre appareil.

Maintenant, lorsque vous cliquerez sur le bouton "Share now!", la boîte de dialogue de partage native apparaîtra, vous permettant de partager le contenu avec d'autres applications.

<div className={styles.container}>
  <Head>
<title>

Pour rendre le bouton plus adapté au mobile, nous pouvons ajouter du style en utilisant ma bibliothèque de composants UI préférée pour les applications web - Nextjs (sans jeu de mots).

## Ajout de Konsta UI

J'ai travaillé pendant des années avec [Ionic](https://ionicframework.com/) pour construire de superbes applications multiplateformes et c'était l'un des meilleurs choix pendant des années.
Mais maintenant je ne le recommande plus, c'est très compliqué de l'intégrer avec Nextjs et ce n'est pas vraiment utile quand vous avez déjà [tailwindcss](https://tailwindcss.com/).

Si vous voulez une interface mobile vraiment belle qui s'adapte au style spécifique d'iOS et d'Android, je recommande Konsta UI.

Vous devez avoir [tailwind déjà installé](https://tailwindcss.com/docs/guides/nextjs/)
Pour améliorer l'interface mobile de votre application Nextjs, vous pouvez utiliser [Konsta UI](https://konsta-ui.com/), une bibliothèque de composants UI adaptée aux mobiles qui s'adapte au style iOS et Android. Suivez ces étapes pour intégrer Konsta UI :

1.Installez les paquets requis :

```shell
npm run static
npx cap sync
```

2. Mettez à jour le fichier `tailwind.config.js` :

```shell
npx cap open ios
```

3. Enveloppez votre application avec le composant Konsta UI `App` dans `pages/_app.js` :

```shell
npx cap open android
```

### Page d'exemple

Maintenant que tout est configuré, nous pouvons utiliser les composants React de Konsta UI dans nos pages Next.js

4. Mettez à jour le fichier `pages/index.js` pour utiliser les composants Konsta UI :

```shell
  ipconfig getifaddr en0
  ```

5. Redémarrez le serveur de développement et reconstruisez l'application

Votre application Next.js devrait maintenant avoir une interface utilisateur mobile native alimentée par Konsta UI

## Optimisation des performances

Pour garantir des performances optimales de votre application Next.js et Capacitor, considérez les meilleures pratiques suivantes :

- Minimisez la taille de l'application en supprimant les dépendances et les ressources inutilisées
- Optimisez les images et autres fichiers multimédias pour réduire les temps de chargement
- Implémentez le chargement paresseux pour les composants et les pages afin d'améliorer les performances de chargement initial
- Utilisez le rendu côté serveur (SSR) avec Next.js pour améliorer la vitesse de chargement de l'application et l'optimisation pour les moteurs de recherche (SEO)
- Tirez parti des optimisations intégrées de Capacitor, telles que la mise en cache de la vue web et le regroupement d'applications

## Conclusion

Dans ce tutoriel, nous avons exploré comment créer des applications mobiles natives en utilisant Next.js et Capacitor. En tirant parti de la puissance de ces technologies, vous pouvez créer facilement des applications mobiles riches en fonctionnalités et hautes performances.

Nous avons couvert les étapes pour configurer une application Next.js, intégrer Capacitor, et construire et déployer l'application sur des appareils mobiles. De plus, nous avons discuté de l'utilisation des plugins Capacitor, de l'ajout de Konsta UI pour une interface utilisateur mobile améliorée, et des techniques d'optimisation des performances.

Pour porter votre application Next.js et Capacitor au niveau supérieur, envisagez d'explorer [Capgo](https://capgo.app/) pour des mises à jour en direct transparentes, garantissant à vos utilisateurs d'avoir toujours accès aux dernières fonctionnalités et corrections de bugs.

En suivant les meilleures pratiques et techniques décrites dans ce guide, vous serez bien équipé pour créer de superbes applications mobiles natives en utilisant Next.js et Capacitor.

## Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Capacitor](https://capacitorjs.com/docs)
- [Documentation Konsta UI](https://konsta.ui.com/docs)
- [Capgo - Mises à jour en direct pour les applications Capacitor](https://capgo.app/)

Bonne création d'applications !

Découvrez comment Capgo peut vous aider à créer de meilleures applications plus rapidement, [inscrivez-vous pour un compte gratuit](/register/) aujourd'hui