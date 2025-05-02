---
slug: mise-a-jour-de-capacitor-4-vers-capacitor-5
title: 'Mise à jour de Capacitor 4 vers Capacitor 5 : Un guide étape par étape'
description: >-
  Découvrez comment mettre à jour votre projet de Capacitor 4 vers Capacitor 5
  avec un minimum de changements majeurs, y compris la mise à jour des plugins
  officiels et des outils requis.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-09T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capacitor-5-update.webp
head_image_alt: Illustration de la mise à jour de Capacitor 4 vers 5
keywords: >-
  Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Capacitor
published: true
locale: fr
next_blog: ''
original_slug: updating-from-capacitor-4-to-capacitor-5
---
Par rapport aux mises à jour précédentes, la transition de Capacitor 4 vers Capacitor 5 implique des changements mineurs. Ce guide fournit des instructions étape par étape pour mettre à jour votre projet vers Capacitor 5, ainsi qu'une liste des changements majeurs pour les plugins officiels.

**Note** : Capacitor 5 nécessite NodeJS 16 ou supérieur, car Node 12 a atteint sa fin de vie et Node 14 atteindra sa fin de vie le 30 avril 2023. Il est recommandé d'utiliser la dernière version LTS de NodeJS.

1. Installez la version `latest` du CLI Capacitor dans votre projet :

   ```
   npm i -D @capacitor/cli@latest
   ```

2. Exécutez la commande suivante pour laisser le CLI gérer la migration :

   ```
   npx cap migrate
   ```

   Si certaines étapes de migration ne peuvent pas être réalisées, des informations supplémentaires seront fournies dans la sortie du terminal. Les étapes de migration manuelle sont listées ci-dessous.

3. Si vous avez l'extension VS Code installée, consultez la section des recommandations de l'extension pour trouver l'option permettant de migrer votre projet vers Capacitor 5.

### Mise à niveau du projet iOS Capacitor 4 vers Capacitor 5

1. **Mettre à niveau Xcode** : Capacitor 5 nécessite Xcode 14.1+.

2. **Mettre à jour .gitignore** : Effectuez les modifications suivantes dans votre fichier `.gitignore` :

   ```
   - App/Podfile.lock
   + App/output
   ```

3. **Mettre à jour les ressources pour utiliser une seule icône d'application** : Xcode 14 prend en charge une seule icône d'application de 1024x1024. Nettoyez votre AppIcon.appiconset en supprimant toutes les tailles inutiles.

### Mise à niveau du projet Android Capacitor 4 vers Capacitor 5

1. **Mettre à niveau Android Studio** : Capacitor 5 nécessite Android Studio Flamingo | 2022.2.1 ou plus récent en raison de l'utilisation de Gradle 8, qui nécessite Java JDK 17. Java 17 est livré avec Android Studio Flamingo, donc aucun téléchargement supplémentaire n'est nécessaire.

2. **Exécuter l'Assistant de mise à niveau AGP** : Android Studio peut aider avec certaines mises à jour liées à Gradle et au déplacement des packages dans les fichiers de build. Pour commencer, exécutez `Tools -> AGP Upgrade Assistant`.

3. **Mettre à jour les variables du projet Android** : Dans votre fichier `variables.gradle`, mettez à jour vos valeurs avec les nouveaux minimums suivants :

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

4. **Mettre à jour Google Services** :

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.google.gms:google-services:4.3.13'
   +       classpath 'com.google.gms:google-services:4.3.15'
   }
   ```

5. **Mettre à jour le plugin Gradle vers 8.0.0** :

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.android.tools.build:gradle:7.2.1'
   +       classpath 'com.android.tools.build:gradle:8.0.0'
   }
   ```

6. **Mettre à jour Gradle wrapper vers 8.0.2** :

   ```
   # gradle-wrapper.properties
   distributionBase=GRADLE_USER_HOME
   distributionPath=wrapper/dists
   - distributionUrl=https\://services.gradle.org/distributions/gradle-7.4.2-all.zip
   + distributionUrl=https\://services.gradle.org/distributions/gradle-8.0.2-all.zip
   zipStoreBase=GRADLE_USER_HOME
   zipStorePath=wrapper/dists
   ```

7. **Désactiver Jetifier** :

   ```
   # gradle.properties
   android.useAndroidX=true
   - android.enableJetifier=true
   ```

8. **Déplacer le package vers `build.gradle`** :

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

9. **Mettre à jour androidScheme** : Dans Capacitor 6, `https` sera le paramètre par défaut pour `androidScheme` pour les applications existantes afin de mieux permettre aux applications Capacitor d'utiliser la fonction Autofill du système. Pour éviter la perte de données suite à ce changement, définissez le scheme sur `http` maintenant, même si c'est la valeur par défaut actuelle.

   ```
   {
     server: {
       androidScheme: "http"
     }
   }
   ```

10. **Mettre à jour la version Kotlin** : Si votre projet utilise Kotlin, mettez à jour la variable `kotlin_version` vers `'1.8.20'`.

### Changements de fonctionnalité des plugins

Les fonctionnalités suivantes des plugins ont été modifiées ou supprimées. Mettez à jour votre code en conséquence :

- Action Sheet
- Browser
- Camera
- Device
- Geolocation
- Google Maps
- Local Notifications
- Push Notifications
- Status Bar

### Action Sheet

- Mettez à jour la variable `androidxMaterialVersion` vers `1.8.0`.

### Browser

- Mettez à jour la variable `androidxBrowserVersion` vers `1.5.0`.

### Camera

- Pour Android 13, ajoutez l'autorisation de lecture des images média (`<?xml version="1.0" encoding="utf-8"?>`) dans `AndroidManifest.xml`.
- Mettez à jour la variable `androidxMaterialVersion` vers `1.8.0`.
- Mettez à jour la variable `androidxExifInterfaceVersion` vers `1.3.6`.

### Device

- Changez `DeviceId.uuid` en `DeviceId.identifier`.
- Sur iOS 16+, `DeviceInfo.name` retournera un nom d'appareil générique sauf si vous ajoutez les [droits](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name/) appropriés.

### Geolocation

- Mettez à jour `playServicesLocationVersion` vers `21.0.1`.

### Google Maps

- Mettez à jour les variables suivantes :
  - `googleMapsPlayServicesVersion` vers `18.1.0`.
  - `googleMapsUtilsVersion` vers `3.4.0`.
  - `googleMapsKtxVersion` vers `3.4.0`.
  - `googleMapsUtilsKtxVersion` vers `3.4.0`.
  - `kotlinxCoroutinesVersion` vers `1.6.4`.
  - `androidxCoreKTXVersion` vers `1.10.0`.
  - `kotlin_version` vers `1.8.20`.

### Local Notifications

- Pour Android 13, une nouvelle vérification d'autorisation d'exécution est requise pour planifier des notifications locales lors du ciblage du SDK 33. Appelez `checkPermissions()` et `requestPermissions()` en conséquence.

### Push Notifications

- Pour Android 13, une nouvelle vérification d'autorisation d'exécution est requise pour recevoir des notifications push lors du ciblage du SDK 33. Appelez `checkPermissions()` et `requestPermissions()` en conséquence.
- Mettez à jour la variable `firebaseMessagingVersion` vers `23.1.2`.

### Status Bar

- Sur iOS, l'animation par défaut de la barre d'état a été changée en `FADE`.

En suivant ces étapes et en mettant à jour votre code en conséquence, vous devriez maintenant avoir réussi à mettre à jour votre projet de Capacitor 4 vers Capacitor 5. Assurez-vous de tester votre application de manière approfondie pour vous assurer que toutes les fonctionnalités et plugins fonctionnent comme prévu.
