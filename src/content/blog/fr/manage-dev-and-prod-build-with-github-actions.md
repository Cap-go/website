---
slug: manage-dev-and-prod-build-with-github-actions
title: Gérez le développement et la construction de production avec GitHub actions
description: >-
  Utilisez Capgo pour publier votre devbuild sur un canal spécifique, et
  permettez à votre équipe de tester votre application Capacitor Ionic, sans
  attendre l'examen d'Apple et Google
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2025-12-31T01:33:21.000Z
head_image: /capgo_ci-cd-illustration.webp
head_image_alt: Illustration des builds de canal
keywords: >-
  GitHub Actions, CI/CD, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: CI/CD
published: true
locale: fr
next_blog: how-to-send-specific-version-to-users
---
Voici la traduction en français :

Ce tutoriel se concentre sur l'hébergement GitHub, mais vous pouvez l'adapter avec quelques modifications à n'importe quelle autre plateforme CI/CD.

## Préface

Assurez-vous d'avoir d'abord ajouté votre application Capacitor à Capgo, ce tutoriel se concentre uniquement sur la phase de téléchargement

## Convention de commit

Tout d'abord, vous devez commencer à suivre la convention de commit [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) qui aidera les outils à comprendre comment mettre à jour le numéro de version, c'est 5 minutes à apprendre.

![Conventional commits](/conventional_commits.webp)

## Actions GitHub pour les tags

Ensuite, vous devez créer votre première action GitHub pour automatiquement compiler et créer des tags.

Créez un fichier à ce chemin : `.github/workflows/bump_version.yml`

avec ce contenu :

```toml
name: Bump version

on:
  push:
    branches:
      - main
      - development

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
        if: github.ref == 'refs/heads/main'
        run: npx capacitor-standard-version
      - name: Create bump and changelog
        if: github.ref != 'refs/heads/main'
        run: npx capacitor-standard-version --prerelease alpha
      - name: Push to origin
        run: |
          CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
          remote_repo="https://${GITHUB_ACTOR}:${{ secrets.PERSONAL_ACCESS_TOKEN }}@github.com/${GITHUB_REPOSITORY}.git"
          git pull $remote_repo $CURRENT_BRANCH
          git push $remote_repo HEAD:$CURRENT_BRANCH --follow-tags --tags

```

Cela créera un tag pour chaque commit dans votre branche principale. Et une version `alpha` pour `development`, et enfin une entrée de changelog pour chaque commit dans `CHANGELOG.md`.

Ne vous inquiétez pas si vous n'avez pas ce fichier, il sera créé pour vous.

Pour que cela fonctionne, vous devez créer un [PERSONAL ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) dans vos [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets") GitHub comme `PERSONAL_ACCESS_TOKEN`.

Ceci est nécessaire pour permettre à la CI de commiter le changelog et la mise à jour de version.

Lors de la création du token, choisissez l'expiration comme `never` et la portée comme `repo`.

Définissez la clé `version` dans votre fichier `package.json`. Utilisez pour cela la dernière version publiée dans le store.

C'est uniquement nécessaire la première fois, ensuite les outils le maintiendront à jour.

Vous pouvez maintenant commiter ces deux fichiers et voir votre premier tag apparaître dans GitHub !

`capacitor-standard-version` est le package qui fait la magie, par défaut, il met également à jour votre numéro de version dans Android et iOS

## Actions GitHub pour la compilation

Créez un fichier à ce chemin : `.github/workflows/build.yml`

avec ce contenu :

```toml
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
        run: npm build
        env:
          MY_ENV_VAR: ${{ secrets.MY_ENV_VAR }}
      - name: Create Release Alpha
        if: "contains(github.ref, '-alpha.')"
        id: create_release_prepro
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c development
      - name: Create Release Production
        if: "!contains(github.ref, '-alpha.')"
        id: create_release_prod
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c production
```

Cela installera et compilera vos dépendances avant de les envoyer à Capgo.

Si votre commande de compilation est différente, vous pouvez la modifier dans l'étape `build_code`.

Si vous avez besoin d'une variable d'environnement, utilisez `MY_ENV_VAR` et définissez le `secret` dans les paramètres de votre projet GitHub, puis secret puis GitHub Action.

Pour que le téléchargement Capgo fonctionne, vous devez obtenir votre clé API pour Capgo, ajoutez-la dans les [secrets de votre dépôt GitHub](https://docs.github.com/en/actions/security-guides/encrypted-secrets/) comme `CAPGO_TOKEN`.

Vous pouvez maintenant commiter ces deux fichiers et voir votre première version apparaître dans Capgo !

Ajouter le commit générera une nouvelle compilation Capacitor pour les canaux de production et de développement.

Vous devriez ajouter vos tests dans l'étape de compilation Ionic pour être certain que votre code fonctionne.

Allez sur votre tableau de bord Capgo et vérifiez votre compilation qui vient d'apparaître, vous avez maintenant votre système CI/CD.
