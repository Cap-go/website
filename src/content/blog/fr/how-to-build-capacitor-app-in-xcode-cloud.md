---
slug: fr__how-to-build-capacitor-app-in-xcode-cloud
title: Comment créer une application Ionic Capacitor dans Xcode Cloud
description: >-
  Utilisez Xcode Cloud pour créer votre application Capacitor JS et évitez la
  nécessité d'utiliser MacOS.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-09-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /xcode_cloud.webp
head_image_alt: Compilation dans Xcode Cloud de Capacitor
tag: Tutorial
published: true
locale: fr
---

## Prérequis

Avant de continuer avec le tutoriel…

- Assurez-vous d'utiliser GitHub
- Utilisez Capacitor
- Votre application est déjà déployée sur l'App Store
- Envie de lire 😆…

L'utilisation d'Ionic est facultative, pour Cordova cela pourrait fonctionner, mais je ne l'ai pas essayé

## Important à propos du prix

![Prix Xcode Cloud](/xcode_cloud_pricewebp)

[https://developerapplecom/xcode-cloud/](https://developerapplecom/xcode-cloud/)

Le service est "gratuit" jusqu'à la limite  
Vous pouvez voir dans la capture d'écran les prix et les limites (prix à la date de création du tutoriel, ils pourraient subir des changements à l'avenir)

🔴 **_Une fois averti des exigences et des prix, si vous le souhaitez, nous continuons_**

> **_📣_ Dans cet article, nous supposons que nous avons l'application créée dans l'App Store**

## Introduction

Pour que Xcode compile votre application Capacitor, vous devez configurer quelques éléments

## Préparation du package

Assurez-vous d'avoir votre commande de build dans le script de votre `packagejson`
Ensuite, ajoutez la commande `sync:ios` comme ci-dessous

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```
Cette étape permettra au script post de fonctionner simplement

## Script post-clonage
Ce script sera exécuté par Xcode cloud après l'étape de clonage

```bash
#!/usr/bin/env bash

set -x

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
# Install CocoaPods
echo "📦 Install CocoaPods"
brew install cocoapods
brew install node@18
brew link node@18

# Install dependencies
# XCode Cloud is literally broken for 2 months now - https://developer.apple.com/forums/thread/738136?answerId=774510022#774510022
npm config set maxsockets 3
npm ci
# or `pnpm install --frozen-lockfile` or `yarn install --frozen-lockfile` or bun install
npm run build 
# or npm run build
npm run sync:ios
```

Enregistrez ce fichier à la racine de votre projet et nommez-le `ios/App/ci_scripts/ci_post_clonesh`

Ensuite, rendez ce fichier exécutable avec cette commande `chmod +x ios/App/ci_scripts/ci_post_clonesh`

## Créer un workflow Xcode

Ouvrez Xcode (oui, pour supprimer Xcode, vous avez besoin de Xcode)

Et allez dans cet onglet :
![Étape 1 Xcode](/xcode_step_1webp)

Cliquez sur créer un workflow, sélectionnez votre application, cliquez sur suivant comme ci-dessous

![Étape 2 Xcode](/xcode_step_2webp)

Cliquez sur Modifier le workflow sur la gauche
![Étape 2 Xcode](/xcode_step_3webp)

Allez dans l'onglet environnements et choisissez comme ci-dessous Mac 124 et cochez l'option appropriée
![Étape 3 Xcode](/xcode_step_3webp)

Choisissez votre condition de démarrage
Si vous utilisez la même build que nous, je suggère d'utiliser Tag au lieu de branch, pour éviter la double build

Définissez votre variable d'environnement
![Étape 4 Xcode](/xcode_step_4webp)

Connectez votre compte GitHub
![Étape 5 Xcode](/xcode_step_5webp)

![Étape 6 Xcode](/xcode_step_6webp)

Ensuite, activez le workflow et faites votre premier commit, vous devriez voir votre build s'exécuter dans Xcode

## **Traitement de la build**

Dans Xcode Cloud, **vous êtes facturé en fonction des minutes** que vous avez utilisées pour exécuter votre workflow CI/CD. D'après l'expérience, il faut environ 10 à 15 minutes avant qu'une build puisse être traitée dans l'App Store.

Pour les projets privés, le coût estimé par build peut atteindre **0,008 $/min x 5 min = 0,4 $**, ou plus, selon la configuration ou les dépendances de votre projet.

Pour les projets open source, cela ne devrait pas du tout être un problème. Voir [tarification](https://githubcom/pricing/)