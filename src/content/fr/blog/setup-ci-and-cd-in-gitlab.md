---
slug: setup-ci-and-cd-gitlab
title: Création et publication automatiques d'une application avec GitLab
description: >-
  Créez gratuitement votre propre pipeline CI/CD avec GitLab, déployez votre
  application Ionic Capacitor JS à chaque fois que vous appuyez sur main.
author: Anik Dhabal Babu
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

Cet article vous expliquera comment configurer le pipeline CI/CD avec GitLab.

## Préface

Assurez-vous d'avoir d'abord ajouté votre application Capacitor à Capgo, ce tutoriel se concentre uniquement sur la phase de téléchargement. Si vous devez ajouter votre application à Capgo, vous pouvez suivre ce [Tutoriel](https://capgoapp/blog/update-your- condensateur-apps-utilisation-transparente-de-capacitor-updater/)

## Convention de validation

Vous devez d'abord commencer à suivre la convention de validation [commits conventionnels](https://wwwconventionalcommitsorg/en/v100/)\` cela aidera les outils à comprendre comment mettre à niveau le numéro de version, il faut 5 minutes pour l'apprendre

![Commits conventionnels](/conventional_commitswebp)

## GitLab CI/CD pour la balise

Créez un fichier gitlab-ciyml à la racine de votre référentiel GitLab avec le contenu suivant

      
     étapes:
          - étiqueter

     version_bump :
       étape : balise
       seulement:
         - principal
      sauf:
        variables :
      - $CI_COMMIT_MESSAGE =~ /^chore\(release\):/
      scénario:
       - git config --global useremail "gitlab@votredomainecom"
       - git config --nom d'utilisateur global "GitLab CI/CD"
       - git checkout $CI_COMMIT_REF_NAME
       - git pull origine $CI_COMMIT_REF_NAME
       - version standard du condensateur npx
       - git push origine $CI_COMMIT_REF_NAME --tags

Remplacez "gitlab@yourdomaincom" et "GitLab CI/CD" par votre adresse e-mail GitLab et votre nom d'utilisateur dans la section script. Cette configuration déclenche le travail uniquement lors des push vers la branche principale et exclut les commits avec des messages commençant par "chore(release):"

## GitLab CI/CD pour la construction

Ajoutez une autre étape à votre fichier gitlab-ciyml pour la build :

        étapes:
          - déployer

       déployer:
         étape : déployer
         seulement:
           - tags # Ce travail ne s'exécutera que pour les poussées de tags
         scénario:
           - apt-get update -qy && apt-get install -y nodejs npm
           - npm install -g @capgo/cli
           - npm ci
           - npm exécuter la construction
           - npx @capgo/cli bundle upload -a $CAPGO_TOKEN -c production
         variables :
           FIREBASE_CONFIG : $FIREBASE_CONFIG # Définissez ceci dans les paramètres de votre projet GitLab
         environnement:
           nom : production

Assurez-vous que votre clé API Capgo (CAPGO_TOKEN) est ajoutée en tant que variable CI/CD dans votre projet GitLab. Accédez à votre projet dans GitLab, accédez à Paramètres > CI/CD > Variables et ajoutez une variable nommée CAPGO_TOKEN avec la valeur de votre clé API.

Personnalisez le script de build pour qu'il corresponde au processus de build spécifique de votre projet, par exemple en modifiant la commande npm run build

## Conclusion

Nous y sommes ! Nous avons franchi une étape supplémentaire dans notre parcours technologique. Dans le développement de logiciels modernes, le CICD est un facteur essentiel à prendre en compte. J'espère donc que cette directive aura du sens pour tout le monde.