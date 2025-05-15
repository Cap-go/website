---
slug: updating-from-capacitor-4-to-capacitor-5
title: >-
  Aktualisierung von Capacitor 4 auf Capacitor 5: Eine
  Schritt-für-Schritt-Anleitung
description: >-
  Erfahren Sie, wie Sie Ihr Projekt von Capacitor 4 auf Capacitor 5 mit
  minimalen breaking changes aktualisieren, einschließlich der Aktualisierung
  offizieller Plugins und erforderlicher Tools.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-09T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capacitor-5-update.webp
head_image_alt: Capacitor 4 zu 5 Update Illustration
keywords: >-
  Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Capacitor
published: true
locale: de
next_blog: ''
---
Im Vergleich zu früheren Updates beinhaltet der Übergang von Capacitor 4 zu Capacitor 5 minimale breaking changes. Dieser Leitfaden bietet schrittweise Anweisungen zum Aktualisieren Ihres Projekts auf Capacitor 5 sowie eine Liste der breaking changes für offizielle Plugins.

**Hinweis**: Capacitor 5 erfordert NodeJS 16 oder höher, da Node 12 das Ende seiner Lebensdauer erreicht hat und Node 14 am 30. April 2023 das Ende seiner Lebensdauer erreicht. Es wird empfohlen, die neueste LTS-Version von NodeJS zu verwenden.

1. Installieren Sie die `neueste` Version der Capacitor CLI in Ihrem Projekt:

   ```
   npm i -D @capacitor/cli@latest
   ```

2. Führen Sie den folgenden Befehl aus, um die Migration von der CLI verwalten zu lassen:

   ```
   npx cap migrate
   ```

   Falls einzelne Migrationsschritte nicht erreicht werden können, werden zusätzliche Informationen im Terminalausgabefenster bereitgestellt. Manuelle Migrationsschritte sind unten aufgeführt.

3. Wenn Sie die VS Code-Erweiterung installiert haben, überprüfen Sie den Abschnitt Empfehlungen der Erweiterung, um die Option zu finden, Ihr Projekt auf Capacitor 5 zu migrieren.

### Upgrade des Capacitor 4 iOS-Projekts auf Capacitor 5

1. **Upgrade Xcode**: Capacitor 5 erfordert Xcode 14.1+.

2. **Aktualisieren Sie .gitignore**: Nehmen Sie die folgenden Änderungen an Ihrer `.gitignore`-Datei vor:

   ```
   - App/Podfile.lock
   + App/output
   ```

3. **Aktualisieren Sie Assets zur Verwendung eines einzelnen App-Icons**: Xcode 14 unterstützt ein einzelnes App-Icon mit 1024x1024. Bereinigen Sie Ihr AppIcon.appiconset, indem Sie alle unnötigen Größen entfernen.

### Upgrade des Capacitor 4 Android-Projekts auf Capacitor 5

1. **Upgrade Android Studio**: Capacitor 5 erfordert Android Studio Flamingo | 2022.2.1 oder neuer aufgrund der Verwendung von Gradle 8, das Java JDK 17 benötigt. Java 17 wird mit Android Studio Flamingo ausgeliefert, sodass keine zusätzlichen Downloads erforderlich sind.

2. **Führen Sie den AGP-Upgrade-Assistenten aus**: Android Studio kann bei einigen Updates im Zusammenhang mit Gradle und dem Verschieben von Paketen in Build-Dateien helfen. Um zu beginnen, führen Sie `Tools -> AGP Upgrade Assistant` aus.

3. **Aktualisieren Sie Android-Projektvariablen**: Aktualisieren Sie in Ihrer `variables.gradle`-Datei Ihre Werte auf die folgenden neuen Mindestwerte:

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

4. **Aktualisieren Sie Google Services**:

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.google.gms:google-services:4.3.13'
   +       classpath 'com.google.gms:google-services:4.3.15'
   }
   ```

5. **Aktualisieren Sie das Gradle-Plugin auf 8.0.0**:

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.android.tools.build:gradle:7.2.1'
   +       classpath 'com.android.tools.build:gradle:8.0.0'
   }
   ```

6. **Aktualisieren Sie den Gradle-Wrapper auf 8.0.2**:

   ```
   # gradle-wrapper.properties
   distributionBase=GRADLE_USER_HOME
   distributionPath=wrapper/dists
   - distributionUrl=https\://services.gradle.org/distributions/gradle-7.4.2-all.zip
   + distributionUrl=https\://services.gradle.org/distributions/gradle-8.0.2-all.zip
   zipStoreBase=GRADLE_USER_HOME
   zipStorePath=wrapper/dists
   ```

7. **Deaktivieren Sie Jetifier**:

   ```
   # gradle.properties
   android.useAndroidX=true
   - android.enableJetifier=true
   ```

8. **Verschieben Sie das Paket nach `build.gradle`**:

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

9. **Aktualisieren Sie androidScheme**: In Capacitor 6 wird `https` die Standardeinstellung für `androidScheme` für vorhandene Apps sein, um es Capacitor-Anwendungen besser zu ermöglichen, die Autofill-Funktion des Systems zu nutzen. Um Datenverlust infolge dieser Änderung zu vermeiden, stellen Sie das Schema jetzt auf `http` ein, auch wenn es derzeit die Standard-Einstellung ist.

   ```
   {
     server: {
       androidScheme: "http"
     }
   }
   ```

10. **Aktualisieren Sie die Kotlin-Version**: Wenn Ihr Projekt Kotlin verwendet, aktualisieren Sie die Variable `kotlin_version` auf `'1.8.20'`.

### Änderungen an der Plugin-Funktionalität

Die folgende Funktionalität der Plugins wurde geändert oder entfernt. Aktualisieren Sie Ihren Code entsprechend:

- Action Sheet
- Browser
- Kamera
- Gerät
- Geolokalisierung
- Google Maps
- Lokale Benachrichtigungen
- Push-Benachrichtigungen
- Statusleiste

### Action Sheet

- Aktualisieren Sie die Variable `androidxMaterialVersion` auf `1.8.0`.

### Browser

- Aktualisieren Sie die Variable `androidxBrowserVersion` auf `1.5.0`.

### Kamera

- Für Android 13 fügen Sie die Berechtigung zum Lesen von Medienbildern (`<?xml version="1.0" encoding="utf-8"?>`) in `AndroidManifest.xml` hinzu.
- Aktualisieren Sie die Variable `androidxMaterialVersion` auf `1.8.0`.
- Aktualisieren Sie die Variable `androidxExifInterfaceVersion` auf `1.3.6`.

### Gerät

- Ändern Sie `DeviceId.uuid` in `DeviceId.identifier`.
- Auf iOS 16+ gibt `DeviceInfo.name` einen generischen Gerätenamen zurück, es sei denn, Sie fügen die entsprechenden [Entitlements](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name/) hinzu.

### Geolokalisierung

- Aktualisieren Sie die `playServicesLocationVersion` auf `21.0.1`.

### Google Maps

- Aktualisieren Sie die folgenden Variablen:
  - `googleMapsPlayServicesVersion` auf `18.1.0`.
  - `googleMapsUtilsVersion` auf `3.4.0`.
  - `googleMapsKtxVersion` auf `3.4.0`.
  - `googleMapsUtilsKtxVersion` auf `3.4.0`.
  - `kotlinxCoroutinesVersion` auf `1.6.4`.
  - `androidxCoreKTXVersion` auf `1.10.0`.
  - `kotlin_version` auf `1.8.20`.

### Lokale Benachrichtigungen

- Für Android 13 ist eine neue Laufzeitberechtigungsüberprüfung erforderlich, um lokale Benachrichtigungen zu planen, wenn SDK 33 angestrebt wird. Rufen Sie `checkPermissions()` und `requestPermissions()` entsprechend auf.

### Push-Benachrichtigungen

- Für Android 13 ist eine neue Laufzeitberechtigungsüberprüfung erforderlich, um Push-Benachrichtigungen zu empfangen, wenn SDK 33 angestrebt wird. Rufen Sie `checkPermissions()` und `requestPermissions()` entsprechend auf.
- Aktualisieren Sie die Variable `firebaseMessagingVersion` auf `23.1.2`.

### Statusleiste

- Auf iOS wurde die Standardanimation der Statusleiste in `FADE` geändert.

Indem Sie diese Schritte befolgen und Ihren Code entsprechend aktualisieren, sollten Sie Ihr Projekt erfolgreich von Capacitor 4 auf Capacitor 5 aktualisiert haben. Stellen Sie sicher, dass Sie Ihre Anwendung gründlich testen, um sicherzustellen, dass alle Funktionen und Plugins wie erwartet funktionieren.
