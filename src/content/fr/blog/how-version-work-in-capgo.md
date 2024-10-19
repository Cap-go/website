---
slug: how-version-work-in-capgo
title: Comment fonctionnent les versions dans Capgo
description: >-
  Comprenez comment Capgo gère les versions dans votre application Capacitor et
  utilisez-le de manière optimale. Découvrez la signification de Majeure,
  Mineure et Correctif.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /versionning.webp
head_image_alt: Système de versionnement des paquets de Capgo
tag: Tutorial
published: true
locale: fr
next_blog: how-to-release-major-version-in-capgo
---

Capgo utilise 2 variables principales pour gérer les versions dans votre application Capacitor :
  - Version native
  - Versions JavaScript

Tous les choix de versions sont décidés côté serveur par Capgo

## Système de versionnage

Pour gérer les versions, Capgo utilise le système SemVer, en savoir plus à ce sujet [ici](https://semverorg/)

### Versions

Où Capgo trouve la version à comparer

  > Vous pouvez remplacer ce comportement en définissant la clé version dans le fichier `capacitorconfigjson` [documentation ici](/docs/plugin/settings/#version)
  > La version native sera ignorée pour toutes les plateformes

#### iOS

 Sur iOS, la variable est définie dans votre projet ici `ios/App/App/Infoplist` sous la clé `CFBundleShortVersionString` ou `ios/App/Appxcodeproj/projectpbxproj` sous la clé `MARKETING_VERSION` si `MARKETING_VERSION` a été défini dans votre fichier `Infoplist`

#### Android

  Sur Android, la variable est définie dans votre projet ici `android/app/buildgradle` sous la clé `defaultConfigversionName`

#### JavaScript (version du bundle Capgo)

  En JavaScript, la variable peut être définie dans votre `packagejson` sous la clé `version`
  Sinon, vous devez la fournir dans la commande d'upload

## Comportement par défaut

Voici comment le canal Capgo se comportera si vous n'avez modifié aucun paramètre

> Ce comportement sera basé sur l'unique canal que vous avez défini par défaut

### Lors d'une nouvelle installation de votre application Capacitor
Lorsque l'utilisateur a téléchargé votre application Ionic pour la première fois et ouvre l'application, elle contacte le serveur Capgo

Actuellement, 4 résultats peuvent se produire :
  - La version du bundle natif (123) est inférieure à la version du bundle Capgo (124), Capgo envoie son bundle à l'utilisateur
  - La version du bundle natif (123) est égale à la version du bundle Capgo (123), Capgo envoie "pas besoin de mise à jour"
  - La version du bundle natif (124) est supérieure à la version du bundle Capgo (123), Capgo envoie "pas besoin de mise à jour"
  - La version du bundle natif (123) est MAJEURE inférieure à la version du bundle Capgo (223), Capgo envoie "pas besoin de mise à jour"

### Autres paramètres

#### Désactiver la rétrogradation automatique sous la version native

Si vous modifiez ce paramètre à faux, Capgo considérera qu'il est toujours la source fiable de la version
Alors le comportement devient :
- La version native (124) est supérieure à la version Capgo (123)

> Capgo envoie sa version à l'utilisateur

#### Désactiver la stratégie de mise à jour automatique

Il existe plusieurs stratégies parmi lesquelles vous pouvez choisir. Vous pouvez en apprendre davantage à ce sujet [ici](/docs/tooling/cli/#disable-updates-strategy)

## Version du bundle JavaScript

La version du bundle JavaScript est celle que vous envoyez lors de l'exécution de `npx @capgo/cli@latest bundle upload --channel production`

Si vous n'avez pas utilisé l'option `--bundle 123`, Capgo obtiendra la version du bundle depuis votre fichier `packagejson` (dans la clé version)

Après que votre application Ionic a installé une version de Capgo, c'est cette version qui sera comparée pour :
  - Leur version du bundle JavaScript (123) est inférieure à la version du bundle Capgo (124), Capgo envoie son bundle à l'utilisateur

Avec quelques conditions de garde :
  - Si la version du bundle natif est supérieure à la version Capgo, la condition `Désactiver la rétrogradation automatique sous la version native` est appliquée
  - Si la version du bundle natif est MAJEURE inférieure à la version Capgo, la condition `Désactiver la mise à jour automatique au-dessus de la version majeure` est appliquée

## Mise à jour de l'App Store

Lorsque vous publiez votre application Capacitor JS sur l'App Store, ce qui se passe est simple

Votre utilisateur obtiendra la nouvelle version depuis le store et supprimera toutes les mises à jour locales dans leur application par défaut

Si vous voulez changer ce comportement, vous devez définir le paramètre `resetWhenUpdate` en savoir plus à ce sujet [ici](/docs/plugin/api#settings)

Cela ne peut être modifié que du côté de l'application, pas depuis le cloud comme les autres paramètres

### Autres paramètres

Après tout ce comportement, vous pouvez avoir en plus certains spécifiques liés à l'ID de l'appareil

Dans Capgo, vous pouvez décider de remplacer le comportement pour chaque ID d'appareil

Vous pouvez lier un ID d'appareil à :
  - une version de bundle spécifique
  - un canal spécifique

Cela contournera tous les paramètres définis ci-dessus

En savoir plus à ce sujet dans l'article ci-dessous