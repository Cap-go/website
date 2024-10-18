---
locale: fr
---

Intégration du paquet @capgo/capacitor-crisp

Le paquet `@capgo/capacitor-crisp` vous permet d'intégrer Crisp, un SDK natif, dans votre application Capacitor. Il fournit des méthodes pour configurer Crisp, ouvrir la boîte de discussion, définir les détails de l'utilisateur, envoyer des événements, et plus encore.

Pour commencer avec le paquet `@capgo/capacitor-crisp`, suivez ces étapes :

## Installation

1. Ouvrez votre terminal et naviguez vers le répertoire racine de votre application Capacitor.
2. Exécutez la commande suivante pour installer le paquet :

```bash
npm install @capgo/capacitor-crisp
npx cap sync
```

## Initialiser Crisp

Avant d'utiliser l'une des méthodes fournies par le paquet `@capgo/capacitor-crisp`, vous devez configurer Crisp avec votre ID de site web. Ajoutez le code suivant à votre projet :

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

CapacitorCrisp.configure({ websiteID: '******-****-****-****-********' });
```

Remplacez `'******-****-****-****-********'` par votre véritable ID de site Crisp.

### Intégration iOS

Si vous ciblez iOS, vous devez ajouter les autorisations suivantes au fichier Infoplist de votre application :

- Confidentialité - Description de l'utilisation de la caméra (NSCameraUsageDescription)
- Confidentialité - Description de l'utilisation des additions à la bibliothèque photos (NSPhotoLibraryAddUsageDescription)

Assurez-vous de fournir une description pour chaque autorisation expliquant pourquoi votre application en a besoin.

### Intégration Android

Aucune étape supplémentaire n'est requise pour l'intégration Android.

## Ouvrir la boîte de discussion

Pour ouvrir la boîte de discussion Crisp dans votre application, utilisez la méthode `openMessenger` fournie par le paquet `@capgo/capacitor-crisp`. Ajoutez le code suivant à votre projet :

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

CapacitorCrisp.openMessenger();
```

Cela ouvrira la boîte de discussion Crisp pour que les utilisateurs puissent commencer une conversation avec votre équipe de support.

## Fonctionnalités supplémentaires

Le paquet `@capgo/capacitor-crisp` fournit plusieurs autres méthodes pour personnaliser et interagir avec Crisp. Voici quelques-unes des méthodes disponibles :

- `setTokenID` : Définir l'ID du token pour l'utilisateur
- `setUser` : Définir les détails de l'utilisateur tels que le pseudo, le numéro de téléphone, l'email et l'avatar
- `pushEvent` : Envoyer un événement personnalisé à Crisp
- `setCompany` : Définir les détails de l'entreprise, y compris le nom, l'URL, la description, l'emploi et la géolocalisation
- `setInt` : Définir une valeur entière personnalisée
- `setString` : Définir une valeur chaîne personnalisée
- `sendMessage` : Envoyer un message de discussion à Crisp
- `setSegment` : Définir le segment pour l'utilisateur
- `reset` : Réinitialiser la configuration Crisp

Pour plus d'informations sur ces méthodes et leurs paramètres, reportez-vous à la documentation officielle du paquet `@capgo/capacitor-crisp`.

C'est tout ! Vous avez appris à utiliser le paquet `@capgo/capacitor-crisp` pour intégrer Crisp dans votre application Capacitor. Profitez d'une communication fluide avec vos utilisateurs via la boîte de discussion Crisp.