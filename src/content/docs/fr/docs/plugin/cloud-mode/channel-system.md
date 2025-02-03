---
title: チャネルシステム
description: Comment utiliser le système de canaux avec capacitor-updater
sidebar:
  order: 6
locale: fr
---

Capgo et capacitor-updater sont livrés avec un puissant système de canaux

## Ce que vous pouvez faire avec les canaux :

* Associer des appareils à un canal pour le développement, les tests bêta
* Utiliser un canal par branche de développement et laisser votre équipe s'auto-assigner depuis le téléphone pour tester

## Attribution d'appareils à un canal :

* Définir le canal par défaut, chaque fois qu'un nouvel appareil demande une mise à jour à Capgo, ce canal répondra
* Envoyer le **deviceId** (avec la méthode [**getDeviceId**](/docs/plugin/api#getdeviceid)) à votre backend et l'assigner avec l'API publique Capgo
* Rendre le canal auto-assignable (avec la méthode [**setChannel**](/docs/plugin/api#setchannel)), et laisser l'appareil s'abonner au canal (avec ou sans interaction utilisateur) avec la méthode `setChannel` du plugin
* Utiliser l'option `defaultChannel` dans la [configuration](/docs/plugin/settings#defaultchannel) pour définir le canal par défaut pour tous les appareils avec cette configuration du plugin

:::note
Vous pouvez également attribuer un appareil directement à un bundle
:::

## Options du canal

<figure><img src="/channel_setting_1webp" alt=""><figcaption></figcaption></figure>

Détails de chaque option :

| Option | Description |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Désactiver la rétrogradation automatique sous la version native** | N'envoie pas de mise à jour si la version native de l'application est supérieure à celle du canal |
| **Désactiver la mise à niveau automatique au-dessus de la version majeure** | N'envoie pas de mise à jour si la version native de l'application est inférieure d'une version majeure (**1**23) à celle du canal |
| **Désactiver la mise à niveau automatique au-dessus de la version mineure** | N'envoie pas de mise à jour si la version native de l'application est inférieure d'une version mineure (1**2**3) à celle du canal |
| **Autoriser l'auto-attribution de l'appareil** | Permet à un appareil d'utiliser la méthode `setChannel` pour ce canal |
| **iOS** | Permet aux appareils iOS de télécharger les mises à jour depuis ce canal |
| **Android** | Permet aux appareils Android de télécharger les mises à jour depuis ce canal |
| **Autoriser l'émulateur** | Permet aux émulateurs de recevoir des mises à jour depuis ce canal |
| **Autoriser les builds de développement** | Permet aux builds de développement de recevoir des mises à jour depuis ce canal |

:::note
Capgo effectue automatiquement certains filtrages pour vous. Si vous avez un CI/CD configuré pour envoyer votre version sur Google Play, Google Play exécutera votre application à chaque fois sur plus de 20 appareils réels. Pendant les 4 premières heures d'un nouveau bundle, nous bloquerons les adresses IP des centres de données Google pour éviter qu'elles ne soient comptabilisées dans vos statistiques
:::

:::note
Capgo **ne compte pas** les émulateurs et les builds de développement dans votre utilisation, mais gardez à l'esprit que vous ne pouvez pas en avoir plus de 3%, sinon votre compte sera verrouillé jusqu'à ce que vous corrigiez cela
:::