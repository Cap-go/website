---
slug: updating-from-capacitor-4-to-capacitor-5
title: 'Capacitor 4 から Capacitor 5 へのアップデート: ステップバイステップガイド'
description: Capacitor 4 から Capacitor 5 へのプロジェクトの更新方法を、公式プラグインと必要なツールの更新を含め、最小限の変更で学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-09T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capacitor-5-update.webp
head_image_alt: Capacitor 4 zu 5 Update-Illustration
keywords: >-
  Capacitor, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Capacitor
published: true
locale: de
next_blog: ''
---

Im Vergleich zu früheren Updates beinhaltet der Übergang von Capacitor 4 auf Capacitor 5 minimale Breaking Changes. Diese Anleitung bietet Schritt-für-Schritt-Anweisungen für die Aktualisierung Ihres Projekts auf Capacitor 5 sowie eine Liste der Breaking Changes für offizielle Plugins.

**Hinweis**: Capacitor 5 benötigt NodeJS 16 oder höher, da Node 12 das Ende der Unterstützung erreicht hat und Node 14 am 30. April 2023 das Ende der Unterstützung erreichen wird. Es wird empfohlen, die neueste LTS-Version von NodeJS zu verwenden.

<Steps>
1. Installieren Sie die `latest` Version der Capacitor CLI in Ihrem Projekt:

   ```
   npm i -D @capacitor/cli@latest
   ```

2. Führen Sie den folgenden Befehl aus, damit die CLI die Migration durchführt:

   ```
   npx cap migrate
   ```

   Falls einige Migrationsschritte nicht durchgeführt werden können, werden zusätzliche Informationen in der Terminal-Ausgabe bereitgestellt. Manuelle Migrationsschritte sind unten aufgeführt.

3. Wenn Sie die VS Code-Erweiterung installiert haben, überprüfen Sie den Empfehlungsbereich der Erweiterung, um die Option zur Migration Ihres Projekts auf Capacitor 5 zu finden.
</Steps>

### Aktualisierung des Capacitor 4 iOS-Projekts auf Capacitor 5

<Steps>
1. **Xcode aktualisieren**: Capacitor 5 benötigt Xcode 14.1+

2. **Gitignore aktualisieren**: Nehmen Sie die folgenden Änderungen an Ihrer `gitignore`-Datei vor:

   ```
   - App/Podfile.lock
   + App/output
   ```

3. **Assets auf ein einzelnes App-Icon aktualisieren**: Xcode 14 unterstützt ein einzelnes App-Icon mit 1024x1024. Bereinigen Sie Ihr AppIcon.appiconset, indem Sie alle unnötigen Größen entfernen.
</Steps>

### Aktualisierung des Capacitor 4 Android-Projekts auf Capacitor 5

<Steps>
1. **Android Studio aktualisieren**: Capacitor 5 benötigt Android Studio Flamingo | 2022.2.1 oder neuer aufgrund der Verwendung von Gradle 8, das Java JDK 17 erfordert. Java 17 wird mit Android Studio Flamingo mitgeliefert, sodass keine zusätzlichen Downloads erforderlich sind.

2. **AGP Upgrade Assistant ausführen**: Android Studio kann bei einigen Updates im Zusammenhang mit Gradle und der Verschiebung von Paketen in Build-Dateien helfen. Starten Sie `Tools -> AGP Upgrade Assistant`.

3. **Android-Projektvariablen aktualisieren**: Aktualisieren Sie in Ihrer `variables.gradle`-Datei Ihre Werte auf die folgenden neuen Mindestanforderungen:

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

4. **Google Services aktualisieren**:

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.google.gms:google-services:4.3.13'
   +       classpath 'com.google.gms:google-services:4.3.15'
   }
   ```

5. **Gradle-Plugin auf 8.0.0 aktualisieren**:

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.android.tools.build:gradle:7.2.1'
   +       classpath 'com.android.tools.build:gradle:8.0.0'
   }
   ```

6. **Gradle-Wrapper auf 8.0.2 aktualisieren**:

   ```
   # gradle-wrapper.properties
   distributionBase=GRADLE_USER_HOME
   distributionPath=wrapper/dists
   - distributionUrl=https\://services.gradle.org/distributions/gradle-7.4.2-all.zip
   + distributionUrl=https\://services.gradle.org/distributions/gradle-8.0.2-all.zip
   zipStoreBase=GRADLE_USER_HOME
   zipStorePath=wrapper/dists
   ```

7. **Jetifier deaktivieren**:

   ```
   # gradle.properties
   android.useAndroidX=true
   - android.enableJetifier=true
   ```

8. **Paket in `build.gradle` verschieben**:

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

9. **androidScheme aktualisieren**: In Capacitor 6 wird `https` die Standardeinstellung für `androidScheme` für bestehende Apps sein, um Capacitor-Anwendungen besser in die Lage zu versetzen, die System-Autofill-Funktion zu nutzen. Um Datenverlust durch diese Änderung zu vermeiden, setzen Sie das Schema jetzt auf `http`, auch wenn es die aktuelle Standardeinstellung ist.

   ```
   {
     server: {
       androidScheme: "http"
     }
   }
   ```

10. **Kotlin-Version aktualisieren**: Wenn Ihr Projekt Kotlin verwendet, aktualisieren Sie die `kotlin_version`-Variable auf `'1.8.20'`.
</Steps>

### Änderungen der Plugin-Funktionalität

Die folgenden Plugin-Funktionalitäten wurden geändert oder entfernt. Aktualisieren Sie Ihren Code entsprechend:

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

- Aktualisieren Sie die `androidxMaterialVersion`-Variable auf `1.8.0`

### Browser

- Aktualisieren Sie die `androidxBrowserVersion`-Variable auf `1.5.0`

### Camera

- Fügen Sie für Android 13 die Berechtigung zum Lesen von Medienbildern (`<?xml version="1.0" encoding="utf-8"?>`) in `AndroidManifest.xml` hinzu
- Aktualisieren Sie die `androidxMaterialVersion`-Variable auf `1.8.0`
- Aktualisieren Sie die `androidxExifInterfaceVersion`-Variable auf `1.3.6`

### Device

- Ändern Sie `DeviceId.uuid` zu `DeviceId.identifier`
- Auf iOS 16+ wird `DeviceInfo.name` einen generischen Gerätenamen zurückgeben, es sei denn, Sie fügen die entsprechenden [Berechtigungen](https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.device-information.user-assigned-device-name/) hinzu

### Geolocation

- Aktualisieren Sie die `playServicesLocationVersion` auf `21.0.1`

### Google Maps

- Aktualisieren Sie die folgenden Variablen:
  - `googleMapsPlayServicesVersion` auf `18.1.0`
  - `googleMapsUtilsVersion` auf `3.4.0`
  - `googleMapsKtxVersion` auf `3.4.0`
  - `googleMapsUtilsKtxVersion` auf `3.4.0`
  - `kotlinxCoroutinesVersion` auf `1.6.4`
  - `androidxCoreKTXVersion` auf `1.10.0`
  - `kotlin_version` auf `1.8.20`### Lokale Benachrichtigungen

- Für Android 13 ist eine neue Laufzeit-Berechtigungsprüfung erforderlich, um lokale Benachrichtigungen bei SDK 33 zu planen. Rufen Sie entsprechend `checkPermissions()` und `requestPermissions()` auf

### Push-Benachrichtigungen

- Für Android 13 ist eine neue Laufzeit-Berechtigungsprüfung erforderlich, um Push-Benachrichtigungen bei SDK 33 zu empfangen. Rufen Sie entsprechend `checkPermissions()` und `requestPermissions()` auf
- Aktualisieren Sie die Variable `firebaseMessagingVersion` auf `2312`

### Status-Leiste

- Unter iOS wurde die Standard-Status-Leisten-Animation zu `FADE` geändert

Wenn Sie diese Schritte befolgen und Ihren Code entsprechend aktualisieren, sollten Sie Ihr Projekt erfolgreich von Capacitor 4 auf Capacitor 5 aktualisiert haben. Stellen Sie sicher, dass Sie Ihre Anwendung gründlich testen, um sicherzustellen, dass alle Funktionen und Plugins wie erwartet funktionieren