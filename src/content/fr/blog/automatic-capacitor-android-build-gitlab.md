---
slug: automatic-capacitor-android-build-gitlab
title: Construction Android de condensateur automatique avec GitLab
description: >-
  Comment configurer un pipeline CI/CD pour votre application Android Ionic à
  l'aide de Fastlane et GitLab en 5 minutes
author: Anik Dhabal Babu
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-27T00:00:00.000Z
updated_at: 2023-09-27T00:00:00.000Z
head_image: /andriod_app_gitlab.webp
head_image_alt: "Illustration GitLab de Fastlane Google\_Play"
tag: CI/CD
published: true
locale: fr
next_blog: null
---

## Prérequis

Avant de poursuivre le tutoriel…

- Assurez-vous d'utiliser GitLab
- Votre application est déjà déployée sur Google Play Store
- Envie de lire 😆…

**Étapes à suivre dans le post**

1 _Copier les fichiers Fastline_
2 _Stocker vos secrets dans les secrets chiffrés GitLab_
3 _Création et stockage de votre clé de compte de service Google Play_
4 _Stockage de votre clé de signature Android_
5 _Configurez votre fichier yml de workflow GitLab_


## 1\ Copier les fichiers Fastline

Fastlane est une bibliothèque Ruby créée pour automatiser les tâches courantes de développement mobile. En utilisant Fastlane, vous pouvez configurer des « voies » personnalisées qui regroupent une série d'« actions » qui effectuent des tâches que vous effectueriez normalement avec Android Studio. Vous pouvez faire beaucoup de choses avec Fastlane, mais pour les besoins de ce didacticiel, nous n'utiliserons qu'une poignée d'actions principales


Créez un dossier Fastlane à la racine de votre projet et copiez les fichiers suivants :
Voie rapide
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

### Stockage de vos secrets dans les variables GitLab CI/CD

GitLab fournit un moyen de stocker des variables CI/CD chiffrées, similaire aux secrets du référentiel GitHub. Pour stocker vos informations sensibles en toute sécurité

1 Accédez aux paramètres de votre projet GitLab
2 Accédez à CI/CD > Variables
3 Ajoutez les variables suivantes :

- ANDROID_KEYSTORE_FILE : le fichier "jks" ou "keystore" encodé en base64 utilisé pour signer vos versions Android. Il s'agira soit du fichier de clés associé à votre clé d'importation (si vous utilisez la signature d'application Play), soit de votre clé de signature d'application.
- KEYSTORE_KEY_PASSWORD : le mot de passe associé au fichier keystore
- KEYSTORE_KEY_ALIAS : l'alias du magasin de clés
- KEYSTORE_STORE_PASSWORD : le mot de passe de la clé privée
- DEVELOPER_PACKAGE_NAME : votre identifiant d'application Android comme comexampleapp
- PLAY_CONFIG_JSON : la clé JSON du compte de service codée en base64

## Configurez votre pipeline GitLab CI/CD

Créez un fichier gitlab-ciyml à la racine de votre projet pour définir votre pipeline CI/CD. Vous trouverez ci-dessous un exemple de la façon dont vous pouvez structurer votre pipeline :

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
    - npx @capgo/cli@latest upload -a $CAPGO_TOKEN -c dev
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

## Déclenchez le pipeline

Chaque fois que vous transférez une nouvelle balise vers votre référentiel GitLab, GitLab CI/CD déclenchera automatiquement le pipeline défini, qui créera et déploiera votre application Android à l'aide de Fastlane.

Assurez-vous d'ajuster les chemins et les dépendances en fonction de la structure et des exigences de votre projet. Cette configuration vous aidera à automatiser le déploiement de votre application Android sur GitLab CI/CD

## Conclusion

En configurant GitLab CI/CD avec l'image Docker mingc/android-build-box, vous pouvez automatiser le processus de création d'applications Android, rendant ainsi votre flux de travail de développement plus efficace et plus fiable. Cette automatisation vous libère du temps pour vous concentrer sur les aspects essentiels du développement d'applications. , vous aidant ainsi à fournir plus efficacement des applications Android de haute qualité