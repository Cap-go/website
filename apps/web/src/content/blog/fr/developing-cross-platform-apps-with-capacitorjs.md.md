---
slug: developing-cross-platform-apps-with-capacitorjs
title: >-
  Développer des applications multiplateformes avec CapacitorJS : Un guide étape
  par étape
description: >-
  Apprenez à créer des applications multiplateformes en utilisant CapacitorJS
  avec une base de code JavaScript unique pour Android, iOS et web (PWA).
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-12-02T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /create_app_with_js.webp
head_image_alt: Développement d'Applications Cross-Platform
keywords: >-
  Capacitor, cross-platform, PWA, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Tuto
published: true
locale: fr
next_blog: ''
---
Dans le monde en constante évolution du développement d'applications mobiles, l'essor des Applications Web Progressives (PWA) a ouvert la voie à de nouveaux environnements d'exécution multiplateformes. Ces environnements permettent aux applications web d'être présentes dans les stores d'applications sans dépendre uniquement du code natif. [**CapacitorJS**](https://capacitorjs.com/) est l'une de ces technologies qui permet aux développeurs de déployer un simple site web comme une application sur Android, iOS et le web en utilisant une base de code JavaScript unique. Cette approche réduit considérablement les coûts de développement et augmente l'efficacité du codage.

Ce guide se concentrera sur la création d'une application utilisant JavaScript pur sans frameworks supplémentaires. Malgré la difficulté à trouver des ressources pour le développement d'applications en JavaScript pur en 2021, nous allons vous fournir un tutoriel complet sur la création de votre application et l'utilisation des plugins natifs avec CapacitorJS.

## ‣ Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [**Node.js**](https://nodejs.org/en/) **(v14.16.1)** ou supérieur
- **NPM (v7.6.2)** ou supérieur
- [**Android Studio**](https://developer.android.com/studio/) pour le développement d'applications Android
- [**Xcode**](https://apps.apple.com/de/app/xcode/id497799835/?mt=12) pour le développement d'applications iOS (macOS uniquement)

> **Note** : Le développement d'applications iOS n'est possible que sur un appareil macOS.

## ‣ Configuration de Votre Projet Capacitor

Pour créer une application Capacitor, naviguez vers le dossier souhaité et exécutez la commande suivante dans votre terminal :

```
npm init @capacitor/app
```

Suivez les instructions pour installer le package et configurer votre projet. Avec Capacitor v3, votre répertoire de projet devrait ressembler à ceci :

```
www/
  css/
    style.css
  js/
    capacitor-welcome.js
  index.html
  manifest.json
.gitignore
capacitor.config.json
package.json
README.md
```

Une fois la configuration initiale terminée, vous êtes prêt à continuer.

## ‣ Restructuration du Projet

Nous utiliserons Vite pour regrouper nos fichiers JavaScript, alors restructurons notre projet en conséquence :

- **Créez** un nouveau dossier `src` dans le répertoire principal.
- **Créez** un nouveau fichier script `index.js` dans `src/`.
- **Créez** le fichier de configuration Vite `vite.config.js` dans le répertoire principal.
- **Supprimez** le fichier `capacitor-welcome.js` de `www/js/`.

Votre nouvelle structure de dossiers devrait ressembler à :

```
src/
  index.js
www/
  css/
    style.css
  js/
  index.html
  manifest.json
.gitignore
capacitor.config.json
package.json
README.md
vite.config.js
```

## ‣ Adaptation au JavaScript Pur

Modifions quelques fichiers pour travailler avec JavaScript pur :

## www/index.html

1. Supprimez les importations de script pour [**Ionic PWA Elements**](https://capacitorjs.com/docs/web/pwa-elements/) si vous ne publiez pas l'application en tant que PWA :

```
<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js"></script>
<script nomodule src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.js"></script>
```

2. Supprimez l'élément HTML `<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js">` du corps.

3. Mettez à jour l'importation du script de `capacitor.js` vers `js/main.js`. Ce sera notre fichier JavaScript regroupé.

4. Supprimez l'importation de `js/capacitor-welcome.js`. Votre `index.html` est maintenant prêt.

## vite.config.js

Pour regrouper nos modules Node.js avec [**Vite**](https://vitejs.dev/), nous avons besoin d'un fichier de configuration spécifiant la destination de sortie pour notre script regroupé. La configuration suivante prendra le fichier `src/index.js` et le regroupera pour la production en tant que `www/js/main.js` :

```javascript
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'www'),
    rollupOptions: {
      input: './src/index.js',
      output: {
        format: 'es',
        file: path.resolve(__dirname, 'www/js/main.js')
      }
    }
  }
});
```

## capacitor.config.json

Dans le fichier `capacitor.config.json`, localisez la propriété `"bundledWebRuntime": true` et changez-la en `false`. Cet ajustement garantit que Capacitor ne regroupe pas les fichiers, nous permettant d'utiliser Vite à la place.

Avec ces modifications, la configuration de base de votre application Capacitor est terminée, et vous êtes prêt à commencer le développement de votre application avec JavaScript pur.

## ‣ Développement de Votre Application

Maintenant que les bases sont posées, vous pouvez commencer à écrire la logique de votre application dans le fichier `src/index.js`. Ici, vous pouvez importer les modules Node.js nécessaires, définir les fonctionnalités de votre application et interagir avec les plugins natifs de Capacitor.

N'oubliez pas d'exécuter la commande de construction de Vite pour regrouper vos fichiers JavaScript chaque fois que vous apportez des modifications :

```bash
vite build
```

Cette commande générera le fichier `main.js` dans votre répertoire `www/js`, que votre fichier `index.html` référencera.

## ‣ Test et Débogage

Capacitor fournit un moyen pratique de tester votre application sur différentes plateformes. Utilisez les commandes suivantes pour ouvrir votre application dans l'environnement de développement respectif :

Pour Android :
```bash
npx cap add android
npx cap open android
```

Pour iOS (macOS uniquement) :
```bash
npx cap add ios
npx cap open ios
```

Pour Web/PWA :
```bash
npx cap serve
```

Ces commandes vous permettront d'exécuter votre application dans Android Studio, Xcode ou votre navigateur web, où vous pourrez tester et déboguer selon vos besoins.

## ‣ Conclusion

Le développement d'applications multiplateformes avec CapacitorJS en utilisant JavaScript pur est un moyen rentable et efficace de créer des applications pour plusieurs plateformes avec une seule base de code. En suivant ce guide, vous avez configuré votre projet, l'avez restructuré pour Vite et préparé votre application pour le développement. Avec cette base, vous êtes bien parti pour construire une application robuste et polyvalente.

N'oubliez pas de tester minutieusement sur toutes les plateformes et d'utiliser les plugins natifs de Capacitor pour améliorer les fonctionnalités de votre application. Bon codage !
