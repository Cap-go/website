---
slug: automatic-capacitor-android-build-github-action
title: Construction Android de condensateur automatique avec des actions GitHub
description: >-
  Comment configurer un pipeline CI/CD pour votre application Android Ionic à
  l'aide de Fastlane et des actions GitHub en 5 minutes (2022)
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-27T00:00:00.000Z
updated_at: 2022-10-27T00:00:00.000Z
head_image: /fastlane_android.webp
head_image_alt: Fastlane Google play GitHub action illustration
tag: CI/CD
published: true
next_blog: automatic-capacitor-ios-build-github-action
---

## Livraison continue pour Android à l'aide des actions Fastlane et GitHub

## Prérequis

Avant de poursuivre le tutoriel…

- Assurez-vous d'utiliser GitHub
- Votre application est déjà déployée sur Google Play Store
- Envie de lire 😆…

## Important concernant le prix

![Prix de l'action GitHub](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

Le service est « _gratuit »_ dans la limite, en fonction de la machine choisie  
Nous allons utiliser une machine **_Linux_**, vous pouvez voir sur la capture d'écran son prix et ses limites (tarifs dès la création du tutoriel, ils pourraient subir des modifications dans le futur)

🔴 **_Une fois prévenus des exigences et des tarifs, si vous le souhaitez, on continue_**

> **_📣_ Dans le post, nous supposons que nous avons l'application créée dans Google Play, nous avons la clé de signature de l'écosystème Google**

## Allons au désordre 🧑🏽💻

**Étapes à suivre dans le post**

1 _Copier les fichiers Fastline_
2 _Stocker vos secrets dans les secrets cryptés GitHub_
3 _Création et stockage de votre clé de compte de service Google Play_
4 _Stockage de votre clé de signature Android_
5 _Configurez votre fichier yml de workflow GitHub Actions_

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

## Stocker vos secrets dans les secrets cryptés GitHub

Pour nous authentifier auprès de l'API Google Play Developer, nous aurons besoin d'une clé de compte de service. Le fichier de clé de compte de service est considéré comme sensible, ce qui signifie que nous devrons le stocker en toute sécurité, mais dans un endroit où il est accessible par nos actions GitHub. workflows et notre Fastfile si nécessaire Entrez les secrets cryptés de GitHub : nous stockerons toutes nos clés sensibles dans les secrets du référentiel, les conservant en toute sécurité tout en les rendant automatiquement accessibles aux workflows GitHub Actions dans le référentiel

### Création et stockage de votre clé de compte de service Google Play

Si vous devez créer une nouvelle clé de compte de service, [suivez les étapes décrites ici](https://docsrunwayteam/integrations/app-stores/google-play-console/#service-account-api-key-setup). ayez le fichier JSON de clé de votre compte de service, ajoutons-le aux secrets cryptés de votre référentiel GitHub

Pour ajouter un nouveau secret aux secrets chiffrés de GitHub, accédez d'abord au dépôt Android auquel vous allez ajouter le workflow GitHub Actions. À l'extrême droite, cliquez sur « Paramètres ».

![Paramètres dans le dépôt GitHub](/github_project_settingswebp)

Ensuite, cliquez sur « Secrets », 

![Secrets dans le dépôt GitHub, depuis Paramètres](/github_project_settings_secretswebp)

puis « Actions » dans la liste du menu de gauche

![Actions sous Secrets dans le dépôt GitHub](/github_project_settings_secrets_actionswebp)

Ce sont les variables d'environnement secrètes chiffrées pour le référentiel. Tous les workflows configurés sur le référentiel auront accès à ces secrets du référentiel.

À partir de là, cliquez sur « Nouveau secret du référentiel » pour ajouter un nouveau secret :

![Nouvelle action secrète du référentiel dans GitHub](/github_project_settings_secrets_actions_newwebp)

Lorsque vous cliquez sur « Nouveau secret du référentiel », vous verrez un formulaire qui vous demandera de saisir un nom pour votre nouveau secret et sa valeur.

![Ajout du nom et de la valeur du nouveau secret dans GitHub](/github_project_settings_secrets_actions_new_addwebp)

Les secrets GitHub n'acceptent que les valeurs de chaîne, donc pour certaines informations d'identification (tous les fichiers jks ou json par exemple), vous devrez d'abord convertir le fichier en chaîne codée en base64 avant de l'ajouter aux secrets GitHub. Vous pouvez le faire à partir de la ligne de commande. :

```
base64 in_file_path | pbcopy
```

Cela copie la chaîne résultante dans votre presse-papiers, afin que vous puissiez la coller directement dans un nouveau secret de référentiel sur GitHub.Par exemple:

```
base64 service_account_key.json | pbcopy
```

Créons un nouveau secret de référentiel comme suit :

- PLAY_CONFIG_JSON : la clé JSON du compte de service encodée en base64

_Veuillez noter que vous devez stocker une copie de sauvegarde de vos secrets en toute sécurité dans un autre emplacement (quelque part qui n'est pas des secrets cryptés par GitHub), car vous ne pourrez plus exporter ou accéder aux informations d'identification depuis GitHub après les avoir ajoutées_

Avec notre clé de compte de service ajoutée aux secrets du référentiel GitHub, nous pouvons désormais nous authentifier auprès de l'API de développement Google Play à partir de n'importe quel flux de travail GitHub Actions ajouté au référentiel.

![Nouveau secret ajouté avec succès dans GitHub](/github_project_settings_secrets_addedwebp)

### Stockage de votre clé de signature Android

Pour [signer correctement les versions d'Android](https://developerandroidcom/studio/publish/app-signing/) dans CI, le flux de travail devra accéder soit à une clé de téléchargement Android, soit à une clé de signature d'application. Les applications créées après août 2021 utiliseront Le nouveau système de Google [Play App Signing](https://developerandroidcom/studio/publish/app-signing/#app-signing-google-play/) par défaut, dans lequel une clé de téléchargement gérée par l'utilisateur est utilisée pour signer les AAB avant télécharger, mais la clé de signature d'application est gérée par Google. Si votre équipe utilise Play App Signing de Google, tout ce dont vous aurez besoin pour le pipeline CI est la _clé de téléchargement_ de votre application, car la signature est différée jusqu'à ce que l'AAB ait été téléchargé sur la Play Console. Si vous devez encore créer une clé de téléchargement et un magasin de clés, suivez les [instructions](https://developerandroidcom/studio/publish/app-signing/#generate-key/) trouvées dans la documentation du développeur Android.

Si votre équipe n'a pas encore migré vers le système de signature d'application Play de Google, vous devrez plutôt mettre la clé _signing_ de votre application à la disposition du flux de travail CI pour signer correctement votre application avant de la télécharger.

Ajoutez les éléments suivants en tant que secrets du référentiel :


- ANDROID_KEYSTORE_FILE : le fichier "jks" ou "keystore" encodé en base64 utilisé pour signer vos versions Android. Il s'agira soit du fichier de clés associé à votre clé d'importation (si vous utilisez la signature d'application Play), soit de votre clé de signature d'application.
- KEYSTORE_KEY_PASSWORD : le mot de passe associé au fichier keystore
- KEYSTORE_KEY_ALIAS : l'alias du magasin de clés
- KEYSTORE_STORE_PASSWORD : le mot de passe de la clé privée
- DEVELOPER_PACKAGE_NAME : votre identifiant d'application Android comme comexampleapp
Avec ces secrets ajoutés aux secrets du référentiel GitHub, nous sommes prêts à configurer notre workflow GitHub Actions pour exécuter nos builds.

![Plusieurs secrets ajoutés avec succès dans GitHub](/github_project_settings_multi_secrets_addedwebp)

## Configurez votre fichier yml de workflow GitHub Actions

Maintenant, configurons notre fichier yml de workflow Android GitHub Actions – il définira les étapes que nous exécuterons dans le cadre de notre workflow. Au cours de ces étapes, nous appellerons nos voies Fastlane.

Commençons par créer les dossiers nécessaires. Depuis le répertoire racine de votre projet, appelez :

```
mkdir .github && cd .github && mkdir workflows && cd workflows && touch build-upload-android.yml
```

Ensuite, collez le code suivant dans votre fichier `build-upload-androidyml` nouvellement créé :

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

Ce workflow doit être déclenché après chaque _tag_ GitHub, si vous devez automatiser la balise, veuillez vous référer à [Création et publication automatiques avec les actions GitHub](/blog/automatic-build-and-release-with-github-actions/)

Ensuite, ce workflow extraira vos dépôts Nodejs, les installera et créera votre application JavaScript.

Votre application n'a pas besoin d'utiliser Ionic, seule la base Capacitor est obligatoire, elle peut avoir l'ancien module Cordova, mais le plugin Capacitor JS doit être préféré

> Chaque fois que vous envoyez un nouveau commit, une version sera créée dans la console Google Play, canal bêta

J'améliorerai ce blog avec vos retours, si vous avez des questions ou des suggestions, n'hésitez pas à me le faire savoir par email martin@capgoapp

## **Traitement de construction**

Dans GitHub Actions, **vous êtes facturé en fonction des minutes** que vous avez utilisées pour exécuter votre flux de travail CI/CD. Par expérience, il faut environ 3 à 5 minutes avant qu'une build puisse être traitée dans Google Play Store.

Pour les projets privés, le coût estimé par construction peut aller jusqu'à **0 008 $/min x 5 minutes = 0 $4**, ou plus, selon la configuration ou les dépendances de votre projet

Pour les projets Open source, cela ne devrait pas poser de problème du tout. Voir [tarification](https://githubcom/pricing/)

### Merci

Ce blog est basé sur les articles suivants :
- [Automatisez la publication de l'application sur le Google Play Store avec GitHub Actions⚡+ Fastlane🏃](https://mediumcom/scalereal/automate-publishing-app-to-the-google-play-store-with-github-actions-fastlane -ac9104712486/)
- [Démarrage du projet CI/CD pour Android (Partie - 3— Actions GitHub)](https://proandroiddevcom/getting-started-ci-cd-for-android-project-part-3-github-actions-157857224cb1/ )
-[Intégration continue Android à l'aide de Fastlane et CircleCI 20 — Partie III](https://mediumcom/pink-room-club/android-continuous-integration-using-fastlane-and-circleci-2-0-part-iii-ccdf5b83d8f5 /)
- [Comment configurer un pipeline CI/CD pour votre application Android à l'aide de Fastlane et GitHub Actions](https://wwwrunwayteam/blog/ci-cd-pipeline-android-app-fastlane-github-actions/)
- [Documentation Fastlane](https://docsfastlanetools/getting-started/android/beta-deployment/)
- [Ce message GitHub de @mrogunlana](https://githubcom/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)