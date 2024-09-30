---
slug: manage-dev-and-prod-build-with-github-actions
title: Gestion du développement et de la production avec les actions de GitHub.
description: >-
  Utilisez Capgo pour lancer votre développement de développement sur un canal
  spécifique et permettre à votre équipement de tester votre application
  Capacitor Ionic, sans attendre la révision d'Apple et de Google.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_ci-cd-illustration.webp
head_image_alt: Channel builds illustration
tag: CI/CD
published: true
next_blog: how-to-send-specific-version-to-users
locale: fr
---

Ce tutoriel se concentre sur l'hébergement GitHub, mais vous pouvez l'adapter avec un petit ajustement à n'importe quelle autre plateforme CI/CD

## Préface 

Assurez-vous d'avoir d'abord ajouté votre application Capacitor à Capgo, ce tutoriel se concentre uniquement sur la phase de téléchargement.

## Convention de validation

Vous devez d'abord commencer à suivre la convention de validation [commits conventionnels](https://wwwconventionalcommitsorg/en/v100/)\` cela aidera les outils à comprendre comment mettre à niveau le numéro de version, il faut 5 minutes pour l'apprendre

![Commits conventionnels](/conventional_commitswebp)

## Actions GitHub pour la balise

Ensuite, vous devez créer votre première action GitHub pour créer et créer automatiquement des balises

Créez un fichier à ce chemin : `github/workflows/bump_versionyml`

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
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
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

Cela publiera une balise pour chaque commit dans votre branche principale et une version « alpha » pour « development », et enfin une entrée du journal des modifications pour chaque commit dans « CHANGELOGmd ».

Ne vous inquiétez pas si vous n'avez pas ce fichier, il sera créé pour vous

Pour que cela fonctionne, vous devez créer un [ACCÈS PERSONNEL](https://docsgithubcom/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) _it in_ votre GitHub [secret](https://docsgithubcom/en/actions/security-guides/encrypted-secrets "GitHub secrets") en tant que `PERSONAL_ACCESS_TOKEN`

Ceci est nécessaire pour permettre au CI de valider le journal des modifications et le changement de version.

Lorsque vous créez le jeton, choisissez l'expiration sur « jamais » et la portée sur « repo »


Définissez la clé `version` dans votre fichier `packagejson`. Utilisez pour cela la dernière version publiée dans le store

Cela n'est nécessaire que la première fois, puis les outils le maintiendront à jour

Vous pouvez maintenant valider ces deux fichiers et voir votre première balise apparaître dans GitHub !

`capacitor-standard-version` est le package qui fait la magie, par défaut, il met également à jour votre numéro de version sous Android et IOS


## Actions GitHub pour la construction

Créez un fichier à ce chemin : `github/workflows/buildyml`

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
        uses: actions/checkout@v4
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

Cela installera et créera votre dépendance avant de l'envoyer à Capgo

Si votre commande de build est différente, vous pouvez la modifier à l'étape `build_code`

Si vous avez besoin d'une variable d'environnement, utilisez `MY_ENV_VAR` et définissez le `secret` dans les paramètres de votre projet GitHub, puis secret puis GitHub Action

Pour que le téléchargement Capgo fonctionne, vous devez obtenir votre clé API pour Capgo, l'ajouter dans le [secret de votre référentiel GitHub](https://docsgithubcom/en/actions/security-guides/encrypted-secrets/) en tant que `CAPGO_TOKEN `

Vous pouvez maintenant valider ces deux fichiers et voir votre première version apparaître dans Capgo !

Ajouter le commit générera une nouvelle version de condensateur pour le canal de production et de développement

Vous devez ajouter votre test à l'étape de construction Ionic pour être certain que votre code fonctionne

Allez sur votre tableau de bord Capgo et vérifiez votre build qui vient d'apparaître, vous avez maintenant votre système CI/CD