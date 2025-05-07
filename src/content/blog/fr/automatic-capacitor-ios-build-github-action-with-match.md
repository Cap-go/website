---
slug: génération-ios-automatique-capacitor-avec-github-action-et-match
title: Kompilasi iOS Capacitor Otomatis dengan GitHub Actions menggunakan match
description: >-
  Cara Menyiapkan Pipeline CI/CD untuk Aplikasi iOS Ionic Menggunakan fastlane
  dan GitHub Actions dalam 5 Menit (2022)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-30T00:00:00.000Z
updated_at: 2024-08-01T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Ilustrasi GitHub Action Fastlane testflight
keywords: 'Fastlane, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: id
next_blog: automatic-capacitor-android-build-github-action
---
# Builds iOS automatiques avec GitHub Actions en utilisant Match

La configuration de CI/CD pour les applications Capacitor peut être complexe et chronophage. Voici ce que vous devez savoir :

## Prérequis

Avant de commencer, vous aurez besoin de :

- Un compte GitHub avec accès administrateur
- Une adhésion au programme développeur iOS 
- Un accès API App Store Connect avec les permissions appropriées
- Une compréhension des workflows GitHub Actions
- Des connaissances de la configuration Fastlane et Match
- Du temps pour maintenir et déboguer le pipeline
- Une équipe de plusieurs développeurs, sinon nous recommandons d'utiliser [fastlane cert](/blog/automatic-capacitor-ios-build-github-action) pour des workflows plus simples

## Configuration CI/CD professionnelle par Capgo

Évitez la complexité. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) configure votre pipeline CI/CD directement sur votre plateforme préférée :

- **Indépendance de la plateforme** : Fonctionne avec GitHub Actions, GitLab CI ou autres
- **Intégration transparente** : Pas besoin de changer de plateforme, fonctionne avec votre processus actuel
- **Configuration sur mesure** : Installation personnalisée selon les besoins de votre projet
- **Conseils d'experts** : Nous avons déjà configuré CI/CD pour plus de 50 applications

### Tarification
- Frais de configuration uniques : 2 600 $
- Vos coûts de fonctionnement : ~300 $/an
- Comparé aux autres solutions propriétaires : 6 000 $/an
- **Économisez 26 100 $ sur 5 ans**

[Configurer CI/CD maintenant](https://cal.com/martindonadieu/mobile-ci-cd-done-for-you/)

## Guide de configuration manuelle

Si vous souhaitez tout configurer vous-même, voici ce que vous devez faire :

## Livraison continue pour iOS avec Fastlane et GitHub Actions en utilisant match

## Prérequis

Avant de continuer avec le tutoriel...

- Assurez-vous d'avoir Fastlane [installé](https://docs.fastlane.tools/) sur votre machine de développement.
- Adhésion au programme développeur iOS.
- Envie de lire 😆...
- Une équipe de plusieurs développeurs, sinon nous recommandons d'utiliser [fastlane cert](/blog/automatic-capacitor-ios-build-github-action) pour des workflows plus simples.

## Important concernant le prix

![Prix GitHub Action](/price_github_actions.webp)

[https://github.com/features/actions](https://github.com/features/actions/)

Le service est 'gratuit' jusqu'à la limite, selon la machine choisie.
Nous allons utiliser une machine **_macOS_**, vous pouvez voir sur la capture d'écran son prix et ses limites (prix à la création du tutoriel, ils pourraient subir des modifications à l'avenir)

🔴 **_Une fois avertis des prérequis et des prix, si vous le souhaitez, nous continuons..._**

> **_📣_ Dans cet article, nous supposons que nous avons l'application créée dans iTunes Connect, nous avons les certificats de l'écosystème Apple, tout sera copié par Fastlane !**

## Plongeons dedans 🤿

**Étapes à suivre dans l'article**

1. _Utilisation de l'API App Store Connect avec Fastlane Match_
2. _Prérequis_
3. _Création d'une clé API App Store Connect_
4. _Utilisation d'une clé API App Store Connect_
5. _Copie des fichiers Fastlane_
6. _Configuration de Fastlane match_
6. _Configuration de Fastlane match_

## 1. Utilisation de l'API App Store Connect avec Fastlane Match

> Depuis février 2021, l'authentification à deux facteurs ou la vérification en deux étapes est requise pour tous les utilisateurs pour se connecter à App Store Connect. Cette couche de sécurité supplémentaire pour votre identifiant Apple aide à garantir que vous êtes la seule personne à pouvoir accéder à votre compte.
> De [Apple Support](https://developer.apple.com/support/authentication/)

> Pour commencer avec match, vous devrez révoquer vos certificats existants. Mais ne vous inquiétez pas, vous aurez directement le nouveau.

## Prérequis

Pour pouvoir utiliser l'API App Store Connect, Fastlane a besoin de **trois** éléments.

1. ID de l'émetteur.
2. ID de la clé.
3. Fichier de clé ou contenu de la clé.

## Création d'une clé API App Store Connect

Pour générer des clés, vous devez avoir la permission Admin dans App Store Connect. Si vous n'avez pas cette permission, vous pouvez diriger la personne concernée vers cet article et suivre les instructions suivantes.

1. Connectez-vous à [App Store Connect](https://appstoreconnect.apple.com/).

2. Sélectionnez [Utilisateurs et Accès](https://appstoreconnect.apple.com/access/users/).

![Accès utilisateur App Store Connect](/select_user_access.webp)

3. Sélectionnez l'onglet Intégration.

![Intégration API App Store Connect](/user_access_keys.webp)

4. Cliquez sur Générer une clé API ou sur le bouton Ajouter (+).

![Création de clés API App Store Connect](/user_access.webp)

5. Entrez un nom pour la clé. Le nom est uniquement pour votre référence et ne fait pas partie de la clé elle-même.

![Création de nom de clé API App Store Connect](/gen_key.webp)

6. Sous Accès, sélectionnez le rôle pour la clé. Les rôles qui s'appliquent aux clés sont les mêmes que ceux qui s'appliquent aux utilisateurs de votre équipe. Voir les [permissions des rôles](https://help.apple.com/app-store-connect/#/deve5f9a89d7/). Nous recommandons de sélectionner **Gestionnaire d'application**.

7. Cliquez sur Générer.

> **L'accès d'une clé API ne peut pas être limité à des applications spécifiques.**

Le nom de la nouvelle clé, l'ID de la clé, un lien de téléchargement et d'autres informations apparaissent sur la page.

![Téléchargement de clés App Store Connect](/download_key.webp)

Vous pouvez récupérer ici les trois informations nécessaires.  
<1> ID de l'émetteur.  
<2> ID de la clé.  
<3> Cliquez sur "Télécharger la clé API" pour télécharger votre clé privée API. Le lien de téléchargement n'apparaît que si la clé privée n'a pas encore été téléchargée. Apple ne conserve pas de copie de la clé privée. Donc, vous ne pouvez la télécharger qu'une seule fois.

> _🔴_ Conservez votre clé privée dans un endroit sûr. Vous ne devez jamais partager vos clés, les stocker dans un dépôt de code ou inclure les clés dans le code côté client.

## Utilisation d'une clé API App Store Connect

Le fichier de clé API (fichier p8 que vous téléchargez), l'ID de la clé et l'ID de l'émetteur sont nécessaires pour créer le jeton JWT pour l'autorisation. Il existe plusieurs façons d'entrer ces informations dans Fastlane en utilisant la nouvelle action de Fastlane, `app_store_connect_api_key`. Vous pouvez découvrir d'autres méthodes dans la [documentation Fastlane](https://docs.fastlane.tools/actions/app_store_connect_api_key/). Je montre cette méthode car je pense que c'est la façon la plus simple de travailler avec la plupart des CI, où vous pouvez définir des variables d'environnement.

_Maintenant nous pouvons gérer Fastlane avec la clé API App Store Connect, super !_

## 2. Copier les fichiers Fastlane

Fastlane est une bibliothèque Ruby créée pour automatiser les tâches courantes de développement mobile. En utilisant Fastlane, vous pouvez configurer des "lanes" personnalisées qui regroupent une série d'"actions" qui effectuent des tâches que vous feriez normalement en utilisant Android studio. Vous pouvez faire beaucoup avec Fastlane, mais pour les besoins de ce tutoriel, nous n'utiliserons qu'une poignée d'actions de base.

Créez un dossier Fastlane à la racine de votre projet et copiez les fichiers suivants :
Fastfile
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

Appfile
```ruby
app_identifier(ENV["DEVELOPER_APP_IDENTIFIER"])
apple_id(ENV["FASTLANE_APPLE_ID"])
itc_team_id(ENV["APP_STORE_CONNECT_TEAM_ID"])
team_id(ENV["DEVELOPER_PORTAL_TEAM_ID"])
```

## **Configurer Fastlane match**

Fastlane [match](https://docs.fastlane.tools/actions/match/) est une nouvelle approche de la signature de code iOS. Fastlane match facilite la gestion des certificats requis et des profils de provisionnement pour vos applications iOS par les équipes.

Créez un nouveau dépôt privé nommé `certificates`, par exemple sur votre compte personnel GitHub ou votre organisation.

Initialisez Fastlane match pour votre application iOS.

```shell
fastlane match init
```

Puis sélectionnez l'option #1 (Stockage Git).

```
[01:00:00]: fastlane match supports multiple storage modes, please select the one you want to use:1. git2. google_cloud3. s3?
```

Attribuez l'URL du dépôt nouvellement créé.

```
[01:00:00]: Please create a new, private git repository to store the certificates and profiles there[01:00:00]: URL of the Git Repo: <YOUR_CERTIFICATES_REPO_URL>
```

> Maintenant vous avez dans le dossier Fastlane un fichier nommé **_Matchfile_** et `_git_url_` doit être défini sur l'URL HTTPS du dépôt des certificats. En option, vous pouvez également utiliser SSH, mais cela nécessite une étape différente à exécuter.

```
# ios/Matchfilegit_url("https://github.com/gitusername/certificates")storage_mode("git")type("appstore")
```

Ensuite, nous allons générer les certificats et entrer vos identifiants lorsque demandé avec Fastlane Match.

Il vous sera demandé d'entrer une phrase secrète. Souvenez-vous-en correctement car elle sera utilisée plus tard par GitHub Actions pour déchiffrer votre dépôt de certificats.

```
fastlane match appstore
```

Si tout s'est bien passé, vous devriez voir quelque chose comme ça :

```
[01:40:52]: All required keys, certificates and provisioning profiles are installed 🙌
```

> Si vous avez rencontré des problèmes avec GitHub et les permissions nécessaires, peut-être que cet [article](https://medium.com/@litoarias/token-authentication-requirements-for-git-operations-5fdd8a6f6e7c/) vous aidera à générer des jetons d'authentification pour git.

Les certificats et profils de provisionnement générés sont téléchargés dans les ressources du dépôt des certificats

![Certificats App Store Connect](/certificates.webp)

Enfin, ouvrez votre `projet` dans Xcode, et mettez à jour le profil de provisionnement pour la configuration de publication de votre application.

![Certificats XCode](/xcode_cert.webp)

## Quelques points à noter 💡

## MATCH

Pour que le CI/CD puisse importer les certificats et les profils de provisionnement, il doit avoir accès au dépôt des certificats. Vous pouvez le faire en générant un jeton d'accès personnel (doit être utilisé avant) qui a la portée pour accéder ou lire les dépôts privés.

Dans GitHub, allez dans **Paramètres** → **Paramètres développeur** → **Jetons d'accès personnels** → cliquez sur `Générer nouveau jeton` → cochez la portée `repo` → puis cliquez sur `Générer jeton`.

![Créer un jeton d'accès personnel](/personal_access_token.webp)

Gardez une copie du jeton d'accès personnel généré. Vous l'utiliserez plus tard pour la variable d'environnement `GIT_TOKEN`.

Puis remplacez votre fichier match généré dans le dossier Fastlane par 
Matchfile
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
Cela sera utilisé par GitHub Actions pour importer les certificats et les profils de provisionnement.
Et les variables seront définies dans les Secrets GitHub, au lieu d'être codées en dur dans le fichier.

## **Traitement des builds**

Dans GitHub Actions, **vous êtes facturé en fonction des minutes** que vous avez utilisées pour exécuter votre workflow CI/CD. D'après l'expérience, il faut environ 10-15 minutes avant qu'un build puisse être traité dans App Store Connect.

Pour les projets privés, le coût estimé par build peut aller jusqu'à **0,08 $/min x 15 mins = 1,2 $**, ou plus, selon la configuration ou les dépendances de votre projet.

Si vous partagez les mêmes préoccupations concernant les prix que moi pour les projets privés, vous pouvez garder `skip_waiting_for_build_processing` à `true`.

Quel est l'inconvénient ? Vous devez mettre à jour manuellement la conformité de votre application dans App Store Connect après que le build a été traité, pour pouvoir distribuer le build à vos utilisateurs.

C'est juste un paramètre optionnel à mettre à jour si vous voulez économiser sur les minutes de build pour les projets privés. Pour les projets gratuits, cela ne devrait pas être un problème du tout. Voir [tarification](https://github.com/pricing/).

## 3. Configuration de GitHub Actions

**Configurer les secrets GitHub**

Vous vous demandez d'où viennent les valeurs de `ENV` ? Eh bien, ce n'est plus un secret - c'est dans les secrets de votre projet. 🤦

![Définir les secrets GitHub](/github_secets.webp)

1. `APP_STORE_CONNECT_TEAM_ID` - l'ID de votre équipe App Store Connect si vous êtes dans plusieurs équipes.

2. `DEVELOPER_APP_ID` - dans App Store Connect, allez dans l'app → **Informations sur l'app** → Faites défiler jusqu'à la section `Informations générales` de votre app et cherchez `Apple ID`.

3. `DEVELOPER_APP_IDENTIFIER` - l'identifiant bundle de votre application.

4. `DEVELOPER_PORTAL_TEAM_ID` - l'ID de votre équipe du Portail Développeur si vous êtes dans plusieurs équipes.

5. `FASTLANE_APPLE_ID` - l'Apple ID ou l'email développeur que vous utilisez pour gérer l'app.

6. `GIT_USERNAME` & `GIT_TOKEN` - Votre nom d'utilisateur git et votre jeton d'accès personnel.

7. `MATCH_PASSWORD` - la phrase secrète que vous avez assignée lors de l'initialisation de match, sera utilisée pour décrypter les certificats et les profils de provisioning.

8. `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <YOUR_CERTIFICATES_REPO_URL>`, ex. `match AppStore com.domain.blabla.demo`.

9. `TEMP_KEYCHAIN_USER` & `TEMP_KEYCHAIN_PASSWORD` - assignez un utilisateur et mot de passe temporaire du trousseau pour votre workflow.

10. `APPLE_KEY_ID` — ID de clé 🔺 de l'API App Store Connect.

11. `APPLE_ISSUER_ID` — ID émetteur 🔺 de l'API App Store Connect.

12. `APPLE_KEY_CONTENT` — Contenu de la clé 🔺 de l'API App Store Connect ou contenu du fichier _.p8_, [vérifiez ici](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)
<YOUR_APP_BUNDLE_IDENTIFIER>
13. `CERTIFICATE_STORE_URL` — L'URL du dépôt de vos clés Match (ex: https://github.com/***/fastlane_match.git)

## **4. Configurer le fichier de workflow GitHub**

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

Ce workflow devrait être déclenché après chaque _tag_ GitHub, si vous devez automatiser le tag, référez-vous d'abord à [Construction et publication automatiques avec les actions GitHub](/blog/automatic-build-and-release-with-github-actions/).

Ensuite, ce workflow récupérera vos dépendances NodeJS, les installera et construira votre application JavaScript.

> Chaque fois que vous envoyez un nouveau commit, une version sera construite dans TestFlight.

Votre application n'a pas besoin d'utiliser Ionic, seule la base Capacitor est obligatoire, elle peut avoir d'anciens modules Cordova, mais les plugins Capacitor JS devraient être préférés.

## 5. Déclencher le workflow

**Créer un Commit**

Faites un _commit_, vous devriez voir le workflow actif dans le dépôt.

**Déclencher le workflow**

Poussez les nouveaux commits vers la branche `main` ou `developement` pour déclencher le workflow.

![Démarré avec commit](/cd_started.webp)

Après quelques minutes, la construction devrait être disponible dans votre tableau de bord App Store Connect.

![Tableau de bord Testflight](/testflight_app.webp)

## Peut-on déployer depuis une machine locale ?

Oui, vous pouvez, et c'est très simple.

Imaginez que vous ayez un dépôt privé, que vous ayez épuisé les minutes du plan gratuit et que vous ne vouliez pas payer pour de nouvelles versions, ou peut-être préférez-vous soumettre l'application manuellement.

**_Allons-y_**

Ok, d'abord nous devons créer dans le chemin _my_project_path/fastlane_ un fichier appelé **_.env,_** juste dans le même chemin que _Fastfile,_ pour pouvoir créer les mêmes propriétés _secret_ trouvées dans notre _GitHub,_ comme ci-dessous :

Fichier .env pour le déploiement depuis une machine locale

Maintenant, vous pouvez aller dans le _terminal_ et lancer _Fastlane_ depuis votre machine :

```
fastlane closed_beta
```

> **❌ Important à propos du fichier** _.env_ **, comme nous ne voulons pas exposer ces données, nous devons l'ajouter dans notre** _.gitignore_**, quelque chose comme ça : ❌**

```
fastlane/*.env
```

Cela devrait fonctionner de la même manière que depuis les Actions GitHub sur la machine distante mais sur notre machine locale. 🍻

![Exécution locale de Fastlane](/local_fastlane.webp)

Exécution dans le terminal : $ Fastlane closed_beta

**_Si vous êtes arrivé jusqu'ici, mes félicitations, vous avez maintenant un processus entièrement automatisé pour vos applications iOS avec Fastlane et GitHub Actions._**

> Chaque fois que vous envoyez un nouveau commit, une version sera construite dans la console Google Play, canal bêta.
J'améliorerai ce blog avec vos retours, si vous avez des questions ou suggestions, faites-le moi savoir par email martin@capgo.app

### Construire sur votre appareil

Si vous devez encore construire sur votre appareil, vous devez les ajouter manuellement au provisioning.
Connectez votre appareil à votre mac et ouvrez le menu des appareils
![trouver menu ios appareil](/find_ios_device.webp)
Puis copiez votre identifiant 
![trouver identifiant ios](/find_ios_identifier.webp)
Et ensuite lancez la commande :
`fastlane register_new_device`
elle vous demandera de définir un nom d'appareil et l'identifiant :
![définir identifiant ios](/set_identifier.webp)

### si vous avez des problèmes

Si vous avez des problèmes avec l'appareil de dev qui ne peut pas tester etc, cela le résout généralement.

Il y a une commande magique qui peut vous sauver :
```shell
fastlane match nuke development
fastlane match development
```

Ensuite :
Nettoyez le projet en maintenant Shift(⇧)+Command(⌘)+K ou en sélectionnant Produit > Nettoyer (peut être étiqueté "Nettoyer le dossier de construction")

Puis essayez de relancer l'app sur votre appareil.

### Remerciements

Ce blog est basé sur les articles suivants :
- [Livraison continue pour IOS utilisant Fastlane et GitHub actions](https://litoarias.medium.com/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Documentation Fastlane](https://docs.fastlane.tools/app-store-connect-api/)
- [Ce message GitHub de @mrogunlana](https://github.com/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
