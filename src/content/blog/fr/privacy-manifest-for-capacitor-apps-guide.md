---
slug: privacy-manifest-for-capacitor-apps-guide
title: 'Déclaration de confidentialité pour les applications Capacitor : Guide'
description: >-
  Découvrez comment créer une Politique de Confidentialité pour votre
  application afin de répondre aux exigences de l'App Store et protéger
  efficacement les données des utilisateurs.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-02T03:07:47.047Z
updated_at: 2026-01-15T19:03:50.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ec9a7d7747adc4bca8a776-1743563280473.jpg
head_image_alt: Développement mobile
keywords: >-
  Privacy Manifest, Capacitor, App Store compliance, user data protection, app
  development, privacy standards
tag: 'Development, Mobile, Security'
published: true
locale: fr
next_blog: ''
---
**Vous voulez lancer votre application [Capacitor](https://capacitorjs.com/) sur l'[App Store](https://en.wikipedia.org/wiki/App_Store_\(Apple\)) sans délais ?** Commencez par créer un Manifeste de Confidentialité. Apple exige désormais que les développeurs incluent ce document pour garantir que les applications respectent des normes strictes de confidentialité. Voici ce que vous devez savoir :

-   **Qu'est-ce qu'un Manifeste de Confidentialité ?**  
    Un fichier structuré décrivant les pratiques de collecte de données de votre application, l'utilisation des API et les domaines de suivi.
    
-   **Pourquoi est-ce important :**
    
    -   Conforme aux règles de l'App Store pour éviter les rejets.  
    -   Renforce la confiance en étant transparent sur le traitement des données.
-   **Composants clés à inclure :**
    
    -   Les API accédant aux données utilisateur (ex : localisation, photos).
    -   Les étiquettes de confidentialité pour les types de données collectées. 
    -   Les domaines de suivi utilisés pour l'analytique ou la publicité.
-   **Comment le créer :**
    
    -   Utilisez JSON pour définir les détails de collecte de données.
    -   Placez le fichier `PrivacyInfo.xcprivacy` dans le bon répertoire de votre projet.
    -   Validez-le avec des outils comme [Xcode](https://developer.apple.com/xcode/) pour éviter les erreurs.
-   **Outils pour simplifier le processus :**  
    Utilisez des plateformes comme [Capgo](https://capgo.app/) pour la validation automatique du manifeste, les mises à jour en temps réel et le suivi des erreurs.
    

**Restez conforme, protégez la confidentialité des utilisateurs et évitez les délais de l'App Store en suivant ce guide.**

## Les bases du Manifeste de Confidentialité

### Définition du Manifeste de Confidentialité

Un manifeste de confidentialité est un fichier structuré qui décrit les pratiques de données de votre application. Il détaille des éléments comme les API accédant aux données utilisateur, les domaines de suivi, l'intégration des SDK tiers. Ce document permet non seulement d'assurer la conformité mais aussi d'établir la confiance. Voyons les composants clés à inclure.

### Éléments principaux du Manifeste de Confidentialité

Voici les principaux éléments à inclure dans votre manifeste de confidentialité pour répondre aux exigences d'Apple :

1.  **API requises**  
    Cette section liste les API sensibles utilisées par votre application et explique pourquoi elles sont nécessaires.
    
    Voici un tableau résumant les exigences courantes des API :
    
    | Catégorie d'API | Usage courant | Documentation requise |
    | --- | --- | --- |
    | Services de localisation | Navigation utilisateur | Description de l'objectif et de l'utilisation |
    | Bibliothèque photos | Photos de profil | Niveau d'accès et intention |
    | Contacts | Synchronisation carnet d'adresses | Déclaration de minimisation des données |
    
2.  **Étiquettes de confidentialité**  
    Ces étiquettes assurent la transparence en spécifiant :
    
    -   Les types de données collectées
    -   Les raisons de la collecte de données
    -   Si les données sont liées à l'identité de l'utilisateur 
    -   Comment les données sont utilisées pour le suivi
3.  **Domaines de suivi**  
    Cette section liste tous les domaines impliqués dans le suivi, comme ceux utilisés pour l'analytique, la publicité ou le traitement des données par des tiers.
    

> "Conforme à l'App Store" - Capgo [\[1\]](https://capgo.app/)

Selon Capgo, 95% des utilisateurs sont conformes aux mises à jour dans les 24 heures. Avec plus de 23,5 millions de mises à jour livrées [\[1\]](https://capgo.app/), maintenir votre documentation de confidentialité à jour est essentiel pour conserver la confiance des utilisateurs.

## Créer des Manifestes de Confidentialité pour [Capacitor](https://capacitorjs.com/)

![Capacitor Framework Documentation Website](https://assets.seobotai.com/capgo.app/67ec9a7d7747adc4bca8a776/7e137b9b90adb3934b29b03381f213c1.jpg)

### Prérequis

Avant de commencer à créer le manifeste, assurez-vous d'avoir :

-   Xcode 15 ou supérieur installé
-   Un projet Capacitor 8.0+ configuré
-   Accès au fichier `Info.plist` de votre application
-   Une compréhension basique de la structure JSON
-   La documentation détaillant les pratiques de collecte de données de votre application

### Étapes de création

Commencez par créer un fichier `PrivacyInfo.xcprivacy` dans le répertoire de votre projet iOS. Ce fichier doit suivre des directives de formatage spécifiques :

**Configuration des informations de base**

```json
{
    "NSPrivacyTracking": false,
    "NSPrivacyTrackingDomains": [],
    "NSPrivacyCollectedDataTypes": []
}
```

**Définition des détails de collecte de données**

```json
{
    "NSPrivacyAccessedAPITypes": [
        {
            "NSPrivacyAccessedAPIType": "NSLocationWhenInUseUsageDescription",
            "NSPrivacyAccessedAPITypeReasons": ["1.1"]
        },
        {
            "NSPrivacyAccessedAPIType": "NSCameraUsageDescription",
            "NSPrivacyAccessedAPITypeReasons": ["2.1"]
        }
    ]
}
```

**Ajout des domaines de suivi**

```json
{
    "NSPrivacyTrackingDomains": [
        "analytics.yourdomain.com",
        "metrics.yourdomain.com"
    ]
}
```

### Éviter les erreurs courantes

Pour éviter les problèmes, gardez ces conseils à l'esprit :

-   **Inclure tous les champs requis** : Même si certains champs sont vides, ils doivent être présents.
-   **Utiliser des types d'API valides** : Vérifiez les identifiants d'API avec la documentation officielle d'Apple.
-   **Vérifier le formatage JSON** : Utilisez un validateur JSON pour repérer les erreurs de syntaxe.
-   **Fournir des raisons complètes** : Chaque accès API doit inclure un code de raison correspondant.
-   **Maintenir l'information à jour** : Mettez à jour le manifeste quand de nouvelles fonctionnalités sont ajoutées.

Assurez-vous également que le fichier de manifeste reste inférieur à la limite de taille. Faites une validation régulière avec des outils de développement.

## Ajouter des Manifestes de Confidentialité à Capacitor

### Organisation des fichiers 

Pour ajouter un manifeste de confidentialité à votre projet Capacitor :

1.  Ouvrez votre projet dans Xcode.
2.  Sous **TARGETS**, sélectionnez votre cible d'application ou de plugin.
3.  Allez dans l'onglet **Build Settings**.
4.  Définissez **Privacy Manifest Development Region** sur `en`.
5.  Définissez **Include Privacy Manifest** sur `YES`.

Si votre projet utilise [CocoaPods](https://cocoapods.org/), incluez ce snippet dans votre `Podfile` pour activer le manifeste de confidentialité :

```
your-app/
├── ios/
│   ├── App/
│   │   ├── PrivacyInfo.xcprivacy
│   │   └── Info.plist
│   └── App.xcworkspace
```

### Vérification de l'implémentation 

Pour vérifier que le manifeste de confidentialité fonctionne comme prévu, suivez ces étapes :

1.  **Vérification de la compilation**
    
    -   Confirmez qu'il n'y a pas d'avertissements liés à la confidentialité pendant la compilation.
    -   Assurez-vous que le manifeste compile sans erreurs.
    -   Vérifiez que le manifeste de confidentialité est inclus dans les produits de compilation.
2.  **Validation à l'exécution**
    
    -   En mode debug, testez les invites de confidentialité et le comportement d'accès aux API.
3.  **Validation dans App Store Connect**
    
    -   Téléchargez votre build et examinez le rapport de confidentialité dans App Store Connect.
    -   Vérifiez que les déclarations d'API sont complètes et que les formats des domaines de suivi sont corrects.

Si vous rencontrez une erreur "Privacy Manifest validation failed", revérifiez votre manifeste pour vous assurer qu'il répond aux dernières exigences de l'App Store. Portez une attention particulière aux types d'API et aux configurations des domaines de suivi.

## Changements du Manifeste de Confidentialité Apple 

<iframe src="https://www.youtube.com/embed/S8JnUkUkmbs" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Tests et corrections

Créer un Manifeste de Confidentialité conforme aux directives d'Apple est crucial. Pour rester sur la bonne voie, intégrez un suivi fiable des erreurs dans votre processus de développement. Cela aide à lier les efforts de développement aux exigences de conformité.

Un outil comme [Capgo](https://capgo.app) peut aider. Il surveille l'accès aux API et identifie les problèmes de manifeste avant qu'ils n'affectent les utilisateurs. Une fois les problèmes potentiels signalés, vous pouvez vous concentrer sur une validation approfondie.

Après avoir effectué des mises à jour, testez votre manifeste dans un environnement de développement. Utilisez les informations du suivi des erreurs pour guider votre révision. Cette approche aide à garantir que votre application reste conforme aux normes de confidentialité d'Apple.

## Outils de confidentialité [Capgo](https://capgo.app/)

![Capgo Live Update Dashboard Interface](https://assets.seobotai.com/capgo.app/67ec9a7d7747adc4bca8a776/454adbba4c00491adce88db59812b177.jpg)

Capgo simplifie la gestion des manifestes de confidentialité et des mises à jour d'applications, en s'assurant que vos normes de confidentialité restent intactes sans retarder les déploiements.

### Fonctionnalités de Capgo

Avec plus de **23,5 millions de mises à jour sécurisées** et un **taux de succès global de 82%**, Capgo garantit que **95% des utilisateurs actifs reçoivent les mises à jour dans les 24 heures** [\[1\]](https://capgo.app/). Voici ce qu'il offre :

-   **Chiffrement de bout en bout** pour sécuriser les mises à jour
-   **Système de canaux** pour une distribution contrôlée des mises à jour
-   **Suivi des erreurs** pour identifier et résoudre rapidement les problèmes
-   **Retour en arrière en un clic** pour revenir instantanément à une version précédente

Ces outils rendent l'ajout de Capgo à votre flux de travail simple et efficace.

### Utilisation de Capgo

Pour commencer, [installez le plugin Capgo](https://capgo.app/docs/plugin/cloud-mode/getting-started/) avec cette commande :

```
your-plugin/
├── ios/
│   ├── Plugin/
│   │   └── PrivacyInfo.xcprivacy
│   └── Plugin.xcodeproj
```

Capgo s'intègre parfaitement aux pipelines CI/CD, automatisant la validation des manifestes de confidentialité via des plateformes comme [GitHub Actions](https://docs.github.com/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/), ou [Jenkins](https://www.jenkins.io/). Que vous choisissiez les options cloud ou auto-hébergées, Capgo prend en charge 750 applications en production tout en garantissant que chaque mise à jour est conforme aux normes de confidentialité.

> "Nous pratiquons le développement agile et @Capgo est essentiel pour livrer en continu à nos utilisateurs !" – Rodrigo Mantica

> "Capgo est une solution intelligente pour les mises à jour 🙂" – NASA's OSIRIS-REx

Capgo inclut également des analyses intégrées pour suivre le succès des mises à jour et l'engagement des utilisateurs en temps réel. Cela garantit que vos mises à jour de confidentialité atteignent efficacement votre base d'utilisateurs.

## Conclusion

### Points clés à retenir

Concernant la gestion des manifestes de confidentialité, garder un système de mise à jour fiable est crucial :

-   **Chiffrement de bout en bout** : Maintient les mises à jour sécurisées de bout en bout.
-   **Surveillance en temps réel** : Suit efficacement la distribution des mises à jour.
-   **Capacité de retour en arrière instantané** : Agit comme filet de sécurité pour des corrections rapides.
-   **Validation automatisée** : Garantit que vos mises à jour respectent les normes de conformité.

Construire un système de mise à jour fiable vous aide à suivre l'évolution des exigences de confidentialité d'Apple et Google. Cette approche s'est avérée améliorer les taux d'approbation de l'App Store et renforcer la confiance des utilisateurs [\[1\]](https://capgo.app/).

### Comment commencer

Vous pouvez commencer à mettre en œuvre ces principes en suivant ces étapes :

-   **Configurez votre environnement** : Exécutez `npx @capgo/cli init` pour commencer.
-   **Activez les fonctionnalités de confidentialité** : Utilisez le chiffrement de bout en bout pour des mises à jour sécurisées.
-   **Déployez des outils de surveillance** : Suivez les mises à jour avec les analyses.
-   **Planifiez les retours en arrière** : Assurez-vous de pouvoir revenir rapidement aux versions précédentes si nécessaire.

> "Capgo est un outil indispensable pour les développeurs qui veulent augmenter leur productivité. Éviter les délais de révision pour les corrections de bugs change la donne." - Bessie Cooper

Des mises à jour régulières et des outils appropriés sont essentiels pour rester conforme et s'améliorer au fil du temps.
