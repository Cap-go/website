---
slug: aggiornamento-da-capacitor-4-a-capacitor-5
title: 'Aggiornamento da Capacitor 4 a Capacitor 5: Una Guida Passo dopo Passo'
description: >-
  Scopri come aggiornare il tuo progetto da Capacitor 4 a Capacitor 5 con
  modifiche minime, incluso l'aggiornamento dei plugin ufficiali e degli
  strumenti necessari.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-09T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capacitor-5-update.webp
head_image_alt: Illustrazione dell'aggiornamento da Capacitor 4 a 5
keywords: >-
  Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Capacitor
published: true
locale: it
next_blog: ''
original_slug: updating-from-capacitor-4-to-capacitor-5
---
Rispetto agli aggiornamenti precedenti, il passaggio da Capacitor 4 a Capacitor 5 comporta modifiche minime. Questa guida fornisce istruzioni dettagliate per aggiornare il tuo progetto a Capacitor 5, oltre a un elenco delle modifiche importanti per i plugin ufficiali.

**Nota**: Capacitor 5 richiede NodeJS 16 o superiore, poiché Node 12 ha raggiunto la fine del supporto e Node 14 raggiungerà la fine del supporto il 30 aprile 2023. Si consiglia di utilizzare l'ultima versione LTS di NodeJS.

1. Installa l'ultima versione del CLI Capacitor nel tuo progetto:

   ```
   npm i -D @capacitor/cli@latest
   ```

2. Esegui il seguente comando per permettere al CLI di gestire la migrazione:

   ```
   npx cap migrate
   ```

   Se alcuni passaggi della migrazione non possono essere completati, verranno fornite informazioni aggiuntive nell'output del terminale. I passaggi di migrazione manuale sono elencati di seguito.

3. Se hai installato l'estensione VS Code, controlla la sezione delle raccomandazioni dell'estensione per trovare l'opzione per migrare il tuo progetto a Capacitor 5.

### Aggiornamento del Progetto iOS Capacitor 4 a Capacitor 5

1. **Aggiorna Xcode**: Capacitor 5 richiede Xcode 14.1+.

2. **Aggiorna .gitignore**: Apporta le seguenti modifiche al tuo file `.gitignore`:

   ```
   - App/Podfile.lock
   + App/output
   ```

3. **Aggiorna gli Assets per utilizzare una singola icona app**: Xcode 14 supporta una singola icona app di 1024x1024. Pulisci il tuo AppIcon.appiconset rimuovendo tutte le dimensioni non necessarie.

### Aggiornamento del Progetto Android Capacitor 4 a Capacitor 5

1. **Aggiorna Android Studio**: Capacitor 5 richiede Android Studio Flamingo | 2022.2.1 o più recente a causa dell'utilizzo di Gradle 8, che richiede Java JDK 17. Java 17 è incluso in Android Studio Flamingo, quindi non sono necessari download aggiuntivi.

2. **Esegui AGP Upgrade Assistant**: Android Studio può aiutare con alcuni aggiornamenti relativi a Gradle e lo spostamento dei pacchetti nei file di build. Per iniziare, esegui `Tools -> AGP Upgrade Assistant`.

3. **Aggiorna le Variabili del Progetto Android**: Nel tuo file `variables.gradle`, aggiorna i tuoi valori ai seguenti nuovi minimi:

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

4. **Aggiorna Google Services**:

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.google.gms:google-services:4.3.13'
   +       classpath 'com.google.gms:google-services:4.3.15'
   }
   ```

5. **Aggiorna il plugin Gradle a 8.0.0**:

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.android.tools.build:gradle:7.2.1'
   +       classpath 'com.android.tools.build:gradle:8.0.0'
   }
   ```

6. **Aggiorna Gradle wrapper a 8.0.2**:

   ```
   # gradle-wrapper.properties
   distributionBase=GRADLE_USER_HOME
   distributionPath=wrapper/dists
   - distributionUrl=https\://services.gradle.org/distributions/gradle-7.4.2-all.zip
   + distributionUrl=https\://services.gradle.org/distributions/gradle-8.0.2-all.zip
   zipStoreBase=GRADLE_USER_HOME
   zipStorePath=wrapper/dists
   ```

7. **Disabilita Jetifier**:

   ```
   # gradle.properties
   android.useAndroidX=true
   - android.enableJetifier=true
   ```

8. **Sposta il pacchetto in `build.gradle`**:

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

9. **Aggiorna androidScheme**: In Capacitor 6, `https` sarà l'impostazione predefinita per `androidScheme` per le app esistenti per consentire alle applicazioni Capacitor di utilizzare meglio la funzione di Autofill di sistema. Per evitare la perdita di dati a seguito di questa modifica, imposta lo schema su `http` ora, anche se è l'impostazione predefinita attuale.

   ```
   {
     server: {
       androidScheme: "http"
     }
   }
   ```

10. **Aggiorna la versione di Kotlin**: Se il tuo progetto utilizza Kotlin, aggiorna la variabile `kotlin_version` a `'1.8.20'`.

### Modifiche alla Funzionalità dei Plugin

Le seguenti funzionalità dei plugin sono state modificate o rimosse. Aggiorna il tuo codice di conseguenza:

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

- Aggiorna la variabile `androidxMaterialVersion` a `1.8.0`.

### Browser

- Aggiorna la variabile `androidxBrowserVersion` a `1.5.0`.

### Camera

- Per Android 13, aggiungi il permesso di lettura delle immagini multimediali (`<?xml version="1.0" encoding="utf-8"?>`) in `AndroidManifest.xml`.
- Aggiorna la variabile `androidxMaterialVersion` a `1.8.0`.
- Aggiorna la variabile `androidxExifInterfaceVersion` a `1.3.6`.

### Device

- Cambia `DeviceId.uuid` in `DeviceId.identifier`.
- Su iOS 16+, `DeviceInfo.name` restituirà un nome dispositivo generico a meno che non aggiungi gli appropriati [entitlements](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name/).

### Geolocation

- Aggiorna `playServicesLocationVersion` a `21.0.1`.

### Google Maps

- Aggiorna le seguenti variabili:
  - `googleMapsPlayServicesVersion` a `18.1.0`.
  - `googleMapsUtilsVersion` a `3.4.0`.
  - `googleMapsKtxVersion` a `3.4.0`.
  - `googleMapsUtilsKtxVersion` a `3.4.0`.
  - `kotlinxCoroutinesVersion` a `1.6.4`.
  - `androidxCoreKTXVersion` a `1.10.0`.
  - `kotlin_version` a `1.8.20`.

### Local Notifications

- Per Android 13, è necessario un nuovo controllo dei permessi runtime per programmare le notifiche locali quando si ha come target SDK 33. Chiama `checkPermissions()` e `requestPermissions()` di conseguenza.

### Push Notifications

- Per Android 13, è necessario un nuovo controllo dei permessi runtime per ricevere le notifiche push quando si ha come target SDK 33. Chiama `checkPermissions()` e `requestPermissions()` di conseguenza.
- Aggiorna la variabile `firebaseMessagingVersion` a `23.1.2`.

### Status Bar

- Su iOS, l'animazione predefinita della status bar è stata modificata in `FADE`.

Seguendo questi passaggi e aggiornando il tuo codice di conseguenza, dovresti aver aggiornato con successo il tuo progetto da Capacitor 4 a Capacitor 5. Assicurati di testare accuratamente la tua applicazione per verificare che tutte le funzionalità e i plugin funzionino come previsto.
