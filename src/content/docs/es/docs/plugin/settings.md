---
title: Ajustes
description: Todas las configuraciones disponibles para Capacitor Updater
sidebar:
  order: 8
locale: es
---

Para tener un control más preciso sobre el sistema de actualización, puedes configurarlo con estos ajustes:

## `appReadyTimeout`

> Configura el número de milisegundos que el plugin nativo debe esperar antes de considerar una actualización como 'fallida'

Solo disponible para Android e iOS

Predeterminado: `10000` (10 segundos)

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

> Configura el número de milisegundos que el plugin nativo debe esperar antes de considerar un tiempo de espera de la API

Solo disponible para Android e iOS

Predeterminado: `20` (20 segundos)

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

> Configura si el plugin debe eliminar automáticamente los paquetes fallidos

Solo disponible para Android e iOS

Predeterminado: `true`

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

> Configura si el plugin debe eliminar automáticamente los paquetes anteriores después de una actualización exitosa

Solo disponible para Android e iOS

Predeterminado: `true`

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

> Configura si el plugin debe usar la Actualización Automática a través de un servidor de actualización

Solo disponible para Android e iOS

Predeterminado: `true`

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

> Configura la URL / endpoint al que se envían las comprobaciones de actualización

Solo disponible para Android e iOS

Predeterminado: `https://apicapgo.app/updates`

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

> Configura la URL / endpoint al que se envían las estadísticas de actualización

Solo disponible para Android e iOS. Establece como "" para deshabilitar el reporte de estadísticas

Predeterminado: `https://apicapgo.app/stats`

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

> Configura la clave privada para el cifrado de actualizaciones en vivo de extremo a extremo

Solo disponible para Android e iOS

Crea la clave privada con el comando `npx @capgo/cli key create`

Predeterminado: `undefined`

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

> Hace que el plugin instale directamente la actualización cuando la aplicación se acaba de actualizar/instalar. Solo aplicable para el modo autoUpdate

Solo disponible para Android e iOS

Predeterminado: `undefined`

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
Cuando ocurre una actualización de la tienda, deshabilita el reinicio forzado a la versión nativa
:::

Hay muchas más configuraciones disponibles solo en la [aplicación web](https://webcapgo.app/login)

Para configurar el plugin, usa estos ajustes:

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
Hace que el plugin instale directamente la actualización cuando la aplicación se acaba de actualizar/instalar. Solo aplicable para el modo autoUpdate

:::caution
Esta configuración requiere que ocultes la aplicación del usuario mientras se instala la actualización. De lo contrario, la aplicación se reiniciará mientras el usuario está navegando
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
Establece el canal predeterminado para la aplicación. Esto anulará cualquier otro canal establecido en Capgo si el canal permite sobrescribir

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
Establece el appId para la aplicación. Esto anulará cualquier otra forma de obtener el appId. Esto es útil cuando quieres tener un appId diferente en Capgo y en tu código nativo
:::note
Esta es la nueva forma de establecer el appId. La forma antigua sigue y seguirá siendo compatible
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
Establece la versión para la aplicación. Esto anulará cualquier otra forma de obtener la versión. Esto es útil cuando quieres tener una versión diferente en Capgo y en tu código nativo
:::note
Esta es la nueva forma de establecer la versión. La forma antigua sigue y seguirá siendo compatible
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