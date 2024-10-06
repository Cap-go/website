---
slug: in-app-purchases-capacitor
title: achats intégrés pour condensateur
description: >-
  Comment mettre en œuvre des achats intégrés pour les applications de
  condensateurs à l'aide du plugin Capacitor Purchases et de RevenueCat
author_url: 'https://x.com/martindonadieu'
created_at: 2023-01-19T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /revenuecat_iap.webp
head_image_alt: Chat de revenus dans les achats d'applications
tag: Tutorial
published: true
locale: fr
next_blog: ''
---

Capacitor Purchases est un plugin pour le framework Capacitor qui permet des achats intégrés sur iOS et Android. Il fournit une API simple et cohérente sur plusieurs plates-formes, permettant aux développeurs de mettre en œuvre facilement des abonnements et des achats intégrés dans leurs applications mobiles.

L'une des principales caractéristiques du plugin Capacitor Purchases est qu'il s'intègre à RevenueCat, une plate-forme qui fournit des outils pour les abonnements et les achats intégrés. RevenueCat simplifie le processus de mise en œuvre des abonnements et des achats intégrés en fournissant une solution simple et cohérente. API sur plusieurs plates-formes et automatisation de tâches telles que la validation des reçus et la gestion des utilisateurs

Avec RevenueCat, les développeurs peuvent facilement gérer les abonnements, suivre les revenus et effectuer d'autres tâches connexes. Certaines fonctionnalités offertes par RevenueCat incluent :

- Validation automatisée des reçus
- Gestion des utilisateurs
- Prise en charge de modèles de tarification personnalisés
- Analyses détaillées
-Évolutivité

En utilisant le plugin Capacitor Purchases avec RevenueCat, les développeurs peuvent économiser du temps et des efforts lors de la mise en œuvre d'abonnements et d'achats intégrés dans leurs applications mobiles, et fournir des fonctionnalités supplémentaires qui peuvent aider à améliorer l'expérience utilisateur et à augmenter les revenus.

Grâce au plugin Capacitor Purchases et à RevenueCat, les développeurs peuvent facilement gérer et suivre les abonnements et les achats intégrés, valider les reçus et gérer les utilisateurs sur plusieurs plates-formes. Il permet également de créer des modèles de tarification personnalisés et d'obtenir des analyses détaillées pour améliorer les performances et les revenus.


##Installation

Assurez-vous d'utiliser la dernière version de Capacitor et du plugin Capacitor Purchases. Vous pouvez vérifier la dernière version de Capacitor et du plugin Capacitor Purchases sur le site Web de Capacitor.

Pour installer le plugin Capacitor Purchases, exécutez la commande suivante :
`npm et @capgo/capacitor-purchases`
ajoutez le plugin au code natif de votre application
`synchronisation du plafond npx`


ajouter une fonctionnalité d'achats intégrés dans Xcode :

![Xcode étape 1](/iap_step1webp)
alors
![xcode étape 2](/iap_step2webp)

## 1 Créer un compte RevenueCat
Ce guide vous expliquera comment être opérationnel avec les abonnements et le SDK de RevenueCat avec seulement quelques lignes de code.

Inscrivez-vous pour un nouveau compte RevenueCat [ici](https://apprevenuecatcom/)

> ### 📘
> 
> 💡 Voici une astuce !
> 
> RevenueCat recommande de créer un compte RevenueCat distinct pour chaque application/projet que vous possédez, surtout si vous avez l'intention de vendre l'application. Cela accélérera le processus de transfert, puisque vous pouvez transférer l'intégralité du compte plutôt que d'attendre que le support RevenueCat transfère des projets individuels.


### Organisations/Entreprise

Nous vous recommandons d'utiliser un compte d'entreprise lors de l'inscription à RevenueCat et de la configuration de votre application dans un projet. Vous pourrez inviter le reste de votre équipe en tant que [collaborateurs](https://wwwrevenuecatcom/docs/collaborators/) à votre projet, mais **seul le propriétaire du projet peut gérer la facturation** Les collaborateurs du projet ne peuvent pas gérer les détails de facturation

## 2 Configuration du projet et de l'application


### ▶️ Créer un projet

Accédez au tableau de bord RevenueCat et [ajoutez un nouveau projet](https://apprevenuecatcom/overview/) dans la liste déroulante du menu de navigation supérieur appelée _Projets_.

![RevenueCat étape 1](/revenuecat_step1webp)

Le modal popup pour créer un nouveau projet

### ▶️ Ajouter une application/plateforme

Dans **Paramètres du projet > Applications** dans le menu de gauche du tableau de bord du projet, sélectionnez la plate-forme pour l'application que vous allez ajouter.

![RevenueCat étape 2](/revenuecat_step2webp)

Tableau de bord du projet pour sélectionner la plateforme d'application

Le champ **Nom de l'application** est obligatoire pour ajouter votre application à RevenueCat. Le reste des champs de configuration peut être ajouté ultérieurement. Pour effectuer des achats de test et de production, le Bundle ID (iOS) / Package Name (Android) ainsi que le Shared Le secret (iOS) / les informations d'identification du service (Android) doivent être configurés

![RevenueCat étape 3](/revenuecat_step3webp)

Page de configuration d'application pour une application Apple App Store

> ### 📘
> 
> 💡 Voici une astuce !
> 
> Après avoir enregistré votre application, RevenueCat recommande de configurer les [Notifications du serveur de plateforme](https://wwwrevenuecatcom/docs/server-notifications/). Ces notifications ne sont pas obligatoires, mais accéléreront les [webhooks](https://wwwrevenuecatcom/ docs/webhooks/) et les délais de livraison de l'intégration et réduisez le délai de mise à jour de vos abonnés

> ### 📘
> 
> Applications et utilisateurs de staging ou de production
> 
> RevenueCat lui-même n'a pas d'environnements séparés pour la préparation et la production. Les transactions sous-jacentes pour les utilisateurs sont plutôt différenciées par le bac à sable et la production.
> 
> N'importe quelle application RevenueCat peut effectuer à la fois des achats de sandbox et de production dans les magasins. Si vous disposez d'applications distinctes pour la préparation et la production, vous pouvez créer plusieurs projets dans RevenueCat pour refléter votre configuration.
> 
> De plus, les utilisateurs ne sont pas non plus séparés par environnement. Le même utilisateur peut avoir des achats actifs de bac à sable et des achats de production actifs en même temps


### ▶️ Identifiants de service

Les informations d'identification du service doivent être configurées pour que RevenueCat puisse communiquer avec les magasins d'applications en votre nom. Consultez les guides RevenueCat [App Store Connect Shared Secret](https://wwwrevenuecatcom/docs/itunesconnect-app-special-shared-secret/), [ Informations d'identification du service Play](https://wwwrevenuecatcom/docs/creating-play-service-credentials/) et [Secret partagé Amazon Appstore](https://wwwrevenuecatcom/docs/service-credentials/amazon-appstore-credentials/) pour plus d'informations

Notez que les informations d'identification du service Play peuvent prendre jusqu'à 36 heures pour se propager sur les serveurs de Google.

## 3 Configuration du produit

### ▶️ Configuration du magasin

Avant de pouvoir commencer à utiliser RevenueCat pour récupérer des produits, vous devez configurer vos produits dans les magasins respectifs. Consultez les guides suivants pour [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console]( https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/) et [Stripe](https://wwwrevenuecatcom/docs/stripe- products/) pour vous aider à naviguer dans ce processus

Si vous vendez des produits iOS, assurez-vous de signer votre « Contrat d'applications payantes » et de remplir vos informations bancaires et fiscales dans **App Store Connect > Accords, taxes et opérations bancaires** **Cela doit être complété avant de pouvoir tester tous les achats**

> ### 📘
> 
> Vous souhaitez ignorer la configuration du magasin pendant les tests ?
> 
> Sur iOS, vous pouvez retarder la configuration des produits dans App Store Connect en testant plutôt avec les fichiers de configuration StoreKit. Ces fichiers de configuration nécessitent une configuration minimale et sont configurables directement via Xcode.
> 
> En savoir plus sur la configuration des fichiers de configuration StoreKit dans le guide RevenueCat [Sandbox Testing](https://wwwrevenuecatcom/docs/apple-app-store/#ios-14-only-testing-on-the-simulator)

### ▶️ Configurer les produits et les droits dans RevenueCat

Une fois vos produits intégrés à l'application configurés dans [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console](https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/) ou [Stripe](https://wwwrevenuecatcom/docs/stripe-products/), vous devrez copier cette configuration dans le Tableau de bord RevenueCat RevenueCat utilise un système de droits pour contrôler l'accès aux fonctionnalités premium et des offres pour gérer l'ensemble des produits que vous proposez aux clients.

Les droits sont le niveau d'accès auquel un client a « droit » après avoir acheté un produit spécifique.
Les offres sont un moyen simple pour vous d'organiser les produits intégrés à l'application que vous souhaitez « proposer » sur votre paywall et de les configurer à distance. RevenueCat **recommande** d'utiliser ces fonctionnalités pour simplifier votre code et vous permettre de changer de produit sans publier d'application. mise à jour

Voir [Configuration des produits](https://wwwrevenuecatcom/docs/entitlements/) pour configurer vos produits, puis les organiser en offres ou droits.

![RevenueCat étape 4](/revenuecat_step4webp)

##4Utilisation du SDK d'achats de RevenueCat

Le SDK RevenueCat implémente de manière transparente les achats et les abonnements sur toutes les plateformes tout en synchronisant les jetons avec le serveur RevenueCat.

Si vous rencontrez des problèmes avec le SDK, consultez [Dépannage des SDK](https://wwwrevenuecatcom/docs/troubleshooting-the-sdks/) pour obtenir des conseils.

> ### 📘
> 
> Utilisez uniquement votre clé SDK publique pour configurer les achats
> 
> Vous pouvez obtenir votre clé SDK publique dans l'onglet **Clés API** sous **Paramètres du projet** dans le tableau de bord.

Vous ne devez configurer l'instance partagée de _Purchases_ qu'une seule fois, généralement au lancement de l'application. Par la suite, la même instance est partagée dans toute votre application en accédant à l'instance « partagée » dans le SDK.

Consultez le guide RevenueCat sur la [Configuration du SDK](https://docsrevenuecatcom/docs/configuring-sdk/) pour plus d'informations et les meilleures pratiques.

Assurez-vous de configurer _Purchases_ avec votre clé SDK publique uniquement. Vous pouvez en savoir plus sur les différentes clés API disponibles dans RevenueCat [Guide d'authentification](https://wwwrevenuecatcom/docs/authentication/)


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

En cours de développement, RevenueCat recommande d'activer des journaux de débogage plus détaillés. Pour plus d'informations sur ces journaux, consultez leur guide [Debugging](https://wwwrevenuecatcom/docs/debugging/)

Si vous envisagez d'utiliser RevenueCat avec votre code d'achat existant, reportez-vous à leur guide sur le [Mode Observateur](https://wwwrevenuecatcom/docs/observer-mode/)


> ### 📘
> 
> Configuration des achats avec des identifiants utilisateur
> 
> Si vous disposez d'un système d'authentification utilisateur dans votre application, vous pouvez fournir un identifiant utilisateur au moment de la configuration ou à une date ultérieure en appelant `logIn()` Pour en savoir plus, consultez le guide RevenueCat sur [Identifying Users] (https://wwwrevenuecatcom/docs/user-ids/)

Le SDK récupérera automatiquement les [offres configurées](https://wwwrevenuecatcom/docs/entitlements/#offerings) et récupérera les informations sur le produit auprès d'Apple, Google ou Amazon. Ainsi, les produits disponibles seront déjà chargés lorsque les clients lanceront votre écran d'achat.

Vous trouverez ci-dessous un exemple de récupération d'offres. Vous pouvez utiliser les offres pour organiser votre écran de paywall. Consultez le guide RevenueCat sur [Affichage des produits] (https://wwwrevenuecatcom/docs/displaying-products/) pour plus d'informations et les meilleures pratiques.

### ▶️ Récupérer et afficher les produits disponibles

> ### 📘
> 
> Configuration des achats avec des identifiants utilisateur
> 
> Si vous disposez d'un système d'authentification utilisateur dans votre application, vous pouvez fournir un identifiant utilisateur au moment de la configuration ou à une date ultérieure en appelant `logIn()` Pour en savoir plus, consultez le guide RevenueCat sur [Identifying Users] (https://wwwrevenuecatcom/docs/user-ids/)

Le SDK récupérera automatiquement les [offres configurées](https://wwwrevenuecatcom/docs/entitlements/#offerings) et récupérera les informations sur le produit auprès d'Apple, Google ou Amazon. Ainsi, les produits disponibles seront déjà chargés lorsque les clients lanceront votre écran d'achat.

Vous trouverez ci-dessous un exemple de récupération d'offres. Vous pouvez utiliser les offres pour organiser votre écran de paywall. Consultez le guide RevenueCat sur [Affichage des produits] (https://wwwrevenuecatcom/docs/displaying-products/) pour plus d'informations et les meilleures pratiques.

```javascript
const { offerings } = await CapacitorPurchases.getOfferings()
if (offerings.current !== null) {  
    // Display current offering with offerings.current
}
```

Si vous récupérez vos [Offres](https://wwwrevenuecatcom/docs/entitlements/#offerings), [produits](https://wwwrevenuecatcom/docs/entitlements/#products) ou vos [packages](https://wwwrevenuecatcom /docs/entitlements/#adding-packages) sont vides, cela est dû à un problème de configuration dans le magasin respectif

Les raisons les plus courantes pour cela dans App Store Connect sont un « accord d'applications payantes » obsolète ou des produits qui ne sont pas au moins à l'état « Prêt à soumettre ». Dans GooglePlay, cela se produit généralement lorsque l'application n'est pas publiée sur une piste fermée. et un utilisateur test valide ajouté

Vous pouvez trouver plus d'informations sur la résolution de ce problème dans RevenueCat [Centre d'aide](https://supportrevenuecatcom/hc/en-us/articles/360041793174/)

### ▶️ Effectuer un achat

Le SDK comprend une méthode simple pour faciliter les achatsLe `purchase:package` prend un package de l'offre récupérée et traite la transaction avec la boutique d'applications respective.

L'exemple de code ci-dessous montre le processus d'achat d'un package et la confirmation qu'il déverrouille le contenu "votre\_droit\_id". Plus de détails sur la méthode `purchase:package` peuvent être trouvés dans le guide RevenueCat sur [Faire des achats](https:// wwwrevenuecatcom/docs/making-purchases/)

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

Vous pouvez utiliser cette méthode chaque fois que vous avez besoin d'obtenir le dernier statut, et vous pouvez l'appeler en toute sécurité à plusieurs reprises tout au long du cycle de vie de votre application. _Purchases_ met automatiquement en cache les dernières « CustomerInfo » à chaque mise à jour — donc dans la plupart des cas, cette méthode extrait du cache et il court très vite

Il est courant d'appeler cette méthode pour décider quelle interface utilisateur afficher à l'utilisateur et chaque fois que l'utilisateur effectue une action qui nécessite un certain niveau de droit.

> ### 📘
> 
> 💡 Voici une astuce !
> 
> Vous pouvez accéder à bien plus d'informations sur un abonnement que simplement savoir s'il est actif ou non. Consultez le guide RevenueCat sur [Statut de l'abonnement] (https://wwwrevenuecatcom/docs/customer-info/) pour savoir si l'abonnement est prêt à être renouvelé, si un problème a été détecté avec la carte de crédit de l'utilisateur, et plus encore

RevenueCat permet à vos utilisateurs de restaurer leurs achats intégrés, en réactivant tout contenu qu'ils ont précédemment acheté sur le **même compte de magasin** (compte Apple, Google ou Amazon). Nous recommandons que toutes les applications disposent d'un moyen permettant aux utilisateurs de déclencher le méthode de restauration Notez qu'Apple exige un mécanisme de restauration dans le cas où un utilisateur perd l'accès à ses achats (par exemple : désinstallation/réinstallation de l'application, perte des informations de son compte, etc.)

```javascript
  const res = await CapacitorPurchases.restoreTransactions()
  const purchaserInfo = res.purchaserInfo
  const ids: string[] = [] // extract active subscriptions ids
  purchaserInfo.activeSubscriptions.forEach((id) => {
    ids.push(id)
  })

```

Si deux [ID utilisateur d'application](https://wwwrevenuecatcom/docs/user-ids/) différents restaurent les transactions à partir du même compte de magasin sous-jacent (compte Apple, Google ou Amazon)
RevenueCat peut tenter de créer un alias entre les deux identifiants d'utilisateur de l'application et les compter comme le même utilisateur à l'avenir. Consultez le guide RevenueCat sur [Restaurer les achats] (https://wwwrevenuecatcom/docs/restoring-purchases/) pour plus d'informations sur les différents comportements de restauration configurables

Étant donné que le SDK fonctionne de manière transparente sur n'importe quelle plate-forme, les modifications apportées aux informations d'achat d'un utilisateur peuvent provenir de diverses sources. Vous pouvez répondre à toute modification dans les « CustomerInfo » d'un client en vous conformant à une méthode de délégation facultative, « purchases : receivedUpdated : »

Cette méthode se déclenchera chaque fois que le SDK recevra un objet `CustomerInfo` mis à jour à partir d'appels à `getCustomerInfo()`, `purchase(package:)`, `purchase(product:)` ou `restorePurchases()`

Les mises à jour CustomerInfo ne sont _pas_ transmises à votre application à partir du backend RevenueCat, les mises à jour ne peuvent se produire qu'à partir d'une demande réseau sortante vers RevenueCat, comme mentionné ci-dessus

En fonction de votre application, il peut suffire d'ignorer le délégué et de simplement gérer les modifications apportées aux informations client au prochain lancement de votre application ou dans les blocs de complétion des méthodes du SDK.

```javascript
CapacitorPurchases.addListener('purchasesUpdate', (data) => {
  console.log('purchasesUpdate', data)
})
```

> ### 👍
> 
> Vous l'avez fait !
> 
> Vous avez désormais implémenté un système d'achat d'abonnements complet sans passer un mois à écrire du code serveur Félicitations !

### Exemples d'applications

Pour télécharger des exemples plus complets d'intégration du SDK, rendez-vous sur les exemples de ressources d'application RevenueCat.

**[Voir des exemples](https://wwwrevenuecatcom/docs/sample-apps/)**

Je publierai bientôt un exemple d'application utilisant Capacitor et Vuejs

Si vous avez besoin d'utiliser en profondeur le SDK Capacitor, consultez la documentation [ici](https://githubcom/Cap-go/capacitor-purchases/)

### Prochaines étapes
\
- Si vous ne l'avez pas déjà fait, assurez-vous que vos produits sont correctement configurés en consultant RevenueCat [guide sur les droits](https://wwwrevenuecatcom/docs/entitlements/)
- Si vous souhaitez utiliser vos propres identifiants utilisateur, lisez la [définition des identifiants utilisateur de l'application](https://wwwrevenuecatcom/docs/user-ids/) 
- Si vous passez à RevenueCat à partir d'un autre système, consultez le guide RevenueCat sur [la migration de vos abonnements existants](https://wwwrevenuecatcom/docs/migration-existing-subscriptions/)
- Une fois que vous êtes prêt à tester votre intégration, vous pouvez suivre les guides RevenueCat sur [tests et débogage](https://wwwrevenuecatcom/docs/debugging/)
- Si vous êtes admissible au programme App Store Small Business, consultez le guide RevenueCat sur [comment postuler et informer RevenueCat](https://wwwrevenuecatcom/docs/app-store-small-business-program/)


Si vous avez besoin d'une mise à jour en direct dans votre application 

Rejoignez l'utilisation ici 👇

## Inscrivez-vous ici pour obtenir votre compte

[Capgo](/s'inscrire/)