---
slug: how-version-work-in-capgo
title: Comment fonctionne le contrôle de versions dans Capgo
description: >-
  Comprendre comment Capgo gère les versions dans votre application Capacitor et
  l'utiliser de la meilleure façon. Apprenez la signification de major, minor,
  patch.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /versionning.webp
head_image_alt: Système de versions des packages de Capgo
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Tutorial
published: true
locale: fr
next_blog: how-to-release-major-version-in-capgo
---
Here's the French translation:

Capgo utilise 2 variables principales pour gérer les versions dans votre application Capacitor :
  - Version native
  - Versions JavaScript

<div class="mx-auto" style="width:100%;">
  <img src="/graph_capgo.webp" alt="Capacitor update system">
</div>

Tous les choix de versions sont décidés côté serveur par Capgo.

## Système de versionnage

Pour gérer les versions, Capgo utilise le système SemVer, en savoir plus à ce sujet [ici](https://semver.org/).
### Versions

Où Capgo trouve la version à comparer

  > Vous pouvez remplacer ce comportement en définissant la clé version dans le fichier `capacitor.config.json` [documentation ici](/docs/plugin/settings/#version)
  > La version native sera ignorée pour toutes les plateformes.

#### IOS

Sur iOS, la variable est définie dans votre projet ici `ios/App/App/Info.plist` sous la clé `CFBundleShortVersionString` ou `ios/App/App.xcodeproj/project.pbxproj` sous la clé `MARKETING_VERSION` si `MARKETING_VERSION` a été défini dans votre fichier `Info.plist`.

#### Android

Sur Android, la variable est définie dans votre projet ici `android/app/build.gradle` sous la clé `defaultConfig.versionName`

#### JavaScript (version du bundle Capgo)

En JavaScript, la variable peut être définie dans votre `package.json` sous la clé `version`
Sinon, vous devez la fournir dans la commande d'upload.

## Comportement par défaut

Voici comment le canal Capgo se comportera si vous n'avez modifié aucun paramètre.

> Ce comportement sera basé sur l'unique canal que vous avez défini par défaut.

### Lors d'une nouvelle installation de votre application Capacitor
Lorsqu'un utilisateur télécharge votre application Ionic pour la première fois et l'ouvre, elle contacte le serveur Capgo.

Actuellement, 4 résultats peuvent se produire :
  - La version du bundle natif (1.2.3) est inférieure à la version du bundle Capgo (1.2.4), Capgo envoie son bundle à l'utilisateur.
  - La version du bundle natif (1.2.3) est égale à la version du bundle Capgo (1.2.3), Capgo envoie "pas besoin de mise à jour".
  - La version du bundle natif (1.2.4) est supérieure à la version du bundle Capgo (1.2.3), Capgo envoie "pas besoin de mise à jour".
  - La version du bundle natif (1.2.3) est MAJEURE inférieure à la version du bundle Capgo (2.2.3), Capgo envoie "pas besoin de mise à jour".

### Autres paramètres

#### Désactiver la rétrogradation automatique sous la version native

Si vous changez ce paramètre à false, Capgo se considérera toujours comme la source fiable de la version.
Alors le comportement devient :
- La version native (1.2.4) est supérieure à la version Capgo (1.2.3)

> Capgo envoie sa version à l'utilisateur.

#### Désactiver la stratégie de mise à jour automatique

Il existe plusieurs stratégies parmi lesquelles vous pouvez choisir. Vous pouvez en apprendre plus à ce sujet [ici](/docs/cli/commands/#disable-updates-strategy)

## Version du bundle JavaScript

La version du bundle JavaScript est celle que vous envoyez lors de l'exécution de `npx @capgo/cli@latest bundle upload --channel production`

Si vous n'avez pas utilisé l'option `--bundle 1.2.3`, Capgo récupérera la version du bundle depuis votre fichier `package.json` (dans la clé version).

Après que votre application Ionic a installé une version depuis Capgo, c'est cette version qui sera comparée pour :
  - Leur version du bundle JavaScript (1.2.3) est inférieure à la version du bundle Capgo (1.2.4), Capgo envoie son bundle à l'utilisateur.

Avec certaines conditions de garde :
  - Si la version du bundle natif est supérieure à la version Capgo, la condition `Disable auto downgrade under native` est appliquée.
  - Si la version du bundle natif est MAJEURE inférieure à la version Capgo, la condition `Disable auto upgrade above major` est appliquée.

## Mise à jour App Store

Lorsque vous publiez votre application Capacitor JS sur l'App Store, ce qui se passe est simple.

Vos utilisateurs obtiendront la nouvelle version depuis le store et supprimeront toutes les mises à jour locales dans leur application par défaut.

Si vous voulez changer ce comportement, vous devez définir le paramètre `resetWhenUpdate` en savoir plus à ce sujet [ici](/docs/plugin/api#settings)

Cela ne peut être modifié que du côté de l'application, pas depuis le cloud comme les autres paramètres.

### Autres paramètres

Après tout ce comportement, vous pouvez avoir en plus certains comportements spécifiques liés à l'ID de l'appareil.

Dans Capgo, vous pouvez décider de remplacer le comportement pour chaque ID d'appareil.

Vous pouvez lier un ID d'appareil à :
  - une version de bundle spécifique
  - un canal spécifique

Cela contournera tous les paramètres définis ci-dessus.

En savoir plus à ce sujet dans l'article ci-dessous.
