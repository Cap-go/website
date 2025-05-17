---
slug: how-capacitor-handles-platform-differences
title: Comment Capacitor gère les différences entre les plateformes
description: >-
  Pelajari cara mengelola perbedaan platform secara efektif dalam pengembangan
  aplikasi seluler menggunakan satu basis kode untuk iOS dan Android.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-25T02:08:36.160Z
updated_at: 2025-03-25T02:08:56.741Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67e200987856e801f1f26fa8-1742868536741.jpg
head_image_alt: Développement mobile
keywords: >-
  Capacitor, mobile development, cross-platform, iOS, Android, custom plugins,
  UI design, live updates
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---

[Capacitor](https://capacitorjs.com/) aide les développeurs à créer des applications pour iOS et Android en utilisant la même base de code, tout en gérant les différences spécifiques à chaque plateforme. Il simplifie l'intégration des fonctionnalités natives, assure la conformité aux directives des plateformes et optimise les performances. Points clés :

-   **Détection de Plateforme** : Utilisez `Capacitor.getPlatform()` pour appliquer du code spécifique à la plateforme
-   **Plugins Intégrés** : APIs unifiées pour les fonctionnalités comme la Caméra, le Stockage et la Géolocalisation
-   **Plugins Personnalisés** : Ajoutez du code natif pour des besoins spécifiques
-   **Ajustements UI** : Suivez les règles de design pour iOS (ex., [SF Symbols](https://developer.apple.com/sf-symbols/), boutons arrondis) et Android (ex., [Material Icons](https://developers.google.com/fonts/docs/material_icons), boutons alignés à gauche)
-   **Configuration** : Ajustez les paramètres dans `capacitor.config.json` pour les deux plateformes
-   **Mises à jour en direct avec [Capgo](https://capgo.app/)** : Déployez des mises à jour instantanément sans délais d'app store, atteignant jusqu'à 95% d'adoption utilisateur en 24 heures

### Comparaison Rapide

| Fonctionnalité | iOS | Android |
| --- | --- | --- |
| **Navigation** | Barres d'onglets en bas, bouton retour à gauche | Tiroir de navigation en haut, navigation en bas |
| **Typographie** | Police San Francisco | Police Roboto |
| **Plugins (ex., Caméra)** | [AVFoundation](https://developer.apple.com/documentation/avfoundation/) | [Camera2 API](https://developer.android.com/media/camera/camera2) |
| **Format de Build** | Fichier `ipa` | Fichier `aab` ou `apk` |

Capacitor comble le fossé entre le développement web et natif, facilitant la création d'applications multiplateformes tout en maintenant des optimisations spécifiques à chaque plateforme.

## Développement Multiplateforme : Explorer CapacitorJS avec

<Steps>

## Comment [Capacitor](https://capacitorjs.com/) Gère le Code Plateforme

![Capacitor](https://mars-images.imgix.net/seobot/screenshots/capacitorjs.com-4c1a6a7e452082d30f5bff9840b00b7d-2025-03-25.jpg?auto=compress)

Capacitor offre des outils pour gérer le code spécifique à chaque plateforme, permettant aux développeurs de créer des expériences personnalisées pour iOS et Android en utilisant une API unique.

### Détecter les Plateformes dans le Code

Avec l'API de plateforme intégrée de Capacitor, la détection de la plateforme actuelle est simple. La méthode `Capacitor.getPlatform()` identifie l'environnement d'exécution, facilitant l'application de logique conditionnelle :

Cette approche est particulièrement utile pour des fonctionnalités comme [l'authentification biométrique](https://capgo.app/plugins/capacitor-native-biometric/), où iOS pourrait utiliser [Face ID](https://en.wikipedia.org/wiki/Face_ID) et Android s'appuie sur l'Authentification par Empreinte Digitale. En plus de la détection de plateforme, les plugins intégrés de Capacitor simplifient l'intégration native.

### Fonctionnalités Plateforme Intégrées

Capacitor est livré avec un ensemble de plugins principaux qui gèrent les différences entre plateformes de manière transparente. Ces plugins gèrent les complexités des implémentations natives tout en fournissant une interface JavaScript cohérente :

| Plugin | Implémentation iOS | Implémentation Android |
| --- | --- | --- |
| Caméra | AVFoundation | Camera2 API |
| Stockage | UserDefaults | SharedPreferences |
| Géolocalisation | CoreLocation | LocationManager |

Chaque plugin utilise automatiquement les APIs natives de la plateforme, assurant performance et fonctionnalité.

### Créer des Plugins Plateforme Personnalisés

Pour les cas où les plugins intégrés ne répondent pas à vos besoins, vous pouvez créer des plugins personnalisés pour accéder à des APIs natives spécifiques. Voici comment :

1.  **Définir le Plugin**

2.  **Ajouter le Code Natif**

3.  **Implémenter les Gestionnaires de Plateforme**

    -   **iOS (Swift) :**

    -   **Android (Kotlin) :**

Les plugins personnalisés permettent d'accéder aux fonctionnalités natives tout en gardant l'API cohérente et facile à utiliser. Cela assure performance et fonctionnalité sans compliquer le processus de développement.

## Directives UI Spécifiques aux Plateformes

### Règles de Design iOS vs Android

Lors de la conception pour iOS et Android, il est important de suivre les modèles de conception natifs.Les utilisateurs de chaque plateforme ont des attentes différentes concernant la navigation, la typographie, les boutons, les en-têtes et les icônes. Voici comment ils se comparent :

| Élément de design | iOS | Android |
| --- | --- | --- |
| **Navigation** | Barres d'onglets en bas, bouton retour à gauche | Tiroir de navigation en haut, navigation en bas |
| **Typographie** | Police San Francisco | Police Roboto |
| **Boutons** | Rectangles arrondis, texte centré | Boutons Material Design, texte aligné à gauche |
| **En-têtes** | Grands titres, centrés | Barres d'applications, alignées à gauche |
| **Icônes** | SF Symbols | Material Icons |

### Standards de Design Multi-plateformes

Bien que chaque plateforme ait ses propres règles, maintenir une identité de marque cohérente est essentiel. Voici comment assurer la cohérence :

```typescript
import { Capacitor } from '@capacitor/core';

const platform = Capacitor.getPlatform();
if (platform === 'ios') {
  // Code specific to iOS
} else if (platform === 'android') {
  // Code specific to Android
}
```

Avec Capacitor, vous pouvez intégrer des composants d'interface utilisateur spécifiques à la plateforme tout en maintenant une fonctionnalité cohérente. Cela aide également à gérer les paramètres système comme le Mode Sombre et le Type Dynamique. Pour compléter le processus, assurez-vous que vos paramètres de build spécifiques à la plateforme s'alignent avec ces directives.

## Configuration et Paramétrage des Plateformes

Après avoir géré votre code plateforme, une configuration appropriée est essentielle pour garantir que votre application fonctionne correctement sur iOS et Android.

### Paramètres de Plateforme dans `capacitor.config.json`

Utilisez le fichier `capacitor.config.json` pour définir les paramètres clés spécifiques à la plateforme :

```typescript
    @Plugin({
      name: 'CustomFeature',
      platforms: ['ios', 'android']
    })
    ```

Voici quelques options de configuration à considérer :

| Option | iOS | Android |
| --- | --- | --- |
| **Liens Profonds** | Propriété `scheme` | Propriété `androidScheme` |
| **Barre de Statut** | `statusBar.style` | `statusBar.backgroundColor` |
| **Clavier** | `keyboard.resize` | `keyboard.resize`, `keyboard.style` |
| **Écran de Démarrage** | `splashScreen.launchShowDuration` | `splashScreen.layoutName` |

Une fois les paramètres d'exécution en place, ajustez vos paramètres de build pour améliorer les performances de chaque plateforme.

### Paramètres de Build Spécifiques aux Plateformes

Affinez les paramètres de build pour optimiser votre application pour iOS et Android.

Pour iOS, mettez à jour le fichier `Info.plist` :

```typescript
    @PluginMethod()
    async customFunction(): Promise<void> {
      if (Capacitor.getPlatform() === 'ios') {
        // Add iOS-specific code
      } else {
        // Add Android-specific code
      }
    }
    ```

Pour Android, modifiez `android/app/build.gradle` :

```swift
        @objc func customFunction(_ call: CAPPluginCall) {
          // Add native iOS functionality
        }
        ```

Voici quelques considérations de build importantes :

| Aspect | iOS | Android |
| --- | --- | --- |
| **Permissions** | Ajouter des entrées dans `Info.plist` | Définir dans `AndroidManifest.xml` |
| **Icônes** | Tailles de 20px à 1024px | Densités de mdpi à xxxhdpi |
| **Écran de Démarrage** | Basé sur Storyboard | Basé sur Layout XML |
| **Sortie de Build** | Fichier `ipa` | Fichier `aab` ou `apk` |

## Mettre à jour les Applications avec [Capgo](https://capgo.app/)

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-25.jpg?auto=compress)

Maintenir efficacement à jour les [applications Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/) pour iOS et Android est crucial. Capgo offre un système de mise à jour en direct qui s'aligne avec les directives des deux plateformes.

### Fonctionnalités Capgo

| Fonctionnalité | Description | Avantage Plateforme |
| --- | --- | --- |
| **Mises à jour en direct** | Déploiement instantané sans revue d'app store | Assure une expérience unifiée sur iOS et Android |
| **Chiffrement de bout en bout** | Sécurise la livraison des mises à jour | Répond aux exigences de sécurité des deux plateformes |
| **[Système de Canaux](https://capgo.app/docs/plugin/cloud-mode/channel-system/)** | Cible des groupes d'utilisateurs spécifiques | Prend en charge les tests bêta et les déploiements progressifs |
| **Mises à jour partielles** | Télécharge uniquement le contenu modifié | Économise la bande passante et accélère les mises à jour |

Capgo a livré 235 millions de mises à jour, atteignant un taux de mise à jour de 95% des utilisateurs actifs en 24 heures [\[1\]](https://capgo.app/). Ces fonctionnalités rendent la [gestion des mises à jour](https://capgo.app/docs/plugin/cloud-mode/manual-update/) plus fluide et plus efficace sur toutes les plateformes.

### Gestion de Plateforme Capgo

Le système de canaux de Capgo facilite la gestion des mises à jour. Les développeurs peuvent tester des fonctionnalités spécifiques à iOS avec des utilisateurs bêta, déployer des mises à jour Android par étapes et suivre les métriques de performance de manière transparente.

La plateforme respecte les exigences de mise à jour over-the-air d'Apple et Google [\[1\]](https://capgo.app/)Actuellement, 750 applications en production s'appuient sur Capgo, maintenant un taux de réussite global des mises à jour de 82% [\[1\]](https://capgo.app/) Son intégration CI/CD simplifie les déploiements, tandis que la fonction de rollback permet aux développeurs de revenir instantanément aux versions précédentes en cas de problème. Les analyses en temps réel fournissent des informations sur les performances des mises à jour et aident à maintenir la stabilité de l'application.

## Conclusion

### Avantages de la Gestion des Plateformes

La gestion efficace des différences de plateformes dans Capacitor améliore le développement multiplateforme. Ses outils intégrés pour la détection et la configuration des plateformes permettent aux développeurs de créer des expériences fluides pour iOS et Android, tout en respectant les normes de conception et les fonctionnalités uniques de chaque plateforme.

En se concentrant sur une bonne gestion des plateformes, les équipes de développement peuvent publier des mises à jour plus rapidement et améliorer la satisfaction des utilisateurs. Des outils comme Capgo ont montré comment une gestion cohérente des plateformes peut conduire à des taux de réussite plus élevés des mises à jour et de meilleures expériences utilisateur [\[1\]](https://capgo.app/)

> "Nous pratiquons le développement agile et @Capgo est essentiel pour livrer en continu à nos utilisateurs !"  
> – Rodrigo Mantica [\[1\]](https://capgo.app/)

Ces informations peuvent vous guider pour apporter des améliorations pratiques.

### Prochaines Étapes

Pour maximiser ces avantages, envisagez de mettre en œuvre les stratégies suivantes :

| Action | Bénéfice |
| --- | --- |
| Activer la Détection de Plateforme | S'adapte automatiquement aux besoins iOS et Android |
| Implémenter les Mises à Jour en Direct | Évite les délais de l'app store pour les corrections urgentes |
| Configurer l'Analytique | Suit les métriques de performance pour chaque plateforme |
| Activer le Support de Rollback | Résout rapidement les problèmes spécifiques aux plateformes |

Pour les développeurs cherchant à améliorer leur flux de travail, des outils comme Capgo peuvent simplifier le processus. Des fonctionnalités telles que le chiffrement de bout en bout et l'intégration CI/CD aident les équipes à maintenir la cohérence tout en déployant efficacement les mises à jour.

Le succès dans la gestion des plateformes dépend de l'utilisation des bons outils et du respect des directives spécifiques aux plateformes. En se concentrant sur des stratégies robustes de détection et de gestion, les développeurs peuvent garantir que leurs applications fonctionnent parfaitement sur iOS et Android.