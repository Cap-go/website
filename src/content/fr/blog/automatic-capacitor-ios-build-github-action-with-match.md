---
slug: automatic-capacitor-ios-build-github-action-with-match
title: >-
  Compilation automatique de Capacitor iOS avec GitHub Actions en utilisant
  match
description: >-
  Comment configurer un pipeline CI/CD pour votre application iOS Ionic avec
  fastlane et GitHub Actions en 5 minutes (2022)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-30T00:00:00.000Z
updated_at: 2024-08-01T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Illustration de l'Action GitHub pour Fastlane TestFlight
tag: CI/CD
published: true
locale: fr
next_blog: automatic-capacitor-android-build-github-action
---

## Livraison Continue pour iOS en utilisant Fastlane et GitHub Actions avec match


## Prérequis

Avant de continuer avec le tutoriel…

-   Assurez-vous d'avoir Fastlane [installé](https://docsfastlanetools/) sur votre machine de développement
-   Adhésion au programme de développeur iOS
-   Envie de lire 😆…
-   Une équipe de nombreux développeurs, sinon nous recommandons d'utiliser [fastlane cert](/blog/automatic-capacitor-ios-build-github-action) pour des flux de travail plus simples

## Important concernant le prix

![Prix GitHub Action](/price_github_actionswebp)

[https://githubcom/features/actions](https://githubcom/features/actions/)

Le service est '_gratuit'_ jusqu'à la limite, selon la machine choisie  
Nous allons utiliser une machine **_macOS_**, vous pouvez voir sur la capture d'écran son prix et ses limites (prix au moment de la création du tutoriel, ils pourraient subir des changements à l'avenir)

🔴 **_Une fois avertis des exigences et des prix, si vous le souhaitez, nous continuons…_**

> **_📣_ Dans cet article, nous supposons que nous avons l'application créée dans iTunes Connect, que nous avons les certificats de l'écosystème Apple, tout sera copié par Fastlane !**

## Passons au vif du sujet 🧑🏽💻

**Étapes à suivre dans l'article**

1. _Utilisation de l'API App Store Connect avec Fastlane Match_
2. _Exigences_
3. _Création d'une clé API App Store Connect_
4. _Utilisation d'une clé API App Store Connect_
5. _Copie des fichiers Fastlane_
6. _Configuration de Fastlane match_

## 1\ Utilisation de l'API App Store Connect avec Fastlane Match

> À partir de février 2021, l'authentification à deux facteurs ou la vérification en deux étapes est requise pour tous les utilisateurs pour se connecter à App Store Connect. Cette couche de sécurité supplémentaire pour votre identifiant Apple aide à garantir que vous êtes la seule personne à pouvoir accéder à votre compte.  
> De [Apple Support](https://developerapplecom/support/authentication/)

> Commencer avec match nécessite de révoquer vos certificats existants. Mais ne vous inquiétez pas, vous aurez directement le nouveau.


## Exigences

Pour pouvoir utiliser l'API App Store Connect, Fastlane a besoin de **trois** éléments

1. ID de l'émetteur
2. ID de la clé
3. Fichier de clé ou contenu de la clé

## Création d'une clé API App Store Connect

Pour générer des clés, vous devez avoir l'autorisation d'administrateur dans App Store Connect. Si vous n'avez pas cette autorisation, vous pouvez diriger la personne concernée vers cet article et suivre les instructions suivantes.

1 — Connectez-vous à [App Store Connect](https://appstoreconnectapplecom/)

2 — Sélectionnez [Utilisateurs et accès](https://appstoreconnectapplecom/access/users/)

![Accès utilisateur App Store Connect](/select_user_accesswebp)

3 — Sélectionnez l'onglet Clés API

![Clés API App Store Connect](/user_access_keyswebp)

4 — Cliquez sur Générer une clé API ou sur le bouton Ajouter (+)

![Création de clés API App Store Connect](/user_accesswebp)

5 — Entrez un nom pour la clé. Le nom est uniquement pour votre référence et ne fait pas partie de la clé elle-même.

![Nom de création de clés API App Store Connect](/gen_keywebp)

6 — Sous Accès, sélectionnez le rôle pour la clé. Les rôles qui s'appliquent aux clés sont les mêmes que ceux qui s'appliquent aux utilisateurs de votre équipe. Voir les [autorisations des rôles](https://helpapplecom/app-store-connect/#/deve5f9a89d7/)

7 — Cliquez sur Générer

> **L'accès d'une clé API ne peut pas être limité à des applications spécifiques**

Le nom de la nouvelle clé, l'ID de la clé, un lien de téléchargement et d'autres informations apparaissent sur la page.

![Téléchargement des clés App Store Connect](/download_keywebp)

Vous pouvez récupérer ici les trois informations nécessaires  
<1> ID de l'émetteur  
<2> ID de la clé  
<3> Cliquez sur "Télécharger la clé API" pour télécharger votre clé privée API. Le lien de téléchargement n'apparaît que si la clé privée n'a pas encore été téléchargée. Apple ne conserve pas de copie de la clé privée. Vous ne pouvez donc la télécharger qu'une seule fois.

> _🔴_ Stockez votre clé privée dans un endroit sûr. Vous ne devez jamais partager vos clés, les stocker dans un dépôt de code ou inclure des clés dans le code côté client.

## Utilisation d'une clé API App Store Connect

Le fichier de clé API (fichier p8 que vous téléchargez), l'ID de la clé et l'ID de l'émetteur sont nécessaires pour créer le jeton JWT pour l'autorisation.Il existe plusieurs façons d'entrer ces informations dans Fastlane en utilisant la nouvelle action de Fastlane, `app_store_connect_api_key`. Vous pouvez découvrir d'autres méthodes dans la documentation de Fastlane. Je montre cette méthode car je pense que c'est la façon la plus simple de travailler avec la plupart des CI, où vous pouvez définir des variables d'environnement.

_Maintenant, nous pouvons gérer Fastlane avec la clé API App Store Connect, super !_

## 2. Copier les fichiers Fastlane

Fastlane est une bibliothèque Ruby créée pour automatiser les tâches courantes de développement mobile. Avec Fastlane, vous pouvez configurer des "lanes" personnalisées qui regroupent une série d'"actions" qui effectuent des tâches que vous feriez normalement avec Android Studio. Vous pouvez faire beaucoup avec Fastlane, mais pour les besoins de ce tutoriel, nous n'utiliserons qu'une poignée d'actions de base.

Créez un dossier Fastlane à la racine de votre projet et copiez les fichiers suivants :

## Configurer Fastlane match

Fastlane match est une nouvelle approche de la signature de code iOS. Fastlane match facilite la gestion des certificats et des profils de provisionnement requis pour vos applications iOS par les équipes.

Créez un nouveau dépôt privé nommé `certificates`, par exemple sur votre compte personnel GitHub ou votre organisation.

Initialisez Fastlane match pour votre application iOS.

Puis sélectionnez l'option #1 (Stockage Git)

Attribuez l'URL du dépôt nouvellement créé

> Vous avez maintenant dans le dossier Fastlane un fichier nommé **_Matchfile_** et `_git_url_` devrait être défini sur l'URL HTTPS du dépôt des certificats. Vous pouvez également utiliser SSH en option, mais cela nécessite une étape différente à exécuter.

Ensuite, nous allons générer les certificats et entrer vos identifiants lorsque demandé avec Fastlane Match.

On vous demandera d'entrer une phrase secrète. Souvenez-vous-en correctement car elle sera utilisée plus tard par GitHub Actions pour déchiffrer votre dépôt de certificats.

Si tout s'est bien passé, vous devriez voir quelque chose comme ça :

> Si vous avez rencontré des problèmes avec GitHub et les autorisations nécessaires, peut-être que ce post vous aidera à générer des jetons d'authentification pour git.

Les certificats et profils de provisionnement générés sont téléchargés dans les ressources du dépôt des certificats.

Enfin, ouvrez votre `projet` dans Xcode et mettez à jour le profil de provisionnement pour la configuration de publication de votre application.

## Quelques points à noter 💡

## MATCH

Pour que le CI/CD importe les certificats et les profils de provisionnement, il doit avoir accès au dépôt des certificats. Vous pouvez le faire en générant un jeton d'accès personnel (devrait être utilisé avant) qui a la portée pour accéder ou lire les dépôts privés.

Dans GitHub, allez dans **Paramètres** → **Paramètres du développeur** → **Jetons d'accès personnels** → cliquez sur `Générer un nouveau jeton` → cochez la portée `repo` → puis cliquez sur `Générer un jeton`.

Gardez une copie du jeton d'accès personnel généré. Vous l'utiliserez plus tard pour la variable d'environnement `GIT_TOKEN`.

Ensuite, remplacez votre fichier match généré dans le dossier Fastlane par 
Matchfile

Cela sera utilisé par GitHub Actions pour importer les certificats et les profils de provisionnement.
Et la variable sera définie dans les Secrets GitHub, au lieu d'être codée en dur dans le fichier.

## Traitement des builds

Dans GitHub Actions, **vous êtes facturé en fonction des minutes** que vous avez utilisées pour exécuter votre workflow CI/CD. D'après l'expérience, il faut environ 10 à 15 minutes avant qu'un build puisse être traité dans App Store Connect.

Pour les projets privés, le coût estimé par build peut atteindre **0,08 $/min x 15 min = 1,2 $**, ou plus, selon la configuration ou les dépendances de votre projet.Si vous partagez les mêmes préoccupations que moi concernant la tarification pour les projets privés, vous pouvez garder `skip_waiting_for_build_processing` à `true`

Quel est l'inconvénient ? Vous devez mettre à jour manuellement la conformité de votre application dans App Store Connect une fois que la compilation a été traitée, pour pouvoir distribuer la version à vos utilisateurs

Il s'agit simplement d'un paramètre optionnel à mettre à jour si vous souhaitez économiser sur les minutes de compilation pour les projets privés. Pour les projets gratuits, cela ne devrait pas poser de problème du tout. Voir [tarification](https://githubcom/pricing/)

## 3. Configurer GitHub Actions

**Configurer les secrets GitHub**

Vous vous êtes déjà demandé d'où viennent les valeurs des `ENV` ? Eh bien, ce n'est plus un secret - elles viennent des secrets de votre projet 🤦

![Définir les secrets GitHub](/github_secetswebp)

1. `APP_STORE_CONNECT_TEAM_ID` - l'ID de votre équipe App Store Connect si vous faites partie de plusieurs équipes

2. `DEVELOPER_APP_ID` - dans App Store Connect, allez dans l'application → **Informations sur l'application** → Faites défiler jusqu'à la section `Informations générales` de votre application et recherchez `Apple ID`

3. `DEVELOPER_APP_IDENTIFIER` - l'identifiant de bundle de votre application

4. `DEVELOPER_PORTAL_TEAM_ID` - l'ID de votre équipe du portail développeur si vous faites partie de plusieurs équipes

5. `FASTLANE_APPLE_ID` - l'identifiant Apple ou l'e-mail de développeur que vous utilisez pour gérer l'application

6. `GIT_USERNAME` & `GIT_TOKEN` - Votre nom d'utilisateur git et votre jeton d'accès personnel

7. `MATCH_PASSWORD` - la phrase secrète que vous avez attribuée lors de l'initialisation de match, sera utilisée pour déchiffrer les certificats et les profils de provisionnement

8. `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <YOUR_CERTIFICATES_REPO_URL>`, par exemple `match AppStore comdomainblablademo`

9. `TEMP_KEYCHAIN_USER` & `TEMP_KEYCHAIN_PASSWORD` - attribuez un utilisateur et un mot de passe temporaires pour votre workflow

10. `APPLE_KEY_ID` — Clé API App Store Connect 🔺ID de clé

11. `APPLE_ISSUER_ID` — Clé API App Store Connect 🔺ID d'émetteur

12. `APPLE_KEY_CONTENT` — Clé API App Store Connect 🔺 Fichier de clé ou contenu de la clé _p8_, [vérifiez-le](https://githubcom/fastlane/fastlane/issues/18655/#issuecomment-881764901)
<YOUR_APP_BUNDLE_IDENTIFIER>
13. `CERTIFICATE_STORE_URL` — L'URL du dépôt de vos clés Match (ex : https://githubcom/***/fastlane_matchgit)

## **4. Configurer le fichier de workflow GitHub**

Créez un répertoire de workflow GitHub

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

Dans le dossier `workflow`, créez un fichier nommé `build-upload-iosyml` et ajoutez ce qui suit

```ruby
app_identifier(ENV["DEVELOPER_APP_IDENTIFIER"])
apple_id(ENV["FASTLANE_APPLE_ID"])
itc_team_id(ENV["APP_STORE_CONNECT_TEAM_ID"])
team_id(ENV["DEVELOPER_PORTAL_TEAM_ID"])
```

Ce workflow devrait être déclenché après chaque _tag_ GitHub, si vous avez besoin d'automatiser le tag, veuillez vous référer d'abord à [Construction et publication automatiques avec les actions GitHub](/blog/automatic-build-and-release-with-github-actions/)

Ensuite, ce workflow extraira vos dépendances NodeJS, les installera et compilera votre application JavaScript

> Chaque fois que vous envoyez un nouveau commit, une version sera construite dans TestFlight

Votre application n'a pas besoin d'utiliser Ionic, seule la base Capacitor est obligatoire, elle peut avoir d'anciens modules Cordova, mais les plugins JS Capacitor devraient être préférés

## 5. Déclencher le workflow

**Créer un commit**

Faites un _commit_, vous devriez voir le workflow actif dans le dépôt

**Déclencher le workflow**

Poussez les nouveaux commits vers la branche `main` ou `developement` pour déclencher le workflow

![Commencé avec le commit](/cd_startedwebp)

Après quelques minutes, la version devrait être disponible dans votre tableau de bord App Store Connect

![Tableau de bord Testflight](/testflight_appwebp)

## Peut-on déployer depuis une machine locale ?

Oui, vous pouvez, et c'est très simple

Imaginez que vous ayez un dépôt privé, que vous ayez épuisé les minutes du plan gratuit et que vous ne souhaitiez pas payer pour de nouvelles versions, ou peut-être préférez-vous soumettre l'application manuellement

**_Allons-y_**

Ok, d'abord nous devons créer dans le chemin **_my\_project\_path/fastlane_** un fichier appelé **_env,_** juste dans le même chemin que _Fastfile,_ pour pouvoir créer les mêmes propriétés _secrètes_ trouvées dans notre _GitHub,_ comme ci-dessous :

fichier env pour le déploiement depuis une machine locale

Maintenant, vous pouvez aller dans le _terminal_ et lancer _Fastlane_ depuis votre machine :

```shell
fastlane match init
```

> **❌ Essentiel à propos du**fichier env_, **comme nous préférons ne pas exposer ces données, nous devons l'ajouter à notre** _gitignore_**, quelque chose comme ça : ❌**

```
[01:00:00]: fastlane match supports multiple storage modes, please select the one you want to use:1. git2. google_cloud3. s3?
```

Cela devrait fonctionner de la même manière que depuis GitHub Actions sur la machine distante mais sur notre machine locale 🍻

![Exécution locale de Fastlane](/local_fastlanewebp)

Exécution dans le terminal : $ Fastlane closed\_beta

**_Si vous êtes arrivé jusqu'ici, mes félicitations, vous disposez maintenant d'un processus entièrement automatisé pour vos applications iOS avec Fastlane et GitHub Actions_**

> Chaque fois que vous envoyez un nouveau commit, une version sera créée dans la console Google Play, canal bêta
J'améliorerai ce blog avec vos retours, si vous avez des questions ou des suggestions, n'hésitez pas à me contacter par email martin@capgoapp

### Construire sur votre appareil

Si vous avez encore besoin de construire sur votre appareil, vous devez les ajouter manuellement au provisionnement
Connectez votre appareil à votre mac et ouvrez le menu des appareils
![trouver le menu ios de l'appareil](/find_ios_devicewebp)
Ensuite, copiez votre identifiant 
![trouver l'identifiant ios](/find_ios_identifierwebp)
Puis lancez la commande :
`fastlane register_new_device`
elle vous demandera de définir un nom d'appareil et l'identifiant :
![définir l'identifiant ios](/set_identifierwebp)

### Si vous rencontrez des problèmes

Si vous avez des problèmes avec l'appareil de développement qui ne peut pas tester, etc., cela le résout généralement

Il existe une commande magique qui peut vous sauver :
```
[01:00:00]: Please create a new, private git repository to store the certificates and profiles there[01:00:00]: URL of the Git Repo: <YOUR_CERTIFICATES_REPO_URL>
```

Ensuite :
Nettoyez le projet en maintenant Shift(⇧)+Command(⌘)+K ou en sélectionnant Produit > Nettoyer (cela peut être étiqueté "Nettoyer le dossier de construction")

Puis essayez de relancer l'application sur votre appareil

### Remerciements

Ce blog est basé sur les articles suivants :
- [Livraison continue pour iOS en utilisant Fastlane et GitHub actions](https://litoariasmediumcom/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Documentation Fastlane](https://docsfastlanetools/app-store-connect-api/)
- [Ce message GitHub de @mrogunlana](https://githubcom/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)