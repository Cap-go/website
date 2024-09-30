---
slug: automatic-capacitor-ios-build-codemagic
title: Création automatique d'un condensateur IOS avec Codemagic
description: >-
  Comment configurer un pipeline CI/CD pour votre application IOS Ionic à l'aide
  de Codemagic et Codemagic en 5 minutes (2024)
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-24T00:00:00.000Z
updated_at: 2024-07-24T00:00:00.000Z
head_image: /Codemagic_ios.webp
head_image_alt: Codemagic testflight illustration
tag: CI/CD
published: true
next_blog: automatic-capacitor-android-build-codemagic
locale: fr
---

## Livraison continue pour iOS à l'aide de Codemagic


## Prérequis

Avant de poursuivre le tutoriel…

- Adhésion au programme pour développeurs iOS
- Envie de lire 😆…

## Important concernant le prix

![Prix Codemagic Action](/price_codemagicwebp)

[https://codemagicio/pricing/](https://codemagicio/pricing/)

Le service est « _gratuit »_ jusqu’à 500 minutes macOS M1/mois, selon la machine choisie  
Nous allons utiliser une machine **_macOS M1_**, vous pouvez voir sur la capture d'écran son prix et ses limites (tarifs dès la création du tutoriel, ils pourraient subir des modifications dans le futur)

🔴 **_Une fois prévenus des besoins et des tarifs, si vous le souhaitez, on continue…_**

> **_📣_ Dans le post, nous supposons que nous avons l'application créée dans iTunes Connect, nous avons les certificats de l'écosystème Apple, tout sera configuré par Codemagic !**

## Allons au désordre 🧑🏽💻

**Étapes à suivre dans le post**

1 _Utilisation de l'API App Store Connect avec Codemagic_
2 _Exigences_
3 _Création d'une clé API App Store Connect_
4 _Utilisation d'une clé API App Store Connect_
5 _Copier les fichiers Fastline_
6 _Configurer Codemagic_

## 1\ Utilisation de l'API App Store Connect avec Codemagic

> À partir de février 2021, une authentification à deux facteurs ou une vérification en deux étapes est requise pour que tous les utilisateurs puissent se connecter à App Store Connect. Cette couche de sécurité supplémentaire pour votre identifiant Apple permet de garantir que vous êtes la seule personne à pouvoir accéder à votre compte.  
> Depuis [Assistance Apple](https://developerapplecom/support/authentication/)

> La mise en route de match vous oblige à révoquer vos certificats existants. Mais pas d'inquiétude, vous aurez directement le nouveau


### Exigences

Pour pouvoir utiliser l'API App Store Connect, Codemagic a besoin de **trois** éléments

1 identifiant de l'émetteur
2 ID de clé
3 Fichier clé ou contenu clé

### Création d'une clé API App Store Connect

Pour générer des clés, vous devez disposer de l'autorisation d'administrateur dans App Store Connect. Si vous ne disposez pas de cette autorisation, vous pouvez diriger la personne concernée vers cet article et suivre les instructions suivantes.

1 — Connectez-vous à [App Store Connect](https://appstoreconnectapplecom/)

2 — Sélectionnez [Utilisateurs et accès](https://appstoreconnectapplecom/access/users/)

![Accès utilisateur App Store Connect](/select_user_accesswebp)

3 — Sélectionnez l'onglet Clés API

![Clés API App Store Connect](/user_access_keyswebp)

4 — Cliquez sur Générer une clé API ou sur le bouton Ajouter (+)

![Création de clés API App Store Connect](/user_accesswebp)

5 — Entrez le nom de la clé et sélectionnez un niveau d'accès. Nous vous recommandons de choisir les droits d'accès « App Manager », en savoir plus sur les autorisations de rôle du programme pour développeurs Apple [ici] (https://helpapplecom/app-store-connect/#/deve5f9a89d7 )

![Les clés API App Store Connect créent un nom](/gen_keywebp)

6 — Cliquez sur Générer

> **L'accès à une clé API ne peut pas être limité à des applications spécifiques**

Le nom de la nouvelle clé, l'ID de la clé, un lien de téléchargement et d'autres informations apparaissent sur la page

![Clés de téléchargement App Store Connect](/download_keywebp)

Récupérez les trois informations nécessaires ici :
<1> ID du problème  
<2> ID de clé  
<3> Cliquez sur « Télécharger la clé API » pour télécharger votre clé privée API Le lien de téléchargement n'apparaît que si la clé privée n'a pas encore été téléchargée Apple ne conserve pas de copie de la clé privée Vous ne pouvez donc la télécharger qu'une seule fois

> _🔴_ Stockez votre clé privée dans un endroit sûr Vous ne devez jamais partager vos clés, stocker des clés dans un référentiel de code ou inclure des clés dans le code côté client

### Ajout de la clé API App Store Connect à Codemagic

1 Ouvrez les paramètres de votre équipe Codemagic,
![Sélectionner les intégrations d'équipe](/select_teamwebp)
![Ouvrir l'équipe](/open_teamwebp)
Sélectionnez les identités de signature de code
![Sélectionnez les identités de signature de code](/select_code_signing_identitieswebp)
Et télécharger le certificat
![Télécharger le certificat](/upload_certificatewebp)

2 Cliquez sur le bouton **Ajouter une clé**
3 Saisissez le « Nom de la clé API App Store Connect ». Il s'agit d'un nom lisible par l'homme pour la clé qui sera utilisé pour faire référence à la clé ultérieurement dans les paramètres de l'application.
4 Saisissez les valeurs « Issuer ID » et « Key ID »
5 Cliquez sur **Choisissez unp8** ou faites glisser le fichier pour télécharger la clé API App Store Connect téléchargée précédemment
6 Cliquez sur **Enregistrer**

_Maintenant, nous pouvons gérer Codemagic avec la clé API App Store Connect, super !_


## 2\ Créer des certificats et des profils d'approvisionnement


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

> Le nom sera utilisé pour identifier le profil dans Codemagic

![Générer le profil](/generate_profilewebp)

Vous pouvez télécharger le profil sous forme de fichier « mobileprovision »

![Télécharger le profil](/download_profilewebp)


### Ajout du certificat de signature de code

Codemagic vous permet de télécharger des certificats de signature de code sous forme d'archives PKCS#12 contenant à la fois le certificat et la clé privée nécessaire pour l'utiliser. Lors du téléchargement, Codemagic vous demandera de fournir le mot de passe du certificat (si le certificat est protégé par mot de passe) ainsi qu'un **Nom de référence** unique, qui peut ensuite être utilisé dans la configuration `codemagicyaml` pour récupérer le fichier spécifique

- Télécharger le certificat
- Générer un nouveau certificat
- Récupérer depuis le portail des développeurs

1 Ouvrez les paramètres de votre équipe Codemagic, accédez à **paramètres codemagicyaml** > **Identités de signature de code**
2 Ouvrez l'onglet **Certificats iOS**
3 Téléchargez le fichier de certificat en cliquant sur **Choisissez un fichier p12 ou pem** ou en le faisant glisser dans le cadre indiqué
4 Saisissez le **Mot de passe du certificat** et choisissez un **Nom de référence**.
5 Cliquez sur **Ajouter un certificat**

### Ajout du profil de provisionnement

Codemagic vous permet de télécharger un profil d'approvisionnement à utiliser pour l'application ou de récupérer un profil sur le portail des développeurs Apple.

Le type de profil, l'équipe, l'identifiant du bundle et la date d'expiration sont affichés pour chaque profil ajouté aux identités de signature de code. De plus, Codemagic vous indiquera si un certificat de signature de code correspondant est disponible dans Identités de signature de code (une coche verte dans la zone **Certificat). ** champ) ou pas

## 3\ Configurer Codemagic

**Configurer les secrets Codemagic**

Vous êtes-vous déjà demandé d'où viennent les valeurs de « ENV » ? Eh bien, ce n’est plus un secret – cela vient du secret de votre projet 🤦


## **4\ Configurer le fichier de workflow Codemagic**

Créez un fichier nommé `codemagicyml` à la racine de votre projet et ajoutez ce qui suit

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

Ce workflow doit être déclenché manuellement ou après chaque _tag_ GitHub, si vous devez automatiser la balise, veuillez vous référer à [Création et publication automatiques avec les actions GitHub](/blog/automatic-build-and-release-with-github-actions/) d'abordEnsuite, ce workflow extraira vos dépôts NodeJS, les installera et créera votre application JavaScript.

> Chaque fois que vous envoyez un nouveau tag, une release sera construite dans TestFlight

Votre application n'a pas besoin d'utiliser Ionic, seule la base Capacitor est obligatoire, elle peut avoir l'ancien module Cordova, mais le plugin Capacitor JS doit être préféré

## 5\ Déclencher le workflow


**Déclenchez le workflow**

Poussez les nouveaux commits vers la branche « main » ou « developement » pour déclencher le workflow

![Démarré avec commit](/build_resultwebp)

Après quelques minutes, la version devrait être disponible dans votre tableau de bord App Store Connect

![Tableau de bord Testflight](/testflight_appwebp)

## Démarrer manuellement

Vous pouvez démarrer le workflow manuellement 

Sélectionnez d'abord l'application que vous souhaitez créer, puis cliquez sur **Démarrer une nouvelle version**

![Sélectionner l'application](/select_app_codemagicwebp)

Sélectionnez ensuite la branche que vous souhaitez créer

![Sélectionner une branche](/select_branchwebp)

Et cliquez sur **Démarrer une nouvelle build**

Alors allez-y, la liste de construction

![Construire la liste](/build_listwebp)

Et cliquez sur le build pour voir le résultat

![Résultat de construction](/build_resultwebp)

## Peut être déployé à partir d'une machine locale

Oui, vous pouvez, et c'est sans effort

Vous pouvez utiliser Xcode pour créer et signer votre application, comme toujours

### Merci

Ce blog est basé sur les articles suivants :
- [Livraison continue pour IOS à l'aide des actions Codemagic et GitHub](https://litoariasmediumcom/continuous-delivery-for-ios-using-Codemagic-and-github-actions-edf62ee68ecc/)
- [Documentation Codemagic](https://docsCodemagictools/app-store-connect-api/)
- [Ce message GitHub de @mrogunlana](https://githubcom/Codemagic-community/Codemagic-plugin-ionic/issues/63/#issuecomment-1074328057)