---
slug: in-app-purchases-capacitor
title: Achats intégrés à l'application pour Capacitor
description: >-
  Comment implémenter les achats in-app pour les applications Capacitor en
  utilisant le plugin Capacitor Purchases et RevenueCat
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-01-19T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /revenuecat_iap.webp
head_image_alt: Achats in-app avec Revenue Cat
keywords: >-
  Capacitor, in-app purchases, RevenueCat, mobile app development, live updates,
  OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: fr
next_blog: ''
---
Je vais traduire le texte en français tout en conservant les éléments techniques, les liens et les balises HTML :

>> Ce plugin est maintenant transféré vers le dépôt officiel de RevenueCat. Veuillez consulter la [documentation officielle](https://www.revenuecat.com/docs/getting-started/installation/capacitor) pour plus d'informations.

Capacitor Purchases est un plugin pour le framework Capacitor qui permet les achats in-app sur iOS et Android. Il fournit une API simple et cohérente sur plusieurs plateformes, facilitant ainsi la mise en œuvre d'abonnements et d'achats in-app dans les applications mobiles.

L'une des principales caractéristiques du plugin Capacitor Purchases est son intégration avec RevenueCat, une plateforme qui fournit des outils pour les abonnements et achats in-app. RevenueCat simplifie le processus de mise en œuvre des abonnements et achats in-app en fournissant une API simple et cohérente sur plusieurs plateformes, et en automatisant des tâches telles que la validation des reçus et la gestion des utilisateurs.

Avec RevenueCat, les développeurs peuvent facilement gérer les abonnements, suivre les revenus et effectuer d'autres tâches connexes. Voici quelques fonctionnalités offertes par RevenueCat :

- Validation automatique des reçus
- Gestion des utilisateurs
- Support des modèles de tarification personnalisés
- Analyses détaillées
- Évolutivité

En utilisant le plugin Capacitor Purchases avec RevenueCat, les développeurs peuvent gagner du temps et des efforts lors de la mise en œuvre d'abonnements et d'achats in-app dans leurs applications mobiles, et fournir des fonctionnalités supplémentaires qui peuvent aider à améliorer l'expérience utilisateur et augmenter les revenus.

L'utilisation du plugin Capacitor Purchases et de RevenueCat permet aux développeurs de gérer et suivre facilement les abonnements et achats in-app, valider les reçus et gérer les utilisateurs sur plusieurs plateformes. Cela permet également de créer des modèles de tarification personnalisés et d'obtenir des analyses détaillées pour améliorer les performances et les revenus.

## Installation

Assurez-vous d'utiliser la dernière version de Capacitor et du plugin Capacitor Purchases. Vous pouvez vérifier la dernière version de Capacitor et du plugin Capacitor Purchases sur le site web de Capacitor.

Pour installer le plugin Capacitor Purchases, exécutez la commande suivante :
`npm i @capgo/capacitor-purchases`
ajoutez le plugin au code natif de votre application
`npx cap sync`

ajoutez la capacité d'achats in-app dans Xcode :

![Xcode step 1](/iap_step1.webp)
puis
![xcode step 2](/iap_step2.webp)

## 1. Créer un compte RevenueCat
Ce guide vous expliquera comment démarrer avec les abonnements et le SDK de RevenueCat en quelques lignes de code seulement.

Inscrivez-vous pour un nouveau compte RevenueCat [ici](https://app.revenuecat.com/).

> ### 📘
> 
> 💡 Voici un conseil !
> 
> RevenueCat recommande de créer un compte RevenueCat séparé pour chaque application / projet que vous avez, particulièrement si vous envisagez de vendre l'application. Cela accélérera le processus de transfert, car vous pourrez transférer le compte entier plutôt que d'attendre que le support RevenueCat transfère des projets individuels.

### Organisations / Entreprise

Nous recommandons d'utiliser un compte entreprise lors de l'inscription à RevenueCat et de configurer votre application au sein d'un projet. Vous pourrez inviter le reste de votre équipe en tant que [collaborateurs](https://www.revenuecat.com/docs/collaborators/) à votre projet, mais **seul le propriétaire du projet peut gérer la facturation**. Les collaborateurs du projet ne peuvent pas gérer les détails de facturation.

## 2. Configuration du Projet et de l'Application

### ▶️ Créer un Projet

Naviguez vers le tableau de bord RevenueCat et [ajoutez un nouveau projet](https://app.revenuecat.com/overview/) depuis le menu déroulant _Projects_ dans la navigation supérieure.

![RevenueCat step 1](/revenuecat_step1.webp)

La fenêtre modale pour créer un nouveau Projet

### ▶️ Ajouter une Application / Plateforme

Depuis **Project Settings > Apps** dans le menu de gauche du tableau de bord du projet, sélectionnez la plateforme pour l'application que vous allez ajouter.

![RevenueCat step 2](/revenuecat_step2.webp)

Tableau de bord du projet pour sélectionner la plateforme de l'application

Le champ **App name** est requis pour ajouter votre application à RevenueCat. Les autres champs de configuration peuvent être ajoutés plus tard. Pour effectuer des achats de test et de production, l'ID de bundle (iOS) / Nom du package (Android) ainsi que le Secret partagé (iOS) / Identifiants de service (Android) doivent être configurés.

![RevenueCat step 3](/revenuecat_step3.webp)

Page de configuration d'une application pour l'App Store d'Apple

> ### 📘
> 
> 💡 Voici un conseil !
> 
> Après avoir enregistré votre application, RevenueCat recommande de configurer les [Notifications Serveur de Plateforme](https://www.revenuecat.com/docs/server-notifications/). Ces notifications ne sont pas obligatoires, mais accéléreront les temps de livraison des [webhooks](https://www.revenuecat.com/docs/webhooks/) et des intégrations et réduiront le temps de latence pour la mise à jour de vos abonnés.

> ### 📘
> 
> Applications et utilisateurs de staging vs. production
> 
> RevenueCat lui-même n'a pas d'environnements séparés pour le staging et la production. Les transactions sous-jacentes pour les utilisateurs sont plutôt différenciées par sandbox et production.
> 
> Toute application RevenueCat peut effectuer des achats sandbox et production depuis les stores. Si vous avez des applications séparées pour le staging et la production, vous pouvez créer plusieurs projets dans RevenueCat pour refléter votre configuration.
> 
> De plus, les utilisateurs ne sont pas non plus séparés par environnement. Le même utilisateur peut avoir des achats sandbox actifs et des achats production actifs en même temps.

### ▶️ Identifiants de Service

Les identifiants de service doivent être configurés pour que RevenueCat puisse communiquer avec les app stores en votre nom. Consultez les guides RevenueCat [Secret Partagé App Store Connect](https://www.revenuecat.com/docs/itunesconnect-app-specific-shared-secret/), [Identifiants de Service Play](https://www.revenuecat.com/docs/creating-play-service-credentials/), et [Secret Partagé Amazon Appstore](https://www.revenuecat.com/docs/service-credentials/amazon-appstore-credentials/) pour plus d'informations.

Notez que les identifiants de service Play peuvent prendre jusqu'à 36 heures pour se propager dans les serveurs de Google.

## 3. Configuration des Produits

### ▶️ Configuration du Store

Avant de pouvoir commencer à utiliser RevenueCat pour récupérer des produits, vous devez configurer vos produits dans les stores respectifs. Consultez les guides suivants pour [App Store Connect](https://www.revenuecat.com/docs/ios-products/), [Google Play Console](https://www.revenuecat.com/docs/android-products/), [Amazon Appstore](https://www.revenuecat.com/docs/amazon-product-setup/), et [Stripe](https://www.revenuecat.com/docs/stripe-products/) pour vous aider à naviguer dans ce processus.

Si vous vendez des produits iOS, assurez-vous de signer votre 'Accord Applications Payantes' et de remplir vos informations bancaires et fiscales dans **App Store Connect > Agreements, Tax, and Banking**. **Cela doit être complété avant de pouvoir tester des achats**.

> ### 📘
> 
> Vous voulez sauter la configuration du store pendant les tests ?
> 
> Sur iOS, vous pouvez retarder la configuration des produits dans App Store Connect en testant avec des fichiers de configuration StoreKit à la place. Ces fichiers de configuration nécessitent une configuration minimale et sont configurables directement via Xcode.
> 
> En savoir plus sur la configuration des fichiers StoreKit Configuration dans le guide [Tests Sandbox](https://www.revenuecat.com/docs/apple-app-store/#ios-14-only-testing-on-the-simulator) de RevenueCat.

### ▶️ Configurer les Produits et les Droits dans RevenueCat

Une fois que vos produits in-app ont été configurés dans [App Store Connect](https://www.revenuecat.com/docs/ios-products/), [Google Play Console](https://www.revenuecat.com/docs/android-products/), [Amazon Appstore](https://www.revenuecat.com/docs/amazon-product-setup/), ou [Stripe](https://www.revenuecat.com/docs/stripe-products/), vous devrez copier cette configuration dans le tableau de bord RevenueCat. RevenueCat utilise un système de Droits pour contrôler l'accès aux fonctionnalités premium, et des Offres pour gérer l'ensemble des produits que vous proposez aux clients.

Les Droits sont le niveau d'accès auquel un client a "droit" après avoir acheté un produit spécifique.
Les Offres sont un moyen simple pour vous d'organiser les produits in-app que vous souhaitez "offrir" sur votre paywall et de les configurer à distance. RevenueCat **recommande** d'utiliser ces fonctionnalités pour simplifier votre code et vous permettre de changer de produits sans publier de mise à jour d'application.

Consultez [Configuration des Produits](https://www.revenuecat.com/docs/entitlements/) pour configurer vos produits et les organiser ensuite en Offres ou en Droits.

![RevenueCat step 4](/revenuecat_step4.webp)

## 4. Utilisation du SDK Purchases de RevenueCat

Le SDK RevenueCat implémente de manière transparente les achats et les abonnements sur toutes les plateformes tout en synchronisant les jetons avec le serveur RevenueCat.

Si vous rencontrez des problèmes avec le SDK, consultez [Dépannage des SDK](https://www.revenuecat.com/docs/troubleshooting-the-sdks/) pour obtenir des conseils.

> ### 📘
> 
> Utilisez uniquement votre clé SDK publique pour configurer Purchases
> 
> Vous pouvez obtenir votre clé SDK publique dans l'onglet **API keys** sous **Project settings** dans le tableau de bord.

Vous ne devriez configurer l'instance partagée de _Purchases_ qu'une seule fois, généralement au lancement de l'application. Par la suite, la même instance est partagée dans toute votre application en accédant à l'instance `.shared` dans le SDK.

Consultez le guide RevenueCat sur la [Configuration du SDK](https://docs.revenuecat.com/docs/configuring-sdk/) pour plus d'informations et de meilleures pratiques.

Assurez-vous de configurer _Purchases_ uniquement avec votre clé SDK publique. Vous pouvez en savoir plus sur les différentes clés API disponibles dans le guide [Authentication](https://www.revenuecat.com/docs/authentication/) de RevenueCat.

```javascript
import { CapacitorPurchases } from '@capgo/capacitor-purchases'
import { isPlatform } from '@ionic/vue' // use the right one for your framework

CapacitorPurchases.setDebugLogsEnabled({ enabled: import.meta.env.DEV }) // Enable to get debug logs in dev mode
if (isPlatform('ios')) {
    CapacitorPurchases.setup({ apiKey:'appl_******'})
} else if (isPlatform('android')) {
    CapacitorPurchases.setup({ apiKey:'goog_******'})
}
```

Pendant le développement, RevenueCat recommande d'activer des journaux de débogage plus détaillés. Pour plus d'informations sur ces journaux, consultez leur guide de [Débogage](https://www.revenuecat.com/docs/debugging/).

Si vous prévoyez d'utiliser RevenueCat aux côtés de votre code d'achat existant, consultez leur guide sur le [Mode Observateur](https://www.revenuecat.com/docs/observer-mode/).

> ### 📘
> 
> Configuration de Purchases avec des ID Utilisateur
> 
> Si vous avez un système d'authentification utilisateur dans votre application, vous pouvez fournir un identifiant utilisateur au moment de la configuration ou à une date ultérieure avec un appel à `.logIn()`. Pour en savoir plus, consultez le guide RevenueCat sur [l'Identification des Utilisateurs](https://www.revenuecat.com/docs/user-ids/).

Le SDK récupérera automatiquement les [Offerings configurées](https://www.revenuecat.com/docs/entitlements/#offerings) et récupérera les informations sur les produits auprès d'Apple, Google ou Amazon. Ainsi, les produits disponibles seront déjà chargés lorsque les clients lanceront votre écran d'achat.

Voici un exemple de récupération des Offerings. Vous pouvez utiliser les Offerings pour organiser votre écran de paywall. Consultez le guide RevenueCat sur [l'affichage des produits](https://www.revenuecat.com/docs/displaying-products/) pour plus d'informations et de bonnes pratiques.

### ▶️ Récupérer et afficher les produits disponibles

> ### 📘
> 
> Configuration des achats avec les ID utilisateurs
> 
> Si vous disposez d'un système d'authentification utilisateur dans votre application, vous pouvez fournir un identifiant utilisateur au moment de la configuration ou ultérieurement avec un appel à `.logIn()`. Pour en savoir plus, consultez le guide RevenueCat sur [l'identification des utilisateurs](https://www.revenuecat.com/docs/user-ids/).

Le SDK récupérera automatiquement les [Offerings configurées](https://www.revenuecat.com/docs/entitlements/#offerings) et récupérera les informations sur les produits auprès d'Apple, Google ou Amazon. Ainsi, les produits disponibles seront déjà chargés lorsque les clients lanceront votre écran d'achat.

Voici un exemple de récupération des Offerings. Vous pouvez utiliser les Offerings pour organiser votre écran de paywall. Consultez le guide RevenueCat sur [l'affichage des produits](https://www.revenuecat.com/docs/displaying-products/) pour plus d'informations et de bonnes pratiques.

```javascript
const { offerings } = await CapacitorPurchases.getOfferings()
if (offerings.current !== null) {  
    // Display current offering with offerings.current
}
```

Si la récupération de vos [Offerings](https://www.revenuecat.com/docs/entitlements/#offerings), [produits](https://www.revenuecat.com/docs/entitlements/#products) ou [packages](https://www.revenuecat.com/docs/entitlements/#adding-packages) disponibles est vide, cela est dû à un problème de configuration dans la boutique respective.

Les raisons les plus courantes dans App Store Connect sont un "Contrat d'applications payantes" obsolète ou des produits qui ne sont pas au moins dans l'état "Prêt à soumettre". Dans GooglePlay, cela se produit généralement lorsque l'application n'est pas publiée sur une piste fermée et qu'un utilisateur test valide n'a pas été ajouté.

Vous pouvez trouver plus d'informations sur le dépannage de ce problème dans le [Centre d'aide](https://support.revenuecat.com/hc/en-us/articles/360041793174/) RevenueCat.

### ▶️ Effectuer un achat

Le SDK inclut une méthode simple pour faciliter les achats. La méthode `purchase:package` prend un package de l'Offering récupérée et traite la transaction avec la boutique d'applications respective.

L'exemple de code ci-dessous montre le processus d'achat d'un package et la confirmation qu'il déverrouille le contenu "your_entitlement_id". Plus de détails sur la méthode `purchase:package` peuvent être trouvés dans le guide RevenueCat sur [la réalisation d'achats](https://www.revenuecat.com/docs/making-purchases/).

```typescript
const purchase = async (p: Package): Promise<PurchaserInfo | null> => {
  try {
    // console.log('purchase', p)
    const data = await CapacitorPurchases.purchasePackage({
      identifier: p.identifier,
      offeringIdentifier: p.offeringIdentifier,
    })
    const purchaserInfo = data.purchaserInfo
    // console.log('listenBuy', purchaserInfo)
    if (purchaserInfo.activeSubscriptions.includes(p.identifier)) {
      // set the user as paid
    }
    return purchaserInfo
  }
  catch (e) {
    console.error('listenBuy error', e)
  }
  return null
}
```

### ▶️ Vérifier l'état de l'abonnement

Vous pouvez utiliser cette méthode chaque fois que vous avez besoin d'obtenir le dernier statut, et il est sûr d'appeler cela de manière répétée tout au long du cycle de vie de votre application. _Purchases_ met automatiquement en cache les dernières informations `CustomerInfo` chaque fois qu'elles sont mises à jour — donc dans la plupart des cas, cette méthode extrait du cache et s'exécute très rapidement.

Il est typique d'appeler cette méthode lors de la décision de l'interface utilisateur à montrer à l'utilisateur, et chaque fois que l'utilisateur effectue une action qui nécessite un certain niveau de droit.

> ### 📘
> 
> 💡 Voici un conseil !
> 
> Vous pouvez accéder à beaucoup plus d'informations sur un abonnement que simplement s'il est actif ou non. Consultez le guide RevenueCat sur [l'état des abonnements](https://www.revenuecat.com/docs/customer-info/) pour savoir si l'abonnement est configuré pour se renouveler, s'il y a un problème détecté avec la carte de crédit de l'utilisateur, et plus encore.

RevenueCat permet à vos utilisateurs de restaurer leurs achats in-app, en réactivant tout contenu qu'ils ont précédemment acheté depuis le **même compte de boutique** (compte Apple, Google ou Amazon). Nous recommandons que toutes les applications aient un moyen pour les utilisateurs de déclencher la méthode de restauration. Notez qu'Apple exige un mécanisme de restauration dans le cas où un utilisateur perd l'accès à ses achats (par exemple : désinstallation/réinstallation de l'application, perte des informations de compte, etc.).

```javascript
  const res = await CapacitorPurchases.restoreTransactions()
  const purchaserInfo = res.purchaserInfo
  const ids: string[] = [] // extract active subscriptions ids
  purchaserInfo.activeSubscriptions.forEach((id) => {
    ids.push(id)
  })

```

Si deux [ID utilisateurs d'application](https://www.revenuecat.com/docs/user-ids/) différents restaurent des transactions du même compte de boutique sous-jacent (compte Apple, Google ou Amazon).
RevenueCat peut tenter de créer un alias entre les deux ID utilisateurs d'application et les compter comme le même utilisateur à l'avenir. Consultez le guide RevenueCat sur [la restauration des achats](https://www.revenuecat.com/docs/restoring-purchases/) pour plus d'informations sur les différents comportements de restauration configurables.

Étant donné que le SDK fonctionne parfaitement sur n'importe quelle plateforme, les modifications des informations d'achat d'un utilisateur peuvent provenir de diverses sources. Vous pouvez répondre à tout changement dans les `CustomerInfo` d'un client en implémentant une méthode de délégué optionnelle, `purchases:receivedUpdated:`.

Cette méthode se déclenchera chaque fois que le SDK reçoit un objet `CustomerInfo` mis à jour des appels à `getCustomerInfo()`, `purchase(package:)`, `purchase(product:)`, ou `restorePurchases()`.

Les mises à jour CustomerInfo ne sont _pas_ poussées vers votre application depuis le backend RevenueCat, les mises à jour ne peuvent se produire qu'à partir d'une requête réseau sortante vers RevenueCat, comme mentionné ci-dessus.

Selon votre application, il peut être suffisant d'ignorer le délégué et de simplement gérer les changements des informations client la prochaine fois que votre application est lancée ou dans les blocs de completion des méthodes du SDK.

```javascript
CapacitorPurchases.addListener('purchasesUpdate', (data) => {
  console.log('purchasesUpdate', data)
})
```

> ### 👍
> 
> Vous l'avez fait !
> 
> Vous avez maintenant implémenté un système d'achat d'abonnement complet sans passer un mois à écrire du code serveur. Félicitations !

### Applications exemples

Pour télécharger des exemples plus complets d'intégration du SDK, rendez-vous sur les ressources d'applications exemples de RevenueCat.

**[Voir les exemples](https://www.revenuecat.com/docs/sample-apps/)**

Je publierai bientôt une application exemple utilisant Capacitor et Vue.js.

Si vous avez besoin d'une utilisation approfondie du SDK Capacitor, consultez la documentation [ici](https://github.com/Cap-go/capacitor-purchases/).

### Prochaines étapes

-   Si vous ne l'avez pas déjà fait, assurez-vous que vos produits sont correctement configurés en consultant le [guide sur les droits](https://www.revenuecat.com/docs/entitlements/) de RevenueCat.
-   Si vous souhaitez utiliser vos propres identifiants utilisateur, lisez la documentation sur [la configuration des ID utilisateurs d'application](https://www.revenuecat.com/docs/user-ids/).
-   Si vous migrez vers RevenueCat depuis un autre système, consultez le guide RevenueCat sur [la migration de vos abonnements existants](https://www.revenuecat.com/docs/migrating-existing-subscriptions/).
-   Une fois que vous êtes prêt à tester votre intégration, vous pouvez suivre les guides RevenueCat sur [les tests et le débogage](https://www.revenuecat.com/docs/debugging/).
-   Si vous êtes éligible au Programme pour petites entreprises de l'App Store, consultez le guide RevenueCat sur [comment postuler et informer RevenueCat](https://www.revenuecat.com/docs/app-store-small-business-program/)

Si vous avez besoin de mises à jour en direct dans votre application

Rejoignez-nous ici 👇

## Inscrivez-vous ici pour obtenir votre compte

[Capgo](/register/)
