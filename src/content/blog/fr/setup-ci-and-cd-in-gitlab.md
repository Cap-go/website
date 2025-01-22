---
slug: fr__setup-ci-and-cd-gitlab
title: Construction et déploiement automatiques de l'application avec GitLab
description: >-
  Créez votre propre pipeline CI/CD avec GitLab gratuitement et déployez votre
  application Ionic Capacitor JS à chaque push sur la branche principale.
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-14T00:00:00.000Z
updated_at: 2023-09-14T00:00:00.000Z
head_image: /CI_CD_in_Gitlab.webp
head_image_alt: CI/CD dans GitLab
tag: CI/CD
published: true
locale: fr
next_blog: ''
---

Cet article vous guidera sur la configuration d'un pipeline CI/CD avec GitLab

## Préface

Assurez-vous d'avoir d'abord ajouté votre application Capacitor à Capgo, ce tutoriel se concentre uniquement sur la phase de téléchargement. Si vous devez ajouter votre application à Capgo, vous pouvez suivre ce [Tutoriel](https://capgoapp/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/)

## Convention de commit

Tout d'abord, vous devez commencer à suivre la convention de commit [conventional commits](https://wwwconventionalcommitsorg/en/v100/). Cela aidera les outils à comprendre comment mettre à jour le numéro de version, c'est 5 minutes à apprendre.

![Conventional commits](/conventional_commitswebp)

## GitLab CI/CD pour le Tag

Créez un fichier gitlab-ci.yml à la racine de votre dépôt GitLab avec le contenu suivant :

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
       - git config --global user.email "gitlab@votredomaine.com"
       - git config --global user.name "GitLab CI/CD"
       - git checkout $CI_COMMIT_REF_NAME
       - git pull origin $CI_COMMIT_REF_NAME
       - npx capacitor-standard-version
       - git push origin $CI_COMMIT_REF_NAME --tags

Remplacez "gitlab@votredomaine.com" et "GitLab CI/CD" par votre email et nom d'utilisateur GitLab dans la section script. Cette configuration déclenche le job uniquement lors des push sur la branche principale et exclut les commits dont les messages commencent par "chore(release):".

## GitLab CI/CD pour la Build

Ajoutez une autre étape à votre fichier gitlab-ci.yml pour la build :

        stages:
          - deploy

       deploy:
         stage: deploy
         only:
           - tags  # Ce job ne s'exécutera que pour les push de tags
         script:
           - apt-get update -qy && apt-get install -y nodejs npm
           - npm install -g @capgo/cli
           - npm ci
           - npm run build
           - npx @capgo/cli bundle upload -a $CAPGO_TOKEN -c production
         variables:
           FIREBASE_CONFIG: $FIREBASE_CONFIG  # Définissez ceci dans les paramètres de votre projet GitLab
         environment:
           name: production

Assurez-vous d'avoir ajouté votre clé API Capgo (CAPGO_TOKEN) comme variable CI/CD dans votre projet GitLab. Allez dans votre projet sur GitLab, naviguez vers Paramètres > CI/CD > Variables, et ajoutez une variable nommée CAPGO_TOKEN avec la valeur de votre clé API.

Personnalisez le script de build pour correspondre au processus de build spécifique de votre projet, comme changer la commande npm run build.

## Conclusion

Voilà ! Nous avons franchi une étape supplémentaire dans notre parcours technologique. Dans le développement logiciel moderne, la CI/CD est un facteur essentiel à prendre en compte. J'espère donc que ce guide est compréhensible pour tout le monde.