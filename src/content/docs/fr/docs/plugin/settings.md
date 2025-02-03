---
title: Paramètres
description: Paramètres disponibles pour Capacitor Updater
sidebar:
  order: 8
locale: fr
---

Pour avoir un contrôle plus précis sur le système de mise à jour, vous pouvez le configurer avec ces paramètres :

## `appReadyTimeout`

> Configure le nombre de millisecondes pendant lesquelles le plugin natif doit attendre avant de considérer une mise à jour comme "échouée"

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

> Configure le nombre de millisecondes pendant lesquelles le plugin natif doit attendre avant de considérer l'API comme expirée

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

> Configure si le plugin doit automatiquement supprimer les paquets échoués

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

> Configure si le plugin doit automatiquement supprimer les paquets précédents après une mise à jour réussie

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

> Configure l'URL / le point d'accès vers lequel les vérifications de mise à jour sont envoyées

Disponible uniquement pour Android et iOS

Par défaut : `https://apicapgoapp/updates`

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

> Configure l'URL / le point d'accès vers lequel les statistiques de mise à jour sont envoyées

Disponible uniquement pour Android et iOS. Définir à "" pour désactiver les rapports de statistiques

Par défaut : `https://apicapgoapp/stats`

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

> Fait en sorte que le plugin installe directement la mise à jour lorsque l'application vient d'être mise à jour/installée. Applicable uniquement en mode autoUpdate

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
Lors d'une mise à jour du store, désactive la réinitialisation forcée vers la version native
:::

Il existe de nombreux autres paramètres disponibles uniquement sur l'[application web](https://webcapgoapp/login)

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
Fait en sorte que le plugin installe directement la mise à jour lorsque l'application vient d'être mise à jour/installée. Applicable uniquement en mode autoUpdate

:::caution
Ce paramètre nécessite de masquer l'application à l'utilisateur pendant l'installation de la mise à jour. Sinon, l'application se réinitialisera pendant que l'utilisateur navigue
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
Définit le canal par défaut pour l'application. Cela remplacera tout autre canal défini dans Capgo si le canal autorise l'écrasement

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
Définit l'appId pour l'application. Cela remplacera toute autre méthode pour obtenir l'appId. C'est utile lorsque vous voulez avoir un appId différent dans Capgo et dans votre code natif
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
Définit la version pour l'application. Cela remplacera toute autre méthode pour obtenir la version. C'est utile lorsque vous voulez avoir une version différente dans Capgo et dans votre code natif
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