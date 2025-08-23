---
slug: automatic-build-and-release-with-github-actions
title: Automatische Erstellung und Bereitstellung von Apps mit Github-Aktionen
description: >-
  Crea tu propia pipeline de CI/CD con acciones de Github de forma gratuita,
  despliega tu aplicación Ionic Capacitor JS cada vez que hagas push a main.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-23T00:00:00.000Z
updated_at: 2025-09-23T00:00:00.000Z
head_image: /github_actions.webp
head_image_alt: Illustration d'action Github
keywords: 'Github actions, CI/CD, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: it
next_blog: automatic-capacitor-ios-build-github-action
---
Questo tutorial si concentra sull'hosting di GitHub, ma puoi adattarlo con piccole modifiche a qualsiasi altra piattaforma CI/CD.

## Prefazione

Assicurati di aver prima aggiunto la tua app Capacitor a Capgo, questo tutorial si concentra solo sulla fase di caricamento. Se hai bisogno di aggiungere la tua app a Capgo, puoi seguire questo [Tutorial](/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/)

## Convenzione di commit

Prima di tutto, devi iniziare a seguire la convenzione di commit [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) questo aiuterà gli strumenti a capire come aggiornare il numero di versione, ci vogliono 5 minuti per impararlo.

![Conventional commits](/conventional_commits.webp)

## Azioni GitHub per il tag

Poi devi creare la tua prima azione GitHub per costruire e creare automaticamente un tag.

Crea un file in questo percorso: `.github/workflows/bump_version.yml`

con questo contenuto:

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
        uses: actions/checkout@v5
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

Questo rilascerà un tag per ogni commit nel tuo ramo principale. E aggiungerà un'entrata nel changelog per ogni commit nel ramo principale in `CHANGELOG.md`.

Non preoccuparti se non hai questo file, verrà creato per te.

Per farlo funzionare, crea un [PERSONAL_ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) _in_ GitHub [segreto](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets") come `PERSONAL_ACCESS_TOKEN`.

Questo è necessario per consentire al CI di fare il commit del changelog.

Quando crei il token, scegli l'espirazione come `mai` e l'ambito come `repo`.

Infine, imposta la versione nel tuo file `package.json`, sincronizzala con il tuo numero di versione nativo per facilitare, poi il passo successivo.

Questo è necessario solo la prima volta, poi gli strumenti lo manterranno aggiornato.

Puoi ora fare il commit di entrambi i file e vedere il tuo primo tag apparire in GitHub!

Sia la piattaforma nativa che quella web avranno il numero di versione incrementato dopo ogni commit.
## Azioni GitHub per la build

Crea un file in questo percorso: `.github/workflows/build.yml`

con questo contenuto:

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
        uses: actions/checkout@v5
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

Questo installerà e costruirà le tue dipendenze prima di inviarle a Capgo.

Se il tuo comando per la build è diverso, puoi cambiarlo nel passaggio `build_code`.

Per farlo funzionare, devi ottenere la tua chiave API per Capgo, aggiungila nel [segreto del tuo repository GitHub](https://docs.github.com/en/actions/security-guides/encrypted-secrets/) come `CAPGO_TOKEN`.

Puoi ora fare il commit di entrambi i file e vedere il tuo primo tag apparire in GitHub!

Aggiungere il commit genererà una nuova build per il canale di produzione.

Dovresti aggiungere i tuoi test nel passaggio di build per garantire che il tuo codice funzioni.

Vai alla tua dashboard di Capgo e controlla la tua build che è appena apparsa, ora hai il tuo sistema CI/CD.

Se desideri permettere a tutti i tuoi utenti di ricevere l'aggiornamento ogni volta che è disponibile, vai al tuo canale e impostalo su `pubblico`.

Puoi anche aggiungere la build nativa della tua app JavaScript Ionic Capacitor seguendo questo tutorial 👇
