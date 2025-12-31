---
slug: setup-ci-and-cd-in-gitlab
title: Costruzione e rilascio automatico dell'app con GitLab
description: >-
  Crea la tua pipeline CI/CD con GitLab gratuitamente, distribuisci la tua app
  Ionic Capacitor JS ogni volta che effettui un push su main.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2025-12-31T01:33:21.000Z
head_image: /CI_CD_in_Gitlab.webp
head_image_alt: CI/CD in GitLab
keywords: 'GitLab, CI/CD, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: it
next_blog: ''
---
Questo articolo ti guiderà nella configurazione della pipeline CI/CD con GitLab.

## Premessa

Assicurati di aver prima aggiunto la tua app Capacitor a Capgo, questo tutorial si concentra solo sulla fase di caricamento. Se hai bisogno di aggiungere la tua app a Capgo, puoi seguire questo [Tutorial](https://capgo.app/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/).

## Convenzione dei commit

Prima devi iniziare a seguire la convenzione dei commit [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), questo aiuterà gli strumenti a capire come aggiornare il numero di versione, ci vogliono 5 minuti per impararla.

![Conventional commits](/conventional_commits.webp)

## GitLab CI/CD per Tag

Crea un file .gitlab-ci.yml nella root del tuo repository GitLab con il seguente contenuto

     stages:
          - tag

     bump_version:
       stage: tag
       only:
         - main
      except:
        variables:
      - $CI_COMMIT_MESSAGE =~ /^chore\(release\):/
      script:
       - git config --global user.email "gitlab@yourdomain.com"
       - git config --global user.name "GitLab CI/CD"
       - git checkout $CI_COMMIT_REF_NAME
       - git pull origin $CI_COMMIT_REF_NAME
       - npx capacitor-standard-version
       - git push origin $CI_COMMIT_REF_NAME --tags

Sostituisci "gitlab@yourdomain.com" e "GitLab CI/CD" con la tua email e username GitLab nella sezione script. Questa configurazione attiva il job solo per i push al branch main ed esclude i commit con messaggi che iniziano con "chore(release):".

## GitLab CI/CD per Build

Aggiungi un altro stage al tuo file .gitlab-ci.yml per il build:

        stages:
          - deploy

       deploy:
         stage: deploy
         only:
           - tags  # Questo job verrà eseguito solo per i push dei tag
         script:
           - apt-get update -qy && apt-get install -y nodejs npm
           - npm install -g @capgo/cli
           - npm ci
           - npm run build
           - npx @capgo/cli bundle upload -a $CAPGO_TOKEN -c production
         variables:
           FIREBASE_CONFIG: $FIREBASE_CONFIG  # Definisci questo nelle impostazioni del tuo progetto GitLab
         environment:
           name: production

Assicurati di aver aggiunto la tua chiave API Capgo (CAPGO_TOKEN) come variabile CI/CD nel tuo progetto GitLab. Vai al tuo progetto in GitLab, naviga su Settings > CI/CD > Variables e aggiungi una variabile chiamata CAPGO_TOKEN con il valore della tua chiave API.

Personalizza lo script di build per adattarlo al processo di build specifico del tuo progetto, come cambiare il comando npm run build.

## Conclusione

Ecco qua! Abbiamo fatto un ulteriore passo nel nostro percorso tecnologico. Nello sviluppo software moderno, il CICD è un fattore essenziale da considerare. Spero quindi che questa guida sia comprensibile per tutti.
