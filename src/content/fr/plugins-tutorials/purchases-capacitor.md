---
locale: fr
---

Tutoriel revenuecat/purchas-capacitor

Ce didacticiel vous guidera tout au long du processus de mise en œuvre des achats et des abonnements intégrés dans votre application Ionic Capacitor à l'aide du package `@revenuecat/purchases-capacitor`.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants :

- Mise en place d'un projet Ionic Capacitor
- Un compte RevenueCat (inscrivez-vous sur https://apprevenuecatcom/signup)
- Produits ou abonnements intégrés à l'application configurés dans vos comptes App Store (Apple App Store et/ou Google Play Store)

##Installation

1 Ouvrez votre terminal ou votre invite de commande et accédez au répertoire de votre projet

2 Exécutez la commande suivante pour installer le package :

```bash
npm install @revenuecat/purchases-capacitor
```

3 Après l'installation, synchronisez votre projet Capacitor :

```bash
npx cap sync
```

##Configuration

1 Importez le module Achats dans le fichier TypeScript principal de votre application (par exemple, `appcomponentts`) :

```typescript
import { Purchases } from '@revenuecat/purchases-capacitor';
```

2 Configurez le SDK avec votre clé API RevenueCat :

```typescript
async function initializePurchases() {
  await Purchases.configure({
    apiKey: 'YOUR_REVENUECAT_API_KEY',
  });
}
```

Appelez cette fonction au démarrage de votre application, par exemple dans la méthode `ngOnInit()` de votre composant principal

## Utilisation de base

### Récupération des produits disponibles

Pour obtenir la liste des produits disponibles :

```typescript
async function getProducts() {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.current !== null) {
      const products = offerings.current.availablePackages;
      console.log('Available products:', products);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
```

### Effectuer un achat

Pour lancer un achat :

```typescript
async function purchasePackage(package: PurchasesPackage) {
  try {
    const { customerInfo, productIdentifier } = await Purchases.purchasePackage({ aPackage: package });
    console.log('Purchase successful:', productIdentifier);
    console.log('Customer Info:', customerInfo);
  } catch (error) {
    console.error('Error making purchase:', error);
  }
}
```

### Vérification de l'état de l'abonnement

Pour vérifier l'état actuel de l'abonnement de l'utilisateur :

```typescript
async function checkSubscriptionStatus() {
  try {
    const { customerInfo } = await Purchases.getCustomerInfo();
    const activeSubscriptions = customerInfo.activeSubscriptions;
    console.log('Active subscriptions:', activeSubscriptions);
  } catch (error) {
    console.error('Error checking subscription status:', error);
  }
}
```

### Restauration des achats

Pour restaurer les achats précédents d'un utilisateur :

```typescript
async function restorePurchases() {
  try {
    const { customerInfo } = await Purchases.restorePurchases();
    console.log('Purchases restored:', customerInfo);
  } catch (error) {
    console.error('Error restoring purchases:', error);
  }
}
```

## Fonctionnalités avancées

### Identification des utilisateurs

Si vous disposez de votre propre système d'identification utilisateur, vous pouvez identifier les utilisateurs sur RevenueCat :

```typescript
async function identifyUser(userId: string) {
  try {
    const { customerInfo } = await Purchases.logIn({ appUserID: userId });
    console.log('User identified:', customerInfo);
  } catch (error) {
    console.error('Error identifying user:', error);
  }
}
```

### Vérification de l'éligibilité au prix de lancement

Pour vérifier si un utilisateur est éligible à un prix de lancement :

```typescript
async function checkIntroEligibility(productIdentifiers: string[]) {
  try {
    const eligibility = await Purchases.checkTrialOrIntroductoryPriceEligibility({ productIdentifiers });
    console.log('Introductory price eligibility:', eligibility);
  } catch (error) {
    console.error('Error checking eligibility:', error);
  }
}
```

### Définition des attributs

Vous pouvez définir des attributs personnalisés pour les utilisateurs :

```typescript
async function setUserAttributes() {
  try {
    await Purchases.setAttributes({
      'user_level': '5',
      'user_type': 'premium'
    });
    console.log('Attributes set successfully');
  } catch (error) {
    console.error('Error setting attributes:', error);
  }
}
```

## Conclusion

Ce didacticiel a couvert les bases de la mise en œuvre des achats et des abonnements intégrés à l'aide du package `@revenuecat/purchases-capacitor`. N'oubliez pas de gérer les erreurs de manière appropriée et de tester minutieusement votre implémentation.

Pour une utilisation plus avancée et une documentation détaillée de l'API, reportez-vous à la documentation RevenueCat sur https://docsrevenuecatcom/

N'oubliez pas de configurer vos produits dans le tableau de bord RevenueCat et de les lier aux produits de votre boutique d'applications. Assurez-vous également de tester votre implémentation dans un environnement sandbox avant de la mettre en production.