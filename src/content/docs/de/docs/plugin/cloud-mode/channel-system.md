---
title: Kanal System
description: Wie man das Kanalsystem mit capacitor-updater verwendet
sidebar:
  order: 6
locale: de
---

Capgo und capacitor-updater verfügen über ein leistungsstarkes Kanalsystem

## Was Sie mit Kanälen tun können:

* Geräte mit einem Kanal für Entwicklung, Beta-Test verbinden
* Einen Kanal durch den Entwicklungsbranch nutzen und Ihrem Team erlauben, sich selbst vom Telefon aus für Tests zuzuweisen

## Geräte einem Kanal zuweisen:

* Den Kanal als Standard festlegen, jedes Mal, wenn ein neues Gerät Capgo um ein Update bittet, wird dieser Kanal antworten
* Die **deviceId** (mit der [**getDeviceId**](/docs/plugin/api#getdeviceid) Methode) an Ihr Backend senden und sie mit der Capgo öffentlichen API zuweisen
* Den Kanal selbst zuweisbar machen (mit der [**setChannel**](/docs/plugin/api#setchannel) Methode) und das Gerät den Kanal abonnieren lassen (mit Benutzerinteraktion oder nicht) mit der Methode `setChannel` des Plugins
* Die Option `defaultChannel` in der [Konfiguration](/docs/plugin/settings#defaultchannel) verwenden, um den Standardkanal für alle Geräte mit dieser Plugin-Konfiguration festzulegen

:::note
Sie können auch ein Gerät direkt einem Bundle zuweisen 
:::

## Kanaloptionen

<figure><img src="/channel_setting_1webp" alt=""><figcaption></figcaption></figure>

Details zu jeder Option:

| Option                                  | Beschreibung                                                                                           |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Auto-Downsizing unter Native deaktivieren** | Kein Update senden, wenn die native Version der App höher ist als die des Kanals                      |
| **Auto-Upgrade über Major deaktivieren**    | Kein Update senden, wenn die native Version der App niedriger ist als ein Major (**1**23) der des Kanals |
| **Auto-Upgrade über Minor deaktivieren**    | Kein Update senden, wenn die native Version der App niedriger ist als ein Minor (1**2**3) der des Kanals |
| **Dem Gerät die Selbstzuweisung erlauben**     | Einem Gerät erlauben, die `setChannel` Methode für diesen Kanal zu nutzen                             |
| **IOS**                                 | IOS-Geräten erlauben, Updates von diesem Kanal herunterzuladen                                         |
| **Android**                             | Android-Geräten erlauben, Updates von diesem Kanal herunterzuladen                                     |
| **Emulator erlauben**                   | Emulators erlauben, Updates von diesem Kanal zu erhalten                                                |
| **Entwicklungsbuild erlauben**          | Entwicklungsbuilds erlauben, Updates von diesem Kanal zu erhalten                                      |

:::note
Capgo führt eine automatische Filterung für Sie durch. Wenn Sie ein CI/CD konfiguriert haben, um Ihre Version an Google Play zu senden, wird Google Play Ihre App jedes Mal auf 20+ echten Geräten ausführen. Während der ersten 4 Stunden eines neuen Bundles werden wir die IPs der Google-Rechenzentren blockieren, um zu verhindern, dass sie in Ihren Statistiken gezählt werden
:::

:::note 
Capgo zählt Emulatoren und Entwicklungsbuilds **nicht** in Ihrer Nutzung, aber beachten Sie, dass Sie nicht mehr als 3 % von ihnen haben können, da Ihr Konto bis zur Behebung des Problems gesperrt wird
:::