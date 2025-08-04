---
slug: automatic-capacitor-android-build-github-action
title: Construction automatique d'Android avec Capacitor via GitHub Actions
description: >-
  Comment mettre en place un pipeline CI/CD pour votre application Android
  Capacitor en utilisant fastlane et GitHub Actions en 5 minutes
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-27T00:00:00.000Z
updated_at: 2024-06-01T00:00:00.000Z
head_image: /fastlane_android.webp
head_image_alt: Illustration de l'action GitHub Fastlane Google Play
keywords: >-
  Fastlane, CI/CD, Android, automatic build, automatic release, mobile app
  updates, Capacitor
tag: CI/CD
published: true
locale: fr
next_blog: automatic-capacitor-ios-build-github-action
---
# Builds Android automatiques avec GitHub Actions

La configuration de CI/CD pour les applications Capacitor peut être complexe et chronophage. Voici ce que vous devez savoir :

## Prérequis

Avant de commencer, vous aurez besoin de :

- Un compte GitHub avec accès administrateur
- Votre application déjà publiée sur Google Play Store avec la signature appropriée
- Clé de signature Android et fichiers keystore
- Projet Google Cloud Console avec l'API Play Store activée
- Compte de service avec les permissions appropriées
- Compréhension des workflows GitHub Actions
- Connaissance de la configuration Fastlane
- Du temps pour maintenir et déboguer le pipeline

## Configuration CI/CD professionnelle par Capgo

Évitez la complexité. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) configure votre pipeline CI/CD directement sur votre plateforme préférée :

- **Indépendance de plateforme** : Fonctionne avec GitHub Actions, GitLab CI ou autres
- **Intégration transparente** : Pas besoin de changer de plateforme, fonctionne avec votre processus actuel
- **Configuration sur mesure** : Configuration personnalisée selon les besoins de votre projet
- **Expertise** : Nous avons déjà configuré le CI/CD pour plus de 50 applications

### Tarification
- Frais de configuration unique : 2 600 €
- Vos coûts de fonctionnement : ~300 €/an
- Comparé aux autres solutions propriétaires : 6 000 €/an
- **Économisez 26 100 € sur 5 ans**

[Configurer CI/CD maintenant](https://cal.com/team/capgo/mobile-ci-cd-done-for-you/)

## Guide de configuration manuelle

Si vous souhaitez tout configurer vous-même, voici ce que vous devez faire :

## Tarification GitHub Actions

![Prix GitHub Action](/price_github_actions.webp)

GitHub Actions offre des minutes gratuites selon le type de dépôt :
- Dépôts publics : 2 000 minutes/mois
- Dépôts privés : 2 000 minutes/mois (runners Linux)

Pour les projets privés, les coûts sont d'environ 0,008 €/minute. Une build typique prend 3-5 minutes.

## Étapes de configuration manuelle

1. Configurer Fastlane
2. Configurer les secrets GitHub
3. Créer le workflow GitHub Actions

## 1. Configurer Fastlane

Créez un dossier `fastlane` à la racine de votre projet et ajoutez un `Fastfile` avec ce contenu :

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
        
        # Get previous build number and increment
        previous_build_number = google_play_track_version_codes(
            package_name: ENV['DEVELOPER_PACKAGE_NAME'],
            track: "internal",
            json_key_data: json_key_data,
        )[0]
        current_build_number = previous_build_number + 1
        sh("export NEW_BUILD_NUMBER=#{current_build_number}")
        
        # Build the app
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
        
        # Upload to Play Store
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
end
```

## 2. Configurer les secrets GitHub

Vous devez stocker les informations sensibles de manière sécurisée dans GitHub. Allez dans votre dépôt → Settings → Secrets and variables → Actions → New repository secret.

### Secrets requis :

1. **Clé de compte de service Google Play**
   - Créez un compte de service dans Google Cloud Console
   - Activez l'API Google Play Developer
   - Accordez l'accès au compte de service dans Play Console
   - Téléchargez le fichier clé JSON
   - Convertissez en base64 : `base64 service_account_key.json | pbcopy`
   - Ajoutez comme `PLAY_CONFIG_JSON`

2. **Clé de signature Android**
   - Convertissez votre keystore en base64 : `base64 your_keystore.jks | pbcopy`
   - Ajoutez comme `ANDROID_KEYSTORE_FILE`
   - Ajoutez les détails du keystore :
     - `KEYSTORE_KEY_ALIAS`
     - `KEYSTORE_KEY_PASSWORD`
     - `KEYSTORE_STORE_PASSWORD`
     - `DEVELOPER_PACKAGE_NAME` (ex : com.example.app)

## 3. Créer le workflow GitHub Actions

Créez `.github/workflows/build-upload-android.yml` :

```yaml
name: Build and Deploy Android App

on:
  push:
    tags:
      - '*'

jobs:
  build_android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: npm
          
      - name: Install dependencies
        run: npm ci
        
      - name: Cache Gradle
        uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
          restore-keys: |
            ${{ runner.os }}-gradle-
            
      - name: Build app
        run: npm run build
        
      - name: Sync Capacitor
        run: npx cap sync
        
      - name: Setup Java
        uses: actions/setup-java@v4
        with:
            distribution: 'zulu'
            java-version: '17'
            
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
          
      - name: Run Fastlane
        uses: maierj/fastlane-action@v3.1.0
        env:
          PLAY_CONFIG_JSON: ${{ secrets.PLAY_CONFIG_JSON }}
          ANDROID_KEYSTORE_FILE: ${{ secrets.ANDROID_KEYSTORE_FILE }}
          DEVELOPER_PACKAGE_NAME: ${{ secrets.DEVELOPER_PACKAGE_NAME }}
          KEYSTORE_KEY_ALIAS: ${{ secrets.KEYSTORE_KEY_ALIAS }}
          KEYSTORE_KEY_PASSWORD: ${{ secrets.KEYSTORE_KEY_PASSWORD }}
          KEYSTORE_STORE_PASSWORD: ${{ secrets.KEYSTORE_STORE_PASSWORD }}
        with:
          lane: android beta
          
      - name: Upload artifact
        uses: actions/upload-artifact@v2
        with:
          name: android-release
          path: ./android/app/build/outputs/bundle/release/app-release.aab
          retention-days: 10
```

## Comment ça fonctionne

1. Créez un tag Git pour déclencher le workflow
2. GitHub Actions compile votre application
3. Fastlane la téléverse vers le canal bêta de Google Play
4. Votre application est automatiquement mise à jour

## Temps de build et coûts

- Temps de build : 3-5 minutes
- Coût pour les dépôts privés : ~0,04 € par build
- Gratuit pour les projets open-source

## Ressources

- [Documentation GitHub Actions](https://docs.github.com/en/actions/)
- [Documentation Fastlane](https://docs.fastlane.tools/)
