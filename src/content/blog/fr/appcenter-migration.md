---
slug: appcenter-migration
title: Migrasi App Center ke Capgo
description: >-
  Dans ce guide, nous allons parcourir la migration complète de Capgo Live
  Updates, une alternative à Microsoft CodePush.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-22T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrate_appcenter.webp
head_image_alt: Capacitor JS Dev à la recherche d'une alternative
keywords: >-
  App Center, migration, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Migration
published: true
locale: fr
next_blog: automatic-build-and-release-with-github-actions
original_slug: appcenter-migration
---
## Résumé de la Migration

* [Capgo](/register/) est un service qui aide les équipes de développement à envoyer des applications en direct aux applications déployées.
* Les applications Capacitor JS écrites avec jQuery Mobile, Framework 7, Sencha, KendoUI, Ionic ou même votre propre solution personnalisée peuvent être migrées. **Une application Ionic existante n'est pas requise**.
* [Colt](https://volt.build/) offre des services équivalents pour App Center Build (compilation d'applications Android/iOS). Pour les services de Test, Diagnostic et Analytique.

##### Note

Si votre application utilise toujours Cordova, il est nécessaire de [migrer vers Capacitor](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/) avant de migrer vers Capgo.

Conçu par l'équipe Ionic comme successeur spirituel de Cordova, Capacitor permet au développement de se rapprocher des outils et des capacités natives dans le but de fournir une expérience utilisateur et des performances encore meilleures.

Heureusement, le processus de migration est facile et la majorité des plugins Cordova sont rétrocompatibles avec Capacitor. [Commencez la migration ici](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/).

## À propos de Capgo

Capgo gère la mise à jour des applications au fil du temps. Les équipes de développement peuvent se concentrer entièrement sur les fonctionnalités uniques de leur application et externaliser le processus complexe de livraison d'applications à Capgo.

Capgo comble les lacunes entre la livraison web et mobile.

## Prérequis Capgo

Comme App Center, [Capgo](/register/) prend en charge les applications hébergées dans les dépôts Git sur Azure DevOps, Bitbucket, GitHub et GitLab.

### Installer Capgo CLI

##### note

Avoir Node et NPM installés sur votre ordinateur est nécessaire avant de continuer. Utilisez toujours la [version LTS actuelle](https://nodejs.org/). Capgo ne supporte pas les versions plus anciennes.

### Créer les fichiers `package.json` et de configuration Capacitor

##### note

Avant de commencer, je recommande d'effectuer les modifications sur une nouvelle branche Git.

Puisque [Capgo](/register/) a été créé pour automatiser les applications Capacitor, il nécessite un fichier que votre application pourrait ne pas avoir. Tout d'abord, créez un fichier `capacitor.config.json`. La façon la plus simple de le créer est d'exécuter à la racine de votre application :

```shell
npm install @capacitor/core
```

Ensuite, initialisez Capacitor en utilisant le questionnaire CLI :

```shell
npx cap init
```

Le CLI vous posera quelques questions, en commençant par le nom de votre application et l'ID de package que vous souhaitez utiliser pour votre application.

Enfin, committez les nouveaux fichiers dans votre projet :

    git add .git commit -m "ajout du package json et de la configuration capacitor" && git push

### Migrer le Code

Maintenant que vous avez les nouveaux fichiers requis par [Capgo](/register/) en place, vous pouvez vous concentrer sur l'application elle-même. [Capgo](/register/) s'attend à ce que l'application construite complète soit dans un répertoire nommé `dist`.

Si votre code construit n'est pas dans un répertoire `dist`, modifiez cette valeur dans le fichier de configuration Capacitor.

Voici à quoi devrait ressembler la structure de répertoire de l'application :

![Structure de l'Application](/directory_looklike.webp)

## Configuration de Capgo

Avec votre application prête pour l'intégration [Capgo](https://web.capgo.app/), il est temps de s'inscrire et d'obtenir votre clé API pour télécharger votre première version ! Commencez par [vous inscrire pour un compte Capgo](/register/).

Une fois connecté à Capgo, naviguez vers la page Compte puis cliquez sur Clé API, puis cliquez sur la clé 'write' pour la copier dans votre presse-papiers.

### Installer le SDK Capgo

Depuis une ligne de commande, directement à la racine de votre dossier d'application Capacitor, exécutez la commande suivante :

`npm i @capgo/capacitor-updater && npx cap sync`
Pour installer le plugin dans votre application Capacitor.

Et ensuite ajoutez à votre application ce code en remplacement de celui de CodePush :

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Cela indiquera au plugin natif que l'installation a réussi.

## Déployer des Mises à Jour en Direct (Alternative à CodePush)

La fonctionnalité de Mise à Jour en Direct fonctionne en utilisant le [SDK Capgo](https://github.com/Cap-go/capacitor-updater/) installé dans votre application native pour écouter une Destination de Canal de Déploiement particulière. Lorsqu'une build Web est assignée à une Destination de Canal, cette mise à jour sera déployée sur les appareils utilisateurs exécutant des binaires configurés pour écouter la Destination de Canal spécifiée.

### Se connecter à Capgo CLOUD

Tout d'abord, utilisez la [clé api](https://web.capgo.app/dashboard/apikeys/) 'all' présente dans votre compte pour vous connecter avec le CLI :

```shell
npx @capgo/cli@latest login YOURKEY
```

## Ajouter votre première application

Commençons par créer l'application dans Capgo Cloud avec le CLI.

`npx @capgo/cli@latest app add`

Cette commande utilisera toutes les variables définies dans le fichier de configuration Capacitor pour créer l'application.

## Télécharger votre premier bundle

Exécutez la commande pour construire votre code et l'envoyer à Capgo avec :
```shell
npx @capgo/cli@latest bundle upload --channel production
```

Par défaut, le nom de version sera celui de votre fichier `package.json`.

Vérifiez dans [Capgo](https://web.capgo.app/) si la build est présente.

Vous pouvez même la tester avec mon [application sandbox mobile](https://capgo.app/app_mobile/).

### Rendre le canal par défaut

Après avoir envoyé votre application à Capgo, vous devez rendre votre canal `default` pour permettre aux applications de recevoir des mises à jour de Capgo.

```shell
npx @capgo/cli@latest channel set production -s default
```

## Configurer l'application pour valider les mises à jour

Ajoutez cette configuration à votre fichier JavaScript principal.

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

Puis faites un `npm run build && npx cap copy` pour mettre à jour votre application.

### Recevoir une Mise à Jour en Direct sur un Appareil

Pour que votre application reçoive une mise à jour en direct de Deploy, vous devrez exécuter l'application sur un appareil ou un émulateur. La façon la plus simple est simplement d'utiliser la commande suivante pour lancer votre application locale dans un émulateur ou un appareil connecté à votre ordinateur.

    npx cap run [ios | android]

Ouvrez l'application, mettez-la en arrière-plan et ouvrez-la à nouveau, vous devriez voir dans les logs que l'application a effectué la mise à jour.

Félicitations ! 🎉 Vous avez réussi à déployer votre première Mise à Jour en Direct. Ce n'est que le début de ce que vous pouvez faire avec les Mises à Jour en Direct. Pour en savoir plus, consultez la [documentation complète des Mises à Jour en Direct](/docs/plugin/cloud-mode/getting-started/).

## Supprimer les Dépendances App Center

Maintenant que nous avons intégré les services de Capgo, vous devez supprimer toutes les références à App Center. Outre le fait qu'il s'agit d'une bonne pratique de supprimer le code/services inutilisés, la suppression du SDK devrait réduire la taille de vos applications.

Tout d'abord, ouvrez un terminal puis désinstallez les plugins App Center :
```shell
    cordova plugin remove cordova-plugin-appcenter-analytics cordova-plugin-appcenter-crashes cordova-plugin-code-push
```

Ensuite, ouvrez `config.xml` et supprimez les valeurs `preference` suivantes. Elles ressembleront à :
```xml
    <preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" /><preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" /><preference name="CodePushPublicKey" value="YOUR-PUBLIC-KEY" />
```

Si vous utilisiez App Center Analytics dans votre application, supprimez les éléments `preferences` suivants : `APPCENTER_ANALYTICS_ENABLE_IN_JS` et `APPCENTER_CRASHES_ALWAYS_SEND`.

Supprimez les éléments `<preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" />` suivants :

```xml
    <access origin="https://codepush.appcenter.ms" /><access origin="https://codepush.blob.core.windows.net" /><access origin="https://codepushupdates.azureedge.net" />
```

Supprimez la référence à CodePush dans la balise `meta` CSP dans le fichier `index.html` (`https://codepush.appcenter.ms`) :
```xml
    <meta http-equiv="Content-Security-Policy" content="default-src https://codepush.appcenter.ms 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" />
```

Enfin, dans votre application, supprimez toutes les références de code aux services App Center, comme `codePush.sync();`.

## Prochaines Étapes

Vous avez migré d'App Center vers Capgo, en utilisant les Mises à Jour en Direct. Ce n'est que le début de ce que vous pouvez faire avec Capgo. Explorez le reste du service qui inclut Channel (environnements multiples) et override. Intégration Cloud CLI, utilisez Capgo dans votre plateforme CI/CD préférée (comme GitHub Action, GitLab, Jenkins, et plus).

## Envoi automatique des mises à jour d'application

Si votre code est hébergé sur GitHub, vous pouvez configurer la construction et la publication automatiques en quelques étapes supplémentaires, grâce aux actions GitHub.

J'ai fait un second article pour vous permettre de le faire.

## Crédits

Merci beaucoup à [Ionic](https://ionic.com/), cet article est basé sur [cet article](https://ionic.io/blog/moving-from-microsoft-app-center-to-ionic-appflow/) réécrit avec chat-gpt-3 et adapté.
