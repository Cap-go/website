---
slug: automatic-capacitor-android-build-gitlab
title: Construction automatique de Capacitor Android avec GitLab
description: >-
  Comment configurer un pipeline CI/CD pour votre application Android Ionic en
  utilisant fastlane et GitLab en 5 minutes
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-27T00:00:00.000Z
updated_at: 2023-09-27T00:00:00.000Z
head_image: /andriod_app_gitlab.webp
head_image_alt: Illustration Fastlane Google Play GitLab
keywords: >-
  Fastlane, CI/CD, Android, automatic build, automatic release, mobile app
  updates
tag: CI/CD
published: true
locale: fr
next_blog: null
---
# Builds Automatiques Android avec GitLab CI

Configurer CI/CD pour les applications Capacitor peut être complexe et prendre du temps. Voici ce que vous devez savoir :

## Prérequis

Avant de commencer, vous devrez configurer :

- Un compte GitLab avec accès administrateur
- Votre application déjà publiée sur le Google Play Store avec une signature appropriée
- Fichiers de clé de signature Android et de keystore
- Projet Google Cloud Console avec l'API Play Store activée
- Compte de service avec les permissions appropriées
- Compréhension des flux de travail GitLab CI/CD
- Connaissance de la configuration Fastlane
- Temps pour maintenir et déboguer le pipeline

## Configuration CI/CD Professionnelle par Capgo

Évitez la complexité. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) configure votre pipeline CI/CD directement sur votre plateforme préférée :

- **Indépendance de la plateforme** : Fonctionne avec GitHub Actions, GitLab CI, ou d'autres
- **Intégration transparente** : Aucun changement de plateforme nécessaire, fonctionne avec votre processus actuel
- **Configuration sur mesure** : Configuration personnalisée correspondant aux besoins de votre projet
- **Conseils d'experts** : Nous avons déjà configuré CI/CD pour plus de 50 applications

### Tarification
- Frais de configuration unique : 2 600 $
- Vos coûts de fonctionnement : ~300 $/an
- Comparé à d'autres solutions propriétaires : 6 000 $/an
- **Économisez 26 100 $ sur 5 ans**

[Configurer CI/CD Maintenant](https://cal.com/capgo/mobile-ci-cd-done-for-you/)

## Guide de Configuration Manuelle

Si vous souhaitez tout configurer vous-même, voici ce que vous devez faire :

**Étapes à suivre dans le post**

1.  _Copier les fichiers Fastlane_
2.  _Stocker vos secrets dans les secrets cryptés de GitLab_
3.  _Créer et stocker votre clé de compte de service Google Play_
4.  _Stocker votre clé de signature Android_
5.  _Configurer votre fichier de workflow GitLab .yml_

## 1. Copier les fichiers Fastlane

Fastlane est une bibliothèque Ruby créée pour automatiser des tâches courantes de développement mobile. En utilisant Fastlane, vous pouvez configurer des "lanes" personnalisées qui regroupent une série d'"actions" exécutant des tâches que vous réaliseriez normalement avec Android Studio. Vous pouvez faire beaucoup de choses avec Fastlane, mais pour les besoins de ce tutoriel, nous utiliserons seulement quelques actions de base.

Créez un dossier Fastlane à la racine de votre projet et copiez les fichiers suivants :
Fastlane
```ruby
default_platform(:android)

KEYSTORE_KEY_ALIAS = ENV["KEYSTORE_KEY_ALIAS"]
KEYSTORE_KEY_PASSWORD = ENV["KEYSTORE_KEY_PASSWORD"]
KEYSTORE_STORE_PASSWORD = ENV["KEYSTORE_STORE_PASSWORD"]

platform :android do
    desc "Deploy a beta version to the Google Play"
    private_lane :verify_changelog_exists do |version_code: |
      changelog_path = "android/metadata/en-US/changelogs/#{version_code}.txt"
      UI.user_error!("Missing changelog file at #{changelog_path}") unless File.exist?(changelog_path)
      UI.message("Changelog exists for version code #{version_code}")
    end

    private_lane :verify_upload_to_staging do |version_name: |
      UI.message "Skipping staging verification step"
    end
    lane :beta do
				keystore_path = "#{Dir.tmpdir}/build_keystore.keystore"
				File.write(keystore_path, Base64.decode64(ENV['ANDROID_KEYSTORE_FILE']))
				json_key_data = Base64.decode64(ENV['PLAY_CONFIG_JSON'])
				previous_build_number = google_play_track_version_codes(
					package_name: ENV['DEVELOPER_PACKAGE_NAME'],
					track: "internal",
					json_key_data: json_key_data,
				)[0]

				current_build_number = previous_build_number + 1
				sh("export NEW_BUILD_NUMBER=#{current_build_number}")
        gradle(
          task: "clean bundleRelease",
          project_dir: 'android/',
          print_command: false,
          properties: {
            "android.injected.signing.store.file" => "#{keystore_path}",
            "android.injected.signing.store.password" => "#{KEYSTORE_STORE_PASSWORD}",
            "android.injected.signing.key.alias" => "#{KEYSTORE_KEY_ALIAS}",
            "android.injected.signing.key.password" => "#{KEYSTORE_KEY_PASSWORD}",
						'versionCode' => current_build_number
          })
        upload_to_play_store(
					package_name: ENV['DEVELOPER_PACKAGE_NAME'],
					json_key_data: json_key_data,
          track: 'internal',
          release_status: 'completed',
          skip_upload_metadata: true,
          skip_upload_changelogs: true,
          skip_upload_images: true,
          skip_upload_screenshots: true,
        )
    end
    lane :build do
      gradle(
        task: "clean bundleRelease",
        project_dir: 'android/',
        print_command: false,
        properties: {
          "android.injected.signing.store.file" => "#{keystore_path}",
          "android.injected.signing.store.password" => "#{KEYSTORE_STORE_PASSWORD}",
          "android.injected.signing.key.alias" => "#{KEYSTORE_KEY_ALIAS}",
          "android.injected.signing.key.password" => "#{KEYSTORE_KEY_PASSWORD}",
        })
    end
    lane :prod_release do
      build_gradle = File.read("../android/app/build.gradle")

      verify_changelog_exists(version_code: build_gradle.match(/versionCode (\d+)/)[1])
      verify_upload_to_staging(version_name: build_gradle.match(/versionName '([\d\.]+)'/)[1])

      supply(
        track_promote_to: 'beta',
        skip_upload_apk: true,
        skip_upload_aab: true,
        skip_upload_metadata: false,
        skip_upload_changelogs: false,
        skip_upload_images: false,
        skip_upload_screenshots: false
      )
    end
end
```

### Stocker Vos Secrets dans les Variables CI/CD de GitLab

GitLab fournit un moyen de stocker des variables CI/CD cryptées, similaire aux secrets de dépôt de GitHub. Pour stocker vos informations sensibles en toute sécurité.

1. Accédez aux Paramètres de votre projet GitLab.
2. Allez à CI/CD > Variables
3. Ajoutez les variables suivantes :

-   ANDROID_KEYSTORE_FILE : le fichier `.jks` ou `.keystore` encodé en base64 utilisé pour signer vos builds Android. Ce sera soit le fichier keystore associé à votre clé de téléchargement (si vous utilisez la signature d'application Play), soit votre clé de signature d'application.
-   KEYSTORE_KEY_PASSWORD : le mot de passe associé au fichier keystore
-   KEYSTORE_KEY_ALIAS : l'alias du keystore
-   KEYSTORE_STORE_PASSWORD : le mot de passe de la clé privée
-   DEVELOPER_PACKAGE_NAME : l'ID de votre application Android comme com.example.app
-   PLAY_CONFIG_JSON : La clé JSON du compte de service encodée en base64.

### Créer une Clé de Compte de Service Google Play

Pour générer le secret `PLAY_CONFIG_JSON`, suivez ces étapes :

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un existant
3. Activez l'API Google Play Android Developer
4. Créez un compte de service :
   - Allez dans "IAM & Admin" > "Comptes de service"
   - Cliquez sur "Créer un compte de service"
   - Donnez-lui un nom et une description
   - Cliquez sur "Créer et Continuer"
   - Ignorez l'attribution de rôle et cliquez sur "Terminé"
5. Générez une clé JSON :
   - Trouvez votre compte de service dans la liste
   - Cliquez sur le menu à trois points > "Gérer les clés"
   - Cliquez sur "Ajouter une clé" > "Créer une nouvelle clé"
   - Choisissez le format JSON
   - Cliquez sur "Créer"
6. Accordez l'accès au compte de service à votre application dans la Play Console :
   - Allez sur [Play Console](https://play.google.com/console)
   - Naviguez vers "Utilisateurs et autorisations"
   - Cliquez sur "Inviter de nouveaux utilisateurs"
   - Entrez l'email du compte de service (se termine par @*.iam.gserviceaccount.com)
   - Accordez la permission "Publication en production"
   - Cliquez sur "Inviter l'utilisateur"
7. Convertissez la clé JSON en base64 :
   ```bash
   base64 -i path/to/your/service-account-key.json | pbcopy
   ```
8. Ajoutez la chaîne encodée en base64 en tant que variable `PLAY_CONFIG_JSON` dans GitLab

## Configurez Votre Pipeline CI/CD GitLab

Créez un fichier .gitlab-ci.yml à la racine de votre projet pour définir votre pipeline CI/CD. Voici un exemple de la façon dont vous pouvez structurer votre pipeline :

```yaml

image: mingc/android-build-box:latest

stages:
  - build
  - upload_to_capgo
  - build_and_upload_android

build:
  stage: build
  tags:
    - saas-linux-xlarge-amd64
  cache:
    - key:
        files:
          - bun.lockb
      paths:
        - .node_modules/
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - node_modules/
      - dist/
  only:
    - master

upload_to_capgo:
  stage: upload_to_capgo
  tags:
    - saas-linux-xlarge-amd64
  script:
    - npx @capgo/cli@latest bundle upload -a $CAPGO_TOKEN -c dev
  dependencies:
    - build
  when: manual
  only:
    - master

build_and_upload_android:
  tags:
    - saas-linux-xlarge-amd64
  stage:    build_and_upload_android
  cache:
    - key:
        files:
          - android/gradle/wrapper/gradle-wrapper.properties
      paths:
        - ~/.gradle/caches/
  script:
    - npx cap sync android
    - npx cap copy android
    - bundle exec fastlane android beta # We do create a tag for the build to trigger XCode cloud builds
  dependencies:
    - build
  when: manual
  only:
    - master

```

## Déclencher le Pipeline

Chaque fois que vous poussez un nouveau tag dans votre dépôt GitLab, GitLab CI/CD déclenchera automatiquement le pipeline défini, qui construira et déploiera votre application Android en utilisant Fastlane.

Assurez-vous d'ajuster les chemins et les dépendances en fonction de la structure et des exigences de votre projet. Cette configuration vous aidera à automatiser le déploiement de votre application Android sur GitLab CI/CD.

## Conclusion

En configurant GitLab CI/CD avec l'image Docker mingc/android-build-box, vous pouvez automatiser le processus de construction d'applications Android, rendant votre flux de travail de développement plus efficace et fiable. Cette automatisation vous libère du temps pour vous concentrer sur les aspects essentiels du développement d'applications, vous aidant finalement à offrir des applications Android de haute qualité plus efficacement.
