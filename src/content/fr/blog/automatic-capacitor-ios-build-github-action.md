---
slug: automatic-capacitor-ios-build-github-action
title: >-
  Construction automatique du condensateur IOS avec actions GitHub avec
  certificat
description: >-
  Comment configurer un pipeline CI/CD pour votre application IOS Ionic à l'aide
  de Fastlane et des actions GitHub en 5 minutes (2024)
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2024-08-04T00:00:00.000Z
updated_at: 2024-08-04T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Fastlane testflight GitHub action illustration
tag: CI/CD
published: true
next_blog: automatic-capacitor-android-build-github-action
---

## Livraison continue pour iOS à l'aide des actions et du certificat Fastlane et GitHub


## Prérequis

Avant de poursuivre le tutoriel…

- Assurez-vous d'avoir Fastlane [installé](https://docsfastlanetools/) sur votre machine de développement
- Adhésion au programme pour développeurs iOS
- Envie de lire 😆…

## Important concernant le prix

![Prix de l'action GitHub](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

Le service est '_gratuit'_ dans la limite, selon la machine choisie  
Nous allons utiliser une machine **_macOS_**, vous pouvez voir sur la capture d'écran son prix et ses limites (tarifs dès la création du tutoriel, ils pourraient subir des modifications dans le futur)

🔴 **_Une fois prévenus des besoins et des tarifs, si vous le souhaitez, on continue…_**

> **_📣_ Dans le post nous supposons que nous avons l'application créée dans iTunes connect, nous avons les certificats de l'écosystème Apple, tout sera copié par Fastlane !**

## Allons au désordre 🧑🏽💻

**Étapes à suivre dans le post**

1 _Utilisation de l'API App Store Connect avec Fastlane_
2 _Exigences_
3 _Création d'une clé API App Store Connect_
4 _Utilisation d'une clé API App Store Connect_
5 _Copier les fichiers Fastline_
6 _Configurer les actions GitHub_


## 1 Utilisation de l'API App Store Connect avec Fastlane

> À partir de février 2021, une authentification à deux facteurs ou une vérification en deux étapes est requise pour que tous les utilisateurs puissent se connecter à App Store Connect. Cette couche de sécurité supplémentaire pour votre identifiant Apple permet de garantir que vous êtes la seule personne à pouvoir accéder à votre compte.  
> Depuis [Assistance Apple](https://developerapplecom/support/authentication/)

## Exigences

Pour pouvoir utiliser l'API App Store Connect, Fastlane a besoin de **trois** éléments :

1 identifiant de l'émetteur
2 ID de clé
3 Fichier clé ou contenu clé

## Création d'une clé API App Store Connect

Pour générer des clés, vous devez disposer de l'autorisation d'administrateur dans App Store Connect. Si vous ne disposez pas de cette autorisation, vous pouvez diriger la personne concernée vers cet article et suivre les instructions suivantes.

1 — Connectez-vous à [App Store Connect](https://appstoreconnectapplecom/)

2 — Sélectionnez [Utilisateurs et accès](https://appstoreconnectapplecom/access/users/)

![Accès utilisateur App Store Connect](/select_user_accesswebp)

3 — Sélectionnez l'onglet Clés API

![Clés API App Store Connect](/user_access_keyswebp)

4 — Cliquez sur Générer une clé API ou sur le bouton Ajouter (+)

![Création de clés API App Store Connect](/user_accesswebp)

5 — Entrez un nom pour la clé. Le nom est uniquement à titre de référence et ne fait pas partie de la clé elle-même.

![Les clés API App Store Connect créent un nom](/gen_keywebp)

6 — Sous Accès, sélectionnez le rôle de la clé. Les rôles qui s'appliquent aux clés sont les mêmes que ceux qui s'appliquent aux utilisateurs de votre équipe Voir [autorisations de rôle](https://helpapplecom/app-store-connect/#/deve5f9a89d7/ ) Nous vous recommandons de sélectionner **Gestion des applications**


7 — Cliquez sur Générer

> **L'accès à une clé API ne peut pas être limité à des applications spécifiques**

Le nom de la nouvelle clé, l'ID de la clé, un lien de téléchargement et d'autres informations apparaissent sur la page

![Clés de téléchargement App Store Connect](/download_keywebp)

Vous pouvez récupérer les trois informations nécessaires ici  
<1> ID du problème  
<2> ID de clé  
<3> Cliquez sur "Télécharger la clé API" pour télécharger votre clé privée API Le lien de téléchargement n'apparaît que si la clé privée n'a pas encore été téléchargée Apple ne conserve pas de copie de la clé privée Vous ne pouvez donc la télécharger qu'une seule fois

> _🔴_ Stockez votre clé privée dans un endroit sûr Vous ne devez jamais partager vos clés, stocker des clés dans un référentiel de code ou inclure des clés dans le code côté client

## Utilisation d'une clé API App Store Connect

Le fichier de clé API (fichier p8 que vous téléchargez), l'ID de clé et l'ID d'émetteur sont nécessaires pour créer le jeton JWT pour l'autorisation. Il existe plusieurs façons de saisir ces informations dans Fastlane à l'aide de la nouvelle action de Fastlane, `app_store_connect_api_key ` Vous pouvez découvrir d'autres méthodes dans la [documentation Fastlane](https://docsfastlanetools/actions/app_store_connect_api_key/)Je montre cette méthode parce que je pense que c'est le moyen le plus simple de travailler avec la plupart des CI, où vous pouvez définir des variables d'environnement.

_Maintenant, nous pouvons gérer Fastlane avec la clé API App Store Connect, super !_

### Créer des certificats et des profils de provisionnement

#### Certificats

Ouvrez XCode et accédez à **Paramètres** > **Comptes** > **Identifiant Apple** > **Équipes** et sélectionnez votre équipe.

![Identités de signature de code](/code_signing_identitieswebp)

Cliquez sur **Gérer les certificats** > **+** et sélectionnez **Apple Distribution**

![Distribution Apple](/apple_distributionwebp)

Ensuite, vous pouvez créer un nouveau certificat

Ensuite, vous devez accéder au trousseau pour télécharger le certificat sous forme de fichier « p12 »

Pour ce faire, vous devez accéder au trousseau, passer au trousseau **login**, puis à l'onglet **Mes certificats**.

![Mes certificats](/my_certificateswebp)

Ensuite, vous pouvez sélectionner le certificat que vous souhaitez télécharger (Regardez par la date du certificat)

Ensuite, faites un clic droit sur le certificat et sélectionnez **Exporter**

Choisissez le format de fichier **Échange d'informations personnelles (p12)**

Cela téléchargera le certificat sous forme de fichier « p12 »

#### Profils de provisionnement

Ouvrez [Apple Developer](https://developerapplecom/account/resources/profiles/list) et sélectionnez la bonne équipe

Créez ensuite un nouveau profil, en cliquant sur **++** 

![Créer un nouveau profil](/create_new_profilewebp)

Et sélectionnez **App Store Connect** 

![Sélectionnez App Store Connect](/select_app_store_connectwebp)

Ensuite, vous devez sélectionner la bonne application. Attention, vous ne pouvez pas utiliser de caractère générique, sinon la signature échouera.

![Sélectionnez la bonne application](/select_appwebp)

Sélectionnez le bon certificat que vous avez créé auparavant (recherchez la date d'expiration, il devrait être le même jour et le même mois qu'aujourd'hui) et cliquez sur **Continuer**

![Sélectionnez le bon certificat](/select_certificatewebp)

Entrez enfin le nom du profil et cliquez sur **Générer** 

> Le nom sera utilisé pour identifier le profil dans Fastlane, sous la valeur de `APPLE_PROFILE_NAME`

![Générer le profil](/generate_profilewebp)

Vous pouvez télécharger le profil sous forme de fichier « mobileprovision »

![Télécharger le profil](/download_profilewebp)


### Création de secrets GitHub pour votre certificat et votre profil d'approvisionnement

Le processus de signature implique le stockage des certificats et des profils d'approvisionnement, leur transfert vers le programme d'exécution, leur importation dans le trousseau du programme d'exécution et leur utilisation dans votre build.

Créez des secrets dans votre référentiel ou organisation pour les éléments suivants :

- Votre certificat de signature Apple
    
    - Ceci est votre fichier de certificat `p12`. Pour plus d'informations sur l'exportation de votre certificat de signature depuis Xcode, consultez la [documentation Xcode](https://helpapplecom/xcode/mac/current/#/dev154b28f09)
        
    - Vous devez convertir votre certificat en Base64 lorsque vous l'enregistrez en tant que secret. Dans cet exemple, le secret est nommé `BUILD_CERTIFICATE_BASE64`
        
    - Utilisez la commande suivante pour convertir votre certificat en Base64 et copiez-le dans votre presse-papiers :
        
        ```shell
        base64 -i BUILD_CERTIFICATE.p12 | pbcopy
        ```
        
- Le mot de passe de votre certificat de signature Apple
    
    - Dans cet exemple, le secret est nommé `P12_PASSWORD`
- Votre profil d'approvisionnement Apple
    
    - Pour plus d'informations sur l'exportation de votre profil d'approvisionnement depuis Xcode, consultez la [documentation Xcode](https://helpapplecom/xcode/mac/current/#/deva899b4fe5)
        
    - Vous devez convertir votre profil d'approvisionnement en Base64 lorsque vous l'enregistrez en tant que secret. Dans cet exemple, le secret est nommé « BUILD_PROVISION_PROFILE_BASE64 ».
        
    - Utilisez la commande suivante pour convertir votre profil d'approvisionnement en Base64 et copiez-le dans votre presse-papiers :
        
        ```shell
        base64 -i PROVISIONING_PROFILE.mobileprovision | pbcopy
        ```


## 2\ Copier les fichiers Fastline

Fastlane est une bibliothèque Ruby créée pour automatiser les tâches courantes de développement mobile. En utilisant Fastlane, vous pouvez configurer des « voies » personnalisées qui regroupent une série d'« actions » qui effectuent des tâches que vous effectueriez normalement avec Android Studio. Vous pouvez faire beaucoup de choses avec Fastlane, mais pour les besoins de ce didacticiel, nous n'utiliserons qu'une poignée d'actions principalesCréez un dossier Fastlane à la racine de votre projet et copiez les fichiers suivants :
Fichier rapide
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

## **Traitement de construction**

Dans GitHub Actions, **vous êtes facturé en fonction des minutes** que vous avez utilisées pour exécuter votre flux de travail CI/CD. D'après l'expérience, il faut environ 10 à 15 minutes avant qu'une build puisse être traitée dans App Store Connect.

Pour les projets privés, le coût estimé par build peut aller jusqu'à **008$/min x 15 minutes = 12$**, ou plus, selon la configuration ou les dépendances de votre projet.

Si vous partagez les mêmes préoccupations concernant la tarification que moi pour les projets privés, vous pouvez garder `skip_waiting_for_build_processing` sur `true`

Quel est le piège ? Vous devez mettre à jour manuellement la conformité de votre application dans App Store Connect une fois la build traitée, pour pouvoir distribuer la build à vos utilisateurs.

Il s'agit simplement d'un paramètre facultatif à mettre à jour si vous souhaitez économiser sur les minutes de construction pour les projets privés. Pour les projets gratuits, cela ne devrait pas poser de problème du tout Voir [tarification](https://githubcom/pricing/)


## 3\ Configurer les actions GitHub

**Configurer les secrets GitHub**

Vous êtes-vous déjà demandé d'où viennent les valeurs de « ENV » ? Eh bien, ce n’est plus un secret – cela vient du secret de votre projet 🤦

![Définir les secrets GitHub](/github_secetswebp)

1\ `APP_STORE_CONNECT_TEAM_ID` - l'ID de votre équipe App Store Connect si vous faites partie de plusieurs équipes

2\ `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <YOUR_APP_BUNDLE_IDENTIFIER>`, par exemple `match AppStore comdomainblablademo`

3\ `BUILD_CERTIFICATE_BASE64` - Certificat encodé en Base64

4\ `BUILD_PROVISION_PROFILE_BASE64` - Profil d'approvisionnement encodé en Base64

5\ `BUNDLE_IDENTIFIER` - l'identifiant du bundle de votre application

6\ `APPLE_KEY_ID` — Clé API App Store Connect 🔺ID de clé

7\ `APPLE_ISSUER_ID` — Clé API App Store Connect 🔺Identifiant de l'émetteur

8\ `APPLE_KEY_CONTENT` — Clé API App Store Connect 🔺 Contenu clé de _p8_, [vérifiez-le](https://githubcom/fastlane/fastlane/issues/18655/#issuecomment-881764901)

## **4\ Configurer le fichier de workflow GitHub**

Créer un répertoire de workflow GitHub

```
cd .github/workflows
```

Dans le dossier `workflow`, créez un fichier nommé `build-upload-isyml` et ajoutez ce qui suit

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

Ce workflow doit être déclenché après chaque _tag_ GitHub. Si vous devez automatiser la balise, veuillez d'abord vous référer à [Création et publication automatiques avec les actions GitHub](/blog/automatic-build-and-release-with-github-actions/)

Ensuite, ce workflow extraira vos dépôts NodeJS, les installera et créera votre application JavaScript.

> Chaque fois que vous envoyez un nouveau commit, une version sera construite dans TestFlight

Votre application n'a pas besoin d'utiliser Ionic, seule la base Capacitor est obligatoire, elle peut avoir l'ancien module Cordova, mais le plugin Capacitor JS doit être préféré

## 5\ Déclencher le workflow

**Créer un commit**

Faites un _commit_, vous devriez voir le workflow actif dans le référentiel

**Déclenchez le workflow**

Poussez les nouveaux commits vers la branche « main » ou « developement » pour déclencher le workflow

![Démarré avec commit](/cd_startedwebp)

Après quelques minutes, la version devrait être disponible dans votre tableau de bord App Store Connect

![Tableau de bord Testflight](/testflight_appwebp)

## Peut-on déployer à partir d'une machine locale ?

Oui, vous pouvez, et c'est sans effort

Vous pouvez utiliser Xcode pour créer et signer votre application, comme toujours

### Merci

Ce blog est basé sur les articles suivants :
- [Livraison continue pour IOS à l'aide des actions Fastlane et GitHub](https://litoariasmediumcom/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Documentation Fastlane](https://docsfastlanetools/app-store-connect-api/)
- [Ce message GitHub de @mrogunlana](https://githubcom/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
- [Cette documentation GitHub](https://docsgithubcom/en/actions/deployment/deploying-xcode-applications/installing-an-apple-certificate-on-macos-runners-for-xcode-development)