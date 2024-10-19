---
slug: manage-dev-and-prod-build-with-github-actions
title: Gestire lo sviluppo e la compilazione della produzione con GitHub Actions
description: >-
  Usa Capgo per pubblicare la tua build di sviluppo su un canale specifico e
  consenti al tuo team di testare l'app Capacitor Ionic senza attendere la
  revisione di Apple e Google
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_ci-cd-illustration.webp
head_image_alt: Illustrazione di Compilazione del Canale
tag: CI/CD
published: true
locale: it
next_blog: how-to-send-specific-version-to-users
---

Questo tutorial si concentra sull'hosting di GitHub, ma puoi adattarlo con piccole modifiche a qualsiasi altra piattaforma CI/CD

## Prefazione

Assicurati di aver prima aggiunto la tua app Capacitor a Capgo, questo tutorial si concentra solo sulla fase di caricamento

## Convenzione dei commit

Innanzitutto devi iniziare a seguire la convenzione dei commit [conventional commits](https://wwwconventionalcommitsorg/en/v100/) Questo aiuterà gli strumenti a capire come aggiornare il numero di versione, ci vogliono 5 minuti per impararla

![Conventional commits](/conventional_commitswebp)

## Azioni GitHub per i tag

Poi devi creare la tua prima azione GitHub per costruire automaticamente e creare tag

Crea un file in questo percorso: `github/workflows/bump_versionyml`

con questo contenuto:

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

Questo rilascerà un tag per ogni commit nel tuo ramo principale E un rilascio `alpha` per `development`, e infine una voce di changelog per ogni commit in `CHANGELOGmd`

Non preoccuparti se non hai questo file, verrà creato per te

Per farlo funzionare, devi creare un [PERSONAL ACCESS](https://docsgithubcom/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) _token_ nei tuoi [segreti](https://docsgithubcom/en/actions/security-guides/encrypted-secrets "Segreti GitHub") di GitHub come `PERSONAL_ACCESS_TOKEN`

Questo è necessario per permettere alla CI di effettuare il commit del changelog e dell'aggiornamento della versione

Quando crei il token, scegli la scadenza come `mai` e l'ambito come `repo`

Imposta la chiave `version` nel tuo file `packagejson` Usa per questo l'ultima versione rilasciata nello store

Questo è necessario solo la prima volta, poi gli strumenti lo terranno aggiornato

Ora puoi fare il commit di entrambi i file e vedere apparire il tuo primo tag su GitHub!

`capacitor-standard-version` è il pacchetto che fa la magia, per impostazione predefinita, aggiorna anche il numero di versione in Android e iOS

## Azioni GitHub per la build

Crea un file in questo percorso: `github/workflows/buildyml`

con questo contenuto:

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

Questo installerà e costruirà le tue dipendenze prima di inviarle a Capgo

Se il tuo comando per la build è diverso, puoi cambiarlo nel passaggio `build_code`

Se hai bisogno di una variabile d'ambiente, usa `MY_ENV_VAR` e imposta il `segreto` nelle impostazioni del tuo progetto GitHub, poi segreti poi Azione GitHub

Per far funzionare il caricamento di Capgo, devi ottenere la tua chiave API per Capgo, aggiungila nei [segreti del tuo repository GitHub](https://docsgithubcom/en/actions/security-guides/encrypted-secrets/) come `CAPGO_TOKEN`

Ora puoi fare il commit di entrambi i file e vedere la tua prima versione apparire in Capgo!

Il commit genererà una nuova build Capacitor per i canali di produzione e sviluppo

Dovresti aggiungere i tuoi test nella fase di build Ionic per essere certo che il tuo codice funzioni

Vai alla tua dashboard Capgo e controlla la tua build appena apparsa, ora hai il tuo sistema CI/CD