---
slug: fr__automatic-build-and-release-with-gitlab
title: Compilation et déploiement automatiques avec Gitlab
description: >-
  Créez votre propre pipeline CI/CD gratuitement avec GitLab et déployez votre
  application à chaque push sur la branche principale.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /gitlab_ci.webp
head_image_alt: Illustration de Gitlab CI
tag: CI/CD
published: true
locale: fr
next_blog: ''
---

Ce tutoriel se concentre sur GitLab CI, mais vous pouvez l'adapter avec quelques ajustements à n'importe quelle autre plateforme CI/CD

## Préface

Assurez-vous d'avoir d'abord ajouté votre application à Capgo, ce tutoriel se concentre uniquement sur la phase de téléchargement

## Convention de commit

Tout d'abord, vous devez commencer à suivre la convention de commit [conventional commits](https://wwwconventionalcommitsorg/en/v100/) Cela aidera les outils à comprendre comment mettre à jour le numéro de version, il faut 5 minutes pour l'apprendre

![Conventional commits](/conventional_commitswebp)

## GitLab CI pour les tags

Ensuite, vous devez créer votre premier GitLab pour automatiquement construire et créer des tags

Créez un fichier à ce chemin : `github/workflows/bump_versionyml`

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
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
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

Cela créera un tag pour chaque commit dans votre branche principale et ajoutera une entrée de changelog pour chaque commit dans la branche principale dans `CHANGELOGmd`

Ne vous inquiétez pas si vous n'avez pas ce fichier, il sera créé pour vous

Pour que cela fonctionne, créez un [PERSONAL_ACCESS](https://docsgithubcom/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) dans vos [secrets](https://docsgithubcom/en/actions/security-guides/encrypted-secrets "GitHub secrets") GitHub en tant que `PERSONAL_ACCESS_TOKEN`

Ceci est nécessaire pour permettre au CI de commiter le changelog

Lorsque vous créez le token, choisissez l'expiration comme `never` et la portée comme `repo`

Enfin, pour permettre à l'outil de comprendre où votre version est sauvegardée, vous devez créer le fichier `cztoml` à la racine de votre dépôt

Et ajoutez ceci à l'intérieur :

```toml
[tool.commitizen]
name = "cz_conventional_commits"
tag_format = "$major.$minor.$patch$prerelease"
version = "0.11.5"
version_files = [
    "package.json:version",
    ".cz.toml"
]
```

Définissez la version dans ce fichier comme la même que vous avez dans votre fichier `packagejson`

Ceci n'est nécessaire que la première fois, ensuite les outils le garderont à jour

Vous pouvez maintenant commiter ces deux fichiers et voir votre premier tag apparaître sur GitHub !

## Actions GitHub pour la construction

Créez un fichier à ce chemin : `github/workflows/buildyml`

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
        run: npm run build
        env: # Remove both lines  if you don't need it
          FIREBASE_CONFIG: ${{ secrets.FIREBASE_CONFIG }} # Exemple of env var coming from a secret
      - name: Create Release
        id: create_release
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c production
```

Cela installera et construira vos dépendances avant de les envoyer à Capgo

Si votre commande de construction est différente, vous pouvez la changer dans l'étape `build_code`

Pour que cela fonctionne, vous devez obtenir votre clé API pour Capgo, ajoutez-la dans les [secrets de votre dépôt GitHub](https://docsgithubcom/en/actions/security-guides/encrypted-secrets/) en tant que `CAPGO_TOKEN`

Vous pouvez maintenant commiter ces deux fichiers et voir votre premier tag apparaître sur GitHub !

Ajouter le commit générera une nouvelle construction pour le canal de production

Vous devriez ajouter vos tests dans l'étape de construction pour vous assurer que votre code fonctionne

Allez sur votre tableau de bord Capgo et vérifiez votre construction qui vient d'apparaître, vous avez maintenant votre système CI/CD

Si vous voulez permettre à tous vos utilisateurs d'obtenir la mise à jour dès qu'elle est disponible, allez sur votre canal et définissez-le comme `public`