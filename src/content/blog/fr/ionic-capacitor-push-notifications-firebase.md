---
slug: ionic-capacitor-push-notifications-firebase
title: 'Notificaciones Push en Ionic Capacitor con Firebase: Una Guía Paso a Paso'
description: >-
  Aprende cómo integrar notificaciones push en una aplicación Ionic Capacitor
  con una guía paso a paso para las plataformas Android e iOS usando Firebase.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-14T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /push_notif.webp
head_image_alt: Notifications Push Ionic Capacitor avec Firebase
keywords: >-
  Ionic, Capacitor, push notifications, Firebase, mobile app development, live
  updates, OTA updates, continuous integration, mobile app updates
tag: tutorial
published: true
locale: fr
next_blog: ''
---

Dans ce tutoriel, nous allons intégrer les notifications push dans une application Ionic Capacitor en utilisant Firebase. Vous n'avez pas besoin d'un service spécifique pour cela, mais vous devez configurer plusieurs éléments au préalable. Firebase est un excellent choix car il est requis pour Android, et vous pouvez facilement l'utiliser pour envoyer des notifications sans utiliser la base de données.

<Steps>
  1. Créer un projet Ionic
</Steps>

Tout d'abord, nous allons créer une application Ionic avec Capacitor activé et spécifier notre **package id**, qui est l'identifiant unique de votre application. Ensuite, nous allons construire l'application et ajouter les plateformes natives.

```bash
ionic start mypush blank --capacitor
cd mypush
```

Si vous avez déjà une application, vous pouvez modifier le **capacitor.config.json** pour inclure votre **appId**. Cependant, si vos dossiers natifs existent déjà, vous devrez remplacer l'id dans tous les fichiers où il apparaît, car Capacitor ne crée le dossier qu'une seule fois et **ne mettra pas à jour l'id lui-même**. Dans le **capacitor.config.json**, vous pouvez également spécifier des options comme la mise à jour du nombre de badges, la lecture du son lors d'un push et l'affichage d'une alerte lors de l'arrivée d'une notification.

```json
{
  "appId": "com.example.mypush",
  "appName": "mypush",
  "plugins": {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  }
}
```

Maintenant, configurons les notifications push en dehors de l'application.

## Configuration Firebase

Commencez par [créer un nouveau projet Firebase](https://firebase.google.com/) ou utilisez un projet existant. Fournissez un nom et des options par défaut pour un nouveau projet.

Si vous avez une nouvelle application, vous devriez voir **"Commencez par ajouter Firebase à votre application"** dans le tableau de bord de votre application. Sinon, cliquez sur l'icône d'engrenage et allez dans les **paramètres du projet** pour ajouter une application.

La boîte de dialogue pour iOS et Android est similaire, et l'important est d'utiliser votre **package id** pour les applications.

<Steps>
  1. Créer des applications iOS et Android
</Steps>

Après l'étape initiale, téléchargez les fichiers suivants :

- fichier **google-services.json** pour Android
- fichier **GoogleService-Info.plist** pour iOS

Ensuite, configurez les plateformes.

### Préparation du Push Android

Pour Android, déplacez le fichier **google-services.json** que vous avez téléchargé dans le dossier **android/app/**

<Steps>
  1. Déplacer le fichier de configuration
</Steps>

C'est tout pour Android. Maintenant, configurons iOS.

### Préparation du Push iOS

Cette partie est plus compliquée. Tout d'abord, [créez un ID d'application pour votre application dans la liste des identifiants](https://developer.apple.com/account/resources/identifiers/list/) de votre compte Apple Developer. Assurez-vous de **sélectionner la capacité Push Notifications** dans la liste.

![ionic-ios-push-id](/ionic-ios-push-id.webp)

Le **Bundle ID** doit être le même que votre ID d'application dans Capacitor et Firebase.

Maintenant, [créez une Clé](https://developer.apple.com/account/resources/authkeys/list/) et activez le **service Apple Push Notifications (APNs)**. Si vous avez atteint le nombre maximum de clés, vous pouvez utiliser une clé existante ou un certificat à la place, mais le processus est plus compliqué.

![ios-developer-push-key](/ios-developer-push-key.webp)

Après avoir téléchargé le fichier **p8**, téléchargez-le sur Firebase. Ouvrez l'onglet **Cloud Messaging** dans les paramètres de votre projet Firebase, téléchargez le fichier et entrez les détails de l'ID de clé et votre ID d'équipe depuis iOS.

![firebase-upload-ios-key](/firebase-upload-ios-key.webp)

Maintenant, apportez des modifications à votre projet Xcode en exécutant :

```bash
npx cap open ios
```

Copiez le fichier **GoogleService-Info.plist** que vous avez téléchargé depuis Firebase dans votre projet iOS. Faites glisser le fichier dans le projet Xcode à l'intérieur du dossier app/app, et sélectionnez **Copier les éléments si nécessaire**.

Ensuite, ajoutez un nouveau Pod pour la dépendance Firebase dans le **ios/App/Podfile** :

```ruby
pod 'Firebase/Messaging'
```

Mettez à jour la plateforme native avec cette commande :

```bash
cd ios/App
pod install
```

Modifiez le code Swift natif dans **ios/App/App/AppDelegate.swift** pour s'enregistrer auprès de Firebase et renvoyer le bon jeton à votre application.

```swift
import UIKit
import Capacitor
import FirebaseCore
import FirebaseMessaging

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()
        
        return true
    }
    
    // ...
}
```

Enfin, ajoutez la Capacité pour les Notifications Push dans votre projet Xcode.

![capacitor-xcode-capability](/capacitor-xcode-capability.webp)

Maintenant, construisez votre application et intégrez les notifications push.

## Intégration des Notifications Push Ionic

Créez un service et une nouvelle page dans votre projet Ionic :

```bash
ionic g service services/push
ionic g page pages/push
```

Mettez à jour le routage dans **app/app-routing.module**