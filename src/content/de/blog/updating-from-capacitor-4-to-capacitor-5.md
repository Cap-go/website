---
slug: updating-from-capacitor-4-to-capacitor-5
title: >-
  Aktualisierung von Capacitor 4 auf Capacitor 5: Eine
  Schritt-für-Schritt-Anleitung
description: >-
  Erfahren Sie, wie Sie Ihr Projekt mit minimalen Breaking Changes von Capacitor
  4 auf Capacitor 5 aktualisieren können, einschließlich der Aktualisierung
  offizieller Plugins und erforderlicher Tools.
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-09T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capacitor-5-update.webp
head_image_alt: Capacitor 4 auf 5 Update-Illustration
tag: Capacitor
published: true
locale: de
next_blog: ''
---

Im Vergleich zu früheren Aktualisierungen bringt der Übergang von Capacitor 4 zu Capacitor 5 nur minimale Breaking Changes mit sich. Diese Anleitung bietet eine schrittweise Anweisung zur Aktualisierung Ihres Projekts auf Capacitor 5 sowie eine Liste der Breaking Changes für offizielle Plugins.

**Hinweis**: Capacitor 5 erfordert NodeJS 16 oder höher, da Node 12 das Ende seiner Lebensdauer erreicht hat und Node 14 am 30. April 2023 das Ende seiner Lebensdauer erreichen wird. Es wird empfohlen, die neueste LTS-Version von NodeJS zu verwenden.

1. Installieren Sie die `latest` Version der Capacitor CLI in Ihrem Projekt:

2. Führen Sie den folgenden Befehl aus, um die CLI die Migration durchführen zu lassen:

   Wenn bestimmte Migrationsschritte nicht durchgeführt werden können, werden zusätzliche Informationen in der Terminalausgabe bereitgestellt. Manuelle Migrationsschritte sind unten aufgeführt.

3. Wenn Sie die VS Code-Erweiterung installiert haben, überprüfen Sie den Empfehlungsbereich der Erweiterung, um die Option zur Migration Ihres Projekts auf Capacitor 5 zu finden.

### Aktualisierung des Capacitor 4 iOS-Projekts auf Capacitor 5

1. **Xcode aktualisieren**: Capacitor 5 erfordert Xcode 14.1+.

2. **Gitignore aktualisieren**: Nehmen Sie die folgenden Änderungen an Ihrer `gitignore`-Datei vor:

3. **Assets aktualisieren, um ein einziges App-Icon zu verwenden**: Xcode 14 unterstützt ein einziges App-Icon mit 1024x1024. Bereinigen Sie Ihr AppIcon.appiconset, indem Sie alle unnötigen Größen entfernen.

### Aktualisierung des Capacitor 4 Android-Projekts auf Capacitor 5

1. **Android Studio aktualisieren**: Capacitor 5 erfordert Android Studio Flamingo | 2022.2.1 oder neuer aufgrund der Verwendung von Gradle 8, das Java JDK 17 erfordert. Java 17 wird mit Android Studio Flamingo ausgeliefert, sodass keine zusätzlichen Downloads erforderlich sind.

2. **AGP Upgrade Assistant ausführen**: Android Studio kann bei einigen Aktualisierungen im Zusammenhang mit Gradle und dem Verschieben von Paketen in Build-Dateien helfen. Führen Sie zum Starten `Tools -> AGP Upgrade Assistant` aus.

3. **Android-Projektvariablen aktualisieren**: Aktualisieren Sie in Ihrer `variables.gradle`-Datei Ihre Werte auf die folgenden neuen Mindestwerte:

4. **Google Services aktualisieren**:

5. **Gradle-Plugin auf 8.0.0 aktualisieren**:

6. **Gradle-Wrapper auf 8.0.2 aktualisieren**:

7. **Jetifier deaktivieren**:

8. **Paket in `build.gradle` verschieben**:

9. **androidScheme aktualisieren**: In Capacitor 6 wird `https` die Standardeinstellung für `androidScheme` für bestehende Apps sein, um Capacitor-Anwendungen besser in die Lage zu versetzen, die System-Autofill-Funktion zu nutzen. Um Datenverluste als Folge dieser Änderung zu vermeiden, setzen Sie das Schema jetzt auf `http`, auch wenn es der aktuelle Standard ist.

10. **Kotlin-Version aktualisieren**: Wenn Ihr Projekt Kotlin verwendet, aktualisieren Sie die Variable `kotlin_version` auf `'1.8.20'`.

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

- Aktualisieren Sie die Variable `androidxMaterialVersion` auf `1.8.0`

### Browser

- Aktualisieren Sie die Variable `androidxBrowserVersion` auf `1.5.0`

### Camera

- Fügen Sie für Android 13 die Berechtigung zum Lesen von Medienbildern (``) in `AndroidManifest.xml` hinzu
- Aktualisieren Sie die Variable `androidxMaterialVersion` auf `1.8.0`
- Aktualisieren Sie die Variable `androidxExifInterfaceVersion` auf `1.3.6`

### Device

- Ändern Sie `Device.id.uuid` zu `Device.id.identifier`
- Unter iOS 16+ gibt `Device.info.name` einen generischen Gerätenamen zurück, es sei denn, Sie fügen die entsprechenden [Berechtigungen](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name/) hinzu

### Geolocation

- Aktualisieren Sie `playServicesLocationVersion` auf `21.0.1`

### Google Maps

- Aktualisieren Sie die folgenden Variablen:
  - `googleMapsPlayServicesVersion` auf `18.1.0`
  - `googleMapsUtilsVersion` auf `3.4.0`
  - `googleMapsKtxVersion` auf `3.4.0`
  - `googleMapsUtilsKtxVersion` auf `3.4.0`
  - `kotlinxCoroutinesVersion` auf `1.6.4`
  - `androidxCoreKTXVersion` auf `1.10.0`
  - `kotlin_version` auf `1.8.20`### Lokale Benachrichtigungen

- Für Android 13 ist eine neue Laufzeit-Berechtigungsprüfung erforderlich, um lokale Benachrichtigungen zu planen, wenn SDK 33 anvisiert wird. Rufen Sie entsprechend `checkPermissions()` und `requestPermissions()` auf

### Push-Benachrichtigungen

- Für Android 13 ist eine neue Laufzeit-Berechtigungsprüfung erforderlich, um Push-Benachrichtigungen zu empfangen, wenn SDK 33 anvisiert wird. Rufen Sie entsprechend `checkPermissions()` und `requestPermissions()` auf
- Aktualisieren Sie die Variable `firebaseMessagingVersion` auf `23.1.2`

### Statusleiste

- Unter iOS wurde die Standard-Animation der Statusleiste auf `FADE` geändert

Wenn Sie diese Schritte befolgen und Ihren Code entsprechend aktualisieren, sollten Sie nun Ihr Projekt erfolgreich von Capacitor 4 auf Capacitor 5 aktualisiert haben. Stellen Sie sicher, dass Sie Ihre Anwendung gründlich testen, um zu gewährleisten, dass alle Funktionen und Plugins wie erwartet funktionieren.