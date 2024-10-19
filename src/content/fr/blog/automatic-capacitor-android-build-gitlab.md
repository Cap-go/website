---
slug: automatic-capacitor-android-build-gitlab
title: Compilation automatique de Capacitor Android avec GitLab
description: >-
  Comment configurer un pipeline CI/CD pour votre application Android Ionic avec
  fastlane et GitLab en 5 minutes
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-27T00:00:00.000Z
updated_at: 2023-09-27T00:00:00.000Z
head_image: /andriod_app_gitlab.webp
head_image_alt: Illustration Fastlane Google Play de GitLab
tag: CI/CD
published: true
locale: fr
next_blog: null
---

## Prérequis

Avant de poursuivre le tutoriel...

- Assurez-vous d'utiliser GitLab
- Votre application est déjà déployée sur le Google Play Store
- Envie de lire 😆...

**Étapes à suivre dans cet article**

1 _Copier les fichiers Fastlane_
2 _Stocker vos secrets dans les secrets chiffrés de GitLab_
3 _Créer et stocker votre clé de compte de service Google Play_
4 _Stocker votre clé de signature Android_
5 _Configurer votre fichier yml de workflow GitLab_

## 1\ Copier les fichiers Fastlane

Fastlane est une bibliothèque Ruby créée pour automatiser les tâches courantes de développement mobile. Avec Fastlane, vous pouvez configurer des "lanes" personnalisées qui regroupent une série d'"actions" effectuant des tâches que vous feriez normalement avec Android Studio. Vous pouvez faire beaucoup avec Fastlane, mais pour ce tutoriel, nous n'utiliserons qu'une poignée d'actions de base.

Créez un dossier Fastlane à la racine de votre projet et copiez les fichiers suivants :
Fastlane

### Stocker vos secrets dans les variables CI/CD de GitLab

GitLab offre un moyen de stocker des variables CI/CD chiffrées, similaire aux secrets de dépôt de GitHub. Pour stocker vos informations sensibles de manière sécurisée :

1 Allez dans les Paramètres de votre projet GitLab
2 Naviguez vers CI/CD > Variables
3 Ajoutez les variables suivantes :

- ANDROID_KEYSTORE_FILE : le fichier `jks` ou `keystore` encodé en base64 utilisé pour signer vos builds Android. Ce sera soit le fichier keystore associé à votre clé de téléchargement (si vous utilisez Play App Signing), soit votre clé de signature d'application
- KEYSTORE_KEY_PASSWORD : le mot de passe associé au fichier keystore
- KEYSTORE_KEY_ALIAS : l'alias du keystore
- KEYSTORE_STORE_PASSWORD : le mot de passe de la clé privée
- DEVELOPER_PACKAGE_NAME : l'ID de votre application Android comme com.example.app
- PLAY_CONFIG_JSON : La clé de compte de service JSON encodée en base64

## Configurer votre pipeline CI/CD GitLab

Créez un fichier .gitlab-ci.yml à la racine de votre projet pour définir votre pipeline CI/CD. Voici un exemple de structure pour votre pipeline :

## Déclencher le pipeline

Chaque fois que vous poussez un nouveau tag vers votre dépôt GitLab, GitLab CI/CD déclenchera automatiquement le pipeline défini, qui construira et déploiera votre application Android en utilisant Fastlane.

Assurez-vous d'ajuster les chemins et les dépendances selon la structure et les exigences de votre projet. Cette configuration vous aidera à automatiser le déploiement de votre application Android sur GitLab CI/CD.

## Conclusion

En configurant GitLab CI/CD avec l'image Docker mingc/android-build-box, vous pouvez automatiser le processus de construction de l'application Android, rendant votre flux de développement plus efficace et fiable. Cette automatisation libère votre temps pour vous concentrer sur les aspects essentiels du développement d'applications, vous aidant finalement à livrer des applications Android de haute qualité plus efficacement.