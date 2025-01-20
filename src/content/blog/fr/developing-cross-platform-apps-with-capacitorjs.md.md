---
slug: fr__developing-cross-platform-apps-with-capacitorjs
title: >-
  Développement d'applications multiplateformes avec CapacitorJS : Un guide
  étape par étape
description: >-
  Découvrez comment créer des applications multiplateformes avec Capacitor et
  une seule base de code JavaScript pour Android, iOS et Web (PWA).
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-02T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /create_app_with_js.webp
head_image_alt: Développement d'applications multiplateforme
tag: Tuto
published: true
locale: fr
next_blog: ''
---

Dans le monde en évolution du développement d'applications mobiles, l'essor des Applications Web Progressives (PWA) a ouvert la voie à de nouveaux environnements d'exécution multiplateformes. Ces environnements permettent aux applications basées sur le web d'être présentes dans les magasins d'applications sans s'appuyer uniquement sur du code natif. Une technologie qui facilite cela est CapacitorJS, qui permet aux développeurs de déployer un site web simple en tant qu'application sur Android, iOS et le web en utilisant une seule base de code JavaScript. Cette approche réduit considérablement les coûts de développement et augmente l'efficacité du codage.

Ce guide se concentrera sur la création d'une application en utilisant JavaScript pur sans aucun framework supplémentaire. Malgré les difficultés à trouver des ressources pour le développement d'applications en JavaScript pur en 2021, nous sommes là pour vous fournir un tutoriel complet sur la création de votre application et l'utilisation de plugins natifs avec CapacitorJS.

## ‣ Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- Nodejs (v14.16.1) ou supérieur
- NPM (v7.6.2) ou supérieur
- Android Studio pour le développement d'applications Android
- Xcode pour le développement d'applications iOS (uniquement sur macOS)

> **Remarque** : Le développement d'applications iOS n'est possible que sur un appareil macOS.

## ‣ Configuration de votre projet Capacitor

Pour créer une application Capacitor, naviguez vers le dossier souhaité et exécutez la commande suivante dans votre terminal :

## ‣ Restructuration du projet

Nous utiliserons Vite pour regrouper nos fichiers JavaScript, alors restructurons notre projet en conséquence :

- **Créez** un nouveau dossier `src` dans le répertoire principal
- **Créez** un nouveau fichier script `index.js` dans `src/`
- **Créez** le fichier de configuration Vite `vite.config.js` dans le répertoire principal
- **Supprimez** le fichier `capacitor-welcome.js` de `www/js/`

Votre nouvelle structure de dossiers devrait ressembler à :

## ‣ Adaptation au JavaScript pur

Modifions quelques fichiers pour travailler avec du JavaScript pur :

## www/index.html

1. Supprimez les importations de script pour Ionic PWA Elements si vous ne publiez pas l'application en tant que PWA :

2. Supprimez l'élément HTML `<ion-app>` du corps

3. Mettez à jour l'importation du script de `capacitor.js` à `js/main.js`. Ce sera notre fichier JavaScript regroupé.

4. Supprimez l'importation de `js/capacitor-welcome.js`. Votre `index.html` est maintenant prêt.

## vite.config.js

Pour regrouper nos modules Nodejs avec Vite, nous avons besoin d'un fichier de configuration spécifiant la destination de sortie pour notre script regroupé. La configuration suivante prendra le fichier `src/index.js` et le regroupera pour la production en tant que `www/js/main.js` :

## capacitor.config.json

Dans le fichier `capacitor.config.json`, localisez la propriété `"bundledWebRuntime": true` et changez-la en `false`. Cet ajustement garantit que Capacitor ne regroupe pas les fichiers, nous permettant d'utiliser Vite à cette fin.

Avec ces changements, la configuration de base de votre application Capacitor est terminée, et vous êtes prêt à commencer le développement de votre application avec du JavaScript pur.

## ‣ Développement de votre application

Maintenant que les bases sont posées, vous pouvez commencer à écrire la logique de votre application dans le fichier `src/index.js`. Ici, vous pouvez importer les modules Nodejs nécessaires, définir les fonctionnalités de votre application et interagir avec les plugins natifs de Capacitor.

N'oubliez pas d'exécuter la commande de build de Vite pour regrouper vos fichiers JavaScript chaque fois que vous apportez des modifications :

Cette commande générera le fichier `main.js` dans votre répertoire `www/js`, que votre fichier `index.html` référencera.

## ‣ Test et débogage

Capacitor fournit un moyen pratique de tester votre application sur diverses plateformes.Utilisez les commandes suivantes pour ouvrir votre application dans l'environnement de développement de la plateforme respective :

Pour Android :
```
npm init @capacitor/app
```

Pour iOS (macOS uniquement) :
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

Pour Web/PWA :
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

Ces commandes vous permettront d'exécuter votre application dans Android Studio, Xcode ou votre navigateur web, où vous pourrez tester et déboguer selon vos besoins.

## ‣ Conclusion

Le développement d'applications multiplateformes avec Capacitor en utilisant du JavaScript pur est une méthode rentable et efficace pour créer des applications pour plusieurs plateformes avec une seule base de code. En suivant ce guide, vous avez configuré votre projet, l'avez restructuré pour Vite et préparé votre application pour le développement. Avec cette base, vous êtes sur la bonne voie pour construire une application robuste et polyvalente.

N'oubliez pas de tester minutieusement sur toutes les plateformes et d'utiliser les plugins natifs de Capacitor pour améliorer les fonctionnalités de votre application. Bon codage !