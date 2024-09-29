---
slug: developing-cross-platform-apps-with-capacitorjs
title: "Développer des applications multiplateformes avec CapacitorJS\_: un guide étape par étape"
description: >-
  Découvrez comment créer des applications multiplateformes à l'aide de
  CapacitorJS avec une base de code JavaScript unique pour Android, iOS et Web
  (PWA).
author: Martin Donadieu
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-02T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /create_app_with_js.webp
head_image_alt: Cross-Platform App Development
tag: Tuto
published: true
next_blog: ''
locale: fr
---

Dans le monde en évolution du développement d'applications mobiles, l'essor des applications Web progressives (PWA) a ouvert la voie à de nouveaux environnements d'exécution multiplateformes. Ces environnements d'exécution permettent aux applications Web d'être présentes dans les magasins d'applications sans s'appuyer uniquement sur le code natif. qui facilite cela est [**CapacitorJS**](https://capacitorjscom/), qui permet aux développeurs de déployer un site Web simple en tant qu'application sur Android, iOS et le Web à l'aide d'une seule base de code JavaScript. Cette approche réduit considérablement les coûts de développement et augmente l'efficacité du codage

Ce guide se concentrera sur la création d'une application utilisant du JavaScript pur sans aucun framework supplémentaire. Malgré les défis liés à la recherche de ressources pour le développement d'applications purement JavaScript en 2021, nous sommes là pour vous fournir un didacticiel complet sur la création de votre application et l'utilisation de plugins natifs avec CapacitorJS.

## ‣ Prérequis

Avant de commencer, assurez-vous que les outils suivants sont installés :

- [**Nodejs**](https://nodejsorg/en/) **(v14161)** ou supérieur
- **NPM (v762)** ou supérieur
- [**Android Studio**](https://developerandroidcom/studio/) pour le développement d'applications Android
- [**Xcode**](https://appsapplecom/de/app/xcode/id497799835/?mt=12) pour le développement d'applications iOS (macOS uniquement)

> **Remarque** : le développement d'applications iOS n'est possible que sur un appareil macOS

## ‣ Configurer votre projet de condensateur

Pour créer une application Capacitor, accédez au dossier souhaité et exécutez la commande suivante dans votre terminal :

```
npm init @capacitor/app
```

Suivez les invites pour installer le package et configurer votre projet. Avec Capacitor v3, votre répertoire de projet devrait ressembler à ceci :

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

Une fois la configuration initiale terminée, vous êtes prêt à continuer

## ‣ Restructuration de projet

Nous utiliserons Vite pour regrouper nos fichiers JavaScript, restructurons donc notre projet en conséquence :

- **Créez** un nouveau dossier `src` dans le répertoire principal
- **Créer** un nouveau fichier script `indexjs` dans `src/`
- **Créez** le fichier de configuration Vite `viteconfigjs` dans le répertoire principal
- **Supprimez** le fichier `capacitor-welcomejs` de `www/js/`

Votre nouvelle structure de dossiers devrait ressembler à :

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

## ‣ Adaptation au JavaScript pur

Modifions quelques fichiers pour qu'ils fonctionnent avec du JavaScript pur :

## www/indexhtml

1 Supprimez les importations de script pour [**Ionic PWA Elements**](https://capacitorjscom/docs/web/pwa-elements/) si vous ne publiez pas l'application en tant que PWA :

```
<script type="module" src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js"></script>
<script nomodule src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.js"></script>
```

2 Supprimez l'élément HTML `<capacitor-welcome>` du corps

3 Mettez à jour l'importation du script de `capacitorjs` vers `js/mainjs` Ce sera notre fichier JavaScript fourni

4 Supprimez l'import `js/capacitor-welcomejs` Votre `indexhtml` est maintenant prêt

## viteconfigjs

Pour regrouper nos modules Nodejs avec [**Vite**](https://vitejsdev/), nous avons besoin d'un fichier de configuration spécifiant la destination de sortie de notre script fourni. La configuration suivante prendra le fichier `src/indexjs` et le regroupera pour la production en tant que `www/js/mainjs` :

```javascript
import { defineConfig } from 'vite';
import path from 'path';

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

## condensateurconfigjson

Dans le fichier `capacitorconfigjson`, localisez la propriété `"bundledWebRuntime": true` et remplacez-la par `false`. Cet ajustement garantit que Capacitor ne regroupe pas les fichiers, nous permettant d'utiliser Vite à cette fin.

Avec ces modifications, la configuration de base de votre application Capacitor est terminée et vous êtes prêt à commencer à développer votre application avec du JavaScript pur.

## ‣ Développer votre application

Maintenant que les bases sont posées, vous pouvez commencer à écrire la logique de votre application dans le fichier `src/indexjs`. Ici, vous pouvez importer tous les modules Nodejs nécessaires, définir les fonctionnalités de votre application et interagir avec les plugins natifs de Capacitor.

N'oubliez pas d'exécuter la commande build de Vite pour regrouper vos fichiers JavaScript chaque fois que vous apportez des modifications :

```bash
vite build
```

Cette commande générera le fichier `mainjs` dans votre répertoire `www/js`, auquel votre fichier `indexhtml` fera référence

## ‣ Test et débogage

Le condensateur offre un moyen pratique de tester votre application sur diverses plates-formesUtilisez les commandes suivantes pour ouvrir votre application dans l'environnement de développement de la plateforme respective :

Pour Android :
```bash
npx cap add android
npx cap open android
```

Pour iOS (macOS uniquement) :
```bash
npx cap add ios
npx cap open ios
```

Pour le Web/PWA :
```bash
npx cap serve
```

Ces commandes vous permettront d'exécuter votre application dans Android Studio, Xcode ou votre navigateur Web, où vous pourrez tester et déboguer selon vos besoins.

## ‣ Conclusion

Développer des applications multiplateformes avec CapacitorJS en utilisant du JavaScript pur est un moyen rentable et efficace de créer des applications pour plusieurs plates-formes avec une seule base de code. En suivant ce guide, vous avez configuré votre projet, l'avez restructuré pour Vite et préparé votre application. pour le développement Avec cette base, vous êtes sur la bonne voie pour créer une application robuste et polyvalente

N'oubliez pas de tester minutieusement sur toutes les plates-formes et d'utiliser les plugins natifs de Capacitor pour améliorer les fonctionnalités de votre application. Bon codage !