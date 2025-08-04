---
slug: how-to-segment-users-by-plan-and-channels
title: >-
  Comment utiliser les canaux pour les drapeaux de fonctionnalité et les tests
  A/B
description: >-
  Apprenez à utiliser les canaux de CapGo pour les indicateurs de
  fonctionnalités et les tests A/B en auto-attribuant des utilisateurs ou en
  utilisant votre backend.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2025-04-15T00:00:00.000Z
updated_at: 2025-04-15T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Illustration des drapeaux de fonctionnalités des canaux Capgo
keywords: 'channels, feature flags, a/b testing, capacitor, capgo'
tag: Tutorial
published: true
locale: fr
next_blog: ''
---
# Comment utiliser les canaux pour les indicateurs de fonctionnalité et les tests A/B

Le système de canaux de CapGo offre un moyen flexible de segmenter les utilisateurs et de contrôler l'accès aux fonctionnalités. Bien que CapGo ne dispose pas de gestion de plan intégrée ou de tests A/B, vous pouvez mettre en œuvre ces fonctionnalités en gérant vous-même les affectations de canaux.

## Comprendre les canaux

Les canaux dans CapGo vous permettent de :
- Cibler des groupes d'utilisateurs spécifiques avec différentes fonctionnalités
- Effectuer des tests A/B en assignant des utilisateurs à différents canaux
- Déployer progressivement de nouvelles fonctionnalités
- Créer des programmes de test bêta

## Méthodes d'affectation des canaux

### 1. Affectation Backend (Recommandé)

C'est la méthode la plus sécurisée. Elle implique :
1. Obtenir l'ID de l'appareil depuis l'updater
2. L'envoyer à votre backend
3. Votre backend appelle l'API CapGo pour affecter l'appareil

Voici comment l'implémenter :

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

// Get device ID
const getDeviceId = async () => {
  const { deviceId } = await CapacitorUpdater.getDeviceId()
  return deviceId
}

// Send device ID to your backend
const assignToChannel = async (channel: string) => {
  const deviceId = await getDeviceId()
  // Your backend will call CapGo API to assign the device
  await yourBackend.assignDeviceToChannel(deviceId, channel)
}
```

### Mise en œuvre Backend

Votre backend doit :
1. Obtenir une clé API depuis le tableau de bord CapGo
2. Appeler l'API CapGo pour affecter l'appareil à un canal

Pour obtenir votre clé API :
1. Connectez-vous à votre tableau de bord CapGo
2. Allez dans Paramètres > Clés API
3. Cliquez sur "Générer une nouvelle clé"
4. Sélectionnez le mode `all` pour gérer les appareils et les canaux
5. Copiez la clé générée et conservez-la en toute sécurité dans vos variables d'environnement backend
   - La clé sera une chaîne hexadécimale de 32 caractères
   - C'est une clé secrète qui ne doit jamais être exposée dans le code côté client

Voici un exemple Node.js :

```typescript
import axios from 'axios'

const CAPGO_API_KEY = 'your_api_key'
const CAPGO_API_URL = 'https://api.capgo.app'

async function assignDeviceToChannel(deviceId: string, channel: string) {
  try {
    const response = await axios.post(
      `${CAPGO_API_URL}/device`,
      {
        app_id: 'YOUR_APP_ID',
        device_id: deviceId,
        channel: channel
      },
      {
        headers: {
          'authorization': CAPGO_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Failed to assign device to channel:', error)
    throw error
  }
}
```

Le backend doit également :
- Valider les autorisations de l'utilisateur
- Enregistrer toutes les affectations de canaux
- Gérer la limitation de débit
- Implémenter une logique de réessai pour les affectations échouées

### 2. Auto-Affectation (Moins Sécurisé)

Cette méthode permet aux appareils de s'auto-affecter directement à un canal. Elle est utile pour les tests mais moins sécurisée pour la production :

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

// Assign device to channel
const assignToChannel = async (channel: string) => {
  await CapacitorUpdater.setChannel(channel)
}

// Get current channel
const getCurrentChannel = async () => {
  const { channel } = await CapacitorUpdater.getChannel()
  return channel
}
```

Avant que les utilisateurs puissent s'auto-affecter à un canal, vous devez activer cette fonctionnalité dans le tableau de bord CapGo :

1. Allez dans la section Canaux de votre tableau de bord CapGo
2. Cliquez sur le nom du canal que vous souhaitez gérer
3. Dans les paramètres du canal, activez "Autoriser les appareils à s'auto-associer"
4. Enregistrez les modifications

Si ce paramètre est faux, toute tentative d'appeler `setChannel` avec ce canal échouera.

## Mise en œuvre des indicateurs de fonctionnalité

Utilisez des canaux pour contrôler l'accès aux fonctionnalités :

```typescript
const isFeatureEnabled = async (feature: string) => {
  // Example: Check if user is in beta channel
  const channel = await getCurrentChannel()
  return channel === 'beta'
}
```

## Mise en œuvre des tests A/B

Effectuez des tests A/B en assignant des utilisateurs à différents canaux :

```typescript
const assignToABTest = async (userId: string) => {
  // Use consistent hashing to assign users
  const hash = await hashUserId(userId)
  const variant = hash % 2 === 0 ? 'variant-a' : 'variant-b'
  
  await assignToChannel(variant)
  return variant
}
```

## Meilleures pratiques

1. **Utiliser l'affectation Backend** : Pour la production, utilisez toujours la méthode d'affectation backend
2. **Affectation cohérente** : Utilisez des identifiants utilisateur ou d'autres identifiants stables pour une affectation cohérente des canaux
3. **Surveillance** : Suivez l'utilisation des fonctionnalités et les métriques de performance pour chaque canal
4. **Déploiements progressifs** : Commencez par de petits segments d'utilisateurs et étendez-vous progressivement
5. **Documentation claire** : Documentez votre stratégie de canal et vos objectifs

## Conclusion

En tirant parti du système de canaux de CapGo, vous pouvez créer des expériences d'application plus personnalisées et réaliser des tests A/B. Pour une utilisation en production, privilégiez toujours la méthode d'affectation backend pour une meilleure sécurité et un meilleur contrôle.

Pour plus de détails sur la gestion des canaux, consultez notre [documentation sur les canaux](/docs/live-updates/channels/).
