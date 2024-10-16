---
slug: creating-mobile-apps-with-sveltekit-and-capacitor
title: Développer des applications mobiles avec SvelteKit et Capacitor
description: >-
  Apprenez à créer une application mobile avec SvelteKit et Capacitor et à
  améliorer l'interface utilisateur native avec Konsta UI.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-04T00:00:00.000Z
updated_at: 2023-06-04T00:00:00.000Z
head_image: /sveltekit_capacitor.webp
head_image_alt: Illustration de SvelteKit et Capgo
tag: Tutorial
published: true
locale: fr
next_blog: updating-your-capacitor-apps-seamlessly-with-capacitor-updater
---

Dans ce tutoriel, nous commencerons avec une nouvelle application [SvelteKit](https://kit.svelte.dev/) et passerons au développement mobile natif en utilisant Capacitor. Optionnellement, vous pouvez également intégrer [Konsta UI](https://konsta.ui.com/) pour une interface utilisateur mobile Tailwind CSS améliorée.

Capacitor vous permet de convertir facilement votre application web SvelteKit en une application mobile native sans avoir besoin de modifications importantes ou d'apprendre une nouvelle compétence comme React Native.

Suivez ce guide étape par étape pour transformer votre application SvelteKit en une application mobile en utilisant Capacitor et, si vous le souhaitez, améliorer votre interface utilisateur mobile avec Konsta UI.

## À propos de Capacitor

Capacitor est un véritable changement de donne ! Il peut être intégré sans effort dans n'importe quel projet web, enveloppant votre application dans une webview native et générant pour vous des projets natifs Xcode et Android Studio. Ses plugins donnent accès aux fonctionnalités natives de l'appareil comme la caméra via un pont JavaScript.

Capacitor vous permet de créer une fantastique application mobile native sans configuration compliquée ni courbe d'apprentissage abrupte. Son API légère et ses fonctionnalités rationalisées facilitent son intégration dans votre projet. Vous serez étonné de voir à quel point il est simple d'obtenir une application native entièrement fonctionnelle avec Capacitor !

## Préparer votre application SvelteKit

Pour créer une nouvelle application SvelteKit, exécutez la commande suivante :

```shell
npm create svelte@latest my-app
cd my-app
npm install
npm run build
```

Après avoir exécuté la commande `build`, vous devriez voir un nouveau dossier `dist` à la racine de votre projet.

Ce dossier sera utilisé par Capacitor plus tard, mais pour l'instant, nous devons le configurer correctement.

## Ajouter Capacitor à votre application SvelteKit

Pour empaqueter n'importe quelle application web dans un conteneur mobile natif, nous devons suivre quelques étapes initiales. Ensuite, il suffit d'exécuter une seule commande `sync`.

Tout d'abord, installez le [CLI Capacitor](https://capacitorjs.com/docs/cli/) en tant que dépendance de développement et configurez-le dans votre projet. Pendant la configuration, vous pouvez appuyer sur "Entrée" pour accepter les valeurs par défaut pour le nom et l'ID du bundle.

Ensuite, installez le package principal et les packages pertinents pour les plateformes iOS et Android.

Enfin, ajoutez les plateformes, et Capacitor créera des dossiers pour chaque plateforme à la racine de votre projet :

```shell
# Install the Capacitor CLI locally
npm install -D @capacitor/cli

# Initialize Capacitor in your SvelteKit project
npx cap init

# Install the required packages
npm install @capacitor/core @capacitor/ios @capacitor/android

# Add the native platforms
npx cap add ios
npx cap add android
```

À ce stade, vous devriez voir de nouveaux dossiers **ios** et **android** dans votre projet SvelteKit.

**Ce sont de vrais projets natifs !**

Pour accéder au projet Android plus tard, vous devez installer [Android Studio](https://developer.android.com/studio/). Pour iOS, vous avez besoin d'un Mac et devez installer [Xcode](https://developer.apple.com/xcode/).

De plus, vous devriez trouver un fichier **capacitor.config.ts** dans votre projet, qui contient quelques paramètres de base de Capacitor utilisés pendant la synchronisation. La seule chose à laquelle vous devez faire attention est le **webDir**, qui doit pointer vers le résultat de votre commande de build. Actuellement, il est incorrect.

Pour corriger cela, ouvrez le fichier **capacitor.config.ts** et mettez à jour le **webDir** :

```ts
import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
}

export default config
```

Maintenant que nous avons mis à jour nos paramètres Capacitor, changeons notre projet SvelteKit en une application statique en téléchargeant le package d'adaptateur statique approprié :

```shell
npm i -D @sveltejs/adapter-static
```

Une fois le package installé, nous devrons modifier le fichier _svelte.config.js_ de l'auto-adaptateur à statique :

```ts
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
// Consult https://kit.svelte.dev/docs/integrations#preprocessors
// for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
      strict: true
    })
  }
}

export default config
```

Avec le _svelte.config.js_ mis à jour, nous devrons ajouter une option _prerender_ en créant une page _+layout.js_ dans _src/routes_ et ajouter simplement l'export suivant à _+layout.js_ :

```ts
export const prerender = true
```

Après avoir ajouté et mis à jour la page _+layout.js_, nous devrons ajouter nos plateformes mobiles, reconstruire notre projet pour créer le dossier _build_.

Vous pouvez le faire en exécutant les commandes suivantes :

```shell
npm run build
npx cap sync
```

La première commande `npm run build` construira votre projet SvelteKit et copiera la build statique, tandis que la seconde commande `npx cap sync` synchronisera tout le code web dans les bons emplacements des plateformes natives afin qu'il puisse être affiché dans une application.

De plus, la commande sync peut mettre à jour les plateformes natives et installer des plugins, donc lorsque vous installez de nouveaux [plugins Capacitor](https://capacitorjs.com/docs/plugins/), il est temps d'exécuter `npx cap sync` à nouveau.Sans vous en rendre compte, vous avez maintenant terminé le processus, alors voyons l'application sur un appareil !

## Créer et déployer des applications natives

Pour développer des applications iOS, vous devez avoir **Xcode** installé, et pour les applications Android, vous devez avoir **Android Studio** installé. De plus, si vous prévoyez de distribuer votre application sur l'App Store, vous devez vous inscrire au Programme de développeur Apple pour iOS et à la Google Play Console pour Android.

Si vous débutez dans le développement mobile natif, vous pouvez utiliser l'interface de ligne de commande Capacitor pour ouvrir facilement les deux projets natifs :

Pour configurer vos projets natifs, le déploiement de votre application sur un appareil connecté est facile. Dans Android Studio, vous devez simplement attendre que tout soit prêt, et vous pouvez déployer votre application sur un appareil connecté sans modifier aucun paramètre. Voici un exemple :

![android-studio-run](/android-studio-run.webp)

Dans Xcode, vous devez configurer votre compte de signature pour déployer votre application sur un véritable appareil plutôt que sur le simulateur. Si vous ne l'avez jamais fait auparavant, Xcode vous guide tout au long du processus (mais encore une fois, vous devez être inscrit au Programme de développeur). Ensuite, vous pouvez simplement appuyer sur "play" pour exécuter l'application sur votre appareil connecté, que vous pouvez sélectionner en haut. Voici un exemple :

![xcode-run](/xcode-run.webp)

Félicitations ! Vous avez réussi à déployer votre application web SvelteKit sur un appareil mobile. Voici un exemple :

Mais attendez, il existe également un moyen plus rapide de le faire pendant le développement.

## Rechargement en direct de Capacitor

À ce stade, vous êtes probablement habitué au rechargement à chaud avec tous les frameworks modernes, et la bonne nouvelle est que vous pouvez avoir la même fonctionnalité **sur un appareil mobile** avec un minimum d'effort !

Activez l'accès à votre application hébergée localement avec le rechargement en direct **sur votre réseau** en faisant charger le contenu de l'URL spécifique par l'application Capacitor.

La première étape consiste à déterminer votre adresse IP locale. Si vous utilisez un Mac, vous pouvez le découvrir en exécutant la commande suivante dans le terminal :

Sur Windows, exécutez :

Puis recherchez l'adresse IPv4.

Nous pouvons demander à Capacitor de charger l'application directement depuis le serveur en ajoutant une autre entrée à notre fichier `capacitor.config.ts` :

Assurez-vous d'utiliser **l'IP et le port corrects**, comme indiqué dans l'exemple ci-dessus.

Maintenant, nous pouvons appliquer ces modifications en les copiant vers notre projet natif :

La commande `copy` est similaire à `sync`, mais elle ne fera que **copier les modifications apportées au dossier web** et à la configuration, sans mettre à jour le projet natif.

Vous pouvez maintenant déployer votre application une fois de plus via Android Studio ou Xcode. Après cela, si vous modifiez quelque chose dans votre application Svelte, **l'application se rechargera automatiquement** et affichera les changements !

**Gardez à l'esprit** que si vous installez de nouveaux plugins tels que l'appareil photo, cela nécessite toujours une reconstruction de votre projet natif. Cela est dû au fait que les fichiers natifs sont modifiés, et cela ne peut pas être fait à la volée.

Notez que vous devez utiliser l'IP et le port corrects dans votre configuration. Le bloc de code ci-dessus montre le port SvelteKit par défaut à des fins de démonstration.

## Utilisation des plugins Capacitor

Jetons un coup d'œil à l'utilisation d'un plugin Capacitor en action, dont nous avons parlé plusieurs fois auparavant. Pour ce faire, nous pouvons installer un plugin simple en exécutant :

Il n'y a rien de fantaisiste à propos du [plugin Share](https://capacitorjs.com/docs/apis/share/), mais il fait apparaître la boîte de dialogue de partage native ! Pour cela, nous n'avons maintenant qu'à importer le package et appeler la fonction `share()` depuis notre application, alors modifions le fichier **src/routes/index.svelte** comme suit :

Comme mentionné précédemment, lors de l'installation de nouveaux plugins, nous devons effectuer une opération de synchronisation, puis redéployer l'application sur notre appareil. Pour ce faire, exécutez la commande suivante :

Après avoir appuyé sur le bouton, vous pouvez voir la magnifique boîte de dialogue de partage native en action !

## Ajout de Konsta UI

Pour utiliser Konsta UI dans votre application Nuxt 3, vous devez avoir [tailwind déjà installé](https://tailwindcsscom/docs/guides/sveltekit/) et d'installer le package :

```shell
npx cap open ios
npx cap open android
```

De plus, vous devez modifier votre fichier `tailwind.config.js` :

```shell
ipconfig getifaddr en0
```

`konstaConfig` étendra la configuration Tailwind CSS par défaut (ou votre configuration personnalisée) avec quelques variantes supplémentaires et des utilitaires d'aide requis pour Konsta UI.

Maintenant, nous devons configurer le composant principal [App](https://konstaui.com/vue/app/) afin de pouvoir définir certains paramètres globaux (comme le `theme`).

Nous devons envelopper toute l'application avec `App` dans le fichier `src/routes/+layout.svelte` :

```shell
ipconfig
```

### Exemple de page

Maintenant que tout est configuré, nous pouvons utiliser les composants Konsta UI Svelte dans nos pages SvelteKit.

Par exemple, ouvrons `src/routes/index.svelte` et modifions-le comme suit :

```javascript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.x.xx:3000',
    cleartext: true
  }
};

export default config;
```

Si le rechargement en direct est désynchronisé après l'installation de tous les composants nécessaires, essayez de tout redémarrer. Une fois que vous avez fait cela, vous devriez voir une application mobile avec un aspect quelque peu natif, construite avec SvelteKit et Capacitor !

Vous devriez voir la page suivante comme résultat :

<div class="mx-auto" style="width: 50%;">
  <img src="/sveltekit-mobile-app.webp" alt="sveltekit-mobile-app">
</div>

## Conclusion

Capacitor est une excellente option pour créer des applications natives basées sur un projet web existant, offrant un moyen simple de partager du code et de maintenir une interface utilisateur cohérente.

Et avec l'ajout de [Capgo](https://capgo.app/), il est encore plus facile d'ajouter des mises à jour en direct à votre application, garantissant que vos utilisateurs ont toujours accès aux dernières fonctionnalités et corrections de bugs.

Si vous souhaitez apprendre comment ajouter Capgo à votre application SvelteKit, jetez un coup d'œil à l'article suivant :

Découvrez comment Capgo peut vous aider à créer de meilleures applications plus rapidement, [inscrivez-vous pour un compte gratuit](/register/) dès aujourd'hui.