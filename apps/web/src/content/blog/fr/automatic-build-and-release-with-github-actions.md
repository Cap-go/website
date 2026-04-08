---
slug: automatic-build-and-release-with-github-actions
title: Construire et publier automatiquement une application avec Github actions
description: >-
  Créez votre propre pipeline CI/CD avec Github Actions gratuitement et déployez
  votre application Ionic Capacitor JS à chaque push sur la branche main.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-23T00:00:00.000Z
updated_at: 2026-04-08T14:34:13.000Z
head_image: /github_actions.webp
head_image_alt: Illustration github action
keywords: 'Github actions, CI/CD, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: fr
next_blog: automatic-capacitor-ios-build-github-action
---

Ce tutoriel se concentre sur l'hébergement GitHub, mais vous pouvez l'adapter avec quelques modifications à n'importe quelle autre plateforme CI/CD

## Préface

Assurez-vous d'avoir d'abord ajouté votre application Capacitor à Capgo, ce tutoriel se concentre uniquement sur la phase de téléchargement
Si vous devez ajouter votre application à Capgo, vous pouvez suivre ce [Tutoriel](/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/)

## Convention de commit

Tout d'abord, vous devez commencer à suivre la convention de commit [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) cela aidera les outils à comprendre comment augmenter le numéro de version, c'est 5 minutes à apprendre

![Conventional commits](/conventional_commits.webp)

## Actions GitHub pour les tags

Ensuite, vous devez créer votre première action GitHub pour automatiquement construire et créer des tags

Créez un fichier à ce chemin : `github/workflows/bump_version.yml`

avec ce contenu :

```toml
name: Bump version

on:
  push:
    branches:
      - main

jobs:
  bump-version:
    if: "!startsWith(github.event.head_commit.message, 'chore(release):')"
    runs-on: ubuntu-latest
    name: "Bump version and create changelog with standard version"
    steps:
      - name: Check out
        uses: actions/checkout@v6
        with:
          fetch-depth: 0
          filter: blob:none
          token: '${{ secrets.PERSONAL_ACCESS_TOKEN }}'
      - name: Git config
        run: |
          git config --local user.name "github-actions[bot]"
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
      - name: Create bump and changelog
        run: npx capacitor-standard-version
      - name: Push to origin
        run: |
          CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
          remote_repo="https://${GITHUB_ACTOR}:${{ secrets.PERSONAL_ACCESS_TOKEN }}@github.com/${GITHUB_REPOSITORY}.git"
          git pull $remote_repo $CURRENT_BRANCH
          git push $remote_repo HEAD:$CURRENT_BRANCH --follow-tags --tags
```

Cela créera un tag pour chaque commit dans votre branche principale et ajoutera une entrée de changelog pour chaque commit dans la branche principale dans `CHANGELOG.md`

Ne vous inquiétez pas si vous n'avez pas ce fichier, il sera créé pour vous

Pour que cela fonctionne, créez un [PERSONAL_ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) dans vos [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets") GitHub comme `PERSONAL_ACCESS_TOKEN`

Ceci est nécessaire pour permettre à la CI de commiter le changelog

Lors de la création du token, choisissez l'expiration comme `never` et la portée comme `repo`

Enfin, définissez la version dans votre fichier `package.json`, synchronisez-la avec votre numéro de version Native qui facilitera l'étape suivante

Ceci n'est nécessaire que la première fois, ensuite les outils le maintiendront à jour

Vous pouvez maintenant commiter ces deux fichiers et voir votre premier tag apparaître dans GitHub !

Les plateformes native et web auront le numéro de version incrémenté après chaque commit

## Actions GitHub pour la construction

Créez un fichier à ce chemin : `github/workflows/build.yml`

avec ce contenu :

```yml
name: Build source code and send to Capgo

on:
  push:
    tags:
      - '*'
      
jobs:
  deploy:
    runs-on: ubuntu-latest
    name: "Build code and release"
    steps:
      - name: Check out
        uses: actions/checkout@v6
      - name: Install dependencies
        id: install_code
        run: npm i
      - name: Build
        id: build_code
        run: npm run build
        env: # Remove both lines  if you don't need it
          FIREBASE_CONFIG: ${{ secrets.FIREBASE_CONFIG }} # Exemple of env var coming from a secret
      - name: Create Release
        id: create_release
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c production
```

Cela installera et construira vos dépendances avant de les envoyer à Capgo

Si votre commande de construction est différente, vous pouvez la modifier dans l'étape `build_code`

Pour que cela fonctionne, vous devez obtenir votre clé API pour Capgo, ajoutez-la dans les [secrets de votre dépôt GitHub](https://docs.github.com/en/actions/security-guides/encrypted-secrets/) comme `CAPGO_TOKEN`

Vous pouvez maintenant commiter ces deux fichiers et voir votre premier tag apparaître dans GitHub !

Le commit générera une nouvelle construction pour le canal de production

Vous devriez ajouter vos tests dans l'étape de construction pour vous assurer que votre code fonctionne

Allez sur votre tableau de bord Capgo et vérifiez votre construction qui vient d'apparaître, vous avez maintenant votre système CI/CD

Si vous voulez permettre à tous vos utilisateurs d'obtenir la mise à jour dès qu'elle est disponible, allez dans votre canal et définissez-le comme `public`

Vous pouvez également ajouter la construction native de votre application JavaScript Ionic Capacitor en suivant ce tutoriel 👇
