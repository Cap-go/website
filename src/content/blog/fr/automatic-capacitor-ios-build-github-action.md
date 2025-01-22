---
slug: fr__automatic-capacitor-ios-build-github-action
title: Compilation automatique de Capacitor iOS avec GitHub Actions et certificat
description: >-
  Comment configurer un pipeline CI/CD pour votre application iOS Ionic avec
  fastlane et GitHub Actions en 5 minutes (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-08-04T00:00:00.000Z
updated_at: 2024-08-04T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Illustration de l'Action GitHub pour Fastlane TestFlight
tag: CI/CD
published: true
locale: fr
next_blog: automatic-capacitor-android-build-github-action
---

Voici la traduction en français :

## Livraison continue pour iOS en utilisant Fastlane et GitHub Actions et certificat

## Prérequis

Avant de poursuivre le tutoriel...

- Assurez-vous d'avoir Fastlane [installé](https://docsfastlanetools/) sur votre machine de développement
- Adhésion au programme de développeur iOS  
- Envie de lire 😆...

## Important concernant le prix

![Prix GitHub Action](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

Le service est 'gratuit' jusqu'à la limite, selon la machine choisie
Nous allons utiliser une machine **_macOS_**, vous pouvez voir sur la capture d'écran son prix et ses limites (prix au moment de la création du tutoriel, ils pourraient subir des changements à l'avenir)

🔴 **_Une fois avertis des exigences et des prix, si vous le souhaitez, nous continuons..._**

> **_📣_ Dans cet article, nous supposons que nous avons l'application créée dans iTunes Connect, que nous avons les certificats de l'écosystème Apple, tout sera copié par Fastlane !**

## Passons aux choses sérieuses 🧑🏽💻

**Étapes à suivre dans l'article**

1. _Utilisation de l'API App Store Connect avec Fastlane_
2. _Prérequis_
3. _Création d'une clé API App Store Connect_
4. _Utilisation d'une clé API App Store Connect_
5. _Copie des fichiers Fastlane_
6. _Configuration de GitHub Actions_

## 1. Utilisation de l'API App Store Connect avec Fastlane

> Depuis février 2021, l'authentification à deux facteurs ou la vérification en deux étapes est requise pour tous les utilisateurs pour se connecter à App Store Connect. Cette couche de sécurité supplémentaire pour votre identifiant Apple aide à garantir que vous êtes la seule personne à pouvoir accéder à votre compte.
> De [Apple Support](https://developerapplecom/support/authentication/)

## Prérequis

Pour pouvoir utiliser l'API App Store Connect, Fastlane a besoin de **trois** éléments :

1. ID de l'émetteur
2. ID de la clé
3. Fichier de clé ou contenu de la clé

## Création d'une clé API App Store Connect

Pour générer des clés, vous devez avoir l'autorisation Admin dans App Store Connect. Si vous n'avez pas cette autorisation, vous pouvez diriger la personne concernée vers cet article et suivre les instructions suivantes.

1 — Connectez-vous à [App Store Connect](https://appstoreconnectapplecom/)

2 — Sélectionnez [Utilisateurs et accès](https://appstoreconnectapplecom/access/users/)

![Accès utilisateur App Store Connect](/select_user_accesswebp)

3 — Sélectionnez l'onglet Clés API

![Clés API App Store Connect](/user_access_keyswebp)

4 — Cliquez sur Générer une clé API ou sur le bouton Ajouter (+)

![Création de clés API App Store Connect](/user_accesswebp)

5 — Entrez un nom pour la clé. Le nom est uniquement pour votre référence et ne fait pas partie de la clé elle-même.

![Création de nom de clé API App Store Connect](/gen_keywebp)

6 — Sous Accès, sélectionnez le rôle pour la clé. Les rôles qui s'appliquent aux clés sont les mêmes rôles qui s'appliquent aux utilisateurs de votre équipe. Voir [les autorisations de rôle](https://helpapplecom/app-store-connect/#/deve5f9a89d7/). Nous recommandons de sélectionner **Gestion d'applications**

7 — Cliquez sur Générer

> **L'accès d'une clé API ne peut pas être limité à des applications spécifiques**

Le nom de la nouvelle clé, l'ID de la clé, un lien de téléchargement et d'autres informations apparaissent sur la page.

![Téléchargement de clés App Store Connect](/download_keywebp)

Vous pouvez récupérer les trois informations nécessaires ici :
<1> ID de l'émetteur
<2> ID de la clé
<3> Cliquez sur "Télécharger la clé API" pour télécharger votre clé privée API. Le lien de téléchargement n'apparaît que si la clé privée n'a pas encore été téléchargée. Apple ne conserve pas de copie de la clé privée. Vous ne pouvez donc la télécharger qu'une seule fois.

> _🔴_ Stockez votre clé privée dans un endroit sûr. Vous ne devez jamais partager vos clés, les stocker dans un dépôt de code ou inclure les clés dans le code côté client.

## Utilisation d'une clé API App Store Connect

Le fichier de clé API (fichier p8 que vous téléchargez), l'ID de la clé et l'ID de l'émetteur sont nécessaires pour créer le jeton JWT pour l'autorisation. Il existe plusieurs façons d'entrer ces informations dans Fastlane en utilisant la nouvelle action de Fastlane, `app_store_connect_api_key`. Vous pouvez découvrir d'autres méthodes dans la [documentation de Fastlane](https://docsfastlanetools/actions/app_store_connect_api_key/)Je montre cette méthode car je pense que c'est la façon la plus simple de travailler avec la plupart des CI, où vous pouvez définir des variables d'environnement

_Maintenant nous pouvons gérer Fastlane avec la clé API App Store Connect, super !_

### Créer des certificats et des profils de provisionnement

#### Certificats

Ouvrez XCode et allez dans **Préférences** > **Comptes** > **Apple ID** > **Équipes** et sélectionnez votre équipe

![Identités de signature de code](/code_signing_identitieswebp)

Cliquez sur **Gérer les certificats** > **+** et sélectionnez **Apple Distribution**

![Apple Distribution](/apple_distributionwebp)

Ensuite, vous pouvez créer un nouveau certificat

Puis vous devez aller dans le trousseau pour télécharger le certificat en tant que fichier `p12`

Pour ce faire, vous devez aller dans le trousseau, basculer vers le trousseau **session** puis l'onglet **Mes certificats**

![Mes certificats](/my_certificateswebp)

Vous pouvez ensuite sélectionner le certificat que vous souhaitez télécharger (Recherchez par la date du certificat)

Puis faites un clic droit sur le certificat et sélectionnez **Exporter**

Choisissez le format de fichier **Échange d'informations personnelles (.p12)**

Cela téléchargera le certificat en tant que fichier `p12`

#### Profils de provisionnement

Ouvrez [Apple Developer](https://developerapplecom/account/resources/profiles/list) et sélectionnez la bonne équipe

Ensuite, créez un nouveau profil en cliquant sur **+**

![Créer un nouveau profil](/create_new_profilewebp)

Et sélectionnez **App Store Connect**

![Sélectionner App Store Connect](/select_app_store_connectwebp)

Ensuite, vous devez sélectionner la bonne application, faites attention à ne pas utiliser de caractère générique sinon la signature échouera

![Sélectionner la bonne application](/select_appwebp)

Sélectionnez le bon certificat que vous avez créé précédemment (recherchez la date d'expiration, elle devrait être le même jour et mois qu'aujourd'hui) et cliquez sur **Continuer**

![Sélectionner le bon certificat](/select_certificatewebp)

Enfin, entrez le nom du profil et cliquez sur **Générer**

> Le nom sera utilisé pour identifier le profil dans Fastlane, sous la valeur de `APPLE_PROFILE_NAME`

![Générer le profil](/generate_profilewebp)

Vous pouvez télécharger le profil en tant que fichier `mobileprovision`

![Télécharger le profil](/download_profilewebp)

### Création de secrets GitHub pour votre certificat et profil de provisionnement

Le processus de signature implique le stockage des certificats et des profils de provisionnement, leur transfert vers l'exécuteur, leur importation dans le trousseau de l'exécuteur, et leur utilisation dans votre build

Créez des secrets dans votre dépôt ou organisation pour les éléments suivants :

- Votre certificat de signature Apple

  - Il s'agit de votre fichier de certificat `p12`. Pour plus d'informations sur l'exportation de votre certificat de signature depuis Xcode, consultez la [documentation Xcode](https://helpapplecom/xcode/mac/current/#/dev154b28f09)

  - Vous devez convertir votre certificat en Base64 lorsque vous l'enregistrez en tant que secret. Dans cet exemple, le secret est nommé `BUILD_CERTIFICATE_BASE64`

  - Utilisez la commande suivante pour convertir votre certificat en Base64 et le copier dans votre presse-papiers :

    ```shell
        base64 -i BUILD_CERTIFICATE.p12 | pbcopy
        ```

- Le mot de passe de votre certificat de signature Apple

  - Dans cet exemple, le secret est nommé `P12_PASSWORD`

- Votre profil de provisionnement Apple

  - Pour plus d'informations sur l'exportation de votre profil de provisionnement depuis Xcode, consultez la [documentation Xcode](https://helpapplecom/xcode/mac/current/#/deva899b4fe5)

  - Vous devez convertir votre profil de provisionnement en Base64 lorsque vous l'enregistrez en tant que secret. Dans cet exemple, le secret est nommé `BUILD_PROVISION_PROFILE_BASE64`

  - Utilisez la commande suivante pour convertir votre profil de provisionnement en Base64 et le copier dans votre presse-papiers :

    ```shell
        base64 -i PROVISIONING_PROFILE.mobileprovision | pbcopy
        ```

## 2. Copier les fichiers Fastlane

Fastlane est une bibliothèque Ruby créée pour automatiser les tâches courantes de développement mobile. En utilisant Fastlane, vous pouvez configurer des "lanes" personnalisées qui regroupent une série d'"actions" qui effectuent des tâches que vous effectueriez normalement en utilisant Android Studio. Vous pouvez faire beaucoup avec Fastlane, mais pour les besoins de ce tutoriel, nous n'utiliserons qu'une poignée d'actions principales.Créez un dossier Fastlane à la racine de votre projet et copiez les fichiers suivants :
Fastfile
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

## **Traitement des builds**

Dans GitHub Actions, **vous êtes facturé en fonction des minutes** que vous avez utilisées pour exécuter votre workflow CI/CD. D'après l'expérience, il faut environ 10 à 15 minutes avant qu'un build puisse être traité dans App Store Connect.

Pour les projets privés, le coût estimé par build peut atteindre **0,08 $/min x 15 min = 1,2 $**, ou plus, selon la configuration ou les dépendances de votre projet.

Si vous partagez les mêmes préoccupations que moi concernant le prix pour les projets privés, vous pouvez garder `skip_waiting_for_build_processing` à `true`.

Quel est l'inconvénient ? Vous devez mettre à jour manuellement la conformité de votre application dans App Store Connect après le traitement du build, pour pouvoir distribuer le build à vos utilisateurs.

Il s'agit simplement d'un paramètre facultatif à mettre à jour si vous souhaitez économiser sur les minutes de build pour les projets privés. Pour les projets gratuits, cela ne devrait pas poser de problème du tout. Voir [tarification](https://github.com/pricing/)

## 3. Configurer GitHub Actions

**Configurer les secrets GitHub**

Vous vous êtes déjà demandé d'où viennent les valeurs de `ENV` ? Eh bien, ce n'est plus un secret - c'est à partir du secret de votre projet 🤦

![Définir les secrets GitHub](/github_secrets.webp)

1. `APP_STORE_CONNECT_TEAM_ID` - l'ID de votre équipe App Store Connect si vous faites partie de plusieurs équipes

2. `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <YOUR_APP_BUNDLE_IDENTIFIER>`, par exemple `match AppStore com.domain.blabla.demo`

3. `BUILD_CERTIFICATE_BASE64` - Certificat encodé en Base64

4. `BUILD_PROVISION_PROFILE_BASE64` - Profil de provisionnement encodé en Base64

5. `BUNDLE_IDENTIFIER` - l'identifiant de bundle de votre application

6. `APPLE_KEY_ID` — Clé API App Store Connect 🔺Key ID

7. `APPLE_ISSUER_ID` — Clé API App Store Connect 🔺Issuer ID

8. `APPLE_KEY_CONTENT` — Clé API App Store Connect 🔺 Contenu de la clé _p8_, [vérifiez-le](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)

## **4. Configurer le fichier de workflow GitHub**

Créez un répertoire de workflow GitHub

```
cd .github/workflows
```

Dans le dossier `workflow`, créez un fichier nommé `build-upload-ios.yml` et ajoutez ce qui suit

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
      - uses: actions/checkout@v4
      - name: Use Node.js 20
        uses: actions/setup-node@v3
        with:
          node-version: 20
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

Ce workflow devrait être déclenché après chaque _tag_ GitHub, si vous avez besoin d'automatiser le tag, veuillez d'abord vous référer à [Construction et publication automatiques avec les actions GitHub](/blog/automatic-build-and-release-with-github-actions/)

Ensuite, ce workflow extraira vos dépendances NodeJS, les installera et construira votre application JavaScript.

> Chaque fois que vous envoyez un nouveau commit, une version sera construite dans TestFlight

Votre application n'a pas besoin d'utiliser Ionic, seule la base Capacitor est obligatoire, elle peut avoir d'anciens modules Cordova, mais les plugins JS Capacitor devraient être préférés.

## 5. Déclencher le workflow

**Créer un commit**

Faites un _commit_, vous devriez voir le workflow actif dans le dépôt.

**Déclencher le workflow**

Poussez les nouveaux commits vers la branche `main` ou `development` pour déclencher le workflow.

![Démarré avec le commit](/cd_started.webp)

Après quelques minutes, le build devrait être disponible dans votre tableau de bord App Store Connect.

![Tableau de bord Testflight](/testflight_app.webp)

## Peut-on déployer depuis une machine locale ?

Oui, vous le pouvez, et c'est très simple.

Vous pouvez utiliser Xcode pour construire et signer votre application, comme d'habitude.

### Remerciements

Ce blog est basé sur les articles suivants :
- [Livraison continue pour iOS en utilisant Fastlane et GitHub actions](https://lito.arias.medium.com/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Documentation Fastlane](https://docs.fastlane.tools/app-store-connect-api/)
- [Ce message GitHub de @mrogunlana](https://github.com/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
- [Cette documentation GitHub](https://docs.github.com/en/actions/deployment/deploying-xcode-applications/installing-an-apple-certificate-on-macos-runners-for-xcode-development)