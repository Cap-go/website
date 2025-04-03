---
slug: it__automatic-build-and-release-with-github-actions
title: Costruzione e Distribuzione Automatica di Applicazioni con GitHub Actions
description: >-
  Crea la tua pipeline CI/CD con Github Actions gratuitamente e distribuisci la
  tua applicazione Ionic Capacitor JS ogni volta che effettui un push sul ramo
  main.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-23T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /github_actions.webp
head_image_alt: Illustrazione Azione GitHub
tag: CI/CD
published: true
locale: it
next_blog: automatic-capacitor-ios-build-github-action
---

Questo tutorial si concentra sull'hosting di GitHub, ma puoi adattarlo con piccole modifiche a qualsiasi altra piattaforma CI/CD

## Prefazione

Assicurati di aver prima aggiunto la tua app Capacitor a Capgo, questo tutorial si concentra solo sulla fase di caricamento
Se hai bisogno di aggiungere la tua app a Capgo, puoi seguire questo [Tutorial](/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/)

## Convenzione dei commit

Prima di tutto devi iniziare a seguire la convenzione dei commit [conventional commits](https://wwwconventionalcommitsorg/en/v100/) questo aiuterà gli strumenti a capire come aggiornare il numero di versione, ci vogliono 5 minuti per impararla

![Conventional commits](/conventional_commitswebp)

## Azioni GitHub per i tag

Poi devi creare la tua prima azione GitHub per costruire e creare automaticamente i tag

Crea un file in questo percorso: `github/workflows/bump_versionyml`

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

Questo rilascerà un tag per ogni commit nel tuo ramo principale e aggiungerà una voce di changelog per ogni commit nel ramo principale in `CHANGELOGmd`

Non preoccuparti se non hai questo file, verrà creato per te

Per far funzionare questo, crea un [PERSONAL_ACCESS](https://docsgithubcom/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) nei tuoi [segreti](https://docsgithubcom/en/actions/security-guides/encrypted-secrets "Segreti GitHub") di GitHub come `PERSONAL_ACCESS_TOKEN`

Questo è necessario per permettere alla CI di committare il changelog

Quando crei il token, scegli la scadenza come `mai` e l'ambito come `repo`

Infine, imposta la versione nel tuo file `packagejson`, sincronizzala con il numero di versione nativo che faciliterà il prossimo passo

Questo è necessario solo la prima volta, poi gli strumenti lo terranno aggiornato

Ora puoi committare entrambi questi file e vedere apparire il tuo primo tag su GitHub!

Sia la piattaforma nativa che quella web avranno l'incremento del numero di versione dopo ogni commit

## Azioni GitHub per la build

Crea un file in questo percorso: `github/workflows/buildyml`

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

Questo installerà e costruirà le tue dipendenze prima di inviarle a Capgo

Se il tuo comando per la build è diverso, puoi cambiarlo nel passo `build_code`

Per far funzionare questo, devi ottenere la tua chiave API per Capgo, aggiungila nei [segreti del tuo repository GitHub](https://docsgithubcom/en/actions/security-guides/encrypted-secrets/) come `CAPGO_TOKEN`

Ora puoi committare entrambi questi file e vedere apparire il tuo primo tag su GitHub!

Aggiungere il commit genererà una nuova build per il canale di produzione

Dovresti aggiungere i tuoi test nella fase di build per assicurarti che il tuo codice funzioni

Vai alla tua dashboard Capgo e controlla la tua build che è appena apparsa, ora hai il tuo sistema CI/CD

Se vuoi permettere a tutti i tuoi utenti di ottenere l'aggiornamento quando è disponibile, vai al tuo canale e impostalo come `pubblico`

Puoi anche aggiungere la build nativa della tua app JavaScript Ionic Capacitor seguendo questo tutorial 👇