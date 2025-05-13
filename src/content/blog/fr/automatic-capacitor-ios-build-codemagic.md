---
slug: création-automatique-ios-capacitor-avec-codemagic
title: Pembangunan iOS Otomatis Capacitor dengan Codemagic
description: >-
  Cara Menyiapkan Pipeline CI/CD untuk Aplikasi iOS Ionic Anda dengan Codemagic
  dalam 5 Menit (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-24T00:00:00.000Z
updated_at: 2024-07-24T00:00:00.000Z
head_image: /Codemagic_ios.webp
head_image_alt: Ilustrasi TestFlight dengan Codemagic
keywords: 'Codemagic, CI/CD, iOS, automatic build, automatic release, mobile app updates'
tag: CI/CD
published: true
locale: fr
next_blog: automatic-capacitor-android-build-codemagic
---
## Livraison Continue pour iOS avec Codemagic


## Prérequis

Avant de poursuivre le tutoriel...

-   Adhésion au programme développeur iOS.
-   Envie de lire 😆...

## Important concernant le prix

![Price Codemagic Action](/price_codemagic.webp)

[https://codemagic.io/pricing/](https://codemagic.io/pricing/)

Le service est '_gratuit_' jusqu'à 500 minutes macOS M1 / mois, selon la machine choisie.  
Nous allons utiliser une machine **_macOS M1_**, vous pouvez voir sur la capture d'écran son prix et ses limites (prix à la date de création du tutoriel, ils pourraient subir des modifications à l'avenir)

🔴 **_Une fois avertis des exigences et des prix, si vous le souhaitez, nous continuons..._**

> **_📣_ Dans cet article, nous supposons que nous avons l'application créée dans iTunes Connect, nous avons les certificats de l'écosystème Apple, tout sera configuré par Codemagic !**

## Plongeons 🤿

**Étapes à suivre dans l'article**

1.  _Utilisation de l'API App Store Connect avec Codemagic_
2.  _Prérequis_
3.  _Création d'une clé API App Store Connect_
4.  _Utilisation d'une clé API App Store Connect_
5.  _Copier les fichiers Fastline_
6.  _Configurer Codemagic_

## 1\. Utilisation de l'API App Store Connect avec Codemagic

> Depuis février 2021, l'authentification à deux facteurs ou la vérification en deux étapes est requise pour tous les utilisateurs pour se connecter à App Store Connect. Cette couche de sécurité supplémentaire pour votre identifiant Apple permet de s'assurer que vous êtes la seule personne à pouvoir accéder à votre compte.  
> De [Apple Support](https://developer.apple.com/support/authentication/)

> Pour commencer avec match, vous devez révoquer vos certificats existants. Mais ne vous inquiétez pas, vous aurez directement le nouveau.


### Prérequis

Pour pouvoir utiliser l'API App Store Connect, Codemagic a besoin de **trois** éléments.

1.  ID de l'émetteur.
2.  ID de la clé.
3.  Fichier de clé ou contenu de la clé.

### Création d'une clé API App Store Connect

Pour générer des clés, vous devez avoir l'autorisation Admin dans App Store Connect. Si vous n'avez pas cette autorisation, vous pouvez diriger la personne concernée vers cet article et suivre les instructions suivantes.

1 — Connectez-vous à [App Store Connect](https://appstoreconnect.apple.com/).

2 — Sélectionnez [Utilisateurs et Accès](https://appstoreconnect.apple.com/access/users/).

![App Store Connect user access](/select_user_access.webp)

3 — Sélectionnez l'onglet Clés API.

![App Store Connect API Keys](/user_access_keys.webp)

4 — Cliquez sur Générer une clé API ou sur le bouton Ajouter (+).

![App Store Connect API keys create](/user_access.webp)

5 — Entrez le nom de la clé et sélectionnez un niveau d'accès. Nous recommandons de choisir les droits d'accès `App Manager`, en savoir plus sur les permissions des rôles du Programme Apple Developer [ici](https://help.apple.com/app-store-connect/#/deve5f9a89d7)

![App Store Connect API keys create name](/gen_key.webp)

6 — Cliquez sur Générer.

> **L'accès d'une clé API ne peut pas être limité à des applications spécifiques.**

Le nom de la nouvelle clé, l'ID de la clé, un lien de téléchargement et d'autres informations apparaissent sur la page.

![App Store Connect download keys](/download_key.webp)

Récupérez les trois informations nécessaires ici :
<1> ID de l'émetteur.  
<2> ID de la clé.  
<3> Cliquez sur "Télécharger la clé API" pour télécharger votre clé privée API. Le lien de téléchargement n'apparaît que si la clé privée n'a pas encore été téléchargée. Apple ne conserve pas de copie de la clé privée. Vous ne pouvez donc la télécharger qu'une seule fois.

> _🔴_ Conservez votre clé privée dans un endroit sûr. Vous ne devriez jamais partager vos clés, les stocker dans un dépôt de code, ou inclure les clés dans le code côté client.

### Ajout de la clé API App Store Connect à Codemagic

1.  Ouvrez vos paramètres d'équipe Codemagic,
![Select Team integrations](/select_team.webp)
![Open team](/open_team.webp)
Sélectionnez les identités de signature de code
![Select code signing identities](/select_code_signing_identities.webp)
Et téléchargez le certificat
![Upload the certificate](/upload_certificate.webp)

2.  Cliquez sur le bouton **Ajouter une clé**.
3.  Entrez le `nom de la clé API App Store Connect`. C'est un nom lisible pour la clé qui sera utilisé pour y faire référence plus tard dans les paramètres de l'application.
4.  Entrez les valeurs `ID de l'émetteur` et `ID de la clé`.
5.  Cliquez sur **Choisir un fichier .p8** ou faites glisser le fichier pour télécharger la clé API App Store Connect téléchargée précédemment.
6.  Cliquez sur **Enregistrer**.

_Maintenant nous pouvons gérer Codemagic avec la clé API App Store Connect, super !_


## 2\. Créer les certificats et les profils de provisionnement


#### Certificats

Ouvrez XCode et allez dans **Préférences** > **Comptes** > **Apple ID** > **Équipes** et sélectionnez votre équipe.

![Code signing identities](/code_signing_identities.webp)

Cliquez sur **Gérer les certificats** > **+** et sélectionnez **Distribution Apple**.

![Apple Distribution](/apple_distribution.webp)

Vous pouvez alors créer un nouveau certificat.

Ensuite, vous devez aller dans le trousseau pour télécharger le certificat au format `.p12`.

Pour ce faire, vous devez aller dans le trousseau, basculer vers le trousseau **session** puis l'onglet **Mes certificats**.

![My Certificates](/my_certificates.webp)

Vous pouvez alors sélectionner le certificat que vous souhaitez télécharger. (Regardez la date du certificat)

Puis faites un clic droit sur le certificat et sélectionnez **Exporter**.

Choisissez le format de fichier **Personal Information Exchange (.p12)**.

Cela téléchargera le certificat au format `.p12`.

#### Profils de provisionnement

Ouvrez [Apple Developer](https://developer.apple.com/account/resources/profiles/list) et sélectionnez la bonne équipe.

Créez ensuite un nouveau profil en cliquant sur **+**

![Create a new profile](/create_new_profile.webp)

Et sélectionnez **App Store Connect**.

![Select App Store Connect](/select_app_store_connect.webp)

Vous devez ensuite sélectionner la bonne application, attention vous ne pouvez pas utiliser de joker sinon la signature échouera.

![Select the right app](/select_app.webp)

Sélectionnez le bon certificat que vous avez créé précédemment (regardez la date d'expiration, elle devrait être le même jour et mois qu'aujourd'hui) et cliquez sur **Continuer**.

![Select the right certificate](/select_certificate.webp)

Enfin, entrez le nom du profil et cliquez sur **Générer**.

> Le nom sera utilisé pour identifier le profil dans Codemagic.

![Generate the profile](/generate_profile.webp)

Vous pouvez télécharger le profil au format `.mobileprovision`.

![Download the profile](/download_profile.webp)


### Ajout du certificat de signature de code

Codemagic vous permet de télécharger des certificats de signature de code sous forme d'archives PKCS#12 contenant à la fois le certificat et la clé privée nécessaire pour l'utiliser. Lors du téléchargement, Codemagic vous demandera de fournir le mot de passe du certificat (si le certificat est protégé par mot de passe) ainsi qu'un **Nom de référence** unique, qui pourra ensuite être utilisé dans la configuration `codemagic.yaml` pour récupérer le fichier spécifique.

-   Télécharger le certificat
-   Générer un nouveau certificat
-   Récupérer depuis le Portail Développeur

1.  Ouvrez vos paramètres d'équipe Codemagic, allez dans **paramètres codemagic.yaml** > **Identités de signature de code**.
2.  Ouvrez l'onglet **Certificats iOS**.
3.  Téléchargez le fichier de certificat en cliquant sur **Choisir un fichier .p12 ou .pem** ou en le faisant glisser dans le cadre indiqué.
4.  Entrez le **Mot de passe du certificat** et choisissez un **Nom de référence**.
5.  Cliquez sur **Ajouter le certificat**

### Ajout du profil de provisionnement

Codemagic vous permet de télécharger un profil de provisionnement à utiliser pour l'application ou de récupérer un profil depuis le Portail Développeur Apple.

Le type du profil, l'équipe, l'identifiant du bundle et la date d'expiration sont affichés pour chaque profil ajouté aux Identités de signature de code. De plus, Codemagic vous indiquera si un certificat de signature de code correspondant est disponible dans les Identités de signature de code (une coche verte dans le champ **Certificat**) ou non.

## 3\. Configuration de Codemagic

**Configurer les secrets Codemagic**

Vous vous demandez d'où viennent les valeurs des `ENV` ? Eh bien, ce n'est plus un secret - c'est à partir des secrets de votre projet. 🤦


## **4\. Configurer le fichier de workflow Codemagic**

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

Ce workflow devrait être déclenché manuellement ou après chaque _tag_ GitHub, si vous avez besoin d'automatiser le tag, veuillez vous référer d'abord à [Construction et publication automatiques avec les actions GitHub](/blog/automatic-build-and-release-with-github-actions/).

Ensuite, ce workflow récupérera vos dépendances NodeJS, les installera et construira votre application JavaScript.

> Chaque fois que vous envoyez un nouveau tag, une version sera construite dans TestFlight.

Votre application n'a pas besoin d'utiliser Ionic, seule la base Capacitor est obligatoire, elle peut avoir d'anciens modules Cordova, mais les plugins Capacitor JS devraient être préférés.

## 5\. Déclencher le workflow


**Déclencher le workflow**

Poussez les nouveaux commits vers la branche `main` ou `development` pour déclencher le workflow.

![Started with commit](/build_result.webp)

Après quelques minutes, la construction devrait être disponible dans votre tableau de bord App Store Connect.

![Testflight Dashboard](/testflight_app.webp)

## Démarrer manuellement

Vous pouvez démarrer le workflow manuellement.

Sélectionnez d'abord l'application que vous voulez construire, puis cliquez sur **Démarrer une nouvelle construction**.

![Select app](/select_app_codemagic.webp)

Puis sélectionnez la branche que vous voulez construire.

![Select branch](/select_branch.webp)

Et cliquez sur **Démarrer une nouvelle construction**.

Ensuite, allez à la liste des constructions

![Build list](/build_list.webp)

Et cliquez sur la construction pour voir le résultat.

![Build result](/build_result.webp)

## Peut déployer depuis la machine locale

Oui, vous pouvez, et c'est très simple.

Vous pouvez utiliser Xcode pour construire et signer votre application, comme d'habitude.

### Remerciements

Ce blog est basé sur les articles suivants :
- [Livraison continue pour iOS utilisant Codemagic et les actions GitHub](https://litoarias.medium.com/continuous-delivery-for-ios-using-Codemagic-and-github-actions-edf62ee68ecc/)
- [Documentation Codemagic](https://docs.Codemagic.tools/app-store-connect-api/)
- [Ce message GitHub de @mrogunlana](https://github.com/Codemagic-community/Codemagic-plugin-ionic/issues/63/#issuecomment-1074328057)
