---
slug: apple-privacy-rules-for-capacitor-apps
title: Apple Règles de confidentialité pour Capacitor applications
description: >-
  Découvrez comment vous conformer aux règles de confidentialité de Apple pour
  le développement d'applications en mettant en œuvre le consentement de
  l'utilisateur, la transparence des données et les mises à jour sécurisées.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-31T01:48:03.832Z
updated_at: 2026-01-15T19:03:50.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67e9dc69283d21cbd67b72cf-1743385695606.jpg
head_image_alt: Développement mobile
keywords: >-
  Règles de confidentialité Apple, applications Capacitor, transparence des
  données, consentement de l'utilisateur, conformité App Store, politique de
  confidentialité
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---
**Les règles de confidentialité de Apple exigent désormais que les développeurs d'applications de [Capacitor](https://capacitorjs.com/) se concentrent sur la transparence et la conformité des données des utilisateurs afin de garantir l'approbation de App Store et de maintenir la confiance des utilisateurs.**

Les étapes clés comprennent :

- **Manifeste de confidentialité** : documentez la collecte de données, les API et les détails de suivi.
- **Consentement de l'utilisateur** : utilisez la transparence du suivi des applications (ATT) pour les autorisations de suivi.
- **Accès aux données** : définissez clairement les autorisations pour des fonctionnalités telles que l'appareil photo, la localisation et les contacts.
- **[Politique de confidentialité](https://capgo.app/dp/)** : fournissez une politique accessible et claire décrivant l'utilisation des données.
- **Tests et mises à jour** : testez minutieusement la conformité et utilisez des systèmes de mise à jour sécurisés tels que [Capgo](https://capgo.app/).

Ces règles mettent l'accent sur le contrôle des utilisateurs, la transparence et les mises à jour sécurisées des applications. Les développeurs peuvent suivre le guide pour rester conformes et proposer des applications respectueuses de la confidentialité.

## Empêcher le rejet de App Store : ajoutez le manifeste de confidentialité Apple...

<iframe src="https://www.youtube.com/embed/D7R87wm9IJE" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Apple Règles de confidentialité expliquées

Apple oblige les développeurs à donner la priorité à la clarté et à donner aux utilisateurs le contrôle de leurs données. Si vous êtes un développeur Capacitor, cela signifie être franc sur la façon dont votre application collecte et utilise les données, à la fois pour les utilisateurs et les évaluateurs Apple.

### Documenter les pratiques en matière de données

Conservez des enregistrements internes détaillés sur la gestion des données de votre application. Assurez-vous d'inclure :

- Types de données utilisateur collectées
- Raisons de la collecte de ces données
- Détails de tout service tiers ou SDKs utilisé
- Comment les données sont transférées ou partagées

L'organisation de ces informations contribue non seulement à la conformité, mais facilite également la réponse aux questions pendant le processus d'examen. Assurez-vous de refléter ces pratiques de manière transparente dans vos étiquettes de confidentialité App Store et dans les paramètres de votre application.

### Éléments clés de la divulgation de la confidentialité

Les informations de confidentialité de votre application doivent clairement indiquer :

- Fonctionnalités du système et autorisations API requises pour que l'application fonctionne
- Catégories de données collectées
- Toute activité de suivi ou communication avec des services externes
- Comment les données sont utilisées et pourquoi

Être clair dans vos informations contribue à renforcer la confiance des utilisateurs et réduit le risque de rencontrer des problèmes d'examen App Store.

### Chronologie de conformité

Apple met à jour ses exigences en matière de confidentialité par étapes. Restez informé en consultant régulièrement les mises à jour des développeurs de Apple pour vous assurer que votre application reste conforme aux dernières règles.

## Ajout de règles de confidentialité à votre application

Découvrez comment mettre en œuvre les règles de confidentialité de Apple dans votre application Capacitor avec ce guide étape par étape.

### Exigences de configuration

Avant de commencer, assurez-vous de ce qui suit :

- Vous disposez de **Xcode 15 ou version ultérieure** pour la prise en charge du manifeste de confidentialité.
- Capacitor 8 est installé.
- La cible de déploiement iOS est définie sur **iOS 14.5 ou version ultérieure**.
- Votre application comprend un fichier `Info.plist` correctement configuré.
- Vous disposez d'un compte développeur **Apple** avec des certificats valides.

Si vous utilisez Capgo, configurez le cryptage de bout en bout pour protéger la confidentialité des données. Les applications configurées correctement avec Capgo ont atteint un taux de réussite global de 82 % dans les mises à jour [\[1\]](https://capgo.app/).

Une fois votre environnement prêt, procédez à la création et à la configuration de votre manifeste de confidentialité.### Guide de configuration du manifeste de confidentialité

1. **Créez le fichier manifeste de confidentialité**

Ajoutez un nouveau fichier nommé `PrivacyInfo.xcprivacy` au répertoire racine de votre projet iOS :

```json
{
    "NSPrivacyTracking": false,
    "NSPrivacyTrackingDomains": [],
    "NSPrivacyCollectedDataTypes": [],
    "NSPrivacyAccessedAPITypes": []
}
```

2. **Définir la collecte de données**

Spécifiez les types de données que votre application collecte, telles que :

- Analyse des utilisateurs
- Informations sur l'appareil
- Modèles d'utilisation
- Accès au réseau

3. **Configurer l'accès API**

Répertoriez les API système requises par votre application, notamment :

- Caméra
- Localisation
- Contacts
- Photothèque

### Consignes de conformité

Après avoir configuré le manifeste de confidentialité, assurez-vous que vos pratiques de collecte de données répondent aux normes de Apple.

**Minimisation des données**  
Collectez uniquement les données nécessaires aux fonctionnalités principales de votre application. Les utilisateurs de Capgo ont signalé un taux de mise à jour des utilisateurs actifs de 95 % dans les 24 heures [\[1\]](https://capgo.app/), ce qui montre que les approches soucieuses de la confidentialité maintiennent l'engagement des utilisateurs.

**Transparence utilisateur**  
Expliquez clairement :

- Pourquoi les données sont collectées
- Combien de temps il sera conservé
- Options de contrôle utilisateur disponibles
- Toute politique de partage de données

### Exigences de test

Avant de la soumettre, testez votre application pour garantir le respect de la confidentialité. Concentrez-vous sur ces domaines :

| Zone d'essai | Points de vérification |
| --- | --- |
| Accès aux données | Vérifiez les invites d’autorisation appropriées. |
| Étiquettes de confidentialité | Confirmez que les déclarations sont exactes. |
| Contrôles utilisateur | Testez les fonctionnalités de désinscription. |
| [Stockage de données](https://capgo.app/plugins/capacitor-data-storage-sqlite/) | Vérifiez que le cryptage est sécurisé. |

Capgo a livré avec succès 23,5 millions de mises à jour tout en respectant la conformité en matière de confidentialité [\[1\]](https://capgo.app/), prouvant qu'il est possible d'équilibrer efficacement les mises à jour et la confidentialité.

Suivez ces directives pour vous assurer que votre application est prête à être testée et soumise App Store.

## Contrôles de confidentialité des utilisateurs

Cette section se concentre sur la manière de donner aux utilisateurs le contrôle du suivi et de l'accès aux données, en s'appuyant sur les directives de confidentialité établies.

### Configuration des autorisations de suivi

Pour configurer la transparence du suivi des applications (ATT) dans votre application Capacitor, incluez la clé suivante dans votre fichier `Info.plist` :

```xml
<key>NSUserTrackingUsageDescription</key>
<string>We use tracking to provide personalized features and improve app performance</string>
```

Ensuite, gérez la demande de suivi lors de l'initialisation de votre application :

```typescript
import { App } from '@capacitor/app';

async function requestTrackingPermission() {
  const status = await App.requestTrackingAuthorization();
  return status.authorized;
}
```

**Conseils pour la mise en œuvre de ATT** :

- Afficher la boîte de dialogue d'autorisation à un moment significatif de l'expérience utilisateur.
- Expliquez clairement les avantages du suivi avant que l'invite du système n'apparaisse.
- Respecter les décisions des utilisateurs et proposer des alternatives à ceux qui se désengagent.

### Autorisations d'accès aux données

Pour iOS, vous devrez définir des autorisations dans le `Info.plist` de votre application. Voici quelques autorisations courantes et leurs descriptions :

| Type d'autorisation | Info.plist Clé | Description de l'utilisation |
| --- | --- | --- |
| Appareil photo | NSCameraUsageDescription | Nécessaire pour la capture de photos |
| Localisation | NSLocationWhenInUseUsageDescription | Pour les fonctionnalités basées sur la localisation |
| Photos | NSPhotoLibraryUsageDescription | Accès pour enregistrer/charger des images |
| Contacts | NSContactsUsageDescription | Pour l'intégration des contacts |

**Quand demander des autorisations** :

- Ne demandez des autorisations que lorsqu'elles sont nécessaires et fournissez un contexte clair.
- Expliquez brièvement pourquoi chaque autorisation est nécessaire avant de demander.
- Si un utilisateur refuse une demande, proposez des fonctionnalités ou des options alternatives.Après avoir configuré les autorisations, assurez-vous que les utilisateurs sont informés de ces pratiques via une politique de confidentialité transparente.

### Affichage de la politique de confidentialité

Rendez la politique de confidentialité de votre application facile à trouver et à comprendre.

**Ce qu'il faut inclure** :

- Détails sur la collecte de données
- Comment les données seront utilisées
- Délais de conservation des données stockées
- Droits des utilisateurs sur leurs données
- Coordonnées pour les problèmes de confidentialité

Vous pouvez ajouter un centre de confidentialité à votre application comme ceci :

```typescript
import { Browser } from '@capacitor/browser';

async function showPrivacyPolicy() {
  await Browser.open({
    url: 'https://your-app.com/privacy-policy'
  });
}
```

**Comment afficher la politique de confidentialité** :

- Placez le lien de politique de confidentialité dans les paramètres de l'application pour un accès facile.
- Utiliser un langage simple et clair pour expliquer les concepts techniques.
- Ajouter des visuels pour améliorer la compréhension.
- Fournir un historique des versions et informer les utilisateurs des mises à jour.
- Autoriser les utilisateurs à exporter leurs données si demandé.

Assurez-vous que les mises à jour de votre application (par exemple, via Capgo) respectent ces paramètres de confidentialité et maintiennent la confiance des utilisateurs.

## Tests et soumission App Store

Une fois que vous avez configuré votre manifeste de confidentialité et vos contrôles utilisateur, l'étape suivante consiste à effectuer des tests approfondis pour garantir que tout fonctionne comme prévu. Ce processus permet de confirmer la conformité avant de soumettre votre application au App Store.

### Tests de confidentialité dans [Xcode](https://en.wikipedia.org/wiki/Xcode)

Pour commencer, activez le rapport de confidentialité dans Xcode :

```swift
// Enable Privacy Report in Xcode scheme
Edit Scheme > Run > Diagnostics > Enable Privacy Report
```

Exécutez votre application en mode débogage et consultez le rapport de confidentialité dans la console. Voici sur quoi se concentrer pendant les tests :

| Zone de test | Que vérifier |
| --- | --- |
| Suivi des applications | Synchronisation et affichage de la boîte de dialogue ATT |
| Accès aux données | Mise en œuvre correcte des autorisations |
| API Utilisation | exhaustivité du manifeste de confidentialité |
| Appels réseau | Sécurité de la transmission des données |

Ces tests garantissent que votre application est prête à être soumise et répond aux normes de conformité.

### Erreurs de confidentialité courantes

Après les tests, résolvez ces problèmes fréquents pour éviter les retards lors de la soumission :

- **Incomplet `privacy-manifest.json`** : assurez-vous que toutes les API et domaines de suivi requis sont répertoriés.
- **Chaînes d'objectif manquantes** : expliquez clairement la raison de chaque demande d'autorisation.
- **Demandes de suivi inappropriées** : ne déclenchez les autorisations de suivi qu'après une action de l'utilisateur.

### App Store Détails de confidentialité

Lorsque vous soumettez votre application, fournissez des informations précises sur vos pratiques en matière de confidentialité. Voici ce qu'il faut inclure :

| Catégorie de confidentialité | Informations nécessaires | Exemples |
| --- | --- | --- |
| Collecte de données | Types de données collectées | ID de l'appareil, emplacement |
| Utilisation des données | Pourquoi les données sont collectées | Fonctionnalité de l'application, Analytics |
| Liaison de données | Comment les données se connectent aux utilisateurs | Informations sur le compte, données d'utilisation |
| Suivi des données | Détails du suivi inter-applications | Publicité, analyses |

**Exigences clés App Store** :

- Mettez à jour l'URL de votre politique de confidentialité avant de la soumettre.
- Assurez-vous que les autorisations déclarées correspondent aux fonctionnalités de votre application.
- Documenter les pratiques de confidentialité de tout tiers SDKs utilisé.
- Confirmez que toutes les transmissions réseau sont cryptées pour des raisons de sécurité.

## Utilisation de [Capgo](https://capgo.app/) pour les mises à jour

![Capgo Interface du tableau de bord de mise à jour en direct](https://assets.seobotai.com/capgo.app/67e9dc69283d21cbd67b72cf/f3ac818a2fec22e90998e19561d68a19.jpg)

Capgo offre un système sécurisé pour les mises à jour en direct tout en respectant les règles de confidentialité de Apple.

### Capgo Fonctionnalités de confidentialitéLe système de mise à jour de Capgo est conçu dans un souci de sécurité et de confidentialité :

| Fonctionnalité | Avantage de confidentialité |
| --- | --- |
| Chiffrement de bout en bout | Garantit que seuls les utilisateurs autorisés peuvent décrypter les mises à jour |
| App Store Conformité | Conforme aux exigences strictes de Apple en matière de confidentialité |
| Déploiement sécurisé | Protège la distribution des mises à jour |
| Contrôle d'accès | Permet une gestion détaillée des autorisations |

Ces fonctionnalités protègent les mises à jour et préservent la confidentialité des utilisateurs.

> "La seule solution avec un véritable cryptage de bout en bout, les autres signent simplement les mises à jour" - Capgo [\[1\]](https://capgo.app/)

### Mettre à jour le déploiement avec Capgo

Voici comment déployer des mises à jour conformes à la confidentialité à l'aide de Capgo :

1. **Installez le plug-in Capgo** :
    
    Exécutez la commande suivante pour commencer :
    
    ```bash
    npx @capgo/cli init
    ```
    
2. **Configurez vos paramètres de confidentialité** :
    
    Mettez à jour votre manifeste de confidentialité pour inclure les domaines et les API de Capgo.
    
3. **Configurez des canaux de mise à jour cryptés** :
    
    Créez des canaux distincts pour les différentes étapes de déploiement afin de garantir des mises à jour sécurisées.
    

Capgo garantit que 95 % des utilisateurs actifs reçoivent des mises à jour dans les 24 heures, avec un taux de réussite global de 82 % [\[1\]](https://capgo.app/). Le système de canaux simplifie également la gestion du ciblage des mises à jour.

### Mises à jour du groupe d'utilisateurs dans Capgo

Capgo vous permet de cibler en toute sécurité des groupes d'utilisateurs spécifiques lors des mises à jour :

| Type de mise à jour | Considérations relatives à la confidentialité | Mise en œuvre |
| --- | --- | --- |
| Tests bêta | Limite l'exposition à certains utilisateurs | Utiliser une chaîne distincte avec un accès restreint |
| Déploiements par étapes | Mise à disposition progressive des utilisateurs | Distribuer des mises à jour en fonction de pourcentages |

> "Nous pratiquons le développement agile et @Capgo joue un rôle essentiel dans la fourniture continue de nos utilisateurs !" - Rodrigo Mantica [\[1\]](https://capgo.app/)

Les autorisations détaillées de Capgo garantissent que seuls les membres autorisés de l'équipe peuvent accéder aux mises à jour et les gérer en toute sécurité.

## Résumé

### Exigences clés en matière de confidentialité

Les règles de confidentialité de Apple pour [Capacitor applications](https://capgo.app/blog/capacitor-comprehensive-guide/) décrivent les besoins suivants :

| Exigence | Détails |
| --- | --- |
| **Manifeste de confidentialité** | Incluez les domaines, les API et les déclarations de suivi nécessaires. |
| **Consentement de l'utilisateur** | Utilisez le framework ATT pour demander des autorisations de suivi aux utilisateurs. |
| **Accès aux données** | Configurez les autorisations pour accéder aux photos, à l'emplacement et aux contacts. |
| **Politique de confidentialité** | Fournissez une politique claire et accessible dans l'application et dans la liste App Store. |
| **Mettre à jour la sécurité** | Assurez-vous que les mises à jour en direct utilisent des canaux de déploiement cryptés. |

### Liste de contrôle de mise en œuvre

Suivez cette liste de contrôle pour répondre aux exigences de Apple :

- **Configurer le manifeste de confidentialité**  
    Ajoutez des déclarations API, répertoriez les domaines de suivi et documentez les objectifs de l'utilisation des données.
    
- **Configurer les autorisations utilisateur**  
    Implémentez la boîte de dialogue ATT, configurez l'accès aux photos et aux médias et activez les services de localisation.
    
- **Système de mise à jour sécurisé**  
    Utilisez une solution de mise à jour conforme à la confidentialité, configurez des canaux cryptés et configurez les contrôles de ciblage des utilisateurs.
    

La plate-forme de Capgo offre un moyen fiable de respecter ces normes de confidentialité tout en gardant votre application fonctionnelle et centrée sur l'utilisateur [\[1\]](https://capgo.app/).
