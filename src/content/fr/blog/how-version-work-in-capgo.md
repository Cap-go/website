---
slug: how-version-work-in-capgo
title: Comment fonctionne la version dans Capgo
description: >-
  Comprenez comment Capgo gère les versions dans votre application Capacitor et
  utilisez-la au mieux. Apprenez la signification des patchs majeurs, mineurs.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /versionning.webp
head_image_alt: Capgo bundle version system
tag: Tutorial
published: true
next_blog: how-to-release-major-version-in-capgo
---

Capgo utilise 2 variables principales pour gérer les versions dans votre application Capacitor :
  -Version native
  - Versions Javascript


<div class="mx-auto" style="width:100%;">
  <img src="/graph_capgowebp" alt="Système de mise à jour des condensateurs">
</div>

Tous les choix de versions sont décidés côté serveur par Capgo

## Système de gestion des versions

Pour gérer la version Capgo, utilisez le système SemVer, en savoir plus [ici](https://semverorg/)
### Versions

Où Capgo trouve la version à comparer

  > Vous pouvez remplacer ce comportement en définissant la clé de version dans le fichier `capacitorconfigjson` [docs ici](/docs/plugin/settings/#version)
  > La version native sera ignorée pour toutes les plateformes

####IOS

 Dans IOS, la var est définie sur votre projet ici `ios/App/App/Infoplist` sous la clé`CFBundleShortVersionString` ou `ios/App/Appxcodeproj/projectpbxproj` sous la clé `MARKETING_VERSION` si `MARKETING_VERSION` a été défini dans votre ` Fichier Infoplist

#### Android

  Sous Android, la variable est définie sur votre projet ici `android/app/buildgradle` sous la clé `defaultConfigversionName`

#### JavaScript (version du pack Capgo)

  En JavaScript, la var peut être définie dans votre `packagejson` sous la clé `version`
  Sinon, vous devez le fournir dans la commande de téléchargement

## Comportement par défaut

Voici comment la chaîne Capgo se comportera si vous n'avez modifié aucun paramètre

> Ce comportement sera basé sur le canal unique que vous avez défini par défaut

### Lors de la nouvelle installation de votre application Capacitor
Lorsque l'utilisateur télécharge votre application Ionic pour la première fois et ouvre l'application, il contacte le serveur Capgo.

Actuellement, 4 sorties peuvent se produire :
  - La version native du bundle (123) est inférieure à la version du bundle Capgo (124), Capgo envoie son bundle à l'utilisateur
  - La version native du bundle (123) est égale à la version du bundle Capgo (123), Capgo envoie « pas besoin de mettre à jour »
  - La version native du bundle (124) est supérieure à la version du bundle Capgo (123), Capgo envoie « pas besoin de mettre à jour »
  - La version native du bundle (123) est MAJEURE inférieure à la version du bundle Capgo (223), Capgo envoie « pas besoin de mettre à jour »

### Autres paramètres

#### Désactiver la rétrogradation automatique en mode natif

Si vous modifiez ce paramètre sur false, Capgo considérera qu'elle est toujours la source fiable de la version.
Alors le comportement devient :
- La version native (124) est supérieure à la version Capgo (123)

> Capgo envoie sa version à l'utilisateur

#### Désactiver la stratégie de mise à niveau automatique

Vous pouvez choisir parmi plusieurs stratégies. Vous pouvez en savoir plus à ce sujet [ici](/docs/tooling/cli/#disable-updates-strategy)

## Version du bundle JavaScript

La version du bundle JavaScript est celle que vous envoyez lors de l'exécution de `npx @capgo/cli@latest bundle upload --channel production`

Si vous n'avez pas utilisé l'option `--bundle 123`, Capgo obtiendra la version du bundle à partir de votre fichier `packagejson` (dans la clé de version)

Une fois que votre application Ionic a installé une version de Capgo, c'est cette version qui sera comparée pour :
  - Leur version du bundle JavaScript (123) est inférieure à la version du bundle Capgo (124), Capgo envoie son bundle à l'utilisateur

Avec quelques conditions de garde :
  - Si la version native du bundle est supérieure à la version Capgo, la condition « Désactiver la rétrogradation automatique en mode natif » est appliquée
  - Si la version native du bundle est MAJEURE inférieure à la version Capgo, la condition « Désactiver la mise à niveau automatique au-dessus de la version majeure » ​​est appliquée

## Mise à jour de l'App Store

Lorsque vous publiez votre application Capacitor JS sur l'App Store, ce qui se passe est simple

Votre utilisateur obtiendra la nouvelle version du magasin et supprimera par défaut toutes les mises à jour locales de son application.

Si vous souhaitez modifier ce comportement, vous devez définir le paramètre « resetWhenUpdate ». En savoir plus à ce sujet [ici](/docs/plugin/api#settings)

Cela ne peut être modifié que du côté de l'application, et non depuis le cloud comme les autres paramètres.

### Autres paramètres

Après tout ce comportement, vous pouvez avoir au-dessus de cela un comportement spécifique apprécié par l'ID de périphérique.

Dans Capgo, vous pouvez décider de remplacer le comportement de chaque ID d'appareil

Vous pouvez associer un identifiant d'appareil à :
  - une version bundle spécifique
  - un canal spécifique

Cela contournera tous les paramètres effectués ci-dessusApprenez-en plus à ce sujet dans l’article ci-dessous