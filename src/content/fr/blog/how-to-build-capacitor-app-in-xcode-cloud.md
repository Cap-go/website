---
slug: how-to-build-capacitor-app-in-xcode-cloud
title: Comment créer une application Ionic Capacitor dans Xcode Cloud
description: >-
  Utilisez le cloud Xcode pour créer votre application Capacitor JS et
  contourner le besoin de MacOS.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-09-01T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /xcode_cloud.webp
head_image_alt: Capacitor Xcode cloud build
tag: Tutorial
published: true
locale: fr
---

## Prérequis

Avant de poursuivre le tutoriel…

- Assurez-vous d'utiliser GitHub
- Utiliser un condensateur
- Votre application est déjà déployée sur Apple Store
- Envie de lire 😆…

L'utilisation d'Ionic est facultative, pour Cordova cela pourrait fonctionner, mais je n'ai pas essayé

## Important concernant le prix

![Prix Xcode Cloud](/xcode_cloud_pricewebp)

[https://developerapplecom/xcode-cloud/](https://developerapplecom/xcode-cloud/)

Le service est « _gratuit »_ jusqu'à la limite  
Vous pouvez voir dans la capture d'écran le prix et les limites (prix dès la création du tutoriel, ils pourraient subir des modifications dans le futur)

🔴 **_Une fois prévenus des exigences et des tarifs, si vous le souhaitez, on continue_**

> **_📣_ Dans le post, nous supposons que l'application est créée dans l'Apple Store**

## Introduction

Pour que Xcode crée votre application Capacitor, vous devez configurer quelques éléments

## Préparation du colis

Assurez-vous d'avoir votre commande build dans votre script `packagejson`
Ajoutez ensuite la commande `sync:ios` comme ci-dessous

```json
{
  "scripts": {
    "build": "YOUR BUILD COMMAND",
    "sync:ios": "cap sync ios"
  }
}
```
Cette étape permettra au post-script de fonctionner simplement

## Script de post-clonage
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

Rendez ensuite ce fichier exécutable avec cette commande `chmod +x ios/App/ci_scripts/ci_post_clonesh`

## Créer un workflow Xcode

Ouvrez Xcode (oui, pour supprimer Xcode, vous avez besoin de Xcode)

Et allez dans cet onglet :
![Xcode étape 1](/xcode_step_1webp)

Cliquez sur créer un workflow, sélectionnez votre application, cliquez sur suivant comme ci-dessous

![Xcode étape 2](/xcode_step_2webp)

Cliquez sur Modifier le workflow à gauche
![Xcode étape 2](/xcode_step_3webp)

Accédez à l'onglet Environnements et choisissez comme ci-dessous Mac 124 et cochez l'option appropriée
![Xcode étape 3](/xcode_step_3webp)

Choisissez votre condition de départ
Si vous utilisez le même build que nous, je vous suggère d'utiliser Tag au lieu de branch, pour éviter une double build

Définissez votre variable d'environnement
![Xcode étape 4](/xcode_step_4webp)

Connectez votre compte GitHub
![Xcode étape 5](/xcode_step_5webp)

![Xcode étape 6](/xcode_step_6webp)


Ensuite, activez le workflow et validez votre première modification, vous devriez voir votre build s'exécuter dans Xcode

## **Traitement de construction**

Dans Xcode Cloud, **vous êtes facturé en fonction des minutes** que vous avez utilisées pour exécuter votre flux de travail CI/CD. Par expérience, il faut environ 10 à 15 minutes avant qu'une build puisse être traitée dans l'Apple Store.

Pour les projets privés, le coût estimé par build peut aller jusqu'à **0008$/min x 5 minutes = 04$**, ou plus, selon la configuration ou les dépendances de votre projet.

Pour les projets Open source, cela ne devrait pas poser de problème du tout. Voir [tarification](https://githubcom/pricing/)