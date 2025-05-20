---
title: 설정
description: Tous les paramètres disponibles pour Capacitor Updater
sidebar:
  order: 8
locale: fr
---

Pour avoir un contrôle plus précis sur le système de mise à jour, vous pouvez le configurer avec ces paramètres :

## `appReadyTimeout`

> Configure le nombre de millisecondes pendant lesquelles le plugin natif doit attendre avant de considérer qu'une mise à jour a 'échoué'

Disponible uniquement pour Android et iOS

Par défaut : `10000` (10 secondes)

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "appReadyTimeout": 1000
    }
  }
}
```

## `responseTimeout`

> Configure le nombre de millisecondes pendant lesquelles le plugin natif doit attendre avant de considérer un délai d'expiration de l'API

Disponible uniquement pour Android et iOS

Par défaut : `20` (20 secondes)

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "responseTimeout": 1000
    }
  }
}
```

## `autoDeleteFailed`

> Configure si le plugin doit automatiquement supprimer les bundles ayant échoué

Disponible uniquement pour Android et iOS

Par défaut : `true`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoDeleteFailed": false
    }
  }
}
```

## `autoDeletePrevious`

> Configure si le plugin doit automatiquement supprimer les bundles précédents après une mise à jour réussie

Disponible uniquement pour Android et iOS

Par défaut : `true`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoDeletePrevious": false
    }
  }
}
```

## `autoUpdate`

> Configure si le plugin doit utiliser la mise à jour automatique via un serveur de mise à jour

Disponible uniquement pour Android et iOS

Par défaut : `true`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": false
    }
  }
}
```

## `updateUrl`

> Configure l'URL / point de terminaison vers lequel les vérifications de mise à jour sont envoyées

Disponible uniquement pour Android et iOS

Par défaut : `https://apicapgo.app/updates`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "updateUrl": "https://examplecom/api/updates"
    }
  }
}
```

## `statsUrl`

> Configure l'URL / point de terminaison vers lequel les statistiques de mise à jour sont envoyées

Disponible uniquement pour Android et iOS. Définissez à "" pour désactiver les rapports de statistiques

Par défaut : `https://apicapgo.app/stats`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "statsUrl": "https://examplecom/api/stats"
    }
  }
}
```

## `privateKey`

> Configure la clé privée pour le chiffrement de bout en bout des mises à jour en direct

Disponible uniquement pour Android et iOS

Créez la clé privée avec la commande `npx @capgo/cli key create`

Par défaut : `undefined`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "privateKey": "YOUR_KEY"
    }
  }
}
```

## `directUpdate`

> Fait que le plugin installe directement la mise à jour lorsque l'application vient d'être mise à jour/installée. Applicable uniquement pour le mode autoUpdate

Disponible uniquement pour Android et iOS

Par défaut : `undefined`

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": true
    }
  }
}
```

## `resetWhenUpdate`

:::note
Lorsqu'une mise à jour du store se produit, désactive la réinitialisation forcée vers la version native
:::

Il existe beaucoup plus de paramètres disponibles uniquement sur l'[application web](https://web.capgo.app/login)

Pour configurer le plugin, utilisez ces paramètres :

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "resetWhenUpdate": false
    }
  }
}
```

## `directUpdate`
Fait que le plugin installe directement la mise à jour lorsque l'application vient d'être mise à jour/installée. Applicable uniquement pour le mode autoUpdate

:::caution
Ce paramètre nécessite que vous masquiez l'application à l'utilisateur pendant l'installation de la mise à jour. Sinon, l'application se réinitialisera pendant que l'utilisateur navigue
:::

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": true
    }
  }
}
```

## `defaultChannel`
Définit le canal par défaut pour l'application. Cela remplacera tout autre canal défini dans Capgo si le canal permet l'écrasement

```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "defaultChannel": "production"
    }
  }
}
```

## `appId`
Définit l'appId pour l'application. Cela remplacera toute autre façon d'obtenir l'appId. C'est utile lorsque vous voulez avoir un appId différent dans Capgo et dans votre code natif
:::note
C'est la nouvelle façon de définir l'appId. L'ancienne méthode est toujours et restera prise en charge
:::
```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "AppId": "comexampleapp"
    }
  }
}
```

## `version`
Définit la version pour l'application. Cela remplacera toute autre façon d'obtenir la version. C'est utile lorsque vous voulez avoir une version différente dans Capgo et dans votre code natif
:::note
C'est la nouvelle façon de définir la version. L'ancienne méthode est toujours et restera prise en charge
:::
```json
// capacitorconfigjson
{
  "plugins": {
    "CapacitorUpdater": {
      "version": "123"
    }
  }
}
```