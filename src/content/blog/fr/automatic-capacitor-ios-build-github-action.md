---
slug: automatic-capacitor-ios-build-github-action
title: Création automatique d'iOS avec Capacitor via GitHub Actions avec certificat
description: >-
  Comment configurer un pipeline CI/CD pour votre application iOS Ionic avec
  fastlane et GitHub Actions en 5 minutes (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-08-04T00:00:00.000Z
updated_at: 2025-11-24T14:48:36.000Z
head_image: /fastlane_ios.webp
head_image_alt: Illustration de l'action GitHub Fastlane testflight
keywords: 'Fastlane, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: fr
next_blog: automatic-capacitor-android-build-github-action
---
# Builds iOS automatiques avec GitHub Actions en utilisant les Certificats

La configuration de CI/CD pour les applications Capacitor peut être complexe et prendre du temps. Voici ce que vous devez savoir :

## Prérequis

Avant de commencer, vous aurez besoin de :

- Un compte GitHub avec accès administrateur
- Adhésion au programme développeur iOS 
- Accès API App Store Connect avec les permissions appropriées
- Compréhension des workflows GitHub Actions
- Connaissance de la configuration Fastlane
- Du temps pour maintenir et déboguer le pipeline
- Des certificats et profils de provisionnement appropriés

## Configuration CI/CD professionnelle par Capgo

Évitez la complexité. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) configure votre pipeline CI/CD directement sur votre plateforme préférée :

- **Indépendance de la plateforme** : Fonctionne avec GitHub Actions, GitLab CI ou autres
- **Intégration transparente** : Pas besoin de changer de plateforme, fonctionne avec votre processus actuel
- **Configuration personnalisée** : Configuration adaptée aux besoins de votre projet
- **Conseils d'experts** : Nous avons déjà configuré le CI/CD pour plus de 50 applications

### Tarification
- Frais de configuration unique : 2 600 $
- Vos coûts de fonctionnement : ~300 $/an
- Comparé aux autres solutions propriétaires : 6 000 $/an
- **Économisez 26 100 $ sur 5 ans**

[Configurez CI/CD maintenant](https://cal.com/team/capgo/mobile-ci-cd-done-for-you/)

## Guide de configuration manuelle

Si vous souhaitez tout configurer vous-même, voici ce que vous devez faire :

## Livraison continue pour iOS avec Fastlane et GitHub Actions et certificat


## Prérequis

Avant de continuer le tutoriel :

-   Assurez-vous d'avoir Fastlane [installé](https://docs.fastlane.tools/) sur votre machine de développement.
-   Assurez-vous de faire partie du programme développeur iOS.

## Informations importantes sur le prix

![Prix GitHub Action](/price_github_actions.webp)

[https://github.com/features/actions](https://github.com/features/actions/)

Le service est 'gratuit' jusqu'à la limite, selon la machine choisie.  
Nous allons utiliser une machine **_macOS_**, vous pouvez voir sur la capture d'écran son prix et ses limites (prix à la création du tutoriel, ils pourraient subir des modifications à l'avenir)

**Une fois avertis des exigences et des prix, continuons.**

> **Note : Dans cet article, je suppose que vous avez créé l'application dans App Store Connect. Les informations importantes seront copiées par Fastlane !**

## Ce que vous apprendrez dans ce tutoriel

**Étapes à suivre dans l'article**

1. _Utilisation de l'API App Store Connect avec Fastlane_
    - _Exigences :_
      - _Création d'une clé API App Store Connect_
      - _Utilisation d'une clé API App Store Connect_
2. _Copier les fichiers Fastlane_
3. _Configurer GitHub Actions_


## 1. Utilisation de l'API App Store Connect avec Fastlane

> Depuis février 2021, l'authentification à deux facteurs ou la vérification en deux étapes est requise pour tous les utilisateurs pour se connecter à App Store Connect. Cette couche de sécurité supplémentaire pour votre identifiant Apple aide à garantir que vous êtes la seule personne à pouvoir accéder à votre compte.  
> De [Apple Support](https://developer.apple.com/support/authentication/)

### Exigences

Pour que Fastlane puisse utiliser l'API App Store Connect pour télécharger votre application, vous devez fournir les **trois** éléments suivants :

1. ID émetteur
2. ID de clé
3. Fichier de clé ou contenu de clé

### Obtention d'une clé API App Store Connect

Pour générer des clés, vous devez avoir la permission Admin dans App Store Connect. Si vous n'avez pas cette permission, vous pouvez diriger la personne concernée vers cet article.

1. Connectez-vous à [App Store Connect](https://appstoreconnect.apple.com/).

2. Sélectionnez [Utilisateurs et Accès](https://appstoreconnect.apple.com/access/users/).

![Accès utilisateur App Store Connect](/select_user_access.webp)

3. Sélectionnez l'onglet Intégration.

![Intégration API App Store Connect](/user_access_keys.webp)

4. Cliquez sur Générer une clé API ou sur le bouton Ajouter (+).

![Création de clés API App Store Connect](/user_access.webp)

5. Saisissez un nom pour la clé. Le nom est uniquement pour votre référence et ne fait pas partie de la clé elle-même.

![Nom de création de clés API App Store Connect](/gen_key.webp)

6. Sous Accès, sélectionnez le rôle pour la clé. Les rôles qui s'appliquent aux clés sont les mêmes que ceux qui s'appliquent aux utilisateurs de votre équipe. Voir les [permissions des rôles](https://help.apple.com/app-store-connect/#/deve5f9a89d7/). Nous recommandons de sélectionner **Gestionnaire d'application**.

7. Cliquez sur Générer.

> **L'accès d'une clé API ne peut pas être limité à des applications spécifiques.**

Le nom de la nouvelle clé, l'ID de clé, un lien de téléchargement et d'autres informations apparaissent sur la page.

![Téléchargement des clés App Store Connect](/download_key.webp)

Vous pouvez récupérer ici les trois informations nécessaires.  
<1> ID émetteur. (secret `APPLE_ISSUER_ID`)  
<2> ID de clé. (secret `APPLE_KEY_ID`)  
<3> Cliquez sur "Télécharger la clé API" pour télécharger votre clé privée API. Le lien de téléchargement n'apparaît que si la clé privée n'a pas encore été téléchargée. Apple ne conserve pas de copie de la clé privée. Donc, vous ne pouvez la télécharger qu'une seule fois.

> _🔴_ Stockez votre clé privée dans un endroit sûr. Vous ne devez jamais partager vos clés, stocker les clés dans un dépôt de code, ou inclure les clés dans le code côté client.

### Utilisation d'une clé API App Store Connect

Le fichier de clé API (fichier p8 que vous téléchargez), l'ID de clé et l'ID émetteur sont requis pour créer le jeton JWT pour l'autorisation. Il existe plusieurs façons de transmettre ces informations à Fastlane. J'ai choisi d'utiliser la nouvelle action de Fastlane `app_store_connect_api_key`. Vous pouvez découvrir d'autres méthodes dans la [documentation Fastlane](https://docs.fastlane.tools/actions/app_store_connect_api_key/). Je montre cette méthode car je pense que c'est la façon la plus simple de travailler avec la plupart des CI, où vous pouvez définir des variables d'environnement.

Veuillez convertir le fichier p8 que vous téléchargez en Base64 et le stocker comme secret (`APPLE_KEY_CONTENT`).

```shell
base64 -i APPLE_KEY_CONTENT.p8 | pbcopy
```

_Maintenant nous pouvons gérer App Store Connect avec Fastlane en utilisant la clé API, super !_

## 2. Certificats

Ouvrez XCode et allez dans **Préférences** > **Comptes** > **Apple ID** > **Équipes** et sélectionnez votre équipe.

![Identités de signature de code](/code_signing_identities.webp)

Cliquez sur **Gérer les certificats**.

Si vous n'avez pas encore créé de certificat, vous pouvez en créer un nouveau.

Cliquez sur **+** et sélectionnez **Distribution Apple**

![Distribution Apple](/apple_distribution.webp)

Ensuite, vous devez aller dans le trousseau pour télécharger le certificat en tant que fichier `.p12`.

Pour ce faire, vous devez aller dans le trousseau, passer au trousseau **connexion** puis à l'onglet **Mes certificats**.

![Mes certificats](/my_certificates.webp)

Vous pouvez alors sélectionner le certificat que vous voulez télécharger. (Regardez par la date du certificat)

Puis faites un clic droit sur la clé privée du certificat et sélectionnez **Exporter**.

Choisissez le format de fichier **Échange d'informations personnelles (.p12)**.

Cela téléchargera le certificat sous forme de fichier `.p12`.

Veuillez ouvrir le fichier dans un terminal et utiliser la commande suivante pour le convertir en Base64 :

```shell
base64 -i BUILD_CERTIFICATE.p12 | pbcopy
```

Cela deviendra votre secret `BUILD_CERTIFICATE_BASE64`. Aussi, lorsque demandé, veuillez fournir le mot de passe du certificat. Ce mot de passe sera votre secret `P12_PASSWORD`.

## 3. Profils de provisionnement

Ouvrez [Apple Developer](https://developer.apple.com/account/resources/profiles/list) et sélectionnez la bonne équipe.

Puis créez un nouveau profil en cliquant sur **+**

![Créer un nouveau profil](/create_new_profile.webp)

Et sélectionnez **App Store Connect**.

![Sélectionner App Store Connect](/select_app_store_connect.webp)

Ensuite, vous devez sélectionner la bonne application, attention vous ne pouvez pas utiliser de caractère générique sinon la signature échouera.

![Sélectionner la bonne application](/select_app.webp)

Sélectionnez le bon certificat que vous avez créé précédemment (regardez la date d'expiration, elle devrait être le même jour et mois qu'aujourd'hui) et cliquez sur **Continuer**.

![Sélectionner le bon certificat](/select_certificate.webp)

Enfin, entrez le nom du profil et cliquez sur **Générer**.

> Le nom sera utilisé pour identifier le profil dans Fastlane, sous la valeur de `APPLE_PROFILE_NAME`.

![Générer le profil](/generate_profile.webp)

Vous pouvez télécharger le profil en tant que fichier `.mobileprovision`.

![Télécharger le profil](/download_profile.webp)

Veuillez convertir le profil en Base64 et le stocker comme secret (`BUILD_PROVISION_PROFILE_BASE64`).

```shell
base64 -i BUILD_PROVISION_PROFILE.mobileprovision | pbcopy
```

## 4. Copier les fichiers Fastlane

Fastlane est une bibliothèque Ruby créée pour automatiser les tâches courantes de développement mobile. En utilisant Fastlane, vous pouvez configurer des "lanes" personnalisées qui regroupent une série d'"actions" qui effectuent des tâches que vous effectueriez normalement en utilisant Android studio. Vous pouvez faire beaucoup avec Fastlane, mais pour les besoins de ce tutoriel, nous n'utiliserons qu'une poignée d'actions principales.

Créez un dossier Fastlane à la racine de votre projet et copiez les fichiers suivants :
`Fastfile`
```ruby
platform :ios do
  desc 'Export ipa and submit to TestFlight'
  lane :beta do
    keychain_info = { keychain_name: "ios-build-#{Time.now.to_i}.keychain", keychain_password: SecureRandom.uuid }
    
    begin
      setup_signing(keychain_info)
      bump_build_number
      build_app_with_signing(keychain_info)
      submit_to_testflight
    ensure
      cleanup_keychain(keychain_info)
    end
  end

  private_lane :setup_signing do |options|
    create_keychain(
      name: options[:keychain_name],
      password: options[:keychain_password],
      unlock: true,
      timeout: 0,
      lock_when_sleeps: false, 
      add_to_search_list: true
    )
    import_cert(options)
    install_profile
    update_project_settings
  end

  lane :bump_build_number do
		file = File.read('../package.json')
		data_hash = JSON.parse(file)
		api_key = app_store_connect_api_key(
      key_id: ENV['APPLE_KEY_ID'],
      issuer_id: ENV['APPLE_ISSUER_ID'],
      key_content: Base64.decode64(ENV['APPLE_KEY_CONTENT']),
      duration: 1200,
      in_house: false
    )
		build_num = app_store_build_number(
      api_key: api_key,
			app_identifier: ENV['BUNDLE_IDENTIFIER'],
			live: false
    )
		build_num = build_num + 1
		UI.message("Bumped build number to #{build_num}")
		increment_build_number(
			build_number: build_num,
			xcodeproj: "./ios/App/App.xcodeproj",
			skip_info_plist: true
		)
	end

  private_lane :import_cert do |options|
    cert_path = "#{Dir.tmpdir}/build_certificate.p12"
    File.write(cert_path, Base64.decode64(ENV['BUILD_CERTIFICATE_BASE64']))
    import_certificate(
      certificate_path: cert_path,
      certificate_password: ENV['P12_PASSWORD'] || "",
      keychain_name: options[:keychain_name],
      keychain_password: options[:keychain_password],
      log_output: true
    )
    File.delete(cert_path)
  end  
  
  private_lane :cleanup_keychain do |options|
    delete_keychain(
      name: options[:keychain_name]
    )
  end  

  private_lane :install_profile do
    profile_path = "#{Dir.tmpdir}/build_pp.mobileprovision"
    File.write(profile_path, Base64.decode64(ENV['BUILD_PROVISION_PROFILE_BASE64']))
    UI.user_error!("Failed to create provisioning profile at #{profile_path}") unless File.exist?(profile_path)
    ENV['PROVISIONING_PROFILE_PATH'] = profile_path
    install_provisioning_profile(path: profile_path)
    File.delete(profile_path)
  end

  private_lane :update_project_settings do
    update_code_signing_settings(
      use_automatic_signing: false,
      path: "./ios/App/App.xcodeproj",
      code_sign_identity: "iPhone Distribution",
      profile_name: ENV['APPLE_PROFILE_NAME'],
      bundle_identifier: ENV['BUNDLE_IDENTIFIER'],
      team_id: ENV['APP_STORE_CONNECT_TEAM_ID']
    )
    update_project_team(
      path: "./ios/App/App.xcodeproj",
      teamid: ENV['APP_STORE_CONNECT_TEAM_ID']
    )
  end

  private_lane :build_app_with_signing do |options|
    unlock_keychain(
      path: options[:keychain_name],
      password: options[:keychain_password],
      set_default: false
    )
    build_app(
      workspace: "./ios/App/App.xcworkspace",
      scheme: "App",
      configuration: "Release",
      export_method: "app-store",
      output_name: "App.ipa",
      export_options: {
        provisioningProfiles: {
          ENV['BUNDLE_IDENTIFIER'] => ENV['APPLE_PROFILE_NAME']
        }
      },
      xcargs: "-verbose",
      buildlog_path: "./build_logs",
      export_xcargs: "-allowProvisioningUpdates",
    )
  end   

  private_lane :submit_to_testflight do
    api_key = app_store_connect_api_key(
      key_id: ENV['APPLE_KEY_ID'],
      issuer_id: ENV['APPLE_ISSUER_ID'],
      key_content: Base64.decode64(ENV['APPLE_KEY_CONTENT']),
      duration: 1200,
      in_house: false
    )
    pilot(
      api_key: api_key,
      skip_waiting_for_build_processing: true,
      skip_submission: true,
      distribute_external: false,
      notify_external_testers: false,
      ipa: "./App.ipa"
    )
  end
end
```

## 5. Configuration des secrets
Localement, fastlane utilisera le fichier `.env` pour les secrets.
Voici un exemple du fichier `.env` :

```shell
APP_STORE_CONNECT_TEAM_ID=UVTJ336J2D
BUNDLE_IDENTIFIER=ee.forgr.testfastlane
# See previous section for these secrets
BUILD_CERTIFICATE_BASE64=
BUILD_PROVISION_PROFILE_BASE64=
APPLE_KEY_ID=
APPLE_ISSUER_ID=
APPLE_KEY_CONTENT=
P12_PASSWORD=
APPLE_PROFILE_NAME=
```

### Obtenir le APP_STORE_CONNECT_TEAM_ID
Allez sur le [Centre de développement](https://developer.apple.com/account) et faites défiler jusqu'à la section `Détails d'adhésion`.
Le `Team ID` est la valeur que vous devez définir dans le secret `APP_STORE_CONNECT_TEAM_ID`.

<div class="mx-auto" style="width: 100%; margin-top: 20px;">
  <img src="/apple_team_id.webp" alt="app-store-connect-team-id">
</div>

### Obtenir le BUNDLE_IDENTIFIER

1. Ouvrez Xcode
2. Double-cliquez sur `App` dans le navigateur de projet
<div class="mx-auto" style="width: 100%;">
  <img src="/social-login-assets/xcode_app_click.webp" alt="bundle-identifier-xcode">
</div>
3. Copiez la valeur du `Bundle identifier`. C'est la valeur que vous devez définir dans le secret `BUNDLE_IDENTIFIER`.
<div class="mx-auto" style="width: 100%;">
  <img src="/xcode_bundle_id.webp" alt="bundle-identifier-xcode">
</div>

## 6. Traitement des builds

Dans GitHub Actions, **vous êtes facturé en fonction des minutes** que vous avez utilisées pour exécuter votre workflow CI/CD. D'après mon expérience, il faut environ 10-15 minutes avant qu'un build puisse être traité dans App Store Connect.

Pour les projets privés, le coût estimé par build peut aller jusqu'à **0,08 $/min x 15 mins = 1,2 $**, ou plus, selon la configuration et les dépendances de votre projet.

Si vous êtes préoccupé par les coûts pour les projets privés, vous pouvez définir `skip_waiting_for_build_processing` à `true`. Cela permettra d'économiser des minutes de build en n'attendant pas qu'App Store Connect termine le traitement du build.

Cependant, il y a un compromis - vous devrez mettre à jour manuellement les informations de conformité de votre application dans App Store Connect avant de pouvoir distribuer la version aux utilisateurs.

Cette optimisation est principalement utile pour les projets privés où les minutes de build coûtent de l'argent. Pour les projets publics/gratuits, les minutes de build sont gratuites donc il n'est pas nécessaire d'activer ce paramètre. Voir la [page de tarification](https://github.com/pricing/) de GitHub pour plus de détails.

## 7. Configuration de GitHub Actions

**Configurer les secrets GitHub**

Veuillez copier les secrets du fichier `.env` et les coller dans les secrets du dépôt GitHub.

Allez dans **Settings** > **Secrets and variables** > **Actions** > **New repository secret**

<div class="mx-auto" style="width: 100%;">
  <img src="/github_new_secret.webp" alt="github-secrets">
</div>

2. `BUILD_CERTIFICATE_BASE64` - Certificat encodé en Base64.

3. `BUILD_PROVISION_PROFILE_BASE64` - Profil de provisionnement encodé en Base64.

4. `BUNDLE_IDENTIFIER` - l'identifiant de bundle de votre application.

5. `APPLE_KEY_ID` — Clé API App Store Connect 🔺Key ID.

6. `APPLE_ISSUER_ID` — Clé API App Store Connect 🔺Issuer ID.

7. `APPLE_KEY_CONTENT` — Clé API App Store Connect 🔺 Contenu de la clé _.p8_, [vérifiez ici](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)

## 8. Configurer le fichier de workflow GitHub

Créez un répertoire de workflow GitHub.

```
cd .github/workflows
```

Dans le dossier `workflow`, créez un fichier nommé `build-upload-ios.yml` et ajoutez ce qui suit.

```yaml
name: Build source code on ios

on:
  push:
    tags:
      - '*'

jobs:
  build_ios:
    runs-on: macOS-latest
    steps:
      - uses: actions/checkout@v5
      - name: Use Node.js 20
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm
      - name: Install dependencies
        id: install_code
        run: npm ci
      - name: Build
        id: build_code
        run: npm run build
      - name: Build
        id: build_code
        run: npm run mobile
      - uses: actions/cache@v3
        with:
          path: ios/App/Pods
          key: ${{ runner.os }}-pods-${{ hashFiles('**/Podfile.lock') }}
          restore-keys: |
            ${{ runner.os }}-pods-
      - name: Sync
        id: sync_code
        run: npx cap sync
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
      - uses: maierj/fastlane-action@v3.1.0
        env:
          APP_STORE_CONNECT_TEAM_ID: ${{ secrets.APP_STORE_CONNECT_TEAM_ID }}
          BUNDLE_IDENTIFIER: ${{ secrets.BUNDLE_IDENTIFIER }}
          BUILD_CERTIFICATE_BASE64: ${{ secrets.BUILD_CERTIFICATE_BASE64 }}
          BUILD_PROVISION_PROFILE_BASE64: ${{ secrets.BUILD_PROVISION_PROFILE_BASE64 }}
          APPLE_KEY_ID: ${{ secrets.APPLE_KEY_ID }}
          APPLE_ISSUER_ID: ${{ secrets.APPLE_ISSUER_ID }}
          APPLE_KEY_CONTENT: ${{ secrets.APPLE_KEY_CONTENT }}
          P12_PASSWORD: ${{ secrets.P12_PASSWORD }}
          APPLE_PROFILE_NAME: ${{ secrets.APPLE_PROFILE_NAME }}
        with:
          lane: ios beta
      - name: Upload release bundle
        uses: actions/upload-artifact@v4
        with:
          name: ios-release
          path: ./App.ipa
          retention-days: 10
```

Ce workflow devrait être déclenché après chaque _tag_ GitHub, si vous devez automatiser le tag, référez-vous d'abord à [Compilation et publication automatiques avec GitHub actions](/blog/automatic-build-and-release-with-github-actions/).

Ensuite, ce workflow récupérera vos dépendances NodeJS, les installera et compilera votre application JavaScript.

> Chaque fois que vous envoyez un nouveau commit, une version sera construite dans TestFlight.

Votre application n'a pas besoin d'utiliser Ionic, seule la base Capacitor est obligatoire, elle peut avoir d'anciens modules Cordova, mais les plugins Capacitor JS sont à privilégier.

## 8. Déclencher le workflow

**Créer un Commit**

Faites un _commit_, vous devriez voir le workflow actif dans le dépôt.

**Déclencher le workflow**

Poussez les nouveaux commits vers la branche `main` ou `developement` pour déclencher le workflow.

![Commencé avec commit](/cd_started.webp)

Après quelques minutes, la version devrait être disponible dans votre tableau de bord App Store Connect.

![Tableau de bord Testflight](/testflight_app.webp)

## 9. Puis-je déployer depuis une machine locale ?

Oui, vous pouvez, et c'est très simple.

Vous pouvez utiliser Xcode pour compiler et signer votre application, comme d'habitude.

### Remerciements

Ce blog est basé sur les articles suivants :
- [Continuous delivery for IOS using Fastlane and GitHub actions](https://litoarias.medium.com/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Fastlane Documentation](https://docs.fastlane.tools/app-store-connect-api/)
- [Ce message GitHub de @mrogunlana](https://github.com/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
- [Cette documentation GitHub](https://docs.github.com/en/actions/deployment/deploying-xcode-applications/installing-an-apple-certificate-on-macos-runners-for-xcode-development)
