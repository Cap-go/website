---
slug: how-to-build-capacitor-app-in-xcode-cloud
title: Comment créer une application Ionic Capacitor dans Xcode Cloud
description: >-
  Utilisez Xcode cloud pour compiler votre application Capacitor JS et
  contourner le besoin de MacOS.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-09-01T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /xcode_cloud.webp
head_image_alt: Build Capacitor Xcode Cloud
keywords: >-
  Xcode Cloud, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: fr
---
## Prérequis

Avant de continuer avec le tutoriel…

-   Assurez-vous d'utiliser GitHub
-   Utilisez Capacitor
-   Votre application est déjà déployée sur l'Apple Store
-   Envie de lire 😆…

L'utilisation d'Ionic est optionnelle, pour Cordova cela pourrait fonctionner, mais je ne l'ai pas essayé.

## Important concernant le prix

![Price Xcode Cloud](/xcode_cloud_price.webp)

[https://developer.apple.com/xcode-cloud/](https://developer.apple.com/xcode-cloud/)

Le service est '_gratuit_' jusqu'à la limite.  
Vous pouvez voir dans la capture d'écran les prix et les limites (prix à la date de création du tutoriel, ils pourraient subir des modifications à l'avenir)

🔴 **_Une fois avertis des exigences et des prix, si cela vous convient, nous continuons..._**

> **_📣_ Dans ce post, nous supposons que nous avons l'application créée dans l'Apple Store**

## Introduction

Pour que Xcode compile votre application Capacitor, vous devez configurer quelques éléments.

## Préparation du Package

Assurez-vous d'avoir votre commande de build dans votre script `package.json`.
Puis ajoutez la commande `sync:ios` comme ci-dessous.

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```
Cette étape permettra au script post de fonctionner simplement

## Script post-clone
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
# or `pnpm install --frozen-lockfile` or `yarn add --frozen-lockfile` or bun install
npm run build 
# or npm run build
npm run sync:ios
```

Enregistrez ce fichier à la racine de votre projet et nommez-le `ios/App/ci_scripts/ci_post_clone.sh`

Puis rendez ce fichier exécutable avec cette commande `chmod +x ios/App/ci_scripts/ci_post_clone.sh`

## Créer un workflow Xcode

Ouvrez Xcode (oui, pour supprimer Xcode vous avez besoin de Xcode)

Et allez dans cet onglet :
![Xcode step 1](/xcode_step_1.webp)

Cliquez sur créer un workflow, sélectionnez votre application, cliquez sur suivant comme ci-dessous.

![Xcode step 2](/xcode_step_2.webp)

Cliquez sur Modifier le workflow à gauche
![Xcode step 2](/xcode_step_3.webp)

Allez dans l'onglet environnements et choisissez comme ci-dessous Mac 12.4 et cochez l'option appropriée
![Xcode step 3](/xcode_step_3.webp)

Choisissez votre condition de démarrage.
Si vous utilisez le même build que nous, je suggère d'utiliser Tag au lieu de branch, pour éviter le double build.

Définissez votre variable d'environnement
![Xcode step 4](/xcode_step_4.webp)

Connectez votre compte GitHub
![Xcode step 5](/xcode_step_5.webp)

![Xcode step 6](/xcode_step_6.webp)

Puis activez le workflow et committez votre premier changement, vous devriez voir votre build s'exécuter dans Xcode.

## **Traitement du Build**

Dans Xcode Cloud, **vous êtes facturé en fonction des minutes** que vous avez utilisées pour exécuter votre workflow CI/CD. D'après l'expérience, il faut environ 10-15 minutes avant qu'un build puisse être traité dans l'Apple Store.

Pour les projets privés, le coût estimé par build peut aller jusqu'à **0,008$/min x 5 mins = 0,4$**, ou plus, selon la configuration ou les dépendances de votre projet.

Pour les projets Open-source, cela ne devrait pas du tout être un problème. Voir les [tarifs](https://github.com/pricing/).
