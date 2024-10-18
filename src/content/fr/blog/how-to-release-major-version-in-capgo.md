---
slug: how-to-release-major-version-in-capgo
title: Voici comment publier une version majeure dans Capgo
description: >-
  Comprenez comment et quand il est nécessaire de publier une version majeure de
  votre application sans endommager l'application de l'utilisateur
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-30T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Système principal de versions de Capgo
tag: Tutorial
published: true
locale: fr
next_blog: how-to-send-specific-version-to-users
---

## Lors de la publication d'une version majeure

La gestion des versions peut être difficile, généralement on souhaite envoyer une mise à jour majeure lorsqu'un changement important apparaît pour les utilisateurs

Mais le versioning n'est pas fait pour cela, la version de l'App Store est différente de la version Native

La version Native est faite pour gérer les changements incompatibles dans le *code*

Sur iOS, par exemple, iOS 16 est la `version du store` d'Apple, mais la version du code est `20A5283p` (ils ne semblent pas utiliser SemVer ici)

Maintenant, il est clair que nous ne les mélangeons pas et les utilisons pour ce à quoi elles sont destinées !

## Version majeure

Dans votre application Capacitor, une version majeure est nécessaire lorsqu'un changement incompatible se produit 
Par exemple, une nouvelle cible iOS (15 à 16), ou une nouvelle version de Capacitor (3 à 4), ou un plugin (12 à 20) que vous utilisez a été mis à jour vers une version majeure

Ce changement signifie que tous les outils doivent être alignés pour gérer le changement incompatible

C'est pourquoi Capgo suit ce système
Donc si vous publiez une version majeure, Capgo ne l'enverra pas à un utilisateur qui ne l'a pas installée depuis le store\
Ce comportement peut être personnalisé. Vous pouvez en apprendre davantage à ce sujet [ici](/docs/tooling/cli/#disable-updates-strategy)

### Versions

Où Capgo trouve la version à comparer

#### iOS
  > Sera utilisée par Capgo pour comparer à la version JavaScript et trouver une mise à niveau majeure

 Sur iOS, la variable est définie dans votre projet ici `ios/App/App/Info.plist` sous la clé `CFBundleShortVersionString` ou `ios/App/App.xcodeproj/project.pbxproj` sous la clé `MARKETING_VERSION` si `MARKETING_VERSION` a été défini dans votre fichier `Info.plist`
  > Vous pouvez remplacer ce comportement en définissant la clé version dans le fichier `capacitor.config.json` [documentation ici](/docs/plugin/auto-update#advanced-settings/)

#### Android
  > Sera utilisée par Capgo pour comparer à la version JavaScript et trouver une mise à niveau majeure

  Sur Android, la variable est définie dans votre projet ici `android/app/build.gradle` sous la clé `defaultConfig.versionName`
  > Vous pouvez remplacer ce comportement en définissant la clé version dans le fichier `capacitor.config.json` [documentation ici](/docs/plugin/auto-update#advanced-settings/)

#### JavaScript
  > Sera utilisée par Capgo pour comparer à la version Native et trouver une mise à niveau majeure

  En JavaScript, la variable est définie dans votre projet ici `package.json` sous la clé `version`

## Exemple

Votre application Ionic est actuellement publiée avec la version `1.2.3` avec Capacitor 3

Vous effectuez la mise à niveau vers Capacitor 4

Vous devez mettre à jour votre numéro de version à `2.2.3`, puis tous vos packages, y compris Capgo, remarqueront ce grand changement

Lorsque vous publiez cette version sur Capgo et l'App Store

Toutes les prochaines mises à jour en direct dans Capgo `2.2.4` ne seront jamais envoyées aux utilisateurs avec la version `1.2.3` Uniquement avec la version `2.2.3`

Si vous suivez ce modèle, pas besoin de s'inquiéter davantage, tout est bien géré

## Si je ne suis pas cette règle

Dans ce cas, cela signifie que vous devez envoyer votre nouvelle application avec Capacitor 4 à Apple et Google, mais pas à Capgo

Ensuite, vous devez attendre que 100% de vos utilisateurs, ou au moins 90%, aient l'application, ce qui prendra probablement des mois

Pendant ce temps, vous ne pouvez envoyer aucune mise à jour avec Capgo, car les anciens utilisateurs ne peuvent pas obtenir la nouvelle version
Vous n'avez pas de moyen de sélectionner uniquement certains utilisateurs pour recevoir la mise à jour