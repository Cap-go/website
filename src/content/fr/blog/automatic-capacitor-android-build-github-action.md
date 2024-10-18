---
slug: automatic-capacitor-android-build-github-action
title: Compilation automatique de Capacitor Android avec GitHub Actions
description: >-
  Comment configurer un pipeline CI/CD pour votre application Android Ionic avec
  fastlane et GitHub Actions en 5 minutes (2022)
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-27T00:00:00.000Z
updated_at: 2022-10-27T00:00:00.000Z
head_image: /fastlane_android.webp
head_image_alt: Illustration de l'Action GitHub de Fastlane Google Play
tag: CI/CD
published: true
locale: fr
next_blog: automatic-capacitor-ios-build-github-action
---

## Livraison continue pour Android en utilisant Fastlane et GitHub Actions

## Prérequis

Avant de poursuivre le tutoriel…

- Assurez-vous d'utiliser GitHub
- Votre application est déjà déployée sur le Google Play Store
- Envie de lire 😆…

## Important concernant le prix

![Prix GitHub Action](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

Le service est « gratuit » jusqu'à la limite, selon la machine choisie
Nous allons utiliser une machine **_Linux_**, vous pouvez voir sur la capture d'écran son prix et ses limites (prix à la date de création du tutoriel, ils pourraient subir des changements à l'avenir)

🔴 **_Une fois avertis des exigences et des prix, si vous le souhaitez, nous continuons_**

> **_📣_ Dans cet article, nous supposons que nous avons l'application créée sur Google Play, nous avons la clé de signature de l'écosystème Google**

## Passons aux choses sérieuses 🧑🏽💻

**Étapes à suivre dans l'article**

1. _Copier les fichiers Fastlane_
2. _Stocker vos secrets dans les secrets cryptés de GitHub_
3. _Créer et stocker votre clé de compte de service Google Play_
4. _Stocker votre clé de signature Android_
5. _Configurer votre fichier de workflow GitHub Actions yml_

## 1. Copier les fichiers Fastlane

Fastlane est une bibliothèque Ruby créée pour automatiser les tâches courantes de développement mobile. En utilisant Fastlane, vous pouvez configurer des « lanes » personnalisées qui regroupent une série d'« actions » effectuant des tâches que vous effectueriez normalement à l'aide d'Android Studio. Vous pouvez faire beaucoup avec Fastlane, mais pour les besoins de ce tutoriel, nous n'utiliserons qu'une poignée d'actions de base.

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

## Stocker vos secrets dans les secrets cryptés de GitHub

Pour s'authentifier auprès de l'API Google Play Developer, nous aurons besoin d'une clé de compte de service. Le fichier de clé de compte de service est considéré comme sensible, ce qui signifie que nous devrons le stocker en toute sécurité, mais dans un endroit où il peut être accessible par nos workflows GitHub Actions et notre Fastfile lorsque nécessaire. Entrez les secrets cryptés de GitHub : nous stockerons toutes nos clés sensibles dans les secrets du dépôt, les conservant en sécurité tout en les rendant automatiquement accessibles aux workflows GitHub Actions dans le dépôt.

### Créer et stocker votre clé de compte de service Google Play

Si vous devez créer une nouvelle clé de compte de service, [suivez les étapes décrites ici](https://docsrunwayteam/integrations/app-stores/google-play-console/#service-account-api-key-setup). Une fois que vous avez votre fichier JSON de clé de compte de service, ajoutons-le aux secrets cryptés de votre dépôt GitHub.

Pour ajouter un nouveau secret aux secrets cryptés de GitHub, naviguez d'abord vers le dépôt Android auquel vous ajouterez le workflow GitHub Actions. Sur la droite, cliquez sur "Settings".

![Paramètres dans le dépôt GitHub](/github_project_settingswebp)

Ensuite, cliquez sur "Secrets",

![Secrets dans le dépôt GitHub, depuis les Paramètres](/github_project_settings_secretswebp)

puis "Actions" dans la liste du menu de gauche.

![Actions sous Secrets dans le dépôt GitHub](/github_project_settings_secrets_actionswebp)

Ce sont les variables d'environnement secrètes cryptées pour le dépôt. Tous les workflows configurés sur le dépôt auront accès à ces secrets du dépôt.

À partir de là, cliquez sur "New repository secret" pour ajouter un nouveau secret :

![Action Nouveau secret de dépôt dans GitHub](/github_project_settings_secrets_actions_newwebp)

Lorsque vous cliquez sur "New repository secret", vous verrez un formulaire qui vous demandera d'entrer un nom pour votre nouveau secret, et sa valeur.

![Ajout du nom et de la valeur pour un nouveau secret dans GitHub](/github_project_settings_secrets_actions_new_addwebp)

Les secrets GitHub n'acceptent que des valeurs de type chaîne, donc pour certaines informations d'identification (tous les fichiers jks ou json par exemple), vous devrez d'abord convertir le fichier en une chaîne encodée en base64 avant de l'ajouter aux secrets GitHub. Vous pouvez le faire depuis la ligne de commande :

```
base64 in_file_path | pbcopy
```

Cela copie la chaîne résultante dans votre presse-papiers, vous pouvez donc la coller directement dans un nouveau secret de dépôt sur GitHub.Voici la traduction en français :

Par exemple :

```
base64 service_account_key.json | pbcopy
```

Créons un nouveau secret de dépôt comme suit :

- PLAY_CONFIG_JSON : la clé JSON du compte de service encodée en base64

_Veuillez noter que vous devez stocker une copie de sauvegarde de vos secrets en lieu sûr (ailleurs que dans les secrets chiffrés de GitHub), car vous ne pourrez plus exporter ou accéder aux identifiants depuis GitHub après les avoir ajoutés_

Avec notre clé de compte de service ajoutée aux secrets du dépôt GitHub, nous pouvons maintenant nous authentifier auprès de l'API Google Play Developer depuis n'importe quel workflow GitHub Actions ajouté au dépôt

![Nouveau secret ajouté avec succès dans GitHub](/github_project_settings_secrets_addedwebp)

### Stocker votre clé de signature Android

Pour correctement [signer les builds Android de production](https://developerandroidcom/studio/publish/app-signing/) en CI, le workflow aura besoin d'accéder soit à une clé de téléchargement Android, soit à une clé de signature d'application. Les applications créées après août 2021 utiliseront par défaut le nouveau système [Play App Signing](https://developerandroidcom/studio/publish/app-signing/#app-signing-google-play/) de Google, dans lequel une clé de téléchargement gérée par l'utilisateur est utilisée pour signer les AAB avant le téléchargement, mais la clé de signature de l'application est gérée par Google. Si votre équipe utilise Play App Signing de Google, alors vous n'aurez besoin que de la _clé de téléchargement_ de votre application pour le pipeline CI, car la signature est différée jusqu'après que l'AAB ait été téléchargé sur la Play Console. Si vous devez encore créer une clé de téléchargement et un keystore, suivez les [instructions](https://developerandroidcom/studio/publish/app-signing/#generate-key/) trouvées dans la documentation pour développeurs Android.

Si votre équipe n'a pas encore migré vers le système Play App Signing de Google, vous devrez alors rendre votre clé de _signature_ d'application disponible pour le workflow CI afin de signer correctement votre application avant le téléchargement.

Ajoutez les éléments suivants en tant que secrets du dépôt :

- ANDROID_KEYSTORE_FILE : le fichier `jks` ou `keystore` encodé en base64 utilisé pour signer vos builds Android. Il s'agira soit du fichier keystore associé à votre clé de téléchargement (si vous utilisez Play App Signing), soit de votre clé de signature d'application.
- KEYSTORE_KEY_PASSWORD : le mot de passe associé au fichier keystore
- KEYSTORE_KEY_ALIAS : l'alias du keystore
- KEYSTORE_STORE_PASSWORD : le mot de passe de la clé privée
- DEVELOPER_PACKAGE_NAME : l'ID de votre application Android comme comexampleapp

Avec ces secrets ajoutés aux secrets du dépôt GitHub, nous sommes prêts à configurer notre workflow GitHub Actions pour exécuter nos builds.

![Plusieurs secrets ajoutés avec succès dans GitHub](/github_project_settings_multi_secrets_addedwebp)

## Configurer votre fichier yml de workflow GitHub Actions

Maintenant, configurons notre fichier yml de workflow GitHub Actions pour Android - il définira les étapes que nous exécuterons dans le cadre de notre workflow. Dans ces étapes, nous appellerons nos lanes Fastlane.

Tout d'abord, créons les dossiers nécessaires. Depuis le répertoire racine de votre projet, exécutez :

```
mkdir .github && cd .github && mkdir workflows && cd workflows && touch build-upload-android.yml
```

Ensuite, collez le code suivant dans votre fichier `build-upload-androidyml` nouvellement créé :

```yaml
name: Build source code on android

on:
  push:
    tags:
      - '*'

jobs:
  build_android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js 20
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        id: install_code
        run: npm ci
      - uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
          restore-keys: |
            ${{ runner.os }}-gradle-
      - name: Build
        id: build_code
        run: npm run build
      - name: Sync
        id: sync_code
        run: npx cap sync
      - name: Setup java
        uses: actions/setup-java@v4
        with:
            distribution: 'zulu'
            java-version: '17'
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
      - uses: maierj/fastlane-action@v3.1.0
        env:
          PLAY_CONFIG_JSON: ${{ secrets.PLAY_CONFIG_JSON }}
          ANDROID_KEYSTORE_FILE: ${{ secrets.ANDROID_KEYSTORE_FILE }}
          DEVELOPER_PACKAGE_NAME: ${{ secrets.DEVELOPER_PACKAGE_NAME }}
          KEYSTORE_KEY_ALIAS: ${{ secrets.KEYSTORE_KEY_ALIAS }}
          KEYSTORE_KEY_PASSWORD: ${{ secrets.KEYSTORE_KEY_PASSWORD }}
          KEYSTORE_STORE_PASSWORD: ${{ secrets.KEYSTORE_STORE_PASSWORD }}
        with:
          lane: android beta
      - name: Upload release bundle
        uses: actions/upload-artifact@v2
        with:
          name: android-release
          path: ./android/app/build/outputs/bundle/release/app-release.aab
          retention-days: 10
```

Ce workflow devrait être déclenché après chaque _tag_ GitHub, si vous avez besoin d'automatiser le tag, veuillez vous référer à [Construction et publication automatiques avec GitHub actions](/blog/automatic-build-and-release-with-github-actions/)

Ensuite, ce workflow récupérera vos dépendances Nodejs, les installera et construira votre application JavaScript.

Votre application n'a pas besoin d'utiliser Ionic, seule la base Capacitor est obligatoire, elle peut avoir d'anciens modules Cordova, mais les plugins JS Capacitor devraient être préférés.

> Chaque fois que vous envoyez un nouveau commit, une version sera construite dans la console Google Play, canal bêta.

J'améliorerai ce blog avec vos commentaires, si vous avez des questions ou des suggestions, n'hésitez pas à me le faire savoir par email martin@capgoapp

## **Traitement des builds**

Dans GitHub Actions, **vous êtes facturé en fonction des minutes** que vous avez utilisées pour exécuter votre workflow CI/CD. D'après l'expérience, il faut environ 3 à 5 minutes avant qu'un build puisse être traité dans le Google Play Store.

Pour les projets privés, le coût estimé par build peut aller jusqu'à **0,008 $/min x 5 min = 0,04 $4**, ou plus, selon la configuration ou les dépendances de votre projet

Pour les projets open-source, cela ne devrait pas du tout poser problème. Voir [tarification](https://githubcom/pricing/)

### Merci

Ce blog est basé sur les articles suivants :
- [Automatiser la publication d'applications sur le Google Play Store avec GitHub Actions⚡+ Fastlane🏃](https://mediumcom/scalereal/automate-publishing-app-to-the-google-play-store-with-github-actions-fastlane-ac9104712486/)
- [Mise en place de CI/CD pour un projet Android (Partie 3 - GitHub Actions)](https://proandroiddevcom/getting-started-ci-cd-for-android-project-part-3-github-actions-157857224cb1/)
- [Intégration continue Android avec Fastlane et CircleCI 20 — Partie III](https://mediumcom/pink-room-club/android-continuous-integration-using-fastlane-and-circleci-2-0-part-iii-ccdf5b83d8f5/)
- [Comment mettre en place un pipeline CI/CD pour votre application Android en utilisant Fastlane et GitHub Actions](https://wwwrunwayteam/blog/ci-cd-pipeline-android-app-fastlane-github-actions/)
- [Documentation Fastlane](https://docsfastlanetools/getting-started/android/beta-deployment/)
- [Ce message GitHub de @mrogunlana](https://githubcom/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)