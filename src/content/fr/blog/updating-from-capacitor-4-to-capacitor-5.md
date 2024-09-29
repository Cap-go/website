---
slug: updating-from-capacitor-4-to-capacitor-5
title: "Mise à jour du condensateur 4 vers le condensateur 5\_: un guide étape par étape"
description: >-
  Découvrez comment mettre à jour votre projet de Capacitor 4 vers Capacitor 5
  avec un minimum de modifications majeures, y compris la mise à jour des
  plugins officiels et des outils requis.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-09T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capacitor-5-update.webp
head_image_alt: Capacitor 4 to 5 update illustration
tag: Capacitor
published: true
next_blog: ''
---

Par rapport aux mises à jour précédentes, la transition de Capacitor 4 vers Capacitor 5 implique des modifications minimes. Ce guide fournit des instructions étape par étape pour mettre à jour votre projet vers Capacitor 5, ainsi qu'une liste des modifications majeures pour les plugins officiels.

**Remarque** : Le condensateur 5 nécessite NodeJS 16 ou supérieur, car le nœud 12 a atteint la fin de vie et le nœud 14 atteindra sa fin de vie le 30 avril 2023. Il est recommandé d'utiliser la dernière version LTS de NodeJS.

1 Installez la « dernière » version de la CLI Capacitor dans votre projet :

   ```
   npm i -D @capacitor/cli@latest
   ```

2 Exécutez la commande suivante pour laisser la CLI gérer la migration :

   ```
   npx cap migrate
   ```

   Si des étapes de migration ne peuvent pas être réalisées, des informations supplémentaires seront fournies dans la sortie du terminal. Les étapes de migration manuelle sont répertoriées ci-dessous.

3 Si l'extension VS Code est installée, consultez la section recommandations de l'extension pour trouver l'option permettant de migrer votre projet vers Capacitor 5.

### Mise à niveau du projet iOS Capacitor 4 vers Capacitor 5

1 **Mise à niveau Xcode** : le condensateur 5 nécessite Xcode 141+

2 **Mettre à jour gitignore** : apportez les modifications suivantes à votre fichier `gitignore` :

   ```
   - App/Podfile.lock
   + App/output
   ```

3 **Mettre à jour les actifs pour utiliser une seule icône d'application** : Xcode 14 prend en charge une seule icône d'application de 1024 x 1024. Nettoyez votre AppIconappiconset en supprimant toutes les tailles inutiles.

### Mise à niveau du projet Android Capacitor 4 vers Capacitor 5

1 **Mettre à niveau Android Studio** : Capacitor 5 nécessite Android Studio Flamingo | 202221 ou version ultérieure en raison de l'utilisation de Gradle 8, qui nécessite Java JDK 17. Java 17 est livré avec Android Studio Flamingo, aucun téléchargement supplémentaire n'est donc nécessaire.

2 **Exécutez l'assistant de mise à niveau AGP** : Android Studio peut vous aider avec certaines mises à jour liées à Gradle et le déplacement de packages dans des fichiers de construction. Pour commencer, exécutez « Outils -> Assistant de mise à niveau AGP »

3 **Mettre à jour les variables du projet Android** : Dans votre fichier `variablesgradle`, mettez à jour vos valeurs avec les nouveaux minimums suivants :

   ```
   minSdkVersion = 22
   compileSdkVersion = 33
   targetSdkVersion = 33
   androidxActivityVersion = '1.7.0'
   androidxAppCompatVersion = '1.6.1'
   androidxCoordinatorLayoutVersion = '1.2.0'
   androidxCoreVersion = '1.10.0'
   androidxFragmentVersion = '1.5.6'
   coreSplashScreenVersion = '1.0.0'
   androidxWebkitVersion = '1.6.1'
   junitVersion = '4.13.2'
   androidxJunitVersion = '1.1.5'
   androidxEspressoCoreVersion = '3.5.1'
   cordovaAndroidVersion = '10.1.1'
   ```

4 **Mettre à jour les services Google** :

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.google.gms:google-services:4.3.13'
   +       classpath 'com.google.gms:google-services:4.3.15'
   }
   ```

5 **Mettre à jour le plugin Gradle vers 800** :

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.android.tools.build:gradle:7.2.1'
   +       classpath 'com.android.tools.build:gradle:8.0.0'
   }
   ```

6 **Mettre à jour le wrapper Gradle vers 802** :

   ```
   # gradle-wrapper.properties
   distributionBase=GRADLE_USER_HOME
   distributionPath=wrapper/dists
   - distributionUrl=https\://services.gradle.org/distributions/gradle-7.4.2-all.zip
   + distributionUrl=https\://services.gradle.org/distributions/gradle-8.0.2-all.zip
   zipStoreBase=GRADLE_USER_HOME
   zipStorePath=wrapper/dists
   ```

7 **Désactiver Jetifier** :

   ```
   # gradle.properties
   android.useAndroidX=true
   - android.enableJetifier=true
   ```

8 **Déplacer le package vers `buildgradle`** :

   ```
   # AndroidManifest.xml
   <?xml version="1.0" encoding="utf-8"?>
   - <manifest xmlns:android="http://schemas.android.com/apk/res/android"
   -     package="[YOUR_PACKAGE_ID]">
   + <manifest xmlns:android="http://schemas.android.com/apk/res/android">
   ```

   ```
   # build.gradle
   android {
   +     namespace "[YOUR_PACKAGE_ID]"
         compileSdkVersion rootProject.ext.compileSdkVersion
   ```

9 **Mettre à jour androidScheme** : dans Capacitor 6, `https` sera le paramètre par défaut pour `androidScheme` pour les applications existantes afin de mieux permettre aux applications Capacitor d'utiliser la fonction de remplissage automatique du système. Pour éviter la perte de données à la suite de ce changement, définissez le schéma sur `http` maintenant, même si c'est la valeur par défaut actuelle

   ```
   {
     server: {
       androidScheme: "http"
     }
   }
   ```

10 **Mettre à jour la version de Kotlin** : Si votre projet utilise Kotlin, mettez à jour la variable `kotlin_version` en ``1820'`

### Modifications des fonctionnalités du plugin

La fonctionnalité du plugin suivante a été modifiée ou supprimée. Mettez à jour votre code en conséquence :

- Feuille d'action
- Navigateur
- Caméra
- Appareil
- Géolocalisation
- Google Maps
- Notifications locales
- Notifications poussées
- Barre d'état

### Feuille d'action

- Mettre à jour la variable `androidxMaterialVersion` à `180`

### Navigateur

- Mettre à jour la variable `androidxBrowserVersion` à `150`

### Caméra

- Pour Android 13, ajoutez l'autorisation de lecture des images multimédias (`<uses-permission android:name="androidpermissionREAD_MEDIA_IMAGES"/>`) dans `AndroidManifestxml`
- Mettre à jour la variable `androidxMaterialVersion` à `180`
- Mettre à jour la variable `androidxExifInterfaceVersion` en `136`

### Appareil

- Remplacez `DeviceIduuid` par `DeviceIdidentifier`
- Sur iOS 16+, `DeviceInfoname` renverra un nom de périphérique générique sauf si vous ajoutez les [droits] appropriés (https://developerapplecom/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name/)

### Géolocalisation

- Mettre à jour `playServicesLocationVersion` vers `2101`

### Google Maps

- Mettez à jour les variables suivantes :
  - `googleMapsPlayServicesVersion` à `1810`
  - `googleMapsUtilsVersion` à `340`
  - `googleMapsKtxVersion` à `340`
  - `googleMapsUtilsKtxVersion` à `340`
  - `kotlinxCoroutinesVersion` à `164`
  - `androidxCoreKTXVersion` à `1100`- `kotlin_version` à `1820`

### Notifications locales

- Pour Android 13, une nouvelle vérification des autorisations d'exécution est requise pour planifier des notifications locales lors du ciblage du SDK 33. Appelez `checkPermissions()` et `requestPermissions()` en conséquence

### Notifications poussées

- Pour Android 13, une nouvelle vérification des autorisations d'exécution est requise pour recevoir des notifications push lors du ciblage du SDK 33. Appelez `checkPermissions()` et `requestPermissions()` en conséquence
- Mettre à jour la variable `firebaseMessagingVersion` en `2312`

### Barre d'état

- Sur iOS, l'animation de la barre d'état par défaut a été modifiée en « FADE »

En suivant ces étapes et en mettant à jour votre code en conséquence, vous devriez maintenant avoir mis à jour avec succès votre projet de Capacitor 4 vers Capacitor 5. Assurez-vous de tester minutieusement votre application pour vous assurer que toutes les fonctionnalités et tous les plugins fonctionnent comme prévu.