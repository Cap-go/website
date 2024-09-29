---
slug: creating-mobile-apps-with-sveltekit-and-capacitor
title: Création d'applications mobiles avec SvelteKit et Capacitor
description: >-
  Apprenez à créer une application mobile à l'aide de SvelteKit, Capacitor et à
  améliorer l'interface utilisateur native avec Konsta UI.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-04T00:00:00.000Z
updated_at: 2023-06-04T00:00:00.000Z
head_image: /sveltekit_capacitor.webp
head_image_alt: SvelteKit and Capgo illustration
tag: Tutorial
published: true
next_blog: updating-your-capacitor-apps-seamlessly-with-capacitor-updater
locale: fr
---

Dans ce didacticiel, nous commencerons par une nouvelle application [SvelteKit](https://kitsveltedev/) et passerons au développement mobile natif à l'aide de Capacitor. En option, vous pouvez également intégrer [Konsta UI](https://konstauicom/) pour une interface utilisateur mobile Tailwind CSS améliorée

Capacitor vous permet de convertir facilement votre application Web SvelteKit en une application mobile native sans avoir besoin de modifications importantes ni d'acquérir une nouvelle compétence comme React Native.

Suivez ce guide étape par étape pour transformer votre application SvelteKit en application mobile à l'aide de Capacitor et, si vous le souhaitez, améliorez votre interface utilisateur mobile avec Konsta UI.

## À propos du condensateur

CapacitorJS change la donne ! Il peut être intégré sans effort dans n'importe quel projet Web, en encapsulant votre application dans une vue Web native et en générant pour vous des projets Xcode et Android Studio natifs. Ses plugins donnent accès aux fonctionnalités natives de l'appareil comme la caméra via un pont JavaScript.

Capacitor vous permet de créer une fantastique application mobile native sans configuration compliquée ni courbe d'apprentissage abrupte. Son API mince et ses fonctionnalités simplifiées facilitent son intégration dans votre projet. Vous serez étonné de voir à quel point il est simple de réaliser une application native entièrement fonctionnelle avec Condensateur!

## Préparation de votre application SvelteKit

Pour créer une nouvelle application SvelteKit, exécutez la commande suivante :

```shell
npm create svelte@latest my-app
cd my-app
npm install
npm run build
```

Après avoir exécuté la commande `build`, vous devriez voir un nouveau dossier `dist` à la racine de votre projet

Ce dossier sera utilisé par Capacitor plus tard, mais pour l'instant, nous devons le configurer correctement

## Ajout d'un condensateur à votre application SvelteKit

Pour empaqueter n'importe quelle application Web dans un conteneur mobile natif, nous devons suivre quelques étapes initiales. Ensuite, c'est aussi simple que d'exécuter une seule commande « sync »

Tout d'abord, installez la [Capacitor CLI](https://capacitorjscom/docs/cli/) en tant que dépendance de développement et configurez-la dans votre projet. Pendant l'installation, vous pouvez appuyer sur "Entrée" pour accepter les valeurs par défaut pour le nom et le bundle. IDENTIFIANT

Ensuite, installez le package principal et les packages correspondants pour les plateformes iOS et Android.

Enfin, ajoutez les plateformes, et Capacitor créera des dossiers pour chaque plateforme à la racine de votre projet :

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

À ce stade, vous devriez voir les nouveaux dossiers **ios** et **android** dans votre projet SvelteKit.

**Ce sont de vrais projets natifs !**

Pour accéder au projet Android ultérieurement, vous devez installer [Android Studio](https://developerandroidcom/studio/) Pour iOS, vous avez besoin d'un Mac et devez installer [Xcode](https://developerapplecom/xcode/)

De plus, vous devriez trouver un fichier **capacitorconfigts** dans votre projet, qui contient certains paramètres de base du condensateur utilisés lors de la synchronisation. La seule chose à laquelle vous devez faire attention est le **webDir**, qui doit pointer vers le résultat de votre commande de build Actuellement, elle est incorrecte

Pour résoudre ce problème, ouvrez le fichier **capacitorconfigts** et mettez à jour le **webDir** :

```ts
import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-app',
  webDir: 'build',
}

export default config
```
Maintenant que nous avons mis à jour nos paramètres de condensateur, transformons le projet Sveltekit en une application statique en téléchargeant le package d'adaptateur statique approprié :

```shell
npm i -D @sveltejs/adapter-static
```

Une fois le package installé, nous devrons modifier le fichier _svelteconfigjs_ de l'adaptateur automatique en statique :

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

Avec _svelteconfigjs_ mis à jour, nous devrons ajouter une option _prerender_ en créant une page _+layoutjs_ dans _src/routes_ et ajouter simplement l'exportation suivante vers _+layoutjs_ :

```ts
export const prerender = true
```

Après avoir ajouté et mis à jour la page _+layoutjs_, nous devrons ajouter nos plateformes mobiles, reconstruire notre projet pour créer le dossier _build_

Vous pouvez le faire en exécutant les commandes suivantes :

```shell
npm run build
npx cap sync
```

La première commande « npm run build » construira votre projet SvelteKit et copiera la version statique, tandis que la deuxième commande « npx cap sync » synchronisera tout le code Web aux bons endroits des plates-formes natives afin qu'ils puissent être affichés dans une application.

De plus, la commande sync peut mettre à jour les plates-formes natives et installer des plugins, donc lorsque vous installez de nouveaux [plugins Capacitor](https://capacitorjscom/docs/plugins/), il est temps d'exécuter à nouveau `npx cap sync`Sans vous en rendre compte, vous avez maintenant terminé le processus, alors voyons l'application sur un appareil !

## Créer et déployer des applications natives

Pour développer des applications iOS, **Xcode** doit être installé, et pour les applications Android, vous devez avoir **Android Studio** installé. De plus, si vous envisagez de distribuer votre application sur l'App Store, vous devez vous inscrire dans le programme pour développeurs Apple pour iOS et la console Google Play pour Android

Si vous débutez dans le développement mobile natif, vous pouvez utiliser la CLI Capacitor pour ouvrir facilement les deux projets natifs :

```shell
npx cap open ios
npx cap open android
```

Une fois que vous avez configuré vos projets natifs, déployer votre application sur un appareil connecté est simple. Dans Android Studio, il vous suffit d'attendre que tout soit prêt et vous pouvez déployer votre application sur un appareil connecté sans modifier aucun paramètre. Voici un exemple:

![android-studio-run](/android-studio-runwebp)

Dans Xcode, vous devez configurer votre compte de signature pour déployer votre application sur un appareil réel au lieu de simplement sur le simulateur. Si vous ne l'avez pas encore fait, Xcode vous guide tout au long du processus (mais encore une fois, vous devez être inscrit au Programme pour développeurs) Après cela, vous pouvez simplement appuyer sur Play pour exécuter l'application sur votre appareil connecté, que vous pouvez sélectionner en haut. Voici un exemple :

![xcode-run](/xcode-runwebp)

Félicitations! Vous avez déployé avec succès votre application Web SvelteKit sur un appareil mobile. Voici un exemple :

<div class="mx-auto" style="largeur : 50%;">
  <img src="/sveltekit-mobile-appwebp" alt="sveltekit-mobile-app">
</div>

Mais attendez, il existe également un moyen plus rapide de le faire pendant le développement.

## Rechargement en direct du condensateur

À l'heure actuelle, vous êtes probablement habitué au rechargement à chaud avec tous les frameworks modernes, et la bonne nouvelle est que vous pouvez avoir les mêmes fonctionnalités **sur un appareil mobile** avec un minimum d'effort !

Activez l'accès à votre application hébergée localement avec le rechargement en direct **sur votre réseau** en demandant à l'application Capacitor de charger le contenu à partir de l'URL spécifique.

La première étape consiste à déterminer votre adresse IP locale. Si vous utilisez un Mac, vous pouvez la découvrir en exécutant la commande suivante dans le terminal :

```shell
ipconfig getifaddr en0
```

Sous Windows, exécutez :

```shell
ipconfig
```

Recherchez ensuite l'adresse IPv4

Nous pouvons demander à Capacitor de charger l'application directement depuis le serveur en ajoutant une autre entrée à notre fichier `capacitorconfigts` :

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

Assurez-vous d'utiliser **l'adresse IP et le port corrects**, comme indiqué dans l'exemple ci-dessus.

Maintenant, nous pouvons appliquer ces modifications en les copiant dans notre projet natif :

```shell
npx cap copy
```

La commande `copy` est similaire à `sync`, mais elle ne fera que **copier les modifications apportées au dossier Web** et à la configuration, sans mettre à jour le projet natif.

Vous pouvez maintenant déployer votre application une fois de plus via Android Studio ou Xcode. Après cela, si vous modifiez quelque chose dans votre application Svelte, **l'application se rechargera automatiquement** et affichera les modifications !

**Gardez à l'esprit** que si vous installez de nouveaux plugins tels que la caméra, cela nécessite toujours une reconstruction de votre projet natif. En effet, les fichiers natifs sont modifiés et cela ne peut pas être fait à la volée.

Notez que vous devez utiliser l'adresse IP et le port corrects dans votre configuration. Le bloc de code ci-dessus montre le port SvelteKit par défaut à des fins de démonstration.

## Utilisation des plugins de condensateur

Voyons comment utiliser un plugin Capacitor en action, que nous avons évoqué plusieurs fois auparavant. Pour ce faire, nous pouvons installer un plugin simple en exécutant :

```shell
npm i @capacitor/share
```

Il n'y a rien d'extraordinaire à propos du [plug-in de partage](https://capacitorjscom/docs/apis/share/), mais il affiche la boîte de dialogue de partage native ! Pour cela, il nous suffit maintenant d'importer le package et d'appeler la fonction `share()` depuis notre application, changeons donc le **src/routes/indexsvelte** par ceci :

```html
<script>
  import { Share } from '@capacitor/share';

  async function share() {
    await Share.share({
      title: 'Open Youtube',
      text: 'Check new video on youtube',
      url: 'https://www.youtube.com',
      dialogTitle: 'Share with friends'
    });
  }
</script>

<h1>Welcome to SvelteKit and Capacitor!</h1>
<button on:click={share}>Share now!</button>
```

Comme mentionné précédemment, lors de l'installation de nouveaux plugins, nous devons effectuer une opération de synchronisation puis redéployer l'application sur notre appareil.Pour ce faire, exécutez la commande suivante :

```
npx cap sync
```

Après avoir appuyé sur le bouton, vous pourrez assister à la magnifique boîte de dialogue de partage natif en action !

## Ajout de l'interface utilisateur de Konsta

Pour utiliser Konsta UI dans votre application Nuxt 3, vous devez avoir [tailwind déjà installé](https://tailwindcsscom/docs/guides/sveltekit/) et installer le package :

```shell
npm i konsta
```

De plus, vous devez modifier votre fichier `tailwindconfigjs` :

```javascript
// import konstaConfig config
const konstaConfig = require('konsta/config')

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: [
    './src/routes/**/*.{svelte}',
    './src/components/**/*.{svelte}',
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})
```

`konstaConfig` étendra la configuration CSS Tailwind par défaut (ou personnalisée) avec quelques variantes supplémentaires et utilitaires d'assistance requis pour l'interface utilisateur de Konsta

Nous devons maintenant configurer le composant principal [App](https://konstauicom/vue/app/) afin de pouvoir définir certains paramètres globaux (comme `theme`)

Nous devons envelopper l'ensemble de l'application avec `App` dans `src/routes/+layoutsvelte` :

```html
<script>
  import { App } from 'konsta/svelte';
</script>

<App theme="ios">
  <slot />
</App>
```

### Exemple de page

Maintenant que tout est configuré, nous pouvons utiliser les composants Konsta UI Svelte dans nos pages SvelteKit

Par exemple, ouvrons `src/routes/indexsvelte` et modifions-le comme suit :

```html
<script>
  import {
    Page,
    Navbar,
    Block,
    Button,
    List,
    ListItem,
    Link,
    BlockTitle,
  } from 'konsta/svelte';
</script>

<Page>
  <Navbar title="My App" />

  <Block strong>
    <p>
      Here is your SvelteKit & Konsta UI app. Let's see what we have here.
    </p>
  </Block>
  <BlockTitle>Navigation</BlockTitle>
  <List>
    <ListItem href="/about/" title="About" />
    <ListItem href="/form/" title="Form" />
  </List>

  <Block strong class="flex space-x-4">
    <Button>Button 1</Button>
    <Button>Button 2</Button>
  </Block>
</Page>
```

Si le rechargement en direct n'est pas synchronisé après l'installation de tous les composants nécessaires, essayez de tout redémarrer. Une fois cela fait, vous devriez voir une application mobile avec un look quelque peu natif, construite avec SvelteKit et Capacitor !

En conséquence, vous devriez voir la page suivante :

<div class="mx-auto" style="largeur : 50%;">
  <img src="/konsta-sveltekitwebp" alt="konsta-sveltekit">
</div>

## Conclusion

Capacitor est une excellente option pour créer des applications natives basées sur un projet Web existant, offrant un moyen simple de partager du code et de maintenir une interface utilisateur cohérente.

Et avec l'ajout de [Capgo](https://capgoapp/), il est encore plus facile d'ajouter des mises à jour en direct à votre application, garantissant ainsi que vos utilisateurs ont toujours accès aux dernières fonctionnalités et corrections de bugs.

Si vous souhaitez savoir comment ajouter Capgo à votre application SvelteKit, jetez un œil à l'article suivant :

Découvrez comment Capgo peut vous aider à créer de meilleures applications plus rapidement, [créez un compte gratuit](/register/) dès aujourd'hui