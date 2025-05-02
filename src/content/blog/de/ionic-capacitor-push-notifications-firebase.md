---
slug: ionic-capacitor-push-notifications-firebase
title: >-
  Ionic Capacitor Push-Benachrichtigungen mit Firebase: Eine
  Schritt-für-Schritt-Anleitung
description: >-
  Erfahren Sie, wie Sie Push-Benachrichtigungen in Ihrer Ionic Capacitor-App mit
  Firebase integrieren können, mit schrittweisen Anleitungen für Android- und
  iOS-Plattformen.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-14T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /push_notif.webp
head_image_alt: Ionic Capacitor Push-Benachrichtigungen mit Firebase
tag: tutorial
published: true
locale: de
next_blog: ''
---

In diesem Tutorial integrieren wir Push-Benachrichtigungen in einer Ionic Capacitor App unter Verwendung von Firebase. Sie benötigen dafür keinen speziellen Dienst, müssen aber vorab einige Dinge konfigurieren. Firebase ist eine ausgezeichnete Wahl, da es für Android erforderlich ist und Sie es einfach zum Senden von Benachrichtigungen verwenden können, ohne die Datenbank zu nutzen.

Zunächst erstellen wir eine Ionic App mit aktiviertem Capacitor und geben unsere **package id** an, die den eindeutigen Bezeichner für Ihre App darstellt. Dann bauen wir die App und fügen die nativen Plattformen hinzu.

Wenn Sie bereits eine App haben, können Sie die **capacitor.config.json** ändern, um Ihre **appId** einzufügen. Falls Ihre nativen Ordner jedoch bereits existieren, müssen Sie die ID in allen Dateien ersetzen, in denen sie vorkommt, da Capacitor den Ordner nur einmal erstellt und **die ID nicht selbst aktualisiert**. In der **capacitor.config.json** können Sie auch Optionen wie die Aktualisierung des Badge-Zählers, das Abspielen von Tönen bei Push und das Anzeigen eines Alerts beim Eintreffen einer Benachrichtigung festlegen.

Lassen Sie uns nun Push-Benachrichtigungen außerhalb der App konfigurieren.

## Firebase Konfiguration

Beginnen Sie damit, [ein neues Firebase-Projekt zu erstellen](https://firebase.google.com/) oder ein bestehendes zu verwenden. Geben Sie einen Namen und Standardoptionen für ein neues Projekt an.

Bei einer neuen App sollten Sie "Beginnen Sie damit, Firebase zu Ihrer App hinzuzufügen" im Dashboard Ihrer App sehen. Andernfalls klicken Sie auf das Zahnrad-Symbol und gehen Sie zu **Projekteinstellungen**, um eine App hinzuzufügen.

Der Dialog für iOS und Android sieht ähnlich aus, und das Wichtigste ist, Ihre **package id** für die Apps zu verwenden.

Laden Sie nach dem ersten Schritt die folgenden Dateien herunter:

- **google-services.json** Datei für Android
- **GoogleService-Info.plist** Datei für iOS

Konfigurieren Sie als Nächstes die Plattformen.

### Android Push-Vorbereitung

Verschieben Sie für Android die heruntergeladene **google-services.json** Datei in den Ordner **android/app/**.

Das war alles für Android. Lassen Sie uns nun iOS konfigurieren.

### iOS Push-Vorbereitung

Dieser Teil ist komplizierter. Erstellen Sie zunächst [eine App-ID für Ihre App in der Liste der Identifikatoren](https://developer.apple.com/account/resources/identifiers/list/) Ihres Apple Developer-Kontos. Stellen Sie sicher, dass Sie die **Push-Benachrichtigungen-Funktion** aus der Liste auswählen.

Die **Bundle ID** sollte dieselbe sein wie Ihre App-ID innerhalb von Capacitor und Firebase.

Erstellen Sie nun [einen Schlüssel](https://developer.apple.com/account/resources/authkeys/list/) und aktivieren Sie den **Apple Push Notifications service (APNs)**. Wenn Sie die maximale Anzahl von Schlüsseln erreicht haben, können Sie einen bestehenden Schlüssel oder ein Zertifikat verwenden, aber der Prozess ist komplizierter.

Laden Sie nach dem Herunterladen der **p8**-Datei diese zu Firebase hoch. Öffnen Sie den Tab **Cloud Messaging** in Ihren Firebase-Projekteinstellungen, laden Sie die Datei hoch und geben Sie die Details für die Schlüssel-ID und Ihre Team-ID von iOS ein.

Nehmen Sie nun Änderungen an Ihrem Xcode-Projekt vor, indem Sie Folgendes ausführen:

Kopieren Sie die **GoogleService-Info.plist** Datei, die Sie von Firebase heruntergeladen haben, in Ihr iOS-Projekt. Ziehen Sie die Datei in das Xcode-Projekt innerhalb des app/app-Ordners und wählen Sie **Elemente bei Bedarf kopieren**.

Fügen Sie als Nächstes einen neuen Pod für die Firebase-Abhängigkeit in der **ios/App/Podfile** hinzu:

Aktualisieren Sie die native Plattform mit diesem Befehl:

Modifizieren Sie den nativen Swift-Code in **ios/App/App/AppDelegate.swift**, um sich bei Firebase zu registrieren und das korrekte Token an Ihre App zurückzugeben.

Fügen Sie schließlich die Fähigkeit für Push-Benachrichtigungen in Ihrem Xcode-Projekt hinzu.

Bauen Sie nun Ihre App und integrieren Sie Push-Benachrichtigungen.

## Ionic Push-Benachrichtigungen Integration

Erstellen Sie einen Service und eine neue Seite in Ihrem Ionic-Projekt:

Aktualisieren Sie das Routing in **app/app-routing.module**.ts** um die neue Seite mit einer dynamischen ID einzuschließen:

```bash
ionic start pushApp blank --type=angular --capacitor --package-id=com.appdactic.devpush
cd ./pushApp
ionic build
npx cap add ios
npx cap add android
```

Erstelle einen Service, um Push-Benachrichtigungen in **services/fcmservicets** zu verwalten:

```json
{
  "appId": "com.appdactic.devpush",
  "appName": "pushApp",
  "bundledWebRuntime": false,
  "npmClient": "npm",
  "webDir": "www",
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 0
    },
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  },
  "cordova": {}
}
```

Rufe die `initPush()` Funktion in **app/appcomponentts** auf:

```bash
npx cap open ios
```

Verarbeite die Informationen auf der Detailseite in **pages/details/detailspagets**:

```ruby
target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'Firebase/Messaging'
end
```

Zeige die Details in **pages/details/detailspagehtml** an:

```bash
npx cap update ios
```

Baue die App, synchronisiere deine Änderungen und stelle sie auf deinem Gerät bereit

```swift
import UIKit
import Capacitor
import Firebase

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?

  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
    FirebaseApp.configure()
    return true
  }

  // All the existing functions
  // ...

  // Update this one:
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        Messaging.messaging().apnsToken = deviceToken
        InstanceID.instanceID().instanceID { (result, error) in
            if let error = error {
                NotificationCenter.default.post(name: Notification.Name(CAPNotifications.DidFailToRegisterForRemoteNotificationsWithError.name()), object: error)
            } else if let result = result {
                NotificationCenter.default.post(name: Notification.Name(CAPNotifications.DidRegisterForRemoteNotificationsWithDeviceToken.name()), object: result.token)
            }
        }
    }
}
```

Jetzt kannst du Push-Benachrichtigungen mit Firebase senden

## Senden von Push-Benachrichtigungen mit Firebase

Es gibt mehrere Möglichkeiten, Push-Benachrichtigungen mit Firebase zu senden

### Spezifischer Gerätetest

Nachdem du deine App auf einem Gerät bereitgestellt hast, kannst du die Konsolenprotokolle überprüfen, um das Token nach der Registrierung zu sehen. Verwende dieses Token, um einen gezielten Test-Push zu senden und deine Integration zu bestätigen. Gehe in Firebase zu **Cloud Messaging** und wähle **Testnachricht senden**. Füge das Geräte-Token aus den Protokollen hinzu.

![firebase-test-push](/firebase-test-pushwebp)

Wenn alles korrekt eingerichtet ist, solltest du eine Push-Benachrichtigung auf deinem Gerät sehen

### Push-Nachricht mit Payload

Um eine Push-Benachrichtigung mit zusätzlichen Informationen zu testen, folge dem Assistenten auf derselben Seite, um allgemeine Informationen anzugeben und wähle die Plattform aus, die du ansprechen möchtest. Füge **zusätzliche Optionen** hinzu, um einen Payload mit deiner Push-Benachrichtigung zu senden.

![firebase-push-payload](/firebase-push-payloadwebp)

Im Abschnitt **Erweiterte Optionen** füge ein Schlüssel-Wert-Paar für **Benutzerdefinierte Daten** hinzu. Zum Beispiel kannst du den Schlüssel `detailsId` und einen Wert deiner Wahl verwenden. Diese Daten werden in der App verwendet, um zur Detailseite mit der angegebenen ID zu navigieren.

Nach dem Senden der Push-Benachrichtigung sollte deine App sie empfangen und die Detailseite mit der angegebenen ID anzeigen, wenn die Benachrichtigung angetippt wird.

### Verwendung der Firebase API

Du kannst auch programmatisch Push-Benachrichtigungen mithilfe der Firebase API senden. Dazu musst du den **Server-Schlüssel** aus deinen Firebase-Projekteinstellungen unter der Registerkarte **Cloud Messaging** erhalten.

Mit dem Server-Schlüssel kannst du eine POST-Anfrage an die Firebase API mit dem erforderlichen Payload senden. Hier ist ein Beispiel mit Nodejs und der `request`-Bibliothek:

```bash
ionic g service services/fcm
ionic g page pages/details
```

Ersetze `YOUR_SERVER_KEY` und `YOUR_DEVICE_TOKEN` durch deinen tatsächlichen Server-Schlüssel und Geräte-Token. Führe das Skript aus, und dein Gerät sollte die Push-Benachrichtigung mit dem benutzerdefinierten Payload erhalten.

Das war's! Du hast erfolgreich Push-Benachrichtigungen in deine Ionic Capacitor App mit Firebase integriert. Jetzt kannst du Push-Benachrichtigungen an deine Benutzer sowohl auf Android- als auch auf iOS-Plattformen senden.