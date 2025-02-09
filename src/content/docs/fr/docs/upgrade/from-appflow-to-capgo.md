---
title: Migration d'AppFlow vers Capgo
description: Guide complet pour migrer votre application d'Ionic AppFlow vers Capgo
sidebar:
  order: 7
---

## Pourquoi migrer vers Capgo ?

Suite à l'annonce concernant Ionic AppFlow, la migration vers Capgo offre une transition fluide pour votre processus de développement d'applications mobiles. Capgo propose des fonctionnalités améliorées, de meilleures performances et des économies significatives tout en maintenant toutes les fonctionnalités essentielles.

### Avantages Principaux
- Livraison des mises à jour plus rapide (< 1 minute contre 10 minutes)
- Tarification plus abordable (14$/mois contre 499$/mois)
- Chiffrement de bout en bout inclus dans tous les plans
- Meilleur contrôle des canaux de mise à jour
- Options complètes d'intégration CI/CD

## Étapes de Migration

### 1. Migration des Mises à Jour

#### Retirer les Dépendances
```bash
npm uninstall @ionic/appflow
# Retirer les configurations spécifiques à AppFlow de capacitor.config.json
```

#### Installer Capgo
```bash
npm install @capgo/capacitor-updater
npx cap sync
```

#### Mettre à Jour la Configuration
Ajoutez la configuration Capgo à votre `capacitor.config.json` :
```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true
    }
  }
}
```

### 2. Migration CI/CD

Capgo offre des options flexibles :

#### Option 1 : Utiliser votre CI/CD Existant
Suivez nos tutoriels détaillés :
- [Configuration iOS](https://capgo.app/blog/automatic-capacitor-ios-build-github-action/)
- [Configuration Android](https://capgo.app/blog/automatic-capacitor-android-build-github-action/)
- [Intégration GitHub Actions](https://capgo.app/blog/github-action-capacitor/)

#### Option 2 : Service CI/CD
Utilisez notre [service géré](https://cal.com/martindonadieu/mobile-ci-cd-done-for-you).

### 3. Configuration des Canaux

1. Créer des canaux dans le tableau de bord Capgo :
```bash
npx @capgo/cli channel create production
npx @capgo/cli channel create staging
```

2. Configurer les paramètres :
```bash
# Canal de production
npx @capgo/cli channel update production --no-downgrade --no-upgrade

# Canal de staging
npx @capgo/cli channel update staging
```

### 4. Tests de Migration

1. **Tester les Mises à Jour**
```bash
# Créer un bundle de test
npx @capgo/cli bundle create --channel staging
```

2. **Vérification**
- Installer l'application sur un appareil de test
- Vérifier la réception des mises à jour
- Tester le processus d'installation
- Valider la récupération

## Résolution des Problèmes

### Problèmes Fréquents

#### Mises à Jour Non Reçues
- Vérifier la configuration des canaux
- Consulter les journaux
- Vérifier la connectivité réseau
- Valider les versions

## Prochaines Étapes

1. [Créer un compte Capgo](/register/)
2. [Guide de démarrage](/docs/getting-started/quickstart/)
3. [Intégration CI/CD](/docs/getting-started/cicd-integration/)
4. [Configuration des mises à jour](/docs/live-updates/)

Pour les équipes nécessitant un support dédié, [contactez notre équipe](https://cal.com/martindonadieu/capgo-enterprise-inquiry).
