---
title: Kanalsystem
description: Wie man das Kanal-System mit capacitor-updater verwendet
sidebar:
  order: 6
locale: de
---

Capgo und capacitor-updater verfügen über ein leistungsstarkes Kanalsystem

## Was Sie mit Kanälen machen können:

* Geräte einem Kanal für Entwicklung und Beta-Tests zuordnen
* Einen Kanal pro Entwicklungszweig verwenden und Ihr Team sich selbst vom Telefon aus zuweisen lassen

## Geräte einem Kanal zuweisen:

* Den Kanal als Standard festlegen, jedes Mal wenn ein neues Gerät Capgo nach einem Update fragt, wird dieser Kanal antworten
* Die **deviceId** (mit der [**getDeviceId**](/docs/plugin/api#getdeviceid) Methode) an Ihr Backend senden und sie über die Capgo Public API zuweisen
* Den Kanal selbst zuweisbar machen (mit der [**setChannel**](/docs/plugin/api#setchannel) Methode) und das Gerät den Kanal abonnieren lassen (mit oder ohne Benutzerinteraktion) mit der `setChannel` Methode des Plugins
* Die Option `defaultChannel` in der [Konfiguration](/docs/plugin/settings#defaultchannel) verwenden, um den Standardkanal für alle Geräte mit dieser Plugin-Konfiguration festzulegen

:::note
Sie können ein Gerät auch direkt einem Bundle zuweisen
:::

## Kanal-Optionen

<figure><img src="/channel_setting_1.webp" alt=""><figcaption></figcaption></figure>

Details zu jeder Option:

| Option                                     | Beschreibung                                                                                          |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Automatisches Downgrade unter Native deaktivieren** | Kein Update senden, wenn die native Version der App größer ist als die Kanalversion              |
| **Automatisches Upgrade über Major deaktivieren**    | Kein Update senden, wenn die native Version der App niedriger ist als ein Major (**1**23) der Kanalversion |
| **Automatisches Upgrade über Minor deaktivieren**    | Kein Update senden, wenn die native Version der App niedriger ist als ein Minor (1**2**3) der Kanalversion |
| **Gerät darf sich selbst zuweisen**        | Ein Gerät darf die `setChannel` Methode für diesen Kanal verwenden                                   |
| **iOS**                                    | iOS-Geräten erlauben, Updates von diesem Kanal herunterzuladen                                       |
| **Android**                                | Android-Geräten erlauben, Updates von diesem Kanal herunterzuladen                                    |
| **Emulator erlauben**                      | Emulatoren erlauben, Updates von diesem Kanal zu empfangen                                           |
| **Entwicklungs-Build erlauben**            | Entwicklungs-Builds erlauben, Updates von diesem Kanal zu empfangen                                  |

:::note
Capgo führt automatisch einige Filterungen für Sie durch. Wenn Sie eine CI/CD konfiguriert haben, die Ihre Version an Google Play sendet, wird Google Play Ihre App jedes Mal auf über 20 echten Geräten ausführen. Während der ersten 4 Stunden eines neuen Bundles blockieren wir Google-Datencenter-IPs, um zu verhindern, dass diese in Ihren Statistiken gezählt werden
:::

:::note 
Capgo zählt Emulatoren und Entwicklungs-Builds **nicht** in Ihrer Nutzung, aber beachten Sie, dass Sie nicht mehr als 3% davon haben können, sonst wird Ihr Konto gesperrt, bis Sie dies beheben
:::