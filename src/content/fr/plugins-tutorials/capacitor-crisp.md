---
locale: fr
---

chanter @capgo/capacitor-crisp

Le package `@capgo/capacitor-crisp` vous permet d'intégrer Crisp, un SDK natif, dans votre application Capacitor. Il fournit des méthodes pour configurer Crisp, ouvrir la boîte de discussion, définir les détails de l'utilisateur, envoyer des événements, etc.

Pour démarrer avec le package `@capgo/capacitor-crisp`, suivez ces étapes :

##Installation

1 Ouvrez votre terminal et accédez au répertoire racine de votre application Capacitor
2 Exécutez la commande suivante pour installer le package :

```bash
npm install @capgo/capacitor-crisp
npx cap sync
```

## Initialiser Crisp

Avant d'utiliser l'une des méthodes fournies par le package `@capgo/capacitor-crisp`, vous devez configurer Crisp avec l'ID de votre site Web. Ajoutez le code suivant à votre projet :

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

CapacitorCrisp.configure({ websiteID: '******-****-****-****-********' });
```

Remplacez ``******-****-****-****-********'` par votre identifiant de site Web Crisp actuel

### Intégration iOS

Si vous ciblez iOS, vous devez ajouter les autorisations suivantes au fichier Infoplist de votre application :

- Confidentialité - Description de l'utilisation de la caméra (NSCameraUsageDescription)
- Confidentialité - Description d'utilisation des ajouts à la bibliothèque de photos (NSPhotoLibraryAddUsageDescription)

Assurez-vous de fournir une description pour chaque autorisation expliquant pourquoi votre application en a besoin

### Intégration Android

Aucune étape supplémentaire n'est requise pour l'intégration d'Android

## Ouvrez la Chatbox

Pour ouvrir la chatbox Crisp dans votre application, utilisez la méthode `openMessenger` fournie par le package `@capgo/capacitor-crisp`. Ajoutez le code suivant à votre projet :

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

CapacitorCrisp.openMessenger();
```

Cela ouvrira la boîte de discussion Crisp permettant aux utilisateurs de démarrer une conversation avec votre équipe d'assistance.

## Fonctionnalité supplémentaire

Le package `@capgo/capacitor-crisp` fournit plusieurs autres méthodes pour personnaliser et interagir avec Crisp. Voici quelques-unes des méthodes disponibles :

- `setTokenID` : définit l'ID du jeton pour l'utilisateur
- `setUser` : définissez les détails de l'utilisateur tels que le surnom, le numéro de téléphone, l'e-mail et l'avatar
- `pushEvent` : envoyer un événement personnalisé à Crisp
- `setCompany` : définissez les détails de l'entreprise, notamment le nom, l'URL, la description, l'emploi et la géolocalisation
- `setInt` : définit une valeur entière personnalisée
- `setString` : définit une valeur de chaîne personnalisée
- `sendMessage` : envoyer un message de discussion à Crisp
- `setSegment` : définit le segment pour l'utilisateur
- `reset` : Réinitialiser la configuration Crisp

Pour plus d'informations sur ces méthodes et leurs paramètres, reportez-vous à la documentation officielle du package `@capgo/capacitor-crisp`

C'est ça! Vous avez appris à utiliser le package `@capgo/capacitor-crisp` pour intégrer Crisp dans votre application Capacitor Profitez d'une communication transparente avec vos utilisateurs via la boîte de discussion Crisp