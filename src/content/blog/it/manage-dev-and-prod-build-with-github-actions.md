---
slug: manage-dev-and-prod-build-with-github-actions
title: Gestisci lo sviluppo e il build di produzione con GitHub actions
description: >-
  Usa Capgo per rilasciare il tuo devbuild su canali specifici e permettere al
  tuo team di provare la tua app Capacitor Ionic, senza attendere la revisione
  di Apple e Google
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_ci-cd-illustration.webp
head_image_alt: Illustrazione delle build dei canali
keywords: >-
  GitHub Actions, CI/CD, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: CI/CD
published: true
locale: it
next_blog: how-to-send-specific-version-to-users
---
Ecco la traduzione in italiano:

Questo tutorial si concentra sull'hosting GitHub, ma puoi adattarlo con piccole modifiche a qualsiasi altra piattaforma CI/CD.

## Prefazione

Assicurati di aver prima aggiunto la tua app Capacitor a Capgo, questo tutorial si concentra solo sulla fase di caricamento

## Convenzione dei commit

Per prima cosa devi iniziare a seguire la convenzione dei commit [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)\` questo aiuterà gli strumenti a capire come aggiornare il numero di versione, ci vogliono 5 minuti per impararla.

![Conventional commits](/conventional_commits.webp)

## GitHub actions per i tag

Poi devi creare la tua prima GitHub action per costruire e creare automaticamente i tag.

Crea un file in questo percorso: `.github/workflows/bump_version.yml`

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

Questo rilascerà un tag per ogni commit nel tuo ramo principale. E un rilascio `alpha` per `development`, e infine una voce del changelog per ogni commit in `CHANGELOG.md`.

Non preoccuparti se non hai questo file, verrà creato per te.

Per far funzionare questo, devi creare un [PERSONAL ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) nei tuoi [secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets") di GitHub come `PERSONAL_ACCESS_TOKEN`.

Questo è necessario per permettere alla CI di committare il changelog e l'aggiornamento della versione.

Quando crei il token, scegli la scadenza come `never` e lo scope come `repo`.

Imposta la chiave `version` nel tuo file `package.json`. Usa per questo l'ultima versione rilasciata nello store.

Questo è necessario solo la prima volta, poi gli strumenti lo manterranno aggiornato.

Ora puoi committare entrambi i file e vedere apparire il tuo primo tag su GitHub!

`capacitor-standard-version` è il pacchetto che fa la magia, di default, aggiorna anche il numero di versione in Android e iOS

## GitHub actions per il build

Crea un file in questo percorso: `.github/workflows/build.yml`

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

Questo installerà e compilerà le tue dipendenze prima di inviarle a Capgo.

Se il tuo comando per il build è diverso, puoi cambiarlo nello step `build_code`.

Se hai bisogno di una variabile d'ambiente, usa `MY_ENV_VAR` e imposta il `secret` nelle impostazioni del tuo progetto GitHub, poi secret poi GitHub Action.

Per far funzionare il caricamento su Capgo, devi ottenere la tua chiave API per Capgo, aggiungila nei [secret del tuo repository GitHub](https://docs.github.com/en/actions/security-guides/encrypted-secrets/) come `CAPGO_TOKEN`.

Ora puoi committare entrambi i file e vedere la tua prima versione apparire in Capgo!

Aggiungere il commit genererà una nuova build Capacitor per i canali di produzione e sviluppo.

Dovresti aggiungere i tuoi test nella fase di build di Ionic per essere certo che il tuo codice funzioni.

Vai alla tua dashboard Capgo e controlla la tua build appena apparsa, ora hai il tuo sistema CI/CD.
