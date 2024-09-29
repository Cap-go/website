---
slug: appcenter-migration
title: Migration d'App Center vers Capgo
description: >-
  Dans ce guide, nous aborderons la migration complète de Capgo Live Updates,
  une alternative à Microsoft CodePush.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-22T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrate_appcenter.webp
head_image_alt: Capacitor JS Dev looking for alternative
tag: Migration
published: true
next_blog: automatic-build-and-release-with-github-actions
---

## Résumé de la migration

* [Capgo](/register/) est un service qui aide les équipes de développement à envoyer des applications en direct aux applications déployées.
* Les applications Capacitor JS écrites en jQuery Mobile, Framework 7, Sencha, KendoUI, Ionic ou même votre propre solution personnalisée peuvent être migrées **Une application Ionic existante n'est pas requise**
* [Colt](https://voltbuild/) propose des services équivalents pour App Center Build (création d'applications Android/iOS) pour les services de test, de diagnostic et d'analyse.

##### Note

Si votre application utilise toujours Cordova, il est nécessaire de [migrer vers Capacitor](https://capacitorjscom/docs/cordova/migrating-from-cordova-to-capacitor/) avant de migrer vers Capgo.

Construit par l'équipe Ionic en tant que successeur spirituel de Cordova, Capacitor permet au développement de se rapprocher des outils et des capacités natifs dans le but de fournir une expérience utilisateur et des performances encore meilleures.

Heureusement, le processus de migration est simple et la majorité des plugins Cordova sont rétrocompatibles avec Capacitor [Commencez la migration ici](https://capacitorjscom/docs/cordova/migrating-from-cordova-to-capacitor/)

## À propos de Capgo

Capgo gère la mise à jour des applications au fil du temps. Les équipes de développement peuvent se concentrer entièrement sur les fonctionnalités uniques de leur application et sous-traiter le processus complexe de livraison des applications à Capgo.

Capgo comble les lacunes entre la diffusion Web et mobile

## Prérequis Capgo

Comme App Center, [Capgo](/register/) prend en charge les applications hébergées dans les référentiels Git sur Azure DevOps, Bitbucket, GitHub et GitLab

### Installer la CLI Capgo

##### note

Avoir Node et NPM installés sur votre ordinateur, vous en avez besoin avant de continuer. Utilisez toujours la [version LTS actuelle](https://nodejsorg/) Capgo n'utilise pas les anciennes versions

### Créer les fichiers de configuration `packagejson` et Capacitor

##### note

Avant de commencer, je vous recommande d'apporter des modifications sur une nouvelle branche Git

Puisque [Capgo](/register/) a été créé pour automatiser les applications de condensateurs, il nécessite un fichier que votre application n'a peut-être pas. Tout d'abord, créez un fichier `capacitorconfigjson`. Le moyen le plus simple de le créer est de l'exécuter à la racine de votre application :

```shell
npm install @capacitor/core
```

Ensuite, initialisez Capacitor à l'aide du questionnaire CLI :

```shell
npx cap init
```

La CLI vous posera quelques questions, en commençant par le nom de votre application et l'ID du package que vous souhaitez utiliser pour votre application.

Enfin, validez les nouveaux fichiers dans votre projet :

    git add git commit -m "paquet ajouté json et configuration du condensateur" && git push

### Migrer le code

Maintenant que vous avez les nouveaux fichiers [Capgo](/register/) requis en place, vous pouvez porter notre attention sur l'application elle-même. [Capgo](/register/) s'attend à ce que l'intégralité de l'application construite se trouve dans un répertoire nommé `dist `

Si votre code construit ne se trouve pas dans un répertoire `dist`, modifiez cette valeur dans le fichier de configuration du condensateur

Voici à quoi devrait ressembler la structure des répertoires de l’application :

![Structure de l'application](/directory_looklikewebp)

## Configuration Capgo

Une fois votre application prête pour l'intégration de [Capgo](https://webcapgoapp/), il est temps de vous inscrire et d'obtenir votre clé API pour télécharger votre première version ! Commencez par [créer un compte Capgo](/register/)

Une fois connecté à Capgo, accédez à la page Compte puis cliquez sur la clé API, puis cliquez sur la touche « écrire » pour la copier dans votre presse-papiers.

### Installez le SDK Capgo

Depuis une ligne de commande, directement à la racine du dossier de votre application Capacitor, exécutez la commande suivante :

`npm i @capgo/capacitor-updater && npx cap sync`
Pour installer le plugin dans votre application Capacitor

Et puis ajoutez à votre application ce code en remplacement de CodePush :

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Cela indiquera au plugin natif que l'installation a réussi

## Déploiement des mises à jour en direct (alternative CodePush)

La fonctionnalité Live Update fonctionne en utilisant le [Capgo SDK](https://githubcom/Cap-go/capacitor-updater/) installé dans votre application native pour écouter une destination de canal de déploiement particulière lorsqu'une version Web est attribuée à un canal. Destination, cette mise à jour sera déployée sur les appareils utilisateur exécutant des fichiers binaires configurés pour écouter la destination de canal spécifiée.### Connectez-vous à Capgo CLOUD

Tout d'abord, utilisez le `all` [apikey](https://webcapgoapp/dashboard/apikeys/) présent dans votre compte pour vous connecter avec la CLI :

```shell
npx @capgo/cli@latest login YOURKEY
```

## Ajoutez votre première application

Commençons par créer l'application dans Capgo Cloud avec la CLI

`npx @capgo/cli@dernier ajout d'application`

Cette commande utilisera toutes les variables définies dans le fichier de configuration Capacitor pour créer l'application

## Téléchargez votre premier pack

Exécutez la commande pour construire votre code et envoyez-le à Capgo avec :
```shell
npx @capgo/cli@latest bundle upload --channel production
```

Par défaut, le nom de la version sera celui de votre fichier `packagejson`

Enregistrez dans [Capgo](https://webcapgoapp/) si la build est présente

Vous pouvez même le tester avec mon [application sandbox mobile](https://capgoapp/app_mobile/)

### Définir la chaîne par défaut

Après avoir envoyé votre application à Capgo, vous devez définir votre chaîne par défaut pour permettre aux applications de recevoir des mises à jour de Capgo.

```shell
npx @capgo/cli@latest channel set production -s default
```

## Configurer l'application pour valider les mises à jour

Ajoutez cette configuration à votre fichier JavaScript principal

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Ensuite, effectuez une « npm run build && npx cap copy » pour mettre à jour votre application

### Recevoir une mise à jour en direct sur un appareil

Pour que votre application reçoive une mise à jour en direct de Deploy, vous devrez exécuter l'application sur un appareil ou un émulateur. Le moyen le plus simple de procéder consiste simplement à utiliser la commande suivante pour lancer votre application locale dans un émulateur ou un appareil connecté. à votre ordinateur

    exécution du plafond npx [ios | androïde]

Ouvrez l'application, mettez-la en arrière-plan et ouvrez-la à nouveau, vous devriez voir dans les journaux que l'application a effectué la mise à jour

Bravo! 🎉 Vous avez déployé avec succès votre première Live Update. Ce n'est que le début de ce que vous pouvez faire avec Live Updates. Pour en savoir plus, consultez la [documentation complète Live Updates](/docs/plugin/cloud-mode/getting-started/)

## Supprimer les dépendances d'App Center

Maintenant que nous avons intégré les services de Capgo, vous devez supprimer toute référence à App Center. En plus d'être une bonne pratique pour supprimer le code/services inutilisés, la suppression du SDK devrait réduire la taille de vos applications.

Tout d’abord, ouvrez un terminal puis désinstallez les plugins App Center :
```shell
    cordova plugin remove cordova-plugin-appcenter-analytics cordova-plugin-appcenter-crashes cordova-plugin-code-push
```

Ensuite, ouvrez `configxml` et supprimez les valeurs de `preference` suivantes. Elles ressembleront à :
```xml
    <preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" /><preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" /><preference name="CodePushPublicKey" value="YOUR-PUBLIC-KEY" />
```

Si vous utilisiez App Center Analytics dans votre application, supprimez les éléments « préférences » suivants : « APPCENTER_ANALYTICS_ENABLE_IN_JS » et « APPCENTER_CRASHES_ALWAYS_SEND ».

Supprimez les éléments `<access />` suivants :

```xml
    <access origin="https://codepush.appcenter.ms" /><access origin="https://codepush.blob.core.windows.net" /><access origin="https://codepushupdates.azureedge.net" />
```

Supprimez la référence à CodePush dans la balise `meta` CSP du fichier `indexhtml` (`https://codepushappcenterms`) :
```xml
    <meta http-equiv="Content-Security-Policy" content="default-src https://codepush.appcenter.ms 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" />
```

Enfin, dans votre application, supprimez toutes les références de code aux services App Center, telles que « codePushsync(); »

## Prochaines étapes

Vous avez migré d'App Center vers Capgo, en utilisant les mises à jour en direct. Ce n'est que le début de ce que vous pouvez utiliser Capgo. Explorez le reste du service, y compris Channel (environnements multiples) et remplacez l'intégration Cloud CLI, utilisez Capgo dans votre CI/ Plateforme de CD de choix (telle que GitHub Action, GitLab, Jenkins, etc.)

## Mise à jour automatique de l'application d'envoi

Si votre code est hébergé sur GitHub, vous pouvez configurer la construction et la publication automatiques en quelques étapes supplémentaires, grâce aux actions GitHub

J'ai fait un deuxième article pour vous permettre de le faire

## Crédits

Merci beaucoup à [Ionic](https://ioniccom/), cet article est basé sur [cet article](https://ionicio/blog/moving-from-microsoft-app-center-to-ionic-appflow/ ) réécrit avec chat-gpt-3 et adapté