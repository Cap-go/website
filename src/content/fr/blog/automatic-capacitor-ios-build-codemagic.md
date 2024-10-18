---
slug: automatic-capacitor-ios-build-codemagic
title: Compilation automatique de Capacitor iOS avec Codemagic
description: >-
  Comment configurer un pipeline CI/CD pour votre application IOS Ionic avec
  Codemagic en 5 minutes (2024)
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-24T00:00:00.000Z
updated_at: 2024-07-24T00:00:00.000Z
head_image: /Codemagic_ios.webp
head_image_alt: Illustration de Testflight de Codemagic
tag: CI/CD
published: true
locale: fr
next_blog: automatic-capacitor-android-build-codemagic
---

Voici la traduction en français du texte fourni :

## Livraison continue pour iOS avec Codemagic

## Prérequis

Avant de continuer le tutoriel...

- Adhésion au programme développeur iOS
- Envie de lire 😆...

## Important concernant le prix

![Prix de l'action Codemagic](/price_codemagic.webp)

[https://codemagic.io/pricing/](https://codemagic.io/pricing/)

Le service est 'gratuit' jusqu'à 500 minutes macOS M1 / mois, selon la machine choisie  
Nous allons utiliser une machine **_macOS M1_**, vous pouvez voir sur la capture d'écran son prix et ses limites (prix à la date de création du tutoriel, ils pourraient subir des changements à l'avenir)

🔴 **_Une fois avertis des exigences et des prix, si vous le souhaitez, nous continuons..._**

> **_📣_ Dans cet article, nous supposons que nous avons créé l'application dans iTunes Connect, que nous disposons des certificats de l'écosystème Apple, tout sera configuré par Codemagic !**

## Passons à l'action 🧑🏽‍💻

**Étapes à suivre dans l'article**

1. _Utilisation de l'API App Store Connect avec Codemagic_
2. _Exigences_
3. _Création d'une clé API App Store Connect_
4. _Utilisation d'une clé API App Store Connect_
5. _Copie des fichiers Fastlane_
6. _Configuration de Codemagic_

## 1. Utilisation de l'API App Store Connect avec Codemagic

> Depuis février 2021, l'authentification à deux facteurs ou la vérification en deux étapes est requise pour tous les utilisateurs pour se connecter à App Store Connect. Cette couche de sécurité supplémentaire pour votre identifiant Apple aide à garantir que vous êtes la seule personne à pouvoir accéder à votre compte.  
> De [Apple Support](https://developer.apple.com/support/authentication/)

> Commencer avec match nécessite de révoquer vos certificats existants. Mais ne vous inquiétez pas, vous aurez le nouveau directement.

### Exigences

Pour pouvoir utiliser l'API App Store Connect, Codemagic a besoin de **trois** éléments :

1. ID de l'émetteur
2. ID de la clé
3. Fichier de clé ou contenu de la clé

### Création d'une clé API App Store Connect

Pour générer des clés, vous devez avoir l'autorisation d'administrateur dans App Store Connect. Si vous n'avez pas cette autorisation, vous pouvez diriger la personne concernée vers cet article et suivre les instructions suivantes.

1 — Connectez-vous à [App Store Connect](https://appstoreconnect.apple.com/)

2 — Sélectionnez [Utilisateurs et accès](https://appstoreconnect.apple.com/access/users/)

![Accès utilisateur App Store Connect](/select_user_access.webp)

3 — Sélectionnez l'onglet Clés API

![Clés API App Store Connect](/user_access_keys.webp)

4 — Cliquez sur Générer une clé API ou sur le bouton Ajouter (+)

![Création de clés API App Store Connect](/user_access.webp)

5 — Saisissez le nom de la clé et sélectionnez un niveau d'accès. Nous recommandons de choisir les droits d'accès `Gestionnaire d'applications`, lisez-en plus sur les autorisations des rôles du programme Apple Developer [ici](https://help.apple.com/app-store-connect/#/deve5f9a89d7)

![Création de nom de clé API App Store Connect](/gen_key.webp)

6 — Cliquez sur Générer

> **L'accès d'une clé API ne peut pas être limité à des applications spécifiques**

Le nom de la nouvelle clé, l'ID de la clé, un lien de téléchargement et d'autres informations apparaissent sur la page

![Téléchargement des clés App Store Connect](/download_key.webp)

Récupérez les trois informations nécessaires ici :
<1> ID de l'émetteur  
<2> ID de la clé  
<3> Cliquez sur "Télécharger la clé API" pour télécharger votre clé privée API. Le lien de téléchargement n'apparaît que si la clé privée n'a pas encore été téléchargée. Apple ne conserve pas de copie de la clé privée. Vous ne pouvez donc la télécharger qu'une seule fois.

> _🔴_ Stockez votre clé privée dans un endroit sûr. Vous ne devez jamais partager vos clés, les stocker dans un référentiel de code ou inclure des clés dans le code côté client.

### Ajout de la clé API App Store Connect à Codemagic

1. Ouvrez les paramètres de votre équipe Codemagic,
![Sélectionner les intégrations d'équipe](/select_team.webp)
![Ouvrir l'équipe](/open_team.webp)
Sélectionnez les identités de signature de code
![Sélectionner les identités de signature de code](/select_code_signing_identities.webp)
Et téléchargez le certificat
![Télécharger le certificat](/upload_certificate.webp)

2. Cliquez sur le bouton **Ajouter une clé**
3. Saisissez le `Nom de la clé API App Store Connect`. Il s'agit d'un nom lisible par l'homme pour la clé qui sera utilisé pour faire référence à la clé ultérieurement dans les paramètres de l'application.
4. Saisissez les valeurs `ID de l'émetteur` et `ID de la clé`
5. Cliquez sur **Choisir unVoici la traduction en français :

fichier p8** ou faites glisser le fichier pour télécharger la clé API App Store Connect téléchargée précédemment
6. Cliquez sur **Enregistrer**

_Maintenant, nous pouvons gérer Codemagic avec la clé API App Store Connect, super !_

## 2. Créer les certificats et les profils de provisionnement

#### Certificats

Ouvrez XCode et allez dans **Préférences** > **Comptes** > **Apple ID** > **Équipes** et sélectionnez votre équipe

![Identités de signature de code](/code_signing_identities.webp)

Cliquez sur **Gérer les certificats** > **+** et sélectionnez **Distribution Apple**

![Distribution Apple](/apple_distribution.webp)

Vous pouvez ensuite créer un nouveau certificat

Ensuite, vous devez aller dans le trousseau pour télécharger le certificat sous forme de fichier `p12`

Pour ce faire, vous devez aller dans le trousseau, passer au trousseau **session** puis à l'onglet **Mes certificats**

![Mes certificats](/my_certificates.webp)

Vous pouvez alors sélectionner le certificat que vous souhaitez télécharger (regardez la date du certificat)

Puis faites un clic droit sur le certificat et sélectionnez **Exporter**

Choisissez le format de fichier **Échange d'informations personnelles (.p12)**

Cela téléchargera le certificat sous forme de fichier `p12`

#### Profils de provisionnement

Ouvrez [Apple Developer](https://developer.apple.com/account/resources/profiles/list) et sélectionnez la bonne équipe

Ensuite, créez un nouveau profil en cliquant sur **+**

![Créer un nouveau profil](/create_new_profile.webp)

Et sélectionnez **App Store Connect**

![Sélectionner App Store Connect](/select_app_store_connect.webp)

Vous devez ensuite sélectionner la bonne application, attention vous ne pouvez pas utiliser de caractère générique sinon la signature échouera

![Sélectionner la bonne application](/select_app.webp)

Sélectionnez le bon certificat que vous avez créé précédemment (recherchez la date d'expiration, elle devrait être le même jour et mois qu'aujourd'hui) et cliquez sur **Continuer**

![Sélectionner le bon certificat](/select_certificate.webp)

Enfin, saisissez le nom du profil et cliquez sur **Générer**

> Le nom sera utilisé pour identifier le profil dans Codemagic

![Générer le profil](/generate_profile.webp)

Vous pouvez télécharger le profil sous forme de fichier `mobileprovision`

![Télécharger le profil](/download_profile.webp)

### Ajout du certificat de signature de code

Codemagic vous permet de télécharger des certificats de signature de code sous forme d'archives PKCS#12 contenant à la fois le certificat et la clé privée nécessaire pour l'utiliser. Lors du téléchargement, Codemagic vous demandera de fournir le mot de passe du certificat (si le certificat est protégé par mot de passe) ainsi qu'un **Nom de référence** unique, qui pourra ensuite être utilisé dans la configuration `codemagic.yml` pour récupérer le fichier spécifique.

- Télécharger le certificat
- Générer un nouveau certificat
- Récupérer depuis le portail développeur

1. Ouvrez les paramètres de votre équipe Codemagic, allez dans **Paramètres codemagic.yml** > **Identités de signature de code**
2. Ouvrez l'onglet **Certificats iOS**
3. Téléchargez le fichier de certificat en cliquant sur **Choisir un fichier p12 ou pem** ou en le faisant glisser dans le cadre indiqué
4. Saisissez le **Mot de passe du certificat** et choisissez un **Nom de référence**
5. Cliquez sur **Ajouter le certificat**

### Ajout du profil de provisionnement

Codemagic vous permet de télécharger un profil de provisionnement à utiliser pour l'application ou de récupérer un profil depuis le portail développeur Apple

Le type, l'équipe, l'identifiant du bundle et la date d'expiration du profil sont affichés pour chaque profil ajouté aux identités de signature de code. De plus, Codemagic vous indiquera si un certificat de signature de code correspondant est disponible dans les identités de signature de code (une coche verte dans le champ **Certificat**) ou non.

## 3. Configuration de Codemagic

**Configurer les secrets Codemagic**

Vous vous demandez d'où viennent les valeurs des `ENV` ? Eh bien, ce n'est plus un secret - c'est à partir du secret de votre projet 🤦

## 4. Configurer le fichier de workflow Codemagic

Créez un fichier nommé `codemagic.yml` à la racine de votre projet et ajoutez ce qui suit

```yaml
workflows:
  ionic-capacitor-ios-workflow:
    name: Capacitor iOS Workflow
    max_build_duration: 120
    instance_type: mac_mini_m1
    integrations:
      app_store_connect: CodeMagic
    environment:
      ios_signing:
        distribution_type: app_store
        bundle_identifier: YOUR_BUNDLE_IDENTIFIER
      vars:
        XCODE_WORKSPACE: ios/App/App.xcworkspace
        XCODE_SCHEME: App
        APP_STORE_APP_ID: YOUR_APP_STORE_APP_ID
      node: v20.14.0
      xcode: 15.4
      cocoapods: default
    triggering:
      events:
        - tag
      tag_patterns:
        - pattern: '*'
          include: true
    scripts:
      - name: Install dependencies
        script: |
          npm install
      - name: Cocoapods installation
        script: |
          cd ios/App && pod install
      - name: Update dependencies and copy web assets to native project
        script: |
          npm run build
          npx cap sync ios
      - name: Set up code signing settings on Xcode project
        script: |
          xcode-project use-profiles
      - name: Increment build number
        script: |
          cd $CM_BUILD_DIR/ios/App
          LATEST_BUILD_NUMBER=$(app-store-connect get-latest-app-store-build-number "$APP_ID")
          agvtool new-version -all $(($LATEST_BUILD_NUMBER + 1))
      - name: Build ipa for distribution
        script: |
          xcode-project build-ipa \
            --workspace "$XCODE_WORKSPACE" \
            --scheme "$XCODE_SCHEME"
    artifacts:
      - build/ios/ipa/*.ipa
      - /tmp/xcodebuild_logs/*.log
      - $HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.app
      - $HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.dSYM
    publishing:
      email:
        recipients:
          - YOUR_EMAIL
        notify:
          success: true # To not receive a notification when a build succeeds
          failure: false # To not receive a notification when a build fails
      app_store_connect:
        auth: integration
        # Configuration related to TestFlight (optional)
        # Note: This action is performed during post-processing.
        submit_to_testflight: true
        # Configuration related to App Store (optional)
        # Note: This action is performed during post-processing.
        submit_to_app_store: false

```

Ce workflow devrait être déclenché manuellement ou après chaque _tag_ GitHub. Si vous avez besoin d'automatiser le tag, veuillez d'abord vous référer à [Construction et publication automatiques avec les actions GitHub](/blog/automatic-build-and-release-with-github-actions/)Ensuite, ce workflow extraira vos dépendances NodeJS, les installera et construira votre application JavaScript

> Chaque fois que vous envoyez un nouveau tag, une version sera construite dans TestFlight

Votre application n'a pas besoin d'utiliser Ionic, seule la base Capacitor est obligatoire, elle peut avoir d'anciens modules Cordova, mais les plugins JS Capacitor devraient être préférés

## 5. Déclencher le workflow

**Déclencher le workflow**

Poussez les nouveaux commits vers la branche `main` ou `developement` pour déclencher le workflow

![Démarré avec commit](/build_resultwebp)

Après quelques minutes, la build devrait être disponible dans votre tableau de bord App Store Connect

![Tableau de bord Testflight](/testflight_appwebp)

## Démarrer manuellement

Vous pouvez démarrer le workflow manuellement

Sélectionnez d'abord l'application que vous voulez construire, puis cliquez sur **Démarrer une nouvelle build**

![Sélectionner l'application](/select_app_codemagicwebp)

Ensuite, sélectionnez la branche que vous voulez construire

![Sélectionner la branche](/select_branchwebp)

Et cliquez sur **Démarrer une nouvelle build**

Puis allez à la liste des builds

![Liste des builds](/build_listwebp)

Et cliquez sur la build pour voir le résultat

![Résultat de la build](/build_resultwebp)

## Peut déployer depuis une machine locale

Oui, vous pouvez, et c'est très simple

Vous pouvez utiliser Xcode pour construire et signer votre application, comme toujours

### Remerciements

Ce blog est basé sur les articles suivants :
- [Livraison continue pour iOS en utilisant Codemagic et GitHub actions](https://litoariasmediumcom/continuous-delivery-for-ios-using-Codemagic-and-github-actions-edf62ee68ecc/)
- [Documentation Codemagic](https://docsCodemagictools/app-store-connect-api/)
- [Ce message GitHub de @mrogunlana](https://githubcom/Codemagic-community/Codemagic-plugin-ionic/issues/63/#issuecomment-1074328057)