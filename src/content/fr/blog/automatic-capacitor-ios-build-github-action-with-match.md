---
slug: automatic-capacitor-ios-build-github-action-with-match
title: >-
  Compilation automatique de Capacitor IOS avec des applications de GitHub en
  utilisant Match
description: >-
  Comment configurer une canalisation de CI/CD pour votre application IOS Ionic
  en utilisant Fastlane et GitHub Actions en 5 minutes (2022)
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-30T00:00:00.000Z
updated_at: 2024-08-01T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Fastlane testflight GitHub action illustration
tag: CI/CD
published: true
next_blog: automatic-capacitor-android-build-github-action
locale: fr
---

## Livraison continue pour iOS à l'aide d'actions Fastlane et GitHub à l'aide de match


## Prérequis

Avant de poursuivre le tutoriel…

- Assurez-vous que Fastlane est [installé](https://docsfastlanetools/) sur votre machine de développement
- Adhésion au programme pour développeurs iOS
- Envie de lire 😆…
- Une équipe composée de nombreux développeurs, sinon nous recommandons d'utiliser [fastlane cert](/blog/automatic-capacitor-ios-build-github-action) pour des flux de travail plus simples

## Important concernant le prix

![Prix de l'action GitHub](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

Le service est « _gratuit »_ dans la limite, en fonction de la machine choisie  
Nous allons utiliser une machine **_macOS_**, vous pouvez voir sur la capture d'écran son prix et ses limites (tarifs dès la création du tutoriel, ils pourraient subir des modifications dans le futur)

🔴 **_Une fois prévenus des besoins et des tarifs, si vous le souhaitez, on continue…_**

> **_📣_ Dans le post, nous supposons que nous avons l'application créée dans iTunes Connect, nous avons les certificats de l'écosystème Apple, tout sera copié par Fastlane !**

## Allons au désordre 🧑🏽💻

**Étapes à suivre dans le post**

1 _Utilisation de l'API App Store Connect avec Fastlane Match_
2 _Exigences_
3 _Création d'une clé API App Store Connect_
4 _Utiliser une clé API App Store Connect_
5 _Copier les fichiers Fastline_
6 _Configurer les matchs Fastlane_
6 _Configurer les matchs Fastlane_

## 1\ Utilisation de l'API App Store Connect avec Fastlane Match

> À partir de février 2021, une authentification à deux facteurs ou une vérification en deux étapes est requise pour que tous les utilisateurs puissent se connecter à App Store Connect. Cette couche de sécurité supplémentaire pour votre identifiant Apple permet de garantir que vous êtes la seule personne à pouvoir accéder à votre compte.  
> Depuis [Assistance Apple](https://developerapplecom/support/authentication/)

> La mise en route de match vous oblige à révoquer vos certificats existants. Mais pas d'inquiétude, vous aurez directement le nouveau


## Exigences

Pour pouvoir utiliser l'API App Store Connect, Fastlane a besoin de **trois** éléments

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

6 — Sous Accès, sélectionnez le rôle pour la clé. Les rôles qui s'appliquent aux clés sont les mêmes que ceux qui s'appliquent aux utilisateurs de votre équipe Voir [autorisations de rôle](https://helpapplecom/app-store-connect/#/deve5f9a89d7/ )

7 — Cliquez sur Générer

> **L'accès à une clé API ne peut pas être limité à des applications spécifiques**

Le nom de la nouvelle clé, l'ID de la clé, un lien de téléchargement et d'autres informations apparaissent sur la page

![Clés de téléchargement App Store Connect](/download_keywebp)

Vous pouvez récupérer les trois informations nécessaires ici  
<1> ID du problème  
<2> ID de clé  
<3> Cliquez sur « Télécharger la clé API » pour télécharger votre clé privée API Le lien de téléchargement n'apparaît que si la clé privée n'a pas encore été téléchargée Apple ne conserve pas de copie de la clé privée Vous ne pouvez donc la télécharger qu'une seule fois

> _🔴_ Stockez votre clé privée dans un endroit sûr Vous ne devez jamais partager vos clés, stocker des clés dans un référentiel de code ou inclure des clés dans le code côté client

## Utilisation d'une clé API App Store Connect

Le fichier de clé API (fichier p8 que vous téléchargez), l'ID de clé et l'ID d'émetteur sont nécessaires pour créer le jeton JWT pour l'autorisation.Il existe plusieurs façons de saisir ces informations dans Fastlane à l'aide de la nouvelle action de Fastlane, `app_store_connect_api_key`. Vous pouvez découvrir d'autres manières dans la [documentation Fastlane](https://docsfastlanetools/actions/app_store_connect_api_key/) Je montre cette méthode parce que je je pense que c'est le moyen le plus simple de travailler avec la plupart des CI, où vous pouvez définir des variables d'environnement

_Maintenant, nous pouvons gérer Fastlane avec la clé API App Store Connect, super !_

## 2\ Copier les fichiers Fastline

Fastlane est une bibliothèque Ruby créée pour automatiser les tâches courantes de développement mobile. En utilisant Fastlane, vous pouvez configurer des « voies » personnalisées qui regroupent une série d'« actions » qui effectuent des tâches que vous effectueriez normalement avec Android Studio. Vous pouvez faire beaucoup de choses avec Fastlane, mais pour les besoins de ce didacticiel, nous n'utiliserons qu'une poignée d'actions principales


Créez un dossier Fastlane à la racine de votre projet et copiez les fichiers suivants :
Fichier rapide
```ruby
default_platform(:ios)

DEVELOPER_APP_IDENTIFIER = ENV["DEVELOPER_APP_IDENTIFIER"]
DEVELOPER_APP_ID = ENV["DEVELOPER_APP_ID"]
PROVISIONING_PROFILE_SPECIFIER = ENV["PROVISIONING_PROFILE_SPECIFIER"]
TEMP_KEYCHAIN_USER = ENV["TEMP_KEYCHAIN_USER"]
TEMP_KEYCHAIN_PASSWORD = ENV["TEMP_KEYCHAIN_PASSWORD"]
APPLE_ISSUER_ID = ENV["APPLE_ISSUER_ID"]
APPLE_KEY_ID = ENV["APPLE_KEY_ID"]
APPLE_KEY_CONTENT = ENV["APPLE_KEY_CONTENT"]
GIT_USERNAME = ENV["GIT_USERNAME"]
GIT_TOKEN = ENV["GIT_TOKEN"]

def delete_temp_keychain(name)
  delete_keychain(
    name: name
  ) if File.exist? File.expand_path("~/Library/Keychains/#{name}-db")
end

def create_temp_keychain(name, password)
  create_keychain(
    name: name,
    password: password,
    unlock: false,
    timeout: 0
  )
end

def ensure_temp_keychain(name, password)
  delete_temp_keychain(name)
  create_temp_keychain(name, password)
end

platform :ios do
  lane :build do
    build_app(
      configuration: "Release",
      workspace: "./ios/App/App.xcworkspace",
      scheme: "App",
      export_method: "app-store",
      export_options: {
        provisioningProfiles: { 
            DEVELOPER_APP_ID => "#{PROVISIONING_PROFILE_SPECIFIER}"
        }
      }
    )
  end
  lane :refresh_profiles do
    match(
      type: "development",
      force: true)
    match(
      type: "adhoc",
      force: true)
  end
  desc "Register new device"
  lane :register_new_device do  |options|
      device_name = prompt(text: "Enter the device name: ")
      device_udid = prompt(text: "Enter the device UDID: ")
      device_hash = {}
      device_hash[device_name] = device_udid
      register_devices(
                       devices: device_hash
                       )
    refresh_profiles
  end
  lane :closed_beta do
    keychain_name = TEMP_KEYCHAIN_USER
    keychain_password = TEMP_KEYCHAIN_PASSWORD
    ensure_temp_keychain(keychain_name, keychain_password)

    api_key = app_store_connect_api_key(
      key_id: APPLE_KEY_ID,
      issuer_id: APPLE_ISSUER_ID,
      key_content: APPLE_KEY_CONTENT,            
      duration: 1200,            
      in_house: false
    )

    match(
      type: 'appstore',
      git_basic_authorization: Base64.strict_encode64("#{GIT_USERNAME}:#{GIT_TOKEN}"),
      readonly: true,
      keychain_name: keychain_name,
      keychain_password: keychain_password,
      api_key: api_key
    )

    gym(
      configuration: "Release",
      workspace: "./ios/App/App.xcworkspace",
      scheme: "App",
      export_method: "app-store",
      export_options: {
        provisioningProfiles: { 
            DEVELOPER_APP_ID => "#{PROVISIONING_PROFILE_SPECIFIER}"
        }
      }
    )

    pilot(
      apple_id: "#{DEVELOPER_APP_ID}",
      app_identifier: "#{DEVELOPER_APP_IDENTIFIER}",
      skip_waiting_for_build_processing: true,
      skip_submission: true,
      distribute_external: false,
      notify_external_testers: false,
      ipa: "./App.ipa"
    )

    delete_temp_keychain(keychain_name)
  end
  lane :submit_review do
    version = ''
    Dir.chdir("..") do
      file = File.read("package.json")
      data = JSON.parse(file)
      version = data["version"]
    end
    deliver(
      app_version: version,
      submit_for_review: true,
      automatic_release: true,
      force: true, # Skip HTMl report verification
      skip_metadata: false,
      skip_screenshots: false,
      skip_binary_upload: true
    )
  end
end
```

Fichier d'application
```ruby
app_identifier(ENV["DEVELOPER_APP_IDENTIFIER"])
apple_id(ENV["FASTLANE_APPLE_ID"])
itc_team_id(ENV["APP_STORE_CONNECT_TEAM_ID"])
team_id(ENV["DEVELOPER_PORTAL_TEAM_ID"])
```

## **Configurer la correspondance Fastlane**

Fastlane [match](https://docsfastlanetools/actions/match/) est une nouvelle approche de la signature de code iOS. Fastlane Match permet aux équipes de gérer facilement les certificats et les profils d'approvisionnement requis pour vos applications iOS.

Créez un nouveau référentiel privé nommé « certificats », par exemple sur votre compte personnel ou votre organisation GitHub.

Initialisez la correspondance Fastlane pour votre application iOS

```shell
fastlane match init
```

Sélectionnez ensuite l'option n°1 (Git Storage)

```
[01:00:00]: fastlane match supports multiple storage modes, please select the one you want to use:1. git2. google_cloud3. s3?
```

Attribuer l'URL du référentiel nouvellement créé

```
[01:00:00]: Please create a new, private git repository to store the certificates and profiles there[01:00:00]: URL of the Git Repo: <YOUR_CERTIFICATES_REPO_URL>
```

> Vous avez maintenant dans le dossier Fastlane un fichier nommé **_Matchfile_** et `_git_url_` doit être défini sur l'URL HTTPS du référentiel de certificats. En option, vous pouvez également utiliser SSH, mais son exécution nécessite une étape différente.

```
# ios/Matchfilegit_url("https://github.com/gitusername/certificates")storage_mode("git")type("appstore")
```

Ensuite, nous allons générer les certificats et saisir vos informations d'identification lorsque cela vous est demandé avec Fastlane Match

Vous serez invité à saisir une phrase secrète. Mémorisez-la correctement car elle sera utilisée ultérieurement par GitHub Actions pour décrypter votre référentiel de certificats.

```
fastlane match appstore
```

Si tout s'est bien passé, vous devriez voir quelque chose comme ça :

```
[01:40:52]: All required keys, certificates and provisioning profiles are installed 🙌
```

> Si vous rencontrez un problème avec GitHub et les autorisations nécessaires, peut-être que ce [post](https://mediumcom/@litoarias/token-authentication-requirements-for-git-operations-5fdd8a6f6e7c/) vous aidera à générer des jetons d'authentification pour git

Les certificats générés et les profils de provisionnement sont téléchargés vers les ressources du référentiel de certificats

![Certificats App Store Connect](/certificateswebp)


Enfin, ouvrez votre « projet » dans Xcode et mettez à jour le profil d'approvisionnement pour la configuration de la version de votre application

![Certificats XCode](/xcode_certwebp)

## Peu de choses à noter 💡

## CORRESPONDRE

Pour que le CI/CD importe les certificats et les profils d'approvisionnement, il doit avoir accès au référentiel de certificats. Vous pouvez le faire en générant un jeton d'accès personnel (doit être utilisé auparavant) qui a la possibilité d'accéder ou de lire des référentiels privés.

Dans GitHub, accédez à **Paramètres** → **Paramètres du développeur** → **Jetons d'accès personnels** → cliquez sur « Générer un nouveau jeton » → cochez la portée « repo » → puis cliquez sur « Générer un jeton »

![Créer un jeton d'accès personnel](/personal_access_tokenwebp)

Avoir une copie du jeton d'accès personnel généré Vous l'utiliserez plus tard pour la variable d'environnement `GIT_TOKEN`

Remplacez ensuite votre fichier de correspondance généré dans le dossier Fastlane par 
Fichier de correspondance
```ruby
CERTIFICATE_STORE_URL = ENV["CERTIFICATE_STORE_URL"]
GIT_USERNAME = ENV["GIT_USERNAME"]
GIT_TOKEN = ENV["GIT_TOKEN"]
FASTLANE_APPLE_ID = ENV["FASTLANE_APPLE_ID"]

git_url(CERTIFICATE_STORE_URL)
storage_mode("git")
type("appstore")
git_basic_authorization(Base64.strict_encode64("#{GIT_USERNAME}:#{GIT_TOKEN}"))
username(FASTLANE_APPLE_ID)
```
Ceci sera utilisé par GitHub Actions pour importer les certificats et les profils d'approvisionnement
Et var sera défini dans GitHub Secrets, au lieu de les coder en dur dans le fichier


## **Traitement de construction**

Dans GitHub Actions, **vous êtes facturé en fonction des minutes** que vous avez utilisées pour exécuter votre flux de travail CI/CD. D'après l'expérience, il faut environ 10 à 15 minutes avant qu'une build puisse être traitée dans App Store Connect.

Pour les projets privés, le coût estimé par build peut aller jusqu'à **008$/min x 15 minutes = 12$**, ou plus, selon la configuration ou les dépendances de votre projet.Si vous partagez les mêmes préoccupations concernant la tarification que moi pour les projets privés, vous pouvez garder `skip_waiting_for_build_processing` sur `true`

Quel est le piège ? Vous devez mettre à jour manuellement la conformité de votre application dans App Store Connect une fois la build traitée, pour pouvoir distribuer la build à vos utilisateurs.

Il s'agit simplement d'un paramètre facultatif à mettre à jour si vous souhaitez économiser sur les minutes de construction pour les projets privés. Pour les projets gratuits, cela ne devrait pas poser de problème du tout Voir [tarification](https://githubcom/pricing/)


## 3\ Configurer les actions GitHub

**Configurer les secrets GitHub**

Vous êtes-vous déjà demandé d'où viennent les valeurs de « ENV » ? Eh bien, ce n’est plus un secret – cela vient du secret de votre projet 🤦

![Définir les secrets GitHub](/github_secetswebp)

1\ `APP_STORE_CONNECT_TEAM_ID` - l'ID de votre équipe App Store Connect si vous faites partie de plusieurs équipes

2\ `DEVELOPER_APP_ID` ​​- dans App Store Connect, accédez à l'application → **Informations sur l'application** → Faites défiler jusqu'à la section `Informations générales` de votre application et recherchez `identifiant Apple`

3\ `DEVELOPER_APP_IDENTIFIER` - l'identifiant du bundle de votre application

4\ `DEVELOPER_PORTAL_TEAM_ID` - l'ID de votre équipe du portail de développeur si vous faites partie de plusieurs équipes

5\ `FASTLANE_APPLE_ID` - l'identifiant Apple ou l'e-mail du développeur que vous utilisez pour gérer l'application

6\ `GIT_USERNAME` & `GIT_TOKEN` - Votre nom d'utilisateur git et votre jeton d'accès personnel

7\ `MATCH_PASSWORD` - la phrase secrète que vous avez attribuée lors de l'initialisation de la correspondance, sera utilisée pour déchiffrer les certificats et les profils d'approvisionnement

8\ `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <YOUR_APP_BUNDLE_IDENTIFIER>`, par exemple `match AppStore comdomainblablademo`

9\ `TEMP_KEYCHAIN_USER` & `TEMP_KEYCHAIN_PASSWORD` - attribuez un utilisateur de trousseau temporaire et un mot de passe pour votre flux de travail

10\ `APPLE_KEY_ID` — Clé API App Store Connect 🔺ID de clé

11\ `APPLE_ISSUER_ID` — Clé API App Store Connect 🔺Identifiant de l'émetteur

12\ `APPLE_KEY_CONTENT` — Clé API App Store Connect 🔺 Fichier clé ou contenu clé de _p8_, [vérifiez-le](https://githubcom/fastlane/fastlane/issues/18655/#issuecomment-881764901)
<!-- markdown-link-check-disable-next-line -->
13\ `CERTIFICATE_STORE_URL` — L'URL du dépôt de vos clés de correspondance (ex : https://githubcom/***/fastlane_matchgit)

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
      - name: Use Node.js 16
        uses: actions/setup-node@v3
        with:
          node-version: 16
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
          ruby-version: 2.7.2
      - uses: maierj/fastlane-action@v2.3.0
        env:
          DEVELOPER_APP_IDENTIFIER: ${{ secrets.DEVELOPER_APP_IDENTIFIER }}
          DEVELOPER_APP_ID: ${{ secrets.DEVELOPER_APP_ID }}
          PROVISIONING_PROFILE_SPECIFIER: match AppStore ${{ secrets.DEVELOPER_APP_IDENTIFIER }}
          TEMP_KEYCHAIN_USER: ${{ secrets.TEMP_KEYCHAIN_USER }}
          TEMP_KEYCHAIN_PASSWORD: ${{ secrets.TEMP_KEYCHAIN_PASSWORD }}
          APPLE_ISSUER_ID: ${{ secrets.APPLE_ISSUER_ID }}
          APPLE_KEY_ID: ${{ secrets.APPLE_KEY_ID }}
          APPLE_KEY_CONTENT: ${{ secrets.APPLE_KEY_CONTENT }}
          CERTIFICATE_STORE_URL: https://github.com/${{ secrets.CERTIFICATE_STORE_REPO }}.git
          GIT_USERNAME: ${{ secrets.GIT_USERNAME }}
          GIT_TOKEN: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
          FASTLANE_APPLE_ID: ${{ secrets.FASTLANE_APPLE_ID }}
          MATCH_USERNAME: ${{ secrets.FASTLANE_APPLE_ID }}
          MATCH_PASSWORD: ${{ secrets.MATCH_PASSWORD }}
          APP_STORE_CONNECT_TEAM_ID: ${{ secrets.APP_STORE_CONNECT_TEAM_ID }}
          DEVELOPER_PORTAL_TEAM_ID: ${{ secrets.DEVELOPER_PORTAL_TEAM_ID }}
        with:
          lane: closed_beta
      - name: Upload release bundle
        uses: actions/upload-artifact@v2
        with:
          name: ios-release
          path: ./App.ipa
          retention-days: 60
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

Imaginez que vous disposez d'un référentiel privé, que vous avez épuisé les minutes du plan gratuit et que vous ne souhaitez pas payer pour les nouvelles versions, ou peut-être préférez-vous soumettre la candidature manuellement.

**_C'est parti_**

Ok, nous devons d'abord créer dans le chemin **_my\_project\_path/fastlane_** un fichier appelé **_env,_** juste dans le même chemin que _Fastfile,_ pour pouvoir créer les mêmes propriétés _secret_ trouvées dans notre _GitHub, ci-dessous :

fichier env pour le déploiement à partir de la machine locale

Maintenant, vous pouvez vous rendre sur le _terminal_ et lancer le _Fastlane_ depuis votre machine :

```
fastlane closed_beta
```

> **❌ L'essentiel sur le** _env_ **fichier, comme nous préférons ne pas exposer ces données, nous devons les ajouter dans notre** _gitignore_**, quelque chose comme ça : ❌**

```
fastlane/*.env
```

Cela devrait fonctionner de la même manière que depuis GitHub Actions sur la machine distante mais sur notre machine locale 🍻

![Exécution locale de Fastlane](/local_fastlanewebp)

Exécution du terminal : $ Fastlane fermé\_beta

**_Si vous êtes arrivé jusqu'ici, mes félicitations, vous disposez désormais d'un processus entièrement automatisé pour vos applications iOS avec Fastlane et GitHub Actions_**

> Chaque fois que vous envoyez un nouveau commit, une version sera créée dans la console Google Play, canal bêta
J'améliorerai ce blog avec vos retours, si vous avez des questions ou des suggestions, n'hésitez pas à me le faire savoir par email martin@capgoapp

### Créez sur votre appareil

Si vous avez encore besoin de développer votre appareil, vous devez les ajouter manuellement au provisionnement.
Connectez votre appareil à votre Mac et ouvrez le menu de l'appareil
![Trouver le menu iOS de l'appareil](/find_ios_devicewebp)
Copiez ensuite votre identifiant 
![trouver l'identifiant ios](/find_ios_identifierwebp)
Et puis lancez la commande :
`fastlane register_new_device`
il vous demandera de définir un nom d'appareil et un identifiant :
![définir l'identifiant ios](/set_identifierwebp)

### si tu as des problèmes

Si vous rencontrez un problème avec le périphérique de développement, vous ne pouvez pas tester, etc., cela le résout généralement

Il existe une commande magique qui peut vous sauver :
```shell
fastlane match nuke development
fastlane match development
```

Alors :
Nettoyez le projet en maintenant Shift(⇧)+Command(⌘)+K ou en sélectionnant Produit > Nettoyer (il peut être intitulé « Clean Build Folder »).

Essayez ensuite de réexécuter l'application sur votre appareil

### Merci

Ce blog est basé sur les articles suivants :
- [Livraison continue pour IOS à l'aide des actions Fastlane et GitHub](https://litoariasmediumcom/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Documentation Fastlane](https://docsfastlanetools/app-store-connect-api/)
- [Ce message GitHub de @mrogunlana](https://githubcom/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)