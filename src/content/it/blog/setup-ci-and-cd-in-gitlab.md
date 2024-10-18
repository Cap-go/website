---
slug: setup-ci-and-cd-gitlab
title: Costruzione e Implementazione Automatica delle Applicazioni con GitLab
description: >-
  Crea la tua pipeline CI/CD con GitLab gratuitamente e distribuisci la tua
  applicazione Ionic Capacitor JS ogni volta che fai un push al ramo principale.
author: Anik Dhabal Babu
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /CI_CD_in_Gitlab.webp
head_image_alt: CI/CD di GitLab
tag: CI/CD
published: true
locale: it
next_blog: ''
---

Questo articolo ti guiderà su come configurare una pipeline CI/CD con GitLab

## Prefazione

Assicurati di aver prima aggiunto la tua app Capacitor a Capgo, questo tutorial si concentra solo sulla fase di caricamento. Se hai bisogno di aggiungere la tua app a Capgo, puoi seguire questo [Tutorial](https://capgoapp/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/)

## Convenzione dei commit

Per prima cosa devi iniziare a seguire la convenzione dei commit [conventional commits](https://wwwconventionalcommitsorg/en/v100/)\` questo aiuterà gli strumenti a capire come aggiornare il numero di versione, ci vogliono 5 minuti per impararla

![Conventional commits](/conventional_commitswebp)

## GitLab CI/CD per Tag

Crea un file gitlab-ciyml nella root del tuo repository GitLab con il seguente contenuto

      
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
       - git config --global useremail "gitlab@tuodominioit"
       - git config --global username "GitLab CI/CD"
       - git checkout $CI_COMMIT_REF_NAME
       - git pull origin $CI_COMMIT_REF_NAME
       - npx capacitor-standard-version
       - git push origin $CI_COMMIT_REF_NAME --tags

Sostituisci "gitlab@tuodominioit" e "GitLab CI/CD" con la tua email e username GitLab nella sezione script. Questa configurazione attiva il job solo sui push al ramo main ed esclude i commit con messaggi che iniziano con "chore(release):".

## GitLab CI/CD per Build

Aggiungi un altro stage al tuo file gitlab-ciyml per il build:

        stages:
          - deploy

       deploy:
         stage: deploy
         only:
           - tags  # Questo job verrà eseguito solo per i push di tag
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

Assicurati di aver aggiunto la tua chiave API Capgo (CAPGO_TOKEN) come variabile CI/CD nel tuo progetto GitLab. Vai al tuo progetto in GitLab, naviga su Impostazioni > CI/CD > Variabili, e aggiungi una variabile chiamata CAPGO_TOKEN con il valore della tua chiave API.

Personalizza lo script di build per corrispondere al processo di build specifico del tuo progetto, come cambiare il comando npm run build.

## Conclusione

Ecco qua! Abbiamo fatto un ulteriore passo nel nostro percorso tecnologico. Nello sviluppo software moderno, il CI/CD è un fattore essenziale da considerare. Quindi spero che questa guida abbia senso per tutti.