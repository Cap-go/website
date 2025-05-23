---
slug: automatic-build-and-release-with-gitlab
title: Automatic build e rilascio con Gitlab
description: >-
  Crea la tua pipeline CI/CD con Gitlab gratuitamente, distribuisci la tua app
  ogni volta che fai push su main.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /gitlab_ci.webp
head_image_alt: Illustrazione di Gitlab CI
keywords: 'Gitlab, CI/CD, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: it
next_blog: ''
---
Questo tutorial si concentra su GitLab CI, ma puoi adattarlo con piccole modifiche a qualsiasi altra piattaforma CI/CD.

## Premessa

Assicurati di aver prima aggiunto la tua app a Capgo, questo tutorial si concentra solo sulla fase di caricamento

## Convenzione dei commit

Per prima cosa devi iniziare a seguire la convenzione dei commit [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)\` questo aiuterà gli strumenti a capire come aggiornare il numero di versione, ci vogliono 5 minuti per impararlo.

![Conventional commits](/conventional_commits.webp)

## GitLab CI per i tag

Poi devi creare il tuo primo GitLab per costruire e creare tag automaticamente.

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

Questo rilascerà un tag per ogni commit nel tuo ramo principale. E aggiungerà una voce del changelog per ogni commit nel ramo principale in `CHANGELOG.md`.

Non preoccuparti se non hai questo file, verrà creato per te.

Per far funzionare questo, crea un [PERSONAL_ACCESS](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token/) nei tuoi [secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets "GitHub secrets") di GitHub come `PERSONAL_ACCESS_TOKEN`.

Questo è necessario per permettere alla CI di committare il changelog.

Quando crei il token, scegli la scadenza come `never` e lo scope come `repo`.

Infine, per permettere allo strumento di capire dove è salvata la tua versione, devi creare il file `.cz.toml` nella root del tuo repository.

E aggiungi questo all'interno:

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

Imposta la versione in questo file uguale a quella che hai nel tuo file `package.json`.

Questo è necessario solo la prima volta, poi gli strumenti lo manterranno aggiornato.

Ora puoi committare entrambi i file e vedere apparire il tuo primo tag su GitHub!

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
        run: npm run build
        env: # Remove both lines  if you don't need it
          FIREBASE_CONFIG: ${{ secrets.FIREBASE_CONFIG }} # Exemple of env var coming from a secret
      - name: Create Release
        id: create_release
        run: npx @capgo/cli@latest bundle upload -a ${{ secrets.CAPGO_TOKEN }} -c production
```

Questo installerà e compilerà le tue dipendenze prima di inviarle a Capgo.

Se il tuo comando per il build è diverso, puoi cambiarlo nello step `build_code`.

Per far funzionare questo, devi ottenere la tua API key per Capgo, aggiungila nei [secret del tuo repository GitHub](https://docs.github.com/en/actions/security-guides/encrypted-secrets/) come `CAPGO_TOKEN`.

Ora puoi committare entrambi i file e vedere apparire il tuo primo tag su GitHub!

Il commit genererà un nuovo build per il canale di produzione.

Dovresti aggiungere i tuoi test nella fase di build per assicurarti che il tuo codice funzioni.

Vai alla tua dashboard Capgo e controlla il build che è appena apparso, ora hai il tuo sistema CI/CD.

Se vuoi permettere a tutti i tuoi utenti di ottenere l'aggiornamento quando è disponibile, vai al tuo canale e impostalo come `public`.
