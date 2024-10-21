---
slug: appcenter-migration
title: Migration d'App Center à Capgo
description: >-
  Dans ce guide, nous passerons en revue étape par étape la migration complète
  vers Capgo Live Updates, une alternative à Microsoft CodePush.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-22T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrate_appcenter.webp
head_image_alt: Développeur Capacitor JS cherche une alternative
tag: Migration
published: true
locale: fr
next_blog: automatic-build-and-release-with-github-actions
---

Voici la traduction en français :

## Résumé de la migration

* [Capgo](/register/) est un service qui aide les équipes de développement à envoyer des mises à jour en direct aux applications déployées
* Les applications Capacitor JS écrites en jQuery Mobile, Framework 7, Sencha, KendoUI, Ionic ou même votre propre solution personnalisée peuvent être migrées **Une application Ionic existante n'est pas requise**
* [Volt](https://voltbuild/) offre des services équivalents à App Center Build (compilation d'applications Android/iOS) pour les services de test, de diagnostic et d'analyse

##### Remarque

Si votre application utilise encore Cordova, il est nécessaire de [migrer vers Capacitor](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/) avant de migrer vers Capgo

Développé par l'équipe Ionic comme successeur spirituel de Cordova, Capacitor permet au développement de se rapprocher des outils et des capacités natives dans le but de fournir une expérience utilisateur et des performances encore meilleures

Heureusement, le processus de migration est facile et la majorité des plugins Cordova sont rétrocompatibles avec Capacitor. [Commencez la migration ici](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/)

## À propos de Capgo

Capgo gère la mise à jour des applications au fil du temps. Les équipes de développement peuvent se concentrer entièrement sur les fonctionnalités uniques de leur application et externaliser le processus complexe de livraison d'applications à Capgo

Capgo comble les lacunes entre la livraison web et mobile

## Prérequis de Capgo

Comme App Center, [Capgo](/register/) prend en charge les applications hébergées dans des dépôts Git sur Azure DevOps, Bitbucket, GitHub et GitLab

### Installer Capgo CLI

##### remarque

Avoir Node et NPM installés sur votre ordinateur est nécessaire avant de continuer. Utilisez toujours la [version LTS actuelle](https://nodejs.org/). Capgo ne supporte pas les versions plus anciennes

### Créer les fichiers `package.json` et de configuration Capacitor

##### remarque

Avant de commencer, je recommande d'effectuer les modifications sur une nouvelle branche Git

Étant donné que [Capgo](/register/) a été créé pour automatiser les applications Capacitor, il nécessite un fichier que votre application peut ne pas avoir. Tout d'abord, créez un fichier `capacitor.config.json`. La façon la plus simple de le créer est d'exécuter à la racine de votre application :

```shell
npm install @capacitor/core
```

Ensuite, initialisez Capacitor en utilisant le questionnaire CLI :

```shell
npx cap init
```

Le CLI vous posera quelques questions, en commençant par le nom de votre application et l'ID de package que vous souhaitez utiliser pour votre application

Enfin, validez les nouveaux fichiers dans votre projet :

    git add . && git commit -m "ajout de package.json et de la configuration capacitor" && git push

### Migrer le code

Maintenant que vous avez les nouveaux fichiers requis par [Capgo](/register/) en place, vous pouvez vous concentrer sur l'application elle-même. [Capgo](/register/) s'attend à ce que toute l'application compilée soit à l'intérieur d'un répertoire nommé `dist`

Si votre code compilé n'est pas dans un répertoire `dist`, modifiez cette valeur dans le fichier de configuration Capacitor

Voici à quoi devrait ressembler la structure du répertoire de l'application :

![Structure de l'application](/directory_looklike.webp)

## Configuration de Capgo

Avec votre application prête pour l'intégration [Capgo](https://web.capgo.app/), il est temps de vous inscrire et d'obtenir votre clé API pour télécharger votre première version ! Commencez par [vous inscrire pour un compte Capgo](/register/)

Une fois connecté à Capgo, naviguez vers la page du compte, puis cliquez sur Clé API, puis cliquez sur la clé 'write' pour la copier dans votre presse-papiers

### Installer le SDK Capgo

Depuis une ligne de commande, directement à la racine du dossier de votre application Capacitor, exécutez la commande suivante :

`npm i @capgo/capacitor-updater && npx cap sync`
Pour installer le plugin dans votre application Capacitor

Puis ajoutez ce code à votre application en remplacement de celui de CodePush :

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Cela indiquera au plugin natif que l'installation a réussi

## Déploiement des mises à jour en direct (Alternative à CodePush)

La fonctionnalité de mise à jour en direct fonctionne en utilisant le [SDK Capgo](https://github.com/Cap-go/capacitor-updater/) installé dans votre application native pour écouter un canal de déploiement particulier. Lorsqu'une compilation Web est assignée à un canal de déploiement, cette mise à jour sera déployée sur les appareils des utilisateurs exécutant des binaires configurés pour écouter le canal de déploiement spécifié### Connexion à Capgo CLOUD

Tout d'abord, utilisez la [clé API](https://webcapgoapp/dashboard/apikeys/) `all` présente dans votre compte pour vous connecter avec le CLI :

```shell
npx @capgo/cli@latest login YOURKEY
```

## Ajoutez votre première application

Commençons par créer l'application dans Capgo Cloud avec le CLI

`npx @capgo/cli@latest app add`

Cette commande utilisera toutes les variables définies dans le fichier de configuration Capacitor pour créer l'application

## Téléchargez votre premier bundle

Exécutez la commande pour compiler votre code et l'envoyer à Capgo avec :
```shell
npx @capgo/cli@latest bundle upload --channel production
```

Par défaut, le nom de la version sera celui de votre fichier `packagejson`

Vérifiez dans [Capgo](https://webcapgoapp/) si la construction est présente

Vous pouvez même la tester avec mon [application mobile sandbox](https://capgoapp/app_mobile/)

### Faire du canal le canal par défaut

Après avoir envoyé votre application à Capgo, vous devez faire de votre canal `default` pour permettre aux applications de recevoir des mises à jour de Capgo

```shell
npx @capgo/cli@latest channel set production -s default
```

## Configurer l'application pour valider les mises à jour

Ajoutez cette configuration à votre fichier JavaScript principal

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Ensuite, faites un `npm run build && npx cap copy` pour mettre à jour votre application

### Recevoir une mise à jour en direct sur un appareil

Pour que votre application reçoive une mise à jour en direct de Deploy, vous devrez exécuter l'application sur un appareil ou un émulateur. La façon la plus simple de le faire est simplement d'utiliser la commande suivante pour lancer votre application locale dans un émulateur ou un appareil connecté à votre ordinateur

    npx cap run [ios | android]

Ouvrez l'application, mettez-la en arrière-plan et ouvrez-la à nouveau, vous devriez voir dans les logs que l'application a effectué la mise à jour

Félicitations ! 🎉 Vous avez réussi à déployer votre première mise à jour en direct. Ce n'est que le début de ce que vous pouvez faire avec les mises à jour en direct. Pour en savoir plus, consultez la documentation complète [Live Updates](/docs/plugin/cloud-mode/getting-started/)

## Supprimer les dépendances d'App Center

Maintenant que nous avons intégré les services de Capgo, vous devriez supprimer toutes les références à App Center. En plus d'être une bonne pratique de supprimer le code/services inutilisés, la suppression du SDK devrait réduire la taille de vos applications

Tout d'abord, ouvrez un terminal puis désinstallez les plugins App Center :
```shell
    cordova plugin remove cordova-plugin-appcenter-analytics cordova-plugin-appcenter-crashes cordova-plugin-code-push
```

Ensuite, ouvrez `configxml` et supprimez les valeurs `preference` suivantes. Elles ressembleront à :
```xml
    <preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" /><preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" /><preference name="CodePushPublicKey" value="YOUR-PUBLIC-KEY" />
```

Si vous utilisiez App Center Analytics dans votre application, supprimez les éléments `preferences` suivants : `APPCENTER_ANALYTICS_ENABLE_IN_JS` et `APPCENTER_CRASHES_ALWAYS_SEND`

Supprimez les éléments `<preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" />` suivants :

```xml
    <access origin="https://codepush.appcenter.ms" /><access origin="https://codepush.blob.core.windows.net" /><access origin="https://codepushupdates.azureedge.net" />
```

Supprimez la référence à CodePush dans la balise `meta` CSP dans le fichier `indexhtml` (`https://codepushappcenterms`) :
```xml
    <meta http-equiv="Content-Security-Policy" content="default-src https://codepush.appcenter.ms 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" />
```

Enfin, dans votre application, supprimez toutes les références de code aux services App Center, telles que `codePushsync();`

## Prochaines étapes

Vous avez migré d'App Center vers Capgo, en utilisant les mises à jour en direct. Ce n'est que le début de ce que vous pouvez utiliser Capgo pour. Explorez le reste du service, y compris les canaux (environnements multiples) et l'intégration du CLI Cloud, utilisez Capgo dans votre plateforme CI/CD de choix (comme GitHub Action, GitLab, Jenkins, et plus encore)

## Envoi automatique des mises à jour de l'application

Si votre code est hébergé sur GitHub, vous pouvez configurer la construction et la publication automatiques en quelques étapes supplémentaires, grâce aux actions GitHub

J'ai rédigé un deuxième article pour vous permettre de le faire

## Crédits

Merci beaucoup à [Ionic](https://ioniccom/), cet article est basé sur [cet article](https://ionicio/blog/moving-from-microsoft-app-center-to-ionic-appflow/) réécrit avec chat-gpt-3 et adapté