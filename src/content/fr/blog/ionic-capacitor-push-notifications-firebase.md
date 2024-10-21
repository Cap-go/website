---
slug: ionic-capacitor-push-notifications-firebase
title: 'Notifications Push Ionic Capacitor avec Firebase : Un guide étape par étape'
description: >-
  Découvrez comment intégrer des notifications push dans votre application Ionic
  Capacitor en utilisant Firebase, avec des instructions étape par étape pour
  les plateformes Android et iOS.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-14T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /push_notif.webp
head_image_alt: Notifications push d'Ionic Capacitor avec Firebase
tag: tutorial
published: true
locale: fr
next_blog: ''
---

Dans ce tutoriel, nous allons intégrer les notifications push dans une application Ionic Capacitor en utilisant Firebase. Vous n'avez pas besoin d'un service spécifique pour cela, mais vous devez configurer plusieurs choses au préalable. Firebase est un excellent choix car il est requis pour Android, et vous pouvez facilement l'utiliser pour envoyer des notifications sans utiliser la base de données.

Tout d'abord, nous allons créer une application Ionic avec Capacitor activé et spécifier notre **package id**, qui est l'identifiant unique de votre application. Ensuite, nous allons construire l'application et ajouter les plateformes natives.

Si vous avez déjà une application, vous pouvez modifier le **capacitor.config.json** pour inclure votre **appId**. Cependant, si vos dossiers natifs existent déjà, vous devrez remplacer l'id dans tous les fichiers où il apparaît, car Capacitor ne crée le dossier qu'une seule fois et **ne mettra pas à jour l'id lui-même**. Dans le **capacitor.config.json**, vous pouvez également spécifier des options comme la mise à jour du nombre de badges, la lecture d'un son lors d'un push, et l'affichage d'une alerte lorsqu'une notification arrive.

Maintenant, configurons les notifications push en dehors de l'application.

## Configuration Firebase

Commencez par [créer un nouveau projet Firebase](https://firebase.google.com/) ou utilisez un projet existant. Fournissez un nom et des options par défaut pour un nouveau projet.

Si vous avez une nouvelle application, vous devriez voir "Commencez par ajouter Firebase à votre application" dans le tableau de bord de votre application. Sinon, cliquez sur l'icône d'engrenage et allez dans **paramètres du projet** pour ajouter une application.

La boîte de dialogue pour iOS et Android est similaire, et l'important est d'utiliser votre **package id** pour les applications.

Après l'étape initiale, téléchargez les fichiers suivants :

- Fichier **google-services.json** pour Android
- Fichier **GoogleService-Info.plist** pour iOS

Ensuite, configurez les plateformes.

### Préparation Push Android

Pour Android, déplacez le fichier **google-services.json** que vous avez téléchargé dans le dossier **android/app/**.

C'est tout pour Android. Maintenant, configurons iOS.

### Préparation Push iOS

Cette partie est plus compliquée. Tout d'abord, [créez un ID d'application pour votre application dans la liste des identifiants](https://developer.apple.com/account/resources/identifiers/list/) de votre compte Apple Developer. Assurez-vous de **sélectionner la capacité Push Notifications** dans la liste.

Le **Bundle ID** doit être le même que votre ID d'application dans Capacitor et Firebase.

Maintenant, [créez une Clé](https://developer.apple.com/account/resources/authkeys/list/) et activez le **service Apple Push Notifications (APNs)**. Si vous avez atteint le nombre maximum de clés, vous pouvez utiliser une clé existante ou un certificat à la place, mais le processus est plus compliqué.

Après avoir téléchargé le fichier **p8**, téléchargez-le sur Firebase. Ouvrez l'onglet **Cloud Messaging** dans les paramètres de votre projet Firebase, téléchargez le fichier et saisissez les détails pour l'ID de clé et votre ID d'équipe d'iOS.

Maintenant, apportez des modifications à votre projet Xcode en exécutant :

Copiez le fichier **GoogleService-Info.plist** que vous avez téléchargé depuis Firebase dans votre projet iOS. Faites glisser le fichier dans le projet Xcode à l'intérieur du dossier app/app, et sélectionnez **Copier les éléments si nécessaire**.

Ensuite, ajoutez un nouveau Pod pour la dépendance Firebase dans le **ios/App/Podfile** :

Mettez à jour la plateforme native avec cette commande :

Modifiez le code Swift natif dans **ios/App/App/AppDelegate.swift** pour s'enregistrer auprès de Firebase et renvoyer le bon jeton à votre application.

Enfin, ajoutez la Capacité pour les notifications push dans votre projet Xcode.

Maintenant, construisez votre application et intégrez les notifications push.

## Intégration des notifications push Ionic

Créez un service et une nouvelle page dans votre projet Ionic :

Mettez à jour le routage dans **app/app-routing.module**.ts** pour inclure la nouvelle page avec un identifiant dynamique :

Créez un service pour gérer les notifications push dans **services/fcmservicets** :

Appelez la fonction `initPush()` dans **app/appcomponentts** :

Gérez les informations sur la page de détails dans **pages/details/detailspagets** :

Affichez les détails dans **pages/details/detailspagehtml** :

Compilez l'application, synchronisez vos modifications et déployez-la sur votre appareil

Maintenant, vous pouvez envoyer des notifications push avec Firebase

## Envoi de notifications push avec Firebase

Il existe plusieurs façons d'envoyer des notifications push avec Firebase

### Test sur un appareil spécifique

Après avoir déployé votre application sur un appareil, vous pouvez vérifier les journaux de la console pour voir le jeton après l'enregistrement. Utilisez ce jeton pour envoyer un test de notification ciblé afin de confirmer que votre intégration fonctionne. Dans Firebase, allez dans **Cloud Messaging** et sélectionnez **Envoyer un message de test**. Ajoutez le jeton de l'appareil provenant des journaux.

Si tout est correctement configuré, vous devriez voir une notification push sur votre appareil.

### Message push avec données supplémentaires

Pour tester une notification push avec des informations supplémentaires, suivez l'assistant sur la même page pour spécifier les informations générales et sélectionner la plateforme que vous souhaitez cibler. Ajoutez des **options supplémentaires** pour envoyer des données avec votre notification push.

Dans la section **Options avancées**, ajoutez une paire clé-valeur **Données personnalisées**. Par exemple, vous pouvez utiliser la clé `detailsId` et une valeur de votre choix. Ces données seront utilisées dans l'application pour naviguer vers la page de détails avec l'identifiant spécifié.

Après avoir envoyé la notification push, votre application devrait la recevoir et afficher la page de détails avec l'identifiant spécifié lorsque la notification est touchée.

### Utilisation de l'API Firebase

Vous pouvez également envoyer des notifications push par programmation en utilisant l'API Firebase. Pour ce faire, vous devez obtenir la **Clé du serveur** dans les paramètres de votre projet Firebase sous l'onglet **Cloud Messaging**.

Avec la clé du serveur, vous pouvez envoyer une requête POST à l'API Firebase avec les données requises. Voici un exemple utilisant Node.js et la bibliothèque `request` :

Remplacez `YOUR_SERVER_KEY` et `YOUR_DEVICE_TOKEN` par votre clé de serveur et jeton d'appareil réels. Exécutez le script, et votre appareil devrait recevoir la notification push avec les données personnalisées.

C'est tout ! Vous avez réussi à intégrer les notifications push dans votre application Ionic Capacitor en utilisant Firebase. Maintenant, vous pouvez envoyer des notifications push à vos utilisateurs sur les plateformes Android et iOS.