---
slug: appcenter-migration
title: Migration de App Center vers Capgo
description: >-
  Dans ce guide, nous allons passer en revue la migration complète pour Capgo
  Live Updates, une alternative à Microsoft CodePush.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-22T00:00:00.000Z
updated_at: 2025-10-31T10:28:43.000Z
head_image: /migrate_appcenter.webp
head_image_alt: Développeur Capacitor JS à la recherche d'une alternative
keywords: >-
  App Center, migration, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Migration
published: true
locale: fr
next_blog: automatic-build-and-release-with-github-actions
---
## Résumé de la Migration

* [Capgo](/register/) est un service qui aide les équipes de développement à envoyer des applications en direct vers des applications déployées.
* Les applications Capacitor JS écrites en jQuery Mobile, Framework 7, Sencha, KendoUI, Ionic ou même votre propre solution personnalisée peuvent être migrées. **Une application Ionic existante n'est pas requise.**.
* [Colt](https://volt.build/) offre des services équivalents pour App Center Build (construire des applications Android/iOS). Pour les services de test, de diagnostics et d'analytique.

##### Remarque

Si votre application utilise encore Cordova, il est nécessaire de [migrer vers Capacitor](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/) d'abord avant de migrer vers Capgo.

Construit par l’équipe Ionic comme un successeur spirituel à Cordova, Capacitor permet au développement de se rapprocher des outils et capacités natifs avec l'objectif de fournir une expérience utilisateur et des performances encore meilleures.

Heureusement, le processus de migration est facile et la majorité des plugins Cordova sont compatibles avec Capacitor. [Commencez la migration ici](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/).

## À propos de Capgo

Capgo gère la mise à jour des applications au fil du temps. Les équipes de développement peuvent se concentrer totalement sur les fonctionnalités uniques de leur application et externaliser le processus compliqué de livraison d'applications à Capgo.

Capgo comble les lacunes entre la livraison web et mobile.

## Prérequis de Capgo

Comme App Center, [Capgo](/register/) prend en charge les applications hébergées dans des dépôts Git sur Azure DevOps, Bitbucket, GitHub, et GitLab.

### Installer Capgo CLI

##### Remarque

Ayez Node et NPM installés sur votre ordinateur, vous en aurez besoin avant de procéder. Utilisez toujours la [version LTS actuelle](https://nodejs.org/) ; Capgo ne supporte pas les versions plus anciennes.

### Créer les fichiers `package.json` et de configuration de Capacitor

##### Remarque

Avant de commencer, je recommande de faire des changements sur une nouvelle branche Git.

Étant donné que [Capgo](/register/) a été créé pour automatiser les applications Capacitor, il nécessite un fichier que votre application n’a peut-être pas. Tout d'abord, créez un fichier `capacitor.config.json`. Le moyen le plus simple de le créer est d'exécuter dans le répertoire racine de votre application :

```shell
npm install @capacitor/core
```

Ensuite, initialisez Capacitor en utilisant le questionnaire CLI :

```shell
npx cap init
```

Le CLI vous posera quelques questions, en commençant par le nom de votre application et par l’ID de package que vous souhaitez utiliser pour votre application.

Enfin, validez les nouveaux fichiers dans votre projet :

    git add .git commit -m "ajout de package json et de configuration capacitor" && git push

### Migrer le Code

Maintenant que vous avez les nouveaux fichiers requis de [Capgo](/register/) en place, vous pouvez vous concentrer sur l'application elle-même. [Capgo](/register/) s'attend à ce que l'application entière construite soit dans un répertoire nommé `dist`.

Si votre code construit n'est pas dans un répertoire `dist`, changez cette valeur dans le fichier de configuration de Capacitor.

Voici à quoi devrait ressembler la structure des répertoires de l'application :

![Structure de l'Application](/directory_looklike.webp)

## Configuration de Capgo

Avec votre application prête pour l'intégration [Capgo](https://console.capgo.app/), il est temps de s'inscrire et d'obtenir votre clé API pour télécharger votre première version ! Commencez par [vous inscrire pour un compte Capgo](/register/).

Une fois que vous êtes connecté à Capgo, accédez à la page de compte, puis cliquez sur la clé API, puis cliquez sur la clé 'write' pour la copier dans votre presse-papiers.

### Installer le SDK Capgo

À partir d'une ligne de commande, directement dans le répertoire racine de votre dossier d'application Capacitor, exécutez la commande suivante :

`npm i @capgo/capacitor-updater && npx cap sync`
Pour installer le plugin dans votre application Capacitor.

Ajoutez ensuite à votre application ce code en remplacement de celui de CodePush :

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Cela informera le plugin natif que l'installation a réussi.

## Déploiement des Mises à Jour en Direct (Alternative CodePush)

La fonction de mise à jour en direct fonctionne en utilisant le [SDK Capgo](https://github.com/Cap-go/capacitor-updater/) installé dans votre application native pour écouter une destination de canal de déploiement particulière. Lorsqu'une construction Web est attribuée à une destination de canal, cette mise à jour sera déployée sur les appareils des utilisateurs exécutant des binaires configurés pour écouter la destination de canal spécifiée.

### Connexion à Capgo CLOUD

Tout d'abord, utilisez le `all` [apikey](https://console.capgo.app/dashboard/apikeys/) présent dans votre compte pour vous connecter avec le CLI :

```shell
npx @capgo/cli@latest login YOURKEY
```

## Ajoutez votre première application

Commençons par créer l'application dans Capgo Cloud avec le CLI.

`npx @capgo/cli@latest app add`

Cette commande utilisera toutes les variables définies dans le fichier de configuration de Capacitor pour créer l'application.

## Téléchargez votre premier bundle

Exécutez la commande pour construire votre code et l'envoyer à Capgo avec :
```shell
npx @capgo/cli@latest bundle upload --channel production
```

Par défaut, le nom de version sera celui de votre fichier `package.json`.

Vérifiez dans [Capgo](https://console.capgo.app/) si la construction est présente.

Vous pouvez même le tester avec mon [application mobile sandbox](https://capgo.app/app_mobile/).

### Faire du canal le défaut

Après avoir envoyé votre application à Capgo, vous devez faire de votre canal le `default` pour permettre aux applications de recevoir des mises à jour de Capgo.

```shell
npx @capgo/cli@latest channel set production -s default
```

## Configurer l'application pour valider les mises à jour

Ajoutez cette configuration à votre fichier JavaScript principal.

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Ensuite, faites un `npm run build && npx cap copy` pour mettre à jour votre application.

### Recevoir une Mise à Jour en Direct sur un Appareil

Pour que votre application reçoive une mise à jour en direct depuis le déploiement, vous devrez exécuter l'application sur un appareil ou un émulateur. Le moyen le plus simple de le faire est d'utiliser simplement la commande suivante pour lancer votre application locale dans un émulateur ou un appareil connecté à votre ordinateur.

    npx cap run [ios | android]

Ouvrez l'application, mettez-la en arrière-plan puis rouvrez-la, vous devriez voir dans les journaux que l'application a été mise à jour.

Félicitations ! 🎉 Vous avez déployé avec succès votre première mise à jour en direct. Ce n'est que le début de ce que vous pouvez faire avec les mises à jour en direct. Pour en savoir plus, consultez la documentation complète sur les [Mises à Jour en Direct](/docs/plugin/cloud-mode/getting-started/).

## Supprimer les Dépendances d'App Center

Maintenant que nous avons intégré les services de Capgo, vous devriez supprimer toutes les références à App Center. En plus d'être une bonne pratique de supprimer le code/service non utilisé, retirer le SDK devrait réduire la taille de vos applications.

Tout d'abord, ouvrez un terminal, puis désinstallez les plugins App Center :
```shell
    cordova plugin remove cordova-plugin-appcenter-analytics cordova-plugin-appcenter-crashes cordova-plugin-code-push
```

Ensuite, ouvrez `config.xml` et retirez les valeurs de `préférence` suivantes. Elles ressembleront à :
```xml
    <preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" /><preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" /><preference name="CodePushPublicKey" value="YOUR-PUBLIC-KEY" />
```

Si vous utilisiez App Center Analytics dans votre application, retirez les éléments `preferences` suivants : `APPCENTER_ANALYTICS_ENABLE_IN_JS` et `APPCENTER_CRASHES_ALWAYS_SEND`.

Retirez les éléments `<preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" />` suivants :

```xml
    <access origin="https://codepush.appcenter.ms" /><access origin="https://codepush.blob.core.windows.net" /><access origin="https://codepushupdates.azureedge.net" />
```

Retirez la référence à CodePush dans la balise CSP `meta` dans le fichier `index.html` (`https://codepush.appcenter.ms`) :
```xml
    <meta http-equiv="Content-Security-Policy" content="default-src https://codepush.appcenter.ms 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" />
```

Enfin, dans votre application, retirez toutes les références de code aux services App Center, comme `codePush.sync();`.

## Prochaines Étapes

Vous avez migré d'App Center vers Capgo, en utilisant les mises à jour en direct. Ce n'est que le début de ce que vous pouvez utiliser avec Capgo. Explorez le reste du service, qui inclut Canal (plusieurs environnements) et override. L'intégration CLI Cloud, utilisez Capgo dans votre plateforme CI/CD de choix (comme GitHub Action, GitLab, Jenkins, et plus).

## Envoi Automatique de Mises à Jour d'Application

Si votre code est hébergé sur GitHub, vous pouvez configurer des constructions et des publications automatiques en quelques étapes supplémentaires, grâce aux actions GitHub.

J'ai rédigé un second article pour vous permettre de le faire.

## Crédits

Merci beaucoup à [Ionic](https://ionic.com/), cet article est basé sur [cet article](https://ionic.io/blog/moving-from-microsoft-app-center-to-ionic-appflow/) réécrit avec chat-gpt-3 et adapté.
