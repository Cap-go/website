---
title: 설정
description: Alle verfügbaren Einstellungen für Capacitor Updater
sidebar:
  order: 8
locale: de
---

Um eine detailliertere Kontrolle über das Update-System zu haben, können Sie es mit diesen Einstellungen konfigurieren:

## `appReadyTimeout`

> Konfigurieren Sie die Anzahl der Millisekunden, die das native Plugin warten soll, bevor ein Update als 'fehlgeschlagen' eingestuft wird

Nur verfügbar für Android und iOS

Standard: `10000` (10 Sekunden)

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

> Konfigurieren Sie die Anzahl der Millisekunden, die das native Plugin warten soll, bevor ein API-Timeout eintritt

Nur verfügbar für Android und iOS

Standard: `20` (20 Sekunden)

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

> Konfigurieren Sie, ob das Plugin fehlgeschlagene Bundles automatisch löschen soll

Nur verfügbar für Android und iOS

Standard: `true`

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

> Konfigurieren Sie, ob das Plugin vorherige Bundles nach einem erfolgreichen Update automatisch löschen soll

Nur verfügbar für Android und iOS

Standard: `true`

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

> Konfigurieren Sie, ob das Plugin Auto-Update über einen Update-Server verwenden soll

Nur verfügbar für Android und iOS

Standard: `true`

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

> Konfigurieren Sie die URL / den Endpunkt, an den Update-Überprüfungen gesendet werden

Nur verfügbar für Android und iOS

Standard: `https://apicapgo.app/updates`

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

> Konfigurieren Sie die URL / den Endpunkt, an den Update-Statistiken gesendet werden

Nur verfügbar für Android und iOS. Setzen Sie auf "" um die Statistikberichterstattung zu deaktivieren

Standard: `https://apicapgo.app/stats`

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

> Konfigurieren Sie den privaten Schlüssel für die Ende-zu-Ende-Verschlüsselung von Live-Updates

Nur verfügbar für Android und iOS

Erstellen Sie den privaten Schlüssel mit dem Befehl `npx @capgo/cli key create`

Standard: `undefined`

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

> Lässt das Plugin das Update direkt installieren, wenn die App gerade aktualisiert/installiert wurde. Nur im autoUpdate-Modus anwendbar

Nur verfügbar für Android und iOS

Standard: `undefined`

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
Wenn ein Store-Update erfolgt, deaktivieren Sie das erzwungene Zurücksetzen auf die native Version
:::

Es gibt noch viele weitere Einstellungen, die nur in der [Web-App](https://webcapgo.app/login) verfügbar sind


Um das Plugin zu konfigurieren, verwenden Sie diese Einstellungen:

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
Lässt das Plugin das Update direkt installieren, wenn die App gerade aktualisiert/installiert wurde. Nur im autoUpdate-Modus anwendbar

:::caution
Diese Einstellung erfordert, dass Sie die App vor dem Benutzer verbergen, während das Update installiert wird. Andernfalls wird die App zurückgesetzt, wenn der Benutzer navigiert
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
Legt den Standard-Kanal für die App fest. Dies überschreibt jeden anderen in Capgo eingestellten Kanal, wenn der Kanal das Überschreiben erlaubt

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
Legt die appId für die App fest. Dies überschreibt alle anderen Wege, die appId zu erhalten. Dies ist nützlich, wenn Sie eine andere appId in Capgo und in Ihrem nativen Code haben möchten
:::note
Dies ist der neue Weg, die appId festzulegen. Der alte Weg wird weiterhin unterstützt
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
Legt die Version für die App fest. Dies überschreibt alle anderen Wege, die Version zu erhalten. Dies ist nützlich, wenn Sie eine andere Version in Capgo und in Ihrem nativen Code haben möchten
:::note
Dies ist der neue Weg, die Version festzulegen. Der alte Weg wird weiterhin unterstützt
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