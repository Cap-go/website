---
title: Système de canaux
description: Comment utiliser le système de canaux avec capacitor-updater
sidebar:
  order: 6
locale: fr
---

Capgo et capacitor-updater sont livrés avec un puissant système de canaux

## Ce que vous pouvez faire avec les canaux :

* Associer des appareils à un canal pour le développement, les tests bêta
* Utiliser un canal par branche de développement et laisser votre équipe s'auto-assigner depuis le téléphone pour tester

## Assigner des appareils à un canal :

* Définir le canal par défaut, chaque fois qu'un nouvel appareil demande une mise à jour à Capgo, ce canal répondra
* Envoyer le **deviceId** (avec la méthode [**getDeviceId**](/docs/plugin/api#getdeviceid)) à votre backend et l'assigner avec l'API publique Capgo
* Rendre le canal auto-assignable (avec la méthode [**setChannel**](/docs/plugin/api#setchannel)), et laisser l'appareil s'abonner au canal (avec ou sans interaction utilisateur) avec la méthode `setChannel` du plugin
* Utiliser l'option `defaultChannel` dans la [configuration](/docs/plugin/settings#defaultchannel) pour définir le canal par défaut pour tous les appareils avec cette configuration du plugin

:::note
Vous pouvez également assigner un appareil directement à un bundle
:::

## Options du canal

<figure><img src="/channel_setting_1webp" alt=""><figcaption></figcaption></figure>

Détails de chaque option :

| Option | Description |
| --- | --- |
| **Désactiver le déclassement automatique sous natif** | N'envoie pas de mise à jour si la version native de l'application est supérieure à celle du canal |
| **Désactiver la mise à niveau automatique au-dessus de la majeure** | N'envoie pas de mise à jour si la version native de l'application est inférieure à une Majeure (**1**23) de celle du canal |
| **Désactiver la mise à niveau automatique au-dessus de la mineure** | N'envoie pas de mise à jour si la version native de l'application est inférieure à une mineure (1**2**3) de celle du canal |
| **Permettre à l'appareil de s'auto-assigner** | Permet à un appareil d'utiliser la méthode `setChannel` pour ce canal |
| **IOS** | Permet aux appareils iOS de télécharger des mises à jour depuis ce canal |
| **Android** | Permet aux appareils Android de télécharger des mises à jour depuis ce canal |
| **Autoriser l'émulateur** | Permet aux émulateurs de recevoir des mises à jour depuis ce canal |
| **Autoriser les builds de développement** | Permet aux builds de développement de recevoir des mises à jour depuis ce canal |

:::note
Capgo effectue automatiquement certains filtrages pour vous. Si vous avez un CI/CD configuré pour envoyer votre version sur Google Play, Google Play exécutera votre application à chaque fois sur plus de 20 appareils réels. Pendant les 4 premières heures d'un nouveau bundle, nous bloquerons les IPs des centres de données Google pour éviter qu'elles ne soient comptabilisées dans vos statistiques
:::

:::note
Capgo **ne compte pas** les émulateurs et les builds de développement dans votre utilisation, mais gardez à l'esprit que vous ne pouvez pas en avoir plus de 3%, sinon votre compte sera verrouillé jusqu'à ce que vous corrigiez cela
:::