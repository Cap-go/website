---
slug: automatic-capacitor-ios-build-codemagic
title: Construction automatique d'iOS avec Capacitor et Codemagic
description: >-
  Comment configurer un pipeline CI/CD pour votre application IOS Ionic en
  utilisant Codemagic en 5 minutes (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-24T00:00:00.000Z
updated_at: 2024-07-24T00:00:00.000Z
head_image: /Codemagic_ios.webp
head_image_alt: Illustration de Codemagic TestFlight
keywords: 'Codemagic, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: fr
next_blog: automatic-capacitor-android-build-codemagic
---
## Livraison Continue pour iOS utilisant Codemagic

## Prérequis

Avant de continuer avec le tutoriel…

-   Adhésion au programme des développeurs iOS.
-   Désir de lire 😆…

## Important concernant le prix

![Prix Codemagic Action](/price_codemagic.webp)

[https://codemagic.io/pricing/](https://codemagic.io/pricing/)

Le service est ‘_gratuit’_ jusqu'à 500 minutes macOS M1 / mois, selon la machine choisie.  
Nous allons utiliser une **_machine macOS M1_**, vous pouvez voir dans la capture d'écran son prix et ses limites (prix au moment de la création du tutoriel, ils pourraient subir des changements dans le futur)

🔴 **_Une fois informé des exigences et des prix, si vous le souhaitez, nous continuons…_**

> **_📣_ Dans le post, nous supposons que nous avons créé l'application dans iTunes Connect, nous avons les certificats de l'écosystème Apple, tout sera configuré par Codemagic !**

## Plongeons-y 🤿 

**Étapes à suivre dans le post**

1.  _Utilisation de l'API App Store Connect avec Codemagic_
2.  _Exigences_
3.  _Création d'une clé API App Store Connect_
4.  _Utilisation d'une clé API App Store Connect_
5.  _Copier les fichiers Fastlane_
6.  _Configurer Codemagic_

## 1. Utilisation de l'API App Store Connect avec Codemagic

> À partir de février 2021, l'authentification à deux facteurs ou la vérification en deux étapes est requise pour tous les utilisateurs souhaitant se connecter à App Store Connect. Cette couche supplémentaire de sécurité pour votre identifiant Apple permet de s'assurer que vous êtes la seule personne pouvant accéder à votre compte.  
> Extrait de [Apple Support](https://developer.apple.com/support/authentication/)

> Pour commencer avec match, vous devez révoquer vos certificats existants. Mais pas d'inquiétude, vous aurez le nouveau directement.


### Exigences

Pour pouvoir utiliser l'API App Store Connect, Codemagic a besoin de **trois** choses.

1.  ID de l'émetteur.
2.  ID de la clé.
3.  Fichier clé ou contenu clé.

### Création d'une clé API App Store Connect

Pour générer des clés, vous devez avoir des permissions Admin dans App Store Connect. Si vous n'avez pas cette permission, vous pouvez diriger la personne concernée vers cet article et suivre les instructions suivantes.

1 — Connectez-vous à [App Store Connect](https://appstoreconnect.apple.com/).

2 — Sélectionnez [Utilisateurs et accès](https://appstoreconnect.apple.com/access/users/).

![Accès utilisateur App Store Connect](/select_user_access.webp)

3 — Sélectionnez l'onglet Clés API.

![Clés API App Store Connect](/user_access_keys.webp)

4 — Cliquez sur Générer une clé API ou sur le bouton Ajouter (+).

![Créer des clés API App Store Connect](/user_access.webp)

5 —  Entrez le nom de la clé et sélectionnez un niveau d'accès. Nous recommandons de choisir les droits d'accès `App Manager`, lisez plus sur les permissions de rôle du programme Apple Developer [ici](https://help.apple.com/app-store-connect/#/deve5f9a89d7)

![Créer le nom de la clé API App Store Connect](/gen_key.webp)

6 — Cliquez sur Générer.

> **L'accès des clés API ne peut pas être limité à des applications spécifiques.**

Le nom de la nouvelle clé, l'ID de la clé, un lien de téléchargement et d'autres informations apparaissent sur la page.

![Télécharger les clés App Store Connect](/download_key.webp)

Récupérez toutes les trois informations nécessaires ici :
<1> ID de l'émission.  
<2> ID de la clé.  
<3> Cliquez sur “Télécharger la clé API” pour télécharger votre clé API privée. Le lien de téléchargement n'apparaît que si la clé privée n'a pas encore été téléchargée. Apple ne conserve pas de copie de la clé privée. Donc, vous ne pouvez la télécharger qu'une seule fois.

> _🔴_ Conservez votre clé privée dans un endroit sûr. Vous ne devez jamais partager vos clés, stocker les clés dans un dépôt de code, ou inclure des clés dans le code côté client.

### Ajout de la clé API App Store Connect à Codemagic

1.  Ouvrez les paramètres de votre équipe Codemagic,
![Sélectionnez les intégrations d'équipe](/select_team.webp)
![Ouvrir l'équipe](/open_team.webp)
Sélectionnez les identités de signature de code
![Sélectionnez les identités de signature de code](/select_code_signing_identities.webp)
Et téléchargez le certificat
![Télécharger le certificat](/upload_certificate.webp)

2.  Cliquez sur le bouton **Ajouter une clé**.
3.  Entrez le **nom de la clé API App Store Connect**. Il s'agit d'un nom lisible par l'homme pour la clé qui sera utilisé pour s'y référer plus tard dans les paramètres de l'application.
4.  Entrez les valeurs d'**ID de l'émetteur** et d'**ID de la clé**.
5.  Cliquez sur **Choisir un fichier .p8** ou faites glisser le fichier pour télécharger la clé API App Store Connect téléchargée plus tôt.
6.  Cliquez sur **Enregistrer**.

_Maintenant, nous pouvons gérer Codemagic avec la clé API App Store Connect, super !_


## 2. Créer des certificats et des profils de provisionnement


#### Certificats

Ouvrez XCode et allez dans **Paramètres** > **Comptes** > **ID Apple** > **Équipes** et sélectionnez votre équipe.

![Identités de signature de code](/code_signing_identities.webp)

Cliquez sur **Gérer les certificats** > **+** et sélectionnez **Distribution Apple**.

![Distribution Apple](/apple_distribution.webp)

Vous pouvez alors créer un nouveau certificat.

Ensuite, vous devez aller dans le trousseau pour télécharger le certificat en tant que fichier `.p12`.

Pour ce faire, vous devez aller dans le trousseau, passer au trousseau **connexion** puis à l'onglet **Mes certificats**.

![Mes certificats](/my_certificates.webp)

Ensuite, vous pouvez sélectionner le certificat que vous souhaitez télécharger. (Regardez par la date du certificat)

Puis faites un clic droit sur le certificat et sélectionnez **Exporter**.

Choisissez le format de fichier **Échange d'informations personnelles (.p12)**.

Cela téléchargera le certificat en tant que fichier `.p12`.

#### Profils de provisionnement

Ouvrez [Apple Developer](https://developer.apple.com/account/resources/profiles/list) et sélectionnez la bonne équipe.

Ensuite, créez un nouveau profil en cliquant sur **+** 

![Créer un nouveau profil](/create_new_profile.webp)

Et sélectionnez **App Store Connect**. 

![Sélectionner App Store Connect](/select_app_store_connect.webp)

Ensuite, vous devez sélectionner la bonne application, faites attention, vous ne pouvez pas utiliser de joker, sinon la signature échouera.

![Sélectionner la bonne application](/select_app.webp)

Sélectionnez le bon certificat que vous avez créé précédemment (cherchez la date d'expiration, elle devrait être le même jour et mois qu'aujourd'hui) et cliquez sur **Continuer**.

![Sélectionner le bon certificat](/select_certificate.webp)

Enfin, entrez le nom du profil et cliquez sur **Générer**. 

> Le nom sera utilisé pour identifier le profil dans Codemagic.

![Générer le profil](/generate_profile.webp)

Vous pouvez télécharger le profil en tant que fichier `.mobileprovision`.

![Télécharger le profil](/download_profile.webp)


### Ajout du certificat de signature de code

Codemagic vous permet de télécharger des certificats de signature de code sous forme d'archives PKCS#12 contenant à la fois le certificat et la clé privée qui est nécessaire pour l'utiliser. Lors du téléchargement, Codemagic vous demandera de fournir le mot de passe du certificat (si le certificat est protégé par un mot de passe) ainsi qu'un **Nom de référence** unique, qui pourra ensuite être utilisé dans la configuration `codemagic.yaml` pour récupérer le fichier spécifique.

-   Télécharger le certificat
-   Générer un nouveau certificat
-   Récupérer depuis le portail des développeurs

1.  Ouvrez les paramètres de votre équipe Codemagic, allez dans **paramètres codemagic.yaml** > **Identités de signature de code**.
2.  Ouvrez l'onglet **Certificats iOS**.
3.  Téléchargez le fichier de certificat en cliquant sur **Choisir un fichier .p12 ou .pem** ou en le faisant glisser dans le cadre indiqué.
4.  Entrez le **mot de passe du certificat** et choisissez un **nom de référence**.
5.  Cliquez sur **Ajouter le certificat**

### Ajout du profil de provisionnement

Codemagic vous permet de télécharger un profil de provisionnement à utiliser pour l'application ou de récupérer un profil depuis le portail des développeurs Apple.

Le type de profil, l'équipe, l'ID du paquet et la date d'expiration sont affichés pour chaque profil ajouté aux identités de signature de code. De plus, Codemagic vous indiquera si un certificat de signature de code correspondant est disponible dans les identités de signature de code (une coche Verte dans le champ **Certificat**) ou non.

## 3. Configurer Codemagic

**Configurer les secrets Codemagic**

Vous vous êtes déjà demandé d'où viennent les valeurs du `ENV` ? Eh bien, ce n'est plus un secret – c'est extrait du secret de votre projet. 🤦


## **4. Configurer le fichier de flux de travail Codemagic**

Créez un fichier nommé `codemagic.yml` à la racine de votre projet et ajoutez ce qui suit.

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

Ce flux de travail doit être déclenché manuellement ou après chaque _tag_ GitHub. Si vous avez besoin d'automatiser les tags, merci de vous référer d'abord à [Construction automatique et publication avec les actions GitHub](/blog/automatic-build-and-release-with-github-actions/).

Puis ce flux de travail tirera vos dépendances NodeJS, les installera et construira votre application JavaScript.

> Chaque fois que vous envoyez un nouveau tag, une version sera construite dans TestFlight.

Votre application n'a pas besoin d'utiliser Ionic, seule la base Capacitor est obligatoire, elle peut avoir un ancien module Cordova, mais le plugin Capacitor JS doit être privilégié.

## 5. Déclencher le flux de travail


**Déclencher le flux de travail**

Poussez les nouveaux commits vers la branche `main` ou `developement` pour déclencher le flux de travail.

![Commencé avec le commit](/build_result.webp)

Après quelques minutes, la build devrait être disponible dans votre tableau de bord App Store Connect.

![Tableau de bord Testflight](/testflight_app.webp)

## Démarrer manuellement

Vous pouvez démarrer le flux de travail manuellement. 

D'abord, sélectionnez l'application que vous voulez construire, puis cliquez sur **Démarrer une nouvelle build**.

![Sélectionner l'application](/select_app_codemagic.webp)

Ensuite, sélectionnez la branche que vous voulez construire.

![Sélectionner la branche](/select_branch.webp)

Et cliquez sur **Démarrer une nouvelle build**.

Puis allez à la liste des builds

![Liste des builds](/build_list.webp)

Et cliquez sur la build pour voir le résultat.

![Résultat de la build](/build_result.webp)

## Peut déployer depuis la machine locale

Oui, vous le pouvez, et c'est très simple.

Vous pouvez utiliser Xcode pour construire et signer votre application, comme toujours.

### Merci

Ce blog est basé sur les articles suivants :
- [Livraison continue pour iOS utilisant Codemagic et les actions GitHub](https://litoarias.medium.com/continuous-delivery-for-ios-using-Codemagic-and-github-actions-edf62ee68ecc/)
- [Documentation Codemagic](https://docs.Codemagic.tools/app-store-connect-api/)
- [Ce message GitHub de @mrogunlana](https://github.com/Codemagic-community/Codemagic-plugin-ionic/issues/63/#issuecomment-1074328057)
