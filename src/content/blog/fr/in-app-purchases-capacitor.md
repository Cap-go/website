---
slug: fr__in-app-purchases-capacitor
title: Achats in-app pour Capacitor
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
tag: Tutorial
published: true
locale: fr
next_blog: ''
---

Capacitor Purchases est un plugin pour le framework Capacitor qui permet les achats in-app sur iOS et Android. Il fournit une API simple et cohérente sur plusieurs plateformes, facilitant ainsi la mise en œuvre d'abonnements et d'achats in-app dans les applications mobiles pour les développeurs.

L'une des principales caractéristiques du plugin Capacitor Purchases est son intégration avec RevenueCat, une plateforme qui fournit des outils pour les abonnements in-app et les achats in-app. RevenueCat simplifie le processus de mise en œuvre des abonnements et des achats in-app en fournissant une API simple et cohérente sur plusieurs plateformes, et en automatisant des tâches telles que la validation des reçus et la gestion des utilisateurs.

Avec RevenueCat, les développeurs peuvent facilement gérer les abonnements, suivre les revenus et effectuer d'autres tâches connexes. Certaines fonctionnalités offertes par RevenueCat comprennent :

- Validation automatisée des reçus
- Gestion des utilisateurs
- Prise en charge de modèles de tarification personnalisés
- Analyses détaillées
- Évolutivité

En utilisant le plugin Capacitor Purchases avec RevenueCat, les développeurs peuvent gagner du temps et des efforts lors de la mise en œuvre d'abonnements et d'achats in-app dans leurs applications mobiles, et fournir des fonctionnalités supplémentaires qui peuvent aider à améliorer l'expérience utilisateur et augmenter les revenus.

En utilisant le plugin Capacitor Purchases et RevenueCat, les développeurs peuvent facilement gérer et suivre les abonnements et les achats in-app, valider les reçus et gérer les utilisateurs sur plusieurs plateformes. Cela permet également de créer des modèles de tarification personnalisés et d'obtenir des analyses détaillées pour améliorer les performances et les revenus.

## Installation

Assurez-vous d'utiliser la dernière version de Capacitor et du plugin Capacitor Purchases. Vous pouvez vérifier la dernière version de Capacitor et du plugin Capacitor Purchases sur le site web de Capacitor.

Pour installer le plugin Capacitor Purchases, exécutez la commande suivante :
`npm i @capgo/capacitor-purchases`
ajoutez le plugin au code natif de votre application
`npx cap sync`

ajoutez la capacité d'achats in-app dans Xcode :

## 1. Créer un compte RevenueCat
Ce guide vous expliquera comment démarrer avec les abonnements et le SDK de RevenueCat en seulement quelques lignes de code.

Inscrivez-vous pour un nouveau compte RevenueCat [ici](https://app.revenuecat.com/).

> ### 📘
> 
> 💡 Voici un conseil !
> 
> RevenueCat recommande de créer un compte RevenueCat séparé pour chaque application / projet que vous avez, surtout si vous avez l'intention de vendre l'application un jour. Cela accélérera le processus de transfert, car vous pourrez transférer le compte entier plutôt que d'attendre que le support RevenueCat transfère des projets individuels.

### Organisations / Entreprise

Nous recommandons d'utiliser un compte d'entreprise lors de l'inscription à RevenueCat et de configurer votre application au sein d'un projet. Vous pourrez inviter le reste de votre équipe en tant que [collaborateurs](https://www.revenuecat.com/docs/collaborators/) à votre projet, mais **seul le propriétaire du projet peut gérer la facturation**. Les collaborateurs du projet ne peuvent pas gérer les détails de facturation.

## 2. Configuration du projet et de l'application

### ▶️ Créer un projet

Naviguez vers le tableau de bord RevenueCat et [ajoutez un nouveau projet](https://app.revenuecat.com/overview/) à partir du menu déroulant dans la navigation supérieure appelé _Projects_.

Le modal popup pour créer un nouveau projet

### ▶️ Ajouter une application / plateforme

Depuis **Paramètres du projet > Applications** dans le menu de gauche du tableau de bord du projet, sélectionnez la plateforme pour l'application que vous allez ajouter.

Tableau de bord du projet pour sélectionner la plateforme de l'application

Le champ **Nom de l'application** est requis pour ajouter votre application à RevenueCat. Le reste des champs de configuration peut être ajouté plus tard. Pour effectuer des achats de test et de production, l'ID de bundle (iOS) / Nom du package (Android) ainsi que le Secret partagé (iOS) / Identifiants de service (Android) doivent être configurés.webp)

Page de configuration d'une application pour l'App Store d'Apple

> ### 📘
> 
> 💡 Voici un conseil !
> 
> Après avoir enregistré votre application, RevenueCat recommande de configurer les [Notifications serveur de plateforme](https://wwwrevenuecatcom/docs/server-notifications/) Ces notifications ne sont pas obligatoires, mais elles accéléreront les délais de livraison des [webhooks](https://wwwrevenuecatcom/docs/webhooks/) et des intégrations et réduiront le temps de latence pour la mise à jour de vos abonnés

> ### 📘
> 
> Applications et utilisateurs de staging vs production
> 
> RevenueCat lui-même n'a pas d'environnements séparés pour le staging et la production Les transactions sous-jacentes pour les utilisateurs sont plutôt différenciées par sandbox et production
> 
> Toute application RevenueCat peut effectuer des achats sandbox et production depuis les magasins Si vous avez des applications séparées pour le staging et la production, vous pouvez créer plusieurs projets dans RevenueCat pour refléter votre configuration
> 
> De plus, les utilisateurs ne sont pas séparés par environnement non plus Le même utilisateur peut avoir des achats sandbox actifs et des achats production actifs en même temps


### ▶️ Identifiants de service

Les identifiants de service doivent être configurés pour que RevenueCat puisse communiquer avec les magasins d'applications en votre nom Consultez les guides RevenueCat [Secret partagé App Store Connect](https://wwwrevenuecatcom/docs/itunesconnect-app-specific-shared-secret/), [Identifiants de service Play](https://wwwrevenuecatcom/docs/creating-play-service-credentials/) et [Secret partagé Amazon Appstore](https://wwwrevenuecatcom/docs/service-credentials/amazon-appstore-credentials/) pour plus d'informations

Notez que les identifiants de service Play peuvent prendre jusqu'à 36 heures pour se propager sur les serveurs de Google

## 3 Configuration des produits

### ▶️ Configuration du magasin

Avant de pouvoir commencer à utiliser RevenueCat pour récupérer les produits, vous devez configurer vos produits dans les magasins respectifs Consultez les guides suivants pour [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console](https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/) et [Stripe](https://wwwrevenuecatcom/docs/stripe-products/) pour vous aider à naviguer dans ce processus

Si vous vendez des produits iOS, assurez-vous de signer votre "Accord sur les applications payantes" et de remplir vos informations bancaires et fiscales dans **App Store Connect > Accords, Taxes et Banque** **Cela doit être complété avant de pouvoir tester des achats**

> ### 📘
> 
> Vous voulez sauter la configuration du magasin pendant les tests ?
> 
> Sur iOS, vous pouvez retarder la configuration des produits dans App Store Connect en testant plutôt avec des fichiers de configuration StoreKit Ces fichiers de configuration nécessitent une configuration minimale et sont configurables directement via Xcode
> 
> En savoir plus sur la configuration des fichiers de configuration StoreKit dans le guide [Tests Sandbox](https://wwwrevenuecatcom/docs/apple-app-store/#ios-14-only-testing-on-the-simulator) de RevenueCat

### ▶️ Configurer les produits et les droits dans RevenueCat

Une fois que vos produits in-app ont été configurés dans [App Store Connect](https://wwwrevenuecatcom/docs/ios-products/), [Google Play Console](https://wwwrevenuecatcom/docs/android-products/), [Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/) ou [Stripe](https://wwwrevenuecatcom/docs/stripe-products/), vous devrez copier cette configuration dans le tableau de bord RevenueCat RevenueCat utilise un système de droits pour contrôler l'accès aux fonctionnalités premium, et des offres pour gérer l'ensemble des produits que vous proposez aux clients

Les droits représentent le niveau d'accès auquel un client a "droit" après avoir acheté un produit spécifique
Les offres sont un moyen simple pour vous d'organiser les produits in-app que vous souhaitez "offrir" sur votre mur de paiement et de les configurer à distance RevenueCat **recommande** d'utiliser ces fonctionnalités pour simplifier votre code et vous permettre de modifier les produits sans publier de mise à jour de l'application

Consultez [Configuration des produits](https://wwwrevenuecatcom/docs/entitlements/) pour configurer vos produits puis les organiser en offres ou en droits

![RevenueCat étape 4](/revenuecat_step4webp)

## 4Utilisation du SDK Purchases de RevenueCat

Le SDK RevenueCat implémente de manière transparente les achats et abonnements sur toutes les plateformes tout en synchronisant les jetons avec le serveur RevenueCat.

Si vous rencontrez des problèmes avec le SDK, consultez [Dépannage des SDKs](https://wwwrevenuecatcom/docs/troubleshooting-the-sdks/) pour obtenir des conseils.

> ### 📘
> 
> Utilisez uniquement votre clé SDK publique pour configurer Purchases
> 
> Vous pouvez obtenir votre clé SDK publique dans l'onglet **Clés API** sous **Paramètres du projet** dans le tableau de bord.

Vous ne devez configurer l'instance partagée de _Purchases_ qu'une seule fois, généralement au lancement de l'application. Par la suite, la même instance est partagée dans toute votre application en accédant à l'instance `shared` dans le SDK.

Consultez le guide RevenueCat sur la [Configuration du SDK](https://docsrevenuecatcom/docs/configuring-sdk/) pour plus d'informations et de bonnes pratiques.

Assurez-vous de configurer _Purchases_ uniquement avec votre clé SDK publique. Vous pouvez en savoir plus sur les différentes clés API disponibles dans RevenueCat dans le [guide d'authentification](https://wwwrevenuecatcom/docs/authentication/)

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

Lors du développement, RevenueCat recommande d'activer des journaux de débogage plus détaillés. Pour plus d'informations sur ces journaux, consultez leur guide de [Débogage](https://wwwrevenuecatcom/docs/debugging/).

Si vous prévoyez d'utiliser RevenueCat parallèlement à votre code d'achat existant, consultez leur guide sur le [Mode Observateur](https://wwwrevenuecatcom/docs/observer-mode/).

> ### 📘
> 
> Configuration de Purchases avec des identifiants utilisateur
> 
> Si vous disposez d'un système d'authentification utilisateur dans votre application, vous pouvez fournir un identifiant utilisateur au moment de la configuration ou ultérieurement avec un appel à `logIn()`. Pour en savoir plus, consultez le guide RevenueCat sur [l'identification des utilisateurs](https://wwwrevenuecatcom/docs/user-ids/).

Le SDK récupérera automatiquement les [Offres configurées](https://wwwrevenuecatcom/docs/entitlements/#offerings) et récupérera les informations sur les produits auprès d'Apple, Google ou Amazon. Ainsi, les produits disponibles seront déjà chargés lorsque les clients lanceront votre écran d'achat.

Voici un exemple de récupération des Offres. Vous pouvez utiliser les Offres pour organiser votre écran de paywall. Consultez le guide RevenueCat sur [l'affichage des produits](https://wwwrevenuecatcom/docs/displaying-products/) pour plus d'informations et de bonnes pratiques.

### ▶️ Récupérer et afficher les produits disponibles

> ### 📘
> 
> Configuration de Purchases avec des identifiants utilisateur
> 
> Si vous disposez d'un système d'authentification utilisateur dans votre application, vous pouvez fournir un identifiant utilisateur au moment de la configuration ou ultérieurement avec un appel à `logIn()`. Pour en savoir plus, consultez le guide RevenueCat sur [l'identification des utilisateurs](https://wwwrevenuecatcom/docs/user-ids/).

Le SDK récupérera automatiquement les [Offres configurées](https://wwwrevenuecatcom/docs/entitlements/#offerings) et récupérera les informations sur les produits auprès d'Apple, Google ou Amazon. Ainsi, les produits disponibles seront déjà chargés lorsque les clients lanceront votre écran d'achat.

Voici un exemple de récupération des Offres. Vous pouvez utiliser les Offres pour organiser votre écran de paywall. Consultez le guide RevenueCat sur [l'affichage des produits](https://wwwrevenuecatcom/docs/displaying-products/) pour plus d'informations et de bonnes pratiques.

```javascript
const { offerings } = await CapacitorPurchases.getOfferings()
if (offerings.current !== null) {  
    // Display current offering with offerings.current
}
```

Si la récupération de vos [Offres](https://wwwrevenuecatcom/docs/entitlements/#offerings), [produits](https://wwwrevenuecatcom/docs/entitlements/#products) ou [packages](https://wwwrevenuecatcom/docs/entitlements/#adding-packages) disponibles est vide, c'est dû à un problème de configuration dans la boutique respective.

Les raisons les plus courantes pour cela dans l'App Store Connect sont un "Accord d'applications payantes" obsolète ou des produits qui ne sont pas au moins à l'état "Prêt à soumettre". Dans GooglePlay, cela se produit généralement lorsque l'application n'est pas publiée sur une piste fermée et qu'un utilisateur test valide n'a pas été ajouté.

Vous pouvez trouver plus d'informations sur le dépannage de ce problème dans le [Centre d'aide](https://supportrevenuecatcom/hc/en-us/articles/360041793174/) de RevenueCat.

### ▶️ Effectuer un achat

Le SDK comprend une méthode simple pour faciliter les achats.La méthode `purchase:package` prend un package de l'Offre récupérée et traite la transaction avec la boutique d'applications respective.

L'exemple de code ci-dessous montre le processus d'achat d'un package et de confirmation qu'il déverrouille le contenu "your_entitlement_id". Plus de détails sur la méthode `purchase:package` peuvent être trouvés dans le guide RevenueCat sur [Effectuer des achats](https://www.revenuecat.com/docs/making-purchases/)

### ▶️ Vérifier le statut de l'abonnement

Vous pouvez utiliser cette méthode chaque fois que vous avez besoin d'obtenir le dernier statut, et il est sûr d'appeler cela à plusieurs reprises tout au long du cycle de vie de votre application. _Purchases_ met automatiquement en cache les dernières informations `CustomerInfo` chaque fois qu'elles sont mises à jour - donc dans la plupart des cas, cette méthode extrait du cache et s'exécute très rapidement.

Il est typique d'appeler cette méthode lors de la décision de l'interface utilisateur à montrer à l'utilisateur, et chaque fois que l'utilisateur effectue une action qui nécessite un certain niveau de droit.

> ### 📘
> 
> 💡 Voici un conseil !
> 
> Vous pouvez accéder à beaucoup plus d'informations sur un abonnement que simplement s'il est actif ou non. Consultez le guide RevenueCat sur [Statut de l'abonnement](https://www.revenuecat.com/docs/customer-info/) pour savoir si l'abonnement est configuré pour se renouveler, s'il y a un problème détecté avec la carte de crédit de l'utilisateur, et plus encore.

RevenueCat permet à vos utilisateurs de restaurer leurs achats in-app, réactivant tout contenu qu'ils ont précédemment acheté à partir du **même compte de boutique** (compte Apple, Google ou Amazon). Nous recommandons que toutes les applications aient un moyen pour les utilisateurs de déclencher la méthode de restauration. Notez qu'Apple exige un mécanisme de restauration dans le cas où un utilisateur perd l'accès à ses achats (par exemple : désinstallation/réinstallation de l'application, perte des informations de compte, etc.)

Si deux [ID utilisateurs d'application](https://www.revenuecat.com/docs/user-ids/) différents restaurent des transactions à partir du même compte de boutique sous-jacent (compte Apple, Google ou Amazon), RevenueCat peut tenter de créer un alias entre les deux ID utilisateurs d'application et les compter comme le même utilisateur à l'avenir. Consultez le guide RevenueCat sur [Restauration des achats](https://www.revenuecat.com/docs/restoring-purchases/) pour plus d'informations sur les différents comportements de restauration configurables.

Étant donné que le SDK fonctionne parfaitement sur n'importe quelle plateforme, les changements dans les informations d'achat d'un utilisateur peuvent provenir de diverses sources. Vous pouvez répondre à tout changement dans les `CustomerInfo` d'un client en vous conformant à une méthode de délégué facultative, `purchases:receivedUpdated:`.

Cette méthode s'activera chaque fois que le SDK reçoit un objet `CustomerInfo` mis à jour à partir des appels à `getCustomerInfo()`, `purchase(package:)`, `purchase(product:)`, ou `restorePurchases()`.

Les mises à jour de CustomerInfo ne sont _pas_ poussées vers votre application depuis le backend de RevenueCat, les mises à jour ne peuvent se produire qu'à partir d'une requête réseau sortante vers RevenueCat, comme mentionné ci-dessus.

Selon votre application, il peut être suffisant d'ignorer le délégué et simplement gérer les changements des informations client la prochaine fois que votre application est lancée ou dans les blocs de complétion des méthodes du SDK.

> ### 👍
> 
> Vous l'avez fait !
> 
> Vous avez maintenant implémenté un système d'achat d'abonnement complet sans passer un mois à écrire du code serveur. Félicitations !

### Applications d'exemple

Pour télécharger des exemples plus complets d'intégration du SDK, rendez-vous sur les ressources d'applications d'exemple de RevenueCat.

**[Voir les exemples](https://www.revenuecat.com/docs/sample-apps/)**

Je publierai bientôt une application d'exemple utilisant Capacitor et Vuejs.

Si vous avez besoin d'utiliser en profondeur le SDK Capacitor, consultez la documentation [ici](https://github.com/Cap-go/capacitor-purchases/)

### Prochaines étapes

- Si vous ne l'avez pas déjà fait, assurez-vous que vos produits sont correctement configurés en consultant le guide RevenueCat sur les [droits](https://www.revenuecat.com/docs/entitlements/)
- Si vous voulez utiliser vos propres identifiants utilisateur, lisez à propos de la [définition des ID utilisateurs d'application](https://www.revenuecat.com/docs/user-ids/)
- Si vous passez à RevenueCat depuis un autre système, consultez le guide RevenueCat sur [la migration de vos abonnements existants](https://www.revenuecatcom/docs/migrating-existing-subscriptions/)
-   Une fois que vous êtes prêt à tester votre intégration, vous pouvez suivre les guides RevenueCat sur [le test et le débogage](https://wwwrevenuecatcom/docs/debugging/)
-   Si vous êtes éligible au Programme pour les petites entreprises de l'App Store, consultez le guide RevenueCat sur [comment postuler et informer RevenueCat](https://wwwrevenuecatcom/docs/app-store-small-business-program/)


Si vous avez besoin de mises à jour en direct dans votre application

Rejoignez-nous ici 👇

## Inscrivez-vous ici pour obtenir votre compte

[Capgo](/register/)