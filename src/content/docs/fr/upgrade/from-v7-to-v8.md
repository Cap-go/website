---
locale: fr
title: "De V7 à V8"
description: "Un guide détaillé sur la transition de la version 7 à la version 8 du système de mise à jour Capgo, décrivant les étapes nécessaires et les considérations pour un processus de mise à niveau réussi, garantissant la compatibilité avec les fonctionnalités et améliorations de Capacitor 8."
sidebar:
  order: 0
---

## Pourquoi cette mise à niveau

Cette version majeure est ici pour suivre la version majeure 8 de Capacitor

Suivez d'abord le guide de migration de Capacitor :

[https://capacitorjs.com/docs/updating/8-0](https://capacitorjs.com/docs/updating/8-0/)

## Installation

`npm i @capgo/capacitor-updater@8`

Ensuite, synchronisez la mise à jour du code natif :

`npx cap sync`

C'est tout ! Assez facile !

## Nouveautés dans V8

La version 8 de capacitor-updater apporte une compatibilité complète avec Capacitor 8, garantissant que votre application peut exploiter les dernières fonctionnalités et améliorations du système d'exploitation mobile.

### Mises à jour clés

- **Compatibilité Capacitor 8** : Support complet des fonctionnalités natives améliorées de Capacitor 8
- **Améliorations des performances** : Processus optimisé de livraison et d'installation des mises à jour
- **Stabilité améliorée** : Corrections de bugs et améliorations de stabilité depuis v7
- **Compatibilité API maintenue** : Aucune modification majeure de l'API du plugin depuis v7

## Configuration

La configuration reste la même que pour v7. Vos paramètres `capacitor.config` existants continueront de fonctionner :

```typescript
{
  plugins: {
    CapacitorUpdater: {
      appId: 'your-app-id',
      version: '1.0.0',
      autoUpdate: true,
      // ... autres paramètres
    }
  }
}
```

## Liste de vérification de migration

- [ ] Mettre à jour @capacitor/core vers ^8.0.0
- [ ] Mettre à jour @capacitor/android vers ^8.0.0
- [ ] Mettre à jour @capacitor/ios vers ^8.0.0
- [ ] Suivre le guide de migration v8 de Capacitor
- [ ] Mettre à jour @capgo/capacitor-updater vers ^8.0.0
- [ ] Exécuter `npx cap sync`
- [ ] Tester votre application en profondeur sur iOS et Android

## Besoin d'aide ?

Si vous rencontrez des problèmes lors de la migration, veuillez :

1. Consulter notre [documentation](/docs/live-updates/)
2. Visiter notre [communauté Discord](https://discord.com/invite/VnYRvBfgA6)
3. Ouvrir un problème sur [GitHub](https://github.com/Cap-go/capacitor-updater/issues)
