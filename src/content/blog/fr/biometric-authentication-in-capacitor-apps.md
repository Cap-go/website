---
slug: biometric-authentication-in-capacitor-apps
title: Authentification biométrique dans les applications Capacitor
description: >-
  Découvrez comment implémenter une authentification biométrique sécurisée dans
  les applications Capacitor pour améliorer l'expérience utilisateur et protéger
  les données sensibles.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-05-14T05:13:56.152Z
updated_at: 2025-09-27T23:45:28.000Z
head_image: >-
  https://assets.seobotai.com/cdn-cgi/image/quality=75,w=1536,h=1024/capgo.app/68240bea59ff61289922287e-1747199824736.jpg
head_image_alt: Développement Mobile
keywords: >-
  biometric authentication, Capacitor, mobile security, fingerprint, facial
  recognition, app development
tag: 'Development, Mobile, Security'
published: true
locale: fr
next_blog: ''
---
[L'authentification biométrique](https://capgo.app/plugins/capacitor-native-biometric/) permet aux utilisateurs d'accéder aux applications de manière sécurisée en utilisant leur empreinte digitale, leur visage ou d'autres traits biologiques à la place des mots de passe. Pour les développeurs travaillant avec [Capacitor](https://capacitorjs.com/), l'implémentation de cette fonctionnalité est simple et fonctionne à la fois sur iOS et Android. Voici un résumé rapide :

-   **Pourquoi utiliser l'authentification biométrique ?**
    
    -   C'est plus sécurisé que les mots de passe.
    -   Cela améliore l'expérience utilisateur en accélérant la connexion.
    -   Cela répond aux normes de sécurité pour les données sensibles.
-   **Méthodes prises en charge :**
    
    -   Empreinte digitale : Rapide et courante.
    -   Reconnaissance faciale : Option mains libres.
    -   Scan de l'iris : Cas d'utilisation haute sécurité (appareils limités).
    -   Reconnaissance vocale : Axée sur l'accessibilité (support limité).
-   **Outils clés requis :**
    
    -   Capacitor 3.0+.
    -   Plugins comme `@capawesome-team/capacitor-biometrics` ou `capacitor-native-biometric`.
-   **Points clés de la configuration :**
    
    -   Ajouter les permissions dans AndroidManifest et Info.plist.
    -   Utiliser Keychain (iOS) ou Keystore (Android) pour le stockage sécurisé.
    -   Tester minutieusement la compatibilité et les options de repli.

### Comparaison rapide des plugins

| Nom du plugin | Version Capacitor | Fonctionnalités | Idéal pour |
| --- | --- | --- | --- |
| `@aparajita/capacitor-biometric-auth` | Capacitor 7 | Biométrie native, identifiants de l'appareil | Nouveaux projets utilisant Capacitor 7 |
| `capacitor-native-biometric` | Capacitor 3, 4 | Stockage sécurisé des identifiants, Keychain/Keystore | Gestion des identifiants |
| `@capawesome-team/capacitor-biometrics` | Toutes versions | Support biométrique et identifiants de l'appareil | Options d'authentification flexibles |

[L'authentification biométrique dans les applications Capacitor](https://capgo.app/plugins/capacitor-native-biometric/) est un moyen sécurisé et convivial de protéger les données sensibles. L'article complet détaille les étapes de configuration, les exemples de code, les stratégies de test et les normes de sécurité.

## Authentification biométrique Ionic (FaceID / FingerPrint)

<Steps>

## Exigences de configuration

Pour activer l'authentification biométrique dans votre [application Capacitor](https://capgo.app/plugins/ivs-player/), vous devrez configurer certains outils, dépendances et paramètres spécifiques à la plateforme. Ci-dessous, vous trouverez les exigences de configuration étape par étape pour les plateformes Android et iOS.

### Outils et dépendances requis

Avant de plonger dans l'implémentation, assurez-vous que les outils et dépendances suivants sont prêts :

| Composant | Version minimale | Objectif |
| --- | --- | --- |
| **Capacitor** | 3.0 ou supérieur | Framework principal |
| **[Node.js](https://nodejs.org/en)** | LTS la plus récente | Gestion des packages |
| **[Xcode](https://developer.apple.com/xcode/)** | Version la plus récente | Développement iOS |
| **[Android Studio](https://developer.android.com/studio)** | Version la plus récente | Développement Android |
| **Appareils physiques** | iOS 13+ / Android API 23+ | Test des fonctionnalités biométriques |

Choisissez un [plugin biométrique](https://capgo.app/plugins/capacitor-native-biometric/) selon votre version de Capacitor :

-   **@aparajita/capacitor-biometric-auth** pour Capacitor 7
-   **capacitor-native-biometric** pour Capacitor 3 et 4  
-   **@capawesome-team/capacitor-biometrics** pour le support avec des identifiants d'appareil supplémentaires

### Étapes de configuration Android

Pour configurer l'authentification biométrique sur Android, vous devrez apporter quelques ajustements à vos fichiers de projet :

1.   **Configuration du Manifest**
    
    Ajoutez les permissions suivantes à votre fichier `AndroidManifest.xml` :
    
    ```xml
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />
    <uses-permission android:name="android.permission.USE_FINGERPRINT" />
    ```
    
2.   **Configuration Gradle**
    
    Mettez à jour le fichier `build.gradle` de votre application pour inclure les dépendances biométriques nécessaires :
    
    ```kotlin
    dependencies {
        implementation "androidx.biometric:biometric:1.1.0"
    }
    ```

### Étapes de configuration iOS

Pour iOS, vous devrez suivre ces étapes pour configurer l'authentification biométrique :

1.   **Configuration Info.plist**
    
    Ajoutez la description d'utilisation requise à votre fichier `Info.plist` :
    
    ```xml
    <key>NSFaceIDUsageDescription</key>
    <string>Nous utilisons Face ID pour une authentification sécurisée</string>
    ```
    
2.   **Configuration Keychain**
    
    Activez les capacités Keychain dans Xcode :
    
    -   Ouvrez les paramètres de votre projet
    -   Allez dans l'onglet **Signing & Capabilities**
    -   Ajoutez la capacité **Keychain Sharing**
    -   Configurez les groupes d'accès si nécessaire
3.   **Politiques d'authentification**
    
    Configurez les politiques d'authentification locale pour gérer :
    
    -   Les tentatives d'authentification échouées
    -   Le repli vers les codes d'accès de l'appareil
    -   Les vérifications de disponibilité biométrique
    
    Pour une meilleure sécurité, utilisez le Keychain iOS pour stocker les données sensibles. Cela assure la compatibilité avec Touch ID et Face ID tout en protégeant les identifiants des utilisateurs.

## Implémentation du code

Une fois les configurations en place, l'étape suivante consiste à implémenter un code sécurisé. Cela implique de sélectionner le bon plugin et de créer des flux d'authentification fiables.

### Guide de sélection des plugins

Lors du choix d'un plugin d'authentification biométrique pour votre application Capacitor, votre choix doit correspondre aux besoins spécifiques du projet. Voici quelques options populaires :

| Nom du plugin | Version Capacitor | Fonctionnalités clés | Idéal pour |
| --- | --- | --- | --- |
| @aparajita/capacitor-biometric-auth | Capacitor 7 | Biométrie native, identifiants de l'appareil, API complète | Nouveaux projets démarrant avec Capacitor 7 |
| capacitor-native-biometric | Capacitor 3, 4 | Stockage sécurisé des identifiants, intégration Keychain/Keystore | Projets établis nécessitant la gestion des identifiants |
| @capawesome-team/capacitor-biometrics | Toutes versions | Authentification biométrique et par identifiants de l'appareil, API claire | Projets nécessitant des options d'authentification flexibles |

### Exemples de code d'authentification

Voici comment utiliser le plugin **@capawesome-team/capacitor-biometrics** pour l'authentification biométrique :

```typescript
import { Biometrics } from '@capawesome-team/capacitor-biometrics';

async function authenticateUser() {
  try {
    const result = await Biometrics.authenticate({
      reason: "Veuillez vous authentifier pour accéder à l'application",
      title: "Authentification biométrique"
    });
    if (result.verified) {
      // Succès de l'authentification
    }
  } catch (error) {
    // Gérer l'erreur
  }
}
```

Pour gérer les identifiants sécurisés, le plugin **capacitor-native-biometric** offre une approche simple :

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

async function setCredentials() {
  try {
    await NativeBiometric.setCredentials({
      username: "monUtilisateur",
      password: "monMotDePasse",
      server: "www.monserveur.com"
    });
  } catch (error) {
    // Gérer l'erreur
  }
}
```

Une fois le code en place, il est crucial de valider sa fonctionnalité par des tests appropriés.

### Méthodes de test

Pour garantir que votre authentification biométrique est fiable et sécurisée, considérez ces stratégies de test :

-   **Test de compatibilité des appareils**
    
    Vérifiez si l'authentification fonctionne sur différents appareils et conditions :
    
    ```typescript
    async function checkBiometricAvailability() {
      const available = await Biometrics.isAvailable();
      return available;
    }
    ```
    
-   **Gestion des erreurs et scénarios courants**
    
    Simulez des erreurs et testez les mécanismes de repli :
    
    ```typescript
    async function handleBiometricError(error) {
      switch(error.code) {
        case 'NOT_AVAILABLE':
          // Gérer l'indisponibilité
          break;
        case 'NOT_ENROLLED':
          // Gérer l'absence d'inscription
          break;
      }
    }
    ```
    
-   **Validation de la sécurité**
    
    Assurez-vous que votre implémentation répond aux normes de sécurité :
    
    ```typescript
    async function validateSecurity() {
      const securityLevel = await Biometrics.getSecurityLevel();
      return securityLevel;
    }
    ```

De plus, testez les scénarios comme :

-   Plusieurs tentatives d'authentification échouées
-   Comportement après le redémarrage de l'appareil
-   Transitions entre les états de premier plan et d'arrière-plan de l'application
-   Changements dans la connectivité réseau
-   Mises à jour des paramètres biométriques du système

Des tests approfondis garantissent que le système d'authentification biométrique est robuste et prêt pour une utilisation réelle.

## Normes de sécurité

Assurer une sécurité forte dans l'authentification biométrique signifie prioriser la protection des données, adhérer aux réglementations de conformité et appliquer des techniques de sécurité en couches.

### Méthodes de sécurité des données

Sur iOS, les données biométriques sont chiffrées et stockées en utilisant **Keychain**, tandis qu'Android utilise le **Keystore**. Si vous utilisez le plugin `capacitor-native-biometric`, vous pouvez stocker de manière sécurisée les identifiants des utilisateurs comme ceci :

```typescript
async function storeSecureCredentials() {
  await NativeBiometric.setCredentials({
    username: "utilisateur",
    password: "motdepasse",
    server: "exemple.com"
  });
}
```

Pour la transmission de données, implémentez toujours un **chiffrement de bout en bout** pour garder les informations sensibles protégées.

### Directives des stores

Les app stores imposent des règles strictes pour la [sécurité biométrique](https://capgo.app/plugins/capacitor-native-biometric/). Voici une répartition des principales exigences de plateforme :

| Plateforme | Exigences clés | Notes d'implémentation |
| --- | --- | --- |
| iOS | Utiliser le framework LocalAuthentication, fournir des options de repli et assurer le consentement clair de l'utilisateur | Doit supporter à la fois Face ID et Touch ID |
| Android | Exploiter l'API BiometricPrompt, obtenir l'autorisation explicite de l'utilisateur et déclarer les niveaux de sécurité | Supporter l'empreinte digitale et la reconnaissance faciale, avec des distinctions pour les différents niveaux de sécurité |

### Configuration multi-facteurs

Améliorer la sécurité nécessite souvent de combiner la [vérification biométrique](https://capgo.app/plugins/capacitor-native-biometric/) avec une couche supplémentaire d'authentification. Par exemple, après la [vérification biométrique](https://capgo.app/plugins/capacitor-native-biometric/) initiale, vous pouvez ajouter une étape secondaire pour confirmer l'identité de l'utilisateur :

```typescript
async function multiFactorAuth() {
  const biometricResult = await authenticateWithBiometrics();
  if (biometricResult.verified) {
    return await requestSecondaryVerification();
  }
}
```

Une approche multi-facteurs inclut typiquement :

-   **Authentification biométrique primaire**
-   **Vérification secondaire** (ex : code SMS ou application d'authentification)
-   **Confirmation spécifique à la transaction** pour une sécurité accrue

Si vous utilisez des outils comme Capgo pour les mises à jour en direct, assurez la conformité aux normes de sécurité en tirant parti de ses fonctionnalités de **chiffrement de bout en bout**. Cela garantit que vos méthodes d'authentification biométrique restent sécurisées pendant les mises à jour et s'alignent sur les exigences de la plateforme [\[1\]](https://capacitor-tutorial.com/plugins/capacitor-biometric-auth/).

## Guide de maintenance

Gardez votre système biométrique performant en équilibrant vitesse, efficacité de la batterie et mises à jour opportunes.

### Conseils de vitesse et de batterie

Voici un exemple de code pour implémenter une authentification biométrique efficace :

```typescript
async function optimizedBiometricAuth() {
  const cacheKey = 'auth_

Capgo simplifie les mises à jour biométriques. Configurez-le comme ceci :

```xml
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />
    <!-- For Android 9 (API 28) or lower -->
    <uses-permission android:name="android.permission.USE_FINGERPRINT" />
    ```

Voici pourquoi Capgo est un excellent outil pour gérer les mises à jour :

-   **Déploiement instantané** : Déployez des correctifs de sécurité critiques et de nouvelles fonctionnalités sans délai.
-   **Déploiements progressifs** : Testez les mises à jour avec des groupes d'utilisateurs sélectionnés avant de les déployer à tous.
-   **Contrôle de version** : Suivez les différentes versions d'authentification pour une meilleure gestion.
-   **Retour d'urgence** : Revenez rapidement à une version précédente en cas de problème.

### Mises à jour de l'API

Maintenir votre API biométrique à jour est vital pour la sécurité et les fonctionnalités. Restez proactif avec les mises à jour en suivant ces directives :

| Type de mise à jour | Méthode de surveillance | Délai de mise en œuvre |
| --- | --- | --- |
| Correctifs de sécurité | Alertes du référentiel de plugins | 24 heures |
| Mises à jour des fonctionnalités | Documentation de la plateforme | 1 semaine |
| Changements majeurs | Notes de version | 2-4 semaines |
| Mises à jour des politiques de store | Portail développeur | Avant soumission |

Concentrez-vous sur ces domaines :

-   **Mises à jour des plugins** : Mettez régulièrement à jour les dépendances comme `@capawesome-team/capacitor-biometrics`.
-   **Changements de plateforme** : Suivez les mises à jour des API LocalAuthentication d'iOS et BiometricPrompt d'Android.
-   **Standards de sécurité** : Restez aligné avec les dernières exigences de sécurité biométrique.
-   **Directives des stores** : Assurez la conformité avec les politiques de l'App Store d'Apple et du Google Play pour éviter les problèmes de soumission.

## Conclusion

### Points clés

L'ajout de l'authentification biométrique à votre application Capacitor implique d'équilibrer sécurité, performance et expérience utilisateur. Voici une synthèse rapide des éléments essentiels à garder à l'esprit :

| **Composant** | **Focus d'implémentation** | **Considérations clés** |
| --- | --- | --- |
| **Standards de sécurité** | Stockage natif (Keychain/Keystore) | Chiffrement de bout en bout, protection des identifiants |
| **Sélection du plugin** | Compatibilité avec la dernière version | Support de plusieurs types biométriques |
| **Gestion des mises à jour** | Cycle de maintenance régulier | Déploiement rapide des correctifs de sécurité |
| **Expérience utilisateur** | Options d'authentification de secours | Invites d'authentification claires et conviviales |

Ces composants sont votre feuille de route pour une intégration réussie.

### Étapes pour implémenter l'authentification biométrique

Suivez ces étapes pour intégrer l'authentification biométrique dans votre application :

-   **Intégration du plugin**  
    Commencez par choisir un plugin biométrique compatible avec votre version de Capacitor. Assurez-vous que vos fichiers de configuration - comme `AndroidManifest.xml` et `Info.plist` - sont correctement configurés. Pour un stockage sécurisé des identifiants, utilisez des solutions natives comme Keychain ou Keystore.
    
-   **Configuration de la sécurité**  
    Protégez les données des utilisateurs en activant le chiffrement de bout en bout pour toutes les transmissions d'identifiants. Si nécessaire, incluez [l'authentification multi-facteurs](https://capgo.app/docs/webapp/mfa/) pour ajouter une couche de sécurité supplémentaire. Prévoyez une gestion robuste des erreurs et des options de secours pour maintenir la fonctionnalité en cas de défaillance.
    
-   **Maintenance continue**  
    Gardez votre application sécurisée en établissant un pipeline régulier de mises à jour pour les correctifs de sécurité. Restez à jour avec les mises à jour des plugins et surveillez les avis de sécurité. Des outils comme Capgo peuvent simplifier ce processus en permettant des mises à jour instantanées. Capgo affiche un impressionnant taux de mise à jour de 95% des utilisateurs en 24 heures, ce qui en fait un ajout précieux à votre boîte à outils [\[2\]](https://capgo.app).
    

> "Capgo est un outil indispensable pour les développeurs qui veulent être plus productifs. Éviter la révision pour les corrections de bugs est inestimable." - Bessie Cooper [\[2\]](https://capgo.app)

## FAQs

:::faq
### Quelles sont les différences entre les plugins biométriques pour Capacitor, et comment puis-je sélectionner le meilleur pour mon application ?

Lors du choix d'un plugin biométrique pour votre application Capacitor, il est crucial d'aligner le choix avec les exigences spécifiques de votre projet. Considérez des facteurs comme la **compatibilité des plateformes** (si vous avez besoin de support pour iOS, Android, ou les deux), la simplicité du processus d'intégration, et si le plugin prend en charge des méthodes biométriques avancées comme **Face ID** ou **l'authentification par empreinte digitale**.

Bien que ce guide se concentre sur l'implémentation de l'authentification biométrique dans les [applications Capacitor](https://capgo.app/blog/capacitor-comprehensive-guide/), des outils comme **Capgo** peuvent jouer un rôle précieux. Ils vous permettent de pousser des mises à jour en temps réel vers votre application sans nécessiter d'approbations des app stores. Cela signifie que votre application peut rester à jour avec les dernières fonctionnalités de sécurité, y compris les mises à jour biométriques, tout en restant conforme aux normes Apple et Android.
:::

:::faq
### Comment puis-je m'assurer que l'authentification biométrique dans mon application Capacitor répond aux normes de sécurité et aux directives des app stores ?

Pour garantir que l'authentification biométrique dans votre application Capacitor répond aux normes de sécurité actuelles et aux règles des app stores, suivez ces pratiques clés :

-   **Choisissez des plugins fiables** : Utilisez un plugin d'authentification biométrique de confiance comme `@capacitor/biometrics` pour garantir que votre application est sécurisée et fonctionne parfaitement sur tous les appareils.
-   **Suivez les règles des plateformes** : Respectez les directives Apple et Android, y compris l'obtention du consentement de l'utilisateur, l'utilisation d'un stockage sécurisé et l'offre d'options de secours comme un PIN ou un mot de passe.
-   **Maintenez les dépendances à jour** : Mettez régulièrement à jour votre application et ses bibliothèques pour corriger les vulnérabilités et rester aligné avec l'évolution des normes.

L'utilisation d'un service de mise à jour en direct comme **Capgo** peut faciliter ce processus. Il vous permet de pousser instantanément des mises à jour de sécurité ou des améliorations à votre application, en contournant les délais d'approbation des app stores. Cela maintient votre application sécurisée, conforme et à jour avec les politiques Apple et Android.
:::

:::faq
### Quels défis les développeurs peuvent-ils rencontrer lors de l'intégration de l'authentification biométrique dans les applications Capacitor, et comment peuvent-ils les surmonter ?

L'implémentation de l'authentification biométrique dans les applications Capacitor comporte son lot de défis. Ceux-ci peuvent inclure la garantie de la compatibilité entre les appareils, la gestion efficace des autorisations utilisateur et la manipulation sécurisée des données sensibles. Voici comment vous pouvez relever ces défis :

-   **Compatibilité des appareils** : Pour prendre en charge les fonctionnalités biométriques sur Android et iOS, envisagez d'utiliser des plugins comme `@capacitor-fingerprint-auth`. Ces outils aident à combler le fossé entre les plateformes, garantissant que votre application fonctionne parfaitement sur une variété d'appareils.
    
-   **Autorisations utilisateur** : Il est important d'expliquer clairement pourquoi votre application a besoin d'un accès biométrique. Fournissez aux utilisateurs des informations transparentes et concevez votre application pour gérer gracieusement les situations où les utilisateurs choisissent de ne pas accorder les autorisations.
    
-   **Sécurité des données** : La protection des données d'authentification est cruciale. Suivez les [meilleures pratiques de chiffrement](https://capgo.app/docs/cli/migrations/encryption/) et respectez les directives de sécurité fournies par chaque plateforme pour garantir que les informations sensibles restent sécurisées.
    

Pour effectuer des mises à jour ou corriger des problèmes liés aux fonctionnalités biométriques sans les tracas des approbations des app stores, vous pouvez utiliser des outils comme Capgo. Cela permet des mises à jour en temps réel, vous permettant de corriger les bugs ou d'améliorer les fonctionnalités rapidement tout en restant conforme aux politiques Apple et Android.
:::
