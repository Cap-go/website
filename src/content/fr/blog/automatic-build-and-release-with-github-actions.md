---
slug: automatic-build-and-release-with-github-actions
title: Création et publication automatiques d'une application avec des actions Github
description: >-
  Créez gratuitement votre propre pipeline CI/CD avec les actions Github,
  déployez votre application Ionic Capacitor JS à chaque fois que vous appuyez
  sur main.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-23T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /github_actions.webp
head_image_alt: Illustration de l'action GitHub
tag: CI/CD
published: true
locale: fr
next_blog: automatic-capacitor-ios-build-github-action
---

Ce tutoriel se concentre sur l'hébergement GitHub, mais vous pouvez l'adapter avec peu de modifications à n'importe quelle autre plateforme CI/CD

## Préface 

Assurez-vous d'avoir d'abord ajouté votre application Capacitor à Capgo, ce tutoriel se concentre uniquement sur la phase de téléchargement.
Si vous devez ajouter votre application à Capgo, vous pouvez suivre ce [Tutoriel](/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/)

## Convention de validation

Vous devez d'abord commencer à suivre la convention de validation [commits conventionnels](https://wwwconventionalcommitsorg/en/v100/)\` cela aidera les outils à comprendre comment mettre à niveau le numéro de version, il faut 5 minutes pour l'apprendre

![Commits conventionnels](/conventional_commitswebp)

## Actions GitHub pour la balise

Ensuite, vous devez créer votre première action GitHub pour construire et créer automatiquement une balise

Créez un fichier à ce chemin : `github/workflows/bump_versionyml`

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

Cela libérera une balise pour chaque commit dans votre branche principale et ajoutera une entrée du journal des modifications pour chaque commit dans la branche principale dans `CHANGELOGmd`

Ne vous inquiétez pas si vous n'avez pas ce fichier, il sera créé pour vous

Pour que cela fonctionne, créez un [PERSONAL_ACCESS](https://docsgithubcom/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) _it dans_ votre GitHub [secret ](https://docsgithubcom/en/actions/security-guides/encrypted-secrets "Secrets GitHub") en tant que `PERSONAL_ACCESS_TOKEN`

Ceci est nécessaire pour laisser le CI valider le journal des modifications

Lorsque vous créez le jeton, choisissez l'expiration sur « jamais » et la portée sur « repo »

Enfin, définissez la version dans votre fichier `packagejson`, synchronisez-la avec votre numéro de version native cela facilitera, puis étape suivante

Cela n'est nécessaire que la première fois, puis les outils le maintiendront à jour

Vous pouvez maintenant valider ces deux fichiers et voir votre première balise apparaître dans GitHub !

Les plates-formes native et Web verront le numéro de version augmenter après chaque validation
## Actions GitHub pour la construction

Créez un fichier à ce chemin : `github/workflows/buildyml`

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

Cela installera et créera votre dépendance avant de l'envoyer à Capgo

Si votre commande de build est différente, vous pouvez la modifier à l'étape `build_code`

Pour que cela fonctionne, vous devez obtenir votre clé API pour Capgo, l'ajouter dans le [secret de votre référentiel GitHub](https://docsgithubcom/en/actions/security-guides/encrypted-secrets/) en tant que `CAPGO_TOKEN`

Vous pouvez maintenant valider ces deux fichiers et voir votre première balise apparaître dans GitHub !

Ajouter le commit générera une nouvelle version pour le canal de production

Vous devez ajouter votre test à l'étape de construction pour vous assurer que votre code fonctionne

Allez sur votre tableau de bord Capgo et vérifiez votre build qui vient d'apparaître, vous avez maintenant votre système CI/CD

Si vous souhaitez permettre à tous vos utilisateurs de recevoir la mise à jour dès qu'elle est disponible, accédez à votre chaîne et définissez-la sur « publique ».

Vous pouvez également ajouter la version native de votre application JavaScript Ionic Capacitor en suivant ce tutoriel 👇