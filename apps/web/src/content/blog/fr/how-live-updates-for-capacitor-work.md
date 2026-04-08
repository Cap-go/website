---
slug: how-live-updates-for-capacitor-work
title: Comment fonctionnent les mises à jour en direct dans Capgo
description: >-
  Plongée technique dans l'implémentation des mises à jour en direct dans Capgo,
  comprenant son fonctionnement interne pour iOS et Android.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-03-18T06:14:25.862Z
updated_at: 2025-03-18T15:14:16.781Z
head_image: /capgo_banner.webp
head_image_alt: Architecture des mises à jour en direct
keywords: >-
  Capgo live updates, OTA updates, Capacitor updates, mobile app development,
  app updates
tag: 'Development, Mobile, Updates'
published: true
locale: fr
next_blog: ''
---
# Comprendre les mises à jour en direct dans Capgo

Les mises à jour en direct sont l'une des fonctionnalités les plus puissantes des applications Capacitor, permettant des mises à jour en temps réel sans soumission à l'App Store. Plongeons dans la façon dont Capgo implémente cette fonctionnalité.

## Concepts fondamentaux

Une application Capacitor se compose de deux couches principales :

1. **Couche Web** : Contient les fichiers HTML, CSS et JavaScript chargés dans le WebView
2. **Couche Native** : Contient le code spécifique à la plateforme (Java/Kotlin pour Android, Swift pour iOS)

Le système de mise à jour en direct de Capgo fonctionne en remplaçant la couche web pendant l'exécution, car ces fichiers ne sont pas compilés dans le binaire de l'application.

## Implémentation technique

### Chemins du serveur dans Capacitor

Capgo gère deux chemins critiques :

- **Chemin du serveur actuel** : Pointe vers les fichiers actuellement chargés dans WebView
- **Chemin du serveur suivant** : Pointe vers les fichiers qui se chargeront au prochain redémarrage de l'application

### Implémentation Android

Sur Android, Capgo gère les chemins via :

```java
// Store next server path
private void setNextCapacitorServerPath(String path) {
    SharedPreferences prefs = context.getSharedPreferences("CapWebViewSettings", Activity.MODE_PRIVATE);
    SharedPreferences.Editor editor = prefs.edit();
    editor.putString("serverBasePath", path);
    editor.apply();
}

// Update current path and reload
private void setCurrentCapacitorServerPath(String path) {
    bridge.setServerBasePath(path);
    bridge.reload();
}
```

### Implémentation iOS

Sur iOS, les chemins sont gérés via :

```swift
// Store next server path
private func setNextCapacitorServerPath(path: String) {
    KeyValueStore.standard["serverBasePath"] = path
}

// Update current path
private func setCurrentCapacitorServerPath(path: String) {
    bridge.viewController.setServerBasePath(path: path)
}
```

## Mesures de sécurité

Capgo implémente une sécurité de niveau militaire grâce au chiffrement de bout en bout, garantissant que les mises à jour de votre application restent totalement sécurisées du développement au déploiement. Notre système de chiffrement va au-delà de la signature de code traditionnelle pour fournir une véritable sécurité à connaissance nulle.

### Architecture de chiffrement de bout en bout

1. **Chiffrement de bout en bout (E2EE)** : Chaque bundle de mise à jour est chiffré en utilisant le chiffrement AES-256-GCM avant de quitter votre environnement de développement. Ce chiffrement de niveau militaire garantit que les mises à jour de votre application restent totalement privées et sécurisées tout au long du processus de livraison.

2. **Architecture à connaissance nulle** : Contrairement aux autres solutions de mise à jour OTA qui ne font que signer les mises à jour, Capgo utilise un véritable chiffrement à connaissance nulle. Cela signifie :
   - Le contenu des mises à jour est chiffré avant l'envoi
   - Les serveurs Capgo ne stockent que des données chiffrées
   - Le déchiffrement n'a lieu que sur les appareils des utilisateurs finaux
   - Aucun intermédiaire ne peut accéder au contenu de votre mise à jour

3. **Gestion sécurisée des clés** : 
   - Les clés de chiffrement sont générées et stockées en toute sécurité dans votre environnement CI/CD
   - Les clés privées ne touchent jamais les serveurs de Capgo
   - Chaque version d'application peut utiliser des clés de chiffrement uniques
   - Support de rotation des clés pour une sécurité renforcée

En savoir plus sur notre système de chiffrement dans notre guide détaillé : [End-to-End Encryption in Capgo Live Updates](https://capgo.app/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing/)

### Processus de sécurité des mises à jour

1. **Chiffrement avant envoi** :
   - Les mises à jour sont chiffrées dans votre pipeline CI/CD
   - Chaque fichier est chiffré individuellement
   - Les métadonnées sont également chiffrées pour une confidentialité totale

2. **Stockage sécurisé** :
   - Les bundles chiffrés sont stockés sur le CDN global de Capgo
   - Aucune donnée en clair ne touche nos serveurs
   - Même en cas de violation du serveur, les données restent sécurisées

3. **Livraison sécurisée** :
   - Les mises à jour sont livrées via des canaux chiffrés
   - Chaque instance d'application valide l'intégrité du chiffrement
   - Mécanismes de nouvelle tentative automatique pour les déchiffrements échoués

4. **Sécurité côté client** :
   - Les mises à jour sont vérifiées avant l'installation
   - L'échec du déchiffrement déclenche un retour automatique
   - Stockage sécurisé des clés dans le stockage protégé de l'application

Cette approche de sécurité complète garantit que les mises à jour de votre application restent protégées contre :
- Les attaques de l'homme du milieu
- Les violations côté serveur
- Les modifications non autorisées
- Les attaques par rejeu
- L'altération du contenu

## Cycle de vie des mises à jour

Le processus de mise à jour de Capgo est conçu pour être automatique par défaut. Voici comment fonctionne le processus automatique :

### 1. Vérification automatique des mises à jour

Le plugin vérifie automatiquement les mises à jour dans ces situations :
- Au démarrage de l'application

Ce comportement est contrôlé par le paramètre `autoUpdate` :

```typescript
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true // Enable automatic updates
    }
  }
}
```
Vous pouvez aussi vérifier manuellement avec `getLatest()`

### 2. Téléchargement automatique

Lorsqu'une nouvelle version est détectée, si `autoUpdate` est activé :
1. Le téléchargement démarre automatiquement
2. La progression est suivie en interne
3. Les téléchargements échoués sont réessayés automatiquement à chaque ouverture de l'application
4. Les téléchargements réussis sont stockés dans le stockage de l'application

Vous pouvez surveiller ce processus via des événements :
```typescript
CapacitorUpdater.addListener('download', (info: DownloadEvent) => {
  console.log('Auto-download progress:', info.percent);
});

CapacitorUpdater.addListener('downloadComplete', (info: DownloadCompleteEvent) => {
  console.log('Auto-download complete:', info.bundle);
});
```

### 3. Installation automatique

Le moment de l'installation dépend de votre configuration :

```typescript
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": false // install update on app backgrounding
      "resetWhenUpdate": true, // reset live updates on native update (true by default)
      "autoDeleteFailed": true, // Auto cleanup failed updates (true by default)
      "autoDeletePrevious": true // Auto cleanup old versions (true by default)
    }
  }
}
```

L'installation se produit :
- Immédiatement si `directUpdate` est vrai
- Au prochain passage en arrière-plan de l'application si `directUpdate` est faux
- Retour automatique si l'installation échoue

Le plugin gère également automatiquement le stockage :
- Supprime les mises à jour échouées si `autoDeleteFailed` est vrai
- Nettoie les anciennes versions si `autoDeletePrevious` est vrai

### Report des mises à jour

Vous pouvez contrôler quand les mises à jour sont installées en utilisant des conditions de délai :

```typescript
// Delay until app goes to background
await CapacitorUpdater.setDelay({
  kind: 'background'
});

// Delay until specific date
await CapacitorUpdater.setDelay({
  kind: 'date',
  value: '2024-03-20T10:00:00.000Z'
});

// Delay until next native version
await CapacitorUpdater.setDelay({
  kind: 'nativeVersion'
});

// Multiple conditions
await CapacitorUpdater.setMultiDelay({
  delayConditions: [
    {
      kind: 'background'
    },
    {
      kind: 'date',
      value: '2024-03-20T10:00:00.000Z'
    }
  ]
});
```

Conditions de délai disponibles :
- **background** : Installer quand l'application passe en arrière-plan
- **date** : Installer après une date/heure spécifique
- **nativeVersion** : Installer après la prochaine mise à jour native
- **kill** : Installer après l'arrêt de l'application

C'est utile pour :
- Programmer des mises à jour pendant les heures creuses
- Coordonner les mises à jour avec l'activité de l'utilisateur
- Assurer une expérience de mise à jour fluide
- Éviter les perturbations pendant les tâches critiques

### États des mises à jour

Pendant le processus automatique, les bundles passent par ces états :
1. **downloading** : Téléchargement en cours
2. **pending** : Téléchargement terminé, en attente d'installation
3. **success** : Mise à jour installée et active
4. **error** : Mise à jour échouée (déclenche un retour automatique)

## Conformité aux stores

### Apple App Store ✅

Les mises à jour en direct sont entièrement conformes aux politiques de l'App Store d'Apple. Comme indiqué dans l'accord de licence du programme pour développeurs Apple :

> "Le code interprété peut être téléchargé dans une application, mais uniquement si ce code : (a) ne modifie pas l'objectif principal de l'application en fournissant des fonctionnalités incohérentes avec l'objectif prévu et annoncé de l'application telle que soumise à l'App Store, (b) ne crée pas de magasin ou de vitrine pour d'autres codes ou applications, et (c) ne contourne pas la signature, le bac à sable ou d'autres fonctionnalités de sécurité du système d'exploitation."

Les mises à jour Capgo ne modifient que la couche web tout en respectant toutes les limites de sécurité de la plateforme.

### Google Play Store ✅

Les mises à jour en direct sont conformes aux politiques du Google Play Store. La politique d'abus des appareils et du réseau stipule spécifiquement :

> "Cette restriction ne s'applique pas au code qui s'exécute dans une machine virtuelle ou un interpréteur où l'un ou l'autre fournit un accès indirect aux API Android (comme JavaScript dans une webview ou un navigateur)."

Puisque Capgo ne met à jour que le contenu WebView, il entre dans le cadre de ces directives autorisées.

## Meilleures pratiques

1. **Déploiements progressifs** : Déployer les mises à jour graduellement
2. **Contrôle de version** : Suivre toutes les versions déployées
3. **Support de retour arrière** : Récupération rapide des problèmes
4. **Mises à jour delta** : Ne télécharger que les fichiers modifiés

## Quand utiliser les mises à jour en direct

Parfait pour :
- Corrections de bugs
- Améliorations de l'interface utilisateur
- Mises à jour de contenu
- Bascules de fonctionnalités

Ne convient pas pour :
- Changements de code natif
- Mises à jour majeures de version
- Correctifs de sécurité nécessitant des changements natifs
