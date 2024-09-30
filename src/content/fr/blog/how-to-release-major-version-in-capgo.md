---
slug: how-to-release-major-version-in-capgo
title: Comment lancer la version principale en capgo
description: >-
  Comprendre comment et quand il est nécessaire de lancer une version principale
  de votre application sans tomber dans l'application de l'utilisateur.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-30T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Capgo major version system
tag: Tutorial
published: true
next_blog: how-to-send-specific-version-to-users
locale: fr
---

## Lors de la sortie d'une version majeure

Le versioning peut être difficile à gérer, vous souhaitez généralement envoyer une mise à jour majeure lorsqu'un changement majeur apparaît pour les utilisateurs

Mais le versioning n'est pas fait pour ça, la version App Store est différente de la version Native

La version native est conçue pour gérer les modifications avec rupture dans le *code*

Dans IOS, par exemple, iOS 16 est la « version magasin » d'Apple, mais la version du code est « 20A5283p » (ils ne semblent pas utiliser SemVer là-bas)

Il est désormais clair que nous ne les mélangeons pas et que nous ne les utilisons pas pour ce qu'ils sont fabriqués !

## Version majeure

Dans votre application Capacitor, une version majeure est nécessaire lorsqu'un changement radical se produit 
Par exemple, une nouvelle cible IOS (15 à 16), ou une nouvelle version de Capacitor (3 à 4), ou un plugin (12 à 20) que vous utilisez ont été mis à jour vers une version majeure.

Ce changement signifie que tous les outils doivent être alignés pour gérer le changement radical

C'est pourquoi Capgo suit ce système
Donc si vous publiez une version majeure, Capgo ne l'enverra pas à un utilisateur qui ne l'a pas installée depuis le store\
Ce comportement peut être personnalisé. Vous pouvez en savoir plus [ici](/docs/tooling/cli/#disable-updates-strategy)

### Versions

Où Capgo trouve la version à comparer

####IOS
  > Sera utilisé par Capgo pour comparer la version JavaScript et trouver une mise à niveau majeure

 Dans IOS, la var est définie sur votre projet ici `ios/App/App/Infoplist` sous la clé`CFBundleShortVersionString` ou `ios/App/Appxcodeproj/projectpbxproj` sous la clé `MARKETING_VERSION` si `MARKETING_VERSION` a été défini dans votre ` Fichier Infoplist
  > Vous pouvez remplacer ce comportement en définissant la clé de version dans le fichier `capacitorconfigjson` [docs ici](/docs/plugin/auto-update#advanced-settings/)

#### Android
  > Sera utilisé par Capgo pour comparer la version JavaScript et trouver une mise à niveau majeure

  sous Android, la var est définie sur votre projet ici `android/app/buildgradle` sous la clé `defaultConfigversionName`
  > Vous pouvez remplacer ce comportement en définissant la clé de version dans le fichier `capacitorconfigjson` [docs ici](/docs/plugin/auto-update#advanced-settings/)

####JavaScript
  > Sera utilisé par Capgo pour comparer à la version native et trouver une mise à niveau majeure

  en JavaScript, la var est définie sur votre projet ici `packagejson` sous la clé `version`
## Exemple

Votre application Ionic est actuellement publiée avec la version « 123 » avec Capacitor 3

Vous effectuez la mise à niveau vers le condensateur 4

Vous devez mettre à niveau votre numéro de version vers « 223 », puis tous vos packages incluent Capgo avec attention à ce grand changement

Lorsque vous publiez cette version sur Capgo et l'App Store

Toutes les prochaines mises à jour en direct dans Capgo `224` ne seront jamais envoyées à l'utilisateur avec la version `123` Uniquement avec la version `223`

Si vous suivez ce schéma, ne vous inquiétez pas davantage, tout est bien géré.


## Si je ne suis pas ça

Dans ce cas, cela signifie que vous devez envoyer votre nouvelle application avec Capacitor 4 à Apple et Google, mais pas à Capgo.

Ensuite, vous devez attendre que 100 % de vos utilisateurs aient l'application ou au moins 90 %, cela prendra des mois, probablement

Pendant ce temps, vous ne pouvez envoyer aucune mise à jour avec Capgo, car l'ancien utilisateur ne peut pas obtenir la nouvelle version.
Vous n'avez aucun moyen de sélectionner uniquement certains utilisateurs pour recevoir la mise à jour